import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createServerSupabase } from "@/lib/supabase-server";
import { getCheckoutTotal, DEFAULT_TOTAL_CENTS } from "@/lib/checkoutPricing";

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
    const { email, name, registration_id } = body;

    let amountCents = DEFAULT_TOTAL_CENTS;

    if (registration_id) {
      const supabase = createServerSupabase();
      const { data } = await supabase
        .from("registrations")
        .select("answers")
        .eq("id", registration_id)
        .single();

      if (data?.answers && typeof data.answers === "object") {
        const total = getCheckoutTotal(data.answers as Record<string, string | string[]>);
        amountCents = total.totalCents;
      }
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
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
