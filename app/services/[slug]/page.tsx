import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { PageCta } from "@/components/page/page-cta";
import { ServiceHero } from "@/components/page/service-hero";
import {
  getServiceBySlug,
  PORTFOLIO,
  SERVICES,
} from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service — Vantage Printers" };
  return {
    title: `${service.title} — Vantage Printers`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const gallery =
    service.gallery && service.gallery.length > 0
      ? service.gallery
      : [service.image];
  const [lead, second, third, ...more] = gallery;
  const rowImages = more.slice(0, 3);

  const related = (service.relatedPortfolio ?? [])
    .map((relatedSlug) => PORTFOLIO.find((cat) => cat.slug === relatedSlug))
    .filter((cat): cat is (typeof PORTFOLIO)[number] => Boolean(cat));

  return (
    <div className="home-scroll bg-white text-[color:var(--color-ink)]">
      <ServiceHero service={service} />

      <section
        id="service-details"
        className="relative z-[2] pb-24 lg:pb-32 bg-white scroll-mt-28"
      >
        <div className="container-x pt-14 sm:pt-16 lg:pt-20">
          <Link
            href="/services"
            className="link-swipe text-sm text-[color:var(--color-mute)] mb-8 sm:mb-10 inline-flex items-center gap-2"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Back to Services
          </Link>

          <header className="service-detail__intro">
            <div className="service-detail__intro-copy">
              <p className="eyebrow mb-3">Services · {service.number}</p>
              <h2 className="service-detail__title">{service.title}</h2>
            </div>
            <div className="service-detail__intro-body">
              <p className="prose-body">{service.description}</p>
              <p className="service-detail__short">{service.short}</p>
            </div>
          </header>

          {/* Unified editorial gallery */}
          <div className="service-gallery-stage">
            <div className="service-gallery-stage__head">
              <p className="eyebrow">Press floor</p>
              <p className="service-gallery-stage__count">
                {String(gallery.length).padStart(2, "0")} images
              </p>
            </div>

            <div className="service-bento">
              <figure className="service-bento__lead">
                <Image
                  src={lead}
                  alt={`${service.title} — primary view`}
                  fill
                  sizes="(max-width: 1023px) 100vw, 66vw"
                  quality={95}
                  priority
                  className="service-bento__img"
                />
                <figcaption className="service-bento__cap">01</figcaption>
              </figure>

              {(second || third) && (
                <div className="service-bento__stack">
                  {second ? (
                    <figure className="service-bento__tile">
                      <Image
                        src={second}
                        alt={`${service.title} — detail 02`}
                        fill
                        sizes="(max-width: 1023px) 100vw, 34vw"
                        quality={95}
                        className="service-bento__img"
                      />
                      <figcaption className="service-bento__cap">02</figcaption>
                    </figure>
                  ) : null}
                  {third ? (
                    <figure className="service-bento__tile">
                      <Image
                        src={third}
                        alt={`${service.title} — detail 03`}
                        fill
                        sizes="(max-width: 1023px) 100vw, 34vw"
                        quality={95}
                        className="service-bento__img"
                      />
                      <figcaption className="service-bento__cap">03</figcaption>
                    </figure>
                  ) : null}
                </div>
              )}
            </div>

            {rowImages.length > 0 ? (
              <div
                className={`service-bento-row service-bento-row--${rowImages.length}`}
              >
                {rowImages.map((src, index) => (
                  <figure
                    key={`${service.slug}-row-${index}`}
                    className="service-bento__tile"
                  >
                    <Image
                      src={src}
                      alt={`${service.title} — detail ${index + 4}`}
                      fill
                      sizes="(max-width: 767px) 100vw, 33vw"
                      quality={95}
                      className="service-bento__img"
                    />
                    <figcaption className="service-bento__cap">
                      {String(index + 4).padStart(2, "0")}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : null}
          </div>

          <div className="service-detail__split">
            <div className="service-detail__main">
              <h3 className="title-h1 mb-4">
                {service.capabilitiesHeading ?? "Capabilities"}
              </h3>
              <ul className="service-detail__list">
                {service.bullets.map((bullet) => (
                  <li key={bullet}>
                    <span aria-hidden>&mdash;</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {service.equipment && service.equipment.length > 0 ? (
                <div className="service-detail__equipment">
                  <h3 className="title-h1 mb-4">Equipment</h3>
                  <ul className="service-detail__list">
                    {service.equipment.map((item) => (
                      <li key={item}>
                        <span aria-hidden>&mdash;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <aside className="service-detail__aside">
              <div>
                <p className="eyebrow mb-3">All Services</p>
                <ul className="space-y-2">
                  {SERVICES.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className={`link-swipe text-base ${
                          s.slug === service.slug
                            ? "text-[color:var(--color-rust)]"
                            : "text-[color:var(--color-ink-2)]"
                        }`}
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          {related.length > 0 ? (
            <div className="service-related">
              <div className="service-related__head">
                <p className="eyebrow mb-2">Related Work</p>
                <h3 className="service-related__title">
                  See this capability in the portfolio
                </h3>
              </div>
              <div className="service-related__grid">
                {related.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/portfolio/${cat.slug}`}
                    className="service-related__card group"
                  >
                    <div className="service-related__media">
                      <Image
                        src={cat.cover}
                        alt={cat.title}
                        fill
                        sizes="(max-width: 767px) 100vw, 33vw"
                        quality={95}
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                      <span className="service-related__veil" aria-hidden />
                    </div>
                    <div className="service-related__meta">
                      <span className="service-related__name">{cat.title}</span>
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.5}
                        className="service-related__arrow"
                        aria-hidden
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <PageCta
        eyebrow={service.cta.eyebrow}
        title={service.cta.title}
        ctaLabel={service.cta.label}
        ctaHref={service.cta.href}
      />
    </div>
  );
}
