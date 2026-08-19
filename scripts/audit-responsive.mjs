/**
 * Walks routes at a set of widths and reports horizontal overflow, clipped
 * text, small tap targets, console errors and failed requests.
 *
 *   node scripts/audit-responsive.mjs            # every width
 *   node scripts/audit-responsive.mjs 320 390    # only these
 *
 * Expects a server on BASE and Chrome on CDP_PORT.
 */
const PORT = process.env.CDP_PORT || "9333";
const BASE = process.env.BASE || "http://localhost:3000";

const ALL_ROUTES = [
  "/", "/work", "/work/cosmetic-packaging", "/capabilities",
  "/company", "/partners", "/start-a-project",
];
const ROUTES = process.env.HOME_ONLY === "1" ? ["/"] : ALL_ROUTES;

const IOS_UA =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";
const ANDROID_UA =
  "Mozilla/5.0 (Linux; Android 15; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36";

const ALL_SIZES = [
  { w: 280, h: 653, touch: true, dpr: 3, label: "Fold cover", ua: ANDROID_UA },
  { w: 320, h: 568, touch: true, dpr: 2, label: "iPhone 5/SE 1", ua: IOS_UA },
  { w: 320, h: 640, touch: true, dpr: 2, label: "Android compact", ua: ANDROID_UA },
  { w: 359, h: 640, touch: true, dpr: 2 },
  { w: 360, h: 640, touch: true, dpr: 2 },
  { w: 360, h: 800, touch: true, dpr: 3, label: "Galaxy compact", ua: ANDROID_UA },
  { w: 375, h: 667, touch: true, dpr: 2, label: "iPhone SE", ua: IOS_UA },
  { w: 375, h: 812, touch: true, dpr: 3, label: "iPhone mini", ua: IOS_UA },
  { w: 384, h: 854, touch: true, dpr: 3, label: "Galaxy S", ua: ANDROID_UA },
  { w: 389, h: 844, touch: true, dpr: 3 },
  { w: 390, h: 844, touch: true, dpr: 3, label: "iPhone Pro", ua: IOS_UA },
  { w: 412, h: 915, touch: true, dpr: 3, label: "Pixel", ua: ANDROID_UA },
  { w: 430, h: 932, touch: true, dpr: 3, label: "iPhone Pro Max", ua: IOS_UA },
  { w: 480, h: 1040, touch: true, dpr: 3, label: "Android large", ua: ANDROID_UA },
  { w: 639, h: 900, touch: true, dpr: 2 },
  { w: 640, h: 900, touch: true, dpr: 2 },
  { w: 767, h: 1024, touch: true, dpr: 2 },
  { w: 844, h: 390, touch: true, dpr: 3, landscape: true },
  { w: 768, h: 1024, touch: true },
  { w: 834, h: 1112, touch: true },
  { w: 1024, h: 600, touch: false },
  { w: 1024, h: 768, touch: false },
  { w: 1280, h: 720, touch: false },
  { w: 1366, h: 768, touch: false },
  { w: 1440, h: 900, touch: false },
  { w: 1920, h: 1080, touch: false },
  { w: 2560, h: 1440, touch: false },
];

const only = process.argv.slice(2).map(Number).filter(Boolean);
const SIZES = only.length ? ALL_SIZES.filter((s) => only.includes(s.w)) : ALL_SIZES;

function rpc(ws, id, method, params = {}) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error(`${method} timed out`)),
      60000
    );
    const onMessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id !== id) return;
      clearTimeout(timeout);
      ws.removeEventListener("message", onMessage);
      if (msg.error) reject(new Error(`${method}: ${msg.error.message}`));
      else resolve(msg.result);
    };
    ws.addEventListener("message", onMessage);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

const version = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json();
const browser = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((r) => browser.addEventListener("open", r));
const { targetId } = await rpc(browser, 1, "Target.createTarget", { url: "about:blank" });
const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
const ws = new WebSocket(list.find((t) => t.id === targetId).webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));

let id = 0;
await rpc(ws, ++id, "Page.enable");
await rpc(ws, ++id, "Runtime.enable");
await rpc(ws, ++id, "Network.enable");

let consoleMsgs = [];
let failedReqs = [];
ws.addEventListener("message", (event) => {
  const msg = JSON.parse(event.data);
  if (msg.method === "Runtime.exceptionThrown") {
    const d = msg.params.exceptionDetails;
    consoleMsgs.push("exception: " + (d.exception?.description || d.text || "").slice(0, 160));
  }
  if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
    consoleMsgs.push("console.error: " + msg.params.args.map((a) => a.value || a.description || "").join(" ").slice(0, 160));
  }
  if (msg.method === "Network.loadingFailed") failedReqs.push(msg.params.errorText);
  if (msg.method === "Network.responseReceived" && msg.params.response.status >= 400) {
    failedReqs.push(msg.params.response.status + " " + msg.params.response.url.replace(BASE, ""));
  }
});

/* sr-only text sits in a 1px box on purpose, so it is not a clipping bug. */
const PROBE = `(() => {
  const de = document.documentElement;
  const vw = de.clientWidth;
  const out = { overflow: de.scrollWidth - vw, offenders: [], small: [], clipped: [], overlaps: [] };
  if (out.overflow > 1) {
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      if (getComputedStyle(el).position === 'fixed') continue;
      if (r.right > vw + 1 || r.left < -1) {
        const cls = typeof el.className === 'string' ? el.className.trim().split(/\\s+/).slice(0, 2).join('.') : '';
        out.offenders.push(el.tagName.toLowerCase() + '.' + cls + ' [' + Math.round(r.left) + '..' + Math.round(r.right) + ']');
        if (out.offenders.length > 6) break;
      }
    }
  }
  for (const el of document.querySelectorAll('a, button, [role="button"], input, select')) {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    if ((r.height < 44 || r.width < 44) && el.textContent.trim().length) {
      out.small.push((el.textContent.trim().slice(0, 24) || el.tagName) + ':' + Math.round(r.width) + 'x' + Math.round(r.height));
      if (out.small.length > 8) break;
    }
  }
  for (const el of document.querySelectorAll('h1, h2, h3, p, li, span')) {
    if (el.children.length || el.clientWidth <= 1) continue;
    if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).overflow !== 'visible') {
      out.clipped.push(el.textContent.trim().slice(0, 28) + ' ' + el.scrollWidth + '>' + el.clientWidth);
      if (out.clipped.length > 5) break;
    }
  }
  const overlapPairs = [
    ['.site-header__brand', '.nav-menu'],
    ['.hero-home__heading', '.hero-home__body'],
    ['.how-we-make__title', '.how-we-make__body'],
    ['.print-showcase__caption', '.print-showcase__info'],
    ['.team-rail__head', '.team-wall-scroll__stage'],
    ['.home-clients__title', '.home-clients__body'],
  ];
  const visibleRect = (selector) => {
    for (const el of document.querySelectorAll(selector)) {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      if (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        Number(style.opacity) !== 0 &&
        rect.width > 1 &&
        rect.height > 1
      ) return rect;
    }
    return null;
  };
  for (const [a, b] of overlapPairs) {
    const ar = visibleRect(a);
    const br = visibleRect(b);
    if (!ar || !br) continue;
    const width = Math.min(ar.right, br.right) - Math.max(ar.left, br.left);
    const height = Math.min(ar.bottom, br.bottom) - Math.max(ar.top, br.top);
    if (width > 4 && height > 4) out.overlaps.push(a + ' <> ' + b + ' (' + Math.round(width) + 'x' + Math.round(height) + ')');
  }
  return JSON.stringify(out);
})()`;

const problems = [];
for (const size of SIZES) {
  await rpc(ws, ++id, "Emulation.setDeviceMetricsOverride", {
    width: size.w, height: size.h, deviceScaleFactor: size.dpr || 1, mobile: size.touch,
    screenOrientation: size.landscape
      ? { type: "landscapePrimary", angle: 90 }
      : { type: "portraitPrimary", angle: 0 },
  });
  await rpc(ws, ++id, "Emulation.setUserAgentOverride", {
    userAgent: size.ua || ANDROID_UA,
    platform: size.ua === IOS_UA ? "iPhone" : "Linux armv8l",
  });
  // Touch emulation is what flips `hover: none` / `pointer: coarse` on.
  await rpc(ws, ++id, "Emulation.setTouchEmulationEnabled", {
    enabled: size.touch, maxTouchPoints: 5,
  });
  for (const route of ROUTES) {
    consoleMsgs = [];
    failedReqs = [];
    await rpc(ws, ++id, "Page.navigate", { url: BASE + route });
    await new Promise((r) => setTimeout(r, 1800));
    const { result } = await rpc(ws, ++id, "Runtime.evaluate", { expression: PROBE, returnByValue: true });
    const data = JSON.parse(result.value);
    const notes = [];
    if (data.overflow > 1) notes.push(`overflow ${data.overflow}px: ${data.offenders.join(" | ")}`);
    if (data.clipped.length) notes.push(`clipped: ${data.clipped.join(" | ")}`);
    if (data.overlaps.length) notes.push(`overlap: ${data.overlaps.join(" | ")}`);
    if (data.small.length) notes.push(`small taps: ${data.small.join(", ")}`);
    if (consoleMsgs.length) notes.push(`console: ${[...new Set(consoleMsgs)].slice(0, 3).join(" | ")}`);
    const fails = [...new Set(failedReqs)].filter((f) => !/ERR_ABORTED/.test(f));
    if (fails.length) notes.push(`requests: ${fails.slice(0, 3).join(" | ")}`);

    if (route === "/" && size.touch) {
      for (const selector of [
        ".home-mobile-operations",
        ".print-showcase",
        ".team-rail",
      ]) {
        const position = await rpc(ws, ++id, "Runtime.evaluate", {
          expression: `(() => {
            const el = document.querySelector(${JSON.stringify(selector)});
            if (!el) return null;
            const top = el.getBoundingClientRect().top + window.scrollY;
            return top + Math.max(0, (el.offsetHeight - window.innerHeight) * 0.75);
          })()`,
          returnByValue: true,
        });
        if (position.result.value == null) continue;
        await rpc(ws, ++id, "Runtime.evaluate", {
          expression: `window.scrollTo(0, ${Math.round(position.result.value)})`,
        });
        await new Promise((r) => setTimeout(r, 350));
        const checkpoint = await rpc(ws, ++id, "Runtime.evaluate", {
          expression: PROBE,
          returnByValue: true,
        });
        const checkpointData = JSON.parse(checkpoint.result.value);
        if (checkpointData.overflow > 1) {
          notes.push(
            `${selector} overflow ${checkpointData.overflow}px: ${checkpointData.offenders.join(" | ")}`
          );
        }
        if (checkpointData.clipped.length) {
          notes.push(
            `${selector} clipped: ${checkpointData.clipped.join(" | ")}`
          );
        }
        if (checkpointData.overlaps.length) {
          notes.push(
            `${selector} overlap: ${checkpointData.overlaps.join(" | ")}`
          );
        }
      }
    }

    if (notes.length) problems.push(
      `${size.label ? `${size.label} ` : ""}${size.w}x${size.h} ${route}\n    ${notes.join("\n    ")}`
    );
  }
  console.log(`--- ${size.label ? `${size.label} ` : ""}${size.w}x${size.h} done`);
}

console.log("\n===== REPORT =====");
console.log(problems.length ? problems.join("\n") : "no issues found");
ws.close();
await rpc(browser, 2, "Target.closeTarget", { targetId });
browser.close();
console.log("\ndone");
