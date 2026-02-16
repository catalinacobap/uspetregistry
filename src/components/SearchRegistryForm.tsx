"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FormPageLayout } from "@/components/FormPageLayout";

export function SearchRegistryForm() {
  const [registrationId, setRegistrationId] = useState("");
  const [countdown, setCountdown] = useState({ minutes: 10, seconds: 15 });

  useEffect(() => {
    const t = setInterval(() => {
      setCountdown((c) => {
        if (c.seconds > 0) return { ...c, seconds: c.seconds - 1 };
        if (c.minutes > 0) return { minutes: c.minutes - 1, seconds: 59 };
        return c;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire to registry lookup API
  };

  return (
    <FormPageLayout
      leftSlot={<div aria-hidden />}
      contentPadding="tight"
      countdown={countdown}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative z-10 w-full max-w-lg mx-auto mt-10 md:mt-26"
      >
        <form
          onSubmit={handleVerify}
          className="flex flex-col items-center gap-6"
        >
          <h1 className="text-[var(--color-primary)] font-serif font-bold text-[32px] md:text-[42px] leading-tight text-center">
            ESA Registration Lookup
          </h1>

          <p className="text-[var(--color-primary)] font-serif font-normal text-[20px] leading-snug text-center max-w-md">
            Search the registry to verify ESA registration status
          </p>

          <div className="w-full flex flex-col gap-2">
            <label
              htmlFor="esa-registration-id"
              className="text-[var(--color-primary)] font-serif font-normal text-sm md:text-base"
            >
              Enter ESA Registration ID
            </label>
            <input
              id="esa-registration-id"
              type="text"
              value={registrationId}
              onChange={(e) => setRegistrationId(e.target.value)}
              placeholder="e.g. ESA - 123456"
              className="w-full py-4 px-5 rounded-lg border border-[var(--color-border)] bg-white font-serif text-[var(--color-primary)] placeholder:font-sans placeholder:text-[#C2C2C2] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full max-w-[200px] py-4 px-8 rounded-full bg-[var(--color-primary)] text-[var(--color-on-primary)] font-serif font-bold text-base shadow-lg hover:bg-[var(--color-primary-hover)] transition-colors cursor-pointer"
          >
            Verify
          </button>
        </form>
      </motion.div>
    </FormPageLayout>
  );
}
