import type { Metadata } from "next";
import { PageCta } from "@/components/page/page-cta";
import { CompanyHero } from "@/components/page/company-hero";
import { TeamMemberCard } from "@/components/page/team-member-card";
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-14 lg:mb-16">
            {COMPANY_PAGE.stats.map((stat) => (
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
            <p className="eyebrow mb-4">{COMPANY_PAGE.eyebrow}</p>
            <p className="text-base sm:text-lg leading-relaxed text-[color:var(--color-mute)]">
              {COMPANY_PAGE.intro}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-12 sm:mb-16 lg:mb-24">
            <div className="lg:col-span-5">
              <h2 className="font-serif italic text-[color:var(--color-rust)] text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.015em]">
                Our Team
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 space-y-4 text-[14px] leading-[1.7] text-[color:var(--color-mute)] max-w-lg">
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 lg:gap-x-6 lg:gap-y-12">
            {TEAM.map((member, index) => (
              <TeamMemberCard
                key={member.name}
                member={member}
                priority={index < 4}
              />
            ))}
          </div>
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
