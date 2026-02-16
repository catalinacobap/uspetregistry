"use client";

import Link from "next/link";

export function CheckoutHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[var(--color-border)]">
      <div className="w-full h-[72px] py-2.5 px-6 flex items-center gap-4 max-md:px-4">
        <Link
          href="/register"
          className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[var(--color-border-warm)]/30 transition-colors"
          aria-label="Back to registration"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--color-primary)]"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center flex-shrink-0"
          aria-label="US Pet Registry home"
        >
          <img
            src="/logo.png"
            alt="US Pet Registry"
            className="h-9 w-auto object-contain"
          />
        </Link>
      </div>
    </header>
  );
}
