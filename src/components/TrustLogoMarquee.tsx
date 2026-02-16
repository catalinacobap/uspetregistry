"use client";

import Marquee from "react-fast-marquee";

const LOGO_STRIP_SRC =
  "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/eccdf81c-9691-4180-8205-1ac1a4494cd8";

export function TrustLogoMarquee() {
  return (
    <section className="relative w-full py-[50px] px-[374px] bg-white max-md:py-8 max-md:px-0 overflow-hidden">
      <Marquee speed={50} className="flex items-center py-2">
        <img
          src={LOGO_STRIP_SRC}
          alt="Trusted by leading companies"
          className="h-12 w-auto shrink-0 object-contain max-md:max-h-10 mr-16"
        />
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
