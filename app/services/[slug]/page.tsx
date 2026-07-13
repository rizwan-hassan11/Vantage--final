import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageCta } from "@/components/page/page-cta";
import { ServiceHero } from "@/components/page/service-hero";
import { SERVICES } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Service — Vantage Printers" };
  return {
    title: `${service.title} — Vantage Printers`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <div className="home-scroll bg-white text-[color:var(--color-ink)]">
      <ServiceHero service={service} />

      <section
        id="service-details"
        className="relative z-[2] pb-24 lg:pb-32 bg-white scroll-mt-28"
      >
        <div className="container-x pt-16 lg:pt-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-14 lg:mb-16">
            {service.bullets.map((bullet) => (
              <div key={bullet} className="text-center sm:text-left">
                <p className="font-serif italic text-[clamp(1.15rem,2.2vw,1.45rem)] text-[color:var(--color-rust)] leading-snug">
                  {bullet}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mb-10 lg:mb-12">
            <p className="eyebrow mb-4">
              Services · {service.number}
            </p>
            <p className="prose-body">
              {service.description}
            </p>
          </div>

          <div className="relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/8] overflow-hidden bg-[color:var(--color-off)] mb-14 lg:mb-16">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="100vw"
              quality={95}
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="font-serif italic text-[color:var(--color-rust)] text-[clamp(2rem,4vw,3rem)] leading-tight mb-6">
                {service.title}
              </h2>
              <p className="prose-body mb-8">
                {service.short}
              </p>
              <h3 className="title-h1 mb-4">Capabilities</h3>
              <ul className="space-y-3 text-[color:var(--color-ink-2)]">
                {service.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-3 border-t border-[color:var(--color-hairline)] pt-3"
                  >
                    <span className="text-[color:var(--color-rust)] mt-1">
                      &mdash;
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:col-span-4 lg:col-start-9 space-y-8">
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
        </div>
      </section>

      <PageCta
        eyebrow="Portfolio"
        title="For examples of our recent work, head over to our Portfolio, or contact one of our experts to start your next project."
        ctaLabel="Get a Quote"
        ctaHref="/quote"
      />
    </div>
  );
}
