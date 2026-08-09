import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SlideIn } from "@/components/motion/slide-in";
import { getServiceDetail, SERVICES } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  if (!detail) return { title: "Capability — Vantage Printers" };
  return {
    title: `${detail.badge} — Vantage Printers`,
    description: detail.intro,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const detail = getServiceDetail(slug);
  if (!detail) notFound();

  return (
    <div className="svc-page">
      {/* Flagged as a media hero so the nav keeps its white lockup over the still */}
      <section className="svcd-hero" data-scroll-section="hero">
        <div className="container-x">
          <div className="svcd-hero__media">
            <Image
              src={detail.hero}
              alt={detail.badge}
              fill
              sizes="(min-width: 1440px) 1360px, 100vw"
              quality={95}
              priority
              className="svcd-hero__image"
            />
          </div>
        </div>
      </section>

      <section className="svcd-intro">
        <div className="container-x">
          <p className="svcd-badge">{detail.badge}</p>
          <h1 className="svcd-title">{detail.heading}</h1>
          <p className="svcd-intro__body">{detail.intro}</p>
        </div>
      </section>

      <div className="svc-rows svc-rows--detail">
        {detail.blocks.map((block, index) => {
          const reverse = index % 2 === 1;

          return (
            <SlideIn
              key={block.heading.join(" ")}
              from={reverse ? "left" : "right"}
              className={`svc-row${reverse ? " svc-row--reverse" : ""}`}
            >
              <div className="svc-row__media">
                <Image
                  src={block.image}
                  alt={block.heading.join(" ")}
                  fill
                  sizes="(min-width: 900px) 58vw, 100vw"
                  quality={90}
                  className="svc-row__image"
                />
              </div>

              <div className="svc-row__copy">
                <h2 className="svcd-row__title">
                  {block.heading.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h2>
                {block.accent ? (
                  <p className="svcd-row__accent">{block.accent}</p>
                ) : null}
                <p className="svcd-row__body">{block.body}</p>
              </div>
            </SlideIn>
          );
        })}
      </div>
    </div>
  );
}
