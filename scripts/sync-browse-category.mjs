import fs from "fs";
import path from "path";

const SRC_ROOT = path.join(
  "Vantage Web Assets latest",
  "Work",
  "Browse By Catagory"
);
const PUBLIC_ROOT = path.join("public", "portfolio");

const CATEGORIES = [
  {
    src: "Cosmatics Packaging",
    folder: "cosmetics",
    number: "01",
    slug: "cosmetic-packaging",
    title: "Cosmetics Packaging",
    menuLabel: "Cosmetics Packaging",
    group: "packaging",
    short: "Beauty and skincare cartons with speciality finishes.",
    headline: ["Beauty, made visible."],
    intro:
      "Packaging created through precise colour, distinctive finishes and carefully engineered structures, designed to give every product a stronger presence.",
  },
  {
    src: "Pefume Packaging",
    folder: "perfume",
    number: "02",
    slug: "perfume-packaging",
    title: "Perfume Packaging",
    menuLabel: "Perfume Packaging",
    group: "packaging",
    short: "Premium rigid boxes and folding cartons for fragrance.",
    headline: ["The first impression", "before the first note."],
    intro:
      "Fragrance packaging shaped through structure, materials and finish, created to build anticipation before the box is opened.",
  },
  {
    src: "Pharmaceutical Packaging",
    folder: "pharma",
    number: "03",
    slug: "pharmaceutical-packaging",
    title: "Pharmaceutical Packaging",
    menuLabel: "Pharmaceutical Packaging",
    group: "packaging",
    short: "Regulated pharma cartons and inserts at scale.",
    headline: ["Precision you can trust."],
    intro:
      "Pharmaceutical packaging produced with controlled colour, accurate information and dependable consistency across every pack, variant and production run.",
  },
  {
    src: "Home Textile Packaging",
    folder: "home-textile",
    number: "04",
    slug: "home-and-textiles",
    title: "Home Textile Packaging",
    menuLabel: "Home Textile Packaging",
    group: "packaging",
    short: "Retail print for home, apparel and lifestyle brands.",
    headline: ["Consistency at every scale."],
    intro:
      "Colour, artwork and construction remain aligned across multiple sizes, product families and international market requirements.",
  },
  {
    src: "Product & Gift Boxes",
    folder: "gift-boxes",
    number: "05",
    slug: "product-and-gift-boxes",
    title: "Product & Gift Boxes",
    menuLabel: "Product & Gift Boxes",
    group: "packaging",
    short: "Rigid boxes, sleeve packs and utility carriers.",
    headline: ["Made to hold attention."],
    intro:
      "From practical product cartons to premium presentation boxes, every structure is created around what it carries and how it should be experienced.",
  },
  {
    src: "Labels & Sleeves",
    folder: "labels",
    number: "06",
    slug: "labels-and-sleeves",
    title: "Labels & Sleeves",
    menuLabel: "Labels & Sleeves",
    group: "packaging",
    short: "Shrink sleeves, in-mould and wet-glue labels.",
    headline: ["Small surface. Big responsibility."],
    intro:
      "Labels and sleeves engineered to carry colour, information and brand identity with consistency across demanding production environments.",
  },
  {
    src: "Annual Reports",
    folder: "annual-reports",
    number: "07",
    slug: "annual-reports",
    title: "Annual Reports",
    menuLabel: "Annual Reports",
    group: "print",
    short: "Corporate annual reports for public and private companies.",
    headline: ["Designed to communicate.", "Recognised for excellence."],
    intro:
      "Annual reports produced with disciplined colour, considered materials and finishing that reflects the standing of the organisation behind them.",
  },
  {
    src: "Books & Publications",
    folder: "books",
    number: "08",
    slug: "books-and-publications",
    title: "Books & Publications",
    menuLabel: "Books & Publications",
    group: "print",
    short: "Hard-case, perfect-bound and saddle-stitch books.",
    headline: ["Let's give the content", "the form it deserves."],
    intro:
      "From design and image reproduction to paper selection, binding and finishing, Vantage brings every stage together.",
  },
  {
    src: "Brochures & Catalogues",
    folder: "brochures",
    number: "09",
    slug: "brochure-and-catalogues",
    title: "Brochures & Catalogues",
    menuLabel: "Brochures & Catalogues",
    group: "print",
    short: "Product catalogues, marketing brochures, look books.",
    headline: ["Made to inform.", "Designed to persuade."],
    intro:
      "From concise corporate brochures to image-rich catalogues, each publication is shaped around what the audience needs to see, understand and remember.",
  },
];

function isMedia(name) {
  if (name.startsWith(".") || name.startsWith("._")) return false;
  return /\.(jpe?g|png|webp|avif|mp4)$/i.test(name);
}

function titleFromFilename(name) {
  return name
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+\.\s*/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function toKebab(title) {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[''`´]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function sortKey(name) {
  const m = name.match(/^(\d+)\./);
  if (m) return Number(m[1]);
  return Number.MAX_SAFE_INTEGER;
}

function findCover(files) {
  return files.find((f) => /^cover\./i.test(f)) || null;
}

function esc(s) {
  return JSON.stringify(s);
}

function renderArray(arr, indent) {
  const pad = " ".repeat(indent);
  return (
    "[\n" +
    arr.map((x) => pad + "  " + esc(x) + ",").join("\n") +
    "\n" +
    pad +
    "]"
  );
}

const portfolio = [];
const warnings = [];

for (const cat of CATEGORIES) {
  const srcDir = path.join(SRC_ROOT, cat.src);
  const pubDir = path.join(PUBLIC_ROOT, cat.folder);
  if (!fs.existsSync(srcDir)) throw new Error("Missing source: " + srcDir);
  if (!fs.existsSync(pubDir)) fs.mkdirSync(pubDir, { recursive: true });

  const srcFiles = fs
    .readdirSync(srcDir)
    .filter(isMedia)
    .sort((a, b) => {
      const ka = sortKey(a);
      const kb = sortKey(b);
      if (ka !== kb) return ka - kb;
      return a.localeCompare(b);
    });

  const pubFiles = fs.readdirSync(pubDir).filter(isMedia);
  let coverFile = findCover(pubFiles);
  if (!coverFile) {
    warnings.push(
      cat.folder + ": no cover in public, using first source as cover"
    );
    const first = srcFiles[0];
    const ext = path.extname(first).toLowerCase();
    coverFile = "cover" + (ext === ".png" ? ".png" : ".jpeg");
    fs.copyFileSync(path.join(srcDir, first), path.join(pubDir, coverFile));
  }

  const projectSrc = srcFiles.filter((f) => !/^cover\./i.test(f));
  const seen = new Map();
  const projects = [];
  const projectLabels = [];

  for (const file of projectSrc) {
    const label = titleFromFilename(file);
    let slug = toKebab(label);
    if (!slug) {
      warnings.push("empty slug for " + file);
      continue;
    }
    const n = (seen.get(slug) || 0) + 1;
    seen.set(slug, n);
    const base = n > 1 ? `${slug}-${n}` : slug;
    const ext = path.extname(file).toLowerCase();
    const outExt =
      ext === ".png" ? ".png" : ext === ".webp" ? ".webp" : ".jpeg";
    const outName = base + outExt;
    fs.copyFileSync(path.join(srcDir, file), path.join(pubDir, outName));
    projects.push(`/portfolio/${cat.folder}/${outName}`);
    projectLabels.push(label);
  }

  const keep = new Set([coverFile, ...projects.map((p) => path.basename(p))]);
  for (const f of fs.readdirSync(pubDir).filter(isMedia)) {
    if (!keep.has(f)) {
      fs.unlinkSync(path.join(pubDir, f));
      warnings.push("removed orphan " + cat.folder + "/" + f);
    }
  }

  portfolio.push({
    number: cat.number,
    slug: cat.slug,
    title: cat.title,
    menuLabel: cat.menuLabel,
    group: cat.group,
    short: cat.short,
    headline: cat.headline,
    intro: cat.intro,
    cover: `/portfolio/${cat.folder}/${coverFile}`,
    projects,
    projectLabels,
  });
}

let out = "export const PORTFOLIO: PortfolioCategory[] = [\n";
for (const c of portfolio) {
  out += "  {\n";
  out += `    number: ${esc(c.number)},\n`;
  out += `    slug: ${esc(c.slug)},\n`;
  out += `    title: ${esc(c.title)},\n`;
  out += `    menuLabel: ${esc(c.menuLabel)},\n`;
  out += `    group: ${esc(c.group)},\n`;
  out += `    short: ${esc(c.short)},\n`;
  out += `    headline: ${renderArray(c.headline, 4)},\n`;
  out += `    intro: ${esc(c.intro)},\n`;
  out += `    cover: ${esc(c.cover)},\n`;
  out += `    projects: ${renderArray(c.projects, 4)},\n`;
  out += `    projectLabels: ${renderArray(c.projectLabels, 4)},\n`;
  out += "  },\n";
}
out += "];\n";

fs.writeFileSync("portfolio-generated.ts", out, "utf8");
fs.writeFileSync(
  "portfolio-manifest.json",
  JSON.stringify({ portfolio, warnings }, null, 2),
  "utf8"
);

console.log("categories", portfolio.length);
for (const c of portfolio) {
  console.log(c.slug, c.projects.length, "cover=", path.basename(c.cover));
}
console.log("warnings", warnings.length);
for (const w of warnings) console.log("  -", w);
