"use client";

import Image from "next/image";
import { useState } from "react";
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

  return (
    <>
      <div className="portfolio-cat-grid">
        {projects.map((src, index) => (
          <article
            key={`${src}-${index}`}
            className="portfolio-cat-grid__item group"
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
          </article>
        ))}
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
