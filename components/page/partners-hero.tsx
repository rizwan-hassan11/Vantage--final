import { ChapterPageHero } from "@/components/page/chapter-page-hero";
import { PARTNERS_PAGE, COMPANY } from "@/lib/content";
import type { HeroBridgeCardContent } from "@/components/sections/hero-bridge-card";

type PartnersHeroProps = {
  partnerCount: number;
};

export function PartnersHero({ partnerCount }: PartnersHeroProps) {
  const cardContent: HeroBridgeCardContent = {
    eyebrow: PARTNERS_PAGE.eyebrow,
    brandTitle: PARTNERS_PAGE.hero.brandTitle,
    taglineLead: PARTNERS_PAGE.hero.taglineLead,
    taglineConnector: PARTNERS_PAGE.hero.taglineConnector,
    taglineEmphasis: PARTNERS_PAGE.hero.taglineEmphasis,
    primaryCta: PARTNERS_PAGE.hero.primaryCta,
    topRightItems: [
      {
        label: "Contact us",
        value: COMPANY.phone,
        href: COMPANY.phoneHref,
      },
      {
        label: PARTNERS_PAGE.hero.metaLabel,
        value: String(partnerCount),
      },
    ],
  };

  return (
    <ChapterPageHero
      cardContent={cardContent}
      curtainTitle={PARTNERS_PAGE.curtain.title}
      curtainIntro={PARTNERS_PAGE.curtain.intro}
    />
  );
}
