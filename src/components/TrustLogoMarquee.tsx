"use client";

import Marquee from "react-fast-marquee";

const LOGO_STRIP_SRC =
  "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/eccdf81c-9691-4180-8205-1ac1a4494cd8";

export function TrustLogoMarquee() {
  return (
    <section className="relative w-full py-[50px] px-[374px] bg-white max-md:pt-12 max-md:pb-10 max-md:px-0 md:py-10 md:px-8 lg:py-[50px] lg:px-[374px] overflow-hidden">
      <Marquee speed={50} className="flex items-center py-2">
        <img
          src={LOGO_STRIP_SRC}
          alt="Trusted by leading companies"
          className="h-12 w-auto shrink-0 object-contain max-md:max-h-10 mr-16"
        />
      </Marquee>
      {/* White gradient on both sides: align to content edge on desktop (px-[374px]), full width on mobile */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-40 max-md:w-24 left-[374px] max-md:left-0 md:left-8 md:w-24 lg:left-[374px] lg:w-40 bg-gradient-to-r from-white via-white/40 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-40 max-md:w-24 right-[374px] max-md:right-0 md:right-8 md:w-24 lg:right-[374px] lg:w-40 bg-gradient-to-l from-white via-white/40 to-transparent"
        aria-hidden
      />
    </section>
  );
}
