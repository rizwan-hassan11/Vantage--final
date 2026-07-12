import { ChapterPageHero } from "@/components/page/chapter-page-hero";
import { COMPANY, CONTACT_PAGE } from "@/lib/content";
import type { HeroBridgeCardContent } from "@/components/sections/hero-bridge-card";

type ContactHeroProps = {
  officeCount: number;
};

export function ContactHero({ officeCount }: ContactHeroProps) {
  const cardContent: HeroBridgeCardContent = {
    eyebrow: CONTACT_PAGE.eyebrow,
    brandTitle: CONTACT_PAGE.hero.brandTitle,
    taglineLead: CONTACT_PAGE.hero.taglineLead,
    taglineConnector: CONTACT_PAGE.hero.taglineConnector,
    taglineEmphasis: CONTACT_PAGE.hero.taglineEmphasis,
    primaryCta: CONTACT_PAGE.hero.primaryCta,
    topRightItems: [
      {
        label: "Contact us",
        value: COMPANY.phone,
        href: COMPANY.phoneHref,
      },
      {
        label: CONTACT_PAGE.hero.metaLabel,
        value: String(officeCount),
      },
    ],
  };

  return (
    <ChapterPageHero
      cardContent={cardContent}
      curtainTitle={CONTACT_PAGE.curtain.title}
      curtainIntro={CONTACT_PAGE.curtain.intro}
    />
  );
}
