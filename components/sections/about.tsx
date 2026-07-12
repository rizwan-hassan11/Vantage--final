import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ABOUT } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

export function About() {
  return (
    <section
      id="company"
      className="relative z-[4] bg-white py-24 lg:py-32"
    >
      <div className="w-full grid lg:grid-cols-12 gap-10 lg:gap-0 items-stretch">
        <div className="lg:col-span-4 order-2 lg:order-1 px-6 sm:px-10 lg:pl-[clamp(2rem,5vw,5rem)] lg:pr-10 flex flex-col justify-center">
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <span className="numeral text-[color:var(--color-rust)] text-sm">
                08 /
              </span>
              <span className="eyebrow">{ABOUT.eyebrow}</span>
            </div>
            <h2 className="font-serif text-[clamp(1.9rem,3.4vw,3rem)] leading-[1.02] tracking-[-0.015em] text-[color:var(--color-ink)]">
              {ABOUT.headline.split(" ")[0]}{" "}
              <span className="italic font-serif text-[color:var(--color-rust)]">
                {ABOUT.headline.split(" ").slice(1).join(" ")}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-[15px] leading-relaxed text-[color:var(--color-mute)]">
              Engineering-first printing house. One team across prepress, print,
              finishing and dispatch.
            </p>
          </Reveal>

          <ul className="mt-8 space-y-3">
            {ABOUT.points.slice(0, 3).map((point, i) => (
              <Reveal
                key={point}
                delay={0.15 + i * 0.05}
                className="flex items-start gap-3 border-t border-[color:var(--color-line)] pt-3"
              >
                <span className="numeral text-[11px] text-[color:var(--color-rust)] pt-0.5">
                  0{i + 1}
                </span>
                <span className="text-sm text-[color:var(--color-ink)]">
                  {point}
                </span>
              </Reveal>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/contact" className="btn-pill btn-pill-rust">
              Talk to Vantage
              <ArrowUpRight size={16} strokeWidth={1.6} />
            </a>
            <a href="#services" className="btn-pill btn-pill-outline">
              Explore
            </a>
          </div>
        </div>

        <div className="lg:col-span-8 order-1 lg:order-2">
          <Reveal>
            <div className="relative aspect-[16/10] lg:aspect-auto lg:h-[min(88vh,900px)] w-full overflow-hidden bg-[color:var(--color-line)]">
              <Image
                src={ABOUT.image}
                alt="Vantage team"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                quality={95}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5 sm:p-8 lg:p-10 text-white">
                <div>
                  <div className="eyebrow text-white/70 mb-2">
                    Since 1992 · Lahore
                  </div>
                  <div className="font-display text-2xl lg:text-3xl">
                    The people behind the press.
                  </div>
                </div>
                <span className="numeral text-white/80">/ 08</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
