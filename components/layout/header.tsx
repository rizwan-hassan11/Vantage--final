"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, COMPANY } from "@/lib/content";
import { getLenis } from "@/lib/gsap-setup";
import {
  NAV_THEME_EVENT,
  setNavTheme,
  type NavTheme,
} from "@/lib/scroll-coordination";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/brand/vantage-logo.svg";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [theme, setTheme] = useState<NavTheme>(isHome ? "over-media" : "solid");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setTheme("solid");
      setNavTheme("solid");
    }
  }, [isHome, pathname]);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const overMedia = theme === "over-media";

  const closeMenu = useCallback((restoreFocus = true) => {
    getLenis()?.start();
    setOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => menuButtonRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    const onTheme = (e: Event) => {
      const detail = (e as CustomEvent<NavTheme>).detail;
      if (detail) setTheme(detail);
    };

    window.addEventListener(NAV_THEME_EVENT, onTheme);
    return () => window.removeEventListener(NAV_THEME_EVENT, onTheme);
  }, []);

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
    : "text-[color:var(--color-rust)] hover:text-[color:var(--color-rust-2)]";

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
        <div className="container-x flex items-center h-16 lg:h-[72px]">
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
                overMedia && "brightness-0 invert"
              )}
              priority
            />
          </Link>

          <nav className="hidden xl:flex items-center justify-center gap-7 flex-1">
            {NAV_LINKS.map((link) => {
              const href =
                link.href.startsWith("#") && !isHome ? `/${link.href}` : link.href;
              return (
                <Link
                  key={link.href}
                  href={href}
                  className={cn(
                    "nav-link transition-colors duration-300 ease-in-out",
                    linkColor
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden xl:flex items-center gap-5 shrink-0 ml-auto">
            <a
              href="#quote"
              className={cn(
                "nav-link transition-colors duration-300 ease-in-out",
                linkColor
              )}
            >
              Submit Files
            </a>
            <span
              className={cn(
                "w-px h-3 transition-colors duration-300",
                overMedia ? "bg-white/40" : "bg-[color:var(--color-rust)]/30"
              )}
            />
            <a
              href="#quote"
              className={cn(
                "nav-link transition-colors duration-300 ease-in-out",
                linkColor
              )}
            >
              Get a Quote
            </a>
          </div>

          <button
            ref={menuButtonRef}
            onClick={() => setOpen(true)}
            className={cn(
              "xl:hidden ml-auto inline-flex items-center justify-center w-10 h-10 transition-colors duration-300",
              overMedia ? "text-white" : "text-[color:var(--color-rust)]"
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
        aria-hidden={!open}
        inert={!open}
        data-lenis-prevent
        className={cn(
          "fixed inset-0 z-[60] bg-white flex flex-col transition-opacity duration-500 xl:hidden",
          open
            ? "visible opacity-100 pointer-events-auto"
            : "invisible opacity-0 pointer-events-none"
        )}
      >
        <div className="container-x flex items-center h-16">
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
        <nav className="container-x flex-1 flex flex-col justify-center gap-1 py-10">
          {NAV_LINKS.map((link, i) => {
            const href =
              link.href.startsWith("#") && !isHome ? `/${link.href}` : link.href;
            return (
              <Link
                key={link.href}
                href={href}
                onClick={() => closeMenu(false)}
                className="flex items-baseline gap-4 border-t border-[color:var(--color-hairline)] py-5 last:border-b"
              >
                <span className="numeral text-[10px] text-[color:var(--color-mute-2)] w-6 tracking-widest">
                  0{i + 1}
                </span>
                <span className="serif-italic text-4xl text-[color:var(--color-rust)]">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>
        <div className="container-x py-6 border-t border-[color:var(--color-hairline)] text-xs text-[color:var(--color-mute)] flex flex-col gap-1">
          <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
          <a href={COMPANY.emailHref}>{COMPANY.email}</a>
        </div>
      </div>
    </>
  );
}
