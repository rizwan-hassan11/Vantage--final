"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { COMPANY } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Latest lockup for navbar (white + orange already in SVG) */
const NAV_LOGO_SRC = "/Vantage_latest.svg";

const MENU_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Company", href: "/company" },
  { label: "Our Team", href: "/core-team" },
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

function isLinkActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [tucked, setTucked] = useState(false);
  /* Over light page content the white lockup flips to ink so it stays readable
     without a solid bar behind it. */
  const [ink, setInk] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  }, []);

  /* Dropdown dismissal: Escape, a click outside, or moving to another page */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (menuButtonRef.current?.contains(target)) return;
      closeMenu(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [closeMenu, open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* Past the hero the bar tucks away: with a fine pointer it peeks back at the
     top edge, on touch it returns as soon as you scroll up. The bar itself stays
     transparent everywhere — on light pages (and once past a media hero) the
     lockup and menu switch to ink so they still read. */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const EDGE = 96;
    /* enough movement to read as intent, not a rubber-band wobble */
    const DIR_THRESHOLD = 6;
    const fineHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    let pastHero = false;
    let atEdge = false;
    let scrollingUp = false;
    let lastY = window.scrollY;
    let lastTucked: boolean | null = null;
    let lastInk: boolean | null = null;

    /* Pinned heroes reserve their spacer inside the section, so its bottom
       edge is where the chapter is genuinely finished. Pages without one
       (Work, category grids) treat the bar as already past the hero — tucked
       until the pointer finds the top edge. */
    const hero = document.querySelector<HTMLElement>(
      '[data-scroll-section="hero"]'
    );
    const heroBottom = () => (hero ? hero.getBoundingClientRect().bottom : 0);

    const apply = () => {
      const nextTucked = pastHero && (fineHover ? !atEdge : !scrollingUp);
      const nextInk = !hero || pastHero;
      if (nextTucked !== lastTucked) {
        lastTucked = nextTucked;
        setTucked(nextTucked);
      }
      if (nextInk !== lastInk) {
        lastInk = nextInk;
        setInk(nextInk);
      }
    };

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) >= DIR_THRESHOLD) {
        scrollingUp = delta < 0;
        lastY = y;
      }
      /* No media hero → always tucked unless the pointer is at the top edge
         (or, on touch, until the user scrolls up). */
      pastHero = hero ? heroBottom() <= EDGE : true;
      apply();
    };

    const onPointerMove = (event: PointerEvent) => {
      const next = event.clientY <= EDGE;
      if (next === atEdge) return;
      atEdge = next;
      apply();
    };

    /* Leaving the window entirely counts as leaving the edge */
    const onPointerLeave = () => {
      if (!atEdge) return;
      atEdge = false;
      apply();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (fineHover) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [pathname]);

  return (
    <header
      className={cn(
        "site-header",
        tucked && !open && "site-header--tucked",
        ink && !open && "site-header--ink"
      )}
    >
      <div className="site-header__bar container-x">
        <Link href="/" className="site-header__brand" aria-label="Vantage — Home">
          <Image
            src={NAV_LOGO_SRC}
            alt="Vantage — Think Beyond"
            width={333}
            height={139}
            className="site-header__logo"
            priority
          />
        </Link>

        <div className="nav-menu">
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="site-header__menu"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="site-navigation"
          >
            {open ? (
              <X strokeWidth={1.5} aria-hidden />
            ) : (
              <Menu strokeWidth={1.5} aria-hidden />
            )}
          </button>

          <div
            ref={panelRef}
            id="site-navigation"
            className={cn("nav-menu__panel", open && "is-open")}
            hidden={!open}
          >
            <nav aria-label="Primary">
              <ul className="nav-menu__list" role="list">
                {MENU_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => closeMenu(false)}
                      className={cn(
                        "nav-menu__link",
                        isLinkActive(link.href, pathname) && "is-active"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="nav-menu__foot">
              <Link
                href="/quote"
                onClick={() => closeMenu(false)}
                className="nav-menu__cta"
              >
                Start a Project
              </Link>
              <a href={COMPANY.phoneHref} className="nav-menu__phone">
                {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
