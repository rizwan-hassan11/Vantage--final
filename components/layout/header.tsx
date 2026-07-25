"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import {
  COMPANY,
  PORTFOLIO,
  SERVICES,
} from "@/lib/content";
import { getLenis } from "@/lib/gsap-setup";
import { cn } from "@/lib/utils";

/** Latest lockup for navbar (white + orange already in SVG) */
const NAV_LOGO_SRC = "/Vantage_latest.svg";
/** Overlay sits on a light blur — use lockup tinted brand orange */
const OVERLAY_LOGO_SRC = "/brand/vantage-lockup.png";

const HASH_ROUTE_MAP: Record<string, string> = {
  "#services": "/services",
  "#portfolio": "/portfolio",
  "#company": "/company",
  "#contact": "/contact",
  "#quote": "/quote",
  "#latest": "/portfolio",
};

function resolveHref(href: string, isHome: boolean) {
  if (!href.startsWith("#")) return href;
  if (isHome) return href;
  return HASH_ROUTE_MAP[href] ?? "/";
}

type OverlayChild = { label: string; href: string };
type OverlayLink = {
  label: string;
  href: string;
  children?: OverlayChild[];
};

const OVERLAY_LINKS: OverlayLink[] = [
  { label: "Home", href: "/" },
  {
    label: "Portfolio",
    href: "/portfolio",
    children: PORTFOLIO.map((p) => ({
      label: p.title,
      href: `/portfolio/${p.slug}`,
    })),
  },
  {
    label: "Services",
    href: "/services",
    children: SERVICES.map((s) => ({
      label: s.title,
      href: `/services/${s.slug}`,
    })),
  },
  {
    label: "Company",
    href: "/company",
    children: [
      { label: "About Vantage", href: "/company" },
      { label: "Our Team", href: "/company#our-team" },
      { label: "Clients", href: "/clients" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

function isLinkActive(href: string, pathname: string, isHome: boolean): boolean {
  const resolved = resolveHref(href, isHome);
  if (resolved === "/") return pathname === "/";
  if (resolved.startsWith("#")) return false;
  if (pathname === resolved) return true;
  return pathname.startsWith(`${resolved}/`);
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback((restoreFocus = true) => {
    getLenis()?.start();
    setOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (open) menu.removeAttribute("inert");
    else menu.setAttribute("inert", "");
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const background = Array.from(
      document.querySelectorAll<HTMLElement>("header, main, footer")
    );
    const lenis = getLenis();

    document.body.style.overflow = "hidden";
    lenis?.stop();
    background.forEach((element) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });

    const frame = requestAnimationFrame(() => closeButtonRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      background.forEach((element) => {
        element.inert = false;
        element.removeAttribute("aria-hidden");
      });
      lenis?.start();
    };
  }, [closeMenu, open]);

  useEffect(() => {
    closeMenu(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- close on route change only
  }, [pathname]);

  return (
    <>
      <header className="site-header">
        <div className="site-header__bar container-x">
          <Link
            href="/"
            className="site-header__brand"
            aria-label="Vantage — Home"
          >
            <Image
              src={NAV_LOGO_SRC}
              alt="Vantage — Think Beyond"
              width={333}
              height={139}
              className="site-header__logo"
              priority
            />
          </Link>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen(true)}
            className="site-header__menu"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="site-navigation-overlay"
          >
            <Menu strokeWidth={1.5} aria-hidden />
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        id="site-navigation-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={open ? undefined : true}
        data-lenis-prevent
        className={cn("nav-overlay", open && "is-open")}
      >
        <div className="nav-overlay__backdrop" aria-hidden />

        <div className="nav-overlay__top container-x">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => closeMenu()}
            className="nav-overlay__close"
            aria-label="Close menu"
          >
            <X size={28} strokeWidth={1.35} aria-hidden />
          </button>

          <Link
            href="/"
            className="nav-overlay__brand"
            onClick={() => closeMenu(false)}
            aria-label="Vantage — Home"
          >
            <Image
              src={OVERLAY_LOGO_SRC}
              alt="Vantage — Think Beyond"
              width={200}
              height={80}
              className="nav-overlay__logo"
              priority
            />
          </Link>

          <div className="nav-overlay__top-right">
            <a href={COMPANY.phoneHref} className="nav-overlay__phone">
              {COMPANY.phone}
            </a>
            <Link
              href="/quote"
              className="nav-overlay__quote"
              onClick={() => closeMenu(false)}
            >
              Start a Project
            </Link>
          </div>
        </div>

        <div className="nav-overlay__body container-x">
          <nav className="nav-overlay__nav" aria-label="Primary">
            {OVERLAY_LINKS.map((link, i) => {
              const href = resolveHref(link.href, isHome);
              const active = isLinkActive(link.href, pathname, isHome);
              const children = link.children;
              return (
                <div
                  key={link.href}
                  className={cn(
                    "nav-overlay__group",
                    active && "is-active",
                    children?.length && "has-children"
                  )}
                >
                  <Link
                    href={href}
                    onClick={() => closeMenu(false)}
                    className={cn("nav-overlay__link", active && "is-active")}
                  >
                    <span className="nav-overlay__link-label">{link.label}</span>
                    <span className="nav-overlay__link-num numeral">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                  {children?.length ? (
                    <ul className="nav-overlay__sub" role="list">
                      {children.map((child) => {
                        const childActive =
                          pathname === child.href ||
                          pathname.startsWith(`${child.href}/`);
                        return (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => closeMenu(false)}
                              className={cn(
                                "nav-overlay__sub-link",
                                childActive && "is-active"
                              )}
                            >
                              {child.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <aside className="nav-overlay__meta">
            <div className="nav-overlay__meta-block">
              <p className="nav-overlay__meta-label">Location</p>
              <p className="nav-overlay__meta-value">Lahore, Pakistan</p>
            </div>
            <div className="nav-overlay__meta-block">
              <p className="nav-overlay__meta-label">Phone</p>
              <a
                href={COMPANY.phoneHref}
                className="nav-overlay__meta-value nav-overlay__meta-value--link"
              >
                {COMPANY.phone}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
