import type { Metadata } from "next";
import { CapabilityRow } from "@/components/page/capability-row";
import { SERVICES_INTRO, SERVICES_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Capabilities — Vantage Printers",
  description: SERVICES_INTRO,
};

export default function ServicesPage() {
  const { hero, capabilities, rows, rowCtaLabel } = SERVICES_PAGE;

  return (
    <div className="svc-page">
      <section className="svc-hero">
        <div className="svc-hero__copy">
          <div className="svc-hero__copy-main">
            <h1 className="svc-hero__title">
              {hero.heading.map((line) => (
                <span key={line} className="svc-hero__title-line">
                  {line}
                </span>
              ))}
            </h1>
            <p className="svc-hero__body">{hero.body}</p>
          </div>

          <div className="svc-hero__foot">
            <a href={hero.cta.href} className="svc-hero__cta">
              {hero.cta.label}
            </a>
            <span className="svc-hero__scroll" aria-hidden>
              ↓
            </span>
          </div>
        </div>

        <div className="svc-hero__media">
          <video
            className="svc-hero__video"
            poster={hero.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={hero.video} type="video/mp4" />
          </video>
        </div>
      </section>

      <section
        id="capabilities"
        className="svc-intro scroll-mt-28"
        aria-labelledby="svc-intro-title"
      >
        <div className="container-x">
          <p className="svc-badge">{capabilities.eyebrow}</p>
          <h2 id="svc-intro-title" className="svc-intro__title">
            {capabilities.heading.map((line) => (
              <span key={line} className="svc-intro__title-line">
                {line}
              </span>
            ))}
          </h2>
          <p className="svc-intro__body">{capabilities.intro}</p>
        </div>
      </section>

      <div className="svc-rows">
        {rows.map((row, index) => (
          <CapabilityRow
            key={row.slug}
            slug={row.slug}
            label={row.label}
            tagline={row.tagline}
            image={row.image}
            ctaLabel={rowCtaLabel}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
