import type { Metadata } from "next";
import { PT_Serif, Inclusive_Sans, Inter } from "next/font/google";
import "./globals.css";

const ptSerif = PT_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inclusiveSans = Inclusive_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "US Pet Registry",
  description: "US Pet Registry is a platform that allows you to register your pet and get a pet passport.",
  icons: {
    icon: "/ico.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${ptSerif.variable} ${inclusiveSans.variable} ${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
