import type { Metadata } from "next";
import Image from "next/image";
import { PageCta } from "@/components/page/page-cta";
import {
  COMPANY_PAGE,
  ABOUT,
  STATS,
  TEAM,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Company — Vantage Printers",
  description:
    "Vantage is Pakistan's engineering-first printing house. Founded 1992 in Lahore, 40+ machines, 500+ brands served.",
};

export default function CompanyPage() {
  return (
    <div className="bg-white text-[color:var(--color-ink)]">
      <section className="pt-32 lg:pt-40 pb-16 lg:pb-24">
        <div className="container-x">
          <p className="eyebrow mb-6">{COMPANY_PAGE.eyebrow}</p>
          <h1 className="title-hero text-center max-w-4xl mx-auto">
            {COMPANY_PAGE.title}
          </h1>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="container-x">
          <div className="relative aspect-[16/8] overflow-hidden bg-[color:var(--color-off)]">
            <Image
              src={ABOUT.image}
              alt="Vantage press floor team"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-x-4 bottom-4 sm:inset-x-8 sm:bottom-8 lg:inset-x-16 lg:bottom-16 max-w-2xl">
              <div className="rust-block on-rust">
                <p className="text-white text-lg lg:text-xl leading-relaxed">
                  {COMPANY_PAGE.intro}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="container-x">
          <div className="max-w-3xl mx-auto text-center space-y-10">
            {COMPANY_PAGE.pillars.map((pillar) => (
              <div key={pillar.title}>
                <p className="eyebrow mb-3">{pillar.title}</p>
                <p className="font-serif italic text-2xl lg:text-3xl leading-snug text-[color:var(--color-ink)]">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--color-hairline)] py-20 lg:py-28 bg-[color:var(--color-ink)] text-white">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14 items-end">
            <div className="lg:col-span-7">
              <p className="text-xs tracking-widest uppercase text-white/60 mb-4">
                By the Numbers
              </p>
              <h2 className="font-serif italic text-3xl lg:text-5xl leading-tight text-[color:var(--color-rust)]">
                {ABOUT.headline}
              </h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-lg leading-relaxed text-white/75">
                {ABOUT.body}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="py-8 lg:py-10 border-b border-white/10 lg:border-b-0 lg:border-r last:border-r-0 pr-4"
              >
                <p className="font-serif italic text-5xl lg:text-6xl text-white leading-none mb-3">
                  {stat.value}
                  <span className="text-[color:var(--color-rust)]">{stat.suffix}</span>
                </p>
                <p className="text-sm text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container-x">
          <div className="mb-14">
            <p className="eyebrow mb-4">Our Team</p>
            <h2 className="title-display max-w-2xl">
              The people who make it press.
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10">
            {TEAM.map((member) => (
              <div key={member.name} className="flex flex-col">
                <div className="relative aspect-[3/4] overflow-hidden bg-[color:var(--color-off)] mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <p className="font-serif italic text-lg text-[color:var(--color-ink)] leading-tight mb-1">
                  {member.name}
                </p>
                <p className="text-xs uppercase tracking-widest text-[color:var(--color-mute)]">
                  {member.role}
                </p>
              </div>
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
