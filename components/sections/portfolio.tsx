"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

export function Portfolio() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section
      id="portfolio"
      className="relative bg-[color:var(--color-paper)] py-24 lg:py-32 overflow-hidden"
    >
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="numeral text-[color:var(--color-rust)] text-sm">
                  03 /
                </span>
                <span className="eyebrow">Portfolio</span>
              </div>
              <h2 className="headline-display">
                Work that
                <br />
                <span className="italic font-serif text-[color:var(--color-rust)]">
                  engages & inspires.
                </span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <Reveal delay={0.15}>
              <p className="text-lg leading-relaxed text-[color:var(--text-secondary)] max-w-xl">
                Exceptional results across diverse industries, applications and
                formats. Quality is the constant — from limited-run monographs
                to nation-wide packaging deployments.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Hoverable list */}
        <div className="relative border-t border-[color:var(--border-primary)]">
          {PORTFOLIO.map((item, i) => (
            <a
              key={item.number}
              href="#"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="group relative flex items-center justify-between border-b border-[color:var(--border-primary)] py-6 lg:py-8"
            >
              <div className="flex items-baseline gap-5 lg:gap-8 flex-1 min-w-0">
                <span className="numeral text-sm text-[color:var(--text-secondary)] shrink-0 w-10">
                  {item.number}
                </span>
                <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.5rem)] leading-none tracking-[-0.02em] group-hover:text-[color:var(--color-rust)] group-hover:italic group-hover:font-serif transition-all duration-300">
                  {item.title}
                </h3>
                <span className="hidden md:inline text-xs uppercase tracking-[0.16em] text-[color:var(--text-secondary)] ml-4">
                  {item.count}
                </span>
              </div>

              {/* Mobile image */}
              <div className="lg:hidden ml-4 relative aspect-square w-20 rounded-sm overflow-hidden bg-[color:var(--color-bone)] shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <ArrowUpRight
                size={22}
                strokeWidth={1.4}
                className="hidden lg:block ml-4 -rotate-45 group-hover:rotate-0 text-[color:var(--text-secondary)] group-hover:text-[color:var(--color-rust)] transition-all duration-500 shrink-0"
              />
            </a>
          ))}

          {/* Floating preview (desktop) */}
          <AnimatePresence>
            {hover !== null && (
              <motion.div
                key={PORTFOLIO[hover].number}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-[380px] aspect-[3/4] rounded-sm overflow-hidden shadow-2xl z-10"
                style={{
                  transform: `translateY(calc(-50% + ${
                    (hover - PORTFOLIO.length / 2) * 30
                  }px))`,
                }}
              >
                <Image
                  src={PORTFOLIO[hover].image}
                  alt={PORTFOLIO[hover].title}
                  fill
                  sizes="380px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <div className="eyebrow text-white/70">
                    {PORTFOLIO[hover].number}
                  </div>
                  <div className="font-display text-2xl">
                    {PORTFOLIO[hover].title}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-[color:var(--border-primary)] pt-8">
          <p className="text-sm text-[color:var(--text-secondary)]">
            150+ awards. 500+ brands. One press floor.
          </p>
          <a href="#" className="btn btn-ghost">
            View Full Portfolio
            <ArrowUpRight size={16} strokeWidth={1.6} />
          </a>
        </div>
      </div>
    </section>
  );
}
