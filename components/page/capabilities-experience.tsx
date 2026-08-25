"use client";

import { useEffect, useRef, type RefObject } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { SERVICES_PAGE } from "@/lib/content";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

const SMOOTH_SPRING = { stiffness: 92, damping: 25, mass: 0.5 };

function useSectionExitStyle(
  sectionRef: RefObject<HTMLElement | null>,
  reduceMotion: boolean | null
) {
  const { scrollY } = useScroll();

  const progress = useTransform(scrollY, () => {
    if (reduceMotion || typeof window === "undefined") return 0;

    const nextSection = sectionRef.current?.nextElementSibling;
    if (!(nextSection instanceof HTMLElement)) return 0;

    const viewportHeight = window.innerHeight;
    const nextTop = nextSection.getBoundingClientRect().top;
    const fadeStart = viewportHeight * 0.98;
    const fadeEnd = viewportHeight * 0.62;
    const value = (fadeStart - nextTop) / (fadeStart - fadeEnd);

    return Math.max(0, Math.min(1, value));
  });
  const opacity = useTransform(progress, [0, 1], [1, 0.28]);
  const filter = useTransform(
    progress,
    [0, 0.35, 1],
    ["blur(0px)", "blur(2px)", "blur(14px)"]
  );

  return { opacity, filter };
}

const LABEL_LINES: Record<string, readonly string[]> = {
  design: ["Design &", "Prepress"],
  offset: ["Offset &", "UV Offset"],
  flexo: ["Flexo Labels", "& Sleeves"],
  screen: ["Screen", "Printing"],
  digital: ["Digital", "Printing"],
  finishing: ["Finishing &", "Converting"],
};

type IntroStageProps = {
  stage: typeof SERVICES_PAGE.hero | typeof SERVICES_PAGE.workflow;
  kind: "hero" | "workflow";
  level: "h1" | "h2";
  zIndex: number;
};

function IntroStage({ stage, kind, level, zIndex }: IntroStageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const exitStyle = useSectionExitStyle(sectionRef, reduceMotion);
  const headingX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.72, 1],
    [reduceMotion ? 0 : -150, 0, 0, reduceMotion ? 0 : -90]
  );
  const bodyX = useTransform(
    scrollYProgress,
    [0, 0.42, 0.78, 1],
    [reduceMotion ? 0 : 240, 0, 0, reduceMotion ? 0 : -85]
  );
  const bodyY = useTransform(
    scrollYProgress,
    [0, 0.42, 0.76, 1],
    [reduceMotion ? 0 : 32, 0, 0, reduceMotion ? 0 : -28]
  );
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.18, 1],
    [reduceMotion ? 1 : 0, 1, 1]
  );
  const bodyOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 1],
    [reduceMotion ? 1 : 0, 1, 1]
  );
  const smoothHeadingX = useSpring(headingX, SMOOTH_SPRING);
  const smoothBodyX = useSpring(bodyX, SMOOTH_SPRING);
  const smoothBodyY = useSpring(bodyY, SMOOTH_SPRING);
  const Heading = level;

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    if (reduceMotion) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.12 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className={`cap-stage cap-stage--${kind}`}
      data-scroll-section={kind === "hero" ? "hero" : undefined}
      data-nav-theme={kind === "hero" ? "over-media" : "solid"}
      style={{ zIndex }}
    >
      <video
        ref={videoRef}
        className="cap-stage__media"
        muted
        loop
        playsInline
        preload={kind === "hero" ? "auto" : "none"}
        poster="/vantage-images/Design Pre-Press/design-main.png"
        aria-label={
          kind === "hero"
            ? "Close view of paper fibres and material texture"
            : "Paper material with embedded fibres"
        }
      >
        <source src={stage.video} type="video/mp4" />
      </video>
      <span
        className={kind === "hero" ? "cap-stage__shade" : "cap-stage__wash"}
        aria-hidden
      />

      <motion.div
        className="cap-stage__content container-x"
        style={exitStyle}
      >
        <motion.div
          className="cap-stage__head"
          style={{ x: smoothHeadingX, opacity: headingOpacity }}
        >
          <motion.p
            className="cap-stage__badge"
            initial={reduceMotion ? false : { scaleX: 0, transformOrigin: "left" }}
            whileInView={{ scaleX: 1 }}
            viewport={{ amount: 0.6 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>{stage.eyebrow}</span>
          </motion.p>
          <Heading
            className={`cap-stage__title${
              kind === "hero" ? " cap-stage__title--light" : ""
            }`}
          >
            {stage.heading.map((line, index) => (
              <motion.span
                key={line}
                initial={reduceMotion ? false : { opacity: 0, x: -55 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ amount: 0.55 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {line}
              </motion.span>
            ))}
          </Heading>
        </motion.div>

        <motion.p
          className={`cap-stage__body${
            kind === "hero" ? " cap-stage__body--light" : ""
          }`}
          style={{
            x: smoothBodyX,
            y: smoothBodyY,
            opacity: bodyOpacity,
          }}
        >
          {stage.body.map((line) => (
            <span key={line} className="cap-stage__body-line">
              {line}
            </span>
          ))}
        </motion.p>
      </motion.div>

      <motion.div
        className="cap-project-cta"
        initial={reduceMotion ? false : { opacity: 0, x: 70 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.45 }}
        transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.35 }}
      >
        <LiquidMetalButton
          href="/start-a-project"
          label="Start a Project"
        />
      </motion.div>
    </section>
  );
}

type CapabilitySectionProps = {
  section: (typeof SERVICES_PAGE.sections)[number];
  index: number;
};

function CapabilitySection({ section, index }: CapabilitySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const exitStyle = useSectionExitStyle(sectionRef, reduceMotion);
  const titleX = useTransform(
    scrollYProgress,
    [0, 0.28, 0.74, 1],
    [reduceMotion ? 0 : -150, 0, 0, reduceMotion ? 0 : 110]
  );
  const copyY = useTransform(
    scrollYProgress,
    [0, 0.42, 0.78, 1],
    [
      reduceMotion ? 0 : index % 2 === 0 ? 28 : 82,
      0,
      0,
      reduceMotion ? 0 : -45,
    ]
  );
  const copyX = useTransform(
    scrollYProgress,
    [0, 0.42, 0.78, 1],
    [reduceMotion ? 0 : 285, 0, 0, reduceMotion ? 0 : -95]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.12, 1],
    [reduceMotion ? 1 : 0, 1, 1]
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? [1, 1, 1] : [1.08, 1, 1.06]
  );
  const smoothTitleX = useSpring(titleX, SMOOTH_SPRING);
  const smoothCopyX = useSpring(copyX, SMOOTH_SPRING);
  const smoothCopyY = useSpring(copyY, SMOOTH_SPRING);
  const smoothImageScale = useSpring(imageScale, {
    stiffness: 90,
    damping: 30,
    mass: 0.6,
  });
  const labelLines = LABEL_LINES[section.id] ?? [section.label];

  return (
    <section
      ref={sectionRef}
      id={section.id}
      className={`cap-service cap-service--${section.id} scroll-mt-20`}
      data-nav-theme="over-media"
      style={{ zIndex: index + 3 }}
      aria-labelledby={`cap-${section.id}-title`}
    >
      <motion.div
        className="cap-service__media"
        style={{ scale: smoothImageScale }}
      >
        <Image
          src={section.image}
          alt=""
          fill
          sizes="100vw"
          quality={80}
          priority={index === 0}
          className="cap-service__image"
        />
      </motion.div>
      <span className="cap-service__shade" aria-hidden />

      <motion.div
        className="cap-service__copy"
        style={exitStyle}
      >
        <motion.h2
          id={`cap-${section.id}-title`}
          className="cap-service__display"
          style={{ x: smoothTitleX, opacity }}
        >
          {labelLines.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </motion.h2>

        <motion.p
          className="cap-service__description"
          style={{ x: smoothCopyX, y: smoothCopyY, opacity }}
        >
          {section.heading.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </motion.p>
      </motion.div>

      <motion.div
        className="cap-project-cta"
        initial={reduceMotion ? false : { opacity: 0, x: 70 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.45 }}
        transition={{ duration: reduceMotion ? 0 : 0.8 }}
      >
        <LiquidMetalButton
          href="/start-a-project"
          label="Start a Project"
        />
      </motion.div>
    </section>
  );
}

export function CapabilitiesExperience() {
  const { hero, workflow, sections } = SERVICES_PAGE;

  return (
    <div className="cap-page">
      <IntroStage stage={hero} kind="hero" level="h1" zIndex={1} />
      <IntroStage stage={workflow} kind="workflow" level="h2" zIndex={2} />
      {sections.map((section, index) => (
        <CapabilitySection key={section.id} section={section} index={index} />
      ))}
    </div>
  );
}
