"use client";

import { motion } from "framer-motion";

interface ProcessStepProps {
  icon: string;
  title: string;
  status: string;
  stepTitle: string;
  description: string;
  delay?: number;
}

export function ProcessStep({ 
  icon, 
  title, 
  status, 
  stepTitle, 
  description, 
  delay = 0 
}: ProcessStepProps) {
  return (
    <motion.div
      className="flex flex-col flex-1 bg-[var(--color-surface-cream)] border border-[var(--color-border-warm)] rounded-2xl py-12 px-0 gap-2.5 max-md:w-full max-md:min-w-0 max-md:max-w-full max-md:py-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
    >
      {/* Step Content */}
      <div className="flex flex-col items-center w-full gap-7 max-md:gap-5 max-md:px-4">
        {/* Step Icon Container */}
        <div className="flex flex-col justify-center items-center min-w-[190px] px-6 py-7 gap-4 bg-white rounded-xl shadow-sm max-md:min-w-0 max-md:w-full max-md:max-w-[240px] max-md:py-6 max-md:px-5">
          {/* Icon Image */}
          <div className="flex justify-center items-center w-14 h-14 shrink-0">
            <img
              src={icon}
              alt={title}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Step Title & Status */}
          <div className="flex flex-col items-center gap-1.5">
            <h3 className="text-[var(--color-text-secondary)] font-serif font-bold text-base leading-tight text-center">
              {title}
            </h3>
            <div className="flex justify-center items-center h-[22px] px-2.5 py-1.5 gap-1.5 bg-[var(--color-success-bg)] rounded">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0" aria-hidden>
                <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[var(--color-success)] font-inter font-bold text-[11px] leading-[13px] text-center capitalize">
                {status}
              </span>
            </div>
          </div>
        </div>
        
        {/* Step Description Container */}
        <div className="flex flex-col justify-center items-center w-full gap-[18px]">
          <h4 className="text-[var(--color-text-secondary)] font-serif font-normal text-2xl leading-[31px] text-center max-md:text-xl max-md:leading-7">
            {stepTitle}
          </h4>
          <p className="max-w-[268px] text-[var(--color-text-tertiary)] font-sans font-normal text-lg leading-[22px] text-center max-md:max-w-none max-md:text-base max-md:leading-6">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
