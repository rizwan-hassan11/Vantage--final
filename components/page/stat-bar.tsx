import { cn } from "@/lib/utils";

export type StatItem = {
  value: string;
  suffix: string;
  label: string;
};

type StatBarProps = {
  stats: readonly StatItem[];
  className?: string;
};

export function StatBar({ stats, className }: StatBarProps) {
  return (
    <div className={cn("stat-bar", className)} role="list" aria-label="Key figures">
      {stats.map((stat, index) => (
        <div key={stat.label} className="stat-bar__item" role="listitem">
          <span className="stat-bar__index numeral" aria-hidden>
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="stat-bar__value">
            {stat.value}
            {stat.suffix ? (
              <span className="stat-bar__suffix">{stat.suffix}</span>
            ) : null}
          </p>
          <p className="stat-bar__label">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
