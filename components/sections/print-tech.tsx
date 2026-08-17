import type { RefObject } from "react";
import { HOME_PRINT_TECH } from "@/lib/content";

type PrintTechProps = {
  sectionRef?: RefObject<HTMLDivElement | null>;
};

export function PrintTech({ sectionRef }: PrintTechProps) {
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
        <ol className="print-tech__services" aria-label="Print technologies">
          {HOME_PRINT_TECH.items.map((item, index) => (
            <li key={item.key} className={`print-tech__service is-${item.key}`}>
              <span className="print-tech__service-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="print-tech__service-name">{item.label}</span>
            </li>
          ))}
        </ol>

        <div className="print-tech__copy">
          {HOME_PRINT_TECH.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
