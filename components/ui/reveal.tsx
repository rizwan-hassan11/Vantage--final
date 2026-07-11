"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
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
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
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
        initial={{ y: reduced ? 0 : "110%" }}
        whileInView={{ y: 0 }}
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
