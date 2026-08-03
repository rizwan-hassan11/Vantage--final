import type { LogoEntry } from "@/lib/content";

export const CLIENT_CATEGORIES = [
  "All",
  "Fashion & Lifestyle",
  "Banking & Finance",
  "FMCG & Food",
  "Automotive",
  "Real Estate",
  "Pharma & Wellness",
  "Industrial & Energy",
  "Technology",
  "Education",
] as const;

export type ClientCategory = (typeof CLIENT_CATEGORIES)[number];

export type ClientLogo = LogoEntry & {
  category: Exclude<ClientCategory, "All">;
};

/* Slugs mirror the files in public/clients — the approved 40-logo set. */
export const CLIENT_CATEGORY_SLUGS: Record<
  Exclude<ClientCategory, "All">,
  readonly string[]
> = {
  "Fashion & Lifestyle": [
    "bareeze",
    "bata",
    "home-and-you",
    "hugo-boss",
    "interloop",
    "khaadi",
    "laura-ashley",
    "maria-b",
    "martha-stewart",
    "michael-kors",
    "nautica",
    "next",
    "ralph-lauren",
    "tchibo",
    "ted-baker",
  ],
  "Banking & Finance": [
    "allied-bank",
    "askari-bank",
    "bank-of-punjab",
    "mcb-bank",
  ],
  "FMCG & Food": [
    "fresh-and-white",
    "golden-pearl",
    "hi-nutrition",
    "nestle",
  ],
  Automotive: ["hyundai", "mg-motors", "millat-tractors"],
  "Real Estate": [],
  "Pharma & Wellness": ["homeo-cure", "neutro-pharma"],
  "Industrial & Energy": [
    "fatima-fertilizer",
    "ffc",
    "hubco",
    "kohat-cement",
    "lucky-cement",
    "mughal-steel",
    "ogdc",
    "total-parco",
  ],
  Technology: ["ptc", "samsung", "wateen"],
  Education: ["lums"],
};

export const CLIENT_NAME_OVERRIDES: Record<string, string> = {
  "allied-bank": "Allied Bank",
  "askari-bank": "Askari Bank",
  "bank-of-punjab": "Bank of Punjab",
  "fatima-fertilizer": "Fatima Fertilizer",
  ffc: "FFC",
  "fresh-and-white": "Fresh & White",
  "golden-pearl": "Golden Pearl",
  "hi-nutrition": "Hi-Nutrition",
  "home-and-you": "Home & You",
  "homeo-cure": "Homeo Cure",
  hubco: "HUBCO",
  "hugo-boss": "Hugo Boss",
  hyundai: "Hyundai",
  khaadi: "Khaadi",
  "kohat-cement": "Kohat Cement",
  "laura-ashley": "Laura Ashley",
  "lucky-cement": "Lucky Cement",
  lums: "LUMS",
  "maria-b": "Maria.B",
  "martha-stewart": "Martha Stewart",
  "mcb-bank": "MCB Bank",
  "mg-motors": "MG Motors",
  "michael-kors": "Michael Kors",
  "millat-tractors": "Millat Tractors",
  "mughal-steel": "Mughal Steel",
  nestle: "Nestlé",
  "neutro-pharma": "Neutro Pharma",
  ogdc: "OGDC",
  ptc: "PTC",
  "ralph-lauren": "Ralph Lauren",
  samsung: "Samsung",
  tchibo: "Tchibo",
  "ted-baker": "Ted Baker",
  "total-parco": "Total Parco",
};
