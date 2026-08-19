/**
 * Scroll-and-shoot helper for visual checks against a running server.
 *
 *   node scripts/shoot.mjs --route / --sel .print-tech --steps 6 --w 1440 --h 900
 *
 * Steps > 1 walk down from the selector by one viewport at a time, which is how
 * the pinned sections have to be photographed — their state is scroll-driven.
 * Expects Chrome listening on CDP_PORT (default 9333).
 */
const args = new Map();
for (let i = 2; i < process.argv.length; i += 2) {
  args.set(process.argv[i].replace(/^--/, ""), process.argv[i + 1]);
}

const PORT = process.env.CDP_PORT || "9333";
const BASE = process.env.BASE || "http://localhost:3000";
const ROUTE = args.get("route") || "/";
const SEL = args.get("sel") || null;
const STEPS = Number(args.get("steps") || 1);
const STRIDE = Number(args.get("stride") || 0.85);
const W = Number(args.get("w") || 1440);
const H = Number(args.get("h") || 900);
const OUT = args.get("out") || "assets/shots";
const NAME = args.get("name") || (SEL || ROUTE).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "page";

const { writeFileSync, mkdirSync } = await import("node:fs");
const { join } = await import("node:path");

function rpc(ws, id, method, params = {}) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error(`${method} timed out`)),
      90000
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

mkdirSync(OUT, { recursive: true });
const version = await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json();
const browser = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((r) => browser.addEventListener("open", r));
const { targetId } = await rpc(browser, 1, "Target.createTarget", { url: "about:blank" });
const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
const ws = new WebSocket(list.find((t) => t.id === targetId).webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));

let id = 0;
await rpc(ws, ++id, "Page.enable");
await rpc(ws, ++id, "Emulation.setDeviceMetricsOverride", {
  width: W, height: H, deviceScaleFactor: 1, mobile: W < 900,
});
// Touch emulation is what flips `hover: none` / `pointer: coarse` on, which a
// few mobile rules depend on.
await rpc(ws, ++id, "Emulation.setTouchEmulationEnabled", {
  enabled: W < 900, maxTouchPoints: 5,
});
await rpc(ws, ++id, "Page.navigate", { url: BASE + ROUTE });
await new Promise((r) => setTimeout(r, 4500));

// Lazy images below the fold never load in a headless run, so force them.
await rpc(ws, ++id, "Runtime.evaluate", {
  expression: `document.querySelectorAll('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; });`,
});

const CLICK = args.get("click");
if (CLICK) {
  await rpc(ws, ++id, "Runtime.evaluate", {
    expression: `document.querySelector(${JSON.stringify(CLICK)}).click()`,
  });
  await new Promise((r) => setTimeout(r, 1200));
}

let base = 0;
if (SEL) {
  const { result } = await rpc(ws, ++id, "Runtime.evaluate", {
    expression: `(() => {
      const el = document.querySelector(${JSON.stringify(SEL)});
      if (!el) return -1;
      return Math.round(el.getBoundingClientRect().top + scrollY);
    })()`,
    returnByValue: true,
  });
  base = result.value;
  if (base < 0) throw new Error(`selector not found: ${SEL}`);
}

for (let i = 0; i < STEPS; i += 1) {
  const y = base + Math.round(i * H * STRIDE);
  await rpc(ws, ++id, "Runtime.evaluate", {
    expression: `(async () => {
      const lenis = window.__lenis;
      if (lenis && lenis.scrollTo) lenis.scrollTo(${y}, { immediate: true });
      else scrollTo(0, ${y});
      await new Promise((r) => setTimeout(r, 900));
      const imgs = [...document.images].filter((im) => !im.complete || !im.naturalWidth);
      await Promise.all(imgs.map((im) => new Promise((r) => { im.onload = r; im.onerror = r; setTimeout(r, 4000); })));
      await new Promise((r) => setTimeout(r, 500));
      return scrollY;
    })()`,
    awaitPromise: true,
    returnByValue: true,
  });
  const shot = await rpc(ws, ++id, "Page.captureScreenshot", { format: "jpeg", quality: 76 });
  const file = join(OUT, STEPS > 1 ? `${NAME}-${W}-${i}.jpg` : `${NAME}-${W}.jpg`);
  writeFileSync(file, Buffer.from(shot.data, "base64"));
  console.log(file);
}

ws.close();
await rpc(browser, 2, "Target.closeTarget", { targetId });
browser.close();
console.log("done");
