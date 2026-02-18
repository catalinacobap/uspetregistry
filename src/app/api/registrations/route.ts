import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";
import { sendMakeWebhook1Emails } from "@/lib/make-webhooks";

export type RegistrationPayload = {
  answers: Record<number, string | string[]>;
  email: string;
  termsAccepted: boolean;
  fullName: string;
  phone: string;
  autoRenew: boolean;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegistrationPayload;
    const { answers, email, termsAccepted, fullName, phone, autoRenew } = body;

    if (!email?.trim()) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const supabase = createServerSupabase();

    const { data, error } = await supabase
      .from("registrations")
      .insert({
        answers: answers ?? {},
        email: email.trim(),
        terms_accepted: Boolean(termsAccepted),
        full_name: (fullName ?? "").trim(),
        phone: (phone ?? "").trim(),
        auto_renew: Boolean(autoRenew),
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const emailTrim = email.trim();
    void sendMakeWebhook1Emails(emailTrim);

    return NextResponse.json({ id: data.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
