"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface NavItemProps {
  text: string;
  isActive?: boolean;
  delay?: number;
  href?: string;
}

const linkClass = (isActive: boolean) =>
  `font-serif text-sm leading-[18px] text-center flex-shrink-0 max-md:text-xs max-md:leading-4 max-md:py-1 max-md:px-2 block transition-all duration-200 ease-in-out ${
    isActive ? "font-bold text-[var(--color-primary)]" : "font-normal text-gray-500"
  } hover:text-black`;

export function NavItem({ text, isActive = false, delay = 0, href }: NavItemProps) {
  const content = (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {text}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className={linkClass(isActive)}>
        {content}
      </Link>
    );
  }

  return (
    <span className={linkClass(isActive)}>
      {content}
    </span>
  );
}
