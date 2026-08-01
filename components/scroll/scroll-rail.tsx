import Image from "next/image";
import type { CSSProperties, RefObject } from "react";

export type ScrollRailItem = {
  key: string;
  label: string;
  color: string;
  image: string;
  alt: string;
  /** Shown over the open panel — omit when the artwork carries its own */
  caption?: string;
  imagePosition?: string;
};

type ScrollRailProps = {
  railRef?: RefObject<HTMLDivElement | null>;
  items: readonly ScrollRailItem[];
  className?: string;
  sizes?: string;
};

/**
 * Collapsed colour tabs with one open panel. The open panel is chosen by
 * `createScrollRail`, which drives flex-grow from scroll position.
 */
export function ScrollRail({
  railRef,
  items,
  className,
  sizes = "(max-width: 1023px) 100vw, 70vw",
}: ScrollRailProps) {
  return (
    <div
      ref={railRef}
      className={className ? `scroll-rail ${className}` : "scroll-rail"}
    >
      {items.map((item) => (
        <div
          key={item.key}
          className="scroll-rail__item"
          style={{ "--rail-color": item.color } as CSSProperties}
        >
          <div className="scroll-rail__tab">
            <span className="scroll-rail__label">{item.label}</span>
          </div>

          <div className="scroll-rail__reveal" data-rail-reveal>
            <div className="scroll-rail__media">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes={sizes}
                quality={90}
                className="scroll-rail__image"
                style={
                  item.imagePosition
                    ? { objectPosition: item.imagePosition }
                    : undefined
                }
              />
              {item.caption ? (
                <p className="scroll-rail__caption">{item.caption}</p>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
