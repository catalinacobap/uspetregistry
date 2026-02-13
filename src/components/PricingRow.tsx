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
        <span className="text-[var(--color-primary)] font-inter font-semibold text-2xl leading-[31px] text-center max-md:text-base">
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
      className="flex items-center w-full border-b border-[var(--color-border)] last:border-b-0 max-md:min-w-[480px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
    >
      {/* Feature Name */}
      <div className="flex-1 py-[18px] px-[31px] max-md:py-3 max-md:px-4 max-md:min-w-[140px] max-md:px-3">
        <h3 className="text-[var(--color-primary)] font-serif font-bold text-2xl leading-[31px] text-left max-md:text-base max-md:leading-5">
          {feature}
        </h3>
      </div>
      
      {/* Standard Column */}
      <div className="w-[280px] flex justify-center items-center py-[18px] px-[31px] max-md:w-[160px] max-md:py-3 max-md:px-3 flex-shrink-0">
        {renderIcon(standardIncluded)}
      </div>
      
      {/* Premium Column */}
      <div className="w-[280px] flex justify-center items-center py-[18px] px-[31px] max-md:w-[160px] max-md:py-3 max-md:px-3 flex-shrink-0">
        {renderIcon(premiumIncluded)}
      </div>
    </motion.div>
  );
}
