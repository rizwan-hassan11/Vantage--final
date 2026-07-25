"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-setup";
import { createChapterCurtain } from "@/lib/curtain-scroll";
import {
  PORTFOLIO_CATEGORY_PAGE,
  type PortfolioCategory,
} from "@/lib/content";
import {
  HeroBridgeCard,
  type HeroBridgeCardContent,
} from "@/components/sections/hero-bridge-card";
import { PortfolioProjectWall } from "@/components/page/portfolio-project-wall";

type PortfolioCategoryExperienceProps = {
  category: PortfolioCategory;
};

function uniqueImages(cover: string, projects: string[]) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const src of [cover, ...projects]) {
    if (!src || seen.has(src)) continue;
    seen.add(src);
    out.push(src);
  }
  return out;
}

export function PortfolioCategoryExperience({
  category,
}: PortfolioCategoryExperienceProps) {
  const galleryImages = useMemo(
    () => uniqueImages(category.cover, category.projects),
    [category.cover, category.projects]
  );

  const [heroActive, setHeroActive] = useState(0);

  const heroSectionRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const heroWhiteRef = useRef<HTMLDivElement>(null);

  const featureSectionRef = useRef<HTMLElement>(null);
  const featureBgRef = useRef<HTMLDivElement>(null);
  const featureOverlayRef = useRef<HTMLDivElement>(null);
  const featureCardRef = useRef<HTMLDivElement>(null);
  const featureWhiteRef = useRef<HTMLDivElement>(null);

  const heroCardContent: HeroBridgeCardContent = {
    variant: "portfolioCategory",
    brandTitle: category.title,
    taglineLead: "",
    taglineConnector: "",
    taglineEmphasis: "",
    primaryCta: { label: "", href: "#portfolio-projects" },
    portfolioCategoryBody: PORTFOLIO_CATEGORY_PAGE.heroBody,
    portfolioCategoryBodyLines: PORTFOLIO_CATEGORY_PAGE.heroBodyLines,
  };

  /* Hero BG merge — every 1.5s while chapter is in view */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (galleryImages.length <= 1) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const chapter = heroSectionRef.current;
    if (!chapter) return;

    let inView = false;
    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (timer || !inView) return;
      timer = setInterval(() => {
        setHeroActive((prev) => (prev + 1) % galleryImages.length);
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
  }, [galleryImages.length]);

  /* Hero + feature curtain pins */
  useEffect(() => {
    const heroSection = heroSectionRef.current;
    const heroBg = heroBgRef.current;
    const heroOverlay = heroOverlayRef.current;
    const heroCard = heroCardRef.current;
    const heroWhite = heroWhiteRef.current;

    const featureSection = featureSectionRef.current;
    const featureBg = featureBgRef.current;
    const featureOverlay = featureOverlayRef.current;
    const featureCard = featureCardRef.current;
    const featureWhite = featureWhiteRef.current;

    if (
      !heroSection ||
      !heroBg ||
      !heroOverlay ||
      !heroCard ||
      !heroWhite ||
      !featureSection ||
      !featureBg ||
      !featureOverlay ||
      !featureCard ||
      !featureWhite
    ) {
      return;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!prefersReduced) {
          createChapterCurtain(heroOverlay, heroBg, heroWhite, {
            card: heroCard,
            cardInitialY: 86,
            cardEnd: 0.38,
            enabled: true,
          });
          createChapterCurtain(featureOverlay, featureBg, featureWhite, {
            card: featureCard,
            cardInitialY: 86,
            cardEnd: 0.38,
            enabled: true,
          });
        } else {
          gsap.set(heroCard, { clearProps: "all" });
          gsap.set(featureCard, { clearProps: "all" });
        }
        ScrollTrigger.refresh();
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.set(heroCard, { clearProps: "all" });
        gsap.set(featureCard, { clearProps: "all" });
        ScrollTrigger.refresh();
      });
    }, heroSection);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 350);
    return () => window.clearTimeout(refreshTimer);
  }, []);

  const { cta } = PORTFOLIO_CATEGORY_PAGE;

  return (
    <div className="home-scroll bg-white text-[color:var(--color-ink)]">
      {/* ── HERO ── */}
      <section
        ref={heroSectionRef}
        className="chapter"
        data-scroll-section="hero"
      >
        <div
          ref={heroBgRef}
          className="chapter-bg chapter-bg--portfolio-cat"
        >
          {galleryImages.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              sizes="100vw"
              quality={95}
              priority={i === 0}
              className={`chapter-bg__layer object-cover object-center ${
                i === heroActive ? "is-active" : ""
              }`}
            />
          ))}
          <div className="chapter-bg-overlay" />
        </div>

        <div className="chapter-stack">
          <div ref={heroOverlayRef} className="chapter-overlay-wrap">
            <HeroBridgeCard cardRef={heroCardRef} content={heroCardContent} />
          </div>
          <div
            ref={heroWhiteRef}
            className="white-curtain white-curtain--footer-bridge"
            aria-hidden
          />
        </div>
      </section>

      {/* ── PROJECT GRID ── */}
      <section
        id="portfolio-projects"
        className="portfolio-cat-projects relative z-[2] bg-white scroll-mt-28"
      >
        <div className="portfolio-cat-projects__inner container-x">
          <PortfolioProjectWall
            categoryTitle={category.title}
            projects={galleryImages}
          />
        </div>
      </section>

      {/* ── FEATURE + CURTAIN CTA ── */}
      <section
        ref={featureSectionRef}
        className="chapter"
        data-scroll-section="portfolio"
      >
        <div ref={featureBgRef} className="chapter-bg chapter-bg--portfolio-cat">
          <Image
            src={category.cover}
            alt={`${category.title} featured work`}
            fill
            sizes="100vw"
            quality={95}
            className="chapter-bg__layer is-active object-cover object-center"
          />
          <div className="chapter-bg-overlay" />
        </div>

        <div className="chapter-stack">
          <div ref={featureOverlayRef} className="chapter-overlay-wrap">
            <div
              ref={featureCardRef}
              className="bridge-card bridge-card--hero bridge-card--portfolio-cta"
            >
              <div className="portfolio-cta-card">
                <p className="portfolio-cta-card__eyebrow tag-caps">
                  {cta.eyebrow}
                </p>
                <h2 className="portfolio-cta-card__title">
                  {cta.titleLines.map((line) => (
                    <span key={line} className="portfolio-cta-card__title-line">
                      {line}
                    </span>
                  ))}
                </h2>
                <div className="portfolio-cta-card__foot">
                  <Link
                    href={cta.ctaHref}
                    className="portfolio-cta-card__link link-swipe"
                  >
                    {cta.ctaLabel}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            ref={featureWhiteRef}
            className="white-curtain white-curtain--footer-bridge"
            aria-hidden
          />
        </div>
      </section>
    </div>
  );
}
