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
