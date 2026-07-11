import type { Metadata } from "next";
import Image from "next/image";
import { PageCta } from "@/components/page/page-cta";
import {
  SUSTAINABILITY,
  SUSTAINABILITY_PAGE,
  CERTIFICATIONS,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Sustainability — Vantage Printers",
  description:
    "Vantage runs on responsible sourcing, low-VOC inks, FSC papers and energy-optimised production.",
};

export default function SustainabilityPage() {
  return (
    <div className="bg-white text-[color:var(--color-ink)]">
      <section className="relative pt-32 lg:pt-40 pb-16 lg:pb-24">
        <div className="container-x">
          <p className="eyebrow mb-6">{SUSTAINABILITY_PAGE.eyebrow}</p>
          <h1 className="title-hero text-center max-w-4xl mx-auto">
            {SUSTAINABILITY_PAGE.title}
          </h1>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="container-x">
          <div className="relative aspect-[16/8] overflow-hidden bg-[color:var(--color-off)]">
            <Image
              src="/facility/building.webp"
              alt="Vantage facility exterior"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-x-4 bottom-4 sm:inset-x-8 sm:bottom-8 lg:inset-x-16 lg:bottom-16 max-w-2xl">
              <div className="rust-block on-rust">
                <p className="text-white text-lg lg:text-xl leading-relaxed">
                  {SUSTAINABILITY_PAGE.intro}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-14">
            {SUSTAINABILITY.pillars.map((pillar) => (
              <div key={pillar.title}>
                <h3 className="font-serif italic text-2xl lg:text-3xl text-[color:var(--color-rust)] mb-3">
                  {pillar.title}
                </h3>
                <p className="text-[color:var(--color-ink-2)] leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32 border-t border-[color:var(--color-hairline)] pt-20 lg:pt-28">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-14">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-4">Papers</p>
              <h2 className="title-display">
                {SUSTAINABILITY_PAGE.substrates.title}
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex items-end">
              <p className="text-lg leading-relaxed text-[color:var(--color-mute)]">
                {SUSTAINABILITY_PAGE.substrates.body}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-14">
            {SUSTAINABILITY_PAGE.substrates.highlights.map((item) => (
              <div key={item.title} className="border-t border-[color:var(--color-hairline)] pt-6">
                <h3 className="font-serif italic text-xl lg:text-2xl text-[color:var(--color-rust)] mb-3">
                  {item.title}
                </h3>
                <p className="text-[color:var(--color-ink-2)] leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32 border-t border-[color:var(--color-hairline)] pt-20 lg:pt-28">
        <div className="container-x">
          <p className="eyebrow mb-4">Certifications</p>
          <h2 className="title-display mb-14 max-w-2xl">
            Recognised for standards that matter.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="border-t border-[color:var(--color-hairline)] pt-6"
              >
                <p className="tag-caps text-[color:var(--color-rust)] mb-3">
                  {cert.tag}
                </p>
                <h3 className="font-serif italic text-2xl text-[color:var(--color-ink)] mb-3">
                  {cert.name}
                </h3>
                <p className="text-sm text-[color:var(--color-mute)] leading-relaxed">
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Talk to Vantage"
        title="Plan a lower-impact print run with our team."
        ctaLabel="Contact Us"
        ctaHref="/contact"
      />
    </div>
  );
}
