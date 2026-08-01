"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, getLenis } from "@/lib/gsap-setup";
import { LENIS_READY_EVENT } from "@/lib/scroll-coordination";
import {
  createChapterCurtain,
  createProcessCurtain,
  createScrollRail,
  revealOnScroll,
} from "@/lib/curtain-scroll";
import {
  HERO,
  SERVICES_HOME_BG,
  PORTFOLIO,
  PORTFOLIO_HOME,
  PORTFOLIO_HOME_BG,
  PORTFOLIO_PREVIEW_CROP,
  HOME_HOW_WE_MAKE,
} from "@/lib/content";
import { PortfolioSelector } from "@/components/scroll/portfolio-selector";
import { About } from "@/components/sections/about";
import { HeroBridgeCard } from "@/components/sections/hero-bridge-card";
import { PrintTech } from "@/components/sections/print-tech";
import { TeamRail } from "@/components/sections/team-rail";
import type { ReactNode } from "react";

export function HomeExperience({ children }: { children?: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroChapterRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);

  const portfolioChapterRef = useRef<HTMLElement>(null);
  const portfolioWhiteRef = useRef<HTMLDivElement>(null);
  const portfolioMediaRef = useRef<HTMLDivElement>(null);
  const portfolioBgRef = useRef<HTMLDivElement>(null);
  const portfolioOverlayRef = useRef<HTMLDivElement>(null);
  const portfolioCardRef = useRef<HTMLDivElement>(null);
  const howWatermarkRef = useRef<HTMLDivElement>(null);
  const howCopyRef = useRef<HTMLDivElement>(null);
  const howBadgeRef = useRef<HTMLParagraphElement>(null);
  const howWashRef = useRef<HTMLDivElement>(null);
  const filmFrameRef = useRef<HTMLDivElement>(null);
  const filmVideoRef = useRef<HTMLVideoElement>(null);
  const printTechRef = useRef<HTMLDivElement>(null);
  const printRailRef = useRef<HTMLDivElement>(null);

  const companyChapterRef = useRef<HTMLElement>(null);
  const companyMediaRef = useRef<HTMLDivElement>(null);
  const companyBgRef = useRef<HTMLDivElement>(null);
  const companyOverlayRef = useRef<HTMLDivElement>(null);
  const companyCardRef = useRef<HTMLDivElement>(null);

  const heroVideoRef = useRef<HTMLVideoElement>(null);

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

    /* Watch the media block, not the whole chapter: the chapter now spans
       several pinned sequences, so a ratio-based threshold on it can never
       be met and the crossfade would never start. */
    const media = portfolioMediaRef.current;
    if (!media) return;

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
      { threshold: 0 }
    );
    observer.observe(media);

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

    const media = companyMediaRef.current;
    if (!media) return;

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
      { threshold: 0 }
    );
    observer.observe(media);

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
          /*
            Create every pin in TOP-TO-BOTTOM page order with a descending
            refreshPriority. This is required so ScrollTrigger measures the
            card pin-spacers before the white pins below them — otherwise the
            white pins get the wrong start and don't stick.

            Page order:
              hero card → how-we-make watermark → portfolio card
              → company white → company card
          */
          if (!prefersReduced) {
            if (heroOverlayRef.current && heroBgRef.current) {
              createChapterCurtain(heroOverlayRef.current, heroBgRef.current, null, {
                card: heroCardRef.current,
                cardInitialY: 72,
                cardEnd: 0.38,
                curtainStart: 0.46,
                enabled: true,
                refreshPriority: 60,
              });
            }

            /* IMAGINE → PERFECT curtain up, then the film grows to full bleed */
            if (
              portfolioWhiteRef.current &&
              howWatermarkRef.current &&
              howBadgeRef.current &&
              howCopyRef.current &&
              howWashRef.current &&
              filmFrameRef.current
            ) {
              createProcessCurtain(
                {
                  section: portfolioWhiteRef.current,
                  column: howWatermarkRef.current,
                  fadeAnchor: howBadgeRef.current,
                  film: filmFrameRef.current,
                  wash: howWashRef.current,
                  copy: howCopyRef.current,
                  video: filmVideoRef.current,
                },
                { enabled: true, refreshPriority: 56 }
              );
            }

            /* Print technologies — scroll steps through the rail, one at a time */
            if (printTechRef.current && printRailRef.current) {
              createScrollRail(printTechRef.current, printRailRef.current, {
                enabled: true,
                refreshPriority: 53,
              });
            }

            /* Selected Work card — identical peek → rise animation as the hero */
            if (portfolioOverlayRef.current && portfolioBgRef.current) {
              createChapterCurtain(
                portfolioOverlayRef.current,
                portfolioBgRef.current,
                null,
                {
                  card: portfolioCardRef.current,
                  cardInitialY: 72,
                  cardEnd: 0.38,
                  curtainStart: 0.46,
                  enabled: true,
                  refreshPriority: 50,
                }
              );
            }

            if (companyOverlayRef.current && companyBgRef.current) {
              createChapterCurtain(
                companyOverlayRef.current,
                companyBgRef.current,
                null,
                {
                  card: companyCardRef.current,
                  cardInitialY: 86,
                  cardEnd: 0.38,
                  curtainStart: 0.46,
                  enabled: true,
                  refreshPriority: 30,
                }
              );
            }
          }

          if (prefersReduced) {
            [
              heroCardRef,
              portfolioCardRef,
              companyCardRef,
              portfolioWhiteRef,
              portfolioMediaRef,
              companyMediaRef,
              howWatermarkRef,
              howCopyRef,
              howWashRef,
            ].forEach((ref) => {
              if (ref.current) gsap.set(ref.current, { clearProps: "all" });
            });

            /* The film is transparent until the curtain reveals it, so show it
               outright when that sequence never runs */
            if (filmFrameRef.current) {
              gsap.set(filmFrameRef.current, { opacity: 1, scale: 0.82 });
            }
          }

          revealOnScroll(rootRef.current!, ".narrative-reveal", !prefersReduced);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => ScrollTrigger.refresh());
          });
        });

        mm.add("(max-width: 1023px)", () => {
          [
            heroCardRef,
            portfolioCardRef,
            companyCardRef,
            portfolioWhiteRef,
            portfolioMediaRef,
            companyMediaRef,
            filmFrameRef,
            howWatermarkRef,
            howCopyRef,
            howWashRef,
            heroChapterRef,
            portfolioChapterRef,
            companyChapterRef,
          ].forEach((ref) => {
            if (ref.current) gsap.set(ref.current, { clearProps: "all" });
          });
        });
      }, rootRef);

      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 400);

      /* Play/pause the hero chapter video when in view */
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

      /* On desktop the process curtain drives the film's playback itself, so it
         only needs the in-view fallback where that animation doesn't run. */
      const curtainDrivesFilm =
        !prefersReduced && window.matchMedia("(min-width: 1024px)").matches;
      if (!curtainDrivesFilm) setupVideo(filmVideoRef.current);
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
            aria-label="Vantage home page showreel"
          >
            <source src="/home-hero.mp4" type="video/mp4" />
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
          className="white-curtain white-curtain--cover white-curtain--how-we-make"
        >
          <div className="how-we-make">
            {/* Lifts the cream background as the film arrives */}
            <div ref={howWashRef} className="how-we-make__wash" aria-hidden />

            {/* Film plate — centred with padding, grows to full bleed */}
            <div ref={filmFrameRef} className="how-we-make__film">
              <video
                ref={filmVideoRef}
                className="how-we-make__video"
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Vantage production process film"
              >
                <source src="/process-film.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Stage centered by the widest word — Ideas left edge = letter "I" */}
            <div className="how-we-make__stage">
              {/* Invisible: sizes the stage to the widest watermark word so no
                  word is clipped and the copy stays on its first letter */}
              <span className="how-we-make__sizer" aria-hidden>
                {HOME_HOW_WE_MAKE.watermarks.map((word) => (
                  <span key={word}>{word}</span>
                ))}
              </span>
              <div
                ref={howWatermarkRef}
                className="how-we-make__column"
                aria-hidden
              >
                {HOME_HOW_WE_MAKE.watermarks.map((word) => (
                  <span key={word} className="how-we-make__watermark">
                    {word}
                  </span>
                ))}
              </div>
              <div ref={howCopyRef} className="how-we-make__inner">
                <p ref={howBadgeRef} className="how-we-make__eyebrow">
                  {HOME_HOW_WE_MAKE.eyebrow}
                </p>
                <h2 className="how-we-make__title">
                  {HOME_HOW_WE_MAKE.heading.split("\n").map((line) => (
                    <span key={line} className="how-we-make__title-line">
                      {line}
                    </span>
                  ))}
                </h2>
                <p className="how-we-make__body">{HOME_HOW_WE_MAKE.body}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── PRINT TECHNOLOGIES ── one panel opens per scroll step */}
        <PrintTech sectionRef={printTechRef} railRef={printRailRef} />

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
                  note={PORTFOLIO_HOME.note}
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

      {/* ── TEAM ── fills the white bridge under Selected Work */}
      <TeamRail />

      <About
        chapterRef={companyChapterRef}
        bgRef={companyBgRef}
        overlayRef={companyOverlayRef}
        cardRef={companyCardRef}
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
