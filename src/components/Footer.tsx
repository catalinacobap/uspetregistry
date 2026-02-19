"use client";

import { motion } from "framer-motion";
import { FooterColumn, type FooterLink } from "./FooterColumn";

const FOOTER_COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Services",
    links: ["ESA Letters", "PSD Letters", "renewal services", "housing support"]
  },
  {
    title: "Support",
    links: [
      { text: "FAQ's", href: "/#faq" },
      { text: "Contact Us", href: "mailto:info@uspetregistry.org" },
      { text: "Order Status", href: "#" },
      { text: "refund policy", href: "/terms" },
    ]
  },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative w-full py-[59px] px-[85px] overflow-hidden bg-no-repeat bg-bottom bg-cover max-md:py-10 max-md:px-4 md:py-12 md:px-6 lg:py-[59px] lg:px-[85px]"
      style={{ backgroundImage: 'url(/images/footer.png)' }}
    >
      <div className="relative z-10 flex flex-col justify-center items-center gap-[203px] max-w-7xl mx-auto max-md:gap-10 max-md:items-start md:gap-14 lg:gap-[203px]">
        {/* Footer Content Row */}
        <div className="flex justify-between items-center w-full gap-[267px] max-md:flex-col max-md:gap-8 max-md:items-start max-md:text-left md:gap-10 md:flex-wrap lg:gap-[267px]">
          {/* Logo and Description */}
          <motion.div
            className="flex items-center gap-3 max-md:flex-col max-md:items-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-1.5 max-md:items-start">
              {/* Logo */}
              <img
                src="/logo.png"
                alt="US Pet Registry Logo"
                className="w-[117px] h-[51px] object-contain"
              />
              
              {/* Description */}
              <div className="flex flex-col gap-1.5 w-[277px] max-md:w-full max-md:max-w-[277px]">
                <p className="text-[var(--color-primary)] font-sans font-normal text-base leading-[21px] text-left max-md:text-sm">
                  Legitimate ESA letters from licensed professionals, trusted nationwide.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Footer Columns */}
          <div className="flex gap-[50px] max-md:flex-wrap max-md:justify-start max-md:gap-8 max-md:w-full max-md:max-w-sm">
            {FOOTER_COLUMNS.map((column, index) => (
              <FooterColumn
                key={column.title}
                title={column.title}
                links={column.links}
                delay={0.2 + index * 0.1}
              />
            ))}
            {/* Contact: mailto, tel, address (no link) */}
            <motion.div
              className="flex flex-col gap-3 max-md:items-start max-md:text-left w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            >
              <h3 className="text-[var(--color-primary)] font-serif font-bold text-xl leading-[27px] capitalize max-md:text-lg">
                Contact
              </h3>
              <div className="flex flex-col gap-1.5 max-md:items-start">
                <a
                  href="mailto:info@uspetregistry.org"
                  className="text-[var(--color-primary)] font-sans font-normal text-base leading-[21px] hover:underline transition-all duration-200 max-md:text-sm lowercase"
                >
                  info@uspetregistry.org
                </a>
                <a
                  href="tel:(201) 979-1703"
                  className="text-[var(--color-primary)] font-sans font-normal text-base leading-[21px] hover:underline transition-all duration-200 max-md:text-sm capitalize"
                >
                  (201) 979-1703
                </a>
                <span className="text-[var(--color-primary)] font-sans font-normal text-base leading-[21px] max-md:text-sm capitalize">
                  440 Torp Flats, Prosaccoborough, GA 27010
                </span>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <motion.div
          className="flex items-center gap-11 max-md:flex-col max-md:gap-4 max-md:text-left max-md:items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
        >
          {/* Copyright */}
          <span className="text-[var(--color-primary)] font-sans font-normal text-base leading-[21px] max-md:text-sm capitalize">
            © US Pet Registry 2026
          </span>
          
          {/* Terms & Conditions */}
          <a
            href="/terms"
            className="text-[var(--color-primary)] font-sans font-normal text-base leading-[21px] underline hover:no-underline transition-all duration-200 max-md:text-sm capitalize"
          >
            Terms & Conditions
          </a>
          
          {/* Privacy Policy */}
          <a
            href="/privacy"
            className="text-[var(--color-primary)] font-sans font-normal text-base leading-[21px] underline hover:no-underline transition-all duration-200 max-md:text-sm capitalize"
          >
            privacy policy
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
