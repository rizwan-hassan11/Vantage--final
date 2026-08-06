"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PORTFOLIO } from "@/lib/content";

const INTERVAL_MS = 1500;

/** Crossfades every category cover through the Work page hero */
export function WorkHeroCover() {
  const slides = PORTFOLIO.map((category) => ({
    src: category.cover,
    alt: category.title,
  }));
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="work-intro__cover" aria-hidden={slides.length > 1}>
      {slides.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={index === active ? slide.alt : ""}
          fill
          sizes="(min-width: 1440px) 1360px, calc(100vw - 3rem)"
          quality={90}
          priority={index === 0}
          className={`work-intro__cover-image${
            index === active ? " is-active" : ""
          }`}
        />
      ))}
    </div>
  );
}
