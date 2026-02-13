"use client";

import { motion } from "framer-motion";

interface TrustItemProps {
  icon: string;
  iconAlt: string;
  text: string;
  delay?: number;
  isMarquee?: boolean;
}

export function TrustItem({
  icon,
  iconAlt,
  text,
  delay = 0,
  isMarquee = false,
}: TrustItemProps) {
  return (
    <motion.div
      className={`flex items-center gap-4 shrink-0 ${isMarquee ? "min-w-[240px]" : ""}`}
      initial={isMarquee ? false : { opacity: 0, y: 8 }}
      animate={isMarquee ? undefined : { opacity: 1, y: 0 }}
      transition={isMarquee ? undefined : { delay, duration: 0.4, ease: "easeOut" }}
    >
      <img
        src={icon}
        alt={iconAlt}
        className="max-w-[60px] max-h-[60px] shrink-0 object-contain max-md:w-28 max-md:h-28 grayscale"
      />
      <span className="text-[var(--color-primary)] font-serif font-bold text-base leading-tight text-left whitespace-nowrap max-md:text-sm">
        {text}
      </span>
    </motion.div>
  );
}
