import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/final-cta";
import { WorkCategoryWall } from "@/components/page/work-category-wall";
import { WorkHeroCover } from "@/components/page/work-hero-cover";
import { WORK_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work — Vantage Printers",
  description:
    "Packaging, labels and print produced by Vantage: cosmetics, perfume, pharmaceutical, home textile, gift boxes, labels, annual reports, books and catalogues.",
};

export default function WorkPage() {
  return (
    <div className="work-page">
      {/* One column for cover, copy and grids so every left edge shares a line */}
      <div className="container-x work-page__inner">
        <section className="work-intro" aria-labelledby="work-intro-title">
          <WorkHeroCover />

          <div className="work-intro__copy">
            <h1 id="work-intro-title" className="work-headline">
              {WORK_PAGE.headline.map((line) => (
                <span key={line} className="work-headline__line">
                  {line}
                </span>
              ))}
            </h1>
            <p className="work-lede">{WORK_PAGE.intro}</p>
          </div>
        </section>

        <section
          id="work-categories"
          className="work-browse scroll-mt-28"
          aria-labelledby="work-browse-title"
        >
          <header className="work-head">
            <p className="work-badge">{WORK_PAGE.browse.eyebrow}</p>
            <h2 id="work-browse-title" className="work-headline">
              {WORK_PAGE.browse.headline.map((line) => (
                <span key={line} className="work-headline__line">
                  {line}
                </span>
              ))}
            </h2>
            <p className="work-lede">{WORK_PAGE.browse.intro}</p>
          </header>

          <WorkCategoryWall />
        </section>
      </div>

      <FinalCta />
    </div>
  );
}
