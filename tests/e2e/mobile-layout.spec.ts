import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const routes = [
  "/",
  "/work",
  "/work/cosmetic-packaging",
  "/capabilities",
  "/company",
  "/start-a-project",
  "/partners",
] as const;
const runVisual = process.env.RUN_VISUAL_BASELINES === "1";

const visualProjects = new Set([
  "webkit-se",
  "webkit-standard",
  "webkit-plus",
  "webkit-pro-max",
  "chromium-se",
  "chromium-plus",
]);
const representativeProjects = new Set([
  "webkit-narrow-320",
  "webkit-se",
  "webkit-plus",
  "webkit-tablet-1023",
  "webkit-plus-landscape",
  "chromium-plus",
]);

async function settlePage(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => {
    await Promise.race([
      document.fonts.ready,
      new Promise((resolve) => window.setTimeout(resolve, 2_000)),
    ]);
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(350);
}

for (const route of routes) {
  test(`${route} has stable mobile geometry`, async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.ok(), `${route} should return a successful response`).toBe(
      true
    );
    await settlePage(page);

    const geometry = await page.evaluate(() => {
      const root = document.documentElement;
      const body = document.body;
      const visibleBrokenImages = Array.from(document.images)
        .filter((image) => {
          const rect = image.getBoundingClientRect();
          return (
            rect.bottom > 0 &&
            rect.top < window.innerHeight &&
            getComputedStyle(image).display !== "none"
          );
        })
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src);
      const overflowingElements = Array.from(
        document.body.querySelectorAll<HTMLElement>("*")
      )
        .filter((element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return (
            style.position !== "fixed" &&
            style.transform === "none" &&
            style.visibility !== "hidden" &&
            rect.width > 0 &&
            (rect.left < -1 || rect.right > window.innerWidth + 1)
          );
        })
        .slice(0, 12)
        .map((element) => ({
          selector: `${element.tagName.toLowerCase()}${
            element.id ? `#${element.id}` : ""
          }${
            typeof element.className === "string" && element.className
              ? `.${element.className.trim().replace(/\s+/g, ".")}`
              : ""
          }`,
          rect: element.getBoundingClientRect().toJSON(),
        }));
      return {
        viewportWidth: window.innerWidth,
        documentWidth: Math.max(root.scrollWidth, body.scrollWidth),
        visibleBrokenImages,
        overflowingElements,
        horizontalScrollOffset: window.scrollX,
        rootOverflowX: getComputedStyle(root).overflowX,
        bodyOverflowX: getComputedStyle(body).overflowX,
      };
    });

    expect(
      geometry.horizontalScrollOffset,
      `${route} must not scroll horizontally: ${JSON.stringify(
        geometry.overflowingElements
      )}`
    ).toBe(0);
    expect(["hidden", "clip"]).toContain(geometry.rootOverflowX);
    expect(["hidden", "clip"]).toContain(geometry.bodyOverflowX);
    expect(geometry.visibleBrokenImages).toEqual([]);
    expect(pageErrors).toEqual([]);
  });

  test(`${route} has no serious accessibility violations`, async (
    { page },
    testInfo
  ) => {
    test.skip(
      !representativeProjects.has(testInfo.project.name),
      "Accessibility checks use boundary and representative viewports."
    );
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await settlePage(page);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    const blocking = results.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious"
    );

    expect(blocking).toEqual([]);
  });

  test(`${route} visual baseline`, async ({ page }, testInfo) => {
    test.skip(
      !runVisual || !visualProjects.has(testInfo.project.name),
      "Visual baselines use representative portrait geometries."
    );
    await page.goto(route, { waitUntil: "domcontentloaded" });
    await settlePage(page);
    await expect(page).toHaveScreenshot(
      `${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}.png`,
      {
        fullPage: false,
      }
    );
  });
}

test("mobile menu and portfolio lightbox remain operable", async (
  { page },
  testInfo
) => {
  test.skip(
    !representativeProjects.has(testInfo.project.name),
    "Interaction checks use boundary and representative viewports."
  );
  await page.goto("/work/cosmetic-packaging", {
    waitUntil: "domcontentloaded",
  });
  await settlePage(page);

  const menu = page.getByRole("button", { name: "Open menu" });
  await expect(menu).toBeVisible();
  await menu.click();
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  await page.getByRole("button", { name: "Close menu" }).click();

  const firstProject = page
    .getByRole("button", { name: /Open .* product image/i })
    .first();
  await firstProject.scrollIntoViewIfNeeded();
  await firstProject.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("button", { name: "Close" })).toHaveCSS(
    "min-height",
    "44px"
  );
  await page.getByRole("button", { name: "Close" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("project form controls meet mobile target sizing", async (
  { page },
  testInfo
) => {
  test.skip(
    !representativeProjects.has(testInfo.project.name),
    "Control sizing checks use boundary and representative viewports."
  );
  await page.goto("/start-a-project", { waitUntil: "domcontentloaded" });
  await settlePage(page);
  await page.locator("#project-brief").scrollIntoViewIfNeeded();

  const controls = page.locator(
    ".project-check, .project-brief__upload button, .project-brief__submit"
  );
  const count = await controls.count();
  expect(count).toBeGreaterThan(0);

  for (let index = 0; index < count; index += 1) {
    const box = await controls.nth(index).boundingBox();
    expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  }
});

test("animated mobile stages keep visible content inside their bounds", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await settlePage(page);

  await page.evaluate(() => {
    const showcase = document.querySelector<HTMLElement>(".print-showcase");
    if (!showcase) return;
    const range = Math.max(0, showcase.offsetHeight - window.innerHeight);
    window.scrollTo(
      0,
      window.scrollY + showcase.getBoundingClientRect().top + range * 0.13
    );
  });
  await page.waitForTimeout(500);

  const showcaseBounds = await page.evaluate(() => {
    const stage = document.querySelector<HTMLElement>(".print-showcase__stage");
    const panels = Array.from(
      document.querySelectorAll<HTMLElement>(".print-showcase__panel")
    );
    const active =
      panels.find((panel) => {
        const style = getComputedStyle(panel);
        const rect = panel.getBoundingClientRect();
        return (
          style.visibility !== "hidden" &&
          Number.parseFloat(style.opacity || "1") > 0.05 &&
          rect.bottom > 0 &&
          rect.top < innerHeight
        );
      }) ?? panels[0];
    const caption =
      active?.querySelector<HTMLElement>(".print-showcase__caption") ?? null;
    const info =
      active?.querySelector<HTMLElement>(".print-showcase__info") ?? null;
    const isVisible = (element: HTMLElement | null) => {
      if (!element) return false;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return (
        style.visibility !== "hidden" &&
        Number.parseFloat(style.opacity || "1") > 0.05 &&
        rect.bottom > 0 &&
        rect.top < innerHeight
      );
    };
    return {
      stage: stage?.getBoundingClientRect().toJSON() ?? null,
      caption: caption?.getBoundingClientRect().toJSON() ?? null,
      info: info?.getBoundingClientRect().toJSON() ?? null,
      captionVisible: isVisible(caption),
      infoVisible: isVisible(info),
    };
  });

  expect(showcaseBounds.stage).not.toBeNull();
  if (
    showcaseBounds.stage &&
    showcaseBounds.caption &&
    showcaseBounds.info &&
    showcaseBounds.captionVisible &&
    showcaseBounds.infoVisible
  ) {
    expect(showcaseBounds.caption.bottom).toBeLessThanOrEqual(
      showcaseBounds.info.top + 1
    );
    expect(showcaseBounds.info.bottom).toBeLessThanOrEqual(
      showcaseBounds.stage.bottom + 1
    );
  }

  await page.evaluate(() => {
    const team = document.querySelector<HTMLElement>(".team-wall-scroll");
    if (!team) return;
    window.scrollTo(0, window.scrollY + team.getBoundingClientRect().top + 1);
  });
  await page.waitForTimeout(500);

  const teamBounds = await page.evaluate(() => {
    const stage = document.querySelector<HTMLElement>(".team-wall-scroll__stage");
    const visibleCards = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".team-rail__wall .team-wall__panel"
      )
    ).filter((card) => {
      const rect = card.getBoundingClientRect();
      return rect.right > 0 && rect.left < innerWidth;
    });
    const stageRect = stage?.getBoundingClientRect();
    return {
      stageBottom: stageRect?.bottom ?? 0,
      cardBottoms: visibleCards.map(
        (card) => card.getBoundingClientRect().bottom
      ),
    };
  });

  for (const cardBottom of teamBounds.cardBottoms) {
    expect(cardBottom).toBeLessThanOrEqual(teamBounds.stageBottom + 1);
  }
});

test("about signature pop animation activates in view", async (
  { page },
  testInfo
) => {
  test.skip(
    !representativeProjects.has(testInfo.project.name),
    "Animation activation uses representative mobile viewports."
  );
  await page.goto("/company", { waitUntil: "domcontentloaded" });
  await settlePage(page);

  await page.evaluate(() => {
    const section = document.querySelector<HTMLElement>(".about-belief");
    if (!section) return;
    const top = window.scrollY + section.getBoundingClientRect().top;
    window.scrollTo(0, top + section.offsetHeight * 0.1);
  });
  const signature = page.locator(".about-belief__signature");
  await expect(signature.locator(".about-belief__signature-pop")).toHaveClass(
    /is-visible/
  );
});
