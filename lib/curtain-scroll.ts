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

const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);

/**
 * "How we make it" process curtain.
 *
 * The section is pinned and one spaced column of oversized words curtains up
 * through it. Each word dissolves as it climbs into the copy band at the top,
 * so the sequence reads IMAGINE → PREPARE → PRODUCE → PERFECT. The moment the
 * second word starts dissolving the wash lifts the background and the film
 * plate fades in centred; the copy then clears as the third word climbs in,
 * and the plate grows out of its padding to reach full bleed once the last
 * word has gone.
 *
 * Opacity is driven by each word's live distance from the fade line rather
 * than by fixed timeline beats, so the spacing stays correct at any viewport
 * size and for any number of words.
 */
export function createProcessCurtain(
  parts: {
    section: HTMLElement;
    /** Flow column holding the words, one child per word */
    column: HTMLElement;
    /** Words are fully dissolved once they reach this element's bottom edge */
    fadeAnchor: HTMLElement;
    film: HTMLElement;
    /** Full-bleed layer that shifts the section background under the film */
    wash: HTMLElement;
    copy: HTMLElement;
    video?: HTMLVideoElement | null;
  },
  options?: {
    enabled?: boolean;
    refreshPriority?: number;
    scrollLength?: number;
    /** Progress at which the column finishes its climb */
    wordsEnd?: number;
    /** Progress at which the film reaches full bleed */
    filmFull?: number;
    /** Film size on arrival, as a fraction of the viewport */
    fromScale?: number;
  }
) {
  const { section, column, fadeAnchor, film, wash, copy, video } = parts;
  const {
    enabled = true,
    refreshPriority = 0,
    scrollLength = 3.2,
    wordsEnd = 0.84,
    filmFull = 0.94,
    fromScale = 0.74,
  } = options ?? {};
  if (!enabled) return null;

  const words = Array.from(column.children) as HTMLElement[];
  if (!words.length) return null;

  let travel = 1;
  let fadeLine = 0;
  let fadeSpan = 1;
  let startTops: number[] = [];
  let filmFrom = 0.3;
  let copyFrom = 0.36;
  let copyTo = 0.65;
  let playing = false;

  const measure = () => {
    gsap.set(column, { y: 0 });
    const sectionTop = section.getBoundingClientRect().top;
    const rects = words.map((word) => word.getBoundingClientRect());

    startTops = rects.map((rect) => rect.top - sectionTop);
    /* A word dissolves over roughly its own height of travel */
    fadeSpan = Math.max(rects[0].height * 1.15, 140);
    fadeLine =
      fadeAnchor.getBoundingClientRect().bottom -
      sectionTop +
      Math.max(window.innerHeight * 0.015, 10);
    travel = Math.max(startTops[startTops.length - 1] - fadeLine, 1);

    const second = startTops[Math.min(1, words.length - 1)];
    filmFrom = clamp01((second - fadeLine - fadeSpan) / travel) * wordsEnd;

    /* The copy clears for the third word: it starts hiding the moment that
       word climbs into the opening position and is gone once it dissolves. */
    const third = startTops[Math.min(2, words.length - 1)];
    copyFrom = clamp01((third - startTops[0]) / travel) * wordsEnd;
    copyTo = clamp01((third - fadeLine) / travel) * wordsEnd;
  };

  const render = (progress: number) => {
    const y = -travel * Math.min(progress / wordsEnd, 1);
    gsap.set(column, { y });
    words.forEach((word, i) => {
      gsap.set(word, {
        opacity: clamp01((startTops[i] + y - fadeLine) / fadeSpan),
      });
    });

    const appear = clamp01((progress - filmFrom) / 0.18);
    const grow = clamp01(
      (progress - filmFrom) / Math.max(filmFull - filmFrom, 0.01)
    );
    gsap.set(wash, { opacity: clamp01((progress - filmFrom) / 0.28) });
    gsap.set(film, {
      opacity: appear,
      scale: fromScale + (1 - fromScale) * grow,
    });
    gsap.set(copy, {
      opacity:
        1 - clamp01((progress - copyFrom) / Math.max(copyTo - copyFrom, 0.01)),
    });

    if (video) {
      const shouldPlay = appear > 0.05;
      if (shouldPlay !== playing) {
        playing = shouldPlay;
        if (shouldPlay) void video.play().catch(() => undefined);
        else video.pause();
      }
    }
  };

  const reset = () => {
    measure();
    render(0);
  };

  reset();

  const state = { progress: 0 };
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${Math.max(window.innerHeight * scrollLength, 1600)}`,
      pin: section,
      pinSpacing: true,
      scrub: 0.6,
      anticipatePin: 0.2,
      invalidateOnRefresh: true,
      refreshPriority,
      onRefreshInit: reset,
    },
  });

  tl.to(
    state,
    { progress: 1, duration: 1, onUpdate: () => render(state.progress) },
    0
  );

  return tl;
}

/**
 * Rail of collapsed tabs — scroll opens one panel at a time, no hover.
 *
 * The section is pinned and the scroll maps onto the rail: each panel holds
 * open for a beat before handing over to the next, so every item gets its
 * moment. Widths are distributed with `flex-grow` rather than pixels, so the
 * rail stays correct on any resize.
 */
export function createScrollRail(
  section: HTMLElement,
  rail: HTMLElement,
  options?: {
    enabled?: boolean;
    refreshPriority?: number;
    scrollLength?: number;
    /** Share of each step spent held open before the handover */
    hold?: number;
  }
) {
  const {
    enabled = true,
    refreshPriority = 0,
    scrollLength = 2.6,
    hold = 0.55,
  } = options ?? {};
  if (!enabled) return null;

  const items = Array.from(rail.children) as HTMLElement[];
  if (items.length < 2) return null;

  const reveals = items.map((item) =>
    item.querySelector<HTMLElement>("[data-rail-reveal]")
  );

  const ease = (t: number) => t * t * (3 - 2 * t);

  const render = (progress: number) => {
    const steps = items.length - 1;
    const scaled = clamp01(progress) * steps;
    const step = Math.min(Math.floor(scaled), steps - 1);
    const handover = clamp01((scaled - step - hold) / (1 - hold));
    const position = step + ease(handover);

    items.forEach((item, i) => {
      const openness = Math.max(0, 1 - Math.abs(position - i));
      gsap.set(item, { flexGrow: openness * 1000 });
      const reveal = reveals[i];
      if (reveal) gsap.set(reveal, { opacity: ease(clamp01(openness * 1.5)) });
    });
  };

  render(0);

  const state = { progress: 0 };
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${Math.max(window.innerHeight * scrollLength, 1400)}`,
      pin: section,
      pinSpacing: true,
      scrub: 0.6,
      anticipatePin: 0.2,
      invalidateOnRefresh: true,
      refreshPriority,
      onRefreshInit: () => {
        state.progress = 0;
        render(0);
      },
    },
  });

  tl.to(
    state,
    { progress: 1, duration: 1, onUpdate: () => render(state.progress) },
    0
  );

  return tl;
}

/**
 * Selected Work reel — the section pins and the column of category slides
 * climbs through its mask, so every category passes the viewport once before
 * the page moves on.
 *
 * A slide is fully opaque only while it sits in the middle of the mask: it
 * fades in as it rises from the bottom and dissolves again on its way out of
 * the top. The column is padded to half a slide either side, so the first
 * slide starts centred and the last one finishes centred — every category
 * gets its moment at full opacity.
 *
 * The card grows into the centre on the same curve as the fade, and the
 * artwork inside it zooms across the whole climb, so the reel keeps moving
 * even while a slide holds the centre.
 *
 * All of it is measured from the live column, so it stays correct at any
 * viewport size and for any number of slides.
 */
export function createWorkReel(
  section: HTMLElement,
  reel: HTMLElement,
  options?: {
    enabled?: boolean;
    refreshPriority?: number;
    scrollLength?: number;
    /** Share of the half-mask a slide holds full opacity for */
    fadeHold?: number;
    /** Extra scale the artwork gains over its climb */
    zoom?: number;
    /** How far the card is scaled back while away from the centre */
    cardGrow?: number;
  }
) {
  const {
    enabled = true,
    refreshPriority = 0,
    scrollLength = 3.6,
    fadeHold = 0.3,
    zoom = 0.16,
    cardGrow = 0.12,
  } = options ?? {};
  if (!enabled) return null;

  const mask = reel.parentElement;
  if (!mask) return null;

  const slides = Array.from(reel.children) as HTMLElement[];
  if (!slides.length) return null;

  const films = slides.map((slide) => slide.querySelector("video"));
  const artworks = slides.map((slide) =>
    slide.querySelector<HTMLElement>("img, video")
  );

  const ease = (t: number) => t * t * (3 - 2 * t);

  let travel = 1;
  let maskHeight = 1;
  let centre = 1;
  let reach = 1;
  let centres: number[] = [];
  const playing = new Set<number>();

  const measure = () => {
    gsap.set(reel, { y: 0 });
    maskHeight = mask.clientHeight;

    /* Half a slide of padding either side: the reel opens and closes on a
       centred slide instead of a clipped one. */
    const lead = Math.max(
      (maskHeight - slides[0].getBoundingClientRect().height) / 2,
      0
    );
    gsap.set(reel, { paddingTop: lead, paddingBottom: lead });

    const reelTop = reel.getBoundingClientRect().top;
    centres = slides.map((slide) => {
      const rect = slide.getBoundingClientRect();
      return rect.top - reelTop + rect.height / 2;
    });

    centre = maskHeight / 2;
    reach = Math.max(centre * (1 - fadeHold), 1);
    travel = Math.max(reel.scrollHeight - maskHeight, 1);
  };

  const render = (progress: number) => {
    const y = -travel * clamp01(progress);
    gsap.set(reel, { y });

    slides.forEach((slide, i) => {
      const position = centres[i] + y;
      const offset = Math.abs(position - centre);
      const opacity = 1 - ease(clamp01((offset - centre * fadeHold) / reach));
      /* Full size only at the centre, so cards never grow into their
         neighbours however tight the column gets */
      gsap.set(slide, {
        opacity,
        scale: 1 - cardGrow * (1 - opacity),
        force3D: true,
      });

      /* 0 while the slide is still at the bottom of the mask, 1 by the time
         its centre reaches the top — the artwork grows across that climb. */
      const artwork = artworks[i];
      if (artwork) {
        const climb = clamp01((maskHeight - position) / maskHeight);
        gsap.set(artwork, { scale: 1 + zoom * climb, force3D: true });
      }

      const film = films[i];
      if (!film) return;
      const active = opacity > 0.12;
      if (active === playing.has(i)) return;
      if (active) {
        playing.add(i);
        void film.play().catch(() => undefined);
      } else {
        playing.delete(i);
        film.pause();
      }
    });
  };

  const reset = () => {
    measure();
    render(0);
  };

  reset();

  const state = { progress: 0 };
  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${Math.max(window.innerHeight * scrollLength, 2000)}`,
      pin: section,
      pinSpacing: true,
      scrub: 0.6,
      anticipatePin: 0.2,
      invalidateOnRefresh: true,
      refreshPriority,
      onRefreshInit: () => {
        state.progress = 0;
        reset();
      },
    },
  });

  tl.to(
    state,
    { progress: 1, duration: 1, onUpdate: () => render(state.progress) },
    0
  );

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
