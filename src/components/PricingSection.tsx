"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PricingHeader } from "./PricingHeader";
import { PricingRow } from "./PricingRow";

const PRICING_FEATURES = [
  {
    feature: "Same-day processing",
    standardIncluded: "Available",
    premiumIncluded: "Available"
  },
  {
    feature: "ESA letter from licensed therapist",
    standardIncluded: true,
    premiumIncluded: true
  },
  {
    feature: "Fair Housing Act (FHA) protection",
    standardIncluded: true,
    premiumIncluded: true
  },
  {
    feature: "Live anywhere with your pet free of charge",
    standardIncluded: true,
    premiumIncluded: true
  },
  {
    feature: "Licensed professional evaluation",
    standardIncluded: true,
    premiumIncluded: true
  },
  {
    feature: "Premium support",
    standardIncluded: false,
    premiumIncluded: true
  },
  {
    feature: "Priority assistance",
    standardIncluded: false,
    premiumIncluded: true
  },
  {
    feature: "Enhanced customer support",
    standardIncluded: false,
    premiumIncluded: true
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative w-full py-[70px] px-[85px] bg-[var(--color-surface-cream)] overflow-hidden max-md:py-10 max-md:px-4 md:py-14 md:px-6 lg:py-[70px] lg:px-[85px]">
      {/* Background Decorative Images - hidden on mobile to reduce clutter */}
      <img
        src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/55628dad-07fe-4a41-9c22-86c944ee1026"
        alt="Decorative illustration"
        className="absolute left-20 top-[800px] w-[443px] h-[310px] z-0 hidden lg:block"
      />
      <img
        src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/fd44dd78-c609-47ed-b113-c192270c62aa"
        alt="Decorative illustration"
        className="absolute right-22 top-[600px] w-[431px] h-[302px] z-0 hidden lg:block"
      />
      <img
        src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/f6790bb1-a02b-41c6-83f3-eb051d3360ea"
        alt="Decorative illustration"
        className="absolute right-[-120px] bottom-[-40px] w-[436px] h-[322px] z-0 hidden lg:block"
      />

      <div className="relative z-10 flex flex-col items-center gap-14 max-w-7xl mx-auto max-md:gap-8">
        {/* Pricing Header */}
        <div className="flex flex-col items-center gap-14 w-full max-md:gap-6">
          <motion.h2 
            className="w-full text-[var(--color-primary)] font-serif font-bold text-[48px] leading-[62px] text-center max-md:text-[32px] max-md:leading-tight max-md:px-2 md:text-[40px] md:leading-tight lg:text-[48px] lg:leading-[62px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Clear Pricing. Real Protection. No Surprises.
          </motion.h2>
          
          <motion.p 
            className="w-full text-[var(--color-primary)] font-sans font-normal text-[22px] leading-[26px] text-center max-md:text-base max-md:leading-6 max-md:px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            Get your ESA letter with transparent pricing, licensed professional evaluation, and full housing protection under federal law — with no hidden fees or confusing steps.
          </motion.p>
        </div>

        {/* Pricing Table - fits viewport on mobile, no horizontal scroll */}
        <motion.div
          className="w-full max-w-6xl bg-white rounded-3xl p-[50px] shadow-lg max-md:p-4 max-md:overflow-visible"
          style={{
            boxShadow: "var(--shadow-card-alt)"
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col gap-6 w-full min-w-0">
            {/* Table Headers - on mobile three equal columns so full names + pricing fit */}
            <div className="flex items-stretch w-full min-w-0 border-b border-[var(--color-border)] pb-6 max-md:pb-4">
              <div className="flex-1 min-w-0" aria-hidden />
              <div className="w-[280px] max-md:flex-1 max-md:min-w-0 max-md:flex max-md:flex-col max-md:items-center max-md:justify-center">
                <PricingHeader
                  title="Standard ESA Letter"
                  currentPrice="$128"
                  originalPrice="$160"
                  discount="20% Off"
                  delay={0.6}
                />
              </div>
              <div className="w-[280px] max-md:flex-1 max-md:min-w-0 max-md:flex max-md:flex-col max-md:items-center max-md:justify-center">
                <PricingHeader
                  title="Premium ESA Letter"
                  currentPrice="$159"
                  originalPrice="$199"
                  discount="20% Off"
                  delay={0.7}
                />
              </div>
            </div>

            {/* Feature Rows */}
            <div className="flex flex-col">
              {PRICING_FEATURES.map((feature, index) => (
                <PricingRow
                  key={feature.feature}
                  feature={feature.feature}
                  standardIncluded={feature.standardIncluded}
                  premiumIncluded={feature.premiumIncluded}
                  delay={0.8 + index * 0.1}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pricing Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/register"
            className="flex justify-center items-center w-[310px] h-[53px] px-[30px] py-4 gap-2.5 bg-[var(--color-primary)] rounded-full shadow-lg hover:bg-[var(--color-primary-hover)] transition-colors cursor-pointer max-md:w-full max-md:max-w-[310px]"
            style={{
              boxShadow: "var(--shadow-primary)"
            }}
          >
            <span className="w-[250px] h-[21px] text-[var(--color-on-primary)] font-serif font-bold text-base leading-[21px] text-center max-md:w-auto">
              Get Your Official ESA Letter Now
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
