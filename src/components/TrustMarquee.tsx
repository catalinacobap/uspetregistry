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
    <section className="relative w-full py-16 px-[374px] bg-white max-md:py-10 max-md:px-0 overflow-hidden">
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
      {/* White gradient on both sides: align to content edge on desktop (px-[374px]), full width on mobile */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-40 max-md:w-24 left-[374px] max-md:left-0 bg-gradient-to-r from-white via-white/40 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-40 max-md:w-24 right-[374px] max-md:right-0 bg-gradient-to-l from-white via-white/40 to-transparent"
        aria-hidden
      />
    </section>
  );
}
