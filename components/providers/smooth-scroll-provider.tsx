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
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"
    );
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;

    const syncScroller = () => {
      if (desktopMotion.matches) {
        initLenisScroll();
      } else {
        destroyLenisScroll();
      }
      window.setTimeout(() => ScrollTrigger.refresh(true), 200);
    };

    const onResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(true), 250);
    };

    syncScroller();
    desktopMotion.addEventListener("change", syncScroller);
    window.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("resize", onResize);

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      desktopMotion.removeEventListener("change", syncScroller);
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      destroyLenisScroll();
    };
  }, []);

  return <>{children}</>;
}
