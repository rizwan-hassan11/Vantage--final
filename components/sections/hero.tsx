"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { HERO, COMPANY } from "@/lib/content";
import { RevealText } from "@/components/ui/reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-paper)]">
      {/* Top marquee ticker */}
      <div className="relative border-b border-[color:var(--border-primary)]">
        <div className="container-x py-3 flex items-center justify-between gap-6 text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
          <span className="font-medium">{COMPANY.legal}</span>
          <span className="hidden md:inline opacity-60">
            Lahore · Est. 1992 · {COMPANY.years} yrs of craft
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-rust)] animate-pulse" />
            Press floor active
          </span>
        </div>
      </div>

      <div className="container-x pt-14 lg:pt-24 pb-16 lg:pb-24 grid lg:grid-cols-12 gap-10 lg:gap-14 items-end">
        {/* Left copy */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-8 h-px bg-[color:var(--color-ink)]" />
            <span className="eyebrow">{HERO.eyebrow}</span>
          </div>

          <h1 className="headline-hero text-[color:var(--text-primary)]">
            <span className="block">
              <RevealText>{HERO.headline[0]}</RevealText>
            </span>
            <span className="block italic font-serif text-[color:var(--color-rust)]">
              <RevealText delay={0.12}>{HERO.headline[1]}</RevealText>
            </span>
            <span className="block">
              <RevealText delay={0.24}>{HERO.headline[2]}</RevealText>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 max-w-xl text-lg leading-relaxed text-[color:var(--text-secondary)]"
          >
            {HERO.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href={HERO.primaryCta.href} className="btn btn-rust">
              {HERO.primaryCta.label}
              <ArrowRight size={16} strokeWidth={1.6} />
            </a>
            <a href={HERO.secondaryCta.href} className="btn btn-ghost">
              {HERO.secondaryCta.label}
            </a>
          </motion.div>
        </div>

        {/* Right visual */}
        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-sm"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              poster={HERO.poster}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={HERO.videoWebm} type="video/webm" />
              <source src={HERO.videoMp4} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 flex items-end justify-between gap-4 text-[color:var(--color-cream)]">
              <div>
                <div className="eyebrow text-white/70 mb-1">Press Floor</div>
                <div className="font-display text-xl leading-none">
                  Heidelberg · BOBST · Xerox iGen
                </div>
              </div>
              <span className="numeral text-white/80 text-sm">/ 01</span>
            </div>
          </motion.div>

          {/* Accent tag */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="hidden md:flex absolute -left-6 top-8 rotate-[-4deg] items-center gap-3 bg-[color:var(--color-rust)] text-[color:var(--color-cream)] px-5 py-3 rounded-sm shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="text-[11px] tracking-[0.2em] uppercase font-medium">
              Think Beyond
            </span>
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll cue */}
      <div className="container-x pb-10 flex items-center justify-between border-t border-[color:var(--border-primary)] pt-6 text-xs uppercase tracking-[0.2em] text-[color:var(--text-secondary)]">
        <div className="flex items-center gap-2">
          <ArrowDown size={14} className="animate-bounce" />
          <span>Scroll to explore</span>
        </div>
        <span className="hidden md:inline">
          Offset · Flexo · Digital · Screen · Design Printing
        </span>
        <span className="numeral">01 / 08</span>
      </div>
    </section>
  );
}
