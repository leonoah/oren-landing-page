import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // TODO: connect to email service (Resend / SendGrid / NodeMailer)
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({ from: 'noreply@micamoni.com', to: 'micamonilev@gmail.com', subject: `New message from ${name}`, text: message });

    console.log("Contact form submission:", { name, email, message });

    return NextResponse.json({ success: true, message: "Message received" });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
