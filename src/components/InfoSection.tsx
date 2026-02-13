"use client";

import { motion } from "framer-motion";
import { InfoCard } from "./InfoCard";

const INFO_CARDS = [
  {
    image: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/4f54420f-05f7-4630-b831-c9a645f3fd0f",
    imageAlt: "Illustration of a dog and cat with a paw print behind them",
    title: "What Is an Emotional Support Animal (ESA)?",
    description: "An Emotional Support Animal (ESA) is a companion animal recommended by a licensed mental health professional to help reduce symptoms of emotional or psychological conditions. ESAs provide comfort and support but do not require specialized training like service animals.",
    isLarge: true
  },
  {
    image: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/9e93e808-f5ce-4d25-a33c-a106123cead6",
    imageAlt: "Illustration of an official ESA letter envelope",
    title: "Do I Need an ESA Registration or Certification?",
    description: "No official government registry exists for Emotional Support Animals. A valid ESA letter issued by a licensed mental health professional is the only legally recognized documentation needed for housing protections."
  },
  {
    image: "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/bda8bc0e-1b1c-4d95-8069-80efc3dc84fe",
    imageAlt: "Illustration of a couple hugging with hearts above",
    title: "Who Qualifies for an Emotional Support Animal?",
    description: "Anyone experiencing mental or emotional challenges that impact daily life may qualify after evaluation by a licensed professional. Conditions may include anxiety, depression, PTSD, stress disorders, and other emotional health concerns."
  }
];

export function InfoSection() {
  return (
    <section className="w-full py-[70px] px-[85px] bg-white max-md:py-10 max-md:px-4">
      <div className="flex flex-col items-center gap-14 max-w-7xl mx-auto max-md:gap-8">
        {/* Info Container */}
        <div className="flex flex-col gap-14 w-full max-md:gap-8">
          {/* Info Title */}
          <motion.h2 
            className="w-full text-[var(--color-primary)] font-serif font-bold text-[48px] leading-[62px] text-center max-md:text-[32px] max-md:leading-tight max-md:px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            What Is an ESA Letter?
          </motion.h2>
          
          {/* Info Description */}
          <motion.p 
            className="w-full text-[var(--color-muted)] font-sans font-normal text-[22px] leading-[26px] text-center max-md:text-base max-md:leading-6 max-md:px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          >
            An ESA letter is an official document written by a licensed mental health professional confirming that an individual qualifies for an Emotional Support Animal as part of their mental health treatment. This letter provides legal housing protections under the Fair Housing Act, allowing individuals to live with their ESA even in properties with &quot;no pets&quot; policies or pet fees.
          </motion.p>
        </div>
        
        {/* Info Content */}
        <div className="flex flex-col gap-4 w-full max-w-7xl max-md:gap-6">
          {/* Large Card */}
          <InfoCard
            image={INFO_CARDS[0].image}
            imageAlt={INFO_CARDS[0].imageAlt}
            title={INFO_CARDS[0].title}
            description={INFO_CARDS[0].description}
            isLarge={true}
            delay={0.4}
          />
          
          {/* Two Side-by-Side Cards */}
          <div className="flex gap-4 max-md:flex-col max-md:gap-6">
            <InfoCard
              image={INFO_CARDS[1].image}
              imageAlt={INFO_CARDS[1].imageAlt}
              title={INFO_CARDS[1].title}
              description={INFO_CARDS[1].description}
              delay={0.6}
            />
            <InfoCard
              image={INFO_CARDS[2].image}
              imageAlt={INFO_CARDS[2].imageAlt}
              title={INFO_CARDS[2].title}
              description={INFO_CARDS[2].description}
              delay={0.8}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
