"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { REGISTER_STEPS, TOTAL_REGISTER_STEPS } from "@/lib/registerSteps";
import { FormPageLayout } from "@/components/FormPageLayout";

const STEP_AGE_18 = 2; 

const optionButtonBase =
  "w-full py-4 px-6 rounded-[6px] font-serif font-bold text-[18px] transition-all cursor-pointer border border-[#2D345F] ";
const optionSelected =
  "bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-lg border-[var(--color-primary)]";
const optionUnselected =
  "bg-[#F7F9FA] text-[#2D345F] hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] hover:border-[var(--color-primary)] hover:shadow-lg";

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
      const isTravelStep = config.question === "Do you plan to travel with your pet?";
      return (
        <>
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-[32px] md:text-[42px] leading-tight text-center">
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
          {isTravelStep && (
            <div className="w-full mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-cream)] px-4 py-3" style={{ boxShadow: "var(--shadow-subtle)" }}>
              <p className="font-serif text-sm text-[var(--color-primary)] text-center font-medium">
                Your dog may qualify as a Psychiatric Service Dog under ACAA regulations for flights (See PSD add on during checkout)
              </p>
            </div>
          )}
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
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-[32px] md:text-[42px] leading-tight text-center">
            {config.question}
          </h2>
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-2">
            {config.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleMultiToggle(opt.value)}
                className={optionButtonBase + " py-3 px-4 " + (selectedMulti.includes(opt.value) ? optionSelected : optionUnselected)}
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
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-[32px] md:text-[42px] leading-tight text-center">
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

    if (config.type === "howItWorks") {
      return (
        <>
          <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-cream)] p-5 md:p-6" style={{ boxShadow: "var(--shadow-subtle)" }}>
            <h2 className="text-[var(--color-primary)] font-serif font-bold text-[32px] md:text-[42px] leading-tight text-center mb-6">
              How It Works
            </h2>
            <div className="w-full flex flex-col gap-6 text-left">
              <div>
                <h3 className="font-serif font-bold text-lg text-[var(--color-primary)]">Take The Assessment</h3>
                <p className="font-serif text-base text-[var(--color-muted)] mt-1">Answer questions about your mental health and pet needs</p>
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[var(--color-primary)]">A Licensed & Registered Clinician Will Review</h3>
                <p className="font-serif text-base text-[var(--color-muted)] mt-1">A licensed clinician will evaluate your case and contact you to finalize your ESA approval</p>
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[var(--color-primary)]">Receive Your ESA Letter</h3>
                <p className="font-serif text-base text-[var(--color-muted)] mt-1">Get your official letter delivered within 12–48 hours</p>
              </div>
            </div>
          </div>
          <button type="button" onClick={goNext} className={optionButtonBase + optionSelected + " w-full mt-4"}>
            Continue
          </button>
        </>
      );
    }

    if (config.type === "esaHousing") {
      return (
        <>
          <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-cream)] p-5 md:p-6" style={{ boxShadow: "var(--shadow-subtle)" }}>
            <h2 className="text-[var(--color-primary)] font-serif font-bold text-[32px] md:text-[42px] leading-tight text-center mb-4">
              ESA Housing Coverage
            </h2>
            <p className="font-serif text-base text-[var(--color-muted)] text-center mb-4">
              Your ESA letter applies to dorms, vacation homes, apartment complexes, and Airbnbs. Landlords cannot deny or charge pet fees with a valid letter. (As Per HUD Guidance FHEO-2020-01)
            </p>
            <div className="w-full grid grid-cols-2 gap-3">
              {[
                { key: "apartments", label: "Apartments" },
                { key: "dorms", label: "Dorms" },
                { key: "vacationHomes", label: "Vacation Homes" },
                { key: "airBNBs", label: "Airbnbs" },
              ].map(({ key, label }) => (
                <div key={key} className="py-3 px-4 rounded-xl border border-[var(--color-primary)] bg-[var(--color-white)] font-serif font-medium text-[var(--color-primary)] text-center">
                  {label}
                </div>
              ))}
            </div>
          </div>
          <button type="button" onClick={goNext} className={optionButtonBase + optionSelected + " w-full mt-4"}>
            Continue
          </button>
        </>
      );
    }

    if (config.type === "fairHousing") {
      const CheckIcon = () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[var(--color-success)]">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      );
      const GuardIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-primary)]">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
      const items = [
        "Licensed and Registered therapist signature and credentials",
        "Patient diagnosis and treatment recommendation",
        "Official US Pet Registry Documentation and Registration",
        "Verification contact information included",
      ];
      return (
        <>
          <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-cream)] p-5 md:p-6" style={{ boxShadow: "var(--shadow-subtle)" }}>
            <h2 className="text-[var(--color-primary)] font-serif font-bold text-[32px] md:text-[42px] leading-tight text-center mb-2">
              Fair Housing Act Compliance
            </h2>
            <p className="font-serif text-base text-[var(--color-muted)] text-center">
              Your ESA letter will be 100% Fair Housing Act compliant.
            </p>
            <div className="flex justify-center mt-2">
              <GuardIcon />
            </div>
            <ul className="w-full flex flex-col gap-3 mt-4">
              {items.map((text, i) => (
                <li key={i} className="flex items-start gap-2 font-serif text-base text-[var(--color-primary)]">
                  <CheckIcon />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <button type="button" onClick={goNext} className={optionButtonBase + optionSelected + " w-full mt-4"}>
            Continue
          </button>
        </>
      );
    }

    if (config.type === "saveMoney") {
      const LockIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-primary)]">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
      return (
        <>
          <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-cream)] p-5 md:p-6" style={{ boxShadow: "var(--shadow-subtle)" }}>
            <h2 className="text-[var(--color-primary)] font-serif font-bold text-[32px] md:text-[42px] leading-tight text-center mb-2">
              Save Money Every Month
            </h2>
            <div className="flex justify-center mt-2">
              <LockIcon />
            </div>
            <p className="font-serif text-base text-[var(--color-muted)] text-center mt-4">
              By registering as an ESA under the Fair Housing Act (42 U.S.C. § 3601 et seq.), renters are legally exempt from pet fees and deposits — saving an average of $800 annually.
            </p>
          </div>
          <button type="button" onClick={goNext} className={optionButtonBase + optionSelected + " w-full mt-4"}>
            Continue
          </button>
        </>
      );
    }

    if (config.type === "mentalHealthIntro") {
      return (
        <>
          <div className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-cream)] p-5 md:p-6" style={{ boxShadow: "var(--shadow-subtle)" }}>
            <h2 className="text-[var(--color-primary)] font-serif font-bold text-[32px] md:text-[42px] leading-tight text-center mb-4">
              {config.title}
            </h2>
            <p className="font-serif text-base text-[var(--color-muted)] text-center">
              This helps determine your eligibility. All responses are confidential, protected under our privacy policy, and will only be used to match you with a licensed and registered professional in your state.
            </p>
          </div>
          <button type="button" onClick={goNext} className={optionButtonBase + optionSelected + " w-full mt-4"}>
            Continue
          </button>
        </>
      );
    }

    if (config.type === "email") {
      return (
        <>
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-[32px] md:text-[42px] leading-tight text-center">
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
            <div className="flex flex-wrap gap-4 justify-center items-center py-2">
              <img src="/hipaa-compliant.jpg" alt="HIPAA Compliant" className="h-12 w-auto object-contain" />
              <img src="/images/marquee/protection.png" alt="HUD Fair Housing Act protected" className="h-12 w-auto object-contain" />
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
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-[32px] md:text-[42px] text-center">
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
      const therapistImages = [
        { src: "/therapist-1.webp", alt: "Licensed clinician" },
        { src: "/therapist-2.jpeg", alt: "Licensed clinician" },
        { src: "/therapist-3.webp", alt: "Licensed clinician" },
      ];
      return (
        <div className="flex flex-col items-center gap-6">
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-[32px] md:text-[42px] text-center">
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
          <div className="flex gap-3 justify-center flex-wrap">
            {therapistImages.map(({ src, alt }, i) => (
              <img
                key={i}
                src={src}
                alt={alt}
                className="w-12 h-12 rounded-full object-cover border-2 border-[var(--color-primary)] shrink-0"
              />
            ))}
          </div>
        </div>
      );
    }

    if (config.type === "finalizing") {
      return (
        <div className="flex flex-col items-center gap-6">
          {/* Letter / envelope icon */}
          <div className="flex justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-primary)]">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="m22 6-10 7L2 6" />
            </svg>
          </div>
          <div className="w-full max-w-xs h-2 bg-[var(--color-border)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[var(--color-primary)] rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "65%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-[32px] md:text-[42px] text-center">
            {config.title}
          </h2>
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
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-[32px] md:text-[42px] text-center">
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
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-[32px] md:text-[42px] leading-tight text-center">
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
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-[32px] md:text-[42px] leading-tight text-center">
            Package Selection
          </h2>
          <div className="w-full flex flex-col gap-3">
            <button
              type="button"
              onClick={() => handleSelect("standard")}
              className={`text-left py-4 px-6 rounded-xl border-2 transition-all cursor-pointer ${pkg === "standard" ? optionSelected : optionUnselected}`}
            >
              <span className="font-serif font-bold text-base block">Standard Package — $128</span>
              <span className="font-serif text-sm text-[var(--color-success)] font-medium mt-0.5 block">
                20% discount applied (list price $160)
              </span>
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
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-[32px] md:text-[42px] leading-tight text-center">
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

  const backButton = (
    <>
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
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary-hover)] transition-colors shrink-0"
          aria-label="Go back"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
      )}
    </>
  );

  return (
    <FormPageLayout
      leftSlot={backButton}
      contentPadding="tight"
      countdown={countdown}
    >
      {/* Un mismo frame: Full refund, progress bar, pregunta y opciones */}
      <motion.div
        layout
        transition={{ layout: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } }}
        className="relative mt-2 md:mt-4 z-10 w-full max-w-lg mx-auto p-4 md:p-6 flex flex-col items-center gap-3 md:gap-5"
      >
        <div className="inline-flex flex-wrap mb-2 items-center gap-x-1 px-4 py-2 rounded-full bg-[#67B847] text-white font-serif text-base">
          <span className="font-bold">Full refund</span>
          <span className="font-normal">if your letter is not approved</span>
        </div>
        {showProgress && (
          <div className="w-full max-w-md" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={TOTAL_REGISTER_STEPS}>
            <div className="w-full h-2 rounded-full bg-[#E0E0E0] overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--color-primary)] transition-all duration-300 ease-out"
                style={{ width: `${(step / TOTAL_REGISTER_STEPS) * 100}%` }}
              />
            </div>
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            layout
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{
              duration: 0.3,
              layout: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
            }}
            className="flex flex-col items-center gap-5 w-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </FormPageLayout>
  );
}
