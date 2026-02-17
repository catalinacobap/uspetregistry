import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | US Pet Registry",
  description: "Privacy Policy for US Pet Registry - how we collect and use your information.",
};

const content = [
  {
    heading: "1. Information We Collect",
    body: "We collect information you provide directly to us, such as when you create an account, complete our assessment, or contact us for support. This may include:",
    list: [
      "Personal information (name, email, phone number, address)",
      "Mental health information for ESA assessment",
      "Payment information (processed securely through Stripe)",
      "Communication preferences",
    ],
  },
  {
    heading: "2. How We Use Your Information",
    body: "We use the information we collect to:",
    list: [
      "Provide ESA letter services",
      "Connect you with licensed mental health professionals",
      "Process payments and send receipts",
      "Communicate with you about your order",
      "Improve our services",
    ],
  },
  {
    heading: "3. Information Sharing",
    body: "We do not sell, trade, or otherwise transfer your personal information to third parties except:",
    list: [
      "To licensed therapists for ESA assessment purposes",
      "To payment processors for transaction processing",
      "When required by law or to protect our rights",
      "With your explicit consent",
    ],
  },
  {
    heading: "4. HIPAA Compliance",
    body: "We maintain strict compliance with HIPAA regulations to protect your health information. All mental health data is encrypted and stored securely.",
  },
  {
    heading: "5. Data Security",
    body: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
  },
  {
    heading: "6. Your Rights",
    body: "You have the right to:",
    list: [
      "Access your personal information",
      "Correct inaccurate information",
      "Request deletion of your information",
      "Opt out of marketing communications",
    ],
  },
  {
    heading: "7. Contact Us",
    body: "If you have questions about this Privacy Policy, please contact us at:",
    contact: "Email: info@uspetregistry.org",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen bg-[var(--color-surface-cream)]">
        <article className="w-full max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--color-primary)] font-sans font-normal text-base mb-6 underline hover:no-underline transition-all duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden>
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </Link>
          <h1 className="text-[var(--color-primary)] font-serif font-bold text-3xl md:text-4xl mb-2">
            Privacy Policy
          </h1>
          <p className="text-[var(--color-text-secondary)] font-sans text-sm mb-10">
            Last updated: January 2025
          </p>
          <div className="flex flex-col gap-8 font-sans text-[var(--color-body-dark)]">
            {content.map((section) => (
              <section key={section.heading}>
                <h2 className="text-[var(--color-primary)] font-serif font-bold text-xl mb-3">
                  {section.heading}
                </h2>
                <p className="text-base leading-relaxed mb-2">{section.body}</p>
                {section.list && (
                  <ul className="list-disc list-inside space-y-2 ml-2 mt-2">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.contact && (
                  <p className="mt-2">
                    <a
                      href="mailto:info@uspetregistry.org"
                      className="text-[var(--color-primary)] underline hover:no-underline"
                    >
                      {section.contact}
                    </a>
                  </p>
                )}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
