"use client";

import { STATS, COMPANY } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

export function Stats() {
  return (
    <section className="relative bg-[color:var(--color-ink)] text-[color:var(--color-cream)] py-20 lg:py-28 overflow-hidden">
      {/* Background wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04] select-none"
      >
        <span className="font-display text-[28vw] leading-none tracking-[-0.03em] whitespace-nowrap">
          VANTAGE
        </span>
      </div>

      <div className="relative container-x">
        <div className="grid lg:grid-cols-12 gap-10 mb-14">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-[color:var(--color-rust)]" />
                <span className="eyebrow text-white/60">By the numbers</span>
              </div>
              <h2 className="headline-display">
                {COMPANY.years}{" "}
                <span className="italic font-serif text-[color:var(--color-rust-soft)]">
                  years
                </span>{" "}
                of ink,
                <br />
                paper and precision.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <Reveal delay={0.15}>
              <p className="text-lg leading-relaxed text-white/70">
                Since 1992, Vantage has grown from a single press to a
                40-machine floor serving Pakistan's most demanding brands.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="border-b lg:border-b-0 lg:border-r border-white/10 last:border-r-0 py-10 lg:py-14 lg:px-6"
            >
              <div className="flex items-baseline gap-1">
                <span className="font-display text-6xl lg:text-7xl leading-none tracking-[-0.03em]">
                  {stat.value}
                </span>
                <span className="font-display italic text-[color:var(--color-rust-soft)] text-3xl lg:text-4xl">
                  {stat.suffix}
                </span>
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-white/60">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
