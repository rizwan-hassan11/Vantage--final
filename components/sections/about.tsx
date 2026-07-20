"use client";

import Image from "next/image";
import type { RefObject } from "react";
import { ABOUT } from "@/lib/content";

type AboutProps = {
  chapterRef?: RefObject<HTMLElement | null>;
  bgRef?: RefObject<HTMLDivElement | null>;
  overlayRef?: RefObject<HTMLDivElement | null>;
  cardRef?: RefObject<HTMLDivElement | null>;
  whiteRef?: RefObject<HTMLDivElement | null>;
};

export function About({
  chapterRef,
  bgRef,
  overlayRef,
  cardRef,
  whiteRef,
}: AboutProps) {
  return (
    <section
      ref={chapterRef}
      id="company"
      data-scroll-section="company"
      className="chapter"
    >
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
            <div className="company-card__body">
              <h2 className="company-card__title">{ABOUT.headline}</h2>
            </div>

            <div className="company-card__foot">
              <a href="/contact" className="hero-cta company-card__cta">
                Contact Us
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
    </section>
  );
}
