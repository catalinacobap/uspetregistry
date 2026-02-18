import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";
import { sendMakeWebhook3Paid } from "@/lib/make-webhooks";

/**
 * Called when checkout success page loads with a registration_id.
 * Fetches full registration and sends paid + all data to the devtoollab webhook.
 * Stripe webhook (payment_intent.succeeded) is the primary source; this ensures we
 * still send when the user lands on success (e.g. if Stripe webhook isn't configured).
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const registrationId = typeof body?.registration_id === "string" ? body.registration_id.trim() : "";
    if (!registrationId) {
      return NextResponse.json({ error: "registration_id required" }, { status: 400 });
    }

    const supabase = createServerSupabase();
    const { data: registration, error } = await supabase
      .from("registrations")
      .select("id, answers, email, terms_accepted, full_name, phone, auto_renew, created_at")
      .eq("id", registrationId)
      .single();

    if (error || !registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    const created_at =
      typeof registration.created_at === "string"
        ? registration.created_at
        : registration.created_at
          ? new Date(registration.created_at).toISOString()
          : "";

    const payload = {
      id: registration.id,
      email: registration.email ?? "",
      full_name: registration.full_name ?? "",
      phone: registration.phone ?? "",
      terms_accepted: Boolean(registration.terms_accepted),
      auto_renew: Boolean(registration.auto_renew),
      created_at,
      answers: (registration.answers as Record<number, string | string[]>) ?? {},
      payment_intent_id: "",
      amount_paid_cents: 0,
    };

    void sendMakeWebhook3Paid(payload);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
