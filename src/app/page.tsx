import { NoticeMarquee } from "@/components/NoticeMarquee";
import { Header } from "@/components/Header";
import { ProcessTitle } from "@/components/ProcessTitle";
import { ProcessSteps } from "@/components/ProcessSteps";
import { InfoSection } from "@/components/InfoSection";
import { PricingSection } from "@/components/PricingSection";
import { TrustLogoMarquee } from "@/components/TrustLogoMarquee";
import { TrustMarquee } from "@/components/TrustMarquee";
import { CTASection } from "@/components/CTASection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <main>
        <NoticeMarquee />
        <Header />

        <Hero />

        <TrustLogoMarquee />

        <section id="how-it-works" className="w-full py-[85px] px-[85px] max-md:py-10 max-md:px-4 md:py-14 md:px-6 lg:py-[85px] lg:px-[85px]">
          <ProcessTitle />
          <ProcessSteps />
        </section>

        <InfoSection />

        <PricingSection />

        <TrustMarquee />

        <CTASection />

        <ReviewsSection />

        <FAQSection />

        <Footer />
      </main>
    </>
  );
}
