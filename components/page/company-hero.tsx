import { ChapterPageHero } from "@/components/page/chapter-page-hero";
import { COMPANY_PAGE } from "@/lib/content";
import type { HeroBridgeCardContent } from "@/components/sections/hero-bridge-card";

export function CompanyHero() {
  const { hero } = COMPANY_PAGE;

  const cardContent: HeroBridgeCardContent = {
    variant: "company",
    taglineLead: "",
    taglineConnector: "",
    taglineEmphasis: "",
    primaryCta: hero.primaryCta,
    companyLines: hero.lines,
    companyVisionBody: hero.visionBody,
    companyVisionLead: hero.visionLead,
    companyVisionSignature: hero.visionSignature,
  };

  return (
    <ChapterPageHero
      cardContent={cardContent}
      hideCurtainContent
      backgroundImage={COMPANY_PAGE.heroImage}
      backgroundAlt="Vantage team and workplace"
    />
  );
}
