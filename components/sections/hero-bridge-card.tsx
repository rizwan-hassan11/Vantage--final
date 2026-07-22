import Image from "next/image";
import { Instagram, Facebook, Linkedin, ArrowDown } from "lucide-react";
import { COMPANY, HERO } from "@/lib/content";

const HERO_LOGO = "/brand/vantage-logo.svg";
/** Client-provided VANTAGE + Think Beyond lockup (exact) */
const HERO_LOCKUP = "/brand/vantage-lockup.png";

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
  variant?: "default" | "contact" | "company" | "partners";
  addressItem?: HeroBridgeCardTopRightItem;
  bottomRightItems?: HeroBridgeCardTopRightItem[];
  /** Company card — stacked headline lines (top-left) */
  companyLines?: readonly string[];
  companyVisionBody?: string;
  companyVisionLead?: string;
  companyVisionSignature?: string;
  /** Partners card — body-only copy */
  partnersBody?: string;
};

type HeroBridgeCardProps = {
  cardRef?: React.RefObject<HTMLDivElement | null>;
  content?: HeroBridgeCardContent;
};

const HOME_CONTENT: HeroBridgeCardContent = {
  taglineLead: HERO.taglineLead,
  taglineConnector: HERO.taglineConnector,
  taglineEmphasis: HERO.taglineEmphasis,
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
  const isClientsVariant =
    !isContactVariant &&
    !isCompanyVariant &&
    !isPartnersVariant &&
    Boolean(content.eyebrow || content.brandTitle);
  const isHomeHero =
    !isClientsVariant &&
    !isContactVariant &&
    !isCompanyVariant &&
    !isPartnersVariant;

  if (isPartnersVariant) {
    return (
      <div ref={cardRef} className="bridge-card bridge-card--hero">
        <div className="hero-card-bottom">
          <p className="hero-card-partners__body">{content.partnersBody}</p>
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

          <ArrowDown
            size={16}
            strokeWidth={1.5}
            className="hero-card-top__arrow motion-safe:animate-bounce"
            aria-hidden
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

  return (
    <div
      ref={cardRef}
      className={`bridge-card bridge-card--hero${isHomeHero ? " bridge-card--hero-home" : ""}`}
    >
      <div className="hero-card-top">
        {isClientsVariant ? (
          <p className="hero-eyebrow">{content.eyebrow}</p>
        ) : (
          <div className="hero-card-top__socials">
            <a
              href="https://instagram.com/vantageprinters"
              aria-label="Vantage on Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={15} strokeWidth={1.6} />
            </a>
            <a
              href="https://facebook.com/vantageprinters"
              aria-label="Vantage on Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook size={15} strokeWidth={1.6} />
            </a>
            <a
              href="https://linkedin.com/company/vantage-printers"
              aria-label="Vantage on LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={15} strokeWidth={1.6} />
            </a>
          </div>
        )}

        <ArrowDown
          size={16}
          strokeWidth={1.5}
          className="hero-card-top__arrow motion-safe:animate-bounce"
          aria-hidden
        />

        <div className="hero-card-top__contact">
          {content.topRightItems?.map((item) => (
            <ContactMetaItem key={item.label} item={item} />
          )) ?? (
            <>
              <ContactMetaItem
                item={{
                  label: "Contact us",
                  value: COMPANY.phone,
                  href: COMPANY.phoneHref,
                }}
              />
              <ContactMetaItem
                item={{
                  label: "Email us",
                  value: COMPANY.email,
                  href: COMPANY.emailHref,
                }}
              />
            </>
          )}
        </div>
      </div>

      <div className="hero-card-brand">
        {isHomeHero ? (
          <>
            <Image
              src={HERO_LOCKUP}
              alt="Vantage — Think Beyond"
              width={300}
              height={145}
              priority
              className="hero-card-brand__lockup"
            />
            <p className="sr-only">{HERO.signature}</p>
          </>
        ) : (
          <>
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
          </>
        )}
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
