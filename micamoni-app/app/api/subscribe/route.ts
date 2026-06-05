import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // TODO: connect to payment provider
    // Option A — Stripe Checkout:
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const session = await stripe.checkout.sessions.create({ ... });
    // return NextResponse.json({ url: session.url });

    // Option B — Cardcom (Israeli):
    // Call Cardcom API with subscription details

    // Option C — Add to mailing list (Mailchimp / ActiveCampaign):
    // await addToList({ email, name });

    console.log("Subscribe request:", { email, name });

    return NextResponse.json({
      success: true,
      // redirectUrl: "https://payment-provider.com/checkout/..."
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
