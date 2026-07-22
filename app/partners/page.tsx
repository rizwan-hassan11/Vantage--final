import type { Metadata } from "next";
import Image from "next/image";
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
      <PartnersHero />

      <section
        id="partner-directory"
        className="relative z-[2] pb-24 lg:pb-32 bg-white scroll-mt-28"
      >
        <div className="container-x pt-20 sm:pt-24 lg:pt-28">
          <header className="partners-intro">
            <h2 className="partners-intro__title">
              {PARTNERS_PAGE.curtain.title}
            </h2>
            <p className="partners-intro__body">{PARTNERS_PAGE.curtain.intro}</p>
          </header>

          <ul className="partners-grid mt-20 sm:mt-24 lg:mt-28" role="list">
            {PARTNERS.map((partner) => (
              <li key={partner.slug} className="partners-grid__cell">
                <div className="partners-grid__logo">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={220}
                    height={64}
                    className="partners-grid__logo-img"
                  />
                </div>
                <p className="partners-grid__desc">{partner.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
