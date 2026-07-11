import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page/page-hero";
import { PageCta } from "@/components/page/page-cta";
import { SERVICES, SERVICES_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — Vantage Printers",
  description:
    "Offset, flexo, digital, screen and design services — engineered under one roof in Lahore.",
};

export default function ServicesPage() {
  return (
    <div className="bg-white text-[color:var(--color-ink)]">
      <PageHero
        eyebrow={SERVICES_PAGE.eyebrow}
        title={SERVICES_PAGE.title}
        intro={SERVICES_PAGE.intro}
      />

      <section className="pb-24 lg:pb-32">
        <div className="container-x">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--color-off)] mb-5">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <p className="numeral text-xs tracking-widest text-[color:var(--color-mute-2)] mb-2">
                  {service.number}
                </p>
                <h3 className="font-serif italic text-2xl lg:text-3xl text-[color:var(--color-rust)] leading-tight mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[color:var(--color-mute)] leading-relaxed">
                  {service.short}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Portfolio"
        title="For examples of our recent work, head over to our Portfolio, or contact one of our experts to start your next project."
        ctaLabel="Get a Quote"
        ctaHref="/contact"
      />
    </div>
  );
}
