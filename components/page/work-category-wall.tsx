"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { PORTFOLIO, WORK_GROUPS } from "@/lib/content";

/** Category tiles, split into the packaging and print families */
export function WorkCategoryWall() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="work-wall">
      {WORK_GROUPS.map((group) => {
        const categories = PORTFOLIO.filter((c) => c.group === group.key);
        if (!categories.length) return null;

        return (
          <section key={group.key} className="work-wall__group">
            <h3 className="work-wall__group-title">{group.title}</h3>
            <div className="work-wall__grid">
              {categories.map((category, index) => {
                const fromBelow = group.key === "print";
                const fromRight = group.key === "packaging" && index < 3;

                return (
                <motion.div
                  key={category.slug}
                  className="work-card-reveal"
                  initial={
                    reduceMotion
                      ? false
                      : {
                          x: fromBelow ? 0 : fromRight ? 150 : -150,
                          y: fromBelow ? 120 : 0,
                          opacity: 0,
                        }
                  }
                  whileInView={{ x: 0, y: 0, opacity: 1 }}
                  viewport={{ amount: 0.2, once: true }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.95,
                    delay: reduceMotion ? 0 : (index % 3) * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={`/work/${category.slug}`}
                    className="work-card"
                  >
                    <span className="work-card__media">
                      <Image
                        src={category.cover}
                        alt={category.title}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                        quality={90}
                        priority={index < 3}
                        className="work-card__image"
                      />
                    </span>
                    <span className="work-card__caption">
                      <span className="work-card__label">{category.menuLabel}</span>
                      <span className="work-card__cta">
                        Explore <span aria-hidden>→</span>
                      </span>
                    </span>
                  </Link>
                </motion.div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
