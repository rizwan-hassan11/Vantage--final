"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export type NumberedMenuItem = {
  number: string;
  title: string;
  image: string;
  key: string;
};

type NumberedMenuProps = {
  eyebrow: string;
  title: string;
  intro: string;
  items: NumberedMenuItem[];
  cta?: { label: string; href: string };
};

export function NumberedMenu({
  eyebrow,
  title,
  intro,
  items,
  cta,
}: NumberedMenuProps) {
  const [active, setActive] = useState(0);

  return (
    <>
      <header className="menu-header">
        <div>
          <p className="menu-header__eyebrow">/ {eyebrow}</p>
          <h2 className="menu-header__title mt-3">{title}</h2>
        </div>
        <p className="menu-header__intro">{intro}</p>
      </header>

      <div className="menu-grid">
        {/* Preview column — crossfading images tied to hovered item */}
        <div className="menu-preview">
          {items.map((item, i) => (
            <div
              key={item.key}
              className={`menu-preview__slide ${
                i === active ? "is-active" : ""
              }`}
              aria-hidden={i !== active}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* List column — numbered titles */}
        <ul className="menu-list">
          {items.map((item, index) => {
            const isActive = active === index;
            return (
              <li
                key={item.key}
                className="menu-list__item"
                onMouseEnter={() => setActive(index)}
              >
                <button
                  type="button"
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  aria-pressed={isActive}
                  className={`menu-list__button ${
                    isActive ? "is-active" : ""
                  }`}
                >
                  <span className="menu-list__num">{item.number}—</span>
                  <span className="menu-list__title">{item.title}</span>
                  <ArrowUpRight
                    size={20}
                    strokeWidth={1.4}
                    className="menu-list__arrow"
                    aria-hidden
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {cta && (
        <div className="menu-foot">
          <a
            href={cta.href}
            className="link-swipe text-white text-[13px] tracking-[0.14em] uppercase font-medium"
          >
            {cta.label}
          </a>
        </div>
      )}
    </>
  );
}
