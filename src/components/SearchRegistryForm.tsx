"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function SearchRegistryForm() {
  const [registrationId, setRegistrationId] = useState("");
  const [countdown, setCountdown] = useState({ minutes: 10, seconds: 15 });

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown((c) => {
        if (c.seconds > 0) return { ...c, seconds: c.seconds - 1 };
        if (c.minutes > 0) return { minutes: c.minutes - 1, seconds: 59 };
        return c;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to registry lookup API
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background image - park scene */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/images/other/bg.PNG')" }}
        aria-hidden
      />
      {/* Gradient overlay: white to transparent (same as Hero) */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#FFFFFF] to-transparent -z-10"
        aria-hidden
      />
      {/* Header: logo left, X right (no back button) */}
      <header className="relative z-10 w-full py-4 px-4 md:px-8 flex items-center justify-between">
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
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary-hover)] transition-colors cursor-pointer shrink-0"
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

      {/* Main content - lookup form */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative z-10 w-full max-w-lg mx-auto"
        >
          <form
            onSubmit={handleVerify}
            className="flex flex-col items-center gap-6"
          >
            <h1 className="text-[var(--color-primary)] font-serif font-bold text-3xl md:text-4xl lg:text-[42px] leading-tight text-center">
              ESA Registration Lookup
            </h1>

            {/* Subtitle with butterfly accent */}
            <p className="flex items-center gap-2 text-[var(--color-muted)] font-sans text-base md:text-lg text-center max-w-md">
              Search the registry to verify ESA registration status
            </p>

            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="esa-registration-id"
                className="text-[var(--color-primary)] font-sans font-medium text-sm md:text-base"
              >
                Enter ESA Registration ID
              </label>
              <input
                id="esa-registration-id"
                type="text"
                value={registrationId}
                onChange={(e) => setRegistrationId(e.target.value)}
                placeholder="e.g. ESA - 123456"
                className="w-full py-3 px-4 rounded-xl border-2 border-[var(--color-border)] bg-white font-sans text-[var(--color-primary)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full max-w-[200px] py-4 px-6 rounded-xl bg-[var(--color-primary)] text-[var(--color-on-primary)] font-serif font-bold text-lg shadow-lg hover:bg-[var(--color-primary-hover)] transition-colors cursor-pointer"
            >
              Verify
            </button>
          </form>
        </motion.div>
      </div>

      {/* Footer promo bar - same as register */}
      <footer className="w-full py-4 px-4 md:px-8 bg-white border-t border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-2 text-center">
          <p className="font-sans text-sm text-[#303952]">
            Get 20% off your ESA consultation by booking in the next
          </p>
          <div
            className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-[#303952] text-white shadow-md"
            style={{ boxShadow: "0 2px 8px rgba(48, 57, 82, 0.25)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span className="font-mono font-bold tabular-nums text-sm">
              {String(countdown.minutes).padStart(2, "0")}:{String(countdown.seconds).padStart(2, "0")}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
