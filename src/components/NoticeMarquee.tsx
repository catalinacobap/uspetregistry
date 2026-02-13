"use client";

import Marquee from "react-fast-marquee";

const NOTICE_TEXT =
  "Notice: Per HUD Guidance (FHEO-2020-01), ESA documentation requires landlords and property managers to grant reasonable accommodation without additional fees or deposits.";

export function NoticeMarquee() {
  return (
    <div className="w-full overflow-hidden bg-[var(--color-primary)] py-2.5">
      <Marquee speed={40} className="flex">
        <span className="text-white font-sans text-sm font-normal whitespace-nowrap mr-12">
          {NOTICE_TEXT}
        </span>
      </Marquee>
    </div>
  );
}
