"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";
import {
  createChapterCurtain,
  revealOnScroll,
} from "@/lib/curtain-scroll";
import { HERO } from "@/lib/content";
import {
  HeroBridgeCard,
  type HeroBridgeCardContent,
} from "@/components/sections/hero-bridge-card";

type ChapterPageHeroProps = {
  cardContent: HeroBridgeCardContent;
  curtainTitle?: string;
  curtainIntro?: string;
  /** When set, hero uses a still image instead of the showreel video */
  backgroundImage?: string;
  backgroundAlt?: string;
  /** Center curtain title/intro (e.g. contact page aligned with form) */
  curtainCentered?: boolean;
  /** Company page — left editorial stack (vision title + body) */
  curtainEditorial?: boolean;
  /** Hide curtain heading/copy — keep a thin scroll bridge only */
  hideCurtainContent?: boolean;
};

export function ChapterPageHero({
  cardContent,
  curtainTitle,
  curtainIntro,
  backgroundImage,
  backgroundAlt = "",
  curtainCentered = false,
  curtainEditorial = false,
  hideCurtainContent = false,
}: ChapterPageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const whiteRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const useImage = Boolean(backgroundImage);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const overlay = overlayRef.current;
    const card = cardRef.current;
    const white = whiteRef.current;
    if (!section || !bg || !overlay || !card || !white) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1100px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
        () => {
        if (!prefersReduced) {
          createChapterCurtain(overlay, bg, white, {
            card,
            cardInitialY: 86,
            cardEnd: 0.38,
            enabled: true,
          });
        } else {
          gsap.set(card, { clearProps: "all" });
        }

        revealOnScroll(section, ".narrative-reveal", !prefersReduced);
        ScrollTrigger.refresh();
        }
      );

      mm.add(
        "(max-width: 1099px), (max-height: 699px), (prefers-reduced-motion: reduce)",
        () => {
          gsap.set(card, { clearProps: "all" });
          ScrollTrigger.refresh();
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 350);

    return () => window.clearTimeout(refreshTimer);
  }, []);

  useEffect(() => {
    if (useImage) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const play = () => {
      if (motionPreference.matches) {
        video.pause();
        return;
      }
      void video.play().catch(() => {});
    };

    play();
    video.addEventListener("loadeddata", play);
    motionPreference.addEventListener("change", play);
    return () => {
      video.removeEventListener("loadeddata", play);
      motionPreference.removeEventListener("change", play);
    };
  }, [useImage]);

  return (
    <section ref={sectionRef} className="chapter" data-scroll-section="hero">
      <div ref={bgRef} className="chapter-bg">
        {useImage && backgroundImage ? (
          <Image
            src={backgroundImage}
            alt={backgroundAlt}
            fill
            sizes="100vw"
            quality={80}
            priority
            className="chapter-bg__layer is-active object-cover object-[center_35%]"
          />
        ) : (
          <video
            ref={videoRef}
            className="chapter-bg__video"
            loop
            muted
            playsInline
            preload="auto"
            poster="/home-hero-poster.jpg"
            aria-label="Vantage press floor showreel"
          >
            <source src={HERO.videoMp4} type="video/mp4" />
          </video>
        )}
        <div className="chapter-bg-overlay" />
      </div>

      <div className="chapter-stack">
        <div ref={overlayRef} className="chapter-overlay-wrap">
          <HeroBridgeCard cardRef={cardRef} content={cardContent} />
        </div>

        {hideCurtainContent ? (
          <div
            ref={whiteRef}
            className="white-curtain white-curtain--footer-bridge"
            aria-hidden
          />
        ) : (
          <div
            ref={whiteRef}
            className={`white-curtain${curtainCentered ? " white-curtain--centered" : ""}${curtainEditorial ? " white-curtain--editorial" : ""}`}
          >
            <div className="white-curtain__inner">
              {curtainTitle ? (
                <h2 className="white-curtain__title narrative-reveal">
                  {curtainTitle}
                </h2>
              ) : null}
              {curtainIntro ? (
                <p className="white-curtain__intro narrative-reveal">
                  {curtainIntro}
                </p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
