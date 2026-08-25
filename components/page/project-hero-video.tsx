"use client";

import { useEffect, useRef } from "react";

export function ProjectHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    if (reducedMotion.matches) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.12 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className="project-hero__media"
      muted
      loop
      playsInline
      preload="metadata"
      aria-label="Vantage start a project showreel"
    >
      <source src="/start-project/hero.mp4" type="video/mp4" />
    </video>
  );
}
