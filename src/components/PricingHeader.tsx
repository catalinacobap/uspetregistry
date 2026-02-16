"use client";

import { motion } from "framer-motion";

interface PricingHeaderProps {
  title: string;
  currentPrice: string;
  originalPrice: string;
  discount: string;
  delay?: number;
}

export function PricingHeader({ 
  title, 
  currentPrice, 
  originalPrice, 
  discount, 
  delay = 0 
}: PricingHeaderProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-[18px] px-[31px] gap-2.5 max-md:py-3 max-md:px-2 max-md:gap-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
      {/* Product name - PT Serif 16px bold, full name (wraps on mobile) */}
      <h3 className="text-[var(--color-primary)] font-serif font-bold text-[16px] leading-tight text-center">
        {title}
      </h3>
      
      {/* Current price - Inter 24px bold blue; Original - Inter 16px bold red strikethrough */}
      <div className="flex flex-col items-center gap-0 text-center">
        <span className="font-inter text-[var(--color-primary)] font-bold text-[24px] leading-tight">
          {currentPrice}
        </span>
        <span className="font-inter text-[var(--color-discount)] font-bold text-[16px] line-through leading-tight">
          {originalPrice}
        </span>
      </div>
      
      {/* Discount - Inter 14px regular */}
      <p className="font-inter text-[var(--color-body-dark)] font-normal text-[14px] leading-tight text-center">
        {discount}
      </p>
    </motion.div>
  );
}
