/**
 * Vantage — Content model
 * Data source for all sections. Text is Vantage's; structure mirrors
 * the editorial rhythm of hemlock.com adapted for a print & packaging house.
 */

export const COMPANY = {
  name: "Vantage Printers",
  legal: "Vantage Printers Pvt Ltd.",
  tagline: "Think Beyond",
  years: 34,
  phone: "+92 42 3576 5001",
  phoneHref: "tel:+924235765001",
  email: "hello@vantage.pk",
  emailHref: "mailto:hello@vantage.pk",
  address: {
    line1: "18-KM Multan Road, Mohlanwal",
    line2: "Lahore, 54000, Pakistan",
  },
} as const;

export const NAV_LINKS = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "Company", href: "#company" },
  { label: "Inklings", href: "#latest" },
  { label: "Contact", href: "#contact" },
] as const;

/* ============================================================
   HERO
   ============================================================ */
export const HERO = {
  eyebrow: "Vantage Printers",
  headline: [
    "Pakistan's top brands trust",
    "Vantage",
    "for their print and packaging needs.",
  ],
  description:
    "We deliver superior results through expert craftsmanship, advanced machinery, and sustainable print practices — engineered under one roof in Lahore.",
  primaryCta: { label: "Learn More", href: "#services" },
  secondaryCta: { label: "Request a Quote", href: "#contact" },
  videoWebm: "/showreel.webm",
  videoMp4: "/showreel.mp4",
  poster: "/hero-press.webp",
} as const;

/* ============================================================
   SERVICES
   Five core offerings — matched to Vantage's press floor.
   ============================================================ */
export type Service = {
  number: string;
  slug: string;
  title: string;
  short: string;
  description: string;
  image: string;
  bullets: string[];
};

export const SERVICES_INTRO =
  "Large or small, complex or precision-critical — the Vantage team delivers flexible, innovative, high-quality print solutions across a wide range of applications. Because your project matters.";

export const SERVICES: Service[] = [
  {
    number: "01",
    slug: "offset",
    title: "Offset Printing",
    short: "Heidelberg Speedmaster · 5-colour + aqueous coating.",
    description:
      "Sheet-fed offset built for volume and consistency. Heidelberg Speedmaster lines running up to 18,000 sheets per hour with in-line aqueous coating for premium commercial print.",
    image: "/facility/printing-1.webp",
    bullets: [
      "Up to 18,000 sheets / hour",
      "5-colour + aqueous coating",
      "G7-managed colour workflow",
      "Sheet sizes to 106 × 74 cm",
    ],
  },
  {
    number: "02",
    slug: "flexo",
    title: "Flexo Printing",
    short: "BOBST Master M5 UV flexo for labels and flexibles.",
    description:
      "Roll-to-roll UV flexography for shrink sleeves, in-mould labels and flexible packaging. Multi-station registration for tight repeat tolerance on the toughest substrates.",
    image: "/facility/flexo-printing.webp",
    bullets: [
      "BOBST Master M5 UV line",
      "Multi-substrate: film, foil, paper",
      "In-line die-cutting and lamination",
      "Shrink sleeves and IML labels",
    ],
  },
  {
    number: "03",
    slug: "digital",
    title: "Digital Printing",
    short: "Xerox iGen 5 · 2400 dpi with variable data.",
    description:
      "Short-run and personalised print at production speed. Xerox iGen 5 delivers photo-quality output with variable data for campaigns, prototypes and rapid turnarounds.",
    image: "/facility/digital-press.webp",
    bullets: [
      "Xerox iGen 5 press",
      "2,400 dpi resolution",
      "Variable data at speed",
      "Fifth-colour capability",
    ],
  },
  {
    number: "04",
    slug: "screen",
    title: "Screen Printing",
    short: "Precision screen for specialty inks and textures.",
    description:
      "Manual and semi-automatic screen for specialty finishes — spot UV, tactile varnishes, metallics and heavy pigment loads on paper, plastic and board.",
    image: "/facility/screen-printing.webp",
    bullets: [
      "Spot UV and raised varnish",
      "Metallic and fluorescent inks",
      "Registration to 0.1 mm",
      "Speciality substrates supported",
    ],
  },
  {
    number: "05",
    slug: "design",
    title: "Design Printing",
    short: "Structural design, prototyping and prepress.",
    description:
      "In-house structural engineering, dielines and prototyping — integrated with CTP plate making so design decisions carry cleanly through to the press.",
    image: "/facility/design-dept.webp",
    bullets: [
      "Structural packaging design",
      "Rapid prototyping and dielines",
      "Computer-to-Plate (CTP) prepress",
      "Colour management and proofing",
    ],
  },
];

/* ============================================================
   PORTFOLIO
   ============================================================ */
export type PortfolioCategory = {
  number: string;
  title: string;
  image: string;
  count: string;
};

export const PORTFOLIO: PortfolioCategory[] = [
  {
    number: "01",
    title: "Publications",
    image: "/facility/production.webp",
    count: "Annual reports · Magazines · Catalogues",
  },
  {
    number: "02",
    title: "Marketing Materials",
    image: "/portfolio-demo/business-card-demo.png",
    count: "Brochures · Direct mail · Collateral",
  },
  {
    number: "03",
    title: "Packaging",
    image: "/facility/die-cutting.webp",
    count: "Rigid boxes · Folding cartons · Sleeves",
  },
  {
    number: "04",
    title: "Labels & Sleeves",
    image: "/facility/flexo.webp",
    count: "Shrink sleeves · In-mould · Wet glue",
  },
  {
    number: "05",
    title: "Books",
    image: "/facility/team-office.webp",
    count: "Hard case · Perfect bound · Saddle",
  },
  {
    number: "06",
    title: "Display",
    image: "/facility/showcase.webp",
    count: "POS · Standees · Retail signage",
  },
  {
    number: "07",
    title: "Stationery",
    image: "/portfolio-demo/annual-report-demo.png",
    count: "Business cards · Letterhead · Notebooks",
  },
];

/* ============================================================
   INKLINGS (Latest / blog)
   ============================================================ */
export type Inkling = {
  date: string;
  category: string;
  title: string;
  image: string;
  href: string;
};

export const LATEST: Inkling[] = [
  {
    date: "Jun 12",
    category: "Inklings",
    title: "Fulfillment Solutions That Scale With Your Brand",
    image: "/facility/store.webp",
    href: "#",
  },
  {
    date: "May 24",
    category: "Inklings",
    title: "Inside the Vantage Colour Lab: G7-Managed Consistency",
    image: "/facility/color-management.webp",
    href: "#",
  },
  {
    date: "May 09",
    category: "Inklings",
    title: "A Night of Print Innovation at Vantage Open House 2026",
    image: "/facility/team-group.webp",
    href: "#",
  },
];

/* ============================================================
   SUSTAINABILITY
   ============================================================ */
export const SUSTAINABILITY = {
  headline: "Print with intent.",
  body: "Vantage runs on responsible sourcing, low-VOC inks, and energy-optimised production. From soy-based inks to FSC-certified papers, every choice is engineered to reduce our footprint without compromising the finished work.",
  pillars: [
    {
      title: "FSC-certified stock",
      body: "Paper and board traced to responsibly managed forests.",
    },
    {
      title: "Low-impact inks",
      body: "Soy and vegetable-based ink systems across offset lines.",
    },
    {
      title: "Optimised production",
      body: "Waste reduction from prepress ganging to press make-ready.",
    },
    {
      title: "Recyclable packaging",
      body: "Structural designs engineered for the circular economy.",
    },
  ],
} as const;

/* ============================================================
   CERTIFICATIONS
   ============================================================ */
export const CERTIFICATIONS = [
  {
    id: "g7",
    name: "G7 Master",
    tag: "Colour Calibration",
    description:
      "Neutral grey balance and predictable colour across every press line.",
  },
  {
    id: "iso",
    name: "ISO 12647-2",
    tag: "Print Standard",
    description:
      "International offset print quality benchmark for commercial production.",
  },
  {
    id: "fogra",
    name: "FOGRA51",
    tag: "Proofing Profile",
    description:
      "Industry-standard colour profile for accurate proof-to-press matching.",
  },
  {
    id: "icap",
    name: "ICAP",
    tag: "Design & Print Awards",
    description:
      "Multiple ICAP wins for design excellence in Pakistan's print industry.",
  },
] as const;

/* ============================================================
   CLIENTS
   ============================================================ */
export const CLIENT_LOGOS = [
  "lacoste",
  "tommy-hilfiger",
  "ralph-lauren",
  "hugo-boss",
  "michael-kors",
  "ted-baker",
  "nautica",
  "tommy-bahama",
  "khaadi",
  "sapphire",
  "bareeze",
  "maria-b",
  "next",
  "bata",
  "samsung",
  "huawei",
  "hyundai",
  "mg-motors",
  "millat-tractors",
  "nestle",
  "fauji-foods",
  "parley",
  "goree",
  "golden-pearl",
  "lucky-cement",
  "fccl",
  "crescent-steel",
  "mughal-steel",
  "hubco",
  "kapco",
  "ogdc",
  "total-parco",
  "allied-bank",
  "mcb-bank",
  "bank-of-punjab",
  "askari-bank",
  "wateen",
  "ptc",
  "lums",
  "gift-university",
] as const;

/* ============================================================
   COMPANY / STATS
   ============================================================ */
export const STATS = [
  { value: "34", suffix: "yrs", label: "Of craftsmanship" },
  { value: "500", suffix: "+", label: "Brands served" },
  { value: "150", suffix: "+", label: "Design & print awards" },
  { value: "40", suffix: "+", label: "Machines on the floor" },
] as const;

export const ABOUT = {
  eyebrow: "Company",
  headline: "Engineering-first printing.",
  body: "Vantage is an engineering-first printing house. The merchandiser scoping your job is the merchandiser running it on press — one accountable team across prepress, print, finishing and dispatch.",
  image: "/facility/team-group.webp",
  points: [
    "Founded 1992 in Lahore",
    "40+ machines across offset, flexo, digital and screen",
    "Full in-house prepress, finishing and dispatch",
    "Working with 500+ brands across Pakistan and export markets",
  ],
} as const;
