import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import "./globals.css";
import "./chapter-scroll.css";

const onest = localFont({
  src: "./fonts/Onest-VariableFont_wght.ttf",
  variable: "--font-onest",
  display: "swap",
  weight: "100 900",
});

const elMessiri = localFont({
  src: "./fonts/ElMessiri-VariableFont_wght.ttf",
  variable: "--font-el-messiri",
  display: "swap",
  weight: "400 700",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

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
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${onest.variable} ${elMessiri.variable}`}>
      <body suppressHydrationWarning>
        <SmoothScrollProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="relative">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
