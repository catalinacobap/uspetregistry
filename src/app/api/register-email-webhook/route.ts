import { NextRequest, NextResponse } from "next/server";
import { sendRegisterEmailWebhook } from "@/lib/make-webhooks";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body?.email === "string" ? body.email : "";
    await sendRegisterEmailWebhook(email);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
