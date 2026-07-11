import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page/page-hero";
import { PageCta } from "@/components/page/page-cta";
import {
  INKLINGS_PAGE,
  INKLINGS_POSTS,
  INKLINGS_CATEGORIES,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Inklings — Vantage Printers",
  description:
    "Notes, wins and craft from the Vantage press floor. News, features and events.",
};

export default function InklingsPage() {
  return (
    <div className="bg-white text-[color:var(--color-ink)]">
      <section className="pt-32 lg:pt-40 pb-12 lg:pb-16">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow mb-6">{INKLINGS_PAGE.eyebrow}</p>
              <h1 className="title-hero mb-6">{INKLINGS_PAGE.title}</h1>
              <p className="text-lg lg:text-xl leading-relaxed text-[color:var(--color-mute)] max-w-2xl">
                {INKLINGS_PAGE.intro}
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <ul className="flex flex-wrap lg:flex-col gap-x-6 gap-y-3">
                {INKLINGS_CATEGORIES.map((cat, i) => (
                  <li key={cat.id} className="flex items-baseline gap-3">
                    <span className="numeral text-[10px] text-[color:var(--color-mute-2)] tracking-widest">
                      0{i + 1}
                    </span>
                    <button
                      type="button"
                      className="link-swipe text-sm text-[color:var(--color-ink-2)]"
                    >
                      {cat.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="container-x">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 lg:gap-14">
            {INKLINGS_POSTS.map((post) => (
              <Link key={post.title} href={post.href} className="group flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-[color:var(--color-off)] mb-5">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
                <p className="numeral text-xs tracking-widest text-[color:var(--color-mute-2)] mb-2">
                  {post.date} &middot; {post.category}
                </p>
                <h3 className="font-serif italic text-2xl lg:text-3xl text-[color:var(--color-ink)] leading-tight max-w-md">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="Stay in Touch"
        title="Want to stay up to date with the latest Vantage news? Follow us on LinkedIn."
        ctaLabel="LinkedIn"
        ctaHref="https://www.linkedin.com/"
      />
    </div>
  );
}
