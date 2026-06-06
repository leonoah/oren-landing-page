const express = require('express');
const router  = express.Router();

/**
 * POST /api/contact
 * Body: { name, email, message }
 *
 * TODO: connect an email service:
 *   - Resend  → https://resend.com
 *   - Nodemailer + Gmail
 *   - SendGrid
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'שדות חסרים' });
    }

    // Example (Resend):
    // const { Resend } = require('resend');
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'no-reply@micamoni.com',
    //   to: process.env.CONTACT_EMAIL,
    //   subject: `הודעה חדשה מ-${name}`,
    //   text: message,
    // });

    console.log('[contact]', { name, email, message });

    res.json({ success: true, message: 'ההודעה התקבלה' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'שגיאת שרת' });
  }
});

module.exports = router;
