import type { Metadata } from "next";
import { TeamWall } from "@/components/page/team-wall";
import { CORE_TEAM_PAGE, TEAM } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Core Team — Vantage Printers",
  description:
    "Meet the Vantage team: leadership, sales, pre-press, creative and production, working together under one roof in Lahore.",
};

export default function CoreTeamPage() {
  const { intro } = CORE_TEAM_PAGE;

  return (
    <div className="home-scroll bg-white text-[color:var(--color-ink)]">
      <section
        id="core-team"
        className="relative z-[2] pb-24 lg:pb-32 bg-white scroll-mt-28"
      >
        <div className="container-x pt-28 sm:pt-32 lg:pt-36">
          <section
            className="company-team-intro"
            aria-labelledby="core-team-intro-title"
          >
            <div className="company-team-intro__grid">
              <h1
                id="core-team-intro-title"
                className="company-team-intro__title"
              >
                {intro.title}
              </h1>
              <div className="company-team-intro__copy">
                {intro.paragraphs.map((paragraph, index) => {
                  const isLast = index === intro.paragraphs.length - 1;
                  return (
                    <p key={paragraph.slice(0, 24)}>
                      {paragraph}
                      {isLast ? (
                        <>
                          {" "}
                          <a
                            href={intro.ctaHref}
                            className="company-team-intro__link"
                          >
                            {intro.ctaLabel}
                          </a>
                        </>
                      ) : null}
                    </p>
                  );
                })}
              </div>
            </div>
          </section>

          <div className="pt-12 sm:pt-16 lg:pt-20">
            <TeamWall members={TEAM} />
          </div>
        </div>
      </section>
    </div>
  );
}
