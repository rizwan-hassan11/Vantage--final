"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { getLenis } from "@/lib/gsap-setup";

type PortfolioLightboxProps = {
  images: string[];
  categoryTitle: string;
  projectLabels?: string[];
  activeIndex: number;
  onClose: () => void;
  onChange: (index: number) => void;
};

export function PortfolioLightbox({
  images,
  categoryTitle,
  projectLabels,
  activeIndex,
  onClose,
  onChange,
}: PortfolioLightboxProps) {
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < images.length - 1;
  const src = images[activeIndex];
  const projectLabel = projectLabels?.[activeIndex];
  const dialogRef = useRef<HTMLDivElement>(null);

  const goPrev = useCallback(() => {
    if (hasPrev) onChange(activeIndex - 1);
  }, [activeIndex, hasPrev, onChange]);

  const goNext = useCallback(() => {
    if (hasNext) onChange(activeIndex + 1);
  }, [activeIndex, hasNext, onChange]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
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
        return;
      }
      if (event.key === "Tab") {
        const focusable = Array.from(
          dialogRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
          ) ?? []
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    const focusFrame = requestAnimationFrame(() => {
      dialogRef.current
        ?.querySelector<HTMLElement>('button[aria-label="Close"]')
        ?.focus();
    });
    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      previouslyFocused?.focus();
    };
  }, [goNext, goPrev, onClose]);

  if (!src) return null;

  return (
    <div
      ref={dialogRef}
      className="portfolio-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${projectLabel ?? categoryTitle} product image`}
    >
      <button
        type="button"
        className="portfolio-lightbox__backdrop"
        onClick={onClose}
        aria-label="Close image viewer"
        tabIndex={-1}
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
          alt={`${projectLabel ?? categoryTitle} product packaging`}
          fill
          sizes="100vw"
          quality={80}
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

      {projectLabel ? (
        <p className="portfolio-lightbox__meta portfolio-lightbox__meta--company">
          {projectLabel}
        </p>
      ) : (
        <p className="portfolio-lightbox__meta numeral">
          <span>{categoryTitle}</span>
          <span className="portfolio-lightbox__meta-sep">·</span>
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <span className="portfolio-lightbox__meta-sep">/</span>
          <span>{String(images.length).padStart(2, "0")}</span>
        </p>
      )}
    </div>
  );
}
