import { ChapterPageHero } from "@/components/page/chapter-page-hero";
import { COMPANY, getPortfolioCategoryMeta, type PortfolioCategory } from "@/lib/content";
import type { HeroBridgeCardContent } from "@/components/sections/hero-bridge-card";

type PortfolioCategoryHeroProps = {
  category: PortfolioCategory;
};

export function PortfolioCategoryHero({ category }: PortfolioCategoryHeroProps) {
  const meta = getPortfolioCategoryMeta(category.slug);

  const cardContent: HeroBridgeCardContent = {
    eyebrow: `Portfolio · ${category.number}`,
    brandTitle: meta.hero.brandTitle,
    taglineLead: meta.hero.taglineLead,
    taglineConnector: meta.hero.taglineConnector,
    taglineEmphasis: meta.hero.taglineEmphasis,
    primaryCta: meta.hero.primaryCta,
    topRightItems: [
      {
        label: "Contact us",
        value: COMPANY.phone,
        href: COMPANY.phoneHref,
      },
      {
        label: meta.hero.metaLabel,
        value: String(category.projects.length),
      },
    ],
  };

  return (
    <ChapterPageHero
      cardContent={cardContent}
      curtainTitle={meta.curtain.title}
      curtainIntro={meta.curtain.intro}
    />
  );
}
