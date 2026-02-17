"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReviewCard } from "./ReviewCard";

const REVIEWS_DATA = [
  {
    icon: "/david.png",
    reviewText: "\"Fast, professional, and completely legal. I've saved hundreds on pet deposits and my anxiety has improved dramatically with my ESA by my side.\"",
    author: "- David K."
  },
  {
    icon: "/sarah.png",
    reviewText: "\"After moving to a new apartment, my ESA became essential. This service made the process stress-free.\"",
    author: "- Sarah M."
  },
  {
    icon: "/emily.png",
    reviewText: "\"The entire process was seamless. My therapist was understanding and the documentation arrived quickly.\"",
    author: "- Emily P."
  },
  {
    icon: "/robert.png",
    reviewText: "\"Finally found a legitimate service that actually cares about mental health and not just making money.\"",
    author: "- Robert T."
  }
];

export function ReviewsSection() {
  return (
    <section className="w-full py-[60px] px-[85px] bg-white max-md:py-10 max-md:px-4">
      <div className="flex flex-col justify-center items-center gap-[42px] max-w-7xl mx-auto max-md:gap-8">
        {/* Reviews Title */}
        <motion.h2 
          className="w-full max-w-7xl h-[62px] text-[var(--color-primary)] font-serif font-bold text-[48px] leading-[62px] text-center max-md:h-auto max-md:text-[32px] max-md:leading-tight max-md:px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          They Love It, So Will You
        </motion.h2>
        
        {/* Reviews Content */}
        <div className="flex justify-between items-stretch w-full max-w-7xl gap-4 max-md:flex-col max-md:gap-6 max-md:items-stretch">
          {REVIEWS_DATA.map((review, index) => (
            <ReviewCard
              key={review.author}
              icon={review.icon}
              reviewText={review.reviewText}
              author={review.author}
              delay={0.2 + index * 0.1}
            />
          ))}
        </div>
        
        {/* Reviews Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/register"
            className="flex justify-center items-center w-[208px] h-[53px] px-[30px] py-4 gap-2.5 bg-[var(--color-primary)] rounded-full shadow-lg hover:bg-[var(--color-primary-hover)] transition-colors cursor-pointer max-md:w-full max-md:max-w-[208px]"
            style={{
              boxShadow: "var(--shadow-primary)"
            }}
          >
            <span className="w-[148px] h-[21px] text-[var(--color-on-primary)] font-serif font-bold text-base leading-[21px] text-center max-md:w-auto">
              Read More Reviews
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
