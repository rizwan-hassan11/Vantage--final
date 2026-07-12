import type { Metadata } from "next";
import Image from "next/image";
import { PageCta } from "@/components/page/page-cta";
import { PartnersHero } from "@/components/page/partners-hero";
import { PARTNERS, PARTNERS_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Partners — Vantage Printers",
  description:
    "Heidelberg, BOBST, Xerox, Konica Minolta, GMG and more — world-class technology partners behind the Vantage press floor.",
};

export default function PartnersPage() {
  return (
    <div className="home-scroll bg-white text-[color:var(--color-ink)]">
      <PartnersHero partnerCount={PARTNERS.length} />

      <section
        id="partner-directory"
        className="relative z-[2] pb-24 lg:pb-32 bg-white scroll-mt-28"
      >
        <div className="container-x pt-16 lg:pt-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-14 lg:mb-16">
            {PARTNERS_PAGE.stats.map((stat) => (
              <div key={stat.label} className="text-center sm:text-left">
                <p className="font-serif italic text-[clamp(2rem,4vw,3rem)] text-[color:var(--color-rust)] leading-none">
                  {stat.value}
                  <span className="text-[0.55em] not-italic text-[color:var(--color-mute)]">
                    {stat.suffix}
                  </span>
                </p>
                <p className="mt-2 text-sm text-[color:var(--color-mute)]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mb-10 lg:mb-12">
            <p className="eyebrow mb-4">{PARTNERS_PAGE.eyebrow}</p>
            <p className="text-base sm:text-lg leading-relaxed text-[color:var(--color-mute)]">
              {PARTNERS_PAGE.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {PARTNERS.map((partner) => (
              <article
                key={partner.slug}
                className="group flex flex-col border border-[color:var(--color-hairline)] bg-white hover:border-[color:var(--color-rust)]/25 transition-colors duration-300"
              >
                <div className="flex items-center justify-center px-8 py-10 sm:py-12 bg-[color:var(--color-off)] border-b border-[color:var(--color-hairline)] group-hover:bg-white transition-colors duration-300">
                  <div className="relative h-14 sm:h-16 w-full max-w-[200px]">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      sizes="200px"
                      className="object-contain object-center opacity-75 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
                <div className="px-6 py-6 sm:px-7 sm:py-7 flex-1 flex flex-col">
                  <h2 className="font-serif italic text-xl sm:text-2xl text-[color:var(--color-rust)] mb-3">
                    {partner.name}
                  </h2>
                  <p className="text-sm sm:text-[15px] leading-relaxed text-[color:var(--color-mute)]">
                    {partner.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Our Capabilities"
        title="See how our partner technology comes together on the Vantage press floor."
        ctaLabel="View Services"
        ctaHref="/services"
      />
    </div>
  );
}
