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
  cardInitialY?: number;
  cardEnd?: number;
  curtainStart?: number;
  scrollLength?: number;
  enabled?: boolean;
  refreshPriority?: number;
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
 * Shared chapter curtain for hero / services / portfolio —
 * same pin + scrub peek → reveal on every section.
 */
export function createChapterCurtain(
  overlayWrap: HTMLElement,
  bg: HTMLElement,
  whiteCurtain: HTMLElement | null,
  options?: ChapterCurtainOptions
) {
  const {
    card = null,
    cardInitialY = 86,
    cardEnd = 0.38,
    curtainStart = 0.46,
    scrollLength = 1.2,
    enabled = true,
    refreshPriority = 0,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
    onUpdate,
  } = options ?? {};

  void bg;
  void curtainStart;

  if (whiteCurtain) {
    gsap.set(whiteCurtain, { clearProps: "transform,yPercent" });
  }

  if (card && enabled) {
    setCardTransform(card, cardInitialY);
  }

  const tl = gsap.timeline({
    defaults: { ease: "none", force3D: true },
    scrollTrigger: {
      trigger: overlayWrap,
      start: "top top",
      end: () => `+=${Math.max(window.innerHeight * scrollLength, 800)}`,
      pin: overlayWrap,
      pinSpacing: true,
      scrub: 0.65,
      anticipatePin: 0.2,
      invalidateOnRefresh: true,
      refreshPriority,
      fastScrollEnd: false,
      onRefreshInit: () => {
        if (card && enabled) setCardTransform(card, cardInitialY);
      },
      onToggle: (self) => {
        card?.classList.toggle("is-animating", self.isActive);
      },
      onEnter,
      onLeave,
      onEnterBack,
      onLeaveBack,
      onUpdate,
    },
  });

  if (card && enabled && cardInitialY > 0) {
    tl.fromTo(
      card,
      { xPercent: -50, yPercent: cardInitialY },
      {
        xPercent: -50,
        yPercent: 0,
        duration: Math.min(Math.max(cardEnd, 0.3), 0.7),
        ease: "none",
      },
      0
    );
  }

  return tl;
}

/**
 * Leading white → next media curtain-up.
 *
 * Pins the white floor at the top of the viewport with `pinSpacing: false`,
 * so the media block below scrolls UP over it at natural (1x) speed and
 * covers it — no reserved gap, no double-motion. media z-index sits above
 * the white so it paints over it.
 *
 * `refreshPriority` (higher = refreshed earlier) MUST be set so this pin is
 * measured in top-to-bottom page order relative to the card pins; otherwise
 * the card pin spacers shift this trigger's start and it fails to stick.
 */
export function createWhiteCurtain(
  white: HTMLElement,
  media: HTMLElement,
  options?: { enabled?: boolean; refreshPriority?: number }
) {
  const { enabled = true, refreshPriority = 0 } = options ?? {};
  if (!enabled) return null;

  gsap.set(media, { clearProps: "marginTop" });
  gsap.set(white, { zIndex: 0 });
  gsap.set(media, { zIndex: 5 });

  return ScrollTrigger.create({
    trigger: white,
    start: "top top",
    end: () => `+=${Math.max(white.offsetHeight, 1)}`,
    pin: white,
    pinSpacing: false,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    refreshPriority,
  });
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
