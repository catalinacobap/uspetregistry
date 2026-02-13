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
      className={`flex flex-col bg-[var(--color-surface-cream)] border border-[var(--color-border-warm)] rounded-2xl p-12 gap-2.5 max-md:p-6 ${
        isLarge ? 'w-full' : 'flex-1 max-md:min-w-0'
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
    >
      <div className={`flex flex-col items-center gap-7 max-md:gap-5 ${isLarge ? 'relative' : ''}`}>
        {/* Image Container */}
        <div 
          className={`flex justify-center items-center bg-white rounded-xl shadow-sm ${
            isLarge 
              ? 'absolute top-0 left-1/2 transform -translate-x-1/2 w-[668px] h-[227px] max-md:relative max-md:left-0 max-md:translate-x-0 max-md:w-full max-md:max-w-[320px] max-md:h-[140px] max-md:mx-auto' 
              : 'w-[329px] h-[173px] px-[51px] py-[7px] max-md:w-full max-md:max-w-[280px] max-md:h-[120px] max-md:px-6 max-md:py-4'
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
        <div className={`flex flex-col justify-center items-center gap-[18px] max-md:gap-3 ${
          isLarge 
            ? 'mt-[254px] px-40 max-md:mt-0 max-md:px-4 max-md:pt-4' 
            : 'px-[30px] max-md:px-4'
        }`}>
          <h3 className={`text-[var(--color-text-secondary)] font-serif font-normal text-2xl leading-[31px] text-center max-md:text-xl max-md:leading-7 ${
            isLarge ? 'w-[486px] max-md:w-full' : 'w-[417px] max-md:w-full'
          }`}>
            {title}
          </h3>
          <p className={`text-[var(--color-text-tertiary)] font-sans font-normal text-lg leading-[22px] text-center max-md:text-base max-md:leading-6 ${
            isLarge ? 'w-[730px] max-md:w-full' : 'w-[417px] max-md:w-full'
          }`}>
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
