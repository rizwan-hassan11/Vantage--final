"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Instagram, Facebook, Linkedin, ArrowDown } from "lucide-react";
import {
  HERO,
  SERVICES,
  SERVICES_INTRO,
  PORTFOLIO,
  COMPANY,
} from "@/lib/content";
import { setNavTheme, type NavTheme } from "@/lib/scroll-coordination";
import { NumberedMenu } from "@/components/scroll/numbered-menu";
import { Sustainability } from "@/components/sections/sustainability";
import { About } from "@/components/sections/about";
import { Latest } from "@/components/sections/latest";
import { CtaBanner } from "@/components/sections/cta-banner";

const PORTFOLIO_INTRO =
  "Exceptional results that engage and inspire. Our portfolio of successful projects spans a diverse range of industries, applications, formats and styles. Quality is the constant.";

export function HomeExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  /* ----------------------------------------------------------
     Navbar theme detection
     Each themed section carries a data-nav-theme attribute.
     A thin sentinel band just under the header intersects each
     section — the section currently crossing that band wins.
     ---------------------------------------------------------- */
  useEffect(() => {
    if (typeof window === "undefined" || !rootRef.current) return;

    const themedElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-theme]")
    );
    if (!themedElements.length) return;

    // Sentinel band: 72px below top (header height) — 1px tall
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry whose top is closest to the header bottom, that
        // is currently intersecting the sentinel band.
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (!intersecting.length) return;

        // Sort by boundingClientRect.top descending so the *lowest* top
        // that's still <= 72 wins (i.e. deepest section under header).
        intersecting.sort(
          (a, b) => b.boundingClientRect.top - a.boundingClientRect.top
        );
        const theme = intersecting[0].target.getAttribute(
          "data-nav-theme"
        ) as NavTheme | null;
        if (theme) setNavTheme(theme);
      },
      {
        // Creates a 1px band exactly at 72px from top of viewport
        rootMargin: "-72px 0px -99% 0px",
        threshold: 0,
      }
    );

    themedElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ----------------------------------------------------------
     Hero video autoplay/pause based on visibility
     ---------------------------------------------------------- */
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef}>
      {/* =========================================================
          CHAPTER 1 — HERO
          Sticky video background + rust curtain that rises over it.
         ========================================================= */}
      <section className="chapter" data-scroll-section="hero">
        <div className="chapter-media" data-nav-theme="over-media">
          <video
            ref={heroVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={HERO.poster}
            aria-label="Vantage press floor showreel"
          >
            <source src={HERO.videoWebm} type="video/webm" />
            <source src={HERO.videoMp4} type="video/mp4" />
          </video>
          <div className="chapter-media__scrim" />
        </div>

        <div
          className="chapter-curtain chapter-curtain--rust"
          data-nav-theme="over-media"
        >
          <div className="chapter-inner hero-inner">
            <div className="hero-topbar">
              <div className="hero-topbar__socials" aria-hidden="true">
                <Instagram size={15} strokeWidth={1.6} />
                <Facebook size={15} strokeWidth={1.6} />
                <Linkedin size={15} strokeWidth={1.6} />
              </div>

              <ArrowDown
                size={16}
                strokeWidth={1.5}
                className="hero-topbar__arrow motion-safe:animate-bounce"
                aria-hidden
              />

              <div className="hero-topbar__contact">
                <div className="hero-topbar__item">
                  <span className="hero-topbar__label">Contact us</span>
                  <a href={COMPANY.phoneHref} className="link-swipe font-medium">
                    {COMPANY.phone}
                  </a>
                </div>
                <div className="hero-topbar__item">
                  <span className="hero-topbar__label">Email us</span>
                  <a href={COMPANY.emailHref} className="link-swipe font-medium">
                    {COMPANY.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="hero-body">
              <p className="hero-eyebrow">{HERO.eyebrow}</p>
              <p className="hero-lede">
                {HERO.headline[0]} <em>{HERO.headline[1]}</em>{" "}
                {HERO.headline[2]} {HERO.description}
              </p>
            </div>

            <div className="hero-foot">
              <a href={HERO.primaryCta.href} className="hero-cta">
                {HERO.primaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CHAPTER 2 — SERVICES
         ========================================================= */}
      <section className="chapter" id="services" data-scroll-section="services">
        <div className="chapter-media" data-nav-theme="over-media">
          <Image
            src={SERVICES[0].image}
            alt="Vantage services"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="chapter-media__scrim" />
        </div>

        <div
          className="chapter-curtain chapter-curtain--rust"
          data-nav-theme="over-media"
        >
          <div className="chapter-inner menu-inner">
            <NumberedMenu
              eyebrow="Services"
              title="Services"
              intro={SERVICES_INTRO}
              items={SERVICES.map((s) => ({
                number: s.number,
                title: s.title,
                image: s.image,
                key: s.slug,
              }))}
              cta={{ label: "View Services", href: "#portfolio" }}
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          CHAPTER 3 — PORTFOLIO
         ========================================================= */}
      <section
        className="chapter"
        id="portfolio"
        data-scroll-section="portfolio"
      >
        <div className="chapter-media" data-nav-theme="over-media">
          <Image
            src={PORTFOLIO[0].image}
            alt="Vantage portfolio"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="chapter-media__scrim" />
        </div>

        <div
          className="chapter-curtain chapter-curtain--rust"
          data-nav-theme="over-media"
        >
          <div className="chapter-inner menu-inner">
            <NumberedMenu
              eyebrow="Portfolio"
              title="Portfolio"
              intro={PORTFOLIO_INTRO}
              items={PORTFOLIO.map((p) => ({
                number: p.number,
                title: p.title,
                image: p.image,
                key: p.number,
              }))}
              cta={{ label: "View Portfolio", href: "#latest" }}
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          WHITE SECTIONS — plain content chapters, nav turns solid.
         ========================================================= */}
      <div data-nav-theme="solid">
        <Sustainability />
        <About />
        <Latest />
        <CtaBanner />
      </div>
    </div>
  );
}
