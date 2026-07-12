import { ChapterPageHero } from "@/components/page/chapter-page-hero";
import { COMPANY, QUOTE_PAGE } from "@/lib/content";
import type { HeroBridgeCardContent } from "@/components/sections/hero-bridge-card";

export function QuoteHero() {
  const cardContent: HeroBridgeCardContent = {
    eyebrow: QUOTE_PAGE.eyebrow,
    brandTitle: QUOTE_PAGE.hero.brandTitle,
    taglineLead: QUOTE_PAGE.hero.taglineLead,
    taglineConnector: QUOTE_PAGE.hero.taglineConnector,
    taglineEmphasis: QUOTE_PAGE.hero.taglineEmphasis,
    primaryCta: QUOTE_PAGE.hero.primaryCta,
    topRightItems: [
      {
        label: "Contact us",
        value: COMPANY.phone,
        href: COMPANY.phoneHref,
      },
      {
        label: QUOTE_PAGE.hero.metaLabel,
        value: String(QUOTE_PAGE.steps.length),
      },
    ],
  };

  return (
    <ChapterPageHero
      cardContent={cardContent}
      curtainTitle={QUOTE_PAGE.curtain.title}
      curtainIntro={QUOTE_PAGE.curtain.intro}
    />
  );
}
