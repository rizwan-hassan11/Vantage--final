import { ChapterPageHero } from "@/components/page/chapter-page-hero";
import { CLIENTS_PAGE, COMPANY } from "@/lib/content";
import type { HeroBridgeCardContent } from "@/components/sections/hero-bridge-card";

type ClientsHeroProps = {
  clientCount: number;
};

export function ClientsHero({ clientCount }: ClientsHeroProps) {
  const cardContent: HeroBridgeCardContent = {
    eyebrow: CLIENTS_PAGE.eyebrow,
    brandTitle: CLIENTS_PAGE.hero.brandTitle,
    taglineLead: CLIENTS_PAGE.hero.taglineLead,
    taglineConnector: CLIENTS_PAGE.hero.taglineConnector,
    taglineEmphasis: CLIENTS_PAGE.hero.taglineEmphasis,
    primaryCta: CLIENTS_PAGE.hero.primaryCta,
    topRightItems: [
      {
        label: "Contact us",
        value: COMPANY.phone,
        href: COMPANY.phoneHref,
      },
      {
        label: CLIENTS_PAGE.hero.metaLabel,
        value: String(clientCount),
      },
    ],
  };

  return (
    <ChapterPageHero
      cardContent={cardContent}
      hideCurtainContent
    />
  );
}
