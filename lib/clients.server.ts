import fs from "node:fs";
import path from "node:path";
import {
  CLIENT_CATEGORY_SLUGS,
  CLIENT_NAME_OVERRIDES,
  type ClientCategory,
  type ClientLogo,
} from "@/lib/clients-data";

const CLIENTS_DIR = path.join(process.cwd(), "public/clients");
const HOME_CLIENTS_DIR = path.join(
  process.cwd(),
  "public/full-latest-logos"
);

const SLUG_TO_CATEGORY = Object.entries(CLIENT_CATEGORY_SLUGS).reduce(
  (acc, [category, slugs]) => {
    for (const slug of slugs) {
      acc[slug] = category as Exclude<ClientCategory, "All">;
    }
    return acc;
  },
  {} as Record<string, Exclude<ClientCategory, "All">>
);

function slugToName(slug: string): string {
  if (CLIENT_NAME_OVERRIDES[slug]) return CLIENT_NAME_OVERRIDES[slug];

  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function slugToCategory(slug: string): Exclude<ClientCategory, "All"> {
  return SLUG_TO_CATEGORY[slug] ?? "Industrial & Energy";
}

/** Server-only: reads client logos from `public/clients`. */
export function getClients(): ClientLogo[] {
  const files = fs.readdirSync(CLIENTS_DIR);
  const pngSlugs = new Set(
    files
      .filter((file) => file.endsWith(".png"))
      .map((file) => file.replace(/\.png$/, ""))
  );

  const entries: ClientLogo[] = files
    .filter((file) => file.endsWith(".png"))
    .sort()
    .map((file) => {
      const slug = file.replace(/\.png$/, "");
      return {
        slug,
        name: slugToName(slug),
        logo: `/clients/${file}`,
        category: slugToCategory(slug),
      };
    });

  for (const file of files.filter((file) => file.endsWith(".svg")).sort()) {
    const slug = file.replace(/\.svg$/, "");
    if (pngSlugs.has(slug) || slug === "mg") continue;

    entries.push({
      slug,
      name: slugToName(slug),
      logo: `/clients/${file}`,
      category: slugToCategory(slug),
    });
  }

  return entries.sort((a, b) => a.name.localeCompare(b.name));
}

/** Server-only: the approved logo set used exclusively on the homepage. */
export function getHomeClients(): ClientLogo[] {
  return fs
    .readdirSync(HOME_CLIENTS_DIR)
    .filter((file) => file.toLowerCase().endsWith(".png"))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => {
      const fileName = file.replace(/\.png$/i, "");
      const slug = fileName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      return {
        slug,
        name: fileName,
        logo: `/full-latest-logos/${file}`,
        category: slugToCategory(slug),
      };
    });
}
