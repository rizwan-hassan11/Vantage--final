"use client";

import { useEffect } from "react";

/**
 * The closing CTA and the global footer are separate blocks (the footer lives in
 * the layout), so CSS alone can't make them share exactly one screen. This
 * publishes the footer's natural height as `--home-footer-h`; the CTA claims the
 * rest of the viewport from there.
 */
export function ClosingFit() {
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const root = document.documentElement;
    const publish = () => {
      root.style.setProperty(
        "--home-footer-h",
        `${Math.round(footer.getBoundingClientRect().height)}px`
      );
    };

    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(footer);

    return () => {
      observer.disconnect();
      root.style.removeProperty("--home-footer-h");
    };
  }, []);

  return null;
}
