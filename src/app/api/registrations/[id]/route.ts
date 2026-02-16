import { NextRequest, NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase-server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Missing registration id" }, { status: 400 });
    }

    const supabase = createServerSupabase();

    const { data, error } = await supabase
      .from("registrations")
      .select("id, answers, email, terms_accepted, full_name, phone, auto_renew, created_at")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: data.id,
      answers: data.answers,
      email: data.email,
      termsAccepted: data.terms_accepted,
      fullName: data.full_name,
      phone: data.phone,
      autoRenew: data.auto_renew,
      createdAt: data.created_at,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
