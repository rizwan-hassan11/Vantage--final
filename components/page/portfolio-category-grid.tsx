import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioCategory } from "@/lib/content";

type PortfolioCategoryCardProps = {
  category: PortfolioCategory;
  priority?: boolean;
};

export function PortfolioCategoryCard({
  category,
  priority = false,
}: PortfolioCategoryCardProps) {
  return (
    <Link
      href={`/portfolio/${category.slug}`}
      className="portfolio-category-card group"
    >
      <div className="portfolio-category-card__media relative aspect-[4/3] overflow-hidden bg-[color:var(--color-off)]">
        <Image
          src={category.cover}
          alt={category.title}
          fill
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
          quality={95}
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
        <div className="portfolio-category-card__overlay" aria-hidden />
        <span className="portfolio-category-card__cta">
          View work
          <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden />
        </span>
      </div>

      <div className="portfolio-category-card__body">
        <div className="portfolio-category-card__meta">
          <span className="numeral text-[color:var(--color-mute-2)]">
            {category.number}
          </span>
          <span className="portfolio-category-card__count">
            {category.projects.length} projects
          </span>
        </div>
        <h3 className="portfolio-category-card__title">{category.title}</h3>
        <p className="portfolio-category-card__short">{category.short}</p>
      </div>
    </Link>
  );
}

type PortfolioCategoryGridProps = {
  categories: PortfolioCategory[];
};

export function PortfolioCategoryGrid({ categories }: PortfolioCategoryGridProps) {
  return (
    <div className="portfolio-category-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
      {categories.map((category, index) => (
        <PortfolioCategoryCard
          key={category.slug}
          category={category}
          priority={index < 3}
        />
      ))}
    </div>
  );
}
