import { STEP_PACKAGE, STEP_SPEED } from "./registerSteps";

export const PACKAGE_PRICES = { standard: 128, premium: 159 } as const;
/** List prices before 20% discount - for display (Standard $160, Premium $199) */
export const PACKAGE_LIST_PRICES = { standard: 160, premium: 199 } as const;
export const EXPRESS_ADDON = 50;
export const TAX_RATE = 0.08;

export type CheckoutTotal = {
  packagePrice: number;
  packageListPrice: number;
  packageLabel: string;
  expressAddon: number;
  subtotal: number;
  tax: number;
  total: number;
  totalCents: number;
};

function getAnswer(answers: Record<string, string | string[]> | Record<number, string | string[]>, step: number): string | undefined {
  const key = String(step);
  const record = answers as Record<string | number, string | string[]>;
  const v = record[key] ?? record[step];
  return typeof v === "string" ? v : undefined;
}

export function getCheckoutTotal(answers: Record<string, string | string[]> | Record<number, string | string[]> = {}): CheckoutTotal {
  const pkg = getAnswer(answers, STEP_PACKAGE) ?? "standard";
  const speed = getAnswer(answers, STEP_SPEED) ?? "standard";

  const packagePrice = pkg === "premium" ? PACKAGE_PRICES.premium : PACKAGE_PRICES.standard;
  const packageListPrice = pkg === "premium" ? PACKAGE_LIST_PRICES.premium : PACKAGE_LIST_PRICES.standard;
  const packageLabel = pkg === "premium" ? "Premium ESA Letter" : "Standard ESA Letter";
  const expressAddon = speed === "express" ? EXPRESS_ADDON : 0;

  const subtotal = packagePrice + expressAddon;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;
  const totalCents = Math.round(total * 100);

  return {
    packagePrice,
    packageListPrice,
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
