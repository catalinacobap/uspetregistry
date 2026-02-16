import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(key, { apiVersion: "2026-01-28.clover" });
}

const AMOUNT_CENTS = 19224; // $192.24

export async function POST(req: NextRequest) {
  try {
    const stripe = getStripe();
    const body = await req.json();
    const { email, name, registration_id } = body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: AMOUNT_CENTS,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        name: name ?? "",
        email: email ?? "",
        registration_id: registration_id ?? "",
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
