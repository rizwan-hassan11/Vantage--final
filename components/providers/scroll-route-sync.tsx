"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLenis, ScrollTrigger } from "@/lib/gsap-setup";

export function ScrollRouteSync() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 120);

    const secondRefresh = window.setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 480);

    return () => {
      window.clearTimeout(refreshTimer);
      window.clearTimeout(secondRefresh);
    };
  }, [pathname]);

  return null;
}
