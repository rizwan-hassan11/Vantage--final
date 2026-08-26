import { expect, test, type Page } from "@playwright/test";

async function settle(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => {});
  await page.evaluate(async () => {
    await Promise.race([
      document.fonts.ready,
      new Promise((resolve) => window.setTimeout(resolve, 2_000)),
    ]);
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1_000);
}

async function scrollSectionToProgress(
  page: Page,
  selector: string,
  progress: number
) {
  await page.evaluate(
    async ({ selector, progress }) => {
      const section = document.querySelector<HTMLElement>(selector);
      if (!section) throw new Error(`Missing animation section: ${selector}`);
      const top = window.scrollY + section.getBoundingClientRect().top;
      const range = Math.max(0, section.offsetHeight - window.innerHeight);
      const start = window.scrollY;
      const target = top + range * progress;
      for (let step = 1; step <= 36; step += 1) {
        const value = start + (target - start) * (step / 36);
        window.scrollTo(0, value);
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => resolve())
        );
      }
    },
    { selector, progress }
  );
  await page.waitForTimeout(1_200);
}

async function scrollElementIntoView(page: Page, selector: string) {
  await page.evaluate(async (selector) => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(selector)
    );
    const element = elements.at(-1);
    if (!element) throw new Error(`Missing animated element: ${selector}`);
    const rect = element.getBoundingClientRect();
    const start = window.scrollY;
    const target =
      start + rect.top - Math.max(0, (window.innerHeight - rect.height) / 2);
    for (let step = 1; step <= 36; step += 1) {
      window.scrollTo(0, start + (target - start) * (step / 36));
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve())
      );
    }
  }, selector);
  await page.waitForTimeout(1_200);
}

test.beforeEach(({}, testInfo) => {
  test.skip(
    !["webkit-plus", "chromium-plus"].includes(testInfo.project.name),
    "Animation smoke tests use the approved 430×932 mobile viewport."
  );
});

test("client animation runtime is hydrated", async ({ page }) => {
  const diagnostics: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") diagnostics.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => diagnostics.push(`pageerror: ${error.message}`));
  page.on("requestfailed", (request) =>
    diagnostics.push(
      `requestfailed: ${request.url()} ${request.failure()?.errorText ?? ""}`
    )
  );
  await page.goto("/");
  await settle(page);
  const menu = page.locator(".site-header__menu");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await expect(
    menu,
    diagnostics.join("\n") || "No browser errors were reported."
  ).toHaveAttribute("aria-expanded", "true");
});

test("home scroll animations advance", async ({ page }) => {
  await page.goto("/");
  await settle(page);

  await scrollSectionToProgress(page, ".print-showcase", 0.13);
  const showcaseMetrics = await page.evaluate(() => {
    const section = document.querySelector<HTMLElement>(".print-showcase");
    if (!section) return null;
    return {
      scrollY: window.scrollY,
      sectionTop: section.getBoundingClientRect().top,
      sectionHeight: section.offsetHeight,
      viewportHeight: window.innerHeight,
      reducedMotion: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches,
    };
  });
  const captionOpacity = await page
    .locator(".print-showcase__caption")
    .first()
    .evaluate((element) => Number.parseFloat(getComputedStyle(element).opacity));
  const infoOpacity = await page
    .locator(".print-showcase__info")
    .first()
    .evaluate((element) => Number.parseFloat(getComputedStyle(element).opacity));
  expect(
    captionOpacity,
    `Showcase progress metrics: ${JSON.stringify(showcaseMetrics)}`
  ).toBeGreaterThan(0.5);
  expect(infoOpacity).toBeGreaterThan(0.5);

  await scrollSectionToProgress(page, ".team-wall-scroll", 0.05);
  const teamStart = await page
    .locator(".team-rail__wall .team-wall")
    .evaluate((element) => getComputedStyle(element).transform);
  await scrollSectionToProgress(page, ".team-wall-scroll", 0.65);
  const teamEnd = await page
    .locator(".team-rail__wall .team-wall")
    .evaluate((element) => getComputedStyle(element).transform);
  expect(teamEnd).not.toBe(teamStart);
});

test("work hero and card reveals animate", async ({ page }) => {
  await page.goto("/work");
  await settle(page);

  const activeBefore = await page
    .locator(".work-intro__cover-image.is-active")
    .evaluate((element) =>
      element instanceof HTMLVideoElement
        ? element.currentSrc
        : (element as HTMLImageElement).currentSrc
    );
  await page.waitForTimeout(3_500);
  const activeAfter = await page
    .locator(".work-intro__cover-image.is-active")
    .evaluate((element) =>
      element instanceof HTMLVideoElement
        ? element.currentSrc
        : (element as HTMLImageElement).currentSrc
    );
  expect(activeAfter).not.toBe(activeBefore);

  const card = page.locator(".work-card-reveal").last();
  await scrollElementIntoView(page, ".work-card-reveal");
  await expect(card).toHaveCSS("opacity", "1");
});

test("portfolio project reveals animate", async ({ page }) => {
  await page.goto("/work/cosmetic-packaging");
  await settle(page);

  const project = page.locator(".portfolio-cat-grid__item").last();
  await scrollElementIntoView(page, ".portfolio-cat-grid__item");
  await expect(project).toHaveCSS("opacity", "1");
});

test("capability scroll transforms animate", async ({ page }) => {
  await page.goto("/capabilities");
  await settle(page);

  const title = page.locator("#design .cap-service__display");
  const before = await title.evaluate((element) => ({
    opacity: getComputedStyle(element).opacity,
    transform: getComputedStyle(element).transform,
  }));
  await scrollSectionToProgress(page, "#design", 0.5);
  const after = await title.evaluate((element) => ({
    opacity: Number.parseFloat(getComputedStyle(element).opacity),
    transform: getComputedStyle(element).transform,
  }));
  expect(after.opacity).toBeGreaterThan(0.75);
  expect(after.transform).not.toBe(before.transform);
});

test("about curtain and signature animations advance", async ({ page }) => {
  await page.goto("/company");
  await settle(page);

  const historyPair = page.locator(".about-history__pair").nth(1);
  const historyBefore = await historyPair.evaluate(
    (element) => getComputedStyle(element).clipPath
  );
  await scrollSectionToProgress(page, ".about-history", 0.25);
  const historyAfter = await historyPair.evaluate(
    (element) => getComputedStyle(element).clipPath
  );
  expect(historyAfter).not.toBe(historyBefore);

  const pioneerPair = page.locator(".about-pioneers__pair").nth(1);
  const pioneerBefore = await pioneerPair.evaluate(
    (element) => getComputedStyle(element).clipPath
  );
  await scrollSectionToProgress(page, ".about-pioneers", 0.25);
  const pioneerAfter = await pioneerPair.evaluate(
    (element) => getComputedStyle(element).clipPath
  );
  expect(pioneerAfter).not.toBe(pioneerBefore);

  await scrollSectionToProgress(page, ".about-belief", 0.1);
  await expect(page.locator(".about-belief__signature-pop")).toHaveClass(
    /is-visible/
  );
  await expect(
    page.locator(".about-belief__signature-art--orange")
  ).toHaveCSS("fill", "rgb(210, 91, 48)");
});

for (const route of ["/partners", "/start-a-project"] as const) {
  test(`${route} hero media remains animated`, async ({ page }) => {
    await page.addInitScript(() => {
      const originalPlay = HTMLMediaElement.prototype.play;
      Object.defineProperty(window, "__vantagePlayCalls", {
        configurable: true,
        value: 0,
        writable: true,
      });
      HTMLMediaElement.prototype.play = function patchedPlay() {
        const state = window as typeof window & {
          __vantagePlayCalls: number;
        };
        state.__vantagePlayCalls += 1;
        return originalPlay.call(this);
      };
    });
    await page.goto(route);
    await settle(page);

    const video = page.locator(
      route === "/partners" ? ".chapter-bg__video" : ".project-hero__media"
    );
    await expect(video).toBeVisible();
    await expect.poll(() =>
      page.evaluate(
        () =>
          (
            window as typeof window & {
              __vantagePlayCalls?: number;
            }
          ).__vantagePlayCalls ?? 0
      )
    ).toBeGreaterThan(0);
  });
}
