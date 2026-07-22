import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/chat/chat-widget";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ScrollRouteSync } from "@/components/providers/scroll-route-sync";
import "./globals.css";
import "./chapter-scroll.css";

const optima = localFont({
  src: [
    {
      path: "./fonts/Optima-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Optima-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Optima-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Optima-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./fonts/Optima-ExtraBlack.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-optima",
  display: "swap",
  fallback: [],
});

const onest = localFont({
  src: "./fonts/Onest-VariableFont_wght.ttf",
  variable: "--font-onest",
  display: "swap",
  weight: "100 900",
  fallback: [],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Vantage Printers — Precision Print & Packaging",
  description:
    "Vantage is Pakistan's engineering-first printing house. Offset, flexo, digital, design and finishing crafted under one roof in Lahore.",
  metadataBase: new URL("https://vantage.pk"),
  openGraph: {
    title: "Vantage Printers — Think Beyond",
    description:
      "Award-winning offset, flexo, digital, design and finishing. 34 years of craftsmanship for 500+ brands.",
    images: ["/og-default.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "150x150" },
      { url: "/brand/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
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
    <html lang="en" className={`${optima.variable} ${onest.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <SmoothScrollProvider>
          <ScrollRouteSync />
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="relative">
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
