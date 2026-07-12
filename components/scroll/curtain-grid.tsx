import { clsx } from "clsx";
import type { ReactNode } from "react";

type CurtainGridProps = {
  children: ReactNode;
  className?: string;
};

export function CurtainGrid({ children, className }: CurtainGridProps) {
  return (
    <div
      className={clsx(
        "curtain-grid container-x grid grid-cols-12 gap-x-4 lg:gap-x-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
