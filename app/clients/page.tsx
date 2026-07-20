import type { Metadata } from "next";
import { PageCta } from "@/components/page/page-cta";
import { ClientLogoWall } from "@/components/page/client-logo-wall";
import { ClientsHero } from "@/components/page/clients-hero";
import { getClients } from "@/lib/clients.server";

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
          <ClientLogoWall clients={clients} />
        </div>
      </section>

      <PageCta
        eyebrow="Work With Us"
        title="Ready to join our roster of leading brands? Let's talk about your next project."
        ctaLabel="Contact Us"
        ctaHref="/contact"
      />
    </div>
  );
}
