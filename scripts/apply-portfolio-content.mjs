import fs from "fs";

const contentPath = "lib/content.ts";
const generated = fs.readFileSync("portfolio-generated.ts", "utf8");
let src = fs.readFileSync(contentPath, "utf8");

const startMarker = "const PF = \"/portfolio\";";
const endMarker = "export const WORK_GROUPS:";

const start = src.indexOf(startMarker);
const end = src.indexOf(endMarker);
if (start < 0 || end < 0) {
  throw new Error(`markers not found start=${start} end=${end}`);
}

const replacement =
  generated.trimEnd() +
  "\n\n";

src = src.slice(0, start) + replacement + src.slice(end);

// Fix WORK_PAGE cover if it still points at missing hero
src = src.replace(
  'cover: "/portfolio/brochures/hero.jpeg"',
  'cover: "/portfolio/brochures/cover.jpeg"'
);
src = src.replace(
  "cover: `${PF}/brochures/hero.jpeg`",
  'cover: "/portfolio/brochures/cover.jpeg"'
);

fs.writeFileSync(contentPath, src, "utf8");
console.log("content.ts updated");
console.log("has PF?", src.includes('const PF = "/portfolio"'));
console.log("has PORTFOLIO_SEED?", src.includes("PORTFOLIO_SEED"));
console.log(
  "portfolio entries",
  (src.match(/slug: "cosmetic-packaging"/g) || []).length
);
