import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioProjectWall } from "@/components/page/portfolio-project-wall";
import { PORTFOLIO } from "@/lib/content";

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
  };
}

/** Cover first, then the shoot, with duplicates dropped */
function galleryFor(cover: string, projects: string[]) {
  const seen = new Set<string>();
  return [cover, ...projects].filter((src) => {
    if (!src || seen.has(src)) return false;
    seen.add(src);
    return true;
  });
}

export default async function WorkCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = PORTFOLIO.find((c) => c.slug === slug);
  if (!category) notFound();

  const gallery = galleryFor(category.cover, category.projects);

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
            projects={gallery}
          />
        </div>
      </section>
    </div>
  );
}
