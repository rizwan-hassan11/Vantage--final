"use client";

import { useEffect, type RefObject } from "react";

/** Reloads source elements only when the phone breakpoint changes. */
export function useResponsiveVideo(
  videoRef: RefObject<HTMLVideoElement | null>
) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const media = window.matchMedia("(max-width: 767px)");
    const reload = () => {
      const wasPlaying = !video.paused;
      video.load();
      if (wasPlaying) void video.play().catch(() => undefined);
    };

    media.addEventListener("change", reload);
    return () => media.removeEventListener("change", reload);
  }, [videoRef]);
}
