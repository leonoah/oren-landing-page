const express = require('express');
const router  = express.Router();
const path    = require('path');
const fs      = require('fs');
const multer  = require('multer');

// ─── Paths ──────────────────────────────────────────────────────────────────
const DATA_FILE   = path.join(__dirname, '../data/content.json');
const UPLOADS_DIR = path.join(__dirname, '../../public/uploads');

// Make sure the uploads directory exists
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// ─── Multer (image uploads) ─────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext  = path.extname(file.originalname).toLowerCase();
    const safe = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
    cb(null, safe);
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

// ─── Helpers ────────────────────────────────────────────────────────────────
function readContent() {
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(raw);
}

// ─── GET /api/content — public, used by the landing page ────────────────────
router.get('/', (req, res) => {
  try {
    res.json(readContent());
  } catch (err) {
    console.error('[content] read error', err);
    res.status(500).json({ error: 'שגיאה בקריאת התוכן' });
  }
});

// ─── PUT /api/content — save full content (from the admin panel) ────────────
router.put('/', (req, res) => {
  try {
    const incoming = req.body;
    if (!incoming || typeof incoming !== 'object' || Array.isArray(incoming)) {
      return res.status(400).json({ error: 'תוכן לא תקין' });
    }
    // Guard against accidentally wiping the file with an empty/partial payload:
    // every core section must be present.
    const REQUIRED = ['hero', 'pain', 'solution', 'features', 'topics', 'about', 'bonuses', 'pricing'];
    const missing = REQUIRED.filter(k => !incoming[k] || typeof incoming[k] !== 'object');
    if (missing.length) {
      return res.status(400).json({ error: 'תוכן חסר סקשנים: ' + missing.join(', ') });
    }

    // Backup the current file before overwriting
    try {
      if (fs.existsSync(DATA_FILE)) {
        fs.copyFileSync(DATA_FILE, DATA_FILE + '.bak');
      }
    } catch (e) { /* non-fatal */ }

    fs.writeFileSync(DATA_FILE, JSON.stringify(incoming, null, 2), 'utf8');
    res.json({ success: true });
  } catch (err) {
    console.error('[content] write error', err);
    res.status(500).json({ error: 'שגיאה בשמירת התוכן' });
  }
});

// ─── POST /api/content/upload — image upload, returns the public URL ────────
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'לא הועלה קובץ' });
  res.json({ success: true, url: '/uploads/' + req.file.filename });
});

// Multer / upload error handler
router.use((err, req, res, next) => {
  console.error('[content] upload error', err.message);
  res.status(400).json({ error: err.message || 'שגיאה בהעלאה' });
});

module.exports = router;
