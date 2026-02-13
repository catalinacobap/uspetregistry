"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavItem } from "./NavItem";

const NAVIGATION_ITEMS = [
  { text: "Registry Search", isActive: false, href: "/search-registry" },
  { text: "How It Works", isActive: false, href: "/#how-it-works" },
  { text: "Pricing", isActive: false, href: "/#pricing" },
  { text: "Contact Us", isActive: false, href: "/#contact" },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-5 w-6 flex-col justify-center gap-1.5">
      <motion.span
        className="block h-0.5 w-full rounded-full bg-[var(--color-primary)]"
        animate={
          open
            ? { rotate: 45, y: 6 }
            : { rotate: 0, y: 0 }
        }
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-0.5 w-full rounded-full bg-[var(--color-primary)]"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-0.5 w-full rounded-full bg-[var(--color-primary)]"
        animate={
          open
            ? { rotate: -45, y: -6 }
            : { rotate: 0, y: 0 }
        }
        transition={{ duration: 0.2 }}
      />
    </span>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative w-full bg-white border-b border-[var(--color-border)]">
      <motion.div
        className="w-full h-[72px] py-2.5 px-[84px] flex items-center gap-6 max-md:px-4 max-md:h-auto max-md:min-h-[72px] max-md:py-3 max-md:justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo Container - left */}
        <motion.div
          className="w-[97px] h-[42px] flex items-center justify-center max-md:w-[80px] max-md:h-9 flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <img
            src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/3ced41e7-9c12-4102-acb4-d29270fa9f11"
            alt="US Pet Registry Logo"
            className="w-full h-full object-contain"
          />
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="flex items-center gap-[14px] h-[18px] max-md:hidden">
          {NAVIGATION_ITEMS.map((item, index) => (
            <NavItem
              key={item.text}
              text={item.text}
              isActive={item.isActive}
              href={item.href}
              delay={0.1 + index * 0.1}
            />
          ))}
        </nav>

        {/* Mobile: Hamburger button - right */}
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden flex items-center justify-center w-10 h-10 -mr-1 rounded-lg hover:bg-[var(--color-border-warm)]/30 transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </motion.div>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 right-0 z-50 bg-white border-b border-[var(--color-border)] shadow-lg overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <nav className="flex flex-col py-4 px-4 gap-0 [&_a]:w-full [&_a]:block [&_a]:py-3 [&_a]:text-left [&_a]:text-base">
              {NAVIGATION_ITEMS.map((item) => (
                <NavItem
                  key={item.text}
                  text={item.text}
                  isActive={item.isActive}
                  href={item.href}
                  delay={0}
                />
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
