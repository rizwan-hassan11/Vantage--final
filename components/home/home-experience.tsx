"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, getLenis } from "@/lib/gsap-setup";
import { LENIS_READY_EVENT } from "@/lib/scroll-coordination";
import {
  createChapterCurtain,
  createProcessCurtain,
  revealOnScroll,
} from "@/lib/curtain-scroll";
import { SERVICES_HOME_BG, HOME_HOW_WE_MAKE } from "@/lib/content";
import { About } from "@/components/sections/about";
import { HeroBridgeCard } from "@/components/sections/hero-bridge-card";
import { PrintTech } from "@/components/sections/print-tech";
import { PrintTechShowcase } from "@/components/sections/print-tech-showcase";
import { TeamRail } from "@/components/sections/team-rail";
import type { ReactNode } from "react";

const PINNED_HOME_QUERY = "(min-width: 1100px) and (min-height: 700px)";
const STACKED_HOME_QUERY = "(max-width: 1099px), (max-height: 699px)";

export function HomeExperience({ children }: { children?: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroChapterRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);

  const portfolioChapterRef = useRef<HTMLElement>(null);
  const portfolioWhiteRef = useRef<HTMLDivElement>(null);
  const howWatermarkRef = useRef<HTMLDivElement>(null);
  const howCopyRef = useRef<HTMLDivElement>(null);
  const howBadgeRef = useRef<HTMLParagraphElement>(null);
  const howBodyRef = useRef<HTMLParagraphElement>(null);
  const howWashRef = useRef<HTMLDivElement>(null);
  const filmFrameRef = useRef<HTMLDivElement>(null);
  const filmVideoRef = useRef<HTMLVideoElement>(null);
  const printTechRef = useRef<HTMLDivElement>(null);
  const companyChapterRef = useRef<HTMLElement>(null);
  const companyMediaRef = useRef<HTMLDivElement>(null);
  const companyBgRef = useRef<HTMLDivElement>(null);
  const companyOverlayRef = useRef<HTMLDivElement>(null);
  const companyCardRef = useRef<HTMLDivElement>(null);

  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const [companyActive, setCompanyActive] = useState(0);

  /* Company chapter BG — crossfades at a calm pace while its media is in view. */
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
      }, 3000);
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

        if (
          !prefersReduced &&
          portfolioWhiteRef.current &&
          howBadgeRef.current
        ) {
          gsap.fromTo(
            howBadgeRef.current,
            {
              x: () => window.innerWidth,
              opacity: 0,
              scaleX: 0.82,
              transformOrigin: "right center",
            },
            {
              x: 0,
              opacity: 1,
              scaleX: 1,
              duration: 1.25,
              ease: "power4.out",
              scrollTrigger: {
                trigger: portfolioWhiteRef.current,
                start: "top 82%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
            },
          );
        }

        if (
          !prefersReduced &&
          portfolioWhiteRef.current &&
          howBodyRef.current
        ) {
          gsap.fromTo(
            howBodyRef.current,
            { y: 72, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.05,
              delay: 0.18,
              ease: "power3.out",
              scrollTrigger: {
                trigger: portfolioWhiteRef.current,
                start: "top 82%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: true,
              },
            },
          );
        }

        mm.add(PINNED_HOME_QUERY, () => {
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
              companyCardRef,
              portfolioWhiteRef,
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
              gsap.set(filmFrameRef.current, { opacity: 1, scale: 1 });
            }
          }

          revealOnScroll(rootRef.current!, ".narrative-reveal", !prefersReduced);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => ScrollTrigger.refresh());
          });
        });

        mm.add(STACKED_HOME_QUERY, () => {
          [
            heroCardRef,
            companyCardRef,
            portfolioWhiteRef,
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

          /* None of the pins above run here, so the stacked page would arrive
             fully formed. These reveals give it back a sense of movement. */
          revealOnScroll(
            rootRef.current!,
            [
              ".print-tech__head",
              ".print-tech__services",
              ".print-tech__copy",
              ".scroll-rail__item",
              ".team-rail__head",
            ].join(", "),
            !prefersReduced
          );
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

      /* On desktop the pinned sequences drive their own playback, so the
         in-view fallback is only needed where those animations don't run. */
      const scrollDrivesFilms =
        !prefersReduced && window.matchMedia(PINNED_HOME_QUERY).matches;
      if (!scrollDrivesFilms) {
        setupVideo(filmVideoRef.current);
      }
    };

    const needsLenis = window.matchMedia(
      `${PINNED_HOME_QUERY} and (prefers-reduced-motion: no-preference)`
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
          {/* No poster: the still frame no longer matches this cut and only
              flashed in before the video could paint */}
          <video
            ref={heroVideoRef}
            className="chapter-bg__video"
            loop
            muted
            playsInline
            preload="metadata"
            poster="/home-hero-poster.jpg"
            aria-label="Vantage home page showreel"
          >
            <source
              src="/home-hero-mobile-v2.mp4"
              type="video/mp4"
              media="(max-width: 767px)"
            />
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
                poster="/process-film-poster.jpg"
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
                <p ref={howBodyRef} className="how-we-make__body">
                  {HOME_HOW_WE_MAKE.body}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── PRINT TECHNOLOGIES ── editorial overview */}
        <PrintTech sectionRef={printTechRef} />
      </section>

      {/* Vertical scroll drives five full-screen panels in from the right. */}
      <PrintTechShowcase />

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
