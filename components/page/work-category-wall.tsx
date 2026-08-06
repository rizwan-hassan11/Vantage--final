import Image from "next/image";
import Link from "next/link";
import { PORTFOLIO, WORK_GROUPS } from "@/lib/content";

/** Category tiles, split into the packaging and print families */
export function WorkCategoryWall() {
  return (
    <div className="work-wall">
      {WORK_GROUPS.map((group) => {
        const categories = PORTFOLIO.filter((c) => c.group === group.key);
        if (!categories.length) return null;

        return (
          <section key={group.key} className="work-wall__group">
            <h3 className="work-wall__group-title">{group.title}</h3>
            <div className="work-wall__grid">
              {categories.map((category, index) => (
                <Link
                  key={category.slug}
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
                  <span className="work-card__label">{category.menuLabel}</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
