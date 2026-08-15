"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PortfolioLightbox } from "@/components/page/portfolio-lightbox";

type PortfolioProjectWallProps = {
  categoryTitle: string;
  projects: string[];
};

export function PortfolioProjectWall({
  categoryTitle,
  projects,
}: PortfolioProjectWallProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <>
      <div className="portfolio-cat-grid">
        {projects.map((src, index) => {
          const row = Math.floor(index / 4);
          const direction = row % 3;
          const initial =
            direction === 0
              ? { x: 150, y: 0, opacity: 0 }
              : direction === 1
                ? { x: -150, y: 0, opacity: 0 }
                : { x: 0, y: 110, opacity: 0 };

          return (
            <motion.article
              key={`${src}-${index}`}
              className="portfolio-cat-grid__item group"
              initial={reduceMotion ? false : initial}
              whileInView={{ x: 0, y: 0, opacity: 1 }}
              viewport={{ amount: 0.18, once: false }}
              transition={{
                duration: reduceMotion ? 0 : 0.75,
                delay: reduceMotion ? 0 : (index % 4) * 0.045,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <button
                type="button"
                className="portfolio-cat-grid__trigger"
                onClick={() => setActiveIndex(index)}
                aria-label={`Open ${categoryTitle} project ${index + 1}`}
              >
                <div className="portfolio-cat-grid__media">
                  <Image
                    src={src}
                    alt={`${categoryTitle} — project ${index + 1}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    quality={90}
                    priority={index < 4}
                    className="portfolio-cat-grid__image"
                  />
                </div>
              </button>
            </motion.article>
          );
        })}
      </div>

      {activeIndex !== null ? (
        <PortfolioLightbox
          images={projects}
          categoryTitle={categoryTitle}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onChange={setActiveIndex}
        />
      ) : null}
    </>
  );
}
