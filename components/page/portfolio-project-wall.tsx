"use client";

import Image from "next/image";
import { useState } from "react";
import type { CSSProperties } from "react";
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
  const desktopRows = Math.ceil(projects.length / 5);
  const mobileRows = Math.ceil(projects.length / 2);

  return (
    <>
      <div
        className="portfolio-wall__grid portfolio-project-wall"
        style={
          {
            "--wall-rows": mobileRows,
            "--wall-rows-md": desktopRows,
          } as CSSProperties
        }
      >
        {projects.map((src, index) => (
          <article
            key={`${src}-${index}`}
            className="portfolio-wall-card portfolio-project-wall__item group"
          >
            <button
              type="button"
              className="portfolio-project-wall__trigger"
              onClick={() => setActiveIndex(index)}
              aria-label={`Open ${categoryTitle} project ${index + 1}`}
            >
              <div className="portfolio-wall-card__media">
                <Image
                  src={src}
                  alt={`${categoryTitle} — project ${index + 1}`}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  quality={90}
                  priority={index < 5}
                  className="portfolio-wall-card__image"
                />
              </div>
              <p className="portfolio-project-wall__index numeral" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </p>
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
