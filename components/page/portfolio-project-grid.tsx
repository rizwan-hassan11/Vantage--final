import Image from "next/image";

const COL_SPANS = [
  "col-span-2 lg:col-span-3",
  "col-span-1 lg:col-span-2",
  "col-span-1 lg:col-span-3",
  "col-span-1 lg:col-span-2",
  "col-span-1 lg:col-span-2",
  "col-span-2 lg:col-span-3",
  "col-span-1 lg:col-span-2",
  "col-span-1 lg:col-span-2",
  "col-span-1 lg:col-span-3",
  "col-span-1 lg:col-span-2",
];

const ROW_HEIGHT = [
  "h-[200px] sm:h-[240px] lg:h-[320px]",
  "h-[180px] sm:h-[220px] lg:h-[320px]",
  "h-[180px] sm:h-[220px] lg:h-[320px]",
  "h-[180px] sm:h-[220px] lg:h-[320px]",
  "h-[180px] sm:h-[220px] lg:h-[320px]",
  "h-[200px] sm:h-[220px] lg:h-[280px]",
  "h-[180px] sm:h-[200px] lg:h-[280px]",
  "h-[180px] sm:h-[200px] lg:h-[280px]",
  "h-[180px] sm:h-[200px] lg:h-[280px]",
  "h-[180px] sm:h-[200px] lg:h-[280px]",
];

type PortfolioProjectGridProps = {
  categoryTitle: string;
  projects: string[];
};

export function PortfolioProjectGrid({
  categoryTitle,
  projects,
}: PortfolioProjectGridProps) {
  return (
    <div className="portfolio-project-grid grid grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-5">
      {projects.map((src, index) => {
        const patternIndex = index % COL_SPANS.length;
        return (
          <div
            key={`${src}-${index}`}
            className={`portfolio-project-tile group relative overflow-hidden bg-[color:var(--color-off)] ${COL_SPANS[patternIndex]} ${ROW_HEIGHT[patternIndex]}`}
          >
            <Image
              src={src}
              alt={`${categoryTitle} — project ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 30vw, 50vw"
              quality={95}
              priority={index < 2}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            <div className="portfolio-project-tile__overlay" aria-hidden />
          </div>
        );
      })}
    </div>
  );
}
