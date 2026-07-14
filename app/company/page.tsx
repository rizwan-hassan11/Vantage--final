import type { Metadata } from "next";
import { PageCta } from "@/components/page/page-cta";
import { CompanyHero } from "@/components/page/company-hero";
import { StatBar } from "@/components/page/stat-bar";
import { TeamWall } from "@/components/page/team-wall";
import { COMPANY_PAGE, TEAM } from "@/lib/content";

export const metadata: Metadata = {
  title: "Company — Vantage Printers",
  description:
    "Vantage is Pakistan's engineering-first printing house. Founded 1992 in Lahore, 40+ machines, 500+ brands served.",
};

export default function CompanyPage() {
  return (
    <div className="home-scroll bg-white text-[color:var(--color-ink)]">
      <CompanyHero teamCount={TEAM.length} />

      <section
        id="our-team"
        className="relative z-[2] pb-24 lg:pb-32 bg-white scroll-mt-28"
      >
        <div className="container-x pt-16 lg:pt-20">
          <StatBar stats={COMPANY_PAGE.stats} className="mb-10 lg:mb-12" />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-10 sm:mb-12 lg:mb-14">
            <div className="lg:col-span-5">
              <p className="eyebrow mb-4">{COMPANY_PAGE.eyebrow}</p>
              <h2 className="title-display text-[color:var(--color-rust)]">
                Our Team
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 space-y-4 prose-body max-w-lg">
              <p>{COMPANY_PAGE.intro}</p>
              <p>
                We are proud of our team and always looking for more people with
                a similar passion and experience for print.{" "}
                <a
                  href="/contact"
                  className="text-[color:var(--color-rust)] underline underline-offset-4 hover:opacity-80"
                >
                  View current opportunities.
                </a>
              </p>
            </div>
          </div>

          <TeamWall members={TEAM} />
        </div>
      </section>

      <PageCta
        eyebrow="Work With Us"
        title="Have a project in mind? Get in touch with our team."
        ctaLabel="Contact Us"
        ctaHref="/contact"
      />
    </div>
  );
}
