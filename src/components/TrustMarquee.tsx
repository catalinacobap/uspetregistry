"use client";

import Marquee from "react-fast-marquee";
import { TrustItem } from "./TrustItem";

const TRUST_ITEMS = [
  { icon: "/bbbLogo.png", iconAlt: "BBB Accredited Business A+ Rating", text: "BBB A+ Rating" },
  { icon: "/consumerAffairsLogo.png", iconAlt: "ConsumerAffairs 4.7 stars", text: "ConsumerAffairs 4.7" },
  { icon: "/hipaLogo.png", iconAlt: "HIPAA Compliant", text: "HIPAA Compliant" },
  { icon: "/trustPilot.png", iconAlt: "TrustPilot", text: "TrustPilot" },
];

export function TrustMarquee() {
  return (
    <section className="relative w-full py-16 px-4 bg-white max-md:py-10 md:py-12 md:px-6 lg:py-16 lg:px-[85px] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Marquee speed={45} className="flex items-center py-4">
        {TRUST_ITEMS.map((item, index) => (
          <div key={`${item.text}-${index}`} className="shrink-0 mr-12">
            <TrustItem
              icon={item.icon}
              iconAlt={item.iconAlt}
              text={item.text}
              delay={0}
              isMarquee
            />
          </div>
        ))}
        </Marquee>
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-24 left-0 md:left-6 lg:left-[85px] bg-gradient-to-r from-white via-white/60 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-24 right-0 md:right-6 lg:right-[85px] bg-gradient-to-l from-white via-white/60 to-transparent"
        aria-hidden
      />
    </section>
  );
}
