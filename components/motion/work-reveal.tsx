"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type WorkRevealProps = {
  children: ReactNode;
  className?: string;
  onMount?: boolean;
  distance?: number | string;
};

export function WorkReveal({
  children,
  className,
  onMount = false,
  distance = -180,
}: WorkRevealProps) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : { x: distance, opacity: 0 };
  const visible = { x: 0, opacity: 1 };

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={onMount ? visible : undefined}
      whileInView={onMount ? undefined : visible}
      viewport={onMount ? undefined : { amount: 0.25, once: true }}
      transition={{
        duration: reduceMotion ? 0 : 1.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
