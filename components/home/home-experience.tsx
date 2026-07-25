"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, getLenis } from "@/lib/gsap-setup";
import { LENIS_READY_EVENT } from "@/lib/scroll-coordination";
import { createChapterCurtain, createWhiteCurtain, revealOnScroll } from "@/lib/curtain-scroll";
import {
  HERO,
  SERVICES,
  SERVICES_HOME,
  SERVICES_HOME_BG,
  PORTFOLIO,
  PORTFOLIO_HOME,
  PORTFOLIO_HOME_BG,
  PORTFOLIO_PREVIEW_CROP,
} from "@/lib/content";
import { PortfolioSelector } from "@/components/scroll/portfolio-selector";
import { About } from "@/components/sections/about";
import { HeroBridgeCard } from "@/components/sections/hero-bridge-card";
import type { ReactNode } from "react";

export function HomeExperience({ children }: { children?: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroChapterRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);

  const servicesChapterRef = useRef<HTMLElement>(null);
  const servicesWhiteRef = useRef<HTMLDivElement>(null);
  const servicesMediaRef = useRef<HTMLDivElement>(null);
  const servicesBgRef = useRef<HTMLDivElement>(null);
  const servicesOverlayRef = useRef<HTMLDivElement>(null);
  const servicesCardRef = useRef<HTMLDivElement>(null);

  const portfolioChapterRef = useRef<HTMLElement>(null);
  const portfolioWhiteRef = useRef<HTMLDivElement>(null);
  const portfolioMediaRef = useRef<HTMLDivElement>(null);
  const portfolioBgRef = useRef<HTMLDivElement>(null);
  const portfolioOverlayRef = useRef<HTMLDivElement>(null);
  const portfolioCardRef = useRef<HTMLDivElement>(null);

  const companyChapterRef = useRef<HTMLElement>(null);
  const companyWhiteRef = useRef<HTMLDivElement>(null);
  const companyMediaRef = useRef<HTMLDivElement>(null);
  const companyBgRef = useRef<HTMLDivElement>(null);
  const companyOverlayRef = useRef<HTMLDivElement>(null);
  const companyCardRef = useRef<HTMLDivElement>(null);

  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const servicesVideoRef = useRef<HTMLVideoElement>(null);

  const [portfolioActive, setPortfolioActive] = useState(0);
  const [companyActive, setCompanyActive] = useState(0);

  /* Portfolio chapter BG — same as services: every 1.5s, independent of hover */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (PORTFOLIO_HOME_BG.length <= 1) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const chapter = portfolioChapterRef.current;
    if (!chapter) return;

    let inView = false;
    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (timer || !inView) return;
      timer = setInterval(() => {
        setPortfolioActive((prev) => (prev + 1) % PORTFOLIO_HOME_BG.length);
      }, 1500);
    };

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0.2 }
    );
    observer.observe(chapter);

    return () => {
      stop();
      observer.disconnect();
    };
  }, []);

  /* Company chapter BG — same crossfade as portfolio: every 1.5s while in view */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (SERVICES_HOME_BG.length <= 1) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const chapter = companyChapterRef.current;
    if (!chapter) return;

    let inView = false;
    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (timer || !inView) return;
      timer = setInterval(() => {
        setCompanyActive((prev) => (prev + 1) % SERVICES_HOME_BG.length);
      }, 1500);
    };

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0.2 }
    );
    observer.observe(chapter);

    return () => {
      stop();
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !rootRef.current) return;

    let ctx: gsap.Context | null = null;
    let refreshTimer: ReturnType<typeof setTimeout> | null = null;
    const videoCleanups: Array<() => void> = [];

    const setupScroll = () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
          if (
            !prefersReduced &&
            heroOverlayRef.current &&
            heroBgRef.current
          ) {
            createChapterCurtain(
              heroOverlayRef.current,
              heroBgRef.current,
              null,
              {
                card: heroCardRef.current,
                cardInitialY: 72,
                cardEnd: 0.38,
                curtainStart: 0.46,
                enabled: !prefersReduced,
              }
            );
          }

          if (
            !prefersReduced &&
            servicesOverlayRef.current &&
            servicesBgRef.current
          ) {
            createChapterCurtain(
              servicesOverlayRef.current,
              servicesBgRef.current,
              null,
              {
                card: servicesCardRef.current,
                cardInitialY: 86,
                cardEnd: 0.38,
                curtainStart: 0.46,
                enabled: !prefersReduced,
              }
            );
          }

          if (
            !prefersReduced &&
            portfolioOverlayRef.current &&
            portfolioBgRef.current
          ) {
            createChapterCurtain(
              portfolioOverlayRef.current,
              portfolioBgRef.current,
              null,
              {
                card: portfolioCardRef.current,
                cardInitialY: 86,
                cardEnd: 0.38,
                curtainStart: 0.46,
                enabled: !prefersReduced,
              }
            );
          }

          if (
            !prefersReduced &&
            companyOverlayRef.current &&
            companyBgRef.current
          ) {
            createChapterCurtain(
              companyOverlayRef.current,
              companyBgRef.current,
              null,
              {
                card: companyCardRef.current,
                cardInitialY: 86,
                cardEnd: 0.38,
                curtainStart: 0.46,
                enabled: !prefersReduced,
              }
            );
          }

          /* White floor curtain-up — media slides over pinned white */
          if (
            !prefersReduced &&
            portfolioWhiteRef.current &&
            portfolioMediaRef.current
          ) {
            createWhiteCurtain(
              portfolioWhiteRef.current,
              portfolioMediaRef.current,
              { enabled: true }
            );
          }
          if (
            !prefersReduced &&
            servicesWhiteRef.current &&
            servicesMediaRef.current
          ) {
            createWhiteCurtain(
              servicesWhiteRef.current,
              servicesMediaRef.current,
              { enabled: true }
            );
          }
          if (
            !prefersReduced &&
            companyWhiteRef.current &&
            companyMediaRef.current
          ) {
            createWhiteCurtain(
              companyWhiteRef.current,
              companyMediaRef.current,
              { enabled: true }
            );
          }

          /*
            Card peek/reveal is GSAP-pinned. White curtain-up is also GSAP
            (createWhiteCurtain) — CSS sticky breaks under Lenis.
          */

          if (prefersReduced) {
            [
              heroCardRef,
              servicesCardRef,
              portfolioCardRef,
              companyCardRef,
              servicesWhiteRef,
              portfolioWhiteRef,
              companyWhiteRef,
              servicesMediaRef,
              portfolioMediaRef,
              companyMediaRef,
            ].forEach((ref) => {
              if (ref.current) gsap.set(ref.current, { clearProps: "all" });
            });
          }

          revealOnScroll(rootRef.current!, ".narrative-reveal", !prefersReduced);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => ScrollTrigger.refresh());
          });
        });

        mm.add("(max-width: 1023px)", () => {
          [
            heroCardRef,
            servicesCardRef,
            portfolioCardRef,
            companyCardRef,
            servicesWhiteRef,
            portfolioWhiteRef,
            companyWhiteRef,
            servicesMediaRef,
            portfolioMediaRef,
            companyMediaRef,
            heroChapterRef,
            servicesChapterRef,
            portfolioChapterRef,
            companyChapterRef,
          ].forEach((ref) => {
            if (ref.current) gsap.set(ref.current, { clearProps: "all" });
          });
        });
      }, rootRef);

      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 400);

      /* Play/pause chapter videos (hero + services) when in view */
      const setupVideo = (video: HTMLVideoElement | null) => {
        if (!video) return;
        const onVideoReady = () => ScrollTrigger.refresh();
        video.addEventListener("loadeddata", onVideoReady);
        if (video.readyState >= 2) onVideoReady();
        videoCleanups.push(() =>
          video.removeEventListener("loadeddata", onVideoReady)
        );

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
        videoCleanups.push(() => observer.disconnect());
      };

      setupVideo(heroVideoRef.current);
      setupVideo(servicesVideoRef.current);
    };

    const needsLenis = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
    ).matches;

    if (!needsLenis || getLenis()) {
      setupScroll();
    } else {
      window.addEventListener(LENIS_READY_EVENT, setupScroll, { once: true });
    }

    return () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      videoCleanups.forEach((fn) => fn());
      window.removeEventListener(LENIS_READY_EVENT, setupScroll);
      ctx?.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="home-scroll">
      {/* ── HERO ── */}
      <section
        ref={heroChapterRef}
        data-scroll-section="hero"
        className="chapter"
      >
        <div ref={heroBgRef} className="chapter-bg">
          <video
            ref={heroVideoRef}
            className="chapter-bg__video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={HERO.poster}
            aria-label="Vantage press floor showreel"
          >
            <source src={HERO.videoWebm} type="video/webm" />
            <source src={HERO.videoMp4} type="video/mp4" />
          </video>
          <div className="chapter-bg-overlay" />
        </div>

        <div className="chapter-stack">
          <div ref={heroOverlayRef} className="chapter-overlay-wrap">
            <HeroBridgeCard cardRef={heroCardRef} />
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── white glued to media below */}
      <section
        id="portfolio"
        ref={portfolioChapterRef}
        data-scroll-section="portfolio"
        className="chapter"
      >
        <div
          ref={portfolioWhiteRef}
          className="white-curtain white-curtain--cover"
          aria-hidden
        />

        <div ref={portfolioMediaRef} className="chapter-media">
          <div ref={portfolioBgRef} className="chapter-bg chapter-bg--portfolio">
            {PORTFOLIO_HOME_BG.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt=""
                fill
                sizes="100vw"
                quality={95}
                priority={i === 0}
                className={`chapter-bg__layer object-cover object-center ${
                  i === portfolioActive ? "is-active" : ""
                }`}
              />
            ))}
            <div className="chapter-bg-overlay" />
          </div>

          <div className="chapter-stack">
            <div ref={portfolioOverlayRef} className="chapter-overlay-wrap">
              <div
                ref={portfolioCardRef}
                className="bridge-card bridge-card--menu"
              >
                <PortfolioSelector
                  eyebrow={PORTFOLIO_HOME.eyebrow}
                  body={PORTFOLIO_HOME.body}
                  cta={PORTFOLIO_HOME.cta}
                  items={PORTFOLIO.map((p) => ({
                    title: p.title,
                    image: p.cover,
                    key: p.slug,
                    href: `/portfolio/${p.slug}`,
                    previewSlideClassName: PORTFOLIO_PREVIEW_CROP[p.slug],
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── white glued to media below */}
      <section
        id="services"
        ref={servicesChapterRef}
        data-scroll-section="services"
        className="chapter"
      >
        <div
          ref={servicesWhiteRef}
          className="white-curtain white-curtain--cover"
          aria-hidden
        />

        <div ref={servicesMediaRef} className="chapter-media">
          <div ref={servicesBgRef} className="chapter-bg">
            <video
              ref={servicesVideoRef}
              className="chapter-bg__video"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={HERO.poster}
              aria-label="Vantage press floor showreel"
            >
              <source src={HERO.videoWebm} type="video/webm" />
              <source src={HERO.videoMp4} type="video/mp4" />
            </video>
            <div className="chapter-bg-overlay" />
          </div>

          <div className="chapter-stack">
            <div ref={servicesOverlayRef} className="chapter-overlay-wrap">
              <div
                ref={servicesCardRef}
                className="bridge-card bridge-card--menu"
              >
                <PortfolioSelector
                  variant="paragraph"
                  eyebrow={SERVICES_HOME.eyebrow}
                  heading={SERVICES_HOME.heading}
                  body={SERVICES_HOME.body}
                  cta={SERVICES_HOME.cta}
                  items={SERVICES.map((s) => ({
                    title: s.title,
                    image: s.image,
                    key: s.slug,
                    href: `/services/${s.slug}`,
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <About
        chapterRef={companyChapterRef}
        bgRef={companyBgRef}
        overlayRef={companyOverlayRef}
        cardRef={companyCardRef}
        leadWhiteRef={companyWhiteRef}
        mediaRef={companyMediaRef}
        bgImages={SERVICES_HOME_BG}
        bgActiveIndex={companyActive}
      />

      {/* Closing white block — must sit inside home-scroll with z-index
          above company so it curtains over the sticky company BG */}
      {children}
    </div>
  );
}
