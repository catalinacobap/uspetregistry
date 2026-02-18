import { NextRequest, NextResponse } from "next/server";
import { sendRegisterPrequalWebhook } from "@/lib/make-webhooks";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body?.email === "string" ? body.email : "";
    const phone = typeof body?.phone === "string" ? body.phone : "";
    const name = typeof body?.name === "string" ? body.name : "";
    await sendRegisterPrequalWebhook(email, phone, name);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
