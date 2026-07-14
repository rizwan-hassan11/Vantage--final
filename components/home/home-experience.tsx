"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, getLenis } from "@/lib/gsap-setup";
import { LENIS_READY_EVENT } from "@/lib/scroll-coordination";
import {
  createChapterCurtain,
  revealOnScroll,
} from "@/lib/curtain-scroll";
import {
  HERO,
  SERVICES,
  SERVICES_INTRO,
  PORTFOLIO,
} from "@/lib/content";
import { NumberedMenu } from "@/components/scroll/numbered-menu";
import { About } from "@/components/sections/about";
import { CtaBanner } from "@/components/sections/cta-banner";
import { HeroBridgeCard } from "@/components/sections/hero-bridge-card";

const PORTFOLIO_INTRO =
  "Exceptional results that engage and inspire. Our portfolio of successful projects spans a diverse range of industries, applications, formats and styles. Quality is the constant.";

const COMPANY_INTRO =
  "An engineering-first printing house — one accountable team across prepress, print, finishing and dispatch.";

export function HomeExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroChapterRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const heroWhiteRef = useRef<HTMLDivElement>(null);

  const servicesChapterRef = useRef<HTMLElement>(null);
  const servicesBgRef = useRef<HTMLDivElement>(null);
  const servicesOverlayRef = useRef<HTMLDivElement>(null);
  const servicesCardRef = useRef<HTMLDivElement>(null);
  const servicesWhiteRef = useRef<HTMLDivElement>(null);

  const portfolioChapterRef = useRef<HTMLElement>(null);
  const portfolioBgRef = useRef<HTMLDivElement>(null);
  const portfolioOverlayRef = useRef<HTMLDivElement>(null);
  const portfolioCardRef = useRef<HTMLDivElement>(null);
  const portfolioWhiteRef = useRef<HTMLDivElement>(null);

  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const [servicesActive, setServicesActive] = useState(0);
  const [portfolioActive, setPortfolioActive] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined" || !rootRef.current) return;

    let ctx: gsap.Context | null = null;
    let refreshTimer: ReturnType<typeof setTimeout> | null = null;
    let removeVideoListener: (() => void) | null = null;
    let videoObserver: IntersectionObserver | null = null;

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
            heroBgRef.current &&
            heroWhiteRef.current
          ) {
            createChapterCurtain(
              heroOverlayRef.current,
              heroBgRef.current,
              heroWhiteRef.current,
              {
                card: heroCardRef.current,
                peekPx: 108,
                // Sticky (no pin) — continuous scroll into white, no unpin hitch
                pin: false,
                animateWhite: false,
                cardEnd: 0.92,
                scrollLength: 1.1,
                enabled: !prefersReduced,
              }
            );
          }

          if (
            !prefersReduced &&
            servicesOverlayRef.current &&
            servicesBgRef.current &&
            servicesWhiteRef.current
          ) {
            createChapterCurtain(
              servicesOverlayRef.current,
              servicesBgRef.current,
              servicesWhiteRef.current,
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
            portfolioBgRef.current &&
            portfolioWhiteRef.current
          ) {
            createChapterCurtain(
              portfolioOverlayRef.current,
              portfolioBgRef.current,
              portfolioWhiteRef.current,
              {
                card: portfolioCardRef.current,
                cardInitialY: 86,
                cardEnd: 0.38,
                curtainStart: 0.46,
                enabled: !prefersReduced,
              }
            );
          }

          if (prefersReduced) {
            [
              heroCardRef,
              servicesCardRef,
              portfolioCardRef,
              heroWhiteRef,
              servicesWhiteRef,
              portfolioWhiteRef,
            ].forEach((ref) => {
              if (ref.current) gsap.set(ref.current, { clearProps: "all" });
            });
          }

          revealOnScroll(rootRef.current!, ".narrative-reveal", !prefersReduced);
          // Double rAF + delayed refresh avoids pin/measure jump after images/fonts
          requestAnimationFrame(() => {
            requestAnimationFrame(() => ScrollTrigger.refresh());
          });
        });

        mm.add("(max-width: 1023px)", () => {
          [
            heroCardRef,
            servicesCardRef,
            portfolioCardRef,
            heroWhiteRef,
            servicesWhiteRef,
            portfolioWhiteRef,
          ].forEach((ref) => {
            if (ref.current) gsap.set(ref.current, { clearProps: "all" });
          });
        });
      }, rootRef);

      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 400);

      const video = heroVideoRef.current;
      const onVideoReady = () => ScrollTrigger.refresh();
      if (video) {
        video.addEventListener("loadeddata", onVideoReady);
        if (video.readyState >= 2) onVideoReady();
        removeVideoListener = () =>
          video.removeEventListener("loadeddata", onVideoReady);

        if (prefersReduced) {
          video.pause();
        } else {
          videoObserver = new IntersectionObserver(
            ([entry]) => {
              if (entry.isIntersecting) {
                void video.play().catch(() => undefined);
              } else {
                video.pause();
              }
            },
            { threshold: 0.15 }
          );
          videoObserver.observe(video);
        }
      }
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
      removeVideoListener?.();
      videoObserver?.disconnect();
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

          <div ref={heroWhiteRef} className="white-curtain">
            <div className="white-curtain__inner">
              <h2 className="white-curtain__title narrative-reveal">
                Services
              </h2>
              <p className="white-curtain__intro narrative-reveal">
                {SERVICES_INTRO}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        id="services"
        ref={servicesChapterRef}
        data-scroll-section="services"
        className="chapter"
      >
        <div ref={servicesBgRef} className="chapter-bg">
          {SERVICES.map((s, i) => (
            <Image
              key={s.slug}
              src={s.image}
              alt={s.title}
              fill
              sizes="100vw"
              quality={95}
              priority={i === 0}
              className={`chapter-bg__layer object-cover ${
                i === servicesActive ? "is-active" : ""
              }`}
            />
          ))}
          <div className="chapter-bg-overlay" />
        </div>

        <div className="chapter-stack">
          <div ref={servicesOverlayRef} className="chapter-overlay-wrap">
            <div ref={servicesCardRef} className="bridge-card bridge-card--menu">
              <NumberedMenu
                eyebrow="Services"
                title="Services"
                intro={SERVICES_INTRO}
                items={SERVICES.map((s) => ({
                  number: s.number,
                  title: s.title,
                  image: s.image,
                  key: s.slug,
                  href: `/services/${s.slug}`,
                }))}
                cta={{ label: "View Services", href: "#portfolio" }}
                onActiveChange={setServicesActive}
              />
            </div>
          </div>

          <div ref={servicesWhiteRef} className="white-curtain">
            <div className="white-curtain__inner">
              <h2 className="white-curtain__title narrative-reveal">
                Portfolio
              </h2>
              <p className="white-curtain__intro narrative-reveal">
                {PORTFOLIO_INTRO}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section
        id="portfolio"
        ref={portfolioChapterRef}
        data-scroll-section="portfolio"
        className="chapter"
      >
        <div ref={portfolioBgRef} className="chapter-bg">
          {PORTFOLIO.map((p, i) => (
            <Image
              key={p.slug}
              src={p.cover}
              alt={p.title}
              fill
              sizes="100vw"
              quality={95}
              priority={i === 0}
              className={`chapter-bg__layer object-cover ${
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
              <NumberedMenu
                eyebrow="Portfolio"
                title="Portfolio"
                intro={PORTFOLIO_INTRO}
                items={PORTFOLIO.map((p) => ({
                  number: p.number,
                  title: p.title,
                  image: p.cover,
                  key: p.number,
                  href: `/portfolio/${p.slug}`,
                }))}
                cta={{ label: "View Portfolio", href: "/portfolio" }}
                onActiveChange={setPortfolioActive}
              />
            </div>
          </div>

          <div ref={portfolioWhiteRef} className="white-curtain">
            <div className="white-curtain__inner">
              <h2 className="white-curtain__title narrative-reveal">
                Company
              </h2>
              <p className="white-curtain__intro narrative-reveal">
                {COMPANY_INTRO}
              </p>
            </div>
          </div>
        </div>
      </section>

      <About />
      <CtaBanner />
    </div>
  );
}
