import type { Metadata } from "next";
import { WorkCategoryWall } from "@/components/page/work-category-wall";
import { WorkHeroCover } from "@/components/page/work-hero-cover";
import { WorkReveal } from "@/components/motion/work-reveal";
import { WORK_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work — Vantage Printers",
  description:
    "Packaging, labels and print produced by Vantage: cosmetics, perfume, pharmaceutical, home textile, gift boxes, labels, annual reports, books and catalogues.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="work-page">
      <section
        className="work-intro"
        aria-labelledby="work-intro-title"
        data-scroll-section="hero"
        data-nav-theme="over-media"
      >
        <WorkHeroCover />
        <WorkReveal
          className="container-x work-intro__copy"
          onMount
          distance="-100vw"
        >
          <div className="work-intro__heading">
            <h1 id="work-intro-title" className="work-headline">
              {WORK_PAGE.headline.map((line) => {
                const words = line.split(" ");

                return (
                  <span key={line} className="work-headline__line">
                    {words.slice(0, -1).join(" ")}{" "}
                    <br className="work-headline__mobile-break" />
                    {words[words.length - 1]}
                  </span>
                );
              })}
            </h1>
          </div>
          <p className="work-lede">{WORK_PAGE.intro}</p>
        </WorkReveal>
      </section>

      <div className="container-x work-page__inner">
        <section
          id="work-categories"
          className="work-browse scroll-mt-28"
          aria-labelledby="work-browse-title"
        >
          <WorkReveal className="work-head" distance="-55vw">
            <p className="work-badge">{WORK_PAGE.browse.eyebrow}</p>
            <h2 id="work-browse-title" className="work-headline">
              {WORK_PAGE.browse.headline.map((line) => (
                <span key={line} className="work-headline__line">
                  {line}
                </span>
              ))}
            </h2>
            <p className="work-lede">{WORK_PAGE.browse.intro}</p>
          </WorkReveal>

          <WorkCategoryWall />
        </section>
      </div>
    </div>
  );
}
