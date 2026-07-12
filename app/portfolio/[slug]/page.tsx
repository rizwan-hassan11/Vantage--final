import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PageCta } from "@/components/page/page-cta";
import { PortfolioCategoryHero } from "@/components/page/portfolio-category-hero";
import { PortfolioProjectGrid } from "@/components/page/portfolio-project-grid";
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
        className="relative z-[2] pb-24 lg:pb-32 bg-white scroll-mt-28"
      >
        <div className="container-x pt-16 lg:pt-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-14 lg:mb-16">
            <div className="text-center sm:text-left">
              <p className="font-serif italic text-[clamp(2rem,4vw,3rem)] text-[color:var(--color-rust)] leading-none">
                {category.projects.length}
              </p>
              <p className="mt-2 text-sm text-[color:var(--color-mute)]">
                Featured projects
              </p>
            </div>
            <div className="text-center sm:text-left">
              <p className="font-serif italic text-[clamp(2rem,4vw,3rem)] text-[color:var(--color-rust)] leading-none">
                {category.number}
              </p>
              <p className="mt-2 text-sm text-[color:var(--color-mute)]">
                Portfolio category
              </p>
            </div>
            <div className="text-center sm:text-left sm:col-span-2">
              <p className="font-serif italic text-[clamp(1.35rem,2.4vw,2rem)] text-[color:var(--color-rust)] leading-snug">
                {category.short}
              </p>
            </div>
          </div>

          <div className="max-w-2xl mb-10 lg:mb-12">
            <Link
              href="/portfolio"
              className="link-swipe text-sm text-[color:var(--color-mute)] mb-6 inline-flex items-center gap-2"
            >
              <ArrowLeft size={14} strokeWidth={1.5} />
              Back to Portfolio
            </Link>
            <p className="eyebrow mb-4">Portfolio · {category.number}</p>
            <p className="text-base sm:text-lg leading-relaxed text-[color:var(--color-mute)]">
              {meta.curtain.intro}
            </p>
          </div>

          <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/8] overflow-hidden bg-[color:var(--color-off)] mb-14 lg:mb-16">
            <Image
              src={category.cover}
              alt={category.title}
              fill
              sizes="100vw"
              quality={95}
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-8">
              <h2 className="font-serif italic text-[color:var(--color-rust)] text-[clamp(2rem,4vw,3rem)] leading-tight mb-8">
                {category.title}
              </h2>
              <PortfolioProjectGrid
                categoryTitle={category.title}
                projects={category.projects}
              />
            </div>

            <aside className="lg:col-span-4 space-y-8">
              <div>
                <p className="eyebrow mb-3">All Categories</p>
                <ul className="space-y-2">
                  {PORTFOLIO.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/portfolio/${item.slug}`}
                        className={`link-swipe text-base ${
                          item.slug === category.slug
                            ? "text-[color:var(--color-rust)]"
                            : "text-[color:var(--color-ink-2)]"
                        }`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Start a Project"
        title="Have a project in mind for this category? Tell us about it — we're here to help."
        ctaLabel="Get a Quote"
        ctaHref="/quote"
      />
    </div>
  );
}
