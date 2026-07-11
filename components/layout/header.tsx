"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, COMPANY } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      {/* Utility strip */}
      <div className="hidden md:block bg-[color:var(--color-charcoal)] text-[color:var(--color-cream)]/85 text-[11px] tracking-[0.18em] uppercase">
        <div className="container-x flex items-center justify-between py-2.5">
          <span className="opacity-70">
            {COMPANY.legal} — Print & Packaging since 1992
          </span>
          <div className="flex items-center gap-6">
            <a
              href={COMPANY.phoneHref}
              className="hover:text-[color:var(--color-rust-soft)] transition"
            >
              {COMPANY.phone}
            </a>
            <a
              href={COMPANY.emailHref}
              className="hover:text-[color:var(--color-rust-soft)] transition"
            >
              {COMPANY.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 border-b",
          scrolled
            ? "bg-[color:var(--color-paper)]/90 backdrop-blur-md border-[color:var(--border-primary)]"
            : "bg-[color:var(--color-paper)] border-transparent"
        )}
      >
        <div className="container-x flex items-center justify-between py-4 lg:py-5">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Vantage — Home"
          >
            <Image
              src="/vantage-svg-logos/Vantage Identity-01 copy-01.svg"
              alt="Vantage"
              width={148}
              height={40}
              priority
              className="h-9 lg:h-10 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-9">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] tracking-[0.12em] uppercase font-medium text-[color:var(--text-primary)] hover:text-[color:var(--color-rust)] transition"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a href="#contact" className="btn btn-rust">
              Get a Quote
              <ArrowUpRight size={16} strokeWidth={1.6} />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[color:var(--border-primary)] hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-cream)] transition"
            aria-label="Open menu"
          >
            <Menu size={18} strokeWidth={1.6} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-[color:var(--color-charcoal)] text-[color:var(--color-cream)] flex flex-col transition-all duration-500",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="container-x flex items-center justify-between py-4 lg:py-5 border-b border-white/10">
          <span className="font-display text-2xl">Vantage</span>
          <button
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/20 hover:bg-[color:var(--color-rust)] hover:border-[color:var(--color-rust)] transition"
            aria-label="Close menu"
          >
            <X size={18} strokeWidth={1.6} />
          </button>
        </div>
        <nav className="container-x flex-1 flex flex-col justify-center gap-3 py-10">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 border-b border-white/10 py-4"
            >
              <span className="numeral text-xs text-white/40 w-8">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-4xl md:text-5xl group-hover:text-[color:var(--color-rust-soft)] transition">
                {link.label}
              </span>
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn btn-rust mt-8 self-start"
          >
            Get a Quote
            <ArrowUpRight size={16} />
          </a>
        </nav>
        <div className="container-x py-6 text-xs uppercase tracking-[0.18em] text-white/60 border-t border-white/10 flex flex-col md:flex-row md:justify-between gap-2">
          <span>{COMPANY.address.line1}</span>
          <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
        </div>
      </div>
    </>
  );
}
