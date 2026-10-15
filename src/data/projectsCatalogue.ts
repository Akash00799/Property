export interface ProjectCatalogueItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  edition: string;
  volume: string;
  year: string;
  category: string;
  status: string;
  coverImage: string;
  location: {
    locality: string;
    city: string;
    state: string;
    corridor: string;
    landmark: string;
    coordinates: string;
    mapImage?: string;
  };
  overview: {
    headline: string;
    story: string;
    developerVision: string;
    keyHighlights: string[];
    stats: {
      label: string;
      value: string;
      sublabel: string;
    }[];
  };
  masterPlan: {
    planImage: string;
    blueprintTitle: string;
    totalArea: string;
    openGreenRatio: string;
    roadHierarchy: string[];
    demarcationType: string;
    highlights: string[];
  };
  connectivity: {
    corridorAnalysis: string;
    highlights: {
      destination: string;
      distance: string;
      driveTime: string;
      via: string;
    }[];
  };
  infrastructure: {
    summary: string;
    features: {
      title: string;
      description: string;
      icon: string;
    }[];
    engineeringSpecs: string[];
  };
  typologies: {
    categoryName: string;
    sizeGaj: number;
    sizeSqFt: number;
    dimensions: string;
    facingOptions: string[];
    roadWidth: string;
    pricePerGaj: string;
    startingPrice: string;
    recommendedFor: string;
  }[];
  legalClearances: {
    jdaSanctionNo: string;
    order90A: string;
    khasraJamabandi: string;
    reraRegistration: string;
    possessionTimeline: string;
    registryReadiness: string;
    approvedBanks: string[];
  };
  galleryImages: string[];
  advisory: {
    specialistName: string;
    role: string;
    phone: string;
    email: string;
    officeAddress: string;
  };
}

export const PROJECTS_CATALOGUE: ProjectCatalogueItem[] = [
  {
    id: "proj-01",
    slug: "the-royal-enclave-jagatpura",
    title: "The Royal Enclave — Jagatpura",
    tagline: "Prime JDA Approved Residential Plotted Township on 60-Ft Wide Mahal Road Axis",
    edition: "Official Master Catalogue",
    volume: "Vol. XXIV — Issue 01",
    year: "2026 Edition",
    category: "JDA Approved Township",
    status: "Ready for Deed Registry",
    coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop",
    location: {
      locality: "Mahal Road, Jagatpura Extension",
      city: "Jaipur",
      state: "Rajasthan",
      corridor: "Jagatpura & Ring Road Axis",
      landmark: "5 Mins from Bombay Hospital & Akshaya Patra Temple",
      coordinates: "26.8152° N, 75.8741° E",
      mapImage: "/images/catalogue/jaipur-location-map.jpg",
    },
    overview: {
      headline: "A Landmark Plotted Gentry Designed for Generational Independency in South-East Jaipur",
      story:
        "The Royal Enclave represents the pinnacle of residential plotted development along Jaipur's most sought-after healthcare and institutional belt. Spread across an expansive layout sanctioned directly by the Jaipur Development Authority (JDA), each plot is demarcated with reinforced concrete corner stones and complete underground utility conduits.",
      developerVision:
        "Our vision is to empower discerning families to build bespoke independent bungalows with complete architectural liberty, backed by 100% legal clarity and immediate sub-registrar title deed registry.",
      keyHighlights: [
        "Direct JDA Patta Issued with Individual Plot Allotment Letter",
        "Dual 60-Foot & 40-Foot Bitumen Blacktop Sector Roads",
        "Concealed Three-Phase Power Cabling & PHED Municipal Water Line",
        "Vaastu-Aligned East & North-East Facing Demarcated Parcels",
      ],
      stats: [
        { label: "Township Footprint", value: "85 Bighas", sublabel: "JDA Approved Scheme" },
        { label: "Open Green Ratio", value: "28.5%", sublabel: "Landscaped Sector Parks" },
        { label: "Internal Arterials", value: "60 & 40 Ft", sublabel: "Heavy-Duty Blacktop Roads" },
        { label: "Bank Finance", value: "Up to 80%", sublabel: "SBI, HDFC & ICICI Approved" },
      ],
    },
    masterPlan: {
      planImage: "/images/catalogue/master-plan-blueprint.jpg",
      blueprintTitle: "JDA Layout Sanction Master Plan & Sector Demarcation",
      totalArea: "85 Bighas (1,70,000+ Sq.Yards)",
      openGreenRatio: "28.5% Dedicated Public Greens & Parks",
      roadHierarchy: [
        "60-Foot Main Sector Entry Avenue with Central Median LED Poles",
        "40-Foot Internal Secondary Boulevards with Kerb Stone Demarcation",
        "30-Foot Quiet Residential Cul-de-Sacs with Tree-Lined Plantation",
      ],
      demarcationType: "Physical RCC Corner Stones with Official JDA Plot Number Plates",
      highlights: [
        "Zero-Waterlogging Underground Stormwater Drainage System",
        "Individual Sewage Chamber for Every Plotted Parcel",
        "Dedicated Space for Daily Convenience Kiosks and Community Center",
        "Integrated Rainwater Harvesting Catchment Wells Every 100 Meters",
      ],
    },
    connectivity: {
      corridorAnalysis:
        "Jagatpura Mahal Road is the premier socio-economic growth corridor of southern Jaipur. Situated at the crossroads of the Jaipur International Airport, Sitapura Industrial Hub, and the Jaipur Ring Road, this location enjoys sustained double-digit capital appreciation.",
      highlights: [
        { destination: "Jaipur International Airport (Terminal 2)", distance: "9.5 km", driveTime: "14 mins", via: "Airport VIP Road" },
        { destination: "Bombay Hospital & Research Centre", distance: "2.8 km", driveTime: "5 mins", via: "Mahal Road" },
        { destination: "Jaipur Ring Road Cloverleaf (Exit 4)", distance: "4.5 km", driveTime: "7 mins", via: "Ring Road Sector Link" },
        { destination: "Akshaya Patra Cultural Complex", distance: "3.2 km", driveTime: "6 mins", via: "Jagatpura Main Road" },
        { destination: "Malviya Nagar & World Trade Park (WTP)", distance: "8.0 km", driveTime: "12 mins", via: "JLN Marg Axis" },
      ],
    },
    infrastructure: {
      summary: "Modern municipal and utility infrastructure delivered prior to plot handover.",
      features: [
        { title: "Pressurized Sweet Water Line", description: "Direct deep-aquifer potable water supply connected to each plot boundary.", icon: "Droplets" },
        { title: "Underground Power Conduits", description: "Concealed 3-phase electrical cabling with independent transformer substation.", icon: "Zap" },
        { title: "24/7 Gated Security & RFID", description: "Guarded gatehouse, automated boom barrier, and high-resolution CCTV coverage.", icon: "Shield" },
        { title: "2-Acre Manicured Theme Park", description: "Jogging track, children's play area, open gymnasium, and meditation gazebo.", icon: "Trees" },
      ],
      engineeringSpecs: [
        "Heavy-duty asphalt bitumen road surfacing with 150mm crushed gravel base",
        "Interlocking precast concrete curb stones along pedestrian footpaths",
        "Automated dusk-to-dawn LED avenue street lights with surge protection",
        "Dedicated underground fiber-optic telecommunication ducts",
      ],
    },
    typologies: [
      {
        categoryName: "Executive Villa Plot",
        sizeGaj: 200,
        sizeSqFt: 1800,
        dimensions: "30 Ft Frontage x 60 Ft Depth",
        facingOptions: ["Pure East (Vaastu)", "North Facing"],
        roadWidth: "40-Ft Wide Internal Boulevard",
        pricePerGaj: "₹36,000 / Gaj",
        startingPrice: "₹72.00 Lakh",
        recommendedFor: "Independent 4BHK Luxury Duplex with Private Lawn & Car Porch",
      },
      {
        categoryName: "Grand Boulevard Plot",
        sizeGaj: 250,
        sizeSqFt: 2250,
        dimensions: "35 Ft Frontage x 64.3 Ft Depth",
        facingOptions: ["North-East (Ishan Kon)", "East Facing"],
        roadWidth: "60-Ft Wide Sector Main Road",
        pricePerGaj: "₹38,000 / Gaj",
        startingPrice: "₹95.00 Lakh",
        recommendedFor: "Expansive Multi-Generation Bungalow with Basement & Terrace Garden",
      },
      {
        categoryName: "Compact Contemporary Plot",
        sizeGaj: 166,
        sizeSqFt: 1494,
        dimensions: "25 Ft Frontage x 60 Ft Depth",
        facingOptions: ["North Facing", "West Facing"],
        roadWidth: "30-Ft Wide Paved Street",
        pricePerGaj: "₹34,500 / Gaj",
        startingPrice: "₹57.27 Lakh",
        recommendedFor: "Modern 3BHK Contemporary Villa for Nuclear Families",
      },
    ],
    legalClearances: {
      jdaSanctionNo: "JDA/ZON-14/SCHEME-2024/782-R",
      order90A: "Rev. Rajasthan 90A Conversion Order Ref: JP-90A-44812",
      khasraJamabandi: "Khasra No. 412/1, 415/2, Revenue Village Jagatpura",
      reraRegistration: "RAJ/P/2024/2984 (Rajasthan Real Estate Regulatory Authority)",
      possessionTimeline: "Immediate Demarcated Possession",
      registryReadiness: "100% Ready for Sub-Registrar Title Deed Execution",
      approvedBanks: ["State Bank of India (SBI)", "HDFC Bank", "ICICI Bank", "Bank of Baroda"],
    },
    galleryImages: [
      "/images/catalogue/entrance-archway.jpg",
      "/images/catalogue/demarcated-plots.jpg",
      "/images/catalogue/master-plan-blueprint.jpg",
      "/images/catalogue/jaipur-location-map.jpg",
    ],
    advisory: {
      specialistName: "Mr. Rajendra Pratap Singh",
      role: "Senior Land Advisory Director",
      phone: "+91 800-123-4567",
      email: "advisory@terrafirma-estates.demo",
      officeAddress: "Plot No. 42, JLN Marg, Near World Trade Park, Malviya Nagar, Jaipur 302017",
    },
  },
  {
    id: "proj-02",
    slug: "aravalli-greens-ajmer-road",
    title: "Aravalli Greens Township — Ajmer Road",
    tagline: "Expansive 70-Acre JDA Plotted Community Bordering Mahindra World City SEZ",
    edition: "Official Master Catalogue",
    volume: "Vol. XXIV — Issue 02",
    year: "2026 Edition",
    category: "JDA Approved Township",
    status: "Limited Parcels Remaining",
    coverImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop",
    location: {
      locality: "Ajmer Road Expressway Axis",
      city: "Jaipur",
      state: "Rajasthan",
      corridor: "Ajmer Road & Mahindra SEZ Corridor",
      landmark: "Opposite Mahindra World City Gate 2",
      coordinates: "26.8624° N, 75.6120° E",
    },
    overview: {
      headline: "Serene Plotted Living Against the Majestic Backdrop of the Ancient Aravalli Mountain Ridge",
      story:
        "Aravalli Greens is located on the fast-paced 6-lane Ajmer Road expressway, right in the heart of Jaipur's premier corporate and industrial growth node. Designed for professionals and visionaries seeking clean air, sweet water, and high capital growth.",
      developerVision:
        "To deliver a secure, nature-embracing plotted township with resort-grade amenities, wide tree-lined boulevards, and seamless connectivity to western Jaipur's top academic institutions.",
      keyHighlights: [
        "100% Freehold JDA Patta Scheme with Complete 90A Revenue Clearance",
        "Situated on the 200-Ft Ajmer Road Arterial Corridor",
        "Walking Distance from Mahindra World City Multi-Product SEZ",
        "Pre-Installed Underground Water Reservoir & Storm Drainage Network",
      ],
      stats: [
        { label: "Township Acreage", value: "70 Acres", sublabel: "Masterplanned Plotted Layout" },
        { label: "Elevation", value: "430m MSL", sublabel: "Pristine Mountain Backdrop" },
        { label: "Road Hierarchy", value: "50 & 30 Ft", sublabel: "Interlocking Concrete Pavers" },
        { label: "Appreciation Trend", value: "+18.4% YoY", sublabel: "Historical SEZ Corridor CAGR" },
      ],
    },
    masterPlan: {
      planImage: "/images/catalogue/master-plan-blueprint.jpg",
      blueprintTitle: "Aravalli Greens Master Plan & Zonal Plotted Layout",
      totalArea: "70 Acres Plotted Gated Campus",
      openGreenRatio: "32.0% Open Spaces, Parks & Tree Buffers",
      roadHierarchy: [
        "50-Foot Wide Boulevard Avenue with Centre Medians & Shady Amaltas Trees",
        "30-Foot Interlocking Paver Internal Streets with Drainage Kerbs",
      ],
      demarcationType: "Granite Peg Markers & Physical Survey Number Boundary Stones",
      highlights: [
        "Perimeter 8-Foot Boundary Wall with High-Tensile Security Fencing",
        "Dedicated Club Area with Swimming Pool, Badminton Court & Community Hall",
        "Dual Overhead Water Reservoir Delivering Pressurized Water Supply",
        "Automated Rainwater Recharging Injection Wells",
      ],
    },
    connectivity: {
      corridorAnalysis:
        "The Ajmer Road vector is Jaipur's primary corporate corridor. Anchored by Infosys, JCB, Deutsche Bank, Genpact, and Mahindra World City, residential land values here benefit from massive continuous employee influx.",
      highlights: [
        { destination: "Mahindra World City SEZ Gate 2", distance: "2.5 km", driveTime: "4 mins", via: "SEZ Link Boulevard" },
        { destination: "200-Ft Ajmer Road Expressway", distance: "1.2 km", driveTime: "2 mins", via: "Direct Main Road" },
        { destination: "Delhi Public School (DPS) Jaipur", distance: "5.0 km", driveTime: "7 mins", via: "Ajmer Road" },
        { destination: "Vaishali Nagar Commercial District", distance: "16 km", driveTime: "20 mins", via: "Expressway Flyover" },
        { destination: "Jaipur Ring Road Ajmer Junction", distance: "4.8 km", driveTime: "6 mins", via: "Ring Road Interchange" },
      ],
    },
    infrastructure: {
      summary: "Comprehensive township utilities pre-installed to the boundary of each residential plot.",
      features: [
        { title: "Grand Society Clubhouse", description: "Fully equipped gym, indoor games, community banquet lawn, and recreation center.", icon: "Shield" },
        { title: "Shiva Temple & Prayer Grounds", description: "Beautifully carved white marble temple inside the secured perimeter.", icon: "Sparkles" },
        { title: "Underground Optical Fiber", description: "Pre-ducted high-speed internet cables from Jio and Airtel directly to plots.", icon: "Wifi" },
        { title: "Deep Aquifer Borewells", description: "Abundant sweet water table backed by multi-stage filtration reservoirs.", icon: "Droplets" },
      ],
      engineeringSpecs: [
        "Heavy-duty M40 grade interlocking concrete block internal roads",
        "RCC underground storm culverts with silt-trapping manholes",
        "Solar-powered street lighting with automatic lux-level sensors",
        "Pre-installed independent electrical distribution boxes for each pair of plots",
      ],
    },
    typologies: [
      {
        categoryName: "Premium Villa Plot",
        sizeGaj: 250,
        sizeSqFt: 2250,
        dimensions: "33 Ft Frontage x 68 Ft Depth",
        facingOptions: ["North-East (Ishan Kon)", "East Facing"],
        roadWidth: "50-Ft Wide Boulevard",
        pricePerGaj: "₹27,500 / Gaj",
        startingPrice: "₹68.75 Lakh",
        recommendedFor: "Custom Country Villa with 3 Car Porches and Private Garden",
      },
      {
        categoryName: "Contemporary Living Plot",
        sizeGaj: 200,
        sizeSqFt: 1800,
        dimensions: "30 Ft Frontage x 60 Ft Depth",
        facingOptions: ["East Facing", "North Facing"],
        roadWidth: "30-Ft Wide Internal Street",
        pricePerGaj: "₹26,800 / Gaj",
        startingPrice: "₹53.60 Lakh",
        recommendedFor: "Spacious 3-4 BHK Modern Duplex for IT & Executive Families",
      },
    ],
    legalClearances: {
      jdaSanctionNo: "JDA/ZON-11/SCHEME-2023/1104-M",
      order90A: "Revenue Conversion Order Ref: JP-90A-38914",
      khasraJamabandi: "Khasra No. 88, 89/1, 91/2, Revenue Village Bagru Extension",
      reraRegistration: "RAJ/P/2023/2411 (RERA Rajasthan Registered Plotted Scheme)",
      possessionTimeline: "Immediate Possession with Deed Registration",
      registryReadiness: "100% Clear Title Eligible for Sub-Registrar Deed Execution",
      approvedBanks: ["State Bank of India (SBI)", "HDFC Bank", "ICICI Bank", "Punjab National Bank"],
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
    ],
    advisory: {
      specialistName: "Col. Sanjeev Rathore (Retd.)",
      role: "Vice President — Western Corridor Land Desk",
      phone: "+91 800-123-4567",
      email: "ajmer.desk@terrafirma-estates.demo",
      officeAddress: "Plot No. 42, JLN Marg, Malviya Nagar, Jaipur 302017",
    },
  },
  {
    id: "proj-03",
    slug: "jaipur-ring-road-corner-plot",
    title: "Ring Road Expressway Node — Mansarovar Ext.",
    tagline: "Strategic Plotted Corridor Directly on the 6-Lane Jaipur Ring Road Cloverleaf",
    edition: "Official Master Catalogue",
    volume: "Vol. XXIV — Issue 03",
    year: "2026 Edition",
    category: "Ring Road Growth Corridor",
    status: "Phase 1 Fast Filling",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    location: {
      locality: "Mansarovar Extension / Muhana Hub",
      city: "Jaipur",
      state: "Rajasthan",
      corridor: "Jaipur Ring Road Axis",
      landmark: "Near Muhana Terminal & Ring Road Flyover",
      coordinates: "26.7891° N, 75.7482° E",
    },
    overview: {
      headline: "High-CAGR Arterial Plots at the Convergence of Mansarovar Metro Node and Ring Road Expressway",
      story:
        "The Jaipur Ring Road has transformed southern Jaipur into the state's most liquid logistical and residential real estate market. This project sits less than 800 meters from the major cloverleaf exit, offering instant access to Tonk Road, Ajmer Road, and Delhi Highway.",
      developerVision:
        "To provide high-growth plotted investments for long-term wealth creators, offering clear title deeds, wide entry boulevards, and ready-to-construct basic infrastructure.",
      keyHighlights: [
        "Strategically Placed 800 Meters from Operational Ring Road Exit",
        "Direct Feeder Connection to Mansarovar Metro Station",
        "JDA Approved Layout with Clear Commercial & Residential Mixed Usage Zones",
        "High Annual Capital Appreciation (+16.4% Historical 3-Yr CAGR)",
      ],
      stats: [
        { label: "Corridor Speed", value: "6 Lanes", sublabel: "Signal-Free Expressway Access" },
        { label: "Metro Distance", value: "7.5 km", sublabel: "Mansarovar Metro Terminal" },
        { label: "Plot Area", value: "166 Gaj", sublabel: "Standard 25 x 60 Ft Dimension" },
        { label: "Appreciation", value: "+16.4%", sublabel: "Historical Annual Growth" },
      ],
    },
    masterPlan: {
      planImage: "/images/catalogue/master-plan-blueprint.jpg",
      blueprintTitle: "Ring Road Plotted Scheme Layout Plan",
      totalArea: "45 Bighas Plotted Scheme",
      openGreenRatio: "24.0% Open Area & Parks",
      roadHierarchy: [
        "40-Foot Main Entry Arterial Road",
        "30-Foot Interlocking Paver Internal Residential Streets",
      ],
      demarcationType: "RCC Boundary Corner Pillars with Survey Markers",
      highlights: [
        "Internal Retail Commercial Plots at Entry Gate",
        "Underground Drainage Network Connecting to Main Sector Line",
        "Solar Street Lighting with Automated Sensors",
      ],
    },
    connectivity: {
      corridorAnalysis:
        "The operational 47-km Jaipur Ring Road connects all major transport corridors around the capital without entering city traffic bottlenecks.",
      highlights: [
        { destination: "Jaipur Ring Road Cloverleaf Exit", distance: "800 m", driveTime: "2 mins", via: "Sector Feeder Road" },
        { destination: "Muhana Mandi Terminal & Bus Depot", distance: "2.5 km", driveTime: "5 mins", via: "Muhana Road" },
        { destination: "Mansarovar Metro Station", distance: "7.5 km", driveTime: "11 mins", via: "Madhyam Marg" },
        { destination: "Sitapura Industrial & SEZ Area", distance: "9.0 km", driveTime: "13 mins", via: "Ring Road Expressway" },
      ],
    },
    infrastructure: {
      summary: "Modern street and drainage infrastructure pre-built for immediate construction.",
      features: [
        { title: "Direct Piped Water Line", description: "Borewell and overhead reservoir facility delivering steady water supply.", icon: "Droplets" },
        { title: "Solar Street Lights", description: "Eco-friendly dusk-to-dawn LED illumination along all streets.", icon: "Zap" },
        { title: "Secured Gated Entry", description: "Main entry arch with barrier gates and security guard post.", icon: "Shield" },
        { title: "Green Plantation Avenue", description: "Dense neem and amaltas trees planted along every road corridor.", icon: "Trees" },
      ],
      engineeringSpecs: [
        "40-foot and 30-foot wide asphalt roads with kerb stones",
        "Individual electricity pole for every pair of plots",
        "Pre-laid underground stormwater collection channels",
      ],
    },
    typologies: [
      {
        categoryName: "Corner Investment Plot",
        sizeGaj: 166,
        sizeSqFt: 1494,
        dimensions: "25 Ft Frontage x 60 Ft Depth",
        facingOptions: ["North Facing", "East Facing"],
        roadWidth: "40-Ft Wide Feeder Road",
        pricePerGaj: "₹29,000 / Gaj",
        startingPrice: "₹48.14 Lakh",
        recommendedFor: "High-CAGR Capital Growth or Independent 3BHK Duplex",
      },
    ],
    legalClearances: {
      jdaSanctionNo: "JDA/ZON-08/SCHEME-2024/632-RR",
      order90A: "Revenue Conversion Order Ref: JP-90A-41902",
      khasraJamabandi: "Khasra No. 120, 122/1, Revenue Village Muhana",
      reraRegistration: "RAJ/P/2024/3102",
      possessionTimeline: "Immediate Demarcated Possession",
      registryReadiness: "100% Ready for Sub-Registrar Registry Execution",
      approvedBanks: ["SBI", "Bank of Baroda", "HDFC", "ICICI"],
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1600&auto=format&fit=crop",
    ],
    advisory: {
      specialistName: "Mr. Harsh Vardhan Choudhary",
      role: "Lead Investment Strategist — Ring Road Corridor",
      phone: "+91 800-123-4567",
      email: "ringroad@terrafirma-estates.demo",
      officeAddress: "Plot No. 42, JLN Marg, Malviya Nagar, Jaipur 302017",
    },
  },
  {
    id: "proj-04",
    slug: "sunrise-city-sirsi-road",
    title: "Sunrise City — Sirsi Road & Vaishali Ext.",
    tagline: "Exclusive Gated Society Plots in Jaipur's Most Affluent Western Residential Belt",
    edition: "Official Master Catalogue",
    volume: "Vol. XXIV — Issue 04",
    year: "2026 Edition",
    category: "Gated Society Plots",
    status: "Available for Construction",
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
    location: {
      locality: "Sirsi Road / Bindayaka Hub",
      city: "Jaipur",
      state: "Rajasthan",
      corridor: "Sirsi Road & Vaishali Extension",
      landmark: "10 Mins from Vaishali Nagar National Handloom",
      coordinates: "26.9210° N, 75.6980° E",
    },
    overview: {
      headline: "The Pinnacle of Plotted Dignity for Aristocratic Bungalows Near Vaishali Nagar",
      story:
        "Sunrise City caters to families who refuse to compromise on elite neighborhood gentry and proximity to Jaipur's finest schools, clubs, and gourmet restaurants in Vaishali Nagar.",
      developerVision:
        "An exclusive sanctuary of only 300 Gaj and 500 Gaj sovereign plots surrounded by luxury private bungalows, landscaped central park, and dedicated security infrastructure.",
      keyHighlights: [
        "10 Minutes from Central Vaishali Nagar & Amrapali Plaza",
        "Large 300 Gaj Corner Plots with 40-Ft Frontage",
        "Underground Fiber Optic, PHED Piped Water & Sewer Lines",
        "High Occupancy Neighborhood with Completed Bungalows",
      ],
      stats: [
        { label: "Average Plot Size", value: "300 Gaj", sublabel: "Grand 40 x 67.5 Ft Layout" },
        { label: "Distance to Vaishali", value: "4.8 km", sublabel: "9 Minutes Drive Time" },
        { label: "Internal Roads", value: "40 Feet", sublabel: "Concrete Interlocking Blocks" },
        { label: "Documentation", value: "100% Clear", sublabel: "JDA Patta & 90A Conversion" },
      ],
    },
    masterPlan: {
      planImage: "/images/catalogue/master-plan-blueprint.jpg",
      blueprintTitle: "Sunrise City Gated Scheme Master Blueprint",
      totalArea: "35 Bighas Boutique Plotted Gated Community",
      openGreenRatio: "26.0% Dedicated Green Park & Jogging Track",
      roadHierarchy: [
        "40-Foot Wide Concrete Block Roads with Storm Drainage Inlets",
      ],
      demarcationType: "Granite Plot Marker with Registered Number Plates",
      highlights: [
        "1.5-Acre Manicured Central Park with Yoga Lawn and Children's Swings",
        "High-Speed Fiber Pre-Wired to All Township Junction Boxes",
        "24/7 Security Patrols with CCTV Monitoring",
      ],
    },
    connectivity: {
      corridorAnalysis:
        "Sirsi Road represents the natural luxury westward expansion of Vaishali Nagar. Complete with top CBSE schools and express bypass access.",
      highlights: [
        { destination: "Vaishali Nagar Main Market", distance: "4.8 km", driveTime: "9 mins", via: "Sirsi Road" },
        { destination: "Jaipur Junction Railway Station", distance: "11 km", driveTime: "18 mins", via: "Khatipura Road" },
        { destination: "Delhi-Ajmer 200-Ft Bypass", distance: "3.5 km", driveTime: "6 mins", via: "Bypass Underpass" },
        { destination: "Step By Step International School", distance: "2.0 km", driveTime: "4 mins", via: "Sirsi Link" },
      ],
    },
    infrastructure: {
      summary: "Underground utilities engineered for high-density luxury residential living.",
      features: [
        { title: "Central Landscaped Park", description: "Lush green lawns with gazebo and jogging tracks.", icon: "Trees" },
        { title: "Municipal PHED Water", description: "Direct municipal drinking water pipeline backed by borewell.", icon: "Droplets" },
        { title: "High-Speed Fiber Network", description: "JioFiber & Airtel Xstream pre-ducted to all plot boundaries.", icon: "Wifi" },
        { title: "Night Security Patrols", description: "Dedicated guard rounds and perimeter CCTV monitoring.", icon: "Shield" },
      ],
      engineeringSpecs: [
        "40-foot wide concrete interlocking block roads",
        "Concealed electrical lines with no hanging cables",
        "Heavy-duty stormwater collection gullies",
      ],
    },
    typologies: [
      {
        categoryName: "Estate Corner Plot",
        sizeGaj: 300,
        sizeSqFt: 2700,
        dimensions: "40 Ft Frontage x 67.5 Ft Depth",
        facingOptions: ["Pure East (Vaastu)", "North Facing"],
        roadWidth: "40-Ft Wide Interlocking Avenue",
        pricePerGaj: "₹32,000 / Gaj",
        startingPrice: "₹96.00 Lakh",
        recommendedFor: "Grand Independent Luxury Bungalow with Multiple Car Porches",
      },
    ],
    legalClearances: {
      jdaSanctionNo: "JDA/ZON-07/SCHEME-2023/894-SR",
      order90A: "Revenue 90A Conversion Ref: JP-90A-33102",
      khasraJamabandi: "Khasra No. 201/2, Revenue Village Bindayaka",
      reraRegistration: "RAJ/P/2023/2180",
      possessionTimeline: "Immediate Possession with Registry",
      registryReadiness: "100% Freehold JDA Patta Ready for Transfer",
      approvedBanks: ["HDFC Bank", "SBI", "ICICI Bank", "Axis Bank"],
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=1600&auto=format&fit=crop",
    ],
    advisory: {
      specialistName: "Mrs. Meenakshi Shekhawat",
      role: "Director of Western Jaipur Land Portfolio",
      phone: "+91 800-123-4567",
      email: "vaishali@terrafirma-estates.demo",
      officeAddress: "Plot No. 42, JLN Marg, Malviya Nagar, Jaipur 302017",
    },
  },
  {
    id: "proj-05",
    slug: "heritage-palms-tonk-road",
    title: "Heritage Palms — Tonk Road Corridor",
    tagline: "Compact 111 Gaj Plotted Community near Chokhi Dhani & Ring Road Junction",
    edition: "Official Master Catalogue",
    volume: "Vol. XXIV — Issue 05",
    year: "2026 Edition",
    category: "Gated Society Plots",
    status: "Available for Construction",
    coverImage: "https://images.unsplash.com/photo-1500076656116-558758c991c1?q=80&w=1600&auto=format&fit=crop",
    location: {
      locality: "Tonk Road / Bilwa Growth Pocket",
      city: "Jaipur",
      state: "Rajasthan",
      corridor: "Tonk Road & Airport Growth Axis",
      landmark: "5 Mins from Chokhi Dhani Resort",
      coordinates: "26.7640° N, 75.8230° E",
    },
    overview: {
      headline: "Affordable High-Yield Plotted Living on Jaipur's Established Southern Spine",
      story:
        "Heritage Palms offers 111 Gaj residential plots in an established, secured society along the high-demand Tonk Road growth belt, providing quick connectivity to Sitapura industrial zone and universities.",
      developerVision:
        "To deliver budget-friendly 100% legal residential plots with wide interlocking paver roads and ready water-power lines for contemporary family duplexes.",
      keyHighlights: [
        "Sub-₹40 Lakh Price Bracket with 80% Nationalized Bank Loan Eligibility",
        "5 Minutes from Chokhi Dhani Resort and Jaipur Ring Road Junction",
        "Sweet Groundwater Connection and 30-Foot Interlocking Paver Roads",
      ],
      stats: [
        { label: "Plot Area", value: "111 Gaj", sublabel: "999 Sq.Ft (20 x 50 Ft)" },
        { label: "Starting Price", value: "₹35.52 Lakh", sublabel: "₹32,000 / Gaj" },
        { label: "Road Width", value: "30 Feet", sublabel: "Interlocking Paver Blocks" },
        { label: "Bank Loan", value: "80% Approved", sublabel: "SBI, PNB & Bank of Baroda" },
      ],
    },
    masterPlan: {
      planImage: "/images/catalogue/master-plan-blueprint.jpg",
      blueprintTitle: "Heritage Palms Plotted Layout Map",
      totalArea: "25 Bighas Gated Society",
      openGreenRatio: "22.0% Park & Open Spaces",
      roadHierarchy: ["30-Foot Wide Interlocking Concrete Paver Streets"],
      demarcationType: "RCC Boundary Corner Stones",
      highlights: [
        "Temple and Community Gathering Hall Inside Campus",
        "Secured Boundary Wall with 24/7 Security Gatehouse",
      ],
    },
    connectivity: {
      corridorAnalysis: "Tonk Road is Jaipur's primary southern connection to the airport, gems & jewellery special zones, and top engineering institutions.",
      highlights: [
        { destination: "Chokhi Dhani Resort", distance: "2.0 km", driveTime: "4 mins", via: "Tonk Road" },
        { destination: "Jaipur Ring Road Tonk Junction", distance: "3.5 km", driveTime: "5 mins", via: "Ring Road Cloverleaf" },
        { destination: "Jaipur International Airport", distance: "11 km", driveTime: "15 mins", via: "JLN Marg" },
      ],
    },
    infrastructure: {
      summary: "Underground utilities and deep borewell water pre-installed.",
      features: [
        { title: "Deep Borewell Water Facility", description: "Sweet water connection plumbed directly to every plot.", icon: "Droplets" },
        { title: "Gated Main Entry Arch", description: "Perimeter boundary wall with security guard station.", icon: "Shield" },
      ],
      engineeringSpecs: ["30-foot wide interlocking paver roads", "Underground drainage chambers"],
    },
    typologies: [
      {
        categoryName: "Starter Duplex Plot",
        sizeGaj: 111,
        sizeSqFt: 999,
        dimensions: "20 Ft Frontage x 50 Ft Depth",
        facingOptions: ["East Facing (Vaastu)", "North Facing"],
        roadWidth: "30-Ft Wide Society Street",
        pricePerGaj: "₹32,000 / Gaj",
        startingPrice: "₹35.52 Lakh",
        recommendedFor: "Independent 3BHK Duplex for Nuclear Families",
      },
    ],
    legalClearances: {
      jdaSanctionNo: "JDA/ZON-14/SCHEME-2023/502-TR",
      order90A: "Revenue 90A Sanction Ref: JP-90A-29801",
      khasraJamabandi: "Khasra No. 340, Revenue Village Bilwa",
      reraRegistration: "RAJ/P/2023/1904",
      possessionTimeline: "Immediate Possession with Deed Registry",
      registryReadiness: "100% Freehold Title Eligible for Direct Deed Registry",
      approvedBanks: ["SBI", "PNB", "Bank of Baroda"],
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1600&auto=format&fit=crop",
    ],
    advisory: {
      specialistName: "Mr. Rameshwar Lal Sharma",
      role: "Senior Consultant — Tonk Road Desk",
      phone: "+91 800-123-4567",
      email: "tonkroad@terrafirma-estates.demo",
      officeAddress: "Plot No. 42, JLN Marg, Malviya Nagar, Jaipur 302017",
    },
  },
  {
    id: "proj-06",
    slug: "aravalli-ridge-kukas-delhi-road",
    title: "Aravalli Ridge View — Kukas & Delhi Road",
    tagline: "Panoramic 500 Gaj Mountain-Facing Estate Parcels Adjacent to 5-Star Luxury Resorts",
    edition: "Official Master Catalogue",
    volume: "Vol. XXIV — Issue 06",
    year: "2026 Edition",
    category: "Aravalli Hillview Parcels",
    status: "Pre-Launch Sovereign Preview",
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop",
    location: {
      locality: "Kukas Heritage Valley, Delhi Highway",
      city: "Jaipur",
      state: "Rajasthan",
      corridor: "Delhi Road Heritage Axis",
      landmark: "Adjacent to Fairmont Jaipur & Le Méridien",
      coordinates: "27.0510° N, 75.9120° E",
    },
    overview: {
      headline: "Private Estate Living Facing Ancient Mountain Ridges on Jaipur's Elite Resort Axis",
      story:
        "Aravalli Ridge View is an exclusive plotted sanctuary designed for HNIs seeking architectural weekend villas, private infinity pool estates, and permanent unobstructed mountain vistas.",
      developerVision:
        "To curate an ultra-low-density mountain enclave with crystal rock-aquifer water, 60-foot entry boulevards, and private resort club privileges.",
      keyHighlights: [
        "Unobstructed Permanent Aravalli Mountain Range Views",
        "Large 500 Gaj Footprints (50 Ft Frontage x 90 Ft Depth)",
        "Next Door to Fairmont, JW Marriott, and Le Méridien Resorts",
      ],
      stats: [
        { label: "Plot Footprint", value: "500 Gaj", sublabel: "4,500 Sq.Ft (50 x 90 Ft)" },
        { label: "Starting Price", value: "₹1.25 Cr", sublabel: "₹25,000 / Gaj" },
        { label: "Entry Avenue", value: "60 Feet", sublabel: "Heavy-Duty Blacktop" },
        { label: "Zoning", value: "Eco-Plotted", sublabel: "90A Sanctioned" },
      ],
    },
    masterPlan: {
      planImage: "/images/catalogue/master-plan-blueprint.jpg",
      blueprintTitle: "Aravalli Ridge Master Estate Plan",
      totalArea: "50 Bighas Low-Density Plotted Layout",
      openGreenRatio: "40.0% Natural Reserve & Trails",
      roadHierarchy: ["60-Foot Blacktop Entry Avenue", "40-Foot Internal Estate Roads"],
      demarcationType: "Dressed Sandstone Corner Markers",
      highlights: [
        "Hiking and Mountain Trail Access Points",
        "Deep Rock Aquifer Tube Well Delivering Sweet Potable Water",
      ],
    },
    connectivity: {
      corridorAnalysis: "Located directly along the Delhi-Jaipur National Highway with smooth signal-free transit into the heritage pink city.",
      highlights: [
        { destination: "Fairmont & Le Méridien Resorts", distance: "1.5 km", driveTime: "3 mins", via: "Resort Corridor" },
        { destination: "Amer Fort & Heritage Precinct", distance: "9.0 km", driveTime: "12 mins", via: "Delhi Highway" },
        { destination: "Jaipur MI Road / City Centre", distance: "20 km", driveTime: "25 mins", via: "Amer Road Bypass" },
      ],
    },
    infrastructure: {
      summary: "Luxury infrastructure designed for bespoke architectural villas.",
      features: [
        { title: "Deep Aquifer Sweet Water", description: "Pure mountain groundwater supply.", icon: "Droplets" },
        { title: "Private Resort Tie-Up", description: "Special dining and banquet privileges.", icon: "Shield" },
      ],
      engineeringSpecs: ["60-foot blacktop approach road", "Dedicated high-voltage electrical substation"],
    },
    typologies: [
      {
        categoryName: "Sovereign Ridge Plot",
        sizeGaj: 500,
        sizeSqFt: 4500,
        dimensions: "50 Ft Frontage x 90 Ft Depth",
        facingOptions: ["North-East (Hill View)", "East Facing"],
        roadWidth: "60-Ft Wide Estate Avenue",
        pricePerGaj: "₹25,000 / Gaj",
        startingPrice: "₹1.25 Cr",
        recommendedFor: "Architectural Private Retreat with Glass Façade and Infinity Pool",
      },
    ],
    legalClearances: {
      jdaSanctionNo: "JDA/ZON-10/SCHEME-2024/318-AR",
      order90A: "Revenue 90A Clearance Ref: JP-90A-51004",
      khasraJamabandi: "Khasra No. 104, Revenue Village Kukas",
      reraRegistration: "RAJ/P/2024/2990",
      possessionTimeline: "Immediate Demarcated Possession",
      registryReadiness: "100% Clear Title Eligible for Sub-Registrar Registry Execution",
      approvedBanks: ["HDFC Bank", "ICICI Bank", "SBI"],
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop",
    ],
    advisory: {
      specialistName: "Mr. Vikramaditya Rathore",
      role: "Luxury Portfolio Director — Heritage Corridor",
      phone: "+91 800-123-4567",
      email: "delhiroad@terrafirma-estates.demo",
      officeAddress: "Plot No. 42, JLN Marg, Malviya Nagar, Jaipur 302017",
    },
  },
  {
    id: "proj-07",
    slug: "maharaja-royal-farmsteads-ramgarh",
    title: "Maharaja Royal Farmsteads — Ramgarh Valley",
    tagline: "1 Bigha (2,000 Gaj) Fenced Organic Farm Parcels with Sweet Groundwater",
    edition: "Official Master Catalogue",
    volume: "Vol. XXIV — Issue 07",
    year: "2026 Edition",
    category: "Luxury Farmhouse Land",
    status: "Rare Acreage Parcels",
    coverImage: "https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=1600&auto=format&fit=crop",
    location: {
      locality: "Jamwa Ramgarh Valley",
      city: "Jaipur Rural",
      state: "Rajasthan",
      corridor: "North Eco-Farm Belt",
      landmark: "Near Ramgarh Polo Grounds & Lake Bed",
      coordinates: "27.0240° N, 75.9810° E",
    },
    overview: {
      headline: "Heirloom Country Acreage Surrounded by Aravalli Hills and Organic Orchards",
      story:
        "Maharaja Royal Farmsteads provides clean-titled 1 Bigha (2,000 Gaj) parcels pre-fenced with solid stone boundary walls, sweet water tube wells, and 75 mature fruit trees.",
      developerVision:
        "To establish an agrarian sanctuary for legacy families seeking weekend wellness, organic farming, and sovereign open spaces.",
      keyHighlights: [
        "1 Full Bigha (2,000 Gaj / 18,000 Sq.Ft) Sovereign Parcel",
        "Pre-Installed Tube Well Delivering Sweet Potable Water at 100 Ft",
        "Stone Boundary Wall and Metal Entrance Gate Included",
      ],
      stats: [
        { label: "Parcel Size", value: "1 Bigha", sublabel: "2,000 Gaj (18,000 Sq.Ft)" },
        { label: "Starting Price", value: "₹1.80 Cr", sublabel: "₹9,000 / Gaj" },
        { label: "Water Level", value: "100 Feet", sublabel: "Crystal Sweet Groundwater" },
        { label: "Pre-Planted", value: "75 Trees", sublabel: "Mango, Kinu & Amla Orchards" },
      ],
    },
    masterPlan: {
      planImage: "/images/catalogue/master-plan-blueprint.jpg",
      blueprintTitle: "Ramgarh Valley Farmstead Master Layout",
      totalArea: "120 Bighas Farmstead Layout",
      openGreenRatio: "85.0% Agro-Forestry & Farming",
      roadHierarchy: ["40-Foot Metal Road Access with Secured Gate"],
      demarcationType: "6-Foot Stone Boundary Wall with Iron Gate",
      highlights: ["Polo Ground & Equestrian Riding Arena Access", "Agronomist & Caretaker Support"],
    },
    connectivity: {
      corridorAnalysis: "Picturesque drive along the green Ramgarh valley corridor away from urban industrial pollution.",
      highlights: [
        { destination: "Ramgarh Heritage Palace Hotel", distance: "4.0 km", driveTime: "6 mins", via: "Ramgarh Road" },
        { destination: "Amer Town Precinct", distance: "14 km", driveTime: "18 mins", via: "Amer Highway Link" },
        { destination: "Jaipur City Centre (MI Road)", distance: "28 km", driveTime: "35 mins", via: "Delhi Highway" },
      ],
    },
    infrastructure: {
      summary: "Self-sustaining agrarian utilities pre-installed.",
      features: [
        { title: "Pre-Installed High-Yield Tube Well", description: "Dedicated sweet water source.", icon: "Droplets" },
        { title: "Solar Power Provision", description: "5kW solar pump and net metering ready.", icon: "Zap" },
      ],
      engineeringSpecs: ["40-foot crushed gravel estate roadway", "Subsurface drip irrigation lines"],
    },
    typologies: [
      {
        categoryName: "Sovereign 1 Bigha Farmstead",
        sizeGaj: 2000,
        sizeSqFt: 18000,
        dimensions: "120 Ft Frontage x 150 Ft Depth",
        facingOptions: ["Pure East (Sunrise Facing)"],
        roadWidth: "40-Ft Wide Estate Metal Road",
        pricePerGaj: "₹9,000 / Gaj",
        startingPrice: "₹1.80 Cr",
        recommendedFor: "Heirloom Weekend Farmstead with Horse Stables, Orchard & Pool",
      },
    ],
    legalClearances: {
      jdaSanctionNo: "Revenue Certified Khatedari Record",
      order90A: "Agricultural & Farmhouse Sanction Ref: RAM-AG-8812",
      khasraJamabandi: "Khasra No. 67, 68/1, Revenue Village Jamwa Ramgarh",
      reraRegistration: "Verified Khatedari Single Ownership Record",
      possessionTimeline: "Immediate Demarcated Possession",
      registryReadiness: "100% Ready for Direct Deed Registry Execution",
      approvedBanks: ["Bank of Baroda", "State Bank of India"],
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop",
    ],
    advisory: {
      specialistName: "Kr. Jaideep Singh Bhati",
      role: "Farmstead Land Advisory Lead",
      phone: "+91 800-123-4567",
      email: "farmsteads@terrafirma-estates.demo",
      officeAddress: "Plot No. 42, JLN Marg, Malviya Nagar, Jaipur 302017",
    },
  },
  {
    id: "proj-08",
    slug: "vatika-enclave-kalwar-road",
    title: "Vatika Plotted Enclave — Kalwar Road",
    tagline: "Highly Budget-Friendly JDA Approved 100 Gaj Plots on 30-Ft Road with Sweet Water",
    edition: "Official Master Catalogue",
    volume: "Vol. XXIV — Issue 08",
    year: "2026 Edition",
    category: "JDA Approved Township",
    status: "Ready for Title Registry",
    coverImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop",
    location: {
      locality: "Kalwar Road / Hathoj",
      city: "Jaipur",
      state: "Rajasthan",
      corridor: "Kalwar Road Growth Pocket",
      landmark: "Near Hathoj Bus Stand & Jhotwara Extension",
      coordinates: "26.9610° N, 75.6810° E",
    },
    overview: {
      headline: "The Most Affordable JDA Approved Plotted Township for Starter Homeowners in Jaipur",
      story:
        "Vatika Enclave brings direct JDA Patta ownership within reach of every family. Located along Kalwar Road with quick transit to Jhotwara, this scheme is 100% ready for deed registration and bank loans.",
      developerVision:
        "To deliver clean, demarcated 100 Gaj residential plots with complete underground electricity, sweet water pipelines, and wide paved streets.",
      keyHighlights: [
        "Unbeatable ₹23.00 Lakh Starting Valuation for 100 Gaj Plot",
        "Individual JDA Patta with Direct Sub-Registrar Registry Eligibility",
        "80% Bank Loan Approved by SBI, PNB, and Bank of Baroda",
      ],
      stats: [
        { label: "Plot Area", value: "100 Gaj", sublabel: "900 Sq.Ft (20 x 45 Ft)" },
        { label: "Starting Price", value: "₹23.00 Lakh", sublabel: "₹23,000 / Gaj (JDA Patta)" },
        { label: "Road Width", value: "30 Feet", sublabel: "Bitumen Paved Road" },
        { label: "Bank Finance", value: "Up to 80%", sublabel: "Nationalized Banks" },
      ],
    },
    masterPlan: {
      planImage: "/images/catalogue/master-plan-blueprint.jpg",
      blueprintTitle: "Vatika Enclave JDA Sanctioned Layout Plan",
      totalArea: "30 Bighas Plotted Scheme",
      openGreenRatio: "25.0% Parks & Open Spaces",
      roadHierarchy: ["30-Foot Wide Bitumen Asphalt Roads"],
      demarcationType: "RCC Boundary Corner Stones",
      highlights: ["Gated Society Security Gatehouse", "Community Park and Sweet Water Lines"],
    },
    connectivity: {
      corridorAnalysis: "Kalwar Road is Jaipur's fastest growing affordable residential corridor with high population density.",
      highlights: [
        { destination: "Jhotwara Flyover", distance: "6.5 km", driveTime: "10 mins", via: "Kalwar Main Road" },
        { destination: "Jaipur Junction Railway Station", distance: "13 km", driveTime: "22 mins", via: "Khatipura / Jhotwara" },
        { destination: "Delhi-Ajmer 200-Ft Bypass", distance: "7.0 km", driveTime: "12 mins", via: "Bypass Link" },
      ],
    },
    infrastructure: {
      summary: "Ready basic utilities for instant residential construction.",
      features: [
        { title: "Sweet Potable Water Kiosk", description: "Direct society borewell sweet water connection.", icon: "Droplets" },
        { title: "Electricity Meter Poles", description: "Individual meter pillars installed for each plot.", icon: "Zap" },
      ],
      engineeringSpecs: ["30-foot wide asphalt roads with culverts", "Underground drainage chambers"],
    },
    typologies: [
      {
        categoryName: "Value Starter Plot",
        sizeGaj: 100,
        sizeSqFt: 900,
        dimensions: "20 Ft Frontage x 45 Ft Depth",
        facingOptions: ["East Facing", "North Facing"],
        roadWidth: "30-Ft Wide Road",
        pricePerGaj: "₹23,000 / Gaj",
        startingPrice: "₹23.00 Lakh",
        recommendedFor: "Independent Compact 3BHK Home with Zero Maintenance Overheads",
      },
    ],
    legalClearances: {
      jdaSanctionNo: "JDA/ZON-12/SCHEME-2024/229-KR",
      order90A: "Revenue 90A Order Ref: JP-90A-19042",
      khasraJamabandi: "Khasra No. 112, 114/1, Revenue Village Hathoj",
      reraRegistration: "RAJ/P/2024/1884",
      possessionTimeline: "Immediate Demarcated Possession",
      registryReadiness: "100% Freehold JDA Patta Ready for Deed Execution",
      approvedBanks: ["SBI", "PNB", "Bank of Baroda", "HDFC"],
    },
    galleryImages: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1600&auto=format&fit=crop",
    ],
    advisory: {
      specialistName: "Mr. Mukesh Kumar Saini",
      role: "Lead Advisor — Kalwar Road Corridor",
      phone: "+91 800-123-4567",
      email: "kalwar@terrafirma-estates.demo",
      officeAddress: "Plot No. 42, JLN Marg, Malviya Nagar, Jaipur 302017",
    },
  },
];

export function getProjectCatalogueBySlug(slug: string): ProjectCatalogueItem | undefined {
  return PROJECTS_CATALOGUE.find((p) => p.slug === slug);
}

export function getAllProjectCatalogueSlugs(): string[] {
  return PROJECTS_CATALOGUE.map((p) => p.slug);
}

