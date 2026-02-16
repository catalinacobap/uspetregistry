"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section
      className="relative w-full md:min-h-[948px] flex flex-col items-center justify-start gap-[31px] pt-16 pb-0 max-md:min-h-[75vh] max-md:pt-6 max-md:pb-0 max-md:gap-4 max-md:px-4"
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
      <div className="relative z-10 flex w-full flex-col items-center justify-start gap-[31px] max-md:gap-4 max-md:flex-none max-md:max-w-6xl max-md:mx-auto max-md:w-full">
        {/* Hero Text Container */}
        <div className="w-full flex flex-col items-center gap-[30px] max-md:gap-3 max-md:max-w-xl">
        {/* Hero Text */}
        <div className="w-full flex flex-col justify-center items-center gap-7 max-md:gap-3">
          {/* Hero Title - on mobile: two lines, "in 24 hours" on own line with highlight, slightly larger */}
          <motion.h1
            className="w-[511px] h-[136px] text-[var(--color-primary)] font-serif font-bold text-[52px] leading-[68px] text-center max-md:w-full max-md:h-auto max-md:flex max-md:flex-col max-md:items-center max-md:gap-1 max-md:text-3xl max-md:leading-tight max-md:px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span>Get your ESA Letter <br /></span>
            <span className="bg-[#2D345F]/10 px-2 py-1 rounded max-md:text-[1.15em] max-md:leading-tight">in 24 hours</span>
          </motion.h1>

          {/* Hero Subtitle */}
          <motion.p
            className="w-[445px] h-14 text-[var(--color-body-dark)] font-serif font-normal text-[22px] leading-7 text-center max-md:w-full max-md:h-auto max-md:text-base max-md:leading-6 max-md:px-2 max-md:font-sans"
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
        className="w-[553px] h-[21px] text-[var(--color-body-dark)] font-serif font-normal text-base leading-[21px] text-center max-md:w-full max-md:h-auto max-md:text-sm max-md:px-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <span className="font-bold max-md:underline max-md:decoration-[var(--color-body-dark)] max-md:underline-offset-2">Full refund </span>
        if your letter doesn&apos;t work
      </motion.p>
      </div>
    </section>
  );
}
