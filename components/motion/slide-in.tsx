"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type SlideInProps = {
  /** Side the block travels in from as it enters the viewport */
  from: "left" | "right";
  className?: string;
  children: ReactNode;
};

/**
 * Slides a self-contained block in from one side on the way down, and plays the
 * same move in reverse on the way back up.
 *
 * A block only resets once it has left through the bottom of the viewport, so
 * anything already read on the way down stays in place instead of sliding away
 * behind the reader.
 */
export function SlideIn({ from, className, children }: SlideInProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
        } else if (entry.boundingClientRect.top > 0) {
          setShown(false);
        }
      },
      { rootMargin: "-120px 0px -120px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  const hidden = { opacity: 0, x: from === "left" ? "-14%" : "14%" };
  const visible = { opacity: 1, x: "0%" };

  return (
    <motion.article
      ref={ref}
      className={className}
      initial={reduced ? false : hidden}
      animate={reduced ? undefined : shown ? visible : hidden}
      transition={{ duration: shown ? 1.05 : 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.article>
  );
}
