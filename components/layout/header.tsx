"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { NAV_LINKS, COMPANY, SERVICES, PORTFOLIO } from "@/lib/content";
import { getLenis } from "@/lib/gsap-setup";
import {
  NAV_THEME_EVENT,
  setNavTheme,
  type NavTheme,
} from "@/lib/scroll-coordination";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/brand/vantage-logo.svg";

// Route-aware href resolver: hash anchors only exist on the home page,
// so on inner pages we map them to their dedicated routes.
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

type NavDropdownItem = { label: string; href: string };

const COMPANY_DROPDOWN: NavDropdownItem[] = [
  { label: "About Vantage", href: "/company" },
  { label: "Clients", href: "/clients" },
  { label: "Partners", href: "/partners" },
];

function getNavDropdown(href: string): NavDropdownItem[] | null {
  if (href === "/services") {
    return SERVICES.map((s) => ({
      label: s.title,
      href: `/services/${s.slug}`,
    }));
  }
  if (href === "/portfolio") {
    return PORTFOLIO.map((p) => ({
      label: p.title,
      href: `/portfolio/${p.slug}`,
    }));
  }
  if (href === "/company") {
    return COMPANY_DROPDOWN;
  }
  return null;
}

function isNavSectionActive(
  href: string,
  pathname: string,
  isHome: boolean
): boolean {
  const resolved = resolveHref(href, isHome);
  if (resolved.startsWith("#")) return false;
  if (pathname === resolved) return true;
  if (resolved !== "/" && pathname.startsWith(`${resolved}/`)) return true;
  return false;
}

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<NavTheme>("solid");
  const overMedia = theme === "over-media";

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only the home page runs the scroll-driven media theme.
    // All other routes are always solid.
    if (!isHome) {
      setNavTheme("solid");
      setTheme("solid");
    }
  }, [isHome, pathname]);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<NavTheme>).detail;
      if (detail) setTheme(detail);
    };
    window.addEventListener(NAV_THEME_EVENT, handler);
    return () => window.removeEventListener(NAV_THEME_EVENT, handler);
  }, []);

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
    if (open) {
      menu.removeAttribute("inert");
    } else {
      menu.setAttribute("inert", "");
    }
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

  const linkColor = overMedia
    ? "text-white hover:text-white/80"
    : "text-[color:var(--color-ink)] hover:text-[color:var(--color-ink-2)]";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-300 ease-in-out",
          overMedia
            ? "bg-transparent border-none shadow-none"
            : "bg-white border-b border-[color:var(--color-hairline)] shadow-none"
        )}
      >
        <div className="container-x flex items-center h-12 lg:h-14">
          <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="Vantage — Home"
          >
            <Image
              src={LOGO_SRC}
              alt="Vantage"
              width={148}
              height={42}
              className={cn(
                "h-8 lg:h-9 w-auto transition-[filter] duration-300 ease-in-out",
                overMedia ? "brightness-0 invert" : "brightness-0"
              )}
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-7 flex-1">
            {NAV_LINKS.map((link) => {
              const href = resolveHref(link.href, isHome);
              const isActive = isNavSectionActive(link.href, pathname, isHome);

              const dropdown = getNavDropdown(link.href);

              if (dropdown) {
                return (
                  <div key={link.href} className="relative group">
                    <Link
                      href={href}
                      className={cn(
                        "nav-link inline-flex items-center gap-1 transition-colors duration-300 ease-in-out",
                        linkColor,
                        isActive && "is-active"
                      )}
                    >
                      {link.label}
                      <ChevronDown
                        size={12}
                        strokeWidth={1.8}
                        className="transition-transform duration-300 group-hover:rotate-180"
                      />
                    </Link>
                    <div
                      className={cn(
                        "absolute left-1/2 -translate-x-1/2 top-full pt-3",
                        "opacity-0 invisible pointer-events-none",
                        "group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto",
                        "focus-within:opacity-100 focus-within:visible focus-within:pointer-events-auto",
                        "transition-[opacity,visibility] duration-200"
                      )}
                    >
                      <div className="nav-dropdown-panel">
                        {dropdown.map((item) => (
                          <Link
                            key={`${link.href}-${item.label}`}
                            href={item.href}
                            className={cn(
                              "nav-dropdown-item",
                              pathname === item.href && "is-active"
                            )}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={href}
                  className={cn(
                    "nav-link transition-colors duration-300 ease-in-out",
                    linkColor,
                    isActive && "is-active"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-5 shrink-0 ml-auto">
            <Link
              href={resolveHref("#quote", isHome)}
              className={cn(
                "nav-link transition-colors duration-300 ease-in-out",
                linkColor,
                pathname === "/quote" && "is-active"
              )}
            >
              Get a Quote
            </Link>
          </div>

          <button
            ref={menuButtonRef}
            onClick={() => setOpen(true)}
            className={cn(
              "lg:hidden ml-auto inline-flex items-center justify-center w-10 h-10 transition-colors duration-300",
              overMedia ? "text-white" : "text-[color:var(--color-ink)]"
            )}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={open ? undefined : true}
        data-lenis-prevent
        className={cn(
          "fixed inset-0 z-[60] bg-white flex flex-col transition-opacity duration-500 lg:hidden",
          open
            ? "visible opacity-100 pointer-events-auto"
            : "invisible opacity-0 pointer-events-none"
        )}
      >
        <div className="container-x flex items-center h-12 lg:h-14">
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <Image
              src={LOGO_SRC}
              alt="Vantage"
              width={148}
              height={42}
              className="h-8 w-auto"
            />
          </Link>
          <button
            ref={closeButtonRef}
            onClick={() => closeMenu()}
            className="ml-auto inline-flex items-center justify-center w-10 h-10 text-[color:var(--color-rust)]"
            aria-label="Close menu"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="container-x flex-1 overflow-y-auto flex flex-col gap-1 py-6 sm:py-10">
          {NAV_LINKS.map((link, i) => {
            const href = resolveHref(link.href, isHome);

            const sublist = getNavDropdown(link.href);

            return (
              <div
                key={link.href}
                className="border-t border-[color:var(--color-hairline)] last:border-b py-4"
              >
                <Link
                  href={href}
                  onClick={() => closeMenu(false)}
                  className="flex items-baseline gap-4"
                >
                  <span className="numeral text-[10px] text-[color:var(--color-mute-2)] w-6 tracking-widest">
                    0{i + 1}
                  </span>
                  <span className="serif-italic text-2xl sm:text-3xl text-[color:var(--color-rust)]">
                    {link.label}
                  </span>
                </Link>
                {sublist && (
                  <ul className="mt-3 pl-10 flex flex-col gap-2">
                    {sublist.map((item) => (
                      <li key={`${link.href}-${item.label}`}>
                        <Link
                          href={item.href}
                          onClick={() => closeMenu(false)}
                          className="text-sm text-[color:var(--color-ink)] font-serif italic hover:text-[color:var(--color-rust)]"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>
        <div className="container-x py-5 sm:py-6 border-t border-[color:var(--color-hairline)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-col gap-1 text-xs text-[color:var(--color-mute)]">
            <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
            <a href={COMPANY.emailHref}>{COMPANY.email}</a>
          </div>
          <Link
            href={resolveHref("#quote", isHome)}
            onClick={() => closeMenu(false)}
            className="btn-pill btn-pill-rust self-start sm:self-auto"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </>
  );
}
