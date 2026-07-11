export const LENIS_READY_EVENT = "vantage:lenis-ready";
export const NAV_THEME_EVENT = "vantage:nav-theme";

export type NavTheme = "over-media" | "solid";

let currentNavTheme: NavTheme | null = null;

export function setNavTheme(theme: NavTheme) {
  if (typeof window === "undefined" || currentNavTheme === theme) return;
  currentNavTheme = theme;
  window.dispatchEvent(
    new CustomEvent<NavTheme>(NAV_THEME_EVENT, { detail: theme })
  );
}
