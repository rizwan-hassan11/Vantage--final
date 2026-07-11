import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ABOUT } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

export function About() {
  return (
    <section
      id="company"
      className="relative bg-[color:var(--color-cream)] py-24 lg:py-32"
    >
      <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-6 order-2 lg:order-1">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="numeral text-[color:var(--color-rust)] text-sm">
                08 /
              </span>
              <span className="eyebrow">{ABOUT.eyebrow}</span>
            </div>
            <h2 className="headline-display max-w-xl">
              {ABOUT.headline.split(" ")[0]}{" "}
              <span className="italic font-serif text-[color:var(--color-rust)]">
                {ABOUT.headline.split(" ").slice(1).join(" ")}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-[color:var(--text-secondary)] max-w-xl">
              {ABOUT.body}
            </p>
          </Reveal>

          <ul className="mt-10 space-y-4 max-w-lg">
            {ABOUT.points.map((point, i) => (
              <Reveal
                key={point}
                delay={0.15 + i * 0.05}
                className="flex items-start gap-4 border-t border-[color:var(--border-primary)] pt-4"
              >
                <span className="numeral text-xs text-[color:var(--color-rust)] pt-1">
                  0{i + 1}
                </span>
                <span className="text-[color:var(--text-primary)]">
                  {point}
                </span>
              </Reveal>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-rust">
              Talk to Vantage
              <ArrowUpRight size={16} strokeWidth={1.6} />
            </a>
            <a href="#services" className="btn btn-ghost">
              Explore Capabilities
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 order-1 lg:order-2">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-[color:var(--color-bone)]">
              <Image
                src={ABOUT.image}
                alt="Vantage team"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7 text-[color:var(--color-cream)] flex items-end justify-between">
                <div>
                  <div className="eyebrow text-white/70 mb-2">
                    Since 1992 · Lahore
                  </div>
                  <div className="font-display text-2xl">
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
