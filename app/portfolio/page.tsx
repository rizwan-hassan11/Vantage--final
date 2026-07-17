import type { Metadata } from "next";
import { PageCta } from "@/components/page/page-cta";
import { PortfolioHero } from "@/components/page/portfolio-hero";
import { PortfolioCategoryWall } from "@/components/page/portfolio-category-wall";
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
        className="portfolio-wall relative z-[2] bg-white scroll-mt-28"
      >
        <div className="portfolio-wall__inner container-x">
          <header className="portfolio-wall__header">
            <div className="portfolio-wall__copy">
              <div>
                <p className="eyebrow mb-2 sm:mb-3">{PORTFOLIO_PAGE.eyebrow}</p>
                <h2 className="portfolio-wall__title">{PORTFOLIO_PAGE.title}</h2>
              </div>
              <p className="portfolio-wall__intro">{PORTFOLIO_PAGE.intro}</p>
            </div>
          </header>

          <PortfolioCategoryWall categories={PORTFOLIO} />
        </div>
      </section>

      <PageCta
        eyebrow="Start a Project"
        title="Have a new project in mind? Tell us about it — we're here to help."
        ctaLabel="Contact Us"
        ctaHref="/contact"
      />
    </div>
  );
}
