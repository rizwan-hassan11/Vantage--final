import type { Metadata } from "next";
import { ContactHero } from "@/components/page/contact-hero";
import { QuoteForm } from "@/components/page/quote-form";
import { CONTACT_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact — Vantage Printers",
  description:
    "Get in touch with Vantage Printers in Lahore for print, packaging, sampling and studio work.",
};

export default function ContactPage() {
  const { quote } = CONTACT_PAGE;

  return (
    <div className="home-scroll bg-white text-[color:var(--color-ink)]">
      <ContactHero />

      <section
        id="quote-form"
        className="relative z-[2] pb-20 sm:pb-24 lg:pb-32 bg-white scroll-mt-28"
      >
        <div className="container-x pt-16 lg:pt-20">
          <div className="mx-auto max-w-2xl mb-10 lg:mb-12 section-intro text-center">
            <p className="eyebrow mb-4">{quote.eyebrow}</p>
            <p className="prose-body mx-auto">{quote.intro}</p>
          </div>

          <div className="mx-auto max-w-3xl">
            <QuoteForm />
          </div>
        </div>
      </section>
    </div>
  );
}
