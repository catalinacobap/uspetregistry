"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { REGISTER_STEPS, TOTAL_REGISTER_STEPS } from "@/lib/registerSteps";

const STEP_AGE_18 = 2; // "Are you 18 years of age or older?"

const optionButtonBase =
  "w-full py-4 px-6 rounded-xl font-serif font-bold text-base transition-all cursor-pointer ";
const optionSelected =
  "bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-lg";
const optionUnselected =
  "bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] hover:shadow-lg";

export function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [multiSelections, setMultiSelections] = useState<Record<number, string[]>>({});
  const [email, setEmail] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [autoRenew, setAutoRenew] = useState(false);
  const [countdown, setCountdown] = useState({ minutes: 10, seconds: 15 });
  const [under18Blocked, setUnder18Blocked] = useState(false);
  const [checkoutSaving, setCheckoutSaving] = useState(false);

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

  useEffect(() => {
    if (step !== STEP_AGE_18) setUnder18Blocked(false);
  }, [step]);

  const currentStepConfig = REGISTER_STEPS[step - 1];
  const selectedValue = answers[step];
  const isMulti = currentStepConfig?.type === "multi";
  const selectedMulti = (isMulti && (multiSelections[step] ?? [])) as string[];

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step]: value }));
    if (step === STEP_AGE_18 && value === "no") {
      setUnder18Blocked(true);
      return;
    }
    if (step === STEP_AGE_18 && value === "yes") setUnder18Blocked(false);
    if (step < TOTAL_REGISTER_STEPS) setTimeout(() => setStep((s) => s + 1), 300);
  };

  const handleMultiToggle = (value: string) => {
    setMultiSelections((prev) => {
      const arr = prev[step] ?? [];
      const next = arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
      return { ...prev, [step]: next };
    });
  };

  const handleMultiNext = () => {
    const arr = multiSelections[step] ?? [];
    setAnswers((prev) => ({ ...prev, [step]: arr.join(",") }));
    if (step < TOTAL_REGISTER_STEPS) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const goNext = () => {
    if (step < TOTAL_REGISTER_STEPS) setStep((s) => s + 1);
  };

  const handleProceedToCheckout = async () => {
    setCheckoutSaving(true);
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          email,
          termsAccepted,
          fullName,
          phone,
          autoRenew,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error ?? "Failed to save. Please try again.");
        setCheckoutSaving(false);
        return;
      }
      router.push(`/register/checkout?registration_id=${data.id}`);
    } catch {
      alert("Something went wrong. Please try again.");
      setCheckoutSaving(false);
    }
  };

  useEffect(() => {
    const config = REGISTER_STEPS[step - 1];
    if (config?.type === "eligible" || config?.type === "therapist" || config?.type === "finalizing") {
      const t = setTimeout(() => setStep((s) => (s < TOTAL_REGISTER_STEPS ? s + 1 : s)), 3500);
      return () => clearTimeout(t);
    }
  }, [step]);

  const renderStep = () => {
    const config = currentStepConfig;
    if (!config) return null;

    if (config.type === "single") {
      const isAgeStep = step === STEP_AGE_18;
      return (
        <>
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-base leading-tight text-center">
            {config.question}
          </h2>
          <div className="w-full flex flex-col gap-3">
            {config.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={optionButtonBase + (selectedValue === opt.value ? optionSelected : optionUnselected)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {isAgeStep && under18Blocked && (
            <div className="w-full mt-4 p-4 rounded-xl bg-[var(--color-discount)]/10 border border-[var(--color-discount)]/30 text-center">
              <p className="font-serif text-base text-[var(--color-primary)] font-medium">
                You must be 18 years of age or older to continue with this service.
              </p>
              <p className="font-serif text-base text-[var(--color-muted)] mt-2">
                Select &quot;Yes&quot; above if you are 18 or older, or return to the home page.
              </p>
              <Link
                href="/"
                className="inline-block mt-3 font-serif text-base font-bold text-[var(--color-primary)] underline hover:no-underline"
              >
                Return to home
              </Link>
            </div>
          )}
        </>
      );
    }

    if (config.type === "multi") {
      return (
        <>
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-base leading-tight text-center">
            {config.question}
          </h2>
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2">
            {config.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleMultiToggle(opt.value)}
                className={optionButtonBase + " py-3 px-4 text-base " + (selectedMulti.includes(opt.value) ? optionSelected : optionUnselected)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={handleMultiNext}
            className={optionButtonBase + optionSelected + " w-full mt-4"}
          >
            Next
          </button>
        </>
      );
    }

    if (config.type === "dropdown") {
      const val = (selectedValue as string) || "";
      return (
        <>
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-base leading-tight text-center">
            {config.question}
          </h2>
          <div className="w-full flex flex-col gap-3">
            <select
              value={val}
              onChange={(e) => setAnswers((prev) => ({ ...prev, [step]: e.target.value }))}
              className="w-full py-4 px-4 rounded-xl border-2 border-[var(--color-primary)] bg-white font-serif text-base text-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              <option value="">Select state</option>
              {config.options.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={goNext}
              disabled={!val}
              className={optionButtonBase + optionSelected + " disabled:opacity-50 disabled:cursor-not-allowed"}
            >
              Continue
            </button>
          </div>
        </>
      );
    }

    if (config.type === "email") {
      return (
        <>
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-base leading-tight text-center">
            {config.title}
          </h2>
          <div className="w-full flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-4 px-4 rounded-xl border-2 border-[var(--color-primary)] bg-white font-serif text-base text-[var(--color-primary)] placeholder:text-[var(--color-muted)] focus:outline-none"
            />
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="rounded border-2 border-[var(--color-primary)]"
              />
              <span className="font-serif text-base text-[var(--color-primary)]">
                I agree to the Terms & Conditions and have read the{" "}
                <Link href="/privacy" className="underline">Privacy Policy</Link>
              </span>
            </label>
            <div className="flex flex-wrap gap-2 justify-center py-2">
              <span className="px-3 py-1 rounded bg-[var(--color-success-bg)] text-[var(--color-success)] text-xs font-medium">HIPAA compliance</span>
              <span className="px-3 py-1 rounded bg-[var(--color-success-bg)] text-[var(--color-success)] text-xs font-medium">HUD</span>
            </div>
            <button
              type="button"
              onClick={goNext}
              disabled={!email.trim() || !termsAccepted}
              className={optionButtonBase + optionSelected + " disabled:opacity-50 disabled:cursor-not-allowed"}
            >
              Continue
            </button>
          </div>
        </>
      );
    }

    if (config.type === "eligible") {
      return (
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-base text-center">
            {config.title}
          </h2>
          <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <span key={i} className="w-6 h-6 rounded-full bg-[var(--color-success)] text-white flex items-center justify-center font-serif text-base">✓</span>
            ))}
          </div>
        </div>
      );
    }

    if (config.type === "therapist") {
      return (
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-base text-center">
            {config.title}
          </h2>
          <div className="w-full max-w-xs h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[var(--color-primary)]"
              initial={{ width: "0%" }}
              animate={{ width: "70%" }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </div>
          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-14 h-14 rounded-full bg-[var(--color-border)] flex items-center justify-center text-[var(--color-muted)] font-serif text-base">
                ?
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (config.type === "finalizing") {
      return (
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6">
          {/* Envelope + document icon */}
          <div className="flex justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-primary)]">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 6-10 7L2 6" />
              <path d="M12 13v5" />
              <path d="m9 16 3 2 3-2" />
            </svg>
          </div>
          {/* Progress bar */}
          <div className="w-full h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[var(--color-primary)] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "65%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-base text-center">
            {config.title}
          </h2>
          {/* Milestone icons: document/pen, therapist, checkmark */}
          <div className="flex justify-center gap-6">
            <span className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" /></svg>
            </span>
            <span className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></svg>
            </span>
            <span className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white" aria-hidden>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
            </span>
          </div>
        </div>
      );
    }

    if (config.type === "checkout") {
      return (
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-base text-center">
            {config.title}
          </h2>
          <p className="text-[var(--color-muted)] font-serif text-base text-center max-w-md">
            You’re all set. Proceed to complete your purchase.
          </p>
          <button
            type="button"
            disabled={checkoutSaving}
            onClick={handleProceedToCheckout}
            className={optionButtonBase + optionSelected + " w-full max-w-xs disabled:opacity-50 disabled:cursor-not-allowed"}
          >
            {checkoutSaving ? "Saving…" : "Proceed to checkout"}
          </button>
        </div>
      );
    }

    if (config.type === "prequal") {
      return (
        <>
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-base leading-tight text-center">
            {config.title}
          </h2>
          <div className="w-full flex flex-col gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full py-4 px-4 rounded-xl border-2 border-[var(--color-primary)] bg-white font-serif text-base text-[var(--color-primary)] placeholder:text-[var(--color-muted)] focus:outline-none"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full py-4 px-4 rounded-xl border-2 border-[var(--color-primary)] bg-white font-serif text-base text-[var(--color-primary)] placeholder:text-[var(--color-muted)] focus:outline-none"
            />
            <button
              type="button"
              onClick={goNext}
              disabled={!fullName.trim() || !phone.trim()}
              className={optionButtonBase + optionSelected + " disabled:opacity-50 disabled:cursor-not-allowed"}
            >
              Continue
            </button>
          </div>
        </>
      );
    }

    if (config.type === "package") {
      const pkg = (selectedValue as string) || "";
      return (
        <>
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-base leading-tight text-center">
            Package Selection
          </h2>
          <div className="w-full flex flex-col gap-3">
            <button
              type="button"
              onClick={() => handleSelect("standard")}
              className={`text-left py-4 px-6 rounded-xl border-2 transition-all cursor-pointer ${pkg === "standard" ? optionSelected : optionUnselected}`}
            >
              <span className="font-serif font-bold text-base block">Standard Package — $128</span>
              <span className="font-serif text-base opacity-90 mt-1 block">
                Includes: Therapist certified ESA letter, FHA protection, Emotional support evaluation, ESA registry
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleSelect("premium")}
              className={`text-left py-4 px-6 rounded-xl border-2 transition-all cursor-pointer ${pkg === "premium" ? optionSelected : optionUnselected}`}
            >
              <span className="font-serif font-bold text-base block">Premium Package — $159</span>
              <span className="font-serif text-base opacity-90 mt-1 block">
                Includes: Everything in Standard, Premium support
              </span>
            </button>
          </div>
        </>
      );
    }

    if (config.type === "speed") {
      const speed = (selectedValue as string) || "";
      return (
        <>
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-base leading-tight text-center">
            {config.question}
          </h2>
          <div className="w-full flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setAnswers((prev) => ({ ...prev, [step]: "express" }))}
              className={optionButtonBase + (speed === "express" ? optionSelected : optionUnselected)}
            >
              Express processing (+$50)
            </button>
            <button
              type="button"
              onClick={() => setAnswers((prev) => ({ ...prev, [step]: "standard" }))}
              className={optionButtonBase + (speed === "standard" ? optionSelected : optionUnselected)}
            >
              Standard processing
            </button>
            <label className="flex items-center gap-2 cursor-pointer mt-4">
              <input
                type="checkbox"
                checked={autoRenew}
                onChange={(e) => setAutoRenew(e.target.checked)}
                className="rounded border-2 border-[var(--color-primary)]"
              />
              <span className="font-serif text-base text-[var(--color-primary)]">Auto-renew subscription</span>
            </label>
            <button
              type="button"
              onClick={goNext}
              disabled={!speed}
              className={optionButtonBase + optionSelected + " mt-2 disabled:opacity-50 disabled:cursor-not-allowed"}
            >
              Continue
            </button>
          </div>
        </>
      );
    }

    return null;
  };

  const config = REGISTER_STEPS[step - 1];
  const showProgress = config && config.type !== "eligible" && config.type !== "therapist" && config.type !== "finalizing";

  return (
    <div className="relative min-h-screen flex flex-col min-h-[100dvh]">
      {/* Background image - on mobile start at ~55%, fill to bottom (match search-registry); on desktop full cover */}
      <div
        className="absolute inset-0 max-md:top-[55%] bg-no-repeat -z-10 bg-cover bg-bottom max-md:bg-cover max-md:bg-bottom"
        style={{
          backgroundImage: "url('/images/other/bg.PNG')",
          backgroundColor: "var(--color-surface-cream)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#FFFFFF] to-transparent -z-10"
        aria-hidden
      />
      <header className="relative z-10 w-full pt-20 pb-20 md:pt-24 md:pb-24 px-4 md:px-8 flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary-hover)] transition-colors cursor-pointer shrink-0"
            aria-label="Go back"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
        ) : (
          <Link
            href="/"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary-hover)] transition-colors cursor-pointer shrink-0"
            aria-label="Go back"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
        )}
        <Link href="/" className="flex flex-col items-center gap-0.5" aria-label="US Pet Registry home">
          <img
            src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/3ced41e7-9c12-4102-acb4-d29270fa9f11"
            alt="US Pet Registry"
            className="h-9 w-auto object-contain"
          />
        </Link>
        <Link
          href="/"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary-hover)] transition-colors cursor-pointer shrink-0"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </Link>
      </header>

      {showProgress && (
        <div className="w-full px-4 md:px-8 flex justify-center">
          <div className="w-full max-w-md flex gap-1" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={TOTAL_REGISTER_STEPS}>
            {Array.from({ length: TOTAL_REGISTER_STEPS }, (_, i) => {
              const isCurrentOrCompleted = i + 1 <= step;
              return (
                <div
                  key={i}
                  className={`h-1.5 flex-1 min-w-0 rounded-sm transition-all duration-300 ${
                    isCurrentOrCompleted
                      ? "bg-[var(--color-primary)]"
                      : "bg-transparent border border-dashed border-[var(--color-border)]"
                  }`}
                />
              );
            })}
          </div>
        </div>
      )}

      <div className="w-full px-4 md:px-8 mt-3 flex justify-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-[var(--color-success)] text-white font-serif text-base font-medium">
          Full refund if your letter is not approved
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12 relative overflow-hidden font-serif text-base">
        <div className="relative z-10 w-full max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col items-center gap-8"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Discount banner - light beige, dark blue serif bold; desktop centered, mobile unchanged */}
      <footer className="w-full py-4 px-4 md:px-8 bg-[var(--color-surface-cream)] border-t border-[var(--color-border)]">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3 md:justify-center md:text-center">
          <p className="text-[var(--color-primary)] font-serif font-bold text-base max-md:text-left max-md:flex-1 max-md:min-w-0">
            Get 20% off your ESA consultation
            <br className="max-md:block md:hidden" />
            by booking in the next
          </p>
          <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-[var(--color-primary)] text-white shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span className="font-serif font-bold tabular-nums text-base">
              {String(countdown.minutes).padStart(2, "0")}:{String(countdown.seconds).padStart(2, "0")}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
