"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export type NumberedMenuItem = {
  number: string;
  title: string;
  image: string;
  key: string;
  href?: string;
};

type NumberedMenuProps = {
  eyebrow: string;
  title: string;
  intro: string;
  items: NumberedMenuItem[];
  cta?: { label: string; href: string };
  onActiveChange?: (index: number) => void;
  /** Auto-cycle slides with a crossfade merge (not a slide carousel). */
  autoPlay?: boolean;
  autoPlayInterval?: number;
};

export function NumberedMenu({
  eyebrow,
  title,
  intro,
  items,
  cta,
  onActiveChange,
  autoPlay = true,
  autoPlayInterval = 5000,
}: NumberedMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActiveState] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);

  const setActive = useCallback((index: number) => {
    setActiveState(index);
  }, []);

  // Keep chapter background layers in sync.
  useEffect(() => {
    onActiveChange?.(active);
  }, [active, onActiveChange]);

  // Only auto-play when the section is on screen.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Auto merge — crossfade to the next item on an interval.
  useEffect(() => {
    if (!autoPlay || paused || !inView || items.length <= 1) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const id = window.setInterval(() => {
      setActiveState((prev) => (prev + 1) % items.length);
    }, autoPlayInterval);

    return () => window.clearInterval(id);
  }, [autoPlay, autoPlayInterval, inView, items.length, paused]);

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

  return (
    <div
      ref={rootRef}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) resume();
      }}
    >
      <header className="menu-header">
        <div>
          <p className="menu-header__eyebrow">/ {eyebrow}</p>
          <h2 className="menu-header__title mt-2 lg:mt-3">{title}</h2>
        </div>
        <p className="menu-header__intro">{intro}</p>
      </header>

      <div className="menu-grid">
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
                quality={95}
                className="object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        <ul className="menu-list">
          {items.map((item, index) => {
            const isActive = active === index;
            return (
              <li
                key={item.key}
                className="menu-list__item"
                onMouseEnter={() => setActive(index)}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    onFocus={() => setActive(index)}
                    aria-current={isActive ? "true" : undefined}
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
                  </Link>
                ) : (
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
                )}
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
    </div>
  );
}
