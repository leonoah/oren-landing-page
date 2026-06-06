const express = require('express');
const router  = express.Router();

/**
 * POST /api/subscribe
 * Body: { email, name? }
 *
 * TODO: connect a payment provider:
 *   Option A — Cardcom (Israel):  https://cardcom.solutions
 *   Option B — Stripe Checkout:   https://stripe.com
 *   Option C — PayPal Subscriptions
 *
 * TODO: optionally add to mailing list:
 *   - Mailchimp / ActiveCampaign / Brevo
 */
router.post('/', async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'אימייל חסר' });
    }

    // ── Stripe example ─────────────────────────────────
    // const Stripe = require('stripe');
    // const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    // const session = await stripe.checkout.sessions.create({
    //   mode: 'subscription',
    //   payment_method_types: ['card'],
    //   line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    //   customer_email: email,
    //   success_url: `${process.env.BASE_URL}/success`,
    //   cancel_url:  `${process.env.BASE_URL}/#pricing`,
    // });
    // return res.json({ redirectUrl: session.url });

    // ── Cardcom example ────────────────────────────────
    // Call Cardcom API with TerminalNumber, UserName, etc.

    console.log('[subscribe]', { email, name });

    res.json({
      success: true,
      // redirectUrl: 'https://your-payment-page.com'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'שגיאת שרת' });
  }
});

module.exports = router;
