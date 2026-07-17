import type { Metadata } from "next";
import { PageCta } from "@/components/page/page-cta";
import { ServiceCard } from "@/components/page/service-card";
import { ServicesHero } from "@/components/page/services-hero";
import { SERVICES, SERVICES_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — Vantage Printers",
  description:
    "Offset, flexo, digital, screen and design services — engineered under one roof in Lahore.",
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
          <div className="max-w-2xl mb-10 lg:mb-14 section-intro">
            <p className="eyebrow mb-4">{SERVICES_PAGE.eyebrow}</p>
            <p className="prose-body">{SERVICES_PAGE.intro}</p>
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
        eyebrow="Portfolio"
        title="For examples of our recent work, head over to our Portfolio, or contact one of our experts to start your next project."
        ctaLabel="Contact Us"
        ctaHref="/contact"
      />
    </div>
  );
}
