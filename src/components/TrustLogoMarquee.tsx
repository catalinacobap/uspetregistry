"use client";

import Marquee from "react-fast-marquee";

const LOGO_STRIP_SRC =
  "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/eccdf81c-9691-4180-8205-1ac1a4494cd8";

export function TrustLogoMarquee() {
  return (
    <section className="relative w-full py-12 px-4 bg-white max-md:pt-10 max-md:pb-8 md:py-10 md:px-6 lg:py-[50px] lg:px-[85px] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Marquee speed={50} className="flex items-center py-2">
          <img
            src={LOGO_STRIP_SRC}
            alt="Trusted by leading companies"
            className="h-12 w-auto shrink-0 object-contain max-md:max-h-10 mr-16"
          />
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
