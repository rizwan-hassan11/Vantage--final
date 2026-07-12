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
  enabled?: boolean;
};

/**
 * Pin bg + overlay, scrub the rust bridge card curtain-up from below,
 * then scrub the white curtain rising to reveal the next chapter's intro.
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
    cardEnd = 0.4,
    curtainStart = 0.44,
    enabled = true,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
    onUpdate,
  } = options ?? {};

  void whiteCurtain;
  void curtainStart;

  if (card && enabled) {
    gsap.set(card, { yPercent: cardInitialY, force3D: true });
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: overlayWrap,
      start: "top top",
      end: () => `+=${Math.max(window.innerHeight * 0.9, 700)}`,
      pin: overlayWrap,
      pinSpacing: true,
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
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

  if (card && enabled) {
    tl.fromTo(
      card,
      { yPercent: cardInitialY },
      { yPercent: 0, ease: "none", duration: cardEnd },
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
      y: 28,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
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
