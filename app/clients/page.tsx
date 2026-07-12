import type { Metadata } from "next";
import { PageCta } from "@/components/page/page-cta";
import { ClientLogoWall } from "@/components/page/client-logo-wall";
import { ClientsHero } from "@/components/page/clients-hero";
import { getClients } from "@/lib/clients.server";
import { STATS, CLIENTS_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Clients — Vantage Printers",
  description:
    "500+ brands trust Vantage for print and packaging — fashion, FMCG, banking, automotive, real estate and more.",
};

export default function ClientsPage() {
  const clients = getClients();

  return (
    <div className="home-scroll bg-white text-[color:var(--color-ink)]">
      <ClientsHero clientCount={clients.length} />

      <section
        id="client-directory"
        className="relative z-[2] pb-24 lg:pb-32 bg-white scroll-mt-28"
      >
        <div className="container-x pt-16 lg:pt-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-14 lg:mb-16">
            {STATS.map((stat) => (
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
            <p className="eyebrow mb-4">{CLIENTS_PAGE.eyebrow}</p>
            <p className="text-base sm:text-lg leading-relaxed text-[color:var(--color-mute)]">
              {CLIENTS_PAGE.intro}
            </p>
          </div>

          <ClientLogoWall clients={clients} />
        </div>
      </section>

      <PageCta
        eyebrow="Work With Us"
        title="Ready to join our roster of leading brands? Let's talk about your next project."
        ctaLabel="Get a Quote"
        ctaHref="/quote"
      />
    </div>
  );
}
