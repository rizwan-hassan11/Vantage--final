import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioProjectWall } from "@/components/page/portfolio-project-wall";
import { PORTFOLIO } from "@/lib/content";
import { MOBILE_WORK_PROJECTS } from "@/lib/mobile-assets";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PORTFOLIO.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = PORTFOLIO.find((c) => c.slug === slug);
  if (!category) return { title: "Work — Vantage Printers" };
  return {
    title: `${category.title} — Vantage Work`,
    description: category.intro,
    alternates: { canonical: `/work/${category.slug}` },
  };
}

export default async function WorkCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = PORTFOLIO.find((c) => c.slug === slug);
  if (!category) notFound();

  return (
    <div className="work-page">
      <section className="work-category" aria-labelledby="work-category-title">
        <div className="container-x">
          <header className="work-head">
            <p className="work-badge">{category.title}</p>
            <h1 id="work-category-title" className="work-headline">
              {category.headline.map((line) => (
                <span key={line} className="work-headline__line">
                  {line}
                </span>
              ))}
            </h1>
            <p className="work-lede work-lede--wide">{category.intro}</p>
          </header>

          <PortfolioProjectWall
            categoryTitle={category.title}
            projects={category.projects}
            mobileProjects={MOBILE_WORK_PROJECTS[category.slug]}
            projectLabels={category.projectLabels}
          />
        </div>
      </section>
    </div>
  );
}
