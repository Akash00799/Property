export type AdCategory =
  | "upcoming"
  | "new-launch"
  | "featured"
  | "available-plots"
  | "special-offer"
  | "investment"
  | "sold-out"
  | "announcement";

export type AdPlacement =
  | "cinematic-banner"
  | "countdown-banner"
  | "promotional-carousel"
  | "image-spotlight"
  | "announcement-ticker";

export interface PromotionItem {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  badge: {
    text: string;
    variant: "gold" | "emerald" | "amber" | "rose" | "blue";
  };
  category: AdCategory;
  placement: AdPlacement;
  coverImage: string;
  secondaryImage?: string;
  associatedProjectSlug?: string; // links to /catalogue/[slug]
  propertyId?: string;           // links to /plots/[id]
  ctaText: string;
  ctaLink: string;
  priceDetails?: string;         // e.g. "₹32,500 / Gaj"
  offerDetails?: string;         // e.g. "Pre-Launch Allotment Booking [Demo]"
  launchDate?: string;           // ISO format "2026-11-15T10:00:00Z"
  startDate?: string;            // ISO format
  endDate?: string;              // ISO format
  status: "draft" | "published";
  isFeatured: boolean;
  priority: number;              // Lower number = higher priority
  highlights?: string[];
  locationLabel?: string;
  disclaimer?: string;
}

export const PROMOTIONS_DATA: PromotionItem[] = [
  // 1. COUNTDOWN BANNER: Flagship Upcoming Phase Launch
  {
    id: "promo-countdown-01",
    title: "Phase III Master Launch — The Royal Enclave",
    tagline: "120 Demarcated JDA Patta Plots along 60-Ft Mahal Road Arterial",
    description:
      "Exclusive preview allotment for South-East Jaipur's premier residential corridor. Direct access to Bombay Hospital, Akshaya Patra, and the Jaipur Ring Road interchange.",
    badge: {
      text: "Upcoming Phase Launch",
      variant: "amber",
    },
    category: "upcoming",
    placement: "countdown-banner",
    coverImage: "/images/catalogue/master-plan-blueprint.jpg",
    secondaryImage: "/images/catalogue/entrance-archway.jpg",
    associatedProjectSlug: "the-royal-enclave-jagatpura",
    ctaText: "Explore Township Blueprint",
    ctaLink: "/catalogue/the-royal-enclave-jagatpura",
    priceDetails: "Starting ₹34,500 / Gaj",
    offerDetails: "Pre-Launch Registry Incentive Available [Demo]",
    // Futuristic launch date for the countdown timer (30 days from now)
    launchDate: "2026-11-12T10:00:00Z",
    startDate: "2026-10-01T00:00:00Z",
    endDate: "2026-11-30T23:59:59Z",
    status: "published",
    isFeatured: true,
    priority: 1,
    highlights: [
      "100% Freehold JDA Patta Issued",
      "Direct 60-Ft Wide Asphalt Boulevard",
      "Three-Phase Concealed Electrification",
      "Up to 80% Pre-Approved Bank Finance",
    ],
    locationLabel: "Mahal Road, Jagatpura Extension, Jaipur",
    disclaimer: "[Demo Promotional Showcase for Jaipur Plotted Township]",
  },

  // 2. CINEMATIC BANNER: Ring Road Expressway Growth Corridor
  {
    id: "promo-cinematic-01",
    title: "Jaipur Ring Road Expressway Corridor",
    tagline: "High-Growth Commercial & Residential Plotted Parcels",
    description:
      "Positioned directly at the Tonk Road & Ring Road cloverleaf junction. 200-foot sector road frontage engineered for substantial capital growth and seamless airport connectivity.",
    badge: {
      text: "Corridor Spotlight",
      variant: "gold",
    },
    category: "investment",
    placement: "cinematic-banner",
    coverImage: "/images/catalogue/jaipur-location-map.jpg",
    secondaryImage: "/images/catalogue/demarcated-plots.jpg",
    associatedProjectSlug: "jaipur-ring-road-corner-plot",
    ctaText: "Inspect Investment Monograph",
    ctaLink: "/catalogue/jaipur-ring-road-corner-plot",
    priceDetails: "₹24,500 / Gaj (Sector Boulevard)",
    offerDetails: "Immediate Sub-Registrar Deed Execution",
    startDate: "2026-10-01T00:00:00Z",
    endDate: "2026-12-31T23:59:59Z",
    status: "published",
    isFeatured: true,
    priority: 1,
    highlights: [
      "Direct Ring Road Cloverleaf Access",
      "Section 90A Revenue Cleared",
      "Heavy-Duty Bitumen Blacktop Infrastructure",
    ],
    locationLabel: "Ring Road Cloverleaf Junction, Jaipur",
    disclaimer: "[Demo Promotional Showcase for Jaipur Land Investors]",
  },

  // 3. CAROUSEL PROMO 1: Special Offer on Corner Splay Plots
  {
    id: "promo-carousel-01",
    title: "Prime Corner Splay Plots — Aravalli Greens",
    tagline: "Dual 50-Ft & 30-Ft Road Access with Scenic Mountain Backdrop",
    description:
      "Limited inventory of east and north-east facing corner plots bordering Mahindra World City SEZ. Enjoy superior natural ventilation, unobstructed hill views, and generous setbacks.",
    badge: {
      text: "Special Corner Allotment",
      variant: "emerald",
    },
    category: "special-offer",
    placement: "promotional-carousel",
    coverImage: "/images/catalogue/entrance-archway.jpg",
    associatedProjectSlug: "aravalli-greens-ajmer-road",
    ctaText: "View Corner Plots Catalogue",
    ctaLink: "/catalogue/aravalli-greens-ajmer-road",
    priceDetails: "₹38,000 / Gaj",
    offerDetails: "Complimentary Boundary Pegging & Registry Concierge [Demo]",
    startDate: "2026-10-01T00:00:00Z",
    endDate: "2026-11-20T23:59:59Z",
    status: "published",
    isFeatured: true,
    priority: 1,
    highlights: [
      "Dual Road Corner Splay",
      "Vaastu East Orientation",
      "5 Mins to Mahindra SEZ Gate 2",
    ],
    locationLabel: "Ajmer Road Expressway, Jaipur",
  },

  // 4. CAROUSEL PROMO 2: New Launch at Sirsi Road
  {
    id: "promo-carousel-02",
    title: "Sunrise City Gated Scheme — Sirsi Road",
    tagline: "Boutique Residential Enclave near Vaishali Nagar West",
    description:
      "Fully developed gated society featuring 35 Bighas of demarcated residential land. Includes landscaped sector park, underground water conduits, and immediate registry suitability.",
    badge: {
      text: "New Phase Open",
      variant: "gold",
    },
    category: "new-launch",
    placement: "promotional-carousel",
    coverImage: "/images/catalogue/demarcated-plots.jpg",
    associatedProjectSlug: "sunrise-city-sirsi-road",
    ctaText: "Explore Sunrise City",
    ctaLink: "/catalogue/sunrise-city-sirsi-road",
    priceDetails: "₹42,000 / Gaj",
    offerDetails: "80% Financing Pre-Approved (SBI & HDFC)",
    startDate: "2026-10-01T00:00:00Z",
    endDate: "2026-12-15T23:59:59Z",
    status: "published",
    isFeatured: true,
    priority: 2,
    highlights: [
      "Interlocking Paver Roads",
      "24/7 Security Gatehouse",
      "7 Mins to Vaishali Commercial District",
    ],
    locationLabel: "Sirsi Road, Jaipur West",
  },

  // 5. CAROUSEL PROMO 3: Luxury Farmsteads Available
  {
    id: "promo-carousel-03",
    title: "Maharaja Royal Farmsteads — Ramgarh Valley",
    tagline: "1 Bigha (1,600+ Gaj) Organic Orchard Farmsteads",
    description:
      "Escape to verdant valleys surrounded by ancient hills and sweet ground aquifer. Private solar-fenced farm parcels complete with drip irrigation lines and paved driveway access.",
    badge: {
      text: "Luxury Farmstead Parcels",
      variant: "emerald",
    },
    category: "available-plots",
    placement: "promotional-carousel",
    coverImage: "/images/catalogue/master-plan-blueprint.jpg",
    associatedProjectSlug: "maharaja-royal-farmsteads-ramgarh",
    ctaText: "View Farmstead Dossier",
    ctaLink: "/catalogue/maharaja-royal-farmsteads-ramgarh",
    priceDetails: "₹18,500 / Gaj",
    offerDetails: "Pre-Planted Fruit Trees & Irrigation Network [Demo]",
    startDate: "2026-10-01T00:00:00Z",
    endDate: "2026-12-31T23:59:59Z",
    status: "published",
    isFeatured: false,
    priority: 3,
    highlights: [
      "1 Bigha Minimum Parcel",
      "Sweet Groundwater Reservoir",
      "Clear Title & Registry Verification",
    ],
    locationLabel: "Ramgarh Lake Valley, Jaipur",
  },

  // 6. CAROUSEL PROMO 4: Recently Sold Out Archive
  {
    id: "promo-carousel-04",
    title: "Heritage Palms Township — Tonk Road",
    tagline: "Phase 1 & Phase 2 100% Sub-Registrar Registered",
    description:
      "All 180 residential plots successfully handed over with individual JDA Patta certificates. Phase 3 pre-registration expressions of interest are currently being registered.",
    badge: {
      text: "Sold Out • Phase 3 Waitlist",
      variant: "rose",
    },
    category: "sold-out",
    placement: "promotional-carousel",
    coverImage: "/images/catalogue/jaipur-location-map.jpg",
    associatedProjectSlug: "heritage-palms-tonk-road",
    ctaText: "View Project Archive",
    ctaLink: "/catalogue/heritage-palms-tonk-road",
    priceDetails: "Phase 3 Inquiries Open",
    offerDetails: "Priority Waitlist Available",
    startDate: "2026-10-01T00:00:00Z",
    endDate: "2026-12-31T23:59:59Z",
    status: "published",
    isFeatured: false,
    priority: 4,
    highlights: [
      "180+ Families Registered",
      "100% Delivered Infrastructure",
      "Chhotisadri Link Advantage",
    ],
    locationLabel: "Tonk Road Growth Axis, Jaipur",
  },

  // 7. CAROUSEL PROMO 5: The Grand Avenues Jagatpura
  {
    id: "promo-carousel-05",
    title: "The Grand Avenues — Jagatpura Extension",
    tagline: "Wide 60-Ft Sector Road Frontage with Metro Connectivity",
    description:
      "Premium JDA sanctioned plots in Jaipur's most dynamic education & healthcare hub. Minutes from Bombay Hospital, SKIT Campus, and the Ring Road Express interchange.",
    badge: {
      text: "New Phase Release",
      variant: "gold",
    },
    category: "new-launch",
    placement: "promotional-carousel",
    coverImage: "/images/catalogue/entrance-archway.jpg",
    associatedProjectSlug: "the-grand-avenues-jagatpura",
    ctaText: "Explore Jagatpura Plots",
    ctaLink: "/catalogue/the-grand-avenues-jagatpura",
    priceDetails: "₹36,500 / Gaj",
    offerDetails: "Special Pre-Launch Registry Assistance",
    startDate: "2026-10-01T00:00:00Z",
    endDate: "2026-12-31T23:59:59Z",
    status: "published",
    isFeatured: true,
    priority: 5,
    highlights: [
      "60-Ft Wide Bitumen Roads",
      "Underground Electrification",
      "Proximity to Jagatpura Flyover",
    ],
    locationLabel: "Jagatpura Ext., Jaipur South-East",
  },

  // 8. CAROUSEL PROMO 6: Golden Crest Mansarovar
  {
    id: "promo-carousel-06",
    title: "Golden Crest Township — Mansarovar Extension",
    tagline: "Direct Ring Road Access • 100% Freehold JDA Patta",
    description:
      "Exclusive residential land parcel offering corner and garden-facing options. Seamless signal-free transit to Muhana Mandi and Jaipur International Airport.",
    badge: {
      text: "Limited Release Offer",
      variant: "amber",
    },
    category: "special-offer",
    placement: "promotional-carousel",
    coverImage: "/images/catalogue/demarcated-plots.jpg",
    associatedProjectSlug: "golden-crest-mansarovar-extension",
    ctaText: "View Mansarovar Plots",
    ctaLink: "/catalogue/golden-crest-mansarovar-extension",
    priceDetails: "₹34,000 / Gaj",
    offerDetails: "Immediate Mutation & Registry Allotment",
    startDate: "2026-10-01T00:00:00Z",
    endDate: "2026-12-31T23:59:59Z",
    status: "published",
    isFeatured: false,
    priority: 6,
    highlights: [
      "100% Freehold Title",
      "Gated Perimeter Security",
      "High Appreciation Corridor",
    ],
    locationLabel: "Mansarovar Ext., Jaipur South",
  },

  // 7. IMAGE-LED EDITORIAL SPOTLIGHT: Aravalli Ridge Kukas
  {
    id: "promo-spotlight-01",
    title: "Aravalli Ridge Low-Density Estate",
    tagline: "Where Ancient Ridges Meet Modern Civil Engineering",
    description:
      "An ultra-low density 50-Bigha gated plotted sanctum reserved for custom villas. 40% natural reserve, underground utility ducts, rainwater injection wells, and 24/7 biometric estate security.",
    badge: {
      text: "Private Plotted Estate",
      variant: "gold",
    },
    category: "featured",
    placement: "image-spotlight",
    coverImage: "/images/catalogue/entrance-archway.jpg",
    secondaryImage: "/images/catalogue/master-plan-blueprint.jpg",
    associatedProjectSlug: "aravalli-ridge-kukas-delhi-road",
    ctaText: "Inspect Architectural Monograph",
    ctaLink: "/catalogue/aravalli-ridge-kukas-delhi-road",
    priceDetails: "₹46,000 / Gaj",
    offerDetails: "Private Chauffeur Site Inspection Available",
    startDate: "2026-10-01T00:00:00Z",
    endDate: "2026-12-31T23:59:59Z",
    status: "published",
    isFeatured: true,
    priority: 1,
    highlights: [
      "Direct Access to 6-Lane Delhi National Highway",
      "Natural Hillview Reserve & 40% Green Coverage",
      "Clear JDA Scheme Layout Sanction",
      "Architectural Design Guidelines Included",
    ],
    locationLabel: "Delhi Road, Kukas Corridor, Jaipur",
    disclaimer: "[Demo Luxury Showcase for North Jaipur Growth Vector]",
  },

  // 8. ANNOUNCEMENT TICKER: Real-time Registry & Sanctions Update
  {
    id: "promo-ticker-01",
    title: "Q4 2026 JDA Scheme Registries Open",
    tagline: "100% Freehold Society Patta Titles Ready for Deed Execution",
    description:
      "Pre-demarcated plots now open across Mahal Road Jagatpura, Ajmer Road SEZ Axis, and Jaipur Ring Road Expressway.",
    badge: {
      text: "Official Bulletin",
      variant: "gold",
    },
    category: "announcement",
    placement: "announcement-ticker",
    coverImage: "/images/catalogue/jaipur-location-map.jpg",
    ctaText: "Book Chauffeur Site Visit",
    ctaLink: "/schedule-visit",
    startDate: "2026-10-01T00:00:00Z",
    endDate: "2026-12-31T23:59:59Z",
    status: "published",
    isFeatured: true,
    priority: 1,
  },
];

// Utility: Check if promotion is active based on published status
export function isPromotionActive(promo: PromotionItem): boolean {
  if (promo.status !== "published") return false;
  return true;
}

// Utility: Get all active promotions sorted by priority
export function getActivePromotions(): PromotionItem[] {
  return PROMOTIONS_DATA.filter((p) => isPromotionActive(p)).sort(
    (a, b) => a.priority - b.priority
  );
}

// Utility: Get active promotions for a specific UI placement
export function getPromotionsByPlacement(placement: AdPlacement): PromotionItem[] {
  return getActivePromotions().filter((p) => p.placement === placement);
}

// Utility: Get active promotions by category
export function getPromotionsByCategory(category: AdCategory): PromotionItem[] {
  return getActivePromotions().filter((p) => p.category === category);
}

// Utility: Get featured active promotions
export function getFeaturedPromotions(): PromotionItem[] {
  return getActivePromotions().filter((p) => p.isFeatured);
}
