"use client";

import Marquee from "react-fast-marquee";
import { TrustItem } from "./TrustItem";

const MARQUEE_IMAGES = {
  license: "/images/marquee/esa.png",
  protection: "/images/marquee/protection.png",
  delivery: "/images/marquee/delivery.png",
  guarantee: "/images/marquee/money.png",
};

const TRUST_ITEMS = [
  {
    icon: MARQUEE_IMAGES.license,
    iconAlt: "Licensed in all 50 states",
    text: "Licensed in all 50 states",
  },
  {
    icon: MARQUEE_IMAGES.protection,
    iconAlt: "Fair Housing Act protected",
    text: "Fair Housing Act protected",
  },
  {
    icon: MARQUEE_IMAGES.delivery,
    iconAlt: "Same-day delivery available",
    text: "Same-day delivery available",
  },
  {
    icon: MARQUEE_IMAGES.guarantee,
    iconAlt: "100% money-back guarantee",
    text: "100% money-back guarantee",
  },
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
      {/* Gradient overlay like Hero: left to center, right to center */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-30 max-md:w-32 bg-gradient-to-r from-[#FFFFFF] to-transparent z-10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-30 max-md:w-32 bg-gradient-to-l from-[#FFFFFF] to-transparent z-10"
        aria-hidden
      />
    </section>
  );
}
