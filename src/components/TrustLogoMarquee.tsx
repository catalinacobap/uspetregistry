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
      {/* Gradient overlay like Hero: left to center, right to center */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-48 max-md:w-32 bg-gradient-to-r from-[#FFFFFF] to-transparent z-10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-48 max-md:w-32 bg-gradient-to-l from-[#FFFFFF] to-transparent z-10"
        aria-hidden
      />
    </section>
  );
}
