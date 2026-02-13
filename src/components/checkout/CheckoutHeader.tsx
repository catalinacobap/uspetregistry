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
          className="flex items-center gap-2 flex-shrink-0"
          aria-label="US Pet Registry home"
        >
          <img
            src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/3ced41e7-9c12-4102-acb4-d29270fa9f11"
            alt=""
            className="w-10 h-10 object-contain"
            aria-hidden
          />
          <span className="flex flex-col leading-tight">
            <span className="text-[var(--color-primary)] font-serif font-bold text-lg">
              US Pet
            </span>
            <span className="text-[#c41e3a] font-serif font-bold text-sm -mt-0.5">
              Registry
            </span>
          </span>
        </Link>
      </div>
    </header>
  );
}
