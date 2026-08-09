"use client";

import Image from "next/image";
import type { RefObject } from "react";
import { ABOUT, ABOUT_HOME } from "@/lib/content";

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
  const slides =
    bgImages && bgImages.length > 0 ? bgImages : [ABOUT.image];
  return (
    <section
      ref={chapterRef}
      id="company"
      data-scroll-section="company"
      className="chapter"
    >
      <div ref={mediaRef} className="chapter-media">
        <div ref={bgRef} className="chapter-bg">
          {slides.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={i === 0 ? "Vantage building exterior" : ""}
              fill
              sizes="100vw"
              quality={95}
              priority={i === 0}
              className={`chapter-bg__layer object-cover ${
                i === bgActiveIndex ? "is-active" : ""
              }`}
            />
          ))}
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

              <div className="company-card__foot">
                <a
                  href={ABOUT_HOME.cta.href}
                  className="btn-pill company-card__pill"
                >
                  {ABOUT_HOME.cta.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
