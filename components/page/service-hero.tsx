import { ChapterPageHero } from "@/components/page/chapter-page-hero";
import { COMPANY, type Service } from "@/lib/content";
import type { HeroBridgeCardContent } from "@/components/sections/hero-bridge-card";

type ServiceHeroProps = {
  service: Service;
};

export function ServiceHero({ service }: ServiceHeroProps) {
  const cardContent: HeroBridgeCardContent = {
    eyebrow: `Services · ${service.number}`,
    brandTitle: service.hero.brandTitle,
    taglineLead: service.hero.taglineLead,
    taglineConnector: service.hero.taglineConnector,
    taglineEmphasis: service.hero.taglineEmphasis,
    primaryCta: service.hero.primaryCta,
    topRightItems: [
      {
        label: "Contact us",
        value: COMPANY.phone,
        href: COMPANY.phoneHref,
      },
      {
        label: service.hero.metaLabel,
        value: String(service.bullets.length),
      },
    ],
  };

  return (
    <ChapterPageHero
      cardContent={cardContent}
      curtainTitle={service.curtain.title}
      curtainIntro={service.curtain.intro}
    />
  );
}
