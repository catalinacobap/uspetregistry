"use client";

import Link from "next/link";

type FormPageLayoutProps = {
  /** Left side of header: back button (register) or spacer (search) */
  leftSlot: React.ReactNode;
  /** Optional slot below header: progress bar + refund banner (register) */
  topSlot?: React.ReactNode;
  /** Tighter top padding so content (question/buttons) sits closer to topSlot */
  contentPadding?: "tight" | "normal";
  children: React.ReactNode;
  countdown: { minutes: number; seconds: number };
};

export function FormPageLayout({
  leftSlot,
  topSlot,
  contentPadding = "normal",
  children,
  countdown,
}: FormPageLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col min-h-[100dvh]">
      {/* Background: on mobile start at ~55% so illustration shows in lower half; desktop full cover */}
      <div
        className="absolute inset-0 max-md:top-[55%] bg-no-repeat -z-10 bg-cover bg-bottom max-md:bg-cover max-md:bg-bottom"
        style={{
          backgroundImage: "url('/images/other/bg.PNG')",
          backgroundColor: "var(--color-surface-cream)",
        }}
        aria-hidden
      />
      {/* Gradient overlay: same as hero, above the image */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#FFFFFF] to-transparent -z-10"
        aria-hidden
      />

      {/* Header: compact, logo only in center (like search-registry) */}
      <header className="relative z-10 w-full py-4 px-4 md:px-8 flex items-center justify-between bg-white border-b border-[var(--color-border)]">
        <div className="w-10 shrink-0 flex items-center justify-center">
          {leftSlot}
        </div>
        <Link
          href="/"
          className="flex flex-col items-center gap-0.5 shrink-0"
          aria-label="US Pet Registry home"
        >
          <img
            src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/3ced41e7-9c12-4102-acb4-d29270fa9f11"
            alt="US Pet Registry"
            className="h-9 w-auto object-contain"
          />
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary-hover)] transition-colors shrink-0"
          aria-label="Close"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </Link>
      </header>

      {topSlot}

      <div
        className={`flex-1 flex flex-col items-center justify-center px-4 relative overflow-hidden font-serif text-base ${
          contentPadding === "tight"
            ? "pt-3 pb-8 md:pt-4 md:pb-12"
            : "py-8 md:py-12"
        }`}
      >
        {children}
      </div>

      {/* Discount banner: 14px mobile, 16px desktop */}
      <footer className="w-full py-4 px-4 md:px-8 bg-[var(--color-surface-cream)] border-t border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3 md:justify-center md:text-center">
          <p className="text-[var(--color-primary)] font-serif font-bold text-[14px] md:text-[16px] max-md:text-left max-md:flex-1 max-md:min-w-0">
            Get 20% off your ESA consultation
            <br className="max-md:block md:hidden" />
            by booking in the next
          </p>
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-[var(--color-primary)] text-white shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span className="font-serif font-bold tabular-nums text-sm md:text-base">
              {String(countdown.minutes).padStart(2, "0")}:{String(countdown.seconds).padStart(2, "0")}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
