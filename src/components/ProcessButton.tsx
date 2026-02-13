"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function ProcessButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
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
        <span className="w-[250px] h-[21px] text-[var(--color-on-primary)] font-serif font-bold text-base leading-[21px] text-center max-md:w-auto max-md:px-2">
          Get Your Official ESA Letter Now
        </span>
      </Link>
    </motion.div>
  );
}
