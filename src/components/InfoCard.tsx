"use client";

import { motion } from "framer-motion";

interface InfoCardProps {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  isLarge?: boolean;
  delay?: number;
}

export function InfoCard({ 
  image, 
  imageAlt, 
  title, 
  description, 
  isLarge = false,
  delay = 0 
}: InfoCardProps) {
  return (
    <motion.div
      className={`flex flex-col bg-[var(--color-surface-cream)] border border-[var(--color-border-warm)] rounded-2xl p-12 gap-2.5 max-md:p-6 min-w-0 overflow-hidden ${
        isLarge ? 'w-full' : 'flex-1'
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
    >
      <div className={`flex flex-col items-center gap-7 max-md:gap-5 ${isLarge ? 'relative' : ''}`}>
        {/* Image Container */}
        <div 
          className={`flex justify-center items-center bg-white rounded-xl shadow-sm shrink-0 ${
            isLarge 
              ? 'absolute top-0 left-1/2 transform -translate-x-1/2 w-[668px] max-w-full h-[227px] max-md:relative max-md:left-0 max-md:translate-x-0 max-md:w-full max-md:max-w-[320px] max-md:h-[140px] max-md:mx-auto md:relative md:left-0 md:translate-x-0 md:w-full md:max-w-[520px] md:h-[180px] md:mx-auto lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:w-[668px] lg:max-w-full lg:h-[227px]' 
              : 'w-full max-w-[329px] h-[173px] px-[51px] py-[7px] max-md:max-w-[280px] max-md:h-[120px] max-md:px-6 max-md:py-4 md:max-w-[280px] md:px-6 lg:max-w-[329px] lg:px-[51px]'
          }`}
          style={{
            boxShadow: "var(--shadow-subtle)"
          }}
        >
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Text Container */}
        <div className={`flex flex-col justify-center items-center gap-[18px] max-md:gap-3 w-full ${
          isLarge 
            ? 'mt-[254px] px-40 max-md:mt-0 max-md:px-4 max-md:pt-4 md:mt-0 md:pt-4 md:px-6 lg:mt-[254px] lg:px-40' 
            : 'px-[30px] max-md:px-4 md:px-6 lg:px-[30px]'
        }`}>
          <h3 className={`text-[var(--color-text-secondary)] font-serif font-normal text-2xl leading-[31px] text-center max-md:text-xl max-md:leading-7 md:text-xl md:leading-7 w-full ${
            isLarge ? 'max-w-[486px]' : 'max-w-[417px]'
          }`}>
            {title}
          </h3>
          <p className={`text-[var(--color-text-tertiary)] font-sans font-normal text-lg leading-[22px] text-center max-md:text-base max-md:leading-6 w-full ${
            isLarge ? 'max-w-[730px]' : 'max-w-[417px]'
          }`}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
