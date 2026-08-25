"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const INTERVAL_MS = 3200;

const SLIDES = [
  { src: "/work-hero/cosmetics.mp4", type: "video", alt: "Cosmetic packaging" },
  {
    src: "/work-hero/real-estate.jpeg",
    type: "image",
    alt: "Real estate print",
  },
  { src: "/work-hero/perfumes.mp4", type: "video", alt: "Perfume packaging" },
  {
    src: "/work-hero/vantage-boxes.jpeg",
    type: "image",
    alt: "Product and gift boxes",
  },
  {
    src: "/work-hero/pharma.jpg",
    type: "image",
    alt: "Pharmaceutical packaging",
  },
  {
    src: "/work-hero/annual-report.mp4",
    type: "video",
    alt: "Annual report production",
  },
  {
    src: "/work-hero/golden-book.jpeg",
    type: "image",
    alt: "Book and publication work",
  },
  {
    src: "/work-hero/home-textile.mp4",
    type: "video",
    alt: "Home textile packaging",
  },
  { src: "/work-hero/label.jpeg", type: "image", alt: "Labels and sleeves" },
  {
    src: "/work-hero/car-brochure.jpg",
    type: "image",
    alt: "Brochure and catalogue work",
  },
] as const;

function HeroVideo({
  src,
  active,
}: {
  src: string;
  active: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (
      active &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      video.currentTime = 0;
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active]);

  return (
    <video
      ref={videoRef}
      className={`work-intro__cover-image${active ? " is-active" : ""}`}
      muted
      loop
      playsInline
      preload={active ? "auto" : "none"}
      poster="/work-hero/real-estate.jpeg"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

/** Crossfades the dedicated portfolio films and stills through the Work hero. */
export function WorkHeroCover() {
  const [active, setActive] = useState(0);
  const visibleIndexes = new Set([
    active,
    (active - 1 + SLIDES.length) % SLIDES.length,
    (active + 1) % SLIDES.length,
  ]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="work-intro__cover" aria-hidden>
      {SLIDES.map((slide, index) =>
        !visibleIndexes.has(index) ? null : slide.type === "video" ? (
          <HeroVideo
            key={slide.src}
            src={slide.src}
            active={index === active}
          />
        ) : (
          <Image
            key={slide.src}
            src={slide.src}
            alt=""
            fill
            sizes="100vw"
            quality={80}
            priority={index === 1}
            className={`work-intro__cover-image${
              index === active ? " is-active" : ""
            }`}
          />
        )
      )}
    </div>
  );
}
