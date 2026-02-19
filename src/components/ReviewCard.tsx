"use client";

import { motion } from "framer-motion";

interface ReviewCardProps {
  icon: string;
  reviewText: string;
  author: string;
  delay?: number;
}

export function ReviewCard({ icon, reviewText, author, delay = 0 }: ReviewCardProps) {
  return (
    <motion.div
      className="flex flex-col w-[320px] min-h-[320px] p-[30px] gap-4 bg-white border border-[var(--color-border-warm)] rounded-2xl shadow-lg max-md:w-full max-md:min-w-0 max-md:max-w-full max-md:p-6 max-md:mx-auto max-md:min-h-0"
      style={{
        boxShadow: "var(--shadow-card)"
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
    >
      {/* Review Content */}
      <div className="flex flex-col items-center gap-4 flex-1 min-h-0 max-md:w-full max-md:gap-4">
        {/* Avatar */}
        <img
          src={icon}
          alt="Customer review"
          className="w-[90px] h-[90px] rounded-full object-cover shadow-sm shrink-0"
          style={{
            boxShadow: "var(--shadow-icon)"
          }}
        />

        {/* Review Text - grows to fill space so all cards match height */}
        <p className="w-full flex-1 min-h-0 text-[var(--color-primary)] font-sans font-normal text-base leading-[21px] text-left max-md:text-sm max-md:leading-5 max-md:flex-initial">
          {reviewText}
        </p>

        {/* Review Author */}
        <p className="w-full shrink-0 text-[var(--color-primary)] font-serif font-bold text-[15px] leading-[19px] text-left">
          {author}
        </p>
      </div>
    </motion.div>
  );
}
