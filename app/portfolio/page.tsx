import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page/page-hero";
import { PageCta } from "@/components/page/page-cta";
import { PORTFOLIO, PORTFOLIO_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio — Vantage Printers",
  description:
    "Vantage portfolio spans publications, packaging, labels, marketing collateral, books, display and stationery print.",
};

export default function PortfolioPage() {
  return (
    <div className="bg-white text-[color:var(--color-ink)]">
      <PageHero
        eyebrow={PORTFOLIO_PAGE.eyebrow}
        title={PORTFOLIO_PAGE.title}
        intro={PORTFOLIO_PAGE.intro}
      />

      <section className="pb-24 lg:pb-32">
        <div className="container-x">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {PORTFOLIO.map((item) => (
              <Link
                key={item.title}
                href="#"
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--color-off)] mb-5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <p className="numeral text-xs tracking-widest text-[color:var(--color-mute-2)] mb-2">
                  {item.number}
                </p>
                <h3 className="font-serif italic text-2xl lg:text-3xl text-[color:var(--color-rust)] leading-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[color:var(--color-mute)] leading-relaxed">
                  {item.count}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Start a Project"
        title="Have a new project in mind? Tell us about it — we're here to help."
        ctaLabel="Get a Quote"
        ctaHref="/contact"
      />
    </div>
  );
}
