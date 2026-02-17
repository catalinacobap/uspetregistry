/**
 * Make.com webhook URLs from env (no keys in code).
 * - MAKE_WEBHOOK_1: emails only
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

/** Webhook #1: emails only. Call when we have an email (e.g. after registration create). */
export async function sendMakeWebhook1Emails(email: string): Promise<void> {
  await postToMake(getWebhookUrl("MAKE_WEBHOOK_1"), { email: email.trim() });
}

/** Webhook #2: email, phone, name. Call when we have all three (e.g. after registration create). */
export async function sendMakeWebhook2Lead(email: string, phone: string, name: string): Promise<void> {
  await postToMake(getWebhookUrl("MAKE_WEBHOOK_2"), {
    email: email.trim(),
    phone: (phone ?? "").trim(),
    name: (name ?? "").trim(),
  });
}

/** Webhook #3: paid - full registration. Call when payment succeeds. */
export async function sendMakeWebhook3Paid(payload: Record<string, unknown>): Promise<void> {
  await postToMake(getWebhookUrl("MAKE_WEBHOOK_3"), payload);
}
