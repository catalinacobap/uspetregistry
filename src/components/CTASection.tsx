"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function CTASection() {
  return (
    <section
      className="relative w-full py-20 px-[85px] overflow-hidden max-md:py-10 max-md:px-4"
    >
      {/* Desktop background */}
      <div
        className="absolute inset-0 bg-no-repeat bg-right-bottom bg-cover -z-10 hidden md:block"
        style={{ backgroundImage: "url(/images/cta.png)" }}
        aria-hidden
      />
      {/* Mobile background: cta_mobile.JPG (clouds, paws, stars at bottom) */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-bottom -z-10 md:hidden"
        style={{ backgroundImage: "url(/images/cta_mobile.JPG)" }}
        aria-hidden
      />
      {/* Gradient overlay: white to transparent top→bottom (same as Hero) */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#FFFFFF] to-transparent"
        aria-hidden
      />
      <div className="relative z-10 flex items-center justify-between max-w-7xl mx-auto max-md:justify-center">
        {/* Content */}
        <div className="flex flex-col gap-8 max-w-[600px] max-md:max-w-full max-md:gap-6 max-md:items-center max-md:text-center">
          {/* Heading */}
          <motion.h2 
            className="text-[var(--color-primary)] font-serif font-bold text-[48px] leading-[62px] max-md:text-[32px] max-md:leading-tight max-md:px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Ready to Get Your ESA Letter?
          </motion.h2>
          
          {/* Description */}
          <motion.p 
            className="text-[var(--color-muted)] font-sans font-normal text-[22px] leading-[26px] max-w-[520px] max-md:text-base max-md:leading-6 max-md:max-w-full max-md:px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            Complete a quick assessment and get matched with a licensed professional to receive your legally compliant ESA letter — fast and simple.
          </motion.p>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="self-start max-md:self-center"
          >
            <Link
              href="/register"
              className="flex justify-center items-center w-[200px] h-[53px] px-[30px] py-4 gap-2.5 bg-[var(--color-primary)] rounded-full shadow-lg hover:bg-[var(--color-primary-hover)] transition-colors cursor-pointer max-md:w-full max-md:max-w-[200px]"
              style={{
                boxShadow: "var(--shadow-primary)"
              }}
            >
              <span className="text-[var(--color-on-primary)] font-serif font-bold text-base leading-[21px] text-center">
                Get Started Now
              </span>
            </Link>
          </motion.div>
          
          {/* Note - all blue, bold, condensed spacing, center-aligned to match design */}
          <motion.p 
            className="text-[var(--color-primary)] font-inter font-bold text-base leading-snug tracking-tight max-w-[500px] mt-8 max-md:max-w-full max-md:mt-6 max-md:mb-40 max-md:text-sm max-md:px-2 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
          >
            Note: Airlines no longer recognize ESAs for air travel. For flights, your animal must qualify as a Psychiatric Service Dog (PSD).
          </motion.p>
        </div>
      </div>
    </section>
  );
}
