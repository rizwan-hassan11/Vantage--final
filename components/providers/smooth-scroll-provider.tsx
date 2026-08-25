"use client";

import { useLayoutEffect } from "react";
import { initLenisScroll, destroyLenisScroll, ScrollTrigger } from "@/lib/gsap-setup";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const desktopMotion = window.matchMedia(
        "(min-width: 1100px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)"
    );
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    let lastWidth = window.innerWidth;
    let lastHeight = window.visualViewport?.height ?? window.innerHeight;

    const syncScroller = () => {
      if (desktopMotion.matches) {
        initLenisScroll();
      } else {
        destroyLenisScroll();
      }
      window.setTimeout(() => ScrollTrigger.refresh(true), 200);
    };

    const onResize = () => {
      const widthChanged = Math.abs(window.innerWidth - lastWidth) > 1;
      const nextHeight =
        window.visualViewport?.height ?? window.innerHeight;
      const heightChanged = Math.abs(nextHeight - lastHeight) > 72;
      lastWidth = window.innerWidth;
      lastHeight = nextHeight;
      if (!desktopMotion.matches && !widthChanged && !heightChanged) return;
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(true), 250);
    };

    const onOrientationChange = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        lastWidth = window.innerWidth;
        lastHeight =
          window.visualViewport?.height ?? window.innerHeight;
        ScrollTrigger.refresh(true);
      }, 350);
    };

    syncScroller();
    desktopMotion.addEventListener("change", syncScroller);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onOrientationChange);
    window.visualViewport?.addEventListener("resize", onResize);

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      desktopMotion.removeEventListener("change", syncScroller);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onOrientationChange);
      window.visualViewport?.removeEventListener("resize", onResize);
      destroyLenisScroll();
    };
  }, []);

  return <>{children}</>;
}
