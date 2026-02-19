"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section
      className="relative w-full overflow-visible min-h-[85vh] flex flex-col items-center pt-16 pb-0 max-md:min-h-[85vh] max-md:pt-12 max-md:pb-6 max-md:px-4 md:min-h-[75vh] md:px-6 lg:min-h-[948px] lg:px-[85px]"
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
      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-start gap-[31px] max-md:gap-6 max-md:max-w-6xl max-md:mx-auto max-md:w-full md:gap-7 md:max-w-3xl md:mx-auto md:w-full lg:max-w-6xl">
        {/* Hero Text Container */}
        <div className="w-full flex flex-col items-center gap-[30px] max-md:gap-6 max-md:max-w-xl md:gap-6 md:max-w-2xl">
          {/* Hero Text */}
          <div className="w-full flex flex-col justify-center items-center gap-7 max-md:gap-6 md:gap-6">
            {/* Hero Title - responsive: mobile 3xl, tablet 4xl, desktop 52px */}
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
              className="w-full max-w-[445px] h-auto text-[var(--color-body-dark)] font-serif font-normal text-[22px] leading-7 text-center max-md:w-full max-md:text-base max-md:leading-6 max-md:px-2 max-md:font-sans md:text-lg md:leading-7 lg:text-[22px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              You don&apos;t have to pay rent for your pet or adhere to &quot;no
              pet&quot; policies.
            </motion.p>
          </div>

          {/* Hero Button Container */}
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
              style={{
                boxShadow: "var(--shadow-primary)",
              }}
            >
              <span className="text-[var(--color-on-primary)] font-serif font-bold text-[12px] md:text-[16px] leading-tight text-center">
                Get Started
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Hero Note - "Full refund" underlined on mobile */}
        <motion.p
          className="w-full max-w-[553px] h-auto text-[var(--color-body-dark)] font-serif font-normal text-base leading-[21px] text-center max-md:w-full max-md:text-sm max-md:px-0 md:px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <span className="font-bold max-md:underline max-md:decoration-[var(--color-body-dark)] max-md:underline-offset-2">Full refund </span>
          if your letter doesn&apos;t work
        </motion.p>
      </div>

      {/* Green trust badge - anchored at bottom of hero */}
      <motion.div
        className="relative z-10 w-full mt-auto flex justify-center px-4 pt-4 pb-10 max-md:pt-5 max-md:pb-5 max-md:px-4 md:pt-5 md:pb-8 lg:pb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.4 }}
      >
        <div className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-success-bg)] border border-[var(--color-success)]/30 px-5 py-2.5 max-md:w-full max-md:max-w-[90%] max-md:px-4 max-md:py-3 max-md:rounded-2xl max-md:gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-success)] shrink-0 max-md:w-1.5 max-md:h-1.5 max-md:self-center" aria-hidden />
          <span className="font-serif text-sm font-medium text-[var(--color-success)] max-md:text-xs max-md:leading-snug max-md:text-center">
            Trusted & secure — HIPAA compliant, protected under federal housing law
          </span>
        </div>
      </motion.div>
    </section>
  );
}
