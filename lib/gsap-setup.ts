import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LENIS_READY_EVENT } from "@/lib/scroll-coordination";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

let lenisInstance: Lenis | null = null;
let lenisRaf: ((time: number) => void) | null = null;

const SCROLLER =
  typeof document !== "undefined" ? document.documentElement : null;

export function getLenis() {
  return lenisInstance;
}

export function initLenisScroll(options?: { reducedMotion?: boolean }) {
  if (lenisInstance || !SCROLLER) return lenisInstance;

  const reducedMotion = options?.reducedMotion ?? false;

  const lenis = new Lenis({
    lerp: reducedMotion ? 1 : 0.085,
    smoothWheel: !reducedMotion,
    wheelMultiplier: 1,
    touchMultiplier: 1,
    syncTouch: false,
    orientation: "vertical",
    gestureOrientation: "vertical",
    anchors: { offset: -80 },
    autoResize: true,
  });

  ScrollTrigger.scrollerProxy(SCROLLER, {
    scrollTop(value) {
      if (arguments.length && value !== undefined) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: SCROLLER.style.transform ? "transform" : "fixed",
  });

  lenis.on("scroll", ScrollTrigger.update);

  lenisRaf = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(lenisRaf);
  gsap.ticker.lagSmoothing(0);

  lenisInstance = lenis;
  window.dispatchEvent(new CustomEvent(LENIS_READY_EVENT));

  return lenis;
}

export function destroyLenisScroll() {
  if (!lenisInstance || !SCROLLER) return;

  ScrollTrigger.scrollerProxy(SCROLLER, {
    scrollTop(value) {
      if (arguments.length && value !== undefined) {
        SCROLLER.scrollTop = value;
      }
      return SCROLLER.scrollTop;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  if (lenisRaf) gsap.ticker.remove(lenisRaf);
  lenisInstance.destroy();
  lenisInstance = null;
  lenisRaf = null;
}

export { gsap, ScrollTrigger };
