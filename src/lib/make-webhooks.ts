/**
 * Make.com webhook URLs from env (no keys in code).
 * - MAKE_WEBHOOK_1: email only
 * - MAKE_WEBHOOK_2: email, phone, name
 * - MAKE_WEBHOOK_3: paid - full registration data
 */

function getWebhookUrl(key: "MAKE_WEBHOOK_1" | "MAKE_WEBHOOK_2" | "MAKE_WEBHOOK_3"): string | null {
  return process.env[key] ?? null;
}

/** Fire-and-forget: send payload to Make webhook. Never throws. */
async function postToMake(url: string | null, payload: Record<string, unknown>): Promise<void> {
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Don't fail the main flow if Make is down
  }
}

/** Webhook #1: email only. Fired when user submits email on the email step. Never throws. */
export async function sendRegisterEmailWebhook(email: string): Promise<void> {
  const trimmed = email?.trim();
  if (!trimmed) return;
  await postToMake(getWebhookUrl("MAKE_WEBHOOK_1"), { email: trimmed });
}

/** Webhook #1: email only. Call when we have an email (e.g. after registration create). */
export async function sendMakeWebhook1Emails(email: string): Promise<void> {
  await postToMake(getWebhookUrl("MAKE_WEBHOOK_1"), { email: email.trim() });
}

/** Webhook #2: email, phone, name. Fired when user continues from prequal step. Never throws. */
export async function sendRegisterPrequalWebhook(
  email: string,
  phone: string,
  name: string
): Promise<void> {
  await postToMake(getWebhookUrl("MAKE_WEBHOOK_2"), {
    email: email?.trim() ?? "",
    phone: phone?.trim() ?? "",
    name: name?.trim() ?? "",
  });
}

/** Payload sent when payment succeeds (from Stripe webhook). Webhook #3: paid + all form data. */
export type RegisterPaidPayload = {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  terms_accepted: boolean;
  auto_renew: boolean;
  created_at: string;
  answers: Record<number, string | string[]>;
  payment_intent_id: string;
  amount_paid_cents: number;
};

/** Webhook #3: paid + all registration data. Fired when Stripe payment_intent.succeeded. Never throws. */
export async function sendMakeWebhook3Paid(payload: RegisterPaidPayload): Promise<void> {
  await postToMake(getWebhookUrl("MAKE_WEBHOOK_3"), { paid: true, ...payload });
}
