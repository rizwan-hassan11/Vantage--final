import type { RefObject } from "react";
import { HOME_PRINT_TECH } from "@/lib/content";
import { ScrollRail } from "@/components/scroll/scroll-rail";

type PrintTechProps = {
  sectionRef?: RefObject<HTMLDivElement | null>;
  railRef?: RefObject<HTMLDivElement | null>;
};

export function PrintTech({ sectionRef, railRef }: PrintTechProps) {
  return (
    <div ref={sectionRef} className="print-tech">
      <div className="print-tech__head">
        <p className="print-tech__badge">{HOME_PRINT_TECH.eyebrow}</p>
        <h2 className="print-tech__title">
          {HOME_PRINT_TECH.heading.split("\n").map((line) => (
            <span key={line} className="print-tech__title-line">
              {line}
            </span>
          ))}
        </h2>
      </div>

      <div className="print-tech__body-row">
        <div className="print-tech__copy">
          {HOME_PRINT_TECH.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <ScrollRail
          railRef={railRef}
          className="scroll-rail--tech"
          items={HOME_PRINT_TECH.items.map((item) => ({
            key: item.key,
            label: item.label,
            color: item.color,
            image: item.image,
            alt: item.alt,
          }))}
        />
      </div>
    </div>
  );
}
