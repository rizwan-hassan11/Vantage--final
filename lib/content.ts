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
  offsetAlt: "/vantage-images/Offset Printing/offset-alt.png",
  digitalMain: "/vantage-images/Digital Printing/Digital Main.png",
  flexoMain: "/vantage-images/Flexo Printing/flexo-main.png",
  flexoAlt: "/vantage-images/Flexo Printing/flexo-alt.png",
  finishingMain: "/vantage-images/Finishing/Finishing Main.png",
  finishingAlt: "/vantage-images/Finishing/finishing-alt.png",
  finishingAlt2: "/vantage-images/Finishing/finishing-alt-2.png",
  screenMain: "/vantage-images/Warehouse/screen-main.png",
  designMain: "/vantage-images/Design Pre-Press/design-main.png",
  designAlt: "/vantage-images/Design Pre-Press/design-alt.png",
  designAlt2: "/vantage-images/Design Pre-Press/design-alt-2.png",
  designAlt3: "/vantage-images/Design Pre-Press/design-alt-3.png",
  warehouseMain: "/vantage-images/Warehouse/warehouse-main.png",
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

/** Home interstitial — white floor between Hero and Selected Work */
export const HOME_HOW_WE_MAKE = {
  eyebrow: "How We Make It",
  heading: "Ideas are only the\nbeginning.",
  body: "Design, colour, materials, printing and finishing come together under one roof, transforming concepts into beautifully produced packaging and print.",
  /** Scroll-swapped watermark sequence */
  watermarks: ["IMAGINE", "PREPARE", "PRODUCE", "PERFECT"],
} as const;

/** Home print-technology rail — one panel opens per scroll step */
export const HOME_PRINT_TECH = {
  /** Sits in the rust badge above the display heading */
  eyebrow: "The power to make it real",
  heading: "Five print technologies.\nOne integrated production house.",
  body: [
    "From the first colour decision to the final finish, every critical stage stays connected, giving us greater control, greater consistency and more possibilities for every project.",
    "Concepts become beautifully produced packaging and print.",
  ],
  items: [
    {
      key: "offset",
      label: "Offset",
      color: "#111111",
      image: "/print-tech/offset.jpg",
      alt: "Operator at the console of a multi-colour offset press",
    },
    {
      key: "uv-offset",
      label: "UV Offset",
      color: "#e02b20",
      image: "/print-tech/uv-offset.jpg",
      alt: "Sheets running through the UV offset line",
    },
    {
      key: "flexo",
      label: "Flexo",
      color: "#00a24b",
      image: "/print-tech/flexo.jpg",
      alt: "Flexo press printing a reel of flexible packaging",
    },
    {
      key: "screen",
      label: "Screen",
      color: "#f5b400",
      image: "/print-tech/screen.jpg",
      alt: "Screen printing station on the production floor",
    },
    {
      key: "digital",
      label: "Digital",
      color: "#22a3dd",
      image: "/print-tech/digital.jpg",
      alt: "Digital press producing short-run print",
    },
  ],
} as const;

/** Home team rail — portraits open one at a time on scroll */
export const HOME_TEAM = {
  /** Sits in the rust badge above the display heading */
  eyebrow: "The people behind the work",
  heading: "Technology makes it possible.\nPeople make it exceptional.",
  body: "Designers, colour specialists, engineers, press operators and craftspeople, working together with one shared standard.",
  cta: { label: "Meet Vantage", href: "/core-team" },
} as const;

/** Home services card copy (sketch: How We Make It / Explore Our Capabilities) */
export const SERVICES_HOME = {
  eyebrow: "How We Make It",
  heading: "Ideas are only the beginning.",
  body: "Design, colours, materials, printing and finishing come together under one roof, giving us control over every detail of the finished product.",
  cta: { label: "Explore Our Capabilities", href: "/services" },
} as const;

export const COMPANY = {
  name: "Vantage Printers",
  legal: "Vantage Printers Private Limited",
  tagline: "Think Beyond",
  promise: "Packaging. Print. Possibility",
  years: 34,
  phone: "+92 42 3576 5001",
  phoneHref: "tel:+924235765001",
  email: "hello@vantage.pk",
  emailHref: "mailto:hello@vantage.pk",
  address: {
    line1: "28-N Gulberg Rd, Block N II",
    line2: "Lahore, 54660, Pakistan",
  },
  copyrightYear: 2026,
  socials: [
    {
      label: "Instagram",
      href: "https://www.instagram.com/vantageprinters/",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/vantage-printers/",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/vantageprinters/",
    },
  ],
} as const;

export const FOOTER = {
  nav: [
    { label: "Work", href: "/work" },
    { label: "Capabilities", href: "/services" },
    { label: "About Vantage", href: "/company" },
    { label: "Start a Project", href: "/quote" },
    { label: "Contact", href: "/contact" },
  ],
  /* The footer carries the switchboard line, general inbox and the full postal
     form of the address, which differ from the direct contacts in COMPANY. */
  address: {
    line1: "28-N Gulberg Road, Block N II",
    line2: "Gulberg II, Lahore 54660, Pakistan",
  },
  phone: "+92 42 3576 5001-5",
  phoneHref: "tel:+924235765001",
  email: "info@vantageprinters.com",
  emailHref: "mailto:info@vantageprinters.com",
} as const;

export const NAV_LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Company", href: "/company" },
] as const;

export const COMPANY_NAV = [
  { label: "About Vantage", href: "/company" },
  { label: "Clients", href: "/clients" },
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
        "28-N Gulberg Rd, Block N II",
        "Lahore, 54660, Pakistan",
      ],
      mapHref:
        "https://www.google.com/maps/search/?api=1&query=28-N+Gulberg+Rd+Block+N+II+Lahore+54660",
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
        "Share artwork, spec sheets or a rough brief. We scope, cost and sample.",
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
    primaryCta: { label: "Start a Project", href: "#quote-form" },
    phone: "+92 042 4589554",
    phoneHref: "tel:+92424589554",
    email: "info@vantageprinters.com",
    emailHref: "mailto:info@vantageprinters.com",
    address: "28-N Gulberg Rd, Block N II, Lahore, 54660",
  },
  curtain: {
    title: "Get in Touch",
    intro:
      "Talk to Vantage about your next print or packaging project. Our team responds within one working day.",
  },
  quote: {
    title: "Start a Project",
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
    "Tell us about your print or packaging job. Our estimation team scopes, costs and responds within one business day.",
  email: "sales@vantage.pk",
  emailHref: "mailto:sales@vantage.pk?subject=Quote%20Request",
  phone: COMPANY.phone,
  phoneHref: COMPANY.phoneHref,
  steps: [
    {
      number: "01",
      title: "Share your brief",
      body: "Project type, quantities, sizes, substrates and deadline. Artwork is optional at this stage.",
    },
    {
      number: "02",
      title: "Scope & estimate",
      body: "Our sales and prepress team review specs and return a detailed quote within one working day.",
    },
    {
      number: "03",
      title: "Sample & approval",
      body: "Press proofs or prototypes where needed, colour-accurate and signed off before production.",
    },
    {
      number: "04",
      title: "Print & dispatch",
      body: "One team from prepress through finishing and delivery. No hand-offs, no surprises.",
    },
  ],
  hero: {
    brandTitle: "Quote",
    taglineLead: "Start your",
    taglineConnector: "next",
    taglineEmphasis: "Project",
    metaLabel: "Steps",
    primaryCta: { label: "Start a Project", href: "#quote-form" },
  },
  curtain: {
    title: "Contact Us",
    intro:
      "Tell us about your print or packaging job. Our estimation team scopes, costs and responds within one business day.",
  },
} as const;

/* ============================================================
   HERO
   ============================================================ */
export const HERO = {
  eyebrow: "Vantage Printers",
  heading: "We make print\nimpossible to overlook",
  body: "Premium packaging and print, created with imagination and produced with precision.",
  taglineLead: "Sculpting Stories",
  taglineConnector: "with",
  taglineEmphasis: "Masterful Innovation",
  headline: [
    "Pakistan's top brands trust",
    "Vantage",
    "for their print and packaging needs.",
  ],
  description:
    "We deliver superior results through expert craftsmanship, advanced machinery, and sustainable print practices, engineered under one roof in Lahore.",
  signature: "Think Beyond",
  primaryCta: { label: "Explore our work", href: "/work" },
  secondaryCta: { label: "Start a project", href: "/quote" },
  videoMp4: "/showreel.mp4",
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
  /** Longer body copy below the fold */
  description: string;
  image: string;
  /** Highlight chips / capabilities list */
  bullets: string[];
  /** Optional gallery stills (uses existing IMG.*Alt assets) */
  gallery?: string[];
  /** Optional press / equipment names */
  equipment?: string[];
  /** Portfolio category slugs for related work */
  relatedPortfolio?: string[];
  capabilitiesHeading?: string;
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
    /** Short teaser under the hero bridge */
    intro: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    label: string;
    href: string;
  };
};

export const SERVICES_INTRO =
  "From large runs to precision work, Vantage brings flexible, innovative print solutions under one roof, crafted with care, because every project matters.";

export const SERVICES: Service[] = [
  {
    number: "01",
    slug: "offset",
    title: "Offset Printing",
    short: "Heidelberg Speedmaster · 5-colour + aqueous coating.",
    description:
      "Sheet-fed offset built for volume and consistency. Our Heidelberg Speedmaster lines run up to 18,000 sheets per hour with in-line aqueous coating, engineered for premium commercial print, packaging cartons and long-run brand work where colour fidelity cannot drift.",
    image: IMG.offsetMain,
    gallery: [
      IMG.offsetMain,
      IMG.offsetAlt,
      IMG.printing1,
      IMG.printing2,
      IMG.colorMgmt,
      IMG.production,
    ],
    equipment: [
      "Heidelberg Speedmaster sheet-fed lines",
      "In-line aqueous coating",
      "G7-calibrated colour management",
    ],
    relatedPortfolio: [
      "annual-reports",
      "brochure-and-catalogues",
      "books-and-publications",
    ],
    capabilitiesHeading: "Press & workflow",
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
        "High-volume sheet-fed offset on Heidelberg Speedmaster: colour-accurate, coating-ready, built for commercial print.",
    },
    cta: {
      eyebrow: "Start a Project",
      title:
        "Planning an offset run? Share your specs. Our team will scope press, stock and turnaround.",
      label: "Start a Project",
      href: "/contact",
    },
  },
  {
    number: "02",
    slug: "flexo",
    title: "Flexo Printing",
    short: "BOBST Master M5 UV flexo for labels and flexibles.",
    description:
      "Roll-to-roll UV flexography for shrink sleeves, in-mould labels and flexible packaging. Multi-station registration holds tight repeat tolerance on film, foil and paper, so brand colour and finish stay consistent from first meter to last.",
    image: IMG.flexoMain,
    gallery: [
      IMG.flexoMain,
      IMG.flexoAlt,
      IMG.flexo,
      IMG.flexo2,
      IMG.flexo3,
      IMG.flexoPhoto,
    ],
    equipment: [
      "BOBST Master M5 UV flexo line",
      "In-line die-cutting and lamination",
      "Multi-substrate registration",
    ],
    relatedPortfolio: [
      "labels-and-sleeves",
      "cosmetic-packaging",
      "home-and-textiles",
    ],
    capabilitiesHeading: "Flexo capabilities",
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
        "UV flexo for labels and flexible packaging: BOBST Master M5 with in-line finishing on film, foil and paper.",
    },
    cta: {
      eyebrow: "Start a Project",
      title:
        "Need shrink sleeves, IML or flexible packaging? Tell us the substrate and we’ll map the flexo path.",
      label: "Start a Project",
      href: "/contact",
    },
  },
  {
    number: "03",
    slug: "digital",
    title: "Digital Printing",
    short: "Xerox iGen 5 · 2400 dpi with variable data.",
    description:
      "Short-run and personalised print at production speed. The Xerox iGen 5 delivers photo-quality output with variable data for campaigns, prototypes and rapid turnarounds, without the plate costs of a long offset setup.",
    image: IMG.digitalMain,
    gallery: [
      IMG.digitalMain,
      IMG.digital,
      IMG.quality,
      IMG.inspection,
      IMG.colorMgmt,
    ],
    equipment: [
      "Xerox iGen 5 production press",
      "2,400 dpi imaging",
      "Variable-data workflow",
    ],
    relatedPortfolio: ["brochure-and-catalogues", "real-estate", "annual-reports"],
    capabilitiesHeading: "Digital capabilities",
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
        "Production digital on Xerox iGen 5: short runs, variable data and photo-quality colour without plate setup.",
    },
    cta: {
      eyebrow: "Start a Project",
      title:
        "Short run or personalised campaign? We’ll quote digital turnaround that matches your deadline.",
      label: "Start a Project",
      href: "/contact",
    },
  },
  {
    number: "04",
    slug: "design",
    title: "Design and Prepress",
    short: "Structural design, prototyping and prepress.",
    description:
      "In-house structural engineering, dielines and prototyping, integrated with CTP plate making so design decisions carry cleanly through to the press. Colour management and proofing sit on the same floor as production.",
    image: IMG.designMain,
    gallery: [
      IMG.designMain,
      IMG.designAlt,
      IMG.designAlt2,
      IMG.designAlt3,
      IMG.design,
      IMG.ctp,
      IMG.colorMgmt,
    ],
    equipment: [
      "Structural packaging studio",
      "CTP plate making",
      "G7 proofing and colour management",
    ],
    relatedPortfolio: [
      "perfume-packaging",
      "gift-and-utility-boxes",
      "cosmetic-packaging",
    ],
    capabilitiesHeading: "Studio & prepress",
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
        "Structural design, dielines and CTP prepress under one roof, so concepts move cleanly onto press.",
    },
    cta: {
      eyebrow: "Start a Project",
      title:
        "Need a dieline, prototype or press-ready file? Bring the brief and we’ll engineer it for production.",
      label: "Talk to Prepress",
      href: "/contact",
    },
  },
  {
    number: "05",
    slug: "finishing",
    title: "Finishing",
    short: "Cutting, folding, binding, lamination and specialty finishes.",
    description:
      "A complete finishing floor under one roof: die-cutting, folding, gluing, perfect and case binding, lamination, foil and spot UV. Every job is pressed, finished and dispatched without leaving the facility.",
    image: IMG.finishingMain,
    gallery: [
      IMG.finishingMain,
      IMG.finishingAlt,
      IMG.finishingAlt2,
      IMG.dieCutting,
      IMG.cutting,
      IMG.lamination,
      IMG.foldGather,
    ],
    equipment: [
      "Die-cutting and folding lines",
      "Perfect, case and saddle binding",
      "Lamination, foil and spot UV",
    ],
    relatedPortfolio: [
      "gift-and-utility-boxes",
      "perfume-packaging",
      "books-and-publications",
    ],
    capabilitiesHeading: "Finishing options",
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
        "Die-cutting, binding, lamination and specialty finishes, complete under one roof with the press floor.",
    },
    cta: {
      eyebrow: "Start a Project",
      title:
        "Foil, bind, laminate or die-cut? Tell us the finish and we’ll route it through the right line.",
      label: "Start a Project",
      href: "/contact",
    },
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

/* ============================================================
   WORK (formerly Portfolio)
   ============================================================ */
export type WorkGroupKey = "packaging" | "print";

export type PortfolioCategory = {
  number: string;
  slug: string;
  /** Full name, used for the page badge and metadata */
  title: string;
  /** Shorter label for the category wall and menus */
  menuLabel: string;
  group: WorkGroupKey;
  short: string;
  /** Category page headline, one entry per line */
  headline: string[];
  /** Standfirst under the headline */
  intro: string;
  cover: string;
  projects: string[];
};

const PF = "/portfolio";
const shots = (folder: string, count: number) =>
  Array.from({ length: count }, (_, i) => `${PF}/${folder}/${String(i + 1).padStart(2, "0")}.jpeg`);

/* Ordered the way the category wall reads: the packaging family first,
   then print and publications. */
export const PORTFOLIO: PortfolioCategory[] = [
  {
    number: "01",
    slug: "cosmetic-packaging",
    title: "Cosmetics Packaging",
    menuLabel: "Cosmetic",
    group: "packaging",
    short: "Beauty and skincare cartons with specialty finishes.",
    headline: ["Beauty, made visible."],
    intro:
      "Packaging created through precise colour, distinctive finishes and carefully engineered structures, designed to give every product a stronger presence.",
    cover: `${PF}/cosmetics/hero.jpeg`,
    projects: shots("cosmetics", 14),
  },
  {
    number: "02",
    slug: "perfume-packaging",
    title: "Perfume Packaging",
    menuLabel: "Perfumes",
    group: "packaging",
    short: "Premium rigid boxes and folding cartons for fragrance.",
    headline: ["The first impression", "before the first note."],
    intro:
      "Fragrance packaging shaped through structure, material and finish, created to build anticipation before the box is opened.",
    cover: `${PF}/perfume/hero.jpeg`,
    projects: shots("perfume", 13),
  },
  {
    number: "03",
    slug: "pharmaceutical-packaging",
    title: "Pharmaceutical Packaging",
    menuLabel: "Pharmaceuticals",
    group: "packaging",
    short: "Regulated pharma cartons and inserts at scale.",
    headline: ["Precision you can trust."],
    intro:
      "Pharmaceutical packaging produced with controlled colour, accurate information and dependable consistency across every pack, variant and production run.",
    cover: `${PF}/pharma/hero.jpeg`,
    projects: shots("pharma", 11),
  },
  {
    number: "04",
    slug: "home-and-textiles",
    title: "Home Textile Packaging",
    menuLabel: "Home Textiles",
    group: "packaging",
    short: "Retail print for home, apparel and lifestyle brands.",
    headline: ["Consistency at every scale."],
    intro:
      "Colour, artwork and construction remain aligned across multiple sizes, product families and international market requirements.",
    cover: `${PF}/home-textile/hero.jpeg`,
    projects: shots("home-textile", 8),
  },
  {
    number: "05",
    slug: "product-and-gift-boxes",
    title: "Product & Gift Boxes",
    menuLabel: "Product & Gift Boxes",
    group: "packaging",
    short: "Rigid boxes, sleeve packs and utility carriers.",
    headline: ["Made to hold attention."],
    intro:
      "From practical product cartons to premium presentation boxes, every structure is created around what it carries and how it should be experienced.",
    cover: `${PF}/gift-boxes/hero.jpeg`,
    projects: shots("gift-boxes", 11),
  },
  {
    number: "06",
    slug: "labels-and-sleeves",
    title: "Labels & Sleeves",
    menuLabel: "Labels & Sleeves",
    group: "packaging",
    short: "Shrink sleeves, in-mould and wet-glue labels.",
    headline: ["Small surface. Big responsibility."],
    intro:
      "Labels and sleeves engineered to carry colour, information and brand identity with consistency across demanding production environments.",
    cover: `${PF}/labels/hero.jpeg`,
    projects: shots("labels", 7),
  },
  {
    number: "07",
    slug: "annual-reports",
    title: "Annual Reports",
    menuLabel: "Annual Reports",
    group: "print",
    short: "Corporate annual reports for public and private companies.",
    headline: ["Designed to communicate.", "Recognised for excellence."],
    intro:
      "Annual reports produced with disciplined colour, considered materials and finishing that reflects the standing of the organisation behind them.",
    cover: `${PF}/annual-reports/hero.jpeg`,
    projects: shots("annual-reports", 6),
  },
  {
    number: "08",
    slug: "books-and-publications",
    title: "Books & Publications",
    menuLabel: "Books & Publications",
    group: "print",
    short: "Hard-case, perfect-bound and saddle-stitch books.",
    headline: ["Let's give the content", "the form it deserves."],
    intro:
      "From design and image reproduction to paper selection, binding and finishing, Vantage brings every stage together.",
    cover: `${PF}/books/hero.jpeg`,
    projects: shots("books", 7),
  },
  {
    number: "09",
    slug: "brochure-and-catalogues",
    title: "Brochures & Catalogues",
    menuLabel: "Brochures & Catalogues",
    group: "print",
    short: "Product catalogues, marketing brochures, look books.",
    headline: ["Made to inform.", "Designed to persuade."],
    intro:
      "From concise corporate brochures to image-rich catalogues, each publication is shaped around what the audience needs to see, understand and remember.",
    cover: `${PF}/brochures/hero.jpeg`,
    projects: shots("brochures", 13),
  },
];

export const WORK_GROUPS: { key: WorkGroupKey; title: string }[] = [
  { key: "packaging", title: "Packaging" },
  { key: "print", title: "Print & Publications" },
];

/** Home portfolio chapter BG carousel — hero product shots only */
export const PORTFOLIO_HOME_BG = PORTFOLIO.map((category) => category.cover);

/** Home portfolio card copy (sketch: Selected Work / Explore All Work) */
export const PORTFOLIO_HOME = {
  eyebrow: "Selected Work",
  body: "Made with purpose.\nFinished with precision.",
  note: "Explore packaging and print created across industries, material and formats.",
  cta: { label: "Explore All Work", href: "/work" },
} as const;

/* ------------------------------------------------------------
   Selected Work reel — one hero per category, climbing through the
   right-hand column as the section is pinned. Six categories have a
   film; the rest are stills. Every film also ships a poster so the
   column paints instantly.
   ------------------------------------------------------------ */
const SW = "/selected-work";

const SELECTED_WORK_MEDIA: Record<string, { asset: string; film?: boolean }> = {
  "cosmetic-packaging": { asset: "cosmetics", film: true },
  "perfume-packaging": { asset: "perfume", film: true },
  "pharmaceutical-packaging": { asset: "pharma", film: true },
  "product-and-gift-boxes": { asset: "gift-boxes" },
  "annual-reports": { asset: "annual-reports", film: true },
  "books-and-publications": { asset: "books" },
  "brochure-and-catalogues": { asset: "brochures", film: true },
  "home-and-textiles": { asset: "home-textile", film: true },
  "labels-and-sleeves": { asset: "labels" },
};

export type SelectedWorkSlide = {
  slug: string;
  title: string;
  href: string;
  poster: string;
  film: string | null;
};

export const SELECTED_WORK = {
  eyebrow: "Selected Works",
  heading: "Made with purpose.\nFinished with precision.",
  lede: "Explore packaging and print created across industries, material and formats.",
  cta: { label: "Explore all works", href: "/work" },
  slides: PORTFOLIO.map((category): SelectedWorkSlide => {
    const media = SELECTED_WORK_MEDIA[category.slug];
    return {
      slug: category.slug,
      title: category.title,
      href: `/work/${category.slug}`,
      poster: media ? `${SW}/${media.asset}.jpg` : category.cover,
      film: media?.film ? `${SW}/${media.asset}.mp4` : null,
    };
  }),
} as const;

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
    "From fashion and FMCG to banking, automotive and real estate, Vantage has earned the trust of Pakistan's most demanding brands for over three decades.",
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

/* ============================================================
   CORE TEAM PAGE — where "Meet Vantage" on the home page lands
   ============================================================ */
export const CORE_TEAM_PAGE = {
  eyebrow: "Company",
  title: "Our Core Team",
  hero: {
    brandTitle: "Our Core Team",
    taglineLead: "The people",
    taglineConnector: "behind",
    taglineEmphasis: "Vantage",
    metaLabel: "Core team",
    primaryCta: { label: "Meet the team", href: "#core-team" },
  },
  intro: {
    title: "Our Core Team",
    paragraphs: [
      "Leadership, sales, pre-press, creative and production: the people who carry a job from the first colour decision to the finished pallet.",
      "Three decades of print experience sits on this floor, and every project passes through the same shared standard.",
    ],
    ctaLabel: "View current opportunities.",
    ctaHref: "mailto:careers@vantage.pk?subject=Careers%20Enquiry",
  },
} as const;

export const PARTNERS: (LogoEntry & { description: string })[] = [
  {
    name: "Heidelberg",
    slug: "heidelberg",
    logo: "/partners/heidelberg.svg",
    description: "Sheet-fed offset presses: Speedmaster lines for high-volume commercial print.",
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
    description: "Production digital printing: iGen 5 for short-run and variable data.",
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
    description: "Colour management software: G7-calibrated proofing and prepress.",
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
    "World-class machinery and technology partners power every stage of the Vantage workflow, from colour-accurate prepress to high-speed press and finishing.",
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
      "Heidelberg, BOBST, Xerox, Konica Minolta, GMG and more: the machinery and workflow partners behind every Vantage job.",
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
  body: "Vantage is an engineering-first printing house. The merchandiser scoping your job is the merchandiser running it on press, one accountable team across prepress, print, finishing and dispatch.",
  image: IMG.companyHero,
  points: [
    "Founded 1992 in Lahore",
    "40+ machines across offset, flexo, digital and finishing",
    "Full in-house prepress, finishing and dispatch",
    "Working with 500+ brands across Pakistan and export markets",
  ],
} as const;

/** Home company card copy (sketch: Vantage in Brief + stats) */
export const ABOUT_HOME = {
  eyebrow: "Vantage in Brief",
  heading: "Experience, built into every detail.",
  body: "Since 1992, Vantage has combined creative thinking, technical precision and integrated production to deliver packaging and print at scale.",
  stats: [
    { value: "30+", label: "Years" },
    { value: "125+", label: "People" },
    { value: "5", label: "Print Processes" },
    { value: "350+", label: "Tons converted every month" },
  ],
  cta: { label: "About Vantage", href: "/company" },
} as const;

/** Home closing — "Trusted by leading brands" + client logo strip (sketch p5) */
export const HOME_CLIENTS = {
  eyebrow: "Trusted across industries",
  heading: "Built on Trust\nProven through the Work.",
  body: "For more than three decades, leading organisations have trusted Vantage with projects where colour, quality and consistency cannot be compromised.",
} as const;

/** Home closing — final call to action, full-bleed rust block above the footer */
export const HOME_CTA = {
  eyebrow: "Let's work together",
  title: "Make your next impression count",
  body: "Packaging, labels and print: thought through, engineered and finished at Vantage.",
  primaryCta: { label: "Start a Project", href: "/quote" },
  secondaryCta: { label: "Contact Us", href: "/contact" },
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

/* Head-and-shoulders re-frames of the studio photos, cropped to the 3:4 of the
   team card so every face reads at the same size — see scripts/. */
const PORTRAIT = "/team/portraits";

export const TEAM: TeamMember[] = [
  {
    name: "Adnan Bashir",
    role: "Managing Director",
    image: "/team/placeholder.svg",
  },
  {
    name: "Ali Touqir",
    role: "General Manager Sales",
    image: `${PORTRAIT}/ali-touqir.webp`,
  },
  {
    name: "Amer Nawaz",
    role: "Chief Financial Officer",
    image: `${PORTRAIT}/amer-nawaz.webp`,
  },
  {
    name: "Imbesat Adnan",
    role: "Manager Marketing",
    image: `${PORTRAIT}/imbesat-adnan.webp`,
  },
  {
    name: "Mian Usman",
    role: "Sr. Manager Sales",
    image: `${PORTRAIT}/mian-usman.webp`,
  },
  {
    name: "Zubair Alam",
    role: "Manager Sales",
    image: `${PORTRAIT}/zubair-alam.webp`,
  },
  {
    name: "Naveed Bhatti",
    role: "Manager Sales",
    image: `${PORTRAIT}/naveed-bhatti.webp`,
  },
  {
    name: "Adnan Ahmed",
    role: "Manager Sales",
    image: `${PORTRAIT}/adnan-ahmed.webp`,
  },
  {
    name: "Qasim Raza",
    role: "Manager Creative",
    image: `${PORTRAIT}/qasim-raza.webp`,
  },
  {
    name: "Syed Asmer Mahmood",
    role: "Manager Pre Press",
    image: `${PORTRAIT}/syed-asmer.webp`,
  },
  {
    name: "Alian Hafeez",
    role: "Executive Sales",
    image: `${PORTRAIT}/alian-hafeez.webp`,
  },
  {
    name: "Arusha Adnan",
    role: "Visual Designer",
    image: "/team/placeholder.svg",
  },
];

/* The home page introduces the team through these six; /core-team opens with
   the same faces before the rest of the floor. */
const LEADERSHIP_NAMES = new Set([
  "Adnan Bashir",
  "Ali Touqir",
  "Amer Nawaz",
  "Imbesat Adnan",
  "Mian Usman",
  "Qasim Raza",
]);

export const TEAM_LEADERSHIP: TeamMember[] = TEAM.filter((member) =>
  LEADERSHIP_NAMES.has(member.name)
);

/** Leadership first, then everyone else — the order the core team page reads in */
export const TEAM_ORDERED: TeamMember[] = [
  ...TEAM_LEADERSHIP,
  ...TEAM.filter((member) => !LEADERSHIP_NAMES.has(member.name)),
];

/* ============================================================
   WORK PAGE
   ============================================================ */
export const WORK_PAGE = {
  eyebrow: "Selected works",
  headline: ["Made with purpose.", "Finished with precision."],
  intro:
    "Explore packaging and print created across industries, material and formats.",
  cover: `${PF}/brochures/hero.jpeg`,
  browse: {
    eyebrow: "Browse by category",
    headline: ["Many forms.", "One standard."],
    intro: "Explore packaging and print by market, format and application.",
  },
} as const;

/* ============================================================
   SERVICES PAGE (extended)
   ============================================================ */
export const SERVICES_PAGE = {
  eyebrow: "Services",
  title: "Driven by craft, backed by machinery.",
  intro:
    "From high-volume offset to short-run digital, roll-fed flexo, design and finishing: five disciplines under one roof in Lahore.",
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
    { value: "5", suffix: "", label: "Print disciplines" },
    { value: "40", suffix: "+", label: "Machines on the floor" },
    { value: "500", suffix: "+", label: "Brands served" },
    { value: "34", suffix: "yrs", label: "Of craftsmanship" },
  ],
  cta: {
    eyebrow: "Portfolio",
    title:
      "For examples of our recent work, head over to our Portfolio, or contact one of our experts to start your next project.",
    label: "Contact Us",
    href: "/contact",
  },
} as const;

/* ============================================================
   SUSTAINABILITY PAGE (extended)
   ============================================================ */
export const SUSTAINABILITY_PAGE = {
  eyebrow: "Sustainability",
  title: "Sustainability inspires innovation.",
  intro:
    "Vantage's sustainability programme is designed for real impact, from FSC paper and low-VOC inks to energy-efficient production and closed-loop waste management.",
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
    "Since 1992, Vantage has grown from a single press to a 40-machine floor serving Pakistan's most demanding brands, built on engineering discipline, in-house craft, and long partnerships.",
  heroImage: "/vantage-images/HR/hr-main.png",
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
      "Our passion is creating the finest print products to enhance our clients' businesses with our futuristic and unconditional approach. Our strong drive with staunch minds, and technological finesse makes us a unique printing & packaging facility. Think Beyond.",
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
