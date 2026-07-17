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

export function HeroBridgeCard({ cardRef, content = HOME_CONTENT }: HeroBridgeCardProps) {
  const isClientsVariant = Boolean(content.eyebrow || content.brandTitle);
  const isHomeHero = !isClientsVariant;

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
            <div key={item.label} className="hero-card-top__contact-item">
              <span className="hero-card-top__label">{item.label}</span>
              {item.href ? (
                <a href={item.href} className="link-swipe font-medium">
                  {item.value}
                </a>
              ) : (
                <span className="font-medium">{item.value}</span>
              )}
            </div>
          )) ?? (
            <>
              <div className="hero-card-top__contact-item">
                <span className="hero-card-top__label">Contact us</span>
                <a href={COMPANY.phoneHref} className="link-swipe font-medium">
                  {COMPANY.phone}
                </a>
              </div>
              <div className="hero-card-top__contact-item">
                <span className="hero-card-top__label">Email us</span>
                <a href={COMPANY.emailHref} className="link-swipe font-medium">
                  {COMPANY.email}
                </a>
              </div>
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
          <p className="hero-tagline__sub">
            <span className="hero-tagline__connector">
              {content.taglineConnector}
            </span>
            <span className="hero-tagline__emphasis">
              {content.taglineEmphasis}
            </span>
          </p>
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
