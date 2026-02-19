"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section
      className="relative w-full overflow-visible min-h-[75vh] flex flex-col items-center pt-16 pb-0 max-md:min-h-[75vh] max-md:pt-12 max-md:pb-6 max-md:px-4 md:min-h-[75vh] md:px-6 lg:min-h-[948px] lg:px-[85px]"
    >
      {/* Background image (desktop and mobile) */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-[center_49%] -z-10"
        style={{ backgroundImage: "url('/images/hero.PNG')" }}
        aria-hidden
      />
      {/* Gradient overlay: white to transparent so text stays readable */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#FFFFFF] to-transparent"
        aria-hidden
      />
      {/* Main content - stays at top */}
      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-start gap-8 max-md:gap-6 max-md:max-w-6xl max-md:mx-auto max-md:w-full md:gap-10 md:max-w-3xl md:mx-auto md:w-full lg:gap-12 lg:max-w-6xl">
        {/* Hero Text Container */}
        <div className="w-full flex flex-col items-center gap-8 max-md:gap-6 max-md:max-w-xl md:gap-8 md:max-w-2xl">
          {/* Hero Text */}
          <div className="w-full flex flex-col justify-center items-center gap-7 max-md:gap-6 md:gap-6">
            {/* Hero Title */}
            <motion.h1
              className="w-full max-w-[511px] h-auto text-[var(--color-primary)] font-serif font-bold text-[52px] leading-[68px] text-center max-md:flex max-md:flex-col max-md:items-center max-md:gap-1 max-md:text-3xl max-md:leading-tight max-md:px-2 md:text-4xl md:leading-tight md:px-2 lg:text-[52px] lg:leading-[68px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span>Get your ESA Letter <br /></span>
              <span className="bg-[#2D345F]/10 px-2 py-1 rounded max-md:text-[1.15em] max-md:leading-tight">in 24 hours</span>
            </motion.h1>

            {/* Hero Subtitle */}
            <motion.p
              className="w-full max-w-[445px] h-auto text-[var(--color-body-dark)] font-serif font-normal text-[22px] leading-7 text-center max-md:w-full max-md:text-base max-md:leading-6 max-md:px-2 max-md:font-sans md:text-lg md:leading-7 lg:text-[22px] mt-4 max-md:mt-3 md:mt-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              You don&apos;t have to pay rent for your pet or adhere to &quot;no
              pet&quot; policies.
            </motion.p>
          </div>

          {/* Button + refund line — tight gap between them */}
          <div className="flex flex-col items-center gap-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/register"
                className="flex justify-center items-center w-[182px] h-[53px] px-[10px] py-4 gap-2.5 bg-[var(--color-primary)] rounded-full cursor-pointer max-md:w-auto max-md:min-w-0 max-md:px-10 max-md:py-3.5 max-md:h-auto"
                style={{ boxShadow: "var(--shadow-primary)" }}
              >
                <span className="text-[var(--color-on-primary)] font-serif font-bold text-[12px] md:text-[16px] leading-tight text-center">
                  Get Started
                </span>
              </Link>
            </motion.div>
            <motion.p
              className="w-full max-w-[553px] text-[var(--color-body-dark)] font-serif font-normal text-base leading-[21px] text-center max-md:text-sm max-md:px-0 md:px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <span className="font-bold underline decoration-[var(--color-body-dark)] underline-offset-2">Full refund </span>
              if your letter doesn&apos;t work
            </motion.p>
          </div>
        </div>
      </div>

      {/* Trust badges: mobile only — 3 cards (1 + 2), blur, full width like hero content */}
      <motion.div
        className="relative z-10 w-full mt-auto px-4 pt-2 pb-2 md:hidden"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
      >
        <div className="flex flex-col items-stretch gap-1.5 w-full">
          {/* Row 1: one centered */}
          <div className="flex items-center gap-2 rounded-2xl bg-white/50 backdrop-blur-md border border-white/40 px-3 py-2.5 w-full justify-start">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/70 text-[var(--color-primary)]" aria-hidden>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
            </span>
            <span className="text-[var(--color-body-dark)] font-sans font-medium text-xs text-left">4.9 Stars across all platforms</span>
          </div>
          {/* Row 2: two side by side */}
          <div className="flex items-center gap-1.5 w-full">
            <div className="flex items-center gap-2 rounded-2xl bg-white/50 backdrop-blur-md border border-white/40 px-3 py-2.5 flex-1 min-w-0 justify-start">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/70 text-[var(--color-primary)]" aria-hidden>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </span>
              <span className="text-[var(--color-body-dark)] font-sans font-medium text-xs text-left">Trusted by landlords nationwide</span>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-white/50 backdrop-blur-md border border-white/40 px-3 py-2.5 flex-1 min-w-0 justify-start">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/70 text-[var(--color-primary)]" aria-hidden>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
              </span>
              <span className="text-[var(--color-body-dark)] font-sans font-medium text-xs text-left">Same-day processing</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
