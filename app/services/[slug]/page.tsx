import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageCta } from "@/components/page/page-cta";
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
    <div className="bg-white text-[color:var(--color-ink)]">
      <section className="pt-32 lg:pt-40 pb-10">
        <div className="container-x">
          <p className="eyebrow mb-4">Services</p>
          <h1 className="title-hero text-center mb-0">{service.title}</h1>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="container-x">
          <div className="relative aspect-[16/8] overflow-hidden bg-[color:var(--color-off)]">
            <Image
              src={service.image}
              alt={service.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-x-4 bottom-4 sm:inset-x-8 sm:bottom-8 lg:inset-x-16 lg:bottom-16 max-w-2xl">
              <div className="rust-block on-rust">
                <p className="tag-caps text-white/70 mb-3">{service.number}</p>
                <p className="text-white text-lg lg:text-xl leading-relaxed">
                  {service.short}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="text-lg lg:text-xl leading-relaxed text-[color:var(--color-ink-2)] mb-8">
                {service.description}
              </p>
              <h2 className="title-h1 mb-4">Capabilities</h2>
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
        ctaHref="/contact"
      />
    </div>
  );
}
