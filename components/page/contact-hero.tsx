import { ChapterPageHero } from "@/components/page/chapter-page-hero";
import { CONTACT_PAGE } from "@/lib/content";
import type { HeroBridgeCardContent } from "@/components/sections/hero-bridge-card";

export function ContactHero() {
  const { hero } = CONTACT_PAGE;

  const cardContent: HeroBridgeCardContent = {
    variant: "contact",
    brandTitle: hero.brandTitle,
    taglineLead: hero.taglineLead,
    taglineConnector: "",
    taglineEmphasis: "",
    primaryCta: hero.primaryCta,
    addressItem: {
      label: "A",
      value: hero.address,
    },
    bottomRightItems: [
      {
        label: "T",
        value: hero.phone,
        href: hero.phoneHref,
      },
      {
        label: "E",
        value: hero.email,
        href: hero.emailHref,
      },
    ],
  };

  return (
    <ChapterPageHero
      cardContent={cardContent}
      backgroundImage={CONTACT_PAGE.heroImage}
      backgroundAlt="Vantage reception and team"
      hideCurtainContent
    />
  );
}
