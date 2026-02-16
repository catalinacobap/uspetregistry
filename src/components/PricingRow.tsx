"use client";

import { motion } from "framer-motion";

interface PricingRowProps {
  feature: string;
  standardIncluded: boolean | string;
  premiumIncluded: boolean | string;
  delay?: number;
}

export function PricingRow({ 
  feature, 
  standardIncluded, 
  premiumIncluded, 
  delay = 0 
}: PricingRowProps) {
  const renderIcon = (included: boolean | string) => {
    if (typeof included === 'string') {
      return (
        <span className="text-[var(--color-primary)] font-serif text-[16px] font-bold leading-tight text-center">
          {included}
        </span>
      );
    }
    
    return (
      <img
        src={included 
          ? "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/2e890ed1-c7fd-40f6-9669-62c63a470c4e"
          : "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/76e364ae-21fb-4ba9-acde-e42f2548c658"
        }
        alt={included ? "Included" : "Not included"}
        className="w-6 h-6"
      />
    );
  };

  return (
    <motion.div
      className="flex items-center w-full min-w-0 border-b border-[var(--color-border)] last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
    >
      {/* Feature name - PT Serif 16px bold dark blue, wraps */}
      <div className="flex-1 min-w-0 py-[18px] px-[31px] max-md:py-3 max-md:px-2">
        <h3 className="text-[var(--color-primary)] font-serif font-bold text-[16px] leading-tight text-left">
          {feature}
        </h3>
      </div>
      
      {/* Standard column - same width as header on mobile (flex-1) */}
      <div className="w-[280px] flex justify-center items-center py-[18px] px-[31px] max-md:flex-1 max-md:min-w-0 max-md:py-3 max-md:px-2 shrink-0">
        {renderIcon(standardIncluded)}
      </div>
      
      {/* Premium column - same width as header on mobile (flex-1) */}
      <div className="w-[280px] flex justify-center items-center py-[18px] px-[31px] max-md:flex-1 max-md:min-w-0 max-md:py-3 max-md:px-2 shrink-0">
        {renderIcon(premiumIncluded)}
      </div>
    </motion.div>
  );
}
