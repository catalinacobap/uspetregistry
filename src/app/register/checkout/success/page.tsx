"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const registrationId = searchParams.get("registration_id");
    if (!registrationId) return;
    fetch("/api/register-paid-notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ registration_id: registrationId }),
    }).catch(() => {});
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <CheckoutHeader />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-[var(--color-success)] flex items-center justify-center mb-6">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h1 className="text-[var(--color-body-dark)] font-sans font-bold text-2xl md:text-3xl mb-2">
            Payment successful
          </h1>
          <p className="text-[var(--color-text-secondary)] font-sans text-base mb-8">
            Thank you for your order. Your ESA letter process is underway. Our team will contact you shortly to complete your application.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center py-3.5 px-6 rounded-lg bg-[var(--color-primary)] text-[var(--color-on-primary)] font-sans font-bold text-base hover:bg-[var(--color-primary-hover)] transition-colors"
              style={{ boxShadow: "var(--shadow-primary)" }}
            >
              Back to home
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center py-3.5 px-6 rounded-lg border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-sans font-bold text-base hover:bg-[var(--color-primary)]/10 transition-colors"
            >
              Start another registration
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
