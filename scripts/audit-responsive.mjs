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

const ROUTES = [
  "/", "/work", "/work/cosmetic-packaging", "/services",
  "/services/offset", "/company", "/core-team", "/clients", "/partners",
  "/contact", "/quote",
];

const ALL_SIZES = [
  { w: 320, h: 640, touch: true },
  { w: 390, h: 844, touch: true },
  { w: 430, h: 932, touch: true },
  { w: 768, h: 1024, touch: true },
  { w: 834, h: 1112, touch: true },
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
    const onMessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id !== id) return;
      ws.removeEventListener("message", onMessage);
      msg.error ? reject(new Error(`${method}: ${msg.error.message}`)) : resolve(msg.result);
    };
    ws.addEventListener("message", onMessage);
    ws.send(JSON.stringify({ id, method, params }));
    setTimeout(() => reject(new Error(`${method} timed out`)), 60000);
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
  const out = { overflow: de.scrollWidth - vw, offenders: [], small: [], clipped: [] };
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
    if (r.height < 28 && el.textContent.trim().length) {
      out.small.push((el.textContent.trim().slice(0, 24) || el.tagName) + ':' + Math.round(r.height));
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
  return JSON.stringify(out);
})()`;

const problems = [];
for (const size of SIZES) {
  await rpc(ws, ++id, "Emulation.setDeviceMetricsOverride", {
    width: size.w, height: size.h, deviceScaleFactor: 1, mobile: size.touch,
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
    if (data.small.length) notes.push(`small taps: ${data.small.join(", ")}`);
    if (consoleMsgs.length) notes.push(`console: ${[...new Set(consoleMsgs)].slice(0, 3).join(" | ")}`);
    const fails = [...new Set(failedReqs)].filter((f) => !/ERR_ABORTED/.test(f));
    if (fails.length) notes.push(`requests: ${fails.slice(0, 3).join(" | ")}`);
    if (notes.length) problems.push(`${size.w}x${size.h} ${route}\n    ${notes.join("\n    ")}`);
  }
  console.log(`--- ${size.w} done`);
}

console.log("\n===== REPORT =====");
console.log(problems.length ? problems.join("\n") : "no issues found");
ws.close();
await rpc(browser, 2, "Target.closeTarget", { targetId });
browser.close();
console.log("\ndone");
