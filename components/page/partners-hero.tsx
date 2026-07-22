import { ChapterPageHero } from "@/components/page/chapter-page-hero";
import { PARTNERS_PAGE } from "@/lib/content";
import type { HeroBridgeCardContent } from "@/components/sections/hero-bridge-card";

export function PartnersHero() {
  const cardContent: HeroBridgeCardContent = {
    variant: "partners",
    taglineLead: "",
    taglineConnector: "",
    taglineEmphasis: "",
    primaryCta: { label: "", href: "#partner-directory" },
    partnersBody: PARTNERS_PAGE.intro,
  };

  return (
    <ChapterPageHero
      cardContent={cardContent}
      hideCurtainContent
    />
  );
}
