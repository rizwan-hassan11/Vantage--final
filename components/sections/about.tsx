"use client";

import Image from "next/image";
import { useEffect, useState, type RefObject } from "react";
import { ABOUT, ABOUT_HOME } from "@/lib/content";

const MOBILE_BRIEF_IMAGES = [
  "/company-brief-mobile/sheet-analysis-2.jpg",
  "/company-brief-mobile/design-dept-2.jpg",
  "/company-brief-mobile/colour-management.jpg",
  "/company-brief-mobile/lamination.jpg",
  "/company-brief-mobile/sheet-analysis.jpg",
  "/company-brief-mobile/warehouse.jpg",
] as const;

type AboutProps = {
  chapterRef?: RefObject<HTMLElement | null>;
  bgRef?: RefObject<HTMLDivElement | null>;
  overlayRef?: RefObject<HTMLDivElement | null>;
  cardRef?: RefObject<HTMLDivElement | null>;
  mediaRef?: RefObject<HTMLDivElement | null>;
  /** Optional crossfading BG slideshow (falls back to the single ABOUT image) */
  bgImages?: readonly string[];
  bgActiveIndex?: number;
};

export function About({
  chapterRef,
  bgRef,
  overlayRef,
  cardRef,
  mediaRef,
  bgImages,
  bgActiveIndex = 0,
}: AboutProps) {
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const slides =
    bgImages && bgImages.length > 0 ? bgImages : [ABOUT.image];
  const visibleIndexes = new Set([
    bgActiveIndex,
    (bgActiveIndex - 1 + slides.length) % slides.length,
    (bgActiveIndex + 1) % slides.length,
  ]);
  const mobileVisibleIndexes = new Set([
    mobileActiveIndex,
    (mobileActiveIndex - 1 + MOBILE_BRIEF_IMAGES.length) %
      MOBILE_BRIEF_IMAGES.length,
    (mobileActiveIndex + 1) % MOBILE_BRIEF_IMAGES.length,
  ]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    let timer: number | null = null;

    const syncTimer = () => {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
      if (!media.matches || reduced.matches) return;
      timer = window.setInterval(() => {
        setMobileActiveIndex(
          (current) => (current + 1) % MOBILE_BRIEF_IMAGES.length
        );
      }, 3000);
    };

    syncTimer();
    media.addEventListener("change", syncTimer);
    reduced.addEventListener("change", syncTimer);
    return () => {
      if (timer !== null) window.clearInterval(timer);
      media.removeEventListener("change", syncTimer);
      reduced.removeEventListener("change", syncTimer);
    };
  }, []);

  return (
    <section
      ref={chapterRef}
      id="company"
      data-scroll-section="company"
      className="chapter"
    >
      <div ref={mediaRef} className="chapter-media">
        <div ref={bgRef} className="chapter-bg">
          {slides.map((src, index) =>
            visibleIndexes.has(index) ? (
              <Image
                key={src}
                src={src}
                alt={
                  index === bgActiveIndex ? "Vantage production and design" : ""
                }
                fill
                sizes="100vw"
                quality={95}
                className={`chapter-bg__layer object-cover ${
                  index === bgActiveIndex ? "is-active" : ""
                }`}
              />
            ) : null
          )}
          <div className="company-mobile-slideshow" aria-hidden>
            {MOBILE_BRIEF_IMAGES.map((src, index) =>
              mobileVisibleIndexes.has(index) ? (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  fill
                  sizes="100vw"
                  quality={95}
                  className={`company-mobile-slideshow__image${
                    index === mobileActiveIndex ? " is-active" : ""
                  }`}
                />
              ) : null
            )}
          </div>
          <div className="chapter-bg-overlay" />
        </div>

        <div className="chapter-stack">
          <div ref={overlayRef} className="chapter-overlay-wrap">
            <div
              ref={cardRef}
              className="bridge-card bridge-card--menu bridge-card--company"
            >
              <div className="company-brief">
                <p className="company-brief__eyebrow">{ABOUT_HOME.eyebrow}</p>
                <h2 className="company-brief__heading">
                  {ABOUT_HOME.heading.map((line) => (
                    <span key={line} className="company-brief__heading-line">
                      {line}
                    </span>
                  ))}
                </h2>
                <p className="company-brief__body">{ABOUT_HOME.body}</p>
                <ul className="company-brief__stats">
                  {ABOUT_HOME.stats.map((stat) => (
                    <li key={stat.label} className="company-brief__stat">
                      {stat.prefix ? (
                        <span className="company-brief__stat-prefix">
                          {stat.prefix}
                        </span>
                      ) : null}
                      <span className="company-brief__stat-value">
                        <span className="company-brief__stat-number">
                          {stat.value}
                        </span>
                        {stat.unit ? (
                          <span className="company-brief__stat-unit">
                            {stat.unit}
                          </span>
                        ) : null}
                      </span>
                      <span className="company-brief__stat-label">
                        {stat.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
