"use client";

import { motion } from "framer-motion";

export function ProcessTitle() {
  return (
    <motion.h2 
      className="w-full h-[62px] text-[var(--color-primary)] font-serif font-bold text-[48px] leading-[62px] text-center max-md:h-auto max-md:text-[32px] max-md:leading-tight max-md:px-4 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      Simple 3-Step Process
    </motion.h2>
  );
}
