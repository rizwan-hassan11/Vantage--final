import { ChapterPageHero } from "@/components/page/chapter-page-hero";
import { COMPANY, SERVICES_PAGE } from "@/lib/content";
import type { HeroBridgeCardContent } from "@/components/sections/hero-bridge-card";

type ServicesHeroProps = {
  serviceCount: number;
};

export function ServicesHero({ serviceCount }: ServicesHeroProps) {
  const cardContent: HeroBridgeCardContent = {
    eyebrow: SERVICES_PAGE.eyebrow,
    brandTitle: SERVICES_PAGE.hero.brandTitle,
    taglineLead: SERVICES_PAGE.hero.taglineLead,
    taglineConnector: SERVICES_PAGE.hero.taglineConnector,
    taglineEmphasis: SERVICES_PAGE.hero.taglineEmphasis,
    primaryCta: SERVICES_PAGE.hero.primaryCta,
    topRightItems: [
      {
        label: "Contact us",
        value: COMPANY.phone,
        href: COMPANY.phoneHref,
      },
      {
        label: SERVICES_PAGE.hero.metaLabel,
        value: String(serviceCount),
      },
    ],
  };

  return (
    <ChapterPageHero
      cardContent={cardContent}
      curtainTitle={SERVICES_PAGE.curtain.title}
      curtainIntro={SERVICES_PAGE.curtain.intro}
    />
  );
}
