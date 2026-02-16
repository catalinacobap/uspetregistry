import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(key, { apiVersion: "2026-01-28.clover" });
}

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const body = await req.json();
    const { email, name } = body;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      // TODO: Replace with real Price IDs from your Stripe Dashboard
      line_items: [
        {
          price: "price_REPLACE_WITH_ESA_LETTER_PRICE_ID",
          quantity: 1,
        },
        {
          price: "price_REPLACE_WITH_EXPRESS_PROCESSING_PRICE_ID",
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: { name },
      success_url: `${req.nextUrl.origin}/register/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/register/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
