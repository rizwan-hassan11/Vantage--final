import { ChapterPageHero } from "@/components/page/chapter-page-hero";
import { COMPANY, CORE_TEAM_PAGE, TEAM } from "@/lib/content";
import type { HeroBridgeCardContent } from "@/components/sections/hero-bridge-card";

export function CoreTeamHero() {
  const cardContent: HeroBridgeCardContent = {
    eyebrow: CORE_TEAM_PAGE.eyebrow,
    brandTitle: CORE_TEAM_PAGE.hero.brandTitle,
    taglineLead: CORE_TEAM_PAGE.hero.taglineLead,
    taglineConnector: CORE_TEAM_PAGE.hero.taglineConnector,
    taglineEmphasis: CORE_TEAM_PAGE.hero.taglineEmphasis,
    primaryCta: CORE_TEAM_PAGE.hero.primaryCta,
    topRightItems: [
      {
        label: "Contact us",
        value: COMPANY.phone,
        href: COMPANY.phoneHref,
      },
      {
        label: CORE_TEAM_PAGE.hero.metaLabel,
        value: String(TEAM.length),
      },
    ],
  };

  return <ChapterPageHero cardContent={cardContent} hideCurtainContent />;
}
