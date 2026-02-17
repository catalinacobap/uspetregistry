import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | US Pet Registry",
  description: "Terms of Service for US Pet Registry ESA letter services.",
};

const content = [
  {
    heading: "1. Acceptance of Terms",
    body: "By accessing and using US Pet Registry services, you accept and agree to be bound by the terms and provision of this agreement.",
  },
  {
    heading: "2. Service Description",
    body: "US Pet Registry provides emotional support animal (ESA) letter services through licensed mental health professionals. Our services include assessment, consultation, and issuance of ESA letters for qualifying individuals.",
  },
  {
    heading: "3. Eligibility Requirements",
    body: "To receive an ESA letter, you must:",
    list: [
      "Be 18 years of age or older",
      "Have a qualifying mental health condition",
      "Complete our assessment process honestly and accurately",
      "Reside in a state where our therapists are licensed",
    ],
  },
  {
    heading: "4. Payment and Refunds",
    body: "Payment is required before services are rendered. We offer a 100% money-back guarantee if your ESA letter is rejected by your landlord or if you are not satisfied with our services within 30 days.",
  },
  {
    heading: "5. Privacy and Confidentiality",
    body: "We maintain strict confidentiality of all personal health information in accordance with HIPAA regulations. Your information will only be used for providing ESA services and will not be shared with third parties without your consent.",
  },
  {
    heading: "6. Limitation of Liability",
    body: "US Pet Registry's liability is limited to the amount paid for our services. We are not responsible for any indirect, incidental, or consequential damages.",
  },
  {
    heading: "7. Contact Information",
    body: "For questions about these Terms of Service, please contact us at:",
    contact: "Email: info@uspetregistry.org",
  },
];

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen bg-[var(--color-surface-cream)]">
        <article className="w-full max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <h1 className="text-[var(--color-primary)] font-serif font-bold text-3xl md:text-4xl mb-2">
            Terms of Service
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
