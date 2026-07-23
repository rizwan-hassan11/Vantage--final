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
  /** Extra class on the preview slide (e.g. tighter crop for one cover) */
  previewSlideClassName?: string;
};

type NumberedMenuProps = {
  /** Optional — client feedback: remove section title/intro from orange card */
  eyebrow?: string;
  title?: string;
  intro?: string;
  items: NumberedMenuItem[];
  cta?: { label: string; href: string };
  onActiveChange?: (index: number) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  /** "plain" = hyphen list (Hemlock reference); "numbered" = 01— style */
  listStyle?: "plain" | "numbered";
  /**
   * Card preview stays empty until a list item is hovered/focused.
   * Background rotation (parent) stays independent.
   */
  previewOnHoverOnly?: boolean;
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
  listStyle = "plain",
  previewOnHoverOnly = false,
}: NumberedMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActiveState] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(false);

  const setActive = useCallback((index: number) => {
    setActiveState(index);
  }, []);

  useEffect(() => {
    onActiveChange?.(active);
  }, [active, onActiveChange]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const sync = () => setCoarsePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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
  const showHeader = Boolean(eyebrow || title || intro);
  const showPreview = previewOnHoverOnly ? hovered || coarsePointer : true;

  const activateItem = (index: number) => {
    setActive(index);
    if (previewOnHoverOnly) setHovered(true);
  };

  const clearHoverPreview = () => {
    if (previewOnHoverOnly) setHovered(false);
  };

  return (
    <div
      ref={rootRef}
      className={`numbered-menu numbered-menu--${listStyle}${
        previewOnHoverOnly ? " numbered-menu--preview-hover" : ""
      }`}
      onMouseEnter={autoPlay ? pause : undefined}
      onMouseLeave={() => {
        if (autoPlay) resume();
        clearHoverPreview();
      }}
      onFocusCapture={autoPlay ? pause : undefined}
      onBlurCapture={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node)) {
          if (autoPlay) resume();
          clearHoverPreview();
        }
      }}
    >
      {showHeader ? (
        <header className="menu-header">
          <div>
            {eyebrow ? (
              <p className="menu-header__eyebrow">/ {eyebrow}</p>
            ) : null}
            {title ? (
              <h2 className="menu-header__title mt-2 lg:mt-3">{title}</h2>
            ) : null}
          </div>
          {intro ? <p className="menu-header__intro">{intro}</p> : null}
        </header>
      ) : null}

      <div className="menu-grid menu-grid--hemlock">
        <ul className="menu-list">
          {items.map((item, index) => {
            const isActive = previewOnHoverOnly
              ? hovered && active === index
              : active === index;
            const label =
              listStyle === "numbered" ? (
                <>
                  <span className="menu-list__num">{item.number}—</span>
                  <span className="menu-list__title">{item.title}</span>
                </>
              ) : (
                <>
                  <span className="menu-list__bullet" aria-hidden>
                    –
                  </span>
                  <span className="menu-list__title">{item.title}</span>
                </>
              );

            return (
              <li
                key={item.key}
                className="menu-list__item"
                onMouseEnter={() => activateItem(index)}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    onFocus={() => activateItem(index)}
                    aria-current={isActive ? "true" : undefined}
                    className={`menu-list__button ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    {label}
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.4}
                      className="menu-list__arrow"
                      aria-hidden
                    />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onFocus={() => activateItem(index)}
                    onClick={() => activateItem(index)}
                    aria-pressed={isActive}
                    className={`menu-list__button ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    {label}
                    <ArrowUpRight
                      size={18}
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

        <div
          className={`menu-preview${showPreview ? " is-revealed" : ""}`}
          aria-live="polite"
          aria-hidden={!showPreview}
        >
          {items.map((item, i) => (
            <div
              key={item.key}
              className={`menu-preview__slide ${
                showPreview && i === active ? "is-active" : ""
              }${
                item.previewSlideClassName
                  ? ` ${item.previewSlideClassName}`
                  : ""
              }`}
              aria-hidden={!showPreview || i !== active}
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
      </div>

      {cta ? (
        <div className="menu-foot">
          <a href={cta.href} className="hero-cta menu-foot__cta">
            {cta.label}
          </a>
        </div>
      ) : null}
    </div>
  );
}
