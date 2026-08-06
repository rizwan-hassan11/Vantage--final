import Image from "next/image";
import Link from "next/link";
import type { RefObject } from "react";
import { SELECTED_WORK } from "@/lib/content";

type SelectedWorkProps = {
  sectionRef?: RefObject<HTMLDivElement | null>;
  reelRef?: RefObject<HTMLDivElement | null>;
};

export function SelectedWork({ sectionRef, reelRef }: SelectedWorkProps) {
  return (
    <div ref={sectionRef} className="selected-work">
      <div className="selected-work__head">
        <p className="selected-work__badge">{SELECTED_WORK.eyebrow}</p>
        <h2 className="selected-work__title">
          {SELECTED_WORK.heading.split("\n").map((line) => (
            <span key={line} className="selected-work__title-line">
              {line}
            </span>
          ))}
        </h2>
      </div>

      <div className="selected-work__lede-row">
        <p className="selected-work__lede">{SELECTED_WORK.lede}</p>
      </div>

      <div className="selected-work__cta-row">
        <Link
          href={SELECTED_WORK.cta.href}
          className="btn-pill selected-work__cta"
        >
          {SELECTED_WORK.cta.label}
        </Link>
      </div>

      {/* createWorkReel pins the section and climbs this column through the
          mask, so all ten categories pass by before the page moves on. */}
      <div className="selected-work__reel-mask">
        <div ref={reelRef} className="selected-work__reel">
          {SELECTED_WORK.slides.map((slide) => (
            <Link
              key={slide.slug}
              href={slide.href}
              className="selected-work__slide"
            >
              <span className="selected-work__frame">
                {slide.film ? (
                  <video
                    className="selected-work__media"
                    poster={slide.poster}
                    loop
                    muted
                    playsInline
                    preload="none"
                    aria-label={slide.title}
                  >
                    <source src={slide.film} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={slide.poster}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 1023px) 100vw, 35vw"
                    quality={90}
                    className="selected-work__media"
                  />
                )}
              </span>
              <span className="selected-work__caption">{slide.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
