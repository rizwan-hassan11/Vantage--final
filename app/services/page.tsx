import type { Metadata } from "next";
import { PageCta } from "@/components/page/page-cta";
import { ServiceCard } from "@/components/page/service-card";
import { ServicesHero } from "@/components/page/services-hero";
import { SERVICES, SERVICES_INTRO, SERVICES_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — Vantage Printers",
  description: SERVICES_INTRO,
};

export default function ServicesPage() {
  return (
    <div className="home-scroll bg-white text-[color:var(--color-ink)]">
      <ServicesHero serviceCount={SERVICES.length} />

      <section
        id="services-list"
        className="relative z-[2] pb-24 lg:pb-32 bg-white scroll-mt-28"
      >
        <div className="container-x pt-16 lg:pt-20">
          <header className="services-index__header mb-10 lg:mb-14">
            <div className="services-index__copy">
              <div>
                <p className="eyebrow mb-3">{SERVICES_PAGE.eyebrow}</p>
                <h2 className="services-index__title">{SERVICES_PAGE.title}</h2>
              </div>
              <p className="prose-body">{SERVICES_PAGE.intro}</p>
            </div>
          </header>

          <div className="services-index__stats mb-12 lg:mb-16">
            {SERVICES_PAGE.stats.map((stat) => (
              <div key={stat.label} className="services-index__stat">
                <p className="services-index__stat-value">
                  {stat.value}
                  {stat.suffix ? (
                    <span className="services-index__stat-suffix">
                      {stat.suffix}
                    </span>
                  ) : null}
                </p>
                <p className="services-index__stat-label">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                priority={index < 3}
              />
            ))}
          </div>
        </div>
      </section>

      <PageCta
        eyebrow={SERVICES_PAGE.cta.eyebrow}
        title={SERVICES_PAGE.cta.title}
        ctaLabel={SERVICES_PAGE.cta.label}
        ctaHref={SERVICES_PAGE.cta.href}
      />
    </div>
  );
}
