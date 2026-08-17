"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function RevealText({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <span className={cn("mask-reveal", className)}>
      <motion.span
        initial={reduced ? false : { y: "110%" }}
        whileInView={reduced ? undefined : { y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 1,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function RevealFromRight({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const triggerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(triggerRef, { amount: 0.35 });

  return (
    <div ref={triggerRef} className={className}>
      <motion.div
        initial={
          reduced
            ? false
            : {
                x: "100vw",
                opacity: 0,
                scaleX: 0.82,
                transformOrigin: "right",
              }
        }
        animate={
          reduced || inView
            ? { x: 0, opacity: 1, scaleX: 1 }
            : {
                x: "100vw",
                opacity: 0,
                scaleX: 0.82,
                transformOrigin: "right",
              }
        }
        transition={{
          duration: reduced ? 0 : 1.25,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
