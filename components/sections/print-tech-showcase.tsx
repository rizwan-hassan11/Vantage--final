"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type CSSProperties } from "react";
import { HOME_PRINT_TECH } from "@/lib/content";

const MOBILE_SHOWCASE_IMAGES: Record<
  (typeof HOME_PRINT_TECH.items)[number]["key"],
  string
> = {
  offset: "/print-tech/offset-mobile.jpg",
  "uv-offset": "/print-tech/uv-offset-mobile.jpg",
  flexo: "/print-tech/flexo-mobile.jpg",
  screen: "/print-tech/screen-mobile.jpg",
  digital: "/print-tech/digital-mobile.jpg",
};

type ShowcasePanelProps = {
  item: (typeof HOME_PRINT_TECH.items)[number];
  index: number;
  count: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
};

function ShowcasePanel({
  item,
  index,
  count,
  progress,
  reducedMotion,
}: ShowcasePanelProps) {
  /* One extra scroll step is reserved after the final panel so Digital's
     image and copy remain fully visible before normal page flow resumes. */
  /* Reserve the first full step for Offset before UV Offset starts entering.
     Every following panel then gets an arrival phase plus a readable hold. */
  const step = 1 / (count + 1);
  const start = index * step;
  const end = start + step * 0.68;
  const x = useTransform(
    progress,
    index === 0 ? [0, 1] : [start, end],
    index === 0 ? ["0%", "0%"] : ["100%", "0%"]
  );
  const rawPanelOpacity = useTransform(
    progress,
    index === 0 ? [0, 1] : [start, end],
    index === 0 ? [1, 1] : [0, 1]
  );
  const panelOpacity = useSpring(rawPanelOpacity, {
    duration: 2,
    bounce: 0,
  });
  const imageScale = useTransform(
    progress,
    index === 0 ? [0, step] : [start, end],
    [1.08, 1]
  );
  const captionOpacity = useTransform(
    progress,
    index === 0
      ? [0, step * 0.14, step]
      : [start, start + step * 0.18, start + step * 0.66],
    [0, 1, 1]
  );
  const captionX = useTransform(
    progress,
    index === 0 ? [0, step * 0.55] : [start, end],
    [70, 0]
  );
  const captionY = useTransform(
    progress,
    index === 0 ? [0, step * 0.55] : [start, end],
    [-28, 0]
  );
  const infoOpacity = useTransform(
    progress,
    index === 0
      ? [0, step * 0.22, step * 0.7]
      : [start, start + step * 0.28, start + step * 0.75],
    [0, 0, 1]
  );
  const infoY = useTransform(
    progress,
    index === 0 ? [0, step * 0.7] : [start, end],
    [48, 0]
  );

  return (
    <motion.figure
      className="print-showcase__panel"
      style={{
        x: reducedMotion ? 0 : x,
        opacity: reducedMotion ? 1 : panelOpacity,
        zIndex: index + 1,
      }}
    >
      <motion.div
        className="print-showcase__media"
        style={{ scale: reducedMotion ? 1 : imageScale }}
      >
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={MOBILE_SHOWCASE_IMAGES[item.key]}
          />
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="100vw"
            quality={95}
            className="print-showcase__image"
          />
        </picture>
      </motion.div>
      <div className="print-showcase__shade" aria-hidden />
      <motion.figcaption
        className="print-showcase__caption"
        style={{
          x: reducedMotion ? 0 : captionX,
          y: reducedMotion ? 0 : captionY,
          opacity: reducedMotion ? 1 : captionOpacity,
        }}
      >
        <span>{String(index + 1).padStart(2, "0")}</span>
        <div className="print-showcase__caption-copy">
          <strong>{item.label}</strong>
          <small>{item.editorial.lead}</small>
        </div>
      </motion.figcaption>
      <motion.div
        className="print-showcase__info"
        style={{
          y: reducedMotion ? 0 : infoY,
          opacity: reducedMotion ? 1 : infoOpacity,
        }}
      >
        <div className="print-showcase__equipment">
          <strong className="print-showcase__machine">{item.spec}</strong>
          <span>{item.features}</span>
        </div>
        <div className="print-showcase__details">
          {"additional" in item && item.additional ? (
            <>
              <strong className="print-showcase__machine">
                {item.additional}
              </strong>
              {"additionalFeatures" in item && item.additionalFeatures ? (
                <span>{item.additionalFeatures}</span>
              ) : null}
            </>
          ) : null}
          <div className="print-showcase__editorial">
            <span>{item.editorial.body}</span>
            <em>{item.editorial.location}</em>
          </div>
        </div>
      </motion.div>
    </motion.figure>
  );
}

export function PrintTechShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={sectionRef}
      className={`print-showcase${
        reducedMotion ? " print-showcase--reduced" : ""
      }`}
      style={
        {
          "--showcase-height": `${
            (HOME_PRINT_TECH.items.length + 1) * 150
          }svh`,
        } as CSSProperties
      }
      aria-label="Vantage print technologies"
      data-nav-theme="over-media"
    >
      <div className="print-showcase__stage">
        {HOME_PRINT_TECH.items.map((item, index) => (
          <ShowcasePanel
            key={item.key}
            item={item}
            index={index}
            count={HOME_PRINT_TECH.items.length}
            progress={scrollYProgress}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </section>
  );
}
