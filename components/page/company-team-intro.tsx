import { COMPANY_PAGE } from "@/lib/content";

export function CompanyTeamIntro() {
  const { teamIntro } = COMPANY_PAGE;

  return (
    <section
      className="company-team-intro"
      aria-labelledby="company-team-intro-title"
    >
      <div className="company-team-intro__grid">
        <h2 id="company-team-intro-title" className="company-team-intro__title">
          {teamIntro.title}
        </h2>
        <div className="company-team-intro__copy">
          {teamIntro.paragraphs.map((paragraph, index) => {
            const isLast = index === teamIntro.paragraphs.length - 1;
            return (
              <p key={paragraph.slice(0, 24)}>
                {paragraph}
                {isLast ? (
                  <>
                    {" "}
                    <a href={teamIntro.ctaHref} className="company-team-intro__link">
                      {teamIntro.ctaLabel}
                    </a>
                  </>
                ) : null}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
