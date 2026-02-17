import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerSupabase } from "@/lib/supabase-server";
import { sendMakeWebhook3Paid } from "@/lib/make-webhooks";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key, { apiVersion: "2026-01-28.clover" });
}

export async function POST(req: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type !== "payment_intent.succeeded") {
    return NextResponse.json({ received: true });
  }

  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  const registrationId = paymentIntent.metadata?.registration_id;
  if (!registrationId) {
    return NextResponse.json({ received: true });
  }

  const supabase = createServerSupabase();
  const { data: registration, error } = await supabase
    .from("registrations")
    .select("id, answers, email, terms_accepted, full_name, phone, auto_renew, created_at")
    .eq("id", registrationId)
    .single();

  if (error || !registration) {
    return NextResponse.json({ received: true });
  }

  const payload = {
    id: registration.id,
    email: registration.email,
    full_name: registration.full_name,
    phone: registration.phone,
    terms_accepted: registration.terms_accepted,
    auto_renew: registration.auto_renew,
    created_at: registration.created_at,
    answers: registration.answers,
    payment_intent_id: paymentIntent.id,
    amount_paid_cents: paymentIntent.amount,
  };

  void sendMakeWebhook3Paid(payload);

  return NextResponse.json({ received: true });
}
