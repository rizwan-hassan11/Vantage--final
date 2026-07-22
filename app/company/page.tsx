import type { Metadata } from "next";
import { CompanyHero } from "@/components/page/company-hero";
import { CompanyTeamIntro } from "@/components/page/company-team-intro";
import { TeamWall } from "@/components/page/team-wall";
import { TEAM } from "@/lib/content";

export const metadata: Metadata = {
  title: "Company — Vantage Printers",
  description:
    "Vantage is Pakistan's engineering-first printing house. Founded 1992 in Lahore, 40+ machines, 500+ brands served.",
};

export default function CompanyPage() {
  return (
    <div className="home-scroll bg-white text-[color:var(--color-ink)]">
      <CompanyHero />

      <section
        id="our-team"
        className="relative z-[2] pb-24 lg:pb-32 bg-white scroll-mt-28"
      >
        <div className="container-x pt-14 sm:pt-20 lg:pt-28">
          <CompanyTeamIntro />
          <div className="pt-12 sm:pt-16 lg:pt-20">
            <TeamWall members={TEAM} />
          </div>
        </div>
      </section>
    </div>
  );
}
