"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES, SERVICES_INTRO } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

export function Services() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="services"
      className="relative bg-[color:var(--color-cream)] py-24 lg:py-32"
    >
      <div className="container-x">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-10 mb-16 lg:mb-24">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="numeral text-[color:var(--color-rust)] text-sm">
                  02 /
                </span>
                <span className="eyebrow">Services</span>
              </div>
              <h2 className="headline-display">
                Services engineered
                <br />
                <span className="italic font-serif text-[color:var(--color-rust)]">
                  under one roof.
                </span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 flex items-end">
            <Reveal delay={0.15}>
              <p className="text-lg leading-relaxed text-[color:var(--text-secondary)] max-w-xl">
                {SERVICES_INTRO}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Services list + preview */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: list */}
          <div className="lg:col-span-7 border-t border-[color:var(--border-primary)]">
            {SERVICES.map((service, i) => {
              const isActive = active === i;
              return (
                <button
                  key={service.slug}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group relative w-full text-left border-b border-[color:var(--border-primary)] py-7 lg:py-9 transition-colors"
                >
                  <div className="flex items-baseline gap-5 lg:gap-8">
                    <span className="numeral text-sm text-[color:var(--text-secondary)] shrink-0 w-10">
                      {service.number}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3
                          className={`font-display text-[clamp(1.75rem,3vw,3rem)] leading-[0.98] tracking-[-0.02em] transition-colors ${
                            isActive
                              ? "text-[color:var(--color-rust)]"
                              : "text-[color:var(--text-primary)] group-hover:text-[color:var(--color-rust)]"
                          }`}
                        >
                          {service.title}
                        </h3>
                        <ArrowUpRight
                          size={22}
                          strokeWidth={1.4}
                          className={`shrink-0 transition-all duration-500 ${
                            isActive
                              ? "text-[color:var(--color-rust)] rotate-0"
                              : "text-[color:var(--text-secondary)] -rotate-45 group-hover:rotate-0 group-hover:text-[color:var(--color-rust)]"
                          }`}
                        />
                      </div>
                      <p className="mt-2 text-sm text-[color:var(--text-secondary)] max-w-lg">
                        {service.short}
                      </p>

                      {/* Mobile inline image */}
                      <div className="lg:hidden mt-5 relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-[color:var(--color-bone)]">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Active accent line */}
                  <motion.span
                    className="absolute left-0 right-0 bottom-[-1px] h-[2px] bg-[color:var(--color-rust)] origin-left"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </button>
              );
            })}
          </div>

          {/* Right: sticky preview */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-[color:var(--color-bone)]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={SERVICES[active].slug}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={SERVICES[active].image}
                      alt={SERVICES[active].title}
                      fill
                      sizes="40vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 p-7 text-[color:var(--color-cream)]">
                  <div className="eyebrow text-white/70 mb-2">
                    {SERVICES[active].number} · {SERVICES[active].title}
                  </div>
                  <p className="text-base leading-relaxed max-w-md">
                    {SERVICES[active].description}
                  </p>
                </div>
              </div>

              {/* Bullets */}
              <ul className="mt-6 grid grid-cols-2 gap-3">
                {SERVICES[active].bullets.map((b) => (
                  <li
                    key={b}
                    className="text-xs uppercase tracking-[0.14em] text-[color:var(--text-secondary)] flex items-start gap-2 border-t border-[color:var(--border-primary)] pt-3"
                  >
                    <span className="text-[color:var(--color-rust)]">+</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer link */}
        <div className="mt-16 lg:mt-20 flex items-center justify-between border-t border-[color:var(--border-primary)] pt-8">
          <p className="text-sm text-[color:var(--text-secondary)]">
            From prepress to dispatch — one accountable team.
          </p>
          <a href="#portfolio" className="btn btn-ghost">
            View Portfolio
            <ArrowUpRight size={16} strokeWidth={1.6} />
          </a>
        </div>
      </div>
    </section>
  );
}
