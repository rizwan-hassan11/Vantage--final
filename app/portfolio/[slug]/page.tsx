import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageCta } from "@/components/page/page-cta";
import { PortfolioCategoryHero } from "@/components/page/portfolio-category-hero";
import { PortfolioProjectWall } from "@/components/page/portfolio-project-wall";
import { getPortfolioCategoryMeta, PORTFOLIO } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PORTFOLIO.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = PORTFOLIO.find((c) => c.slug === slug);
  if (!cat) return { title: "Portfolio — Vantage Printers" };
  return {
    title: `${cat.title} — Vantage Portfolio`,
    description: cat.short,
  };
}

export default async function PortfolioCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = PORTFOLIO.find((c) => c.slug === slug);
  if (!category) notFound();

  const meta = getPortfolioCategoryMeta(category.slug);

  return (
    <div className="home-scroll bg-white text-[color:var(--color-ink)]">
      <PortfolioCategoryHero category={category} />

      <section
        id="portfolio-projects"
        className="portfolio-wall relative z-[2] bg-white scroll-mt-28"
      >
        <div className="portfolio-wall__inner container-x">
          <header className="portfolio-wall__header">
            <div className="portfolio-wall__copy">
              <div>
                <Link
                  href="/portfolio"
                  className="portfolio-wall__back link-swipe text-sm text-[color:var(--color-mute)] mb-3 sm:mb-4 inline-flex items-center gap-2"
                >
                  <ArrowLeft size={14} strokeWidth={1.5} />
                  Back to Portfolio
                </Link>
                <p className="eyebrow mb-2 sm:mb-3">
                  Portfolio · {category.number}
                </p>
                <h2 className="portfolio-wall__title">{category.title}</h2>
              </div>
              <p className="portfolio-wall__intro">{meta.curtain.intro}</p>
            </div>
          </header>

          <PortfolioProjectWall
            categoryTitle={category.title}
            projects={category.projects}
          />
        </div>
      </section>

      <PageCta
        eyebrow="Start a Project"
        title="Have a project in mind for this category? Tell us about it — we're here to help."
        ctaLabel="Contact Us"
        ctaHref="/contact"
      />
    </div>
  );
}
