"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLenis, ScrollTrigger } from "@/lib/gsap-setup";

export function ScrollRouteSync() {
  const pathname = usePathname();

  useEffect(() => {
    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh(true);
      const hash = window.location.hash;
      const target = hash
        ? document.getElementById(decodeURIComponent(hash.slice(1)))
        : null;
      const lenis = getLenis();

      if (target) {
        if (lenis) lenis.scrollTo(target, { immediate: true });
        else target.scrollIntoView({ block: "start" });
      } else if (!hash) {
        if (lenis) lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
      }
    }, 180);

    return () => {
      window.clearTimeout(refreshTimer);
    };
  }, [pathname]);

  return null;
}
