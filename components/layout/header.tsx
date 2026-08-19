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
const NAV_WORDMARK_SRC = "/vantage-svg-logos/vantage-mark.svg";

const MENU_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Capabilities", href: "/capabilities" },
  { label: "About Vantage", href: "/company" },
  { label: "Start a Project", href: "/start-a-project" },
  { label: "Contact Vantage", href: "/start-a-project#site-footer" },
] as const;

function isLinkActive(href: string, pathname: string): boolean {
  if (href.includes("#")) return false;
  const pageHref = href.split("#")[0];
  if (pageHref === "/") return pathname === "/";
  return pathname === pageHref || pathname.startsWith(`${pageHref}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [tucked, setTucked] = useState(false);
  const [homeCompact, setHomeCompact] = useState(false);
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
        return;
      }

      if (event.key === "Tab") {
        const focusable = [
          menuButtonRef.current,
          ...(panelRef.current?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          ) ?? []),
        ].filter((element): element is HTMLElement => Boolean(element));
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

  /* Keep the page behind the compact menu still on touch devices. */
  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    });
    return () => cancelAnimationFrame(frame);
  }, [open]);

  /* On the homepage the bar belongs exclusively to the hero. Inner pages keep
     their directional reveal behaviour. The bar itself remains transparent. */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const EDGE = 96;
    /* enough movement to read as intent, not a rubber-band wobble */
    const DIR_THRESHOLD = 6;
    const isInnerPage = pathname !== "/";
    const isWorkLanding = pathname === "/work";
    const usesSectionTheme =
      pathname === "/capabilities" ||
      pathname === "/start-a-project" ||
      pathname === "/company";

    let pastHero = false;
    let scrollingUp = false;
    let lastY = window.scrollY;
    let lastTucked: boolean | null = null;
    let lastHomeCompact: boolean | null = null;
    let lastInk: boolean | null = null;
    let scrollFrame = 0;

    /* Pinned heroes reserve their spacer inside the section, so its bottom
       edge is where the chapter is genuinely finished. Pages without one
       (Work, category grids) treat the bar as already past the hero — tucked
       until the pointer finds the top edge. */
    const hero = document.querySelector<HTMLElement>(
      '[data-scroll-section="hero"]'
    );
    const howSection = document.querySelector<HTMLElement>(
      ".white-curtain--how-we-make"
    );
    const howFilm = document.querySelector<HTMLElement>(".how-we-make__film");
    const heroBottom = () => (hero ? hero.getBoundingClientRect().bottom : 0);

    const capabilityTheme = () => {
      if (!usesSectionTheme) return null;
      const layers = document.elementsFromPoint(
        Math.max(1, window.innerWidth / 2),
        Math.min(96, Math.max(1, window.innerHeight - 1))
      );
      for (const layer of layers) {
        const section = layer.closest<HTMLElement>("[data-nav-theme]");
        const theme = section?.dataset.navTheme;
        if (theme === "solid" || theme === "over-media") return theme;
      }
      return null;
    };

    const apply = () => {
      const howRect = howSection?.getBoundingClientRect();
      const howActive = Boolean(
        howRect && howRect.top <= EDGE && howRect.bottom > EDGE
      );
      const heroHalfPassed = hero
        ? window.scrollY >=
          hero.offsetTop + Math.min(hero.offsetHeight, window.innerHeight) * 0.5
        : true;
      const filmVisible =
        howFilm &&
        Number.parseFloat(window.getComputedStyle(howFilm).opacity || "0") >
          0.05;

      const nextTucked = isWorkLanding
        ? pastHero
        : isInnerPage
          ? window.scrollY > EDGE && !scrollingUp
          : heroHalfPassed && !howActive;
      const nextHomeCompact = !isInnerPage && howActive;
      const nextInk = isInnerPage
        ? usesSectionTheme
          ? capabilityTheme() === "solid"
          : !hero || pastHero
        : howActive && !filmVisible;
      if (nextTucked !== lastTucked) {
        lastTucked = nextTucked;
        setTucked(nextTucked);
      }
      if (nextHomeCompact !== lastHomeCompact) {
        lastHomeCompact = nextHomeCompact;
        setHomeCompact(nextHomeCompact);
        if (nextHomeCompact) setOpen(false);
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
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        pastHero = hero ? heroBottom() <= EDGE : true;
        apply();
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
    };
  }, [pathname]);

  const isHome = pathname === "/";
  const isCapabilities = pathname === "/capabilities";
  const isCompany = pathname === "/company";
  const isStartProject = pathname === "/start-a-project";

  return (
    <header
      className={cn(
        "site-header",
        isHome && "site-header--home",
        isCapabilities && "site-header--capabilities",
        isCompany && "site-header--company",
        isStartProject && "site-header--start-project",
        isHome && homeCompact && "site-header--home-compact",
        tucked && !open && "site-header--tucked",
        ink && !open && "site-header--ink"
      )}
    >
      <div className="site-header__bar container-x">
        <Link href="/" className="site-header__brand" aria-label="Vantage — Home">
          <Image
            src={isHome && !homeCompact ? NAV_LOGO_SRC : NAV_WORDMARK_SRC}
            alt={isHome && !homeCompact ? "Vantage — Think Beyond" : "Vantage"}
            width={isHome && !homeCompact ? 333 : 360}
            height={isHome && !homeCompact ? 139 : 101}
            className={cn(
              "site-header__logo",
              (!isHome || homeCompact) && "site-header__logo--wordmark"
            )}
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

          {open ? (
            <div
              ref={panelRef}
              id="site-navigation"
              className="nav-menu__panel is-open"
            >
              <nav aria-label="Primary">
                <ul className="nav-menu__list" role="list">
                  {MENU_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => closeMenu(false)}
                        aria-current={
                          isLinkActive(link.href, pathname) ? "page" : undefined
                        }
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
                  href="/start-a-project"
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
          ) : null}
        </div>
      </div>
    </header>
  );
}
