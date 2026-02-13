"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
  delay?: number;
}

export function FAQItem({ question, answer, delay = 0 }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="w-full bg-white border border-[var(--color-border)] rounded-[13px] p-[30px] shadow-lg max-w-6xl mx-auto max-md:p-5 max-md:max-w-full"
      style={{
        boxShadow: "var(--shadow-card)"
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
    >
      {/* FAQ Question Container */}
      <button
        className="flex justify-between items-center w-full gap-[100px] cursor-pointer max-md:gap-3"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {/* FAQ Question */}
        <div className="flex flex-col justify-center flex-1 min-w-0">
          <h3 className="text-[var(--color-primary)] font-serif font-bold text-[19px] leading-[25px] text-left max-md:text-base max-md:leading-5">
            {question}
          </h3>
        </div>
        
        {/* Chevron Icon */}
        <motion.img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/74cdf438-d59e-4751-98c6-56e052091f26"
          alt="Expand FAQ"
          className="w-6 h-6 flex-shrink-0"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </button>
      
      {/* FAQ Answer */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="pt-4 max-md:pt-3">
          <p className="text-[var(--color-muted)] font-sans font-normal text-base leading-[22px] text-left max-md:text-sm max-md:leading-5">
            {answer}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
