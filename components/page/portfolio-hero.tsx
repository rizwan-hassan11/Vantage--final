import { ChapterPageHero } from "@/components/page/chapter-page-hero";
import { COMPANY, PORTFOLIO_PAGE } from "@/lib/content";
import type { HeroBridgeCardContent } from "@/components/sections/hero-bridge-card";

type PortfolioHeroProps = {
  categoryCount: number;
};

export function PortfolioHero({ categoryCount }: PortfolioHeroProps) {
  const cardContent: HeroBridgeCardContent = {
    eyebrow: PORTFOLIO_PAGE.eyebrow,
    brandTitle: PORTFOLIO_PAGE.hero.brandTitle,
    taglineLead: PORTFOLIO_PAGE.hero.taglineLead,
    taglineConnector: PORTFOLIO_PAGE.hero.taglineConnector,
    taglineEmphasis: PORTFOLIO_PAGE.hero.taglineEmphasis,
    primaryCta: PORTFOLIO_PAGE.hero.primaryCta,
    topRightItems: [
      {
        label: "Contact us",
        value: COMPANY.phone,
        href: COMPANY.phoneHref,
      },
      {
        label: PORTFOLIO_PAGE.hero.metaLabel,
        value: String(categoryCount),
      },
    ],
  };

  return (
    <ChapterPageHero
      cardContent={cardContent}
      curtainTitle={PORTFOLIO_PAGE.curtain.title}
      curtainIntro={PORTFOLIO_PAGE.curtain.intro}
    />
  );
}
