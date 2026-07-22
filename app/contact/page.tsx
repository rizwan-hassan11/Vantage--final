import type { Metadata } from "next";
import { ContactHero } from "@/components/page/contact-hero";
import { QuoteForm } from "@/components/page/quote-form";
import { PrintSpecsForm } from "@/components/page/print-specs-form";
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
        <div className="container-x pt-10 lg:pt-14">
          <div className="mx-auto max-w-3xl">
            <header className="quote-form-header">
              <h2 className="quote-form-header__title">{quote.title}</h2>
              <p className="quote-form-header__intro">{quote.intro}</p>
            </header>
            <QuoteForm />

            <div className="print-specs-wrap">
              <PrintSpecsForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
