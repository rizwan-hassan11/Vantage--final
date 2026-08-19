"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Clonvo web chat for Vantage Printers.
 * The public widget key can be rotated without code changes.
 */
export function ClonvoWidget() {
  const pathname = usePathname();
  const key = process.env.NEXT_PUBLIC_CLONVO_WIDGET_KEY;

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(
      '[data-scroll-section="hero"]'
    );
    const footer = document.querySelector<HTMLElement>("#site-footer");
    let frame = 0;

    const update = () => {
      frame = 0;
      const footerRect = footer?.getBoundingClientRect();
      const show =
        pathname === "/"
          ? Boolean(
              footerRect &&
                footerRect.top < window.innerHeight &&
                footerRect.bottom > 0
            )
          : !hero || hero.getBoundingClientRect().bottom <= 0;
      document.body.classList.toggle("show-clonvo-chat", show);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.body.classList.remove("show-clonvo-chat");
    };
  }, [pathname]);

  if (!key) return null;

  return (
    <Script
      src="https://app.clonvo.chat/widget.js"
      data-key={key}
      data-base="https://app.clonvo.chat"
      data-title="Vantage Printers"
      data-subtitle="Print · packaging · project help"
      data-greeting="Hi! Ask about packaging, print capabilities, lead times, or starting a project. We are here to help."
      data-suggestions="What print technologies do you offer?|Can you help with packaging design?|How do I Start a Project?|Talk to the team"
      data-color="#E85D04"
      data-position="bottom-right"
      strategy="lazyOnload"
    />
  );
}
