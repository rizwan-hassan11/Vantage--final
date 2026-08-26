import { defineConfig, type Project } from "@playwright/test";

const portraitViewports = [
  { name: "narrow-320", width: 320, height: 568 },
  { name: "narrow-360", width: 360, height: 800 },
  { name: "se", width: 375, height: 667 },
  { name: "compact", width: 375, height: 812 },
  { name: "standard", width: 390, height: 844 },
  { name: "pro", width: 393, height: 852 },
  { name: "legacy-max", width: 414, height: 896 },
  { name: "air", width: 420, height: 912 },
  { name: "plus", width: 430, height: 932 },
  { name: "pro-max", width: 440, height: 956 },
  { name: "wide-480", width: 480, height: 900 },
  { name: "wide-600", width: 600, height: 960 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "tablet-900", width: 900, height: 1200 },
  { name: "tablet-1023", width: 1023, height: 1366 },
] as const;

const landscapeViewports = [
  { name: "se-landscape", width: 667, height: 375 },
  { name: "standard-landscape", width: 844, height: 390 },
  { name: "plus-landscape", width: 932, height: 430 },
  { name: "pro-max-landscape", width: 956, height: 440 },
] as const;

const geometries = [...portraitViewports, ...landscapeViewports];
const chromiumGeometries = geometries.filter(({ name }) =>
  ["se", "plus", "tablet-1023", "plus-landscape"].includes(name)
);

const projects: Project[] = [
  ...geometries.map(({ name, width, height }) => ({
    name: `webkit-${name}`,
    use: {
      browserName: "webkit" as const,
      viewport: { width, height },
      deviceScaleFactor: 3,
      hasTouch: true,
      isMobile: true,
      locale: "en-US",
      colorScheme: "light",
    },
  })),
  ...chromiumGeometries.map(({ name, width, height }) => ({
    name: `chromium-${name}`,
    use: {
      browserName: "chromium" as const,
      viewport: { width, height },
      deviceScaleFactor: 2,
      hasTouch: true,
      isMobile: true,
      locale: "en-US",
      colorScheme: "light",
    },
  })),
];

export default defineConfig({
  testDir: "./tests/e2e",
  outputDir: "test-results",
  fullyParallel: true,
  timeout: 45_000,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 3 : 2,
  reporter: [["list"], ["html", { open: "never" }]],
  expect: {
    timeout: 10_000,
    toHaveScreenshot: {
      animations: "disabled",
      caret: "hide",
      maxDiffPixelRatio: 0.015,
    },
  },
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects,
});
