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
      className="flex flex-col items-center py-[18px] px-[31px] gap-2.5 max-md:py-3 max-md:px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
      {/* Title */}
      <h3 className="text-[var(--color-primary)] font-serif font-bold text-2xl leading-[31px] text-center max-md:text-lg max-md:leading-6">
        {title}
      </h3>
      
      {/* Price */}
      <div className="text-center">
        <span className="text-[var(--color-primary)] font-inter font-bold text-2xl leading-[31px] max-md:text-xl max-md:leading-7">
          {currentPrice}{" "}
        </span>
        <span className="text-[var(--color-discount)] font-inter font-semibold text-2xl leading-[31px] line-through max-md:text-lg">
          {originalPrice}
        </span>
      </div>
      
      {/* Discount */}
      <p className="text-[var(--color-primary)] font-inter font-normal text-2xl leading-[31px] text-center max-md:text-base">
        {discount}
      </p>
    </motion.div>
  );
}
