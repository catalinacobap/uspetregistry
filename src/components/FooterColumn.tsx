"use client";

import { motion } from "framer-motion";

interface FooterColumnProps {
  title: string;
  links: string[];
  delay?: number;
}

export function FooterColumn({ title, links, delay = 0 }: FooterColumnProps) {
  return (
    <motion.div
      className="flex flex-col gap-3 max-md:items-start max-md:text-left w-full "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
      {/* Column Title */}
      <h3 className="text-[var(--color-primary)] font-serif font-bold text-xl leading-[27px] capitalize max-md:text-lg">
        {title}
      </h3>
      
      {/* Column Links */}
      <div className="flex flex-col gap-1.5 max-md:items-start">
        {links.map((link, index) => (
          <a
            key={index}
            href="#"
            className="text-[var(--color-primary)] font-sans font-normal text-base leading-[21px] hover:underline transition-all duration-200 max-md:text-sm"
          >
            {link}
          </a>
        ))}
      </div>
    </motion.div>
  );
}
