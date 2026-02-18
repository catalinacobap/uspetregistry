const STEP_PACKAGE = 24;
const STEP_SPEED = 25;

export const PACKAGE_PRICES = { standard: 128, premium: 159 } as const;
export const EXPRESS_ADDON = 50;
export const TAX_RATE = 0.08;

export type CheckoutTotal = {
  packagePrice: number;
  packageLabel: string;
  expressAddon: number;
  subtotal: number;
  tax: number;
  total: number;
  totalCents: number;
};

function getAnswer(answers: Record<string, string | string[]> | Record<number, string | string[]>, step: number): string | undefined {
  const key = String(step);
  const v = (answers as Record<string, string | string[]>)[key];
  return typeof v === "string" ? v : undefined;
}

export function getCheckoutTotal(answers: Record<string, string | string[]> | Record<number, string | string[]> = {}): CheckoutTotal {
  const pkg = getAnswer(answers, STEP_PACKAGE) ?? "standard";
  const speed = getAnswer(answers, STEP_SPEED) ?? "standard";

  const packagePrice = pkg === "premium" ? PACKAGE_PRICES.premium : PACKAGE_PRICES.standard;
  const packageLabel = pkg === "premium" ? "Premium ESA Letter" : "Standard ESA Letter";
  const expressAddon = speed === "express" ? EXPRESS_ADDON : 0;

  const subtotal = packagePrice + expressAddon;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;
  const totalCents = Math.round(total * 100);

  return {
    packagePrice,
    packageLabel,
    expressAddon,
    subtotal,
    tax,
    total,
    totalCents,
  };
}

/** Fallback when no registration/answers: Standard ($128) + Standard processing ($0) + 8% tax */
export const DEFAULT_TOTAL_CENTS = 13824;
