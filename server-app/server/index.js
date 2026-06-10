require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app = express();

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── Static files (landing page — served unchanged) ─────────────────────────
app.use(express.static(path.join(__dirname, '../public')));

// ─── API routes ─────────────────────────────────────────────────────────────
app.use('/api/contact',   require('./routes/contact'));
app.use('/api/subscribe', require('./routes/subscribe'));
app.use('/api/content',   require('./routes/content'));

// ─── Fallback → index.html ──────────────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ─── Start ──────────────────────────────────────────────────────────────────
// Only start a long-lived listener when run directly (local dev / Node hosts).
// On Vercel the app is imported by api/index.js as a serverless function.
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`\n🚀  Server running → http://localhost:${PORT}\n`);
  });
}

module.exports = app;
