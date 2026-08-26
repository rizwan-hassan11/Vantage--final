import { expect, test } from "@playwright/test";

const deployedOrigin = "https://vantage-final-ten.vercel.app";
const captureDeployed = process.env.CAPTURE_DEPLOYED_BASELINE === "1";
const compareDeployed = process.env.COMPARE_DEPLOYED_BASELINE === "1";
const routes = [
  "/",
  "/work",
  "/capabilities",
  "/company",
  "/start-a-project",
] as const;

async function prepareStableViewport(page: import("@playwright/test").Page) {
  await page.evaluate(async () => {
    await Promise.race([
      document.fonts.ready,
      new Promise((resolve) => window.setTimeout(resolve, 2_000)),
    ]);
    document
      .querySelectorAll("video")
      .forEach((video) => {
        video.pause();
        try {
          video.currentTime = 0;
        } catch {
          // Some remote media is not seekable until enough data is buffered.
        }
      });
    document.body.classList.remove("show-clonvo-chat");
    window.scrollTo(0, 0);
  });
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-delay: 0s !important;
        animation-duration: 0s !important;
        caret-color: transparent !important;
        transition: none !important;
      }
      #clonvo-widget-host,
      iframe[src*="clonvo"] {
        display: none !important;
      }
    `,
  });
  await page.waitForTimeout(300);
}

for (const route of routes) {
  test(`${route} matches deployed 430x932 baseline`, async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "webkit-plus",
      "The canonical production baseline is WebKit at 430×932."
    );
    test.skip(
      !captureDeployed && !compareDeployed,
      "Run the explicit baseline capture or comparison script."
    );

    const target = captureDeployed ? `${deployedOrigin}${route}` : route;
    await page.goto(target, { waitUntil: "domcontentloaded" });
    await prepareStableViewport(page);
    const screenshot = await page.screenshot({ fullPage: false });

    expect(screenshot).toMatchSnapshot(
      `${route === "/" ? "home" : route.slice(1)}-deployed-430x932.png`,
      { maxDiffPixelRatio: 0.015 }
    );
  });
}
