"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { ReviewCard } from "@/components/ReviewCard";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CHECKOUT_TESTIMONIALS = [
  {
    icon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/be736bc1-4add-4b8f-86e9-f1f1bc205ca6",
    reviewText:
      '"My landlord accepted my emotional support dog without any issues. The process was straightforward and the letter looked professional."',
    author: "- Michael R.",
  },
  {
    icon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/aa2268d8-27b0-43d7-86ac-261bf25462b5",
    reviewText:
      '"The mental health professional was thorough and caring. Having my ESA has made a real difference in my daily life."',
    author: "- Jennifer L.",
  },
  {
    icon: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/de2dd503-978f-48ca-ac98-41430320d13b",
    reviewText:
      '"Fast, professional, and completely legal. I\'ve saved hundreds on pet deposits and my anxiety has improved dramatically with my ESA by my side."',
    author: "- David K.",
  },
];

const INCLUDED_ITEMS = [
  "ESA certified from a licensed and registered therapist",
  "Evaluated by a licensed and registered professional",
  "Full federal protection under the Fair Housing Act (FHA)",
  "Live anywhere with your pet free of charge",
];

type Registration = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
};

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "var(--color-body-dark)",
      "::placeholder": { color: "var(--color-text-tertiary)" },
    },
    invalid: {
      color: "#c41e3a",
    },
  },
};

function PaymentForm({
  name,
  email,
  registrationId,
  registration,
  loading,
  setLoading,
}: {
  name: string;
  email: string;
  registrationId: string | null;
  registration: Registration | null;
  loading: boolean;
  setLoading: (v: boolean) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setLoading(true);
    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name || registration?.fullName,
          email: email || registration?.email,
          registration_id: registrationId ?? undefined,
        }),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error);
        setLoading(false);
        return;
      }
      const { error } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: cardElement },
      });
      if (error) {
        alert(error.message ?? "Payment failed");
        setLoading(false);
        return;
      }
      window.location.href = `${window.location.origin}/register/checkout/success`;
    } catch {
      alert("Something went wrong");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-[var(--color-body-dark)] font-sans text-sm font-medium mb-2">
          Card details
        </label>
        <div className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] bg-white focus-within:ring-2 focus-within:ring-[var(--color-primary)]/30">
          <CardElement options={cardElementOptions} />
        </div>
      </div>
      <p className="text-[var(--color-text-tertiary)] text-xs mb-6">
        Your payment information is encrypted and secure.
      </p>
      <button
        type="submit"
        disabled={loading || !stripe || !elements}
        className="w-full py-4 rounded-lg bg-[var(--color-primary)] text-[var(--color-on-primary)] font-sans font-bold text-base hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-50"
        style={{ boxShadow: "var(--shadow-primary)" }}
      >
        {loading ? "Processing…" : "Pay $192.24 - Complete Order"}
      </button>
    </form>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const registrationId = searchParams.get("registration_id");

  const [loading, setLoading] = useState(false);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [registrationLoadError, setRegistrationLoadError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!registrationId) return;
    let cancelled = false;
    fetch(`/api/registrations/${registrationId}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Not found"))))
      .then((data: Registration) => {
        if (!cancelled) {
          setRegistration(data);
          setName(data.fullName ?? "");
          setEmail(data.email ?? "");
          setPhone(data.phone ?? "");
        }
      })
      .catch(() => {
        if (!cancelled) setRegistrationLoadError("Could not load your registration.");
      });
    return () => {
      cancelled = true;
    };
  }, [registrationId]);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <CheckoutHeader />

      <main className="w-full max-w-6xl mx-auto px-4 py-8 md:px-8 md:py-12 lg:px-12">
        {/* Pre-qualified heading */}
        <h1 className="text-[var(--color-body-dark)] font-sans font-bold text-xl md:text-2xl text-center mb-8">
          You are pre-qualified. Complete checkout to secure your slot.
        </h1>

        {/* Two-column layout: What's Included (left) | What happens next + Order Summary (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left: What's Included */}
          <div className="lg:col-span-1">
            <div
              className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)] h-full flex flex-col"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <h2 className="text-[var(--color-body-dark)] font-sans font-bold text-lg mb-4">
                What&apos;s Included
              </h2>
              <ul className="space-y-3 flex-1">
                {INCLUDED_ITEMS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[var(--color-body-dark)] font-sans text-sm"
                  >
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-success)] flex items-center justify-center mt-0.5">
                      <svg
                        width="12"
                        height="10"
                        viewBox="0 0 12 10"
                        fill="none"
                        className="text-white"
                      >
                        <path
                          d="M1 5l3 3 7-7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="#guarantee"
                className="mt-4 inline-block w-full py-3 px-4 rounded-lg bg-[#e8f4fc] text-[var(--color-body-dark)] font-sans text-sm text-center hover:bg-[#dceef9] transition-colors"
              >
                100% Money-Back Guarantee if your letter is not approved.
              </Link>
            </div>
          </div>

          {/* Right column: What happens next + Order Summary */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* What happens next */}
            <div
              className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)]"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <h2 className="text-[var(--color-body-dark)] font-sans font-bold text-lg mb-2">
                What happens next:
              </h2>
              <p className="text-[var(--color-body-dark)] font-sans text-sm text-[var(--color-text-secondary)]">
                Your MHP will call you shortly to complete your application.
                Many approved ESA letters are issued within a few hours.
              </p>
            </div>

            {/* Order Summary */}
            <div
              className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)]"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <h2 className="text-[var(--color-body-dark)] font-sans font-bold text-lg mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[var(--color-body-dark)]">Official ESA Letter</span>
                    <p className="text-[var(--color-text-tertiary)] text-xs mt-0.5">
                      20% discount applied
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="line-through text-[var(--color-text-tertiary)] mr-2">
                      $160
                    </span>
                    <span className="text-[var(--color-body-dark)] font-medium">
                      $128
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--color-body-dark)]">
                      Express Processing (within 24 hours)
                    </span>
                    <span className="inline-flex w-4 h-4 rounded border-2 border-[var(--color-primary)] bg-[var(--color-primary)]">
                      <svg className="w-full h-full text-white p-0.5" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[var(--color-body-dark)]">$50</span>
                    <p className="text-[var(--color-text-tertiary)] text-xs">+$50</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-body-dark)]">Tax</span>
                  <span className="text-[var(--color-body-dark)]">$14.24</span>
                </div>
              </div>
              <div className="border-t border-[var(--color-border)] my-4 pt-4 flex justify-between items-center">
                <span className="text-[var(--color-body-dark)] font-sans font-bold">
                  Total
                </span>
                <span className="text-[var(--color-body-dark)] font-sans font-bold text-lg">
                  $192.24
                </span>
              </div>
              <label className="flex items-start gap-3 cursor-pointer mt-4">
                <input type="radio" name="renew" className="mt-1" />
                <div>
                  <span className="text-[var(--color-body-dark)] font-sans font-medium">
                    Auto-renew for locked-in discounted price of{" "}
                    <strong>$120/year</strong>
                  </span>
                  <p className="text-[var(--color-text-tertiary)] text-xs mt-1">
                    Your ESA letter will auto-renew every 12 months for $120. You
                    can cancel anytime. Next billing: 2/13/2027
                  </p>
                </div>
              </label>
              <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-[var(--color-border)] text-xs text-[var(--color-body-dark)]">
                <span className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  SSL Secured
                </span>
                <span>Powered by Stripe</span>
                <span>100% Money-Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coupon code */}
        <div className="mb-6">
          <div className="bg-white rounded-xl border border-[var(--color-border)] px-4 py-3 flex items-center justify-between shadow-sm">
            <input
              type="text"
              placeholder="Have a coupon code?"
              className="flex-1 bg-transparent border-none outline-none text-[var(--color-body-dark)] font-sans text-sm placeholder:text-[var(--color-text-tertiary)]"
            />
            <span className="text-[var(--color-text-tertiary)] text-sm cursor-pointer">
              Click to expand
            </span>
          </div>
        </div>

        {/* Contact Information */}
        <div
          className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)] mb-6"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <h2 className="text-[var(--color-body-dark)] font-sans font-bold text-lg mb-4">
            Contact Information
          </h2>
          {registrationLoadError && (
            <p className="text-red-600 font-sans text-sm mb-4">{registrationLoadError}</p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-body-dark)] font-sans text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-body-dark)] font-sans text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-body-dark)] font-sans text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
            />
          </div>
        </div>

        {/* Payment Details */}
        <div
          className="bg-white rounded-xl p-6 shadow-sm border border-[var(--color-border)] mb-6"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <h2 className="text-[var(--color-body-dark)] font-sans font-bold text-lg mb-4">
            Payment Details
          </h2>
          <Elements stripe={stripePromise} options={{ appearance: { theme: "stripe" } }}>
            <PaymentForm
              name={name}
              email={email}
              registrationId={registrationId}
              registration={registration}
              loading={loading}
              setLoading={setLoading}
            />
          </Elements>
        </div>

        {/* Stripe security footer */}
        <div className="bg-white rounded-xl border border-[var(--color-border)] px-4 py-3 flex items-center justify-center gap-2 text-[var(--color-body-dark)] font-sans text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Payments are SSL secure and encrypted with Stripe
        </div>

        {/* Client Testimonials */}
        <section className="w-full pt-16 pb-8 mt-12">
          <h2 className="text-[var(--color-primary)] font-serif font-bold text-3xl md:text-4xl text-center mb-4">
            Client Testimonials
          </h2>
          <p className="max-w-2xl mx-auto text-[var(--color-body-dark)] font-sans text-sm md:text-base text-center text-[var(--color-text-secondary)] mb-10">
            The voices of our clients best represent the impact of our services.
            Their testimonials share real experiences of trust, professionalism,
            and lasting value—demonstrating our commitment to delivering
            reliable support and meaningful results.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CHECKOUT_TESTIMONIALS.map((review, index) => (
              <ReviewCard
                key={review.author}
                icon={review.icon}
                reviewText={review.reviewText}
                author={review.author}
                delay={0}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f5f5f5]">
          <CheckoutHeader />
          <main className="w-full max-w-6xl mx-auto px-4 py-8 md:px-8 md:py-12 lg:px-12 flex items-center justify-center min-h-[50vh]">
            <p className="text-[var(--color-body-dark)] font-sans">Loading checkout...</p>
          </main>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
