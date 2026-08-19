import fs from "node:fs";
import path from "node:path";
import {
  CLIENT_CATEGORY_SLUGS,
  CLIENT_NAME_OVERRIDES,
  type ClientCategory,
  type ClientLogo,
} from "@/lib/clients-data";

const CLIENTS_DIR = path.join(process.cwd(), "public/clients");

/** Final renamed homepage assets, kept explicit to exclude superseded files. */
const HOME_CLIENT_FILES = [
  { file: "AlliedBank_logo.png", slug: "allied-bank" },
  { file: "AskariBank_logo.png", slug: "askari-bank" },
  { file: "Bareeze_logo.png", slug: "bareeze" },
  { file: "Bata_logo.png", slug: "bata" },
  { file: "TheBankOfPunjab_logo.png", slug: "bank-of-punjab" },
  { file: "FatimaGroup_logo.png", slug: "fatima-group" },
  { file: "FFC_logo.png", slug: "ffc" },
  { file: "GoldenPearl_logo.png", slug: "golden-pearl" },
  { file: "HiNutririon_logo.png", slug: "hi-nutrition" },
  { file: "Interloop_logo.png", slug: "interloop" },
  { file: "KAPCO_logo.png", slug: "kapco" },
  { file: "Khaadi_logo.png", slug: "khaadi" },
  { file: "KohatCement_logo.png", slug: "kohat-cement" },
  { file: "LuckyCement_logo.png", slug: "lucky-cement" },
  { file: "LUMS_logo.png", slug: "lums" },
  { file: "MariaB_logo.png", slug: "maria-b" },
  { file: "mcbBank_logo.png", slug: "mcb-bank" },
  { file: "MughalSteel_logo.png", slug: "mughal-steel" },
  { file: "Nestle_logo.png", slug: "nestle" },
  { file: "NeutroPharma_logo.png", slug: "neutro-pharma" },
  { file: "OGDC_logo.png", slug: "ogdc" },
  { file: "PTC_Logo.png", slug: "ptc" },
  { file: "samsung_logo.png", slug: "samsung" },
  { file: "Wateen_Logo.png", slug: "wateen" },
] as const;

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
  return HOME_CLIENT_FILES.map(({ file, slug }) => ({
    slug,
    name: slugToName(slug),
    logo: `/full-latest-logos/${file}`,
    category: slugToCategory(slug),
  }));
}
