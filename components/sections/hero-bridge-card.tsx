import Image from "next/image";
import { HERO, splitPortfolioCategoryTitle } from "@/lib/content";
import { IconArrowDown } from "@/components/icons/hero-card-icons";

const HERO_LOGO = "/brand/vantage-logo.svg";

export type HeroBridgeCardTopRightItem = {
  label: string;
  value: string;
  href?: string;
};

export type HeroBridgeCardContent = {
  eyebrow?: string;
  brandTitle?: string;
  taglineLead: string;
  taglineConnector: string;
  taglineEmphasis: string;
  primaryCta: { label: string; href: string };
  topRightItems?: HeroBridgeCardTopRightItem[];
  /** Contact page layout: large title left, T/E bottom-right, no logo/CTA */
  variant?: "default" | "contact" | "company" | "partners" | "portfolioCategory";
  addressItem?: HeroBridgeCardTopRightItem;
  bottomRightItems?: HeroBridgeCardTopRightItem[];
  /** Company card — stacked headline lines (top-left) */
  companyLines?: readonly string[];
  companyVisionBody?: string;
  companyVisionLead?: string;
  companyVisionSignature?: string;
  /** Partners card — body-only copy */
  partnersBody?: string;
  /** Portfolio category card — title + body only */
  portfolioCategoryBody?: string;
  /** Portfolio category — forced 2-line body */
  portfolioCategoryBodyLines?: readonly string[];
};

type HeroBridgeCardProps = {
  cardRef?: React.RefObject<HTMLDivElement | null>;
  content?: HeroBridgeCardContent;
};

const HOME_CONTENT: HeroBridgeCardContent = {
  taglineLead: HERO.heading,
  taglineConnector: "",
  taglineEmphasis: "",
  primaryCta: HERO.primaryCta,
};

function ContactMetaItem({ item }: { item: HeroBridgeCardTopRightItem }) {
  return (
    <div className="hero-card-top__contact-item">
      <span className="hero-card-top__label">{item.label}</span>
      {item.href ? (
        <a href={item.href} className="link-swipe font-medium">
          {item.value}
        </a>
      ) : (
        <span className="font-medium">{item.value}</span>
      )}
    </div>
  );
}

export function HeroBridgeCard({ cardRef, content = HOME_CONTENT }: HeroBridgeCardProps) {
  const isContactVariant = content.variant === "contact";
  const isCompanyVariant = content.variant === "company";
  const isPartnersVariant = content.variant === "partners";
  const isPortfolioCategoryVariant = content.variant === "portfolioCategory";
  const isClientsVariant =
    !isContactVariant &&
    !isCompanyVariant &&
    !isPartnersVariant &&
    !isPortfolioCategoryVariant &&
    Boolean(content.eyebrow || content.brandTitle);
  const isHomeHero =
    !isClientsVariant &&
    !isContactVariant &&
    !isCompanyVariant &&
    !isPartnersVariant &&
    !isPortfolioCategoryVariant;

  if (isPartnersVariant) {
    return (
      <div ref={cardRef} className="bridge-card bridge-card--hero">
        <div className="hero-card-bottom">
          <p className="hero-card-partners__body">{content.partnersBody}</p>
        </div>
      </div>
    );
  }

  if (isPortfolioCategoryVariant) {
    const [titleLine1, titleLine2] = content.brandTitle
      ? splitPortfolioCategoryTitle(content.brandTitle)
      : ["", ""];
    const bodyLines = content.portfolioCategoryBodyLines;

    return (
      <div
        ref={cardRef}
        className="bridge-card bridge-card--hero bridge-card--hero-portfolio-cat"
      >
        <div className="hero-card-portfolio-cat">
          {content.brandTitle ? (
            <h1 className="hero-card-portfolio-cat__title">
              <span className="hero-card-portfolio-cat__title-line">
                {titleLine1}
              </span>
              {titleLine2 ? (
                <span className="hero-card-portfolio-cat__title-line">
                  {titleLine2}
                </span>
              ) : null}
            </h1>
          ) : null}
          {bodyLines?.length ? (
            <p className="hero-card-portfolio-cat__body">
              {bodyLines.map((line) => (
                <span key={line} className="hero-card-portfolio-cat__body-line">
                  {line}
                </span>
              ))}
            </p>
          ) : content.portfolioCategoryBody ? (
            <p className="hero-card-portfolio-cat__body">
              {content.portfolioCategoryBody}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  if (isCompanyVariant) {
    return (
      <div
        ref={cardRef}
        className="bridge-card bridge-card--hero bridge-card--hero-company"
      >
        <div className="hero-card-company-top">
          <h1 className="hero-card-company__lines">
            {content.companyLines?.map((line) => (
              <span key={line} className="hero-card-company__line">
                {line}
              </span>
            ))}
          </h1>
        </div>

        <div className="hero-card-company-mid">
          {content.companyVisionBody ? (
            <p className="hero-card-company__body">{content.companyVisionBody}</p>
          ) : null}
          <div className="hero-card-company__vision">
            {content.companyVisionLead ? (
              <span className="hero-card-company__vision-lead">
                {content.companyVisionLead}
              </span>
            ) : null}
            <span className="hero-card-company__vision-logo" aria-label="Think Beyond">
              <span className="hero-card-company__vision-script">
                {content.companyVisionSignature}
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (isContactVariant) {
    return (
      <div
        ref={cardRef}
        className="bridge-card bridge-card--hero bridge-card--hero-contact"
      >
        <div className="hero-card-top hero-card-top--contact">
          <span className="hero-card-top__spacer" aria-hidden />

          <IconArrowDown
            size={22}
            className="hero-card-top__arrow motion-safe:animate-bounce"
          />

          <span className="hero-card-top__spacer" aria-hidden />
        </div>

        <div className="hero-card-contact-main">
          {content.brandTitle ? (
            <h1 className="hero-card-contact__title">{content.brandTitle}</h1>
          ) : null}
          <p className="hero-card-contact__lede">{content.taglineLead}</p>
        </div>

        <div className="hero-card-bottom hero-card-bottom--contact">
          {content.addressItem ? (
            <div className="hero-card-contact-address">
              <ContactMetaItem item={content.addressItem} />
            </div>
          ) : (
            <span />
          )}
          <div className="hero-card-top__contact hero-card-top__contact--bottom">
            {content.bottomRightItems?.map((item) => (
              <ContactMetaItem key={item.label} item={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isHomeHero) {
    return (
      <div
        ref={cardRef}
        className="bridge-card bridge-card--hero bridge-card--hero-home"
      >
        <div className="hero-home">
          <span className="hero-home__arrow" aria-hidden>
            <IconArrowDown />
          </span>
          <div className="hero-home__text">
            <h1 className="hero-home__heading">
              {HERO.heading.split("\n").map((line) => (
                <span key={line} className="hero-home__heading-line">
                  {line}
                </span>
              ))}
            </h1>
            <p className="hero-home__body">{HERO.body}</p>
          </div>
          <div className="hero-home__ctas">
            <a href={HERO.primaryCta.href} className="hero-home__cta">
              {HERO.primaryCta.label}
            </a>
            <a href={HERO.secondaryCta.href} className="hero-home__cta">
              {HERO.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={cardRef} className="bridge-card bridge-card--hero">
      <div className="hero-card-top">
        {isClientsVariant ? (
          <p className="hero-eyebrow">{content.eyebrow}</p>
        ) : (
          <span />
        )}

        <IconArrowDown
          size={28}
          className="hero-card-top__arrow motion-safe:animate-bounce"
        />

        <div className="hero-card-top__contact">
          {content.topRightItems?.map((item) => (
            <ContactMetaItem key={item.label} item={item} />
          )) ?? null}
        </div>
      </div>

      <div className="hero-card-brand">
        <Image
          src={HERO_LOGO}
          alt="Vantage"
          width={180}
          height={50}
          priority
          className="hero-card-brand__logo"
        />
        {content.brandTitle ? (
          <h1 className="hero-card-brand__title">{content.brandTitle}</h1>
        ) : null}
      </div>

      <div className="hero-card-bottom">
        <div className="hero-tagline">
          <p className="hero-tagline__lead">{content.taglineLead}</p>
          {content.taglineConnector || content.taglineEmphasis ? (
            <p className="hero-tagline__sub">
              {content.taglineConnector ? (
                <span className="hero-tagline__connector">
                  {content.taglineConnector}
                </span>
              ) : null}
              {content.taglineEmphasis ? (
                <span className="hero-tagline__emphasis">
                  {content.taglineEmphasis}
                </span>
              ) : null}
            </p>
          ) : null}
        </div>

        <div className="hero-card-foot">
          <a href={content.primaryCta.href} className="hero-cta">
            {content.primaryCta.label}
          </a>
        </div>
      </div>
    </div>
  );
}
