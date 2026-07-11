import type { Metadata } from "next";
import { Inter, Instrument_Serif, Fraunces } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vantage Printers — Precision Print & Packaging",
  description:
    "Vantage is Pakistan's engineering-first printing house. Offset, flexo, digital, screen and design printing crafted under one roof in Lahore.",
  metadataBase: new URL("https://vantage.pk"),
  openGraph: {
    title: "Vantage Printers — Think Beyond",
    description:
      "Award-winning offset, flexo, digital, screen and design printing. 34 years of craftsmanship for 500+ brands.",
    images: ["/og-default.svg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/brand/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrument.variable} ${fraunces.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
