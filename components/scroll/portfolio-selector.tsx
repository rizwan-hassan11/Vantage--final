"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export type PortfolioSelectorItem = {
  title: string;
  image: string;
  href: string;
  key: string;
  previewSlideClassName?: string;
};

type PortfolioSelectorProps = {
  eyebrow: string;
  /** Optional serif heading shown above the body copy */
  heading?: string;
  /** May contain \n for line breaks */
  body: string;
  /** Running copy under the display lines */
  note?: string;
  cta: { label: string; href: string };
  items: PortfolioSelectorItem[];
  /** "display" = big serif lines (default); "paragraph" = smaller running copy */
  variant?: "display" | "paragraph";
};

export function PortfolioSelector({
  eyebrow,
  heading,
  body,
  note,
  cta,
  items,
  variant = "display",
}: PortfolioSelectorProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeAll = () => {
    setOpen(false);
    setActive(null);
  };

  return (
    <div className={`pf-selector pf-selector--${variant}`}>
      <div className="pf-selector__main">
        <div className="pf-selector__text">
          <p className="pf-selector__eyebrow">{eyebrow}</p>
          {heading ? (
            <h2 className="pf-selector__heading">{heading}</h2>
          ) : null}
          <p className="pf-selector__body">
            {body.split("\n").map((line) => (
              <span key={line} className="pf-selector__body-line">
                {line}
              </span>
            ))}
          </p>
          {note ? <p className="pf-selector__note">{note}</p> : null}
        </div>

        <div
          ref={dropdownRef}
          className={`pf-selector__dropdown${open ? " is-open" : ""}`}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={closeAll}
          onBlurCapture={(e) => {
            if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
              closeAll();
            }
          }}
        >
          <button
            type="button"
            className="pf-selector__toggle"
            aria-expanded={open}
            aria-controls="work-category-list"
            onClick={() => setOpen((v) => !v)}
          >
            <span>{cta.label}</span>
            <ChevronDown
              size={18}
              strokeWidth={1.5}
              className="pf-selector__chevron"
              aria-hidden
            />
          </button>

          <ul
            id="work-category-list"
            className="pf-selector__list"
            aria-hidden={!open}
          >
            {items.map((item, i) => (
              <li key={item.key} className="pf-selector__list-item">
                <Link
                  href={item.href}
                  tabIndex={open ? 0 : -1}
                  className={`pf-selector__link${
                    active === i ? " is-active" : ""
                  }`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className="pf-selector__link-title">{item.title}</span>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.4}
                    className="pf-selector__link-arrow"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className={`menu-preview pf-selector__preview${
          active !== null ? " is-revealed" : ""
        }`}
        aria-hidden={active === null}
      >
        {items.map((item, i) => (
          <div
            key={item.key}
            className={`menu-preview__slide${
              active === i ? " is-active" : ""
            }${
              item.previewSlideClassName ? ` ${item.previewSlideClassName}` : ""
            }`}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              quality={95}
              className="object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
