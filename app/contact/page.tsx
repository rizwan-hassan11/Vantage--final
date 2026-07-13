import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContactHero } from "@/components/page/contact-hero";
import { CONTACT_PAGE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact — Vantage Printers",
  description:
    "Get in touch with Vantage Printers in Lahore for print, packaging, sampling and studio work.",
};

export default function ContactPage() {
  const { offices, careers } = CONTACT_PAGE;

  return (
    <div className="home-scroll bg-white text-[color:var(--color-ink)]">
      <ContactHero officeCount={offices.length} />

      <section
        id="contact-offices"
        className="relative z-[2] pb-20 sm:pb-24 lg:pb-32 bg-white scroll-mt-28"
      >
        <div className="container-x pt-16 lg:pt-20">
          <div className="max-w-2xl mb-10 lg:mb-12 section-intro">
            <p className="eyebrow mb-4">{CONTACT_PAGE.eyebrow}</p>
            <p className="prose-body">{CONTACT_PAGE.intro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {offices.map((office) => (
              <article
                key={office.name}
                className="rust-block-strong on-rust flex flex-col justify-between min-h-[320px]"
              >
                <div>
                  <p className="tag-caps text-white/70 mb-3 sm:mb-4">
                    {office.note}
                  </p>
                  <h2 className="font-serif italic text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4 sm:mb-6">
                    {office.name}
                  </h2>
                  <div className="space-y-1 text-[15px] leading-relaxed text-white/90">
                    {office.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                  {"mapHref" in office && office.mapHref ? (
                    <a
                      href={office.mapHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-swipe mt-4 inline-block text-sm text-white"
                    >
                      View Map
                    </a>
                  ) : null}
                </div>

                <div className="mt-8 pt-6 border-t border-white/25">
                  <p className="tag-caps text-white/70 mb-3">
                    {office.contactName}
                  </p>
                  <div className="space-y-1 text-[15px] break-words">
                    {"phone" in office && office.phone ? (
                      <p>
                        T{" "}
                        <a
                          href={office.phoneHref}
                          className="link-swipe text-white"
                        >
                          {office.phone}
                        </a>
                      </p>
                    ) : null}
                    <p>
                      <a
                        href={office.emailHref}
                        className="link-swipe text-white"
                      >
                        {office.email}
                      </a>
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--color-hairline)] py-16 sm:py-20 lg:py-28">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-5">{careers.eyebrow}</p>
              <h2 className="title-display mb-5">{careers.title}</h2>
              <p className="text-base sm:text-lg leading-relaxed text-[color:var(--color-mute)] max-w-2xl">
                {careers.body}
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <Link
                href={careers.ctaHref}
                className="btn-pill btn-pill-rust inline-flex w-full sm:w-auto justify-center"
              >
                {careers.ctaLabel}
                <ArrowUpRight size={16} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
