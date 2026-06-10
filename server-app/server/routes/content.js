const express = require('express');
const router  = express.Router();
const path    = require('path');
const fs      = require('fs');
const multer  = require('multer');
const { put, list } = require('@vercel/blob');

// ─── Storage model ───────────────────────────────────────────────────────────
// Production (Vercel): the filesystem is read-only, so content + uploads live in
// Vercel Blob. Detected by the presence of BLOB_READ_WRITE_TOKEN.
// Local dev: no token → fall back to the bundled JSON file and ../../public/uploads,
// preserving the original on-disk behaviour.
const HAS_BLOB    = !!process.env.BLOB_READ_WRITE_TOKEN;
const CONTENT_KEY = 'content.json';                       // stable Blob pathname
const DATA_FILE   = path.join(__dirname, '../data/content.json');
const UPLOADS_DIR = path.join(__dirname, '../../public/uploads');

// ─── Multer ──────────────────────────────────────────────────────────────────
// In-memory for Blob (buffers stream straight up); on disk for local dev.
const storage = HAS_BLOB
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: (req, file, cb) => {
        fs.mkdirSync(UPLOADS_DIR, { recursive: true });
        cb(null, UPLOADS_DIR);
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + ext);
      },
    });

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter: (req, file, cb) => {
    const ok = /^image\/(jpe?g|png|gif|webp|svg\+xml|avif)$/.test(file.mimetype);
    cb(ok ? null : new Error('סוג קובץ לא נתמך'), ok);
  },
});

// ─── Optional admin auth ─────────────────────────────────────────────────────
// If ADMIN_PASSWORD is set, write operations require a matching x-admin-password
// header. If it is unset, the admin panel stays open (previous behaviour).
function requireAuth(req, res, next) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return next();
  if (req.get('x-admin-password') === pw) return next();
  return res.status(401).json({ error: 'נדרשת סיסמה' });
}

// ─── Read/write helpers ───────────────────────────────────────────────────────
async function readContent() {
  if (HAS_BLOB) {
    try {
      const { blobs } = await list({ prefix: CONTENT_KEY, limit: 1 });
      if (blobs.length) {
        const r = await fetch(blobs[0].url, { cache: 'no-store' });
        if (r.ok) return r.json();
      }
    } catch (err) {
      console.error('[content] blob read failed, using seed', err.message);
    }
  }
  // No Blob (local dev) or nothing stored yet → bundled seed file.
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

async function writeContent(content) {
  if (HAS_BLOB) {
    await put(CONTENT_KEY, JSON.stringify(content, null, 2), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false, // stable pathname so we overwrite in place
      allowOverwrite: true,
      cacheControlMaxAge: 0,  // serve fresh content right after a save
    });
    return;
  }
  // Local dev: back up then overwrite the on-disk file.
  try { if (fs.existsSync(DATA_FILE)) fs.copyFileSync(DATA_FILE, DATA_FILE + '.bak'); } catch (e) { /* non-fatal */ }
  fs.writeFileSync(DATA_FILE, JSON.stringify(content, null, 2), 'utf8');
}

// ─── GET /api/content — public, used by the landing page & admin ────────────
router.get('/', async (req, res) => {
  try {
    res.json(await readContent());
  } catch (err) {
    console.error('[content] read error', err);
    res.status(500).json({ error: 'שגיאה בקריאת התוכן' });
  }
});

// ─── PUT /api/content — save full content (from the admin panel) ────────────
router.put('/', requireAuth, async (req, res) => {
  try {
    const incoming = req.body;
    if (!incoming || typeof incoming !== 'object' || Array.isArray(incoming)) {
      return res.status(400).json({ error: 'תוכן לא תקין' });
    }
    // Guard against accidentally wiping the content with an empty/partial payload:
    // every core section must be present.
    const REQUIRED = ['hero', 'pain', 'solution', 'features', 'topics', 'about', 'bonuses', 'pricing'];
    const missing = REQUIRED.filter(k => !incoming[k] || typeof incoming[k] !== 'object');
    if (missing.length) {
      return res.status(400).json({ error: 'תוכן חסר סקשנים: ' + missing.join(', ') });
    }

    await writeContent(incoming);
    res.json({ success: true });
  } catch (err) {
    console.error('[content] write error', err);
    res.status(500).json({ error: 'שגיאה בשמירת התוכן' });
  }
});

// ─── POST /api/content/upload — image upload, returns the public URL ─────────
router.post('/upload', requireAuth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'לא הועלה קובץ' });

    if (HAS_BLOB) {
      const ext  = path.extname(req.file.originalname).toLowerCase() || '';
      const blob = await put('uploads/' + Date.now() + ext, req.file.buffer, {
        access: 'public',
        contentType: req.file.mimetype,
        addRandomSuffix: true,
      });
      return res.json({ success: true, url: blob.url });
    }
    // Local dev: multer already wrote it to ../../public/uploads.
    res.json({ success: true, url: '/uploads/' + req.file.filename });
  } catch (err) {
    console.error('[content] upload error', err);
    res.status(500).json({ error: 'שגיאה בהעלאה' });
  }
});

// Multer / upload error handler
router.use((err, req, res, next) => {
  console.error('[content] upload error', err.message);
  res.status(400).json({ error: err.message || 'שגיאה בהעלאה' });
});

module.exports = router;
