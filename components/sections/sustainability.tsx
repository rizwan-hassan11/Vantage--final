import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SUSTAINABILITY } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

export function Sustainability() {
  return (
    <section
      id="sustainability"
      className="relative z-[4] bg-[color:var(--color-off)] py-24 lg:py-32"
    >
      <div className="container-x grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Sticky image column */}
        <div className="lg:col-span-5">
          <div className="sticky top-28">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[color:var(--color-line)]">
                <Image
                  src="/facility/building.webp"
                  alt="Vantage facility in Lahore"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                  <div className="eyebrow text-white/70 mb-2">
                    04 · Sustainability
                  </div>
                  <div className="font-display text-xl">
                    A responsible press floor.
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Copy */}
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="numeral text-[color:var(--color-rust)] text-sm">
                04 /
              </span>
              <span className="eyebrow">Sustainability</span>
            </div>
            <h2 className="max-w-xl font-serif text-[clamp(2rem,4.2vw,3.6rem)] leading-[1.02] tracking-[-0.015em] text-[color:var(--color-ink)]">
              {SUSTAINABILITY.headline.split(" ")[0]}{" "}
              <span className="italic font-serif text-[color:var(--color-rust)]">
                {SUSTAINABILITY.headline.split(" ").slice(1).join(" ")}
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[color:var(--color-mute)]">
              {SUSTAINABILITY.body}
            </p>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-2 gap-x-8 gap-y-2">
            {SUSTAINABILITY.pillars.map((p, i) => (
              <Reveal
                key={p.title}
                delay={0.15 + i * 0.06}
                className="border-t border-[color:var(--color-line)] py-6"
              >
                <div className="flex items-baseline gap-3">
                  <span className="numeral text-xs text-[color:var(--color-rust)]">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl leading-tight tracking-[-0.01em]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-mute)]">
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12">
            <a href="#certifications" className="btn-pill btn-pill-outline">
              View Certifications
              <ArrowUpRight size={16} strokeWidth={1.6} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
