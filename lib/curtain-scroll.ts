import { gsap, ScrollTrigger } from "@/lib/gsap-setup";
import type { NavTheme } from "@/lib/scroll-coordination";

type CurtainPinOptions = {
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  onUpdate?: (self: ScrollTrigger) => void;
};

type ChapterCurtainOptions = CurtainPinOptions & {
  card?: HTMLElement | null;
  /** Card yPercent at load (higher = only top strip peeks). Ignored when peekPx is set. */
  cardInitialY?: number;
  /**
   * Preferred: visible top-strip height in px at load.
   * Accounts for CSS `bottom` hang so the peek isn't pushed off-screen.
   */
  peekPx?: number;
  /** Timeline share (0–1) used to reveal the card. */
  cardEnd?: number;
  /** Timeline position where white curtain starts rising. */
  curtainStart?: number;
  /** Extra scroll distance multiplier for a longer, smoother scrub. */
  scrollLength?: number;
  /**
   * When false, uses sticky overlay + scrub (no pin).
   * Avoids the Lenis pin/unpin hitch when the white section arrives.
   */
  pin?: boolean;
  /** Animate white curtain with GSAP (usually leave false — CSS flow is smoother). */
  animateWhite?: boolean;
  enabled?: boolean;
};

function setCardTransform(card: HTMLElement, yPercent: number) {
  gsap.set(card, {
    xPercent: -50,
    yPercent,
    force3D: true,
    immediateRender: true,
  });
}

/**
 * Convert a desired visible peek (px) into yPercent, compensating for
 * negative CSS `bottom` (card hanging into the white section).
 */
function yPercentForPeek(card: HTMLElement, peekPx: number) {
  const height = Math.max(
    card.offsetHeight || card.getBoundingClientRect().height,
    1
  );
  const bottom = parseFloat(getComputedStyle(card).bottom) || 0;
  const hang = Math.max(0, -bottom);
  const hidden = height - peekPx - hang;
  const yPercent = (hidden / height) * 100;
  return gsap.utils.clamp(40, 88, yPercent);
}

/**
 * Scrub bridge card up from a top-strip peek.
 * Hero: pin:false (sticky) so white section handoff stays continuous with Lenis.
 * Menu chapters: pin:true keeps the full-screen chapter feel.
 */
export function createChapterCurtain(
  overlayWrap: HTMLElement,
  bg: HTMLElement,
  whiteCurtain: HTMLElement | null,
  options?: ChapterCurtainOptions
) {
  const {
    card = null,
    cardInitialY = 82,
    peekPx,
    cardEnd = 0.85,
    curtainStart = 0.55,
    scrollLength = 1.2,
    pin = true,
    animateWhite = false,
    enabled = true,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
    onUpdate,
  } = options ?? {};

  void bg;

  const resolveStartY = () => {
    if (!card || !enabled) return cardInitialY;
    if (typeof peekPx === "number" && peekPx > 0) {
      return yPercentForPeek(card, peekPx);
    }
    return cardInitialY;
  };

  let startY = resolveStartY();

  if (card && enabled) {
    setCardTransform(card, startY);
  }

  // Keep white in normal flow — GSAP yPercent on it fights layout and feels like a pause.
  if (whiteCurtain) {
    gsap.set(whiteCurtain, { clearProps: "transform,yPercent" });
  }

  const endDistance = () => {
    if (!pin && whiteCurtain) {
      // Scrub while the white section rolls up under the sticky overlay
      const whiteH = whiteCurtain.offsetHeight || window.innerHeight * 0.6;
      return Math.max(window.innerHeight * 0.85, whiteH * 0.9);
    }
    return Math.max(window.innerHeight * scrollLength, 880);
  };

  const tl = gsap.timeline({
    defaults: { ease: "none", force3D: true },
    scrollTrigger: {
      trigger: overlayWrap,
      start: "top top",
      end: () => `+=${endDistance()}`,
      pin: pin ? overlayWrap : false,
      pinSpacing: pin,
      scrub: 0.65,
      anticipatePin: pin ? 0 : undefined,
      invalidateOnRefresh: true,
      fastScrollEnd: false,
      preventOverlaps: false,
      onRefreshInit: () => {
        if (!card || !enabled) return;
        startY = resolveStartY();
        setCardTransform(card, startY);
      },
      onEnter,
      onLeave,
      onEnterBack,
      onLeaveBack,
      onUpdate,
    },
  });

  if (card && enabled && startY > 0) {
    // Use most of the scrub range so motion never “stops” mid-pin waiting for white
    tl.fromTo(
      card,
      { xPercent: -50, yPercent: () => resolveStartY() },
      {
        xPercent: -50,
        yPercent: 0,
        duration: Math.min(Math.max(cardEnd, 0.7), 1),
        ease: "none",
      },
      0
    );
  }

  if (animateWhite && whiteCurtain && enabled) {
    const startAt = Math.min(Math.max(curtainStart, 0.4), 0.7);
    tl.fromTo(
      whiteCurtain,
      { yPercent: 12 },
      {
        yPercent: 0,
        duration: 1 - startAt,
        ease: "none",
      },
      startAt
    );
  }

  return tl;
}

export function revealOnScroll(
  scope: HTMLElement | Document,
  selector: string,
  enabled: boolean
) {
  if (!enabled) return;

  const targets = gsap.utils.toArray<HTMLElement>(
    selector,
    scope instanceof Document ? undefined : scope
  );

  targets.forEach((el) => {
    gsap.from(el, {
      y: 20,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 92%",
        toggleActions: "play none none reverse",
      },
    });
  });
}

export function navThemeFromProgress(
  progress: number,
  mediaThreshold = 0.42
): NavTheme {
  return progress < mediaThreshold ? "over-media" : "solid";
}
