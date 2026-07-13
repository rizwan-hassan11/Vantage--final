import Image from "next/image";
import Link from "next/link";
import type { PortfolioCategory } from "@/lib/content";

type PortfolioCategoryWallProps = {
  categories: PortfolioCategory[];
};

export function PortfolioCategoryWall({
  categories,
}: PortfolioCategoryWallProps) {
  return (
    <div className="portfolio-wall__grid">
      {categories.map((category, index) => (
        <Link
          key={category.slug}
          href={`/portfolio/${category.slug}`}
          className="portfolio-wall-card group"
        >
          <div className="portfolio-wall-card__media">
            <Image
              src={category.cover}
              alt={category.title}
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
              quality={90}
              priority={index < 5}
              className="portfolio-wall-card__image"
            />
          </div>
          <h3 className="portfolio-wall-card__title">{category.title}</h3>
        </Link>
      ))}
    </div>
  );
}
