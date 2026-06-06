require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app = express();

// ─── Middleware ─────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Static files (landing page — served unchanged) ─────────────────────────
app.use(express.static(path.join(__dirname, '../public')));

// ─── API routes ─────────────────────────────────────────────────────────────
app.use('/api/contact',   require('./routes/contact'));
app.use('/api/subscribe', require('./routes/subscribe'));

// ─── Fallback → index.html ──────────────────────────────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ─── Start ──────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀  Server running → http://localhost:${PORT}\n`);
});
