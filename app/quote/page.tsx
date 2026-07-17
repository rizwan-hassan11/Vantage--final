import type { Metadata } from "next";
import { QuoteForm } from "@/components/page/quote-form";
import { QuoteHero } from "@/components/page/quote-hero";
import { QUOTE_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us — Vantage Printers",
  description:
    "Request a print or packaging quote from Vantage Printers. Our estimation team responds within one business day.",
};

export default function QuotePage() {
  return (
    <div className="home-scroll bg-white text-[color:var(--color-ink)]">
      <QuoteHero />

      <section
        id="quote-form"
        className="relative z-[2] pb-24 lg:pb-32 bg-white scroll-mt-28"
      >
        <div className="container-x pt-16 lg:pt-20">
          <div className="max-w-2xl mb-10 lg:mb-12">
            <p className="eyebrow mb-4">{QUOTE_PAGE.eyebrow}</p>
            <p className="prose-body">
              {QUOTE_PAGE.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <QuoteForm />
            </div>

            <aside className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-24 xl:top-28 self-start">
              <div className="rust-block on-rust mb-6 sm:mb-8">
                <p className="tag-caps text-white/70 mb-3">Direct line</p>
                <p className="font-serif italic text-xl sm:text-2xl text-white mb-4">
                  Sales &amp; Estimation
                </p>
                <div className="space-y-2 text-sm text-white/90 break-words">
                  <p>
                    <a href={QUOTE_PAGE.phoneHref} className="link-swipe text-white">
                      {QUOTE_PAGE.phone}
                    </a>
                  </p>
                  <p>
                    <a href={QUOTE_PAGE.emailHref} className="link-swipe text-white">
                      {QUOTE_PAGE.email}
                    </a>
                  </p>
                </div>
              </div>

              <div className="space-y-0 border-t border-[color:var(--color-hairline)]">
                {QUOTE_PAGE.steps.map((step) => (
                  <div
                    key={step.number}
                    className="py-5 sm:py-6 border-b border-[color:var(--color-hairline)]"
                  >
                    <p className="numeral text-xs text-[color:var(--color-rust)] mb-2">
                      {step.number}
                    </p>
                    <h2 className="font-serif italic text-lg sm:text-xl text-[color:var(--color-ink)] mb-2">
                      {step.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-[color:var(--color-mute)]">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
