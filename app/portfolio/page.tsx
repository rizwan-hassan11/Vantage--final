import type { Metadata } from "next";
import { PageCta } from "@/components/page/page-cta";
import { PortfolioHero } from "@/components/page/portfolio-hero";
import { PortfolioCategoryGrid } from "@/components/page/portfolio-category-grid";
import { PORTFOLIO, PORTFOLIO_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio — Vantage Printers",
  description:
    "Vantage portfolio spans books, brochures, annual reports, cosmetic, pharmaceutical and gift packaging, labels and more.",
};

export default function PortfolioPage() {
  return (
    <div className="home-scroll bg-white text-[color:var(--color-ink)]">
      <PortfolioHero categoryCount={PORTFOLIO.length} />

      <section
        id="portfolio-categories"
        className="relative z-[2] pb-24 lg:pb-32 bg-white scroll-mt-28"
      >
        <div className="container-x pt-16 lg:pt-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-14 lg:mb-16">
            {PORTFOLIO_PAGE.stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="font-serif italic text-[clamp(2rem,4vw,3rem)] text-[color:var(--color-rust)] leading-none">
                  {stat.value}
                  <span className="text-[0.55em] not-italic text-[color:var(--color-mute)]">
                    {stat.suffix}
                  </span>
                </p>
                <p className="mt-2 text-sm text-[color:var(--color-mute)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mb-10 lg:mb-14">
            <p className="eyebrow mb-4">{PORTFOLIO_PAGE.eyebrow}</p>
            <p className="text-base sm:text-lg leading-relaxed text-[color:var(--color-mute)]">
              {PORTFOLIO_PAGE.intro}
            </p>
          </div>

          <PortfolioCategoryGrid categories={PORTFOLIO} />
        </div>
      </section>

      <PageCta
        eyebrow="Start a Project"
        title="Have a new project in mind? Tell us about it — we're here to help."
        ctaLabel="Get a Quote"
        ctaHref="/quote"
      />
    </div>
  );
}
