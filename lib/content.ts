/**
 * Vantage — Content model
 * Data source for all sections. Text is Vantage's; structure mirrors
 * the editorial rhythm of hemlock.com adapted for a print & packaging house.
 */

const PHOTOS = "/Images_for_web/Photos for Web";

export const IMG = {
  // Facility
  printing1: `${PHOTOS}/Printing 1.jpg`,
  printing2: `${PHOTOS}/Printing 2.jpg`,
  flexo: `${PHOTOS}/Flexo Printing.jpg`,
  flexo2: `${PHOTOS}/Flexo Printing 2.jpg`,
  flexo3: `${PHOTOS}/Flexo Printing 3.jpg`,
  flexoPhoto: `${PHOTOS}/Flexo.jpg`,
  digital: `${PHOTOS}/Digital-2019-1.jpg`,
  screen: `${PHOTOS}/Screen Printing.jpg`,
  design: `${PHOTOS}/Design Dept.jpg`,
  designHiRes: `${PHOTOS}/Design Dept 2019-4.jpg`,
  foldGather: `${PHOTOS}/F&G.jpg`,
  dieCutting: `${PHOTOS}/Die Cutting 1.jpg`,
  cutting: `${PHOTOS}/Cutting.jpg`,
  cuttingHiRes: `${PHOTOS}/Cutting-2019-1.jpg`,
  lamination: `${PHOTOS}/Lamination.jpg`,
  lamination2: `${PHOTOS}/Lamination 2.jpg`,
  colorMgmt: `${PHOTOS}/Color Management.jpg`,
  ctp: `${PHOTOS}/CTP.jpg`,
  inspection: `${PHOTOS}/Inspection.jpg`,
  quality: `${PHOTOS}/QC-2019-1.jpg`,
  production: `${PHOTOS}/Production-2019-4.jpg`,
  packing: `${PHOTOS}/Packing.jpg`,
  store: `${PHOTOS}/Store.jpg`,
  teamStore: `${PHOTOS}/Team Store.jpg`,
  sales: `${PHOTOS}/Sales.jpg`,
  building: `${PHOTOS}/Building-2019-1.jpg`,
  hr: `${PHOTOS}/HR-2019-5.jpg`,
  showcase: `${PHOTOS}/2B0A6903.jpg`,
  showcase2: `${PHOTOS}/2006-Profile Shoot-134.jpg`,
  extra1: `${PHOTOS}/IMG_7678.JPG`,
  extra2: `${PHOTOS}/IMG_8288.JPG`,
  extra3: `${PHOTOS}/IMG_8829.JPG`,
  // Team
  usmanCeo: `${PHOTOS}/Usman Sales.jpg`,
  amerCfo: `${PHOTOS}/Amir Nawaz CFO.jpg`,
  adnanBashir: `${PHOTOS}/Adnan Sales.jpg`,
  adnanAhmad: `${PHOTOS}/Sales.jpg`,
  aliGm: `${PHOTOS}/Ali Touqeer GM.jpg`,
  asmerPre: `${PHOTOS}/Asmer Manager Pre-Press.jpg`,
  qasimDesign: `${PHOTOS}/Qasim Design.jpg`,
  naveedSales: `${PHOTOS}/Naveed Sales.jpg`,
  alianSales: `${PHOTOS}/Alian Sales.jpg`,
  zubairSales: `${PHOTOS}/Zubair Sales.jpg`,
  imbesatSales: `${PHOTOS}/Imbesat Adnan.jpg`,
  // Vantage brand photography — primary service hero imagery
  companyHero: "/vantage-photos/Vantage Building.png",
  offsetMain: "/vantage-images/Offset Printing/Offset Main.png",
  offsetAlt:
    "/vantage-images/Offset Printing/ChatGPT Image Jul 11, 2026, 05_33_23 PM.png",
  digitalMain: "/vantage-images/Digital Printing/Digital Main.png",
  flexoMain:
    "/vantage-images/Flexo Printing/ChatGPT Image Jul 13, 2026, 12_26_52 PM.png",
  flexoAlt:
    "/vantage-images/Flexo Printing/ChatGPT Image Jul 11, 2026, 10_48_31 AM.png",
  finishingMain: "/vantage-images/Finishing/Finishing Main.png",
  finishingAlt:
    "/vantage-images/Finishing/ChatGPT Image Jul 11, 2026, 10_24_13 AM.png",
  finishingAlt2:
    "/vantage-images/Finishing/ChatGPT Image Jul 10, 2026, 06_35_32 PM.png",
  screenMain:
    "/vantage-images/Warehouse/ChatGPT Image Jul 11, 2026, 11_19_30 AM.png",
  designMain:
    "/vantage-images/Design & Pre-Press/ChatGPT Image Jul 13, 2026, 12_17_49 PM.png",
  designAlt:
    "/vantage-images/Design & Pre-Press/ChatGPT Image Jul 11, 2026, 10_31_35 AM.png",
  designAlt2:
    "/vantage-images/Design & Pre-Press/ChatGPT Image Jul 11, 2026, 05_48_52 PM.png",
  designAlt3:
    "/vantage-images/Design & Pre-Press/ChatGPT Image Jul 11, 2026, 03_41_08 PM.png",
  warehouseMain:
    "/vantage-images/Warehouse/ChatGPT Image Jul 10, 2026, 04_12_42 PM.png",
} as const;

/** Home Services chapter — full-bleed BG carousel */
export const SERVICES_HOME_BG = [
  IMG.offsetMain,
  IMG.offsetAlt,
  IMG.flexoMain,
  IMG.flexoAlt,
  IMG.digitalMain,
  IMG.designMain,
  IMG.designAlt,
  IMG.designAlt2,
  IMG.designAlt3,
  IMG.finishingMain,
  IMG.finishingAlt,
  IMG.finishingAlt2,
  IMG.warehouseMain,
] as const;

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
  copyrightYear: 2026,
} as const;

export const FOOTER = {
  getInTouch: [
    { label: "Contact Us", href: "/contact" },
  ],
  resources: [
    { label: "Prepare Files", href: "/contact" },
  ],
} as const;

export const NAV_LINKS = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Company", href: "/company" },
] as const;

export const COMPANY_NAV = [
  { label: "About Vantage", href: "/company" },
  { label: "Clients", href: "/clients" },
  { label: "Partners", href: "/partners" },
] as const;

/* ============================================================
   CONTACT PAGE
   ============================================================ */
export const CONTACT_PAGE = {
  eyebrow: "Get in Touch",
  title: "Contact",
  intro:
    "Talk to Vantage about your next print or packaging project. Our team responds within one working day.",
  heroImage: "/vantage-images/HR/HR-2019-7.png",
  offices: [
    {
      name: "Head Office & Factory",
      note: "Lahore, Pakistan",
      lines: [
        "Vantage Printers Pvt Ltd.",
        "18-KM Multan Road, Mohlanwal",
        "Lahore, 54000, Pakistan",
      ],
      mapHref:
        "https://www.google.com/maps/search/?api=1&query=18-KM+Multan+Road+Mohlanwal+Lahore",
      contactName: "General enquiries",
      phone: "+92 42 3576 5001",
      phoneHref: "tel:+924235765001",
      email: "hello@vantage.pk",
      emailHref: "mailto:hello@vantage.pk",
    },
    {
      name: "New Business",
      note: "Quotes, briefs & sampling",
      lines: [
        "Estimation runs six days a week.",
        "Share artwork, spec sheets or a rough brief — we scope, cost and sample.",
      ],
      contactName: "Sales & Estimation",
      phone: "+92 42 3576 5002",
      phoneHref: "tel:+924235765002",
      email: "sales@vantage.pk",
      emailHref: "mailto:sales@vantage.pk?subject=New%20Project%20Enquiry",
    },
    {
      name: "Studio & Prepress",
      note: "Design, artwork & proofing",
      lines: [
        "In-house design studio and prepress team.",
        "Send working files, references, or ask for a spec check before print.",
      ],
      contactName: "Creative Desk",
      phone: "+92 42 3576 5003",
      phoneHref: "tel:+924235765003",
      email: "studio@vantage.pk",
      emailHref: "mailto:studio@vantage.pk?subject=Studio%20Enquiry",
    },
    {
      name: "Press & Media",
      note: "Interviews, tours & partnerships",
      lines: [
        "Coverage, factory tours and industry collaborations.",
        "Media kit and imagery available on request.",
      ],
      contactName: "Media Relations",
      email: "press@vantage.pk",
      emailHref: "mailto:press@vantage.pk?subject=Press%20Enquiry",
    },
  ],
  careers: {
    eyebrow: "Join Our Team",
    title: "Interested in joining our team?",
    body: "Check out our current opportunities on the press floor, in the studio, and across operations.",
    ctaLabel: "See Openings",
    ctaHref: "mailto:careers@vantage.pk?subject=Careers%20Enquiry",
  },
  hero: {
    brandTitle: "Contact",
    taglineLead:
      "Let's make your next print project a success with Vantage Printers.",
    taglineConnector: "",
    taglineEmphasis: "",
    metaLabel: "E",
    primaryCta: { label: "Get a Quote", href: "#quote-form" },
    phone: "+92 042 4589554",
    phoneHref: "tel:+92424589554",
    email: "info@vantageprinters.com",
    emailHref: "mailto:info@vantageprinters.com",
    address: "28 N Gullberg II Vantage Printers Lahore, 54660, Pakistan",
  },
  curtain: {
    title: "Get in Touch",
    intro:
      "Talk to Vantage about your next print or packaging project. Our team responds within one working day.",
  },
  quote: {
    title: "Get a Quote",
    intro: "Have a project in mind? Let's make it happen together.",
  },
} as const;

/* ============================================================
   QUOTE PAGE
   ============================================================ */
export const QUOTE_PAGE = {
  eyebrow: "Start a Project",
  title: "Contact Us",
  intro:
    "Tell us about your print or packaging job — our estimation team scopes, costs and responds within one business day.",
  email: "sales@vantage.pk",
  emailHref: "mailto:sales@vantage.pk?subject=Quote%20Request",
  phone: COMPANY.phone,
  phoneHref: COMPANY.phoneHref,
  steps: [
    {
      number: "01",
      title: "Share your brief",
      body: "Project type, quantities, sizes, substrates and deadline — artwork optional at this stage.",
    },
    {
      number: "02",
      title: "Scope & estimate",
      body: "Our sales and prepress team review specs and return a detailed quote within one working day.",
    },
    {
      number: "03",
      title: "Sample & approval",
      body: "Press proofs or prototypes where needed — colour-accurate and signed off before production.",
    },
    {
      number: "04",
      title: "Print & dispatch",
      body: "One team from prepress through finishing and delivery — no hand-offs, no surprises.",
    },
  ],
  hero: {
    brandTitle: "Quote",
    taglineLead: "Start your",
    taglineConnector: "next",
    taglineEmphasis: "Project",
    metaLabel: "Steps",
    primaryCta: { label: "Request Quote", href: "#quote-form" },
  },
  curtain: {
    title: "Contact Us",
    intro:
      "Tell us about your print or packaging job — our estimation team scopes, costs and responds within one business day.",
  },
} as const;

/* ============================================================
   HERO
   ============================================================ */
export const HERO = {
  eyebrow: "Vantage Printers",
  taglineLead: "Sculpting Stories",
  taglineConnector: "with",
  taglineEmphasis: "Masterful Innovation",
  headline: [
    "Pakistan's top brands trust",
    "Vantage",
    "for their print and packaging needs.",
  ],
  description:
    "We deliver superior results through expert craftsmanship, advanced machinery, and sustainable print practices — engineered under one roof in Lahore.",
  signature: "Think Beyond",
  primaryCta: { label: "Learn More", href: "#services" },
  secondaryCta: { label: "Contact Us", href: "/contact" },
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
  hero: {
    brandTitle: string;
    taglineLead: string;
    taglineConnector: string;
    taglineEmphasis: string;
    metaLabel: string;
    primaryCta: { label: string; href: string };
  };
  curtain: {
    title: string;
    intro: string;
  };
};

export const SERVICES_INTRO =
  "From large runs to precision work, Vantage brings flexible, innovative print solutions under one roof — crafted with care, because every project matters.";

export const SERVICES: Service[] = [
  {
    number: "01",
    slug: "offset",
    title: "Offset Printing",
    short: "Heidelberg Speedmaster · 5-colour + aqueous coating.",
    description:
      "Sheet-fed offset built for volume and consistency. Heidelberg Speedmaster lines running up to 18,000 sheets per hour with in-line aqueous coating for premium commercial print.",
    image: IMG.offsetMain,
    bullets: [
      "Up to 18,000 sheets / hour",
      "5-colour + aqueous coating",
      "G7-managed colour workflow",
      "Sheet sizes to 106 × 74 cm",
    ],
    hero: {
      brandTitle: "Offset",
      taglineLead: "Heidelberg",
      taglineConnector: "Speedmaster",
      taglineEmphasis: "Press",
      metaLabel: "Capabilities",
      primaryCta: { label: "View Capabilities", href: "#service-details" },
    },
    curtain: {
      title: "Offset Printing",
      intro:
        "Sheet-fed offset built for volume and consistency. Heidelberg Speedmaster lines running up to 18,000 sheets per hour with in-line aqueous coating for premium commercial print.",
    },
  },
  {
    number: "02",
    slug: "flexo",
    title: "Flexo Printing",
    short: "BOBST Master M5 UV flexo for labels and flexibles.",
    description:
      "Roll-to-roll UV flexography for shrink sleeves, in-mould labels and flexible packaging. Multi-station registration for tight repeat tolerance on the toughest substrates.",
    image: IMG.flexoMain,
    bullets: [
      "BOBST Master M5 UV line",
      "Multi-substrate: film, foil, paper",
      "In-line die-cutting and lamination",
      "Shrink sleeves and IML labels",
    ],
    hero: {
      brandTitle: "Flexo",
      taglineLead: "BOBST",
      taglineConnector: "Master",
      taglineEmphasis: "M5 UV",
      metaLabel: "Capabilities",
      primaryCta: { label: "View Capabilities", href: "#service-details" },
    },
    curtain: {
      title: "Flexo Printing",
      intro:
        "Roll-to-roll UV flexography for shrink sleeves, in-mould labels and flexible packaging. Multi-station registration for tight repeat tolerance on the toughest substrates.",
    },
  },
  {
    number: "03",
    slug: "digital",
    title: "Digital Printing",
    short: "Xerox iGen 5 · 2400 dpi with variable data.",
    description:
      "Short-run and personalised print at production speed. Xerox iGen 5 delivers photo-quality output with variable data for campaigns, prototypes and rapid turnarounds.",
    image: IMG.digitalMain,
    bullets: [
      "Xerox iGen 5 press",
      "2,400 dpi resolution",
      "Variable data at speed",
      "Fifth-colour capability",
    ],
    hero: {
      brandTitle: "Digital",
      taglineLead: "Xerox",
      taglineConnector: "iGen",
      taglineEmphasis: "Production",
      metaLabel: "Capabilities",
      primaryCta: { label: "View Capabilities", href: "#service-details" },
    },
    curtain: {
      title: "Digital Printing",
      intro:
        "Short-run and personalised print at production speed. Xerox iGen 5 delivers photo-quality output with variable data for campaigns, prototypes and rapid turnarounds.",
    },
  },
  {
    number: "04",
    slug: "design",
    title: "Design and Prepress",
    short: "Structural design, prototyping and prepress.",
    description:
      "In-house structural engineering, dielines and prototyping — integrated with CTP plate making so design decisions carry cleanly through to the press.",
    image: IMG.designMain,
    bullets: [
      "Structural packaging design",
      "Rapid prototyping and dielines",
      "Computer-to-Plate (CTP) prepress",
      "Colour management and proofing",
    ],
    hero: {
      brandTitle: "Design",
      taglineLead: "Structural",
      taglineConnector: "design &",
      taglineEmphasis: "Prepress",
      metaLabel: "Capabilities",
      primaryCta: { label: "View Capabilities", href: "#service-details" },
    },
    curtain: {
      title: "Design and Prepress",
      intro:
        "In-house structural engineering, dielines and prototyping — integrated with CTP plate making so design decisions carry cleanly through to the press.",
    },
  },
  {
    number: "05",
    slug: "finishing",
    title: "Finishing",
    short: "Cutting, folding, binding, lamination and specialty finishes.",
    description:
      "A complete finishing floor under one roof — die-cutting, folding, gluing, perfect and case binding, lamination, foil and spot UV. Every job pressed, finished and dispatched without leaving the facility.",
    image: IMG.finishingMain,
    bullets: [
      "Die-cutting, folding and gluing",
      "Perfect, case and saddle binding",
      "Gloss/matte lamination and UV coating",
      "Foil stamping and embossing",
    ],
    hero: {
      brandTitle: "Finishing",
      taglineLead: "Complete",
      taglineConnector: "under one",
      taglineEmphasis: "Roof",
      metaLabel: "Capabilities",
      primaryCta: { label: "View Capabilities", href: "#service-details" },
    },
    curtain: {
      title: "Finishing",
      intro:
        "A complete finishing floor under one roof — die-cutting, folding, gluing, perfect and case binding, lamination, foil and spot UV. Every job pressed, finished and dispatched without leaving the facility.",
    },
  },
];

/* ============================================================
   PORTFOLIO
   ============================================================ */
export type PortfolioCategory = {
  number: string;
  slug: string;
  title: string;
  short: string;
  cover: string;
  span: "sm" | "md" | "lg";
  aspect: "square" | "wide" | "tall";
  projects: string[];
};

const PF = "/Portfolio";
const nums = (folder: string, tag: string, ext: string, count: number) =>
  Array.from({ length: count }, (_, i) => `${PF}/${folder}/${i + 1} ${tag}.${ext}`);

export const PORTFOLIO: PortfolioCategory[] = [
  {
    number: "01",
    slug: "cosmetic-packaging",
    title: "Cosmetics Packaging",
    short: "Beauty and skincare cartons with specialty finishes.",
    cover: `${PF}/Cosmatics Packaging/Hero Cos..png`,
    span: "sm",
    aspect: "square",
    projects: [
      `${PF}/Cosmatics Packaging/1 Cos.jpeg`,
      `${PF}/Cosmatics Packaging/3 Cos.jpeg`,
      `${PF}/Cosmatics Packaging/4 Cos.jpeg`,
      `${PF}/Cosmatics Packaging/5 Cos.png`,
      `${PF}/Cosmatics Packaging/6 Cos.png`,
      `${PF}/Cosmatics Packaging/7 Cos.png`,
      `${PF}/Cosmatics Packaging/8 Cos.png`,
      `${PF}/Cosmatics Packaging/9 Cos.jpeg`,
      `${PF}/Cosmatics Packaging/10 Cos.jpeg`,
      `${PF}/Cosmatics Packaging/11 cos.jpeg`,
      `${PF}/Cosmatics Packaging/12 Cos.jpeg`,
      `${PF}/Cosmatics Packaging/13 Cos.png`,
    ],
  },
  {
    number: "02",
    slug: "perfume-packaging",
    title: "Perfume Packaging",
    short: "Premium rigid boxes and folding cartons for fragrance.",
    cover: `${PF}/Perfume Packaging/Hero Per..png`,
    span: "sm",
    aspect: "tall",
    projects: nums("Perfume Packaging", "Per", "png", 12),
  },
  {
    number: "03",
    slug: "pharmaceutical-packaging",
    title: "Pharmaceutical Packaging",
    short: "Regulated pharma cartons and inserts at scale.",
    cover: `${PF}/Pharmaceutical Packaging/Hero Pharma.png`,
    span: "sm",
    aspect: "square",
    projects: nums("Pharmaceutical Packaging", "Pharma", "png", 12),
  },
  {
    number: "04",
    slug: "gift-and-utility-boxes",
    title: "Gift & Utility Boxes",
    short: "Rigid boxes, sleeve packs and utility carriers.",
    cover: `${PF}/Gift & Utility Boxes/Hero Boxes.png`,
    span: "md",
    aspect: "wide",
    projects: [
      `${PF}/Gift & Utility Boxes/1 Boxes.png`,
      `${PF}/Gift & Utility Boxes/2 Boxes.png`,
      `${PF}/Gift & Utility Boxes/3 Boxes.png`,
      `${PF}/Gift & Utility Boxes/4 Boxes.jpeg`,
      `${PF}/Gift & Utility Boxes/5 Boxes.jpeg`,
      `${PF}/Gift & Utility Boxes/6 Boxes.png`,
      `${PF}/Gift & Utility Boxes/7 Boxes.jpeg`,
      `${PF}/Gift & Utility Boxes/8 Boes.png`,
      `${PF}/Gift & Utility Boxes/9 Boxes.jpeg`,
      `${PF}/Gift & Utility Boxes/10 Boxes.jpeg`,
      `${PF}/Gift & Utility Boxes/11 Boxes.png`,
      `${PF}/Gift & Utility Boxes/12 Boxes.jpeg`,
    ],
  },
  {
    number: "05",
    slug: "annual-reports",
    title: "Annual Reports",
    short: "Corporate annual reports for public and private companies.",
    cover: `${PF}/Annual Reports/1 AR.png`,
    span: "md",
    aspect: "wide",
    projects: [
      `${PF}/Annual Reports/1 AR.png`,
      `${PF}/Annual Reports/2 AR.png`,
      `${PF}/Annual Reports/3 AR.png`,
      `${PF}/Annual Reports/4 AR.png`,
      `${PF}/Annual Reports/5 AR.jpeg`,
      `${PF}/Annual Reports/6 AR.png`,
      `${PF}/Annual Reports/7 AR.png`,
      `${PF}/Annual Reports/8 AR.png`,
      `${PF}/Annual Reports/9 AR.png`,
      `${PF}/Annual Reports/10 AR.png`,
      `${PF}/Annual Reports/11 AR.jpeg`,
      `${PF}/Annual Reports/12 AR.png`,
    ],
  },
  {
    number: "06",
    slug: "books-and-publications",
    title: "Books & Publications",
    short: "Hard-case, perfect-bound and saddle-stitch books.",
    cover: `${PF}/Books & Publications/Hero Books.png`,
    span: "md",
    aspect: "wide",
    projects: [
      `${PF}/Books & Publications/1 Books.png`,
      `${PF}/Books & Publications/2 Books.png`,
      `${PF}/Books & Publications/3 Books.png`,
      `${PF}/Books & Publications/4 Books.png`,
      `${PF}/Books & Publications/5 Books.png`,
      `${PF}/Books & Publications/6 Books.png`,
      `${PF}/Books & Publications/7 Books.png`,
      `${PF}/Books & Publications/8 Books.jpeg`,
      `${PF}/Books & Publications/9 Books.jpeg`,
      `${PF}/Books & Publications/10 Books.jpeg`,
    ],
  },
  {
    number: "07",
    slug: "real-estate",
    title: "Real Estate Collateral",
    short: "Property brochures, folders and premium collateral.",
    cover: `${PF}/Real Estate Collatrol/Hero RA.png`,
    span: "sm",
    aspect: "square",
    projects: nums("Real Estate Collatrol", "RA", "png", 12),
  },
  {
    number: "08",
    slug: "brochure-and-catalogues",
    title: "Brochures & Catalogues",
    short: "Product catalogues, marketing brochures, look books.",
    cover: `${PF}/Brochures & Catalogues/Hero B&C.jpeg`,
    span: "md",
    aspect: "wide",
    projects: [
      `${PF}/Brochures & Catalogues/1 B&C.png`,
      `${PF}/Brochures & Catalogues/2 B&C.png`,
      `${PF}/Brochures & Catalogues/3 B&C.png`,
      `${PF}/Brochures & Catalogues/4 B&C.png`,
      `${PF}/Brochures & Catalogues/5 B&C.jpeg`,
      `${PF}/Brochures & Catalogues/6 B&C.png`,
      `${PF}/Brochures & Catalogues/7 B&C.png`,
      `${PF}/Brochures & Catalogues/8 B&C.jpeg`,
      `${PF}/Brochures & Catalogues/9 B&C.png`,
      `${PF}/Brochures & Catalogues/10 B&C.png`,
      `${PF}/Brochures & Catalogues/11 B&C.jpeg`,
      `${PF}/Brochures & Catalogues/12 B&C.jpeg`,
      `${PF}/Brochures & Catalogues/13 B&C.png`,
      `${PF}/Brochures & Catalogues/14 B&C.png`,
    ],
  },
  {
    number: "09",
    slug: "home-and-textiles",
    title: "Home Textile Packaging",
    short: "Retail print for home, apparel and lifestyle brands.",
    cover: `${PF}/Home & Textile/Hero HT.png`,
    span: "md",
    aspect: "wide",
    projects: nums("Home & Textile", "HT", "png", 9),
  },
  {
    number: "10",
    slug: "labels-and-sleeves",
    title: "Labels & Sleeves",
    short: "Shrink sleeves, in-mould and wet-glue labels.",
    cover: `${PF}/Labels & Sleeves/Hero Lab.png`,
    span: "sm",
    aspect: "square",
    projects: nums("Labels & Sleeves", "Lab", "png", 12),
  },
];

/** Home portfolio chapter BG carousel — hero product shots only */
export const PORTFOLIO_HOME_BG = [
  `${PF}/Cosmatics Packaging/Hero Cos..png`,
  `${PF}/Perfume Packaging/Hero Per..png`,
  `${PF}/Pharmaceutical Packaging/Hero Pharma.png`,
  `${PF}/Gift & Utility Boxes/Hero Boxes.png`,
  `${PF}/Annual Reports/1 AR.png`,
  `${PF}/Books & Publications/Hero Books.png`,
  `${PF}/Real Estate Collatrol/Hero RA.png`,
  `${PF}/Brochures & Catalogues/Hero B&C.jpeg`,
  `${PF}/Home & Textile/Hero HT.png`,
  `${PF}/Labels & Sleeves/Hero Lab.png`,
] as const;

/** Hover preview crop classes — product framing per category */
export const PORTFOLIO_PREVIEW_CROP: Record<string, string> = {
  "cosmetic-packaging": "menu-preview__slide--fill-card",
  "perfume-packaging": "menu-preview__slide--product-tall",
  "pharmaceutical-packaging": "menu-preview__slide--product-box",
  "labels-and-sleeves": "menu-preview__slide--labels",
  "gift-and-utility-boxes": "menu-preview__slide--flat-lay",
  "home-and-textiles": "menu-preview__slide--flat-lay",
  "real-estate": "menu-preview__slide--folder",
  "books-and-publications": "menu-preview__slide--book",
  "brochure-and-catalogues": "menu-preview__slide--book",
  "annual-reports": "menu-preview__slide--report",
};

export type PortfolioCategoryMeta = {
  hero: {
    brandTitle: string;
    taglineLead: string;
    taglineConnector: string;
    taglineEmphasis: string;
    metaLabel: string;
    primaryCta: { label: string; href: string };
  };
  curtain: {
    title: string;
    intro: string;
  };
};

export const PORTFOLIO_CATEGORY_META: Record<string, PortfolioCategoryMeta> = {
  "books-and-publications": {
    hero: {
      brandTitle: "Books",
      taglineLead: "Hard-case",
      taglineConnector: "perfect-bound",
      taglineEmphasis: "Publications",
      metaLabel: "Projects",
      primaryCta: { label: "View Projects", href: "#portfolio-projects" },
    },
    curtain: {
      title: "Books & Publications",
      intro:
        "Hard-case, perfect-bound and saddle-stitch books — editorial print engineered for durability, colour fidelity and shelf presence.",
    },
  },
  "real-estate": {
    hero: {
      brandTitle: "Real Estate",
      taglineLead: "Property",
      taglineConnector: "brochures &",
      taglineEmphasis: "Collateral",
      metaLabel: "Projects",
      primaryCta: { label: "View Projects", href: "#portfolio-projects" },
    },
    curtain: {
      title: "Real Estate Collateral",
      intro:
        "Property brochures, folders and premium collateral — crafted to communicate value for Pakistan's leading developers and agencies.",
    },
  },
  "brochure-and-catalogues": {
    hero: {
      brandTitle: "Brochures",
      taglineLead: "Product",
      taglineConnector: "catalogues &",
      taglineEmphasis: "Look Books",
      metaLabel: "Projects",
      primaryCta: { label: "View Projects", href: "#portfolio-projects" },
    },
    curtain: {
      title: "Brochures & Catalogues",
      intro:
        "Product catalogues, marketing brochures and look books — high-impact print for retail, fashion and FMCG launches.",
    },
  },
  "annual-reports": {
    hero: {
      brandTitle: "Reports",
      taglineLead: "Corporate",
      taglineConnector: "annual",
      taglineEmphasis: "Publishing",
      metaLabel: "Projects",
      primaryCta: { label: "View Projects", href: "#portfolio-projects" },
    },
    curtain: {
      title: "Annual Reports",
      intro:
        "Corporate annual reports for public and private companies — precision colour, structured data layouts and premium finishing.",
    },
  },
  "perfume-packaging": {
    hero: {
      brandTitle: "Perfume",
      taglineLead: "Premium",
      taglineConnector: "rigid",
      taglineEmphasis: "Packaging",
      metaLabel: "Projects",
      primaryCta: { label: "View Projects", href: "#portfolio-projects" },
    },
    curtain: {
      title: "Perfume Packaging",
      intro:
        "Premium rigid boxes and folding cartons for fragrance — tactile finishes and structural design built for luxury retail.",
    },
  },
  "cosmetic-packaging": {
    hero: {
      brandTitle: "Cosmetics",
      taglineLead: "Beauty",
      taglineConnector: "cartons &",
      taglineEmphasis: "Finishes",
      metaLabel: "Projects",
      primaryCta: { label: "View Projects", href: "#portfolio-projects" },
    },
    curtain: {
      title: "Cosmetics Packaging",
      intro:
        "Beauty and skincare cartons with specialty finishes — foil, spot UV and precision registration for shelf-ready packaging.",
    },
  },
  "pharmaceutical-packaging": {
    hero: {
      brandTitle: "Pharma",
      taglineLead: "Regulated",
      taglineConnector: "cartons &",
      taglineEmphasis: "Inserts",
      metaLabel: "Projects",
      primaryCta: { label: "View Projects", href: "#portfolio-projects" },
    },
    curtain: {
      title: "Pharmaceutical Packaging",
      intro:
        "Regulated pharma cartons and inserts at scale — compliant workflows, tight colour control and reliable production volumes.",
    },
  },
  "labels-and-sleeves": {
    hero: {
      brandTitle: "Labels",
      taglineLead: "Shrink",
      taglineConnector: "sleeves &",
      taglineEmphasis: "In-mould",
      metaLabel: "Projects",
      primaryCta: { label: "View Projects", href: "#portfolio-projects" },
    },
    curtain: {
      title: "Labels & Sleeves",
      intro:
        "Shrink sleeves, in-mould and wet-glue labels — flexo precision for beverages, FMCG and industrial applications.",
    },
  },
  "home-and-textiles": {
    hero: {
      brandTitle: "Home",
      taglineLead: "Retail",
      taglineConnector: "print for",
      taglineEmphasis: "Lifestyle",
      metaLabel: "Projects",
      primaryCta: { label: "View Projects", href: "#portfolio-projects" },
    },
    curtain: {
      title: "Home Textile Packaging",
      intro:
        "Retail print for home, apparel and lifestyle brands — look books, hang tags and in-store collateral at production scale.",
    },
  },
  "gift-and-utility-boxes": {
    hero: {
      brandTitle: "Gift Boxes",
      taglineLead: "Rigid",
      taglineConnector: "boxes &",
      taglineEmphasis: "Carriers",
      metaLabel: "Projects",
      primaryCta: { label: "View Projects", href: "#portfolio-projects" },
    },
    curtain: {
      title: "Gift & Utility Boxes",
      intro:
        "Rigid boxes, sleeve packs and utility carriers — structural packaging engineered for unboxing moments and retail durability.",
    },
  },
};

export function getPortfolioCategoryMeta(slug: string): PortfolioCategoryMeta {
  const meta = PORTFOLIO_CATEGORY_META[slug];
  if (!meta) {
    throw new Error(`Missing portfolio category meta for slug: ${slug}`);
  }
  return meta;
}

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
    image: IMG.store,
    href: "#",
  },
  {
    date: "May 24",
    category: "Inklings",
    title: "Inside the Vantage Colour Lab: G7-Managed Consistency",
    image: IMG.colorMgmt,
    href: "#",
  },
  {
    date: "May 09",
    category: "Inklings",
    title: "A Night of Print Innovation at Vantage Open House 2026",
    image: IMG.sales,
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
   Logo files live in `public/clients/` — use getClients() from
   `@/lib/clients.server` for the full list at build/request time.
   ============================================================ */
export type LogoEntry = {
  name: string;
  slug: string;
  logo: string;
  category?: string;
};

export const CLIENTS_PAGE = {
  eyebrow: "Company",
  title: "Clients",
  intro:
    "From fashion and FMCG to banking, automotive and real estate — Vantage has earned the trust of Pakistan's most demanding brands for over three decades.",
  hero: {
    brandTitle: "Clients",
    taglineLead: "500+ Brands",
    taglineConnector: "trust",
    taglineEmphasis: "Vantage",
    metaLabel: "Featured clients",
    primaryCta: { label: "Browse Directory", href: "#client-directory" },
  },
  curtain: {
    title: "Client Directory",
    intro:
      "Search or filter by industry to explore the sectors Vantage serves across fashion, FMCG, banking, automotive, real estate and beyond.",
  },
} as const;

export const PARTNERS: (LogoEntry & { description: string })[] = [
  {
    name: "Heidelberg",
    slug: "heidelberg",
    logo: "/partners/heidelberg.svg",
    description: "Sheet-fed offset presses — Speedmaster lines for high-volume commercial print.",
  },
  {
    name: "BOBST",
    slug: "bobst",
    logo: "/partners/bobst.svg",
    description: "Die-cutting, folding and flexo equipment for labels and packaging.",
  },
  {
    name: "Xerox",
    slug: "xerox",
    logo: "/partners/xerox.svg",
    description: "Production digital printing — iGen 5 for short-run and variable data.",
  },
  {
    name: "Konica Minolta",
    slug: "konica-minolta",
    logo: "/partners/konica-minolta.svg",
    description: "Digital production systems and workflow integration.",
  },
  {
    name: "GMG Color",
    slug: "gmg",
    logo: "/partners/gmg.svg",
    description: "Colour management software — G7-calibrated proofing and prepress.",
  },
  {
    name: "Apple",
    slug: "apple",
    logo: "/partners/apple.svg",
    description: "Design and prepress workstations across studio and production.",
  },
];

export const PARTNERS_PAGE = {
  eyebrow: "Company",
  title: "Partners",
  intro:
    "World-class machinery and technology partners power every stage of the Vantage workflow — from colour-accurate prepress to high-speed press and finishing.",
  hero: {
    brandTitle: "Partners",
    taglineLead: "World-Class",
    taglineConnector: "press floor",
    taglineEmphasis: "Technology",
    metaLabel: "Technology partners",
    primaryCta: { label: "View Partners", href: "#partner-directory" },
  },
  curtain: {
    title: "Technology Partners",
    intro:
      "Heidelberg, BOBST, Xerox, Konica Minolta, GMG and more — the machinery and workflow partners behind every Vantage job.",
  },
  stats: [
    { value: "6", suffix: "", label: "Global partners" },
    { value: "40", suffix: "+", label: "Machines on the floor" },
    { value: "34", suffix: "yrs", label: "Of craftsmanship" },
    { value: "150", suffix: "+", label: "Design & print awards" },
  ],
} as const;

/** @deprecated Use CLIENTS for page rendering */
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
  headline: "Let's get in touch",
  body: "Vantage is an engineering-first printing house. The merchandiser scoping your job is the merchandiser running it on press — one accountable team across prepress, print, finishing and dispatch.",
  image: IMG.companyHero,
  points: [
    "Founded 1992 in Lahore",
    "40+ machines across offset, flexo, digital and finishing",
    "Full in-house prepress, finishing and dispatch",
    "Working with 500+ brands across Pakistan and export markets",
  ],
} as const;

/* ============================================================
   TEAM
   ============================================================ */
export type TeamMember = {
  name: string;
  role: string;
  image: string;
  imagePosition?: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Adnan Bashir",
    role: "Managing Director",
    image: "/team/placeholder.svg",
  },
  {
    name: "Ali Touqir",
    role: "General Manager Sales",
    image: IMG.aliGm,
    imagePosition: "center 15%",
  },
  { name: "Amer Nawaz", role: "Chief Financial Officer", image: IMG.amerCfo },
  {
    name: "Imbesat Adnan",
    role: "Manager Business Dev",
    image: IMG.imbesatSales,
  },
  {
    name: "Mian Usman",
    role: "Sr. Manager Sales",
    image: IMG.usmanCeo,
  },
  { name: "Zubair Alam", role: "Manager Sales", image: IMG.zubairSales },
  {
    name: "Naveed Bhatti",
    role: "Manager Sales",
    image: IMG.naveedSales,
  },
  {
    name: "Adnan Ahmed",
    role: "Manager Sales",
    image: IMG.adnanBashir,
  },
  {
    name: "Alian Hafeez",
    role: "Executive Sales",
    image: IMG.alianSales,
  },
  {
    name: "Qasim Raza",
    role: "Manager Creative",
    image: IMG.qasimDesign,
    imagePosition: "center 58%",
  },
  {
    name: "Syed Asmer Mahmood",
    role: "Manager Pre Press",
    image: IMG.asmerPre,
  },
];

/* ============================================================
   PORTFOLIO PAGE (extended)
   ============================================================ */
export const PORTFOLIO_PAGE = {
  eyebrow: "Portfolio",
  title: "Portfolio",
  intro:
    "Pakistan's top brands trust Vantage for their printing needs. We deliver superior results through expert craftsmanship, advanced machinery and decades of press-floor experience.",
  hero: {
    brandTitle: "Portfolio",
    taglineLead: "Exceptional",
    taglineConnector: "work across",
    taglineEmphasis: "Industries",
    metaLabel: "Categories",
    primaryCta: { label: "Browse Work", href: "#portfolio-categories" },
  },
  curtain: {
    title: "Browse by Category",
    intro:
      "Books, brochures, packaging, labels and more — explore Vantage work sorted by application and industry.",
  },
  stats: [
    { value: "10", suffix: "", label: "Categories" },
    { value: "117", suffix: "+", label: "Featured projects" },
    { value: "500", suffix: "+", label: "Brands served" },
    { value: "34", suffix: "yrs", label: "Of craftsmanship" },
  ],
} as const;

/* ============================================================
   SERVICES PAGE (extended)
   ============================================================ */
export const SERVICES_PAGE = {
  eyebrow: "Services",
  title: "Driven by craft, backed by machinery.",
  intro:
    "From high-volume offset to short-run digital, roll-fed flexo and finishing — six disciplines under one roof in Lahore.",
  hero: {
    brandTitle: "Services",
    taglineLead: "Driven by",
    taglineConnector: "craft, backed",
    taglineEmphasis: "by Machinery",
    metaLabel: "Disciplines",
    primaryCta: { label: "Browse Services", href: "#services-list" },
  },
  curtain: {
    title: "Our Services",
    intro: SERVICES_INTRO,
  },
  stats: [
    { value: "6", suffix: "", label: "Print disciplines" },
    { value: "40", suffix: "+", label: "Machines on the floor" },
    { value: "500", suffix: "+", label: "Brands served" },
    { value: "34", suffix: "yrs", label: "Of craftsmanship" },
  ],
} as const;

/* ============================================================
   SUSTAINABILITY PAGE (extended)
   ============================================================ */
export const SUSTAINABILITY_PAGE = {
  eyebrow: "Sustainability",
  title: "Sustainability inspires innovation.",
  intro:
    "Vantage's sustainability programme is designed for real impact — from FSC paper and low-VOC inks to energy-efficient production and closed-loop waste management.",
  substrates: {
    title: "Paper Substrates",
    body: "We stock and source responsibly certified paper and board across coated, uncoated, recycled and specialty ranges. Every job is spec'd to balance performance, feel and footprint.",
    highlights: [
      {
        title: "FSC-Certified",
        body: "Paper and board traced to responsibly managed forests worldwide.",
      },
      {
        title: "Recycled Content",
        body: "Post-consumer waste stocks available on request for both offset and digital.",
      },
      {
        title: "Low-Chlorine Bleaching",
        body: "ECF and PCF pulps preferred for premium coated and uncoated whites.",
      },
      {
        title: "Local Sourcing",
        body: "Regional mills prioritised where quality and traceability allow.",
      },
    ],
  },
};

/* ============================================================
   COMPANY PAGE (extended)
   ============================================================ */
export const COMPANY_PAGE = {
  eyebrow: "Company",
  title: "Integrity. Innovation. In print.",
  intro:
    "Since 1992, Vantage has grown from a single press to a 40-machine floor serving Pakistan's most demanding brands — built on engineering discipline, in-house craft, and long partnerships.",
  heroImage: "/vantage-images/HR/ChatGPT Image Jul 13, 2026, 01_57_02 PM.png",
  hero: {
    brandTitle: "Company",
    lines: [
      "Inspiring Concepts",
      "Intelligent Design",
      "Innovative Solutions",
    ],
    visionBody:
      "Our passion is creating the finest print products to enhance our clients businesses with our futuristic and unconditional approach. Our strong drive with staunch minds, and technological finesse makes us a unique printing & packaging facility.",
    visionLead: "Our Vision remains -",
    visionSignature: "Think Beyond",
    metaLabel: "Email us",
    primaryCta: { label: "Meet the Team", href: "#our-team" },
  },
  curtain: {
    title: "Our Vision\nremains",
    intro:
      "Our passion is creating the finest print products to enhance our clients' businesses with our futuristic and unconditional approach. Our strong drive with staunch minds, and technological finesse makes us a unique printing & packaging facility — Think Beyond.",
  },
  teamIntro: {
    title: "Our Team",
    paragraphs: [
      "Vantage's team brings a culture of integrity, passion and experience to every project, allowing us to provide the best possible print solutions for our clients.",
      "We are proud of our team and always looking for more people with a similar passion and experience for print.",
    ],
    ctaLabel: "View current opportunities.",
    ctaHref: "mailto:careers@vantage.pk?subject=Careers%20Enquiry",
  },
  stats: [
    { value: "34", suffix: "yrs", label: "Of craftsmanship" },
    { value: "500", suffix: "+", label: "Brands served" },
    { value: "40", suffix: "+", label: "Machines on the floor" },
    { value: "150", suffix: "+", label: "Design & print awards" },
  ],
  pillars: [
    {
      title: "Our Mission",
      body: "To deliver exceptional printed products through dedication to craft, continuous innovation, teamwork and sustainable practices.",
    },
    {
      title: "Our Vision",
      body: "To be the most progressive and sustainable print provider in South Asia.",
    },
    {
      title: "Our Values",
      body: "Create connections, build community, and inspire practices that safeguard the health of the wider industry.",
    },
  ],
} as const;

/* ============================================================
   INKLINGS PAGE (extended blog)
   ============================================================ */
export const INKLINGS_PAGE = {
  eyebrow: "Inklings",
  title: "Inklings Blog",
  intro: "Notes, wins and craft from the Vantage press floor.",
};

export const INKLINGS_POSTS: Inkling[] = [
  {
    date: "Jun 12, 2026",
    category: "Inklings",
    title: "Fulfillment Solutions That Scale With Your Brand",
    image: IMG.store,
    href: "#",
  },
  {
    date: "May 24, 2026",
    category: "Events",
    title: "Community and Print Education at the Lahore Book Fair",
    image: IMG.sales,
    href: "#",
  },
  {
    date: "May 09, 2026",
    category: "News",
    title: "A Night of Print Innovation at Vantage Open House 2026",
    image: IMG.hr,
    href: "#",
  },
  {
    date: "Apr 22, 2026",
    category: "Features",
    title: "Process-Less Plates: A Smarter, More Sustainable Future for Offset Printing",
    image: IMG.ctp,
    href: "#",
  },
  {
    date: "Apr 03, 2026",
    category: "News",
    title: "Case Making Now Available at Vantage's Bindery Facility",
    image: IMG.foldGather,
    href: "#",
  },
  {
    date: "Mar 18, 2026",
    category: "Features",
    title: "Perfect-Binding Precision That Shapes a Book",
    image: IMG.production,
    href: "#",
  },
];

export const INKLINGS_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "news", label: "News" },
  { id: "events", label: "Events" },
  { id: "features", label: "Features" },
  { id: "releases", label: "Releases" },
] as const;
