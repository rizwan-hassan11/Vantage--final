"use client";

import Image from "next/image";
import type { RefObject } from "react";
import { ABOUT, ABOUT_HOME } from "@/lib/content";

type AboutProps = {
  chapterRef?: RefObject<HTMLElement | null>;
  bgRef?: RefObject<HTMLDivElement | null>;
  overlayRef?: RefObject<HTMLDivElement | null>;
  cardRef?: RefObject<HTMLDivElement | null>;
  /** Leading white bridge — attached to media below for curtain-up */
  leadWhiteRef?: RefObject<HTMLDivElement | null>;
  mediaRef?: RefObject<HTMLDivElement | null>;
  /** Trailing footer bridge */
  whiteRef?: RefObject<HTMLDivElement | null>;
};

export function About({
  chapterRef,
  bgRef,
  overlayRef,
  cardRef,
  leadWhiteRef,
  mediaRef,
  whiteRef,
}: AboutProps) {
  return (
    <section
      ref={chapterRef}
      id="company"
      data-scroll-section="company"
      className="chapter"
    >
      <div
        ref={leadWhiteRef}
        className="white-curtain white-curtain--cover"
        aria-hidden
      />

      <div ref={mediaRef} className="chapter-media">
        <div ref={bgRef} className="chapter-bg">
          <Image
            src={ABOUT.image}
            alt="Vantage building exterior"
            fill
            sizes="100vw"
            quality={95}
            unoptimized
            priority
            className="chapter-bg__layer is-active object-cover"
          />
          <div className="chapter-bg-overlay" />
        </div>

        <div className="chapter-stack">
          <div ref={overlayRef} className="chapter-overlay-wrap">
            <div ref={cardRef} className="bridge-card bridge-card--company">
              <div className="company-brief">
                <p className="pf-selector__eyebrow">{ABOUT_HOME.eyebrow}</p>
                <p className="company-brief__body">{ABOUT_HOME.body}</p>
                <ul className="company-brief__stats">
                  {ABOUT_HOME.stats.map((stat) => (
                    <li key={stat.label} className="company-brief__stat">
                      <span className="company-brief__stat-value">
                        {stat.value}
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
                  className="hero-cta company-card__cta"
                >
                  {ABOUT_HOME.cta.label}
                </a>
              </div>
            </div>
          </div>

          {/* Empty white bridge so sticky chapter ends cleanly and footer can show */}
          <div
            ref={whiteRef}
            className="white-curtain white-curtain--footer-bridge"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
