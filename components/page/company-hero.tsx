import { ChapterPageHero } from "@/components/page/chapter-page-hero";
import { COMPANY, COMPANY_PAGE } from "@/lib/content";
import type { HeroBridgeCardContent } from "@/components/sections/hero-bridge-card";

type CompanyHeroProps = {
  teamCount: number;
};

export function CompanyHero({ teamCount }: CompanyHeroProps) {
  const cardContent: HeroBridgeCardContent = {
    eyebrow: COMPANY_PAGE.eyebrow,
    brandTitle: COMPANY_PAGE.hero.brandTitle,
    taglineLead: COMPANY_PAGE.hero.taglineLead,
    taglineConnector: COMPANY_PAGE.hero.taglineConnector,
    taglineEmphasis: COMPANY_PAGE.hero.taglineEmphasis,
    primaryCta: COMPANY_PAGE.hero.primaryCta,
    topRightItems: [
      {
        label: "Contact us",
        value: COMPANY.phone,
        href: COMPANY.phoneHref,
      },
      {
        label: COMPANY_PAGE.hero.metaLabel,
        value: String(teamCount),
      },
    ],
  };

  return (
    <ChapterPageHero
      cardContent={cardContent}
      curtainTitle={COMPANY_PAGE.curtain.title}
      curtainIntro={COMPANY_PAGE.curtain.intro}
    />
  );
}
