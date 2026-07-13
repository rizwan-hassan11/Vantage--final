"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { getLenis } from "@/lib/gsap-setup";

type PortfolioLightboxProps = {
  images: string[];
  categoryTitle: string;
  activeIndex: number;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function PortfolioLightbox({
  images,
  categoryTitle,
  activeIndex,
  onClose,
  onChange,
}: PortfolioLightboxProps) {
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < images.length - 1;
  const src = images[activeIndex];

  const goPrev = useCallback(() => {
    if (hasPrev) onChange(activeIndex - 1);
  }, [activeIndex, hasPrev, onChange]);

  const goNext = useCallback(() => {
    if (hasNext) onChange(activeIndex + 1);
  }, [activeIndex, hasNext, onChange]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const lenis = getLenis();

    document.body.style.overflow = "hidden";
    lenis?.stop();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrev();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      lenis?.start();
    };
  }, [goNext, goPrev, onClose]);

  if (!src) return null;

  return (
    <div
      className="portfolio-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${categoryTitle} — project ${activeIndex + 1}`}
    >
      <button
        type="button"
        className="portfolio-lightbox__backdrop"
        onClick={onClose}
        aria-label="Close image viewer"
      />

      <button
        type="button"
        className="portfolio-lightbox__close"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={22} strokeWidth={1.5} />
      </button>

      {hasPrev ? (
        <button
          type="button"
          className="portfolio-lightbox__nav portfolio-lightbox__nav--prev"
          onClick={goPrev}
          aria-label="Previous image"
        >
          <ChevronLeft size={28} strokeWidth={1.5} />
        </button>
      ) : null}

      <div className="portfolio-lightbox__stage">
        <Image
          key={src}
          src={src}
          alt={`${categoryTitle} — project ${activeIndex + 1}`}
          fill
          sizes="100vw"
          quality={95}
          className="portfolio-lightbox__image"
          priority
        />
      </div>

      {hasNext ? (
        <button
          type="button"
          className="portfolio-lightbox__nav portfolio-lightbox__nav--next"
          onClick={goNext}
          aria-label="Next image"
        >
          <ChevronRight size={28} strokeWidth={1.5} />
        </button>
      ) : null}

      <p className="portfolio-lightbox__meta numeral">
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <span className="portfolio-lightbox__meta-sep">/</span>
        <span>{String(images.length).padStart(2, "0")}</span>
      </p>
    </div>
  );
}
