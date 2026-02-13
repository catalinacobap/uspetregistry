"use client";

import { motion } from "framer-motion";
import { FAQItem } from "./FAQItem";

const FAQ_DATA = [
  {
    question: "Is this legal in my state?",
    answer: "Yes, ESA letters are federally protected under the Fair Housing Act, which applies to all 50 states. This means landlords must make reasonable accommodations for emotional support animals, regardless of pet policies."
  },
  {
    question: "How fast will I get my letter?",
    answer: "Most clients receive their ESA letter within 24-48 hours after completing the assessment and consultation with a licensed mental health professional. Same-day processing is available for urgent cases."
  },
  {
    question: "Can I fly with my pet using this letter?",
    answer: "No, airlines no longer recognize ESA letters for air travel as of 2021. For flights, your animal must qualify as a Psychiatric Service Dog (PSD) with specialized training. ESA letters are primarily for housing accommodations."
  },
  {
    question: "What if my landlord says no?",
    answer: "Landlords are legally required to make reasonable accommodations under the Fair Housing Act. If they refuse a valid ESA letter, they may be violating federal law. We provide guidance on how to properly present your letter and handle any disputes."
  },
  {
    question: "Is this HIPAA compliant?",
    answer: "Yes, our entire process is fully HIPAA compliant. All consultations and documentation are handled through secure, encrypted platforms that protect your personal health information according to federal privacy standards."
  },
  {
    question: "Do I need to have a pet already?",
    answer: "No, you don't need to have a pet before getting your ESA letter. The letter confirms your need for an emotional support animal, and you can adopt or acquire your ESA after receiving the documentation."
  },
  {
    question: "Will this work for any type of housing?",
    answer: "ESA letters work for most housing situations including apartments, condos, and rental homes. Some exceptions include owner-occupied buildings with 4 or fewer units and certain senior housing facilities. We'll help you understand your specific situation."
  },
  {
    question: "How long is the letter valid?",
    answer: "ESA letters are typically valid for one year from the date of issuance. After that, you'll need to renew your letter with an updated evaluation from a licensed mental health professional to maintain your housing accommodations."
  }
];

export function FAQSection() {
  return (
    <section className="w-full py-[85px] px-[85px] bg-white max-md:py-10 max-md:px-4">
      <div className="flex flex-col justify-center items-center gap-14 max-w-7xl mx-auto max-md:gap-8">
        {/* FAQ Title */}
        <motion.h2 
          className="w-full max-w-7xl text-[var(--color-primary)] font-serif font-bold text-[48px] leading-[62px] text-center capitalize max-md:text-[32px] max-md:leading-tight max-md:px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Frequently Asked Questions
        </motion.h2>
        
        {/* FAQ Content */}
        <div className="flex flex-col items-center w-full max-w-7xl gap-3 max-md:gap-4 max-md:w-full">
          {FAQ_DATA.map((faq, index) => (
            <FAQItem
              key={faq.question + index}
              question={faq.question}
              answer={faq.answer}
              delay={0.2 + index * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
