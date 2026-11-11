export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Private Villas" | "Penthouses & Duplexes" | "Turnkey Renovations" | "Bespoke Commercial";
  location: string;
  year: string;
  area: string;
  duration: string;
  coverImage: string;
  heroImage: string;
  galleryImages: string[];
  excerpt: string;
  story: string;
  materials: string[];
  deliverables: string[];
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "01",
    slug: "palm-jumeirah-sanctuary",
    title: "The Palm Sanctuary",
    subtitle: "Turnkey beachfront residence designed around panoramic sea views and fluid family living.",
    category: "Private Villas",
    location: "Frond G, Palm Jumeirah, Dubai",
    year: "2025",
    area: "14,500 sq ft",
    duration: "11 Months",
    coverImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
    heroImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
    galleryImages: [
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961970/pexels-dwi2793-34961443_bkwpcx.jpg",
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961975/pexels-jonathanborba-9976128_iqwrsv.jpg",
    ],
    excerpt:
      "A complete beachfront villa overhaul combining honed Roman Travertine, fumed white oak parquetry, and motorized slimline glass opening directly to the Arabian Gulf.",
    story:
      "The client acquired an original Mediterranean-style frond villa and wished to transform it into a serene, light-filled architectural retreat. We removed four central masonry columns, engineered steel box-frames to expand the living room span to 16 meters without visible pillars, and specified custom fluted joinery concealing service corridors.",
    materials: [
      "Navona Roman Travertine (Unfilled & Honed)",
      "French Fumed White Oak Chevron",
      "Custom Patinated Champagne Brass",
      "Belgian Bouclé & Raw Linen Textiles",
    ],
    deliverables: [
      "Complete Structural & Space Planning",
      "Full Interior Architecture & 3D Visualization",
      "Turnkey MEP, Chilled Water AC & Crestron Automation",
      "Bespoke Kitchen & Walk-in Dressing Suites",
    ],
  },
  {
    id: "02",
    slug: "emirates-hills-contemporary-palace",
    title: "The Courtyard Estate",
    subtitle: "Palatial family residence blending classical symmetry with contemporary architectural discipline.",
    category: "Private Villas",
    location: "Sector E, Emirates Hills, Dubai",
    year: "2024",
    area: "18,200 sq ft",
    duration: "14 Months",
    coverImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961973/pexels-rashed-hossain-1520582336-38033547_tdf40v.jpg",
    heroImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961973/pexels-rashed-hossain-1520582336-38033547_tdf40v.jpg",
    galleryImages: [
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961973/pexels-rashed-hossain-1520582336-38033547_tdf40v.jpg",
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791962094/pexels-fatih-guney-337108406-18699433_pesxoq.jpg",
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791979411/pexels-cottonbro-6143826_rvohtd.jpg",
    ],
    excerpt:
      "An 18,200 sq ft golf-front estate with an interior courtyard, 7-meter ceiling heights, bookmatched Statuario marble, and tailored acoustic wall paneling.",
    story:
      "Commissioned by a prominent regional family, this estate required grand formal reception suites alongside an intimate, quiet private wing. The centerpiece is a double-height central reception salon flanked by custom fluted walnut millwork with integrated art vitrines and concealed secret entrances to the family living quarters.",
    materials: [
      "Bookmatched Italian Statuario Marble",
      "Dark American Black Walnut Joinery",
      "Cast Liquid Bronze Pivot Doors",
      "Nubuck Leather & Hand-Knotted Silk Rugs",
    ],
    deliverables: [
      "Architectural Design & Space Optimization",
      "Turnkey Fit-Out Stewardship",
      "Custom Furniture Production in Dubai Workshop",
      "Private Cinema & Wellness Spa Fit-Out",
    ],
  },
  {
    id: "03",
    slug: "downtown-opera-sky-villa",
    title: "The Opera Sky Duplex",
    subtitle: "High-floor triplex penthouse framed by full-height glazing overlooking Burj Khalifa.",
    category: "Penthouses & Duplexes",
    location: "Downtown Dubai Opera District",
    year: "2025",
    area: "7,800 sq ft",
    duration: "8 Months",
    coverImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791962094/pexels-fatih-guney-337108406-18699433_pesxoq.jpg",
    heroImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791962094/pexels-fatih-guney-337108406-18699433_pesxoq.jpg",
    galleryImages: [
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791962094/pexels-fatih-guney-337108406-18699433_pesxoq.jpg",
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961975/pexels-jonathanborba-9976128_iqwrsv.jpg",
    ],
    excerpt:
      "A dramatic metropolitan aerie where reflective dark titanium granite, warm fumed oak, and custom floating bronze stairs converse with Dubai's skyline.",
    story:
      "High-rise penthouses present unique acoustic and ceiling height challenges. We redesigned the structural ceiling plenum to add 35cm of vertical clearance, integrated whisper-quiet linear diffusers, and constructed a central cantilevered bronze staircase as a functional architectural sculpture.",
    materials: [
      "Honed Titanium Black Granite",
      "Gunmetal PVD Stainless Steel",
      "Smoked Bronze Glass Vitrines",
      "Acoustic Silk Wall Coverings",
    ],
    deliverables: [
      "High-Rise Permitting & Crane Logistics",
      "Complete Interior Architectural Overhaul",
      "Sculptural Floating Staircase Engineering",
      "Custom Temperature-Controlled Wine Room",
    ],
  },
  {
    id: "04",
    slug: "dubai-hills-golf-pavilion",
    title: "The Minimalist Pavilion",
    subtitle: "Understated modernism embracing fairways, olive trees, and natural stone textures.",
    category: "Private Villas",
    location: "Dubai Hills Estate Fairways, Dubai",
    year: "2024",
    area: "11,200 sq ft",
    duration: "10 Months",
    coverImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961970/pexels-dwi2793-34961443_bkwpcx.jpg",
    heroImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961970/pexels-dwi2793-34961443_bkwpcx.jpg",
    galleryImages: [
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961970/pexels-dwi2793-34961443_bkwpcx.jpg",
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961975/pexels-jonathanborba-9976128_iqwrsv.jpg",
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
    ],
    excerpt:
      "A celebration of warm minimalism. Floor-to-ceiling pivot panels, continuous seamless microcement, and bespoke walnut furniture crafted in our Al Quoz workshop.",
    story:
      "The client sought an unpretentious yet impeccably detailed home free of clutter. Every door in the house was fabricated to 3.6 meters with magnetic European pivots, flush with wall planes so that when closed, hallways read as solid architectural timber surfaces.",
    materials: [
      "Continuous Spanish Microcement",
      "Natural American Walnut Millwork",
      "Brushed Charcoal Anodized Aluminum",
      "Muted Limestone Slabs",
    ],
    deliverables: [
      "Interior Architecture & Construction Drawings",
      "Full Joinery & Cabinetry Fabrication",
      "Minimalist Bathroom Suites with Stone Vanities",
      "Custom Integrated Wardrobes with Dehumidification",
    ],
  },
  {
    id: "05",
    slug: "jumeirah-islands-lakeview-modernization",
    title: "The Lakeview Modernization",
    subtitle: "Complete structural gut renovation converting an outdated Mediterranean villa into an airy sanctuary.",
    category: "Turnkey Renovations",
    location: "Cluster 14, Jumeirah Islands, Dubai",
    year: "2024",
    area: "8,900 sq ft",
    duration: "7 Months",
    coverImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791962094/pexels-fatih-guney-337108406-18699433_pesxoq.jpg",
    heroImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791962094/pexels-fatih-guney-337108406-18699433_pesxoq.jpg",
    galleryImages: [
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791962094/pexels-fatih-guney-337108406-18699433_pesxoq.jpg",
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961973/pexels-rashed-hossain-1520582336-38033547_tdf40v.jpg",
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961970/pexels-dwi2793-34961443_bkwpcx.jpg",
    ],
    excerpt:
      "Stripped down to concrete pillars, this home was reconfigured with floor-to-ceiling glass apertures, double-height atrium, and smart energy-efficient chilled water systems.",
    story:
      "Traditional Jumeirah Islands homes often suffered from fragmented, dark rooms and low ceilings. RichMan Interiors engineered the removal of interior partition walls, replaced the entire 20-year-old MEP infrastructure with state-of-the-art climate management, and opened the living volume to the lake.",
    materials: [
      "Gris Pulpis Spanish Marble",
      "Thermally Broken Slim-Profile Glazing",
      "Rifled European Oak Feature Walls",
      "Brushed Nickel Sanitaryware",
    ],
    deliverables: [
      "Structural Demolition & Load Redistribution",
      "Nakheel & Dubai Municipality NOCs",
      "Total MEP & AC Plant Replacement",
      "Full Interior Architectural Turnkey Rebuild",
    ],
  },
  {
    id: "06",
    slug: "difc-private-family-office",
    title: "The Sovereign Family Suite",
    subtitle: "Private equity headquarters and client reception salon in Dubai International Financial Centre.",
    category: "Bespoke Commercial",
    location: "Gate Precinct, DIFC, Dubai",
    year: "2024",
    area: "6,400 sq ft",
    duration: "5 Months",
    coverImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961973/pexels-rashed-hossain-1520582336-38033547_tdf40v.jpg",
    heroImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961973/pexels-rashed-hossain-1520582336-38033547_tdf40v.jpg",
    galleryImages: [
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961973/pexels-rashed-hossain-1520582336-38033547_tdf40v.jpg",
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961975/pexels-jonathanborba-9976128_iqwrsv.jpg",
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791979412/pexels-cottonbro-6580001_j5dxxv.jpg",
    ],
    excerpt:
      "Blending residential comfort with high-level acoustic privacy. Monolithic reception bar in Nero Marquina, acoustic timber boardrooms, and executive hospitality lounges.",
    story:
      "The client requested a private office that felt like a discrete Mayfair or Zurich salon rather than an impersonal commercial floor. We installed double-glazed 54dB acoustic glass partitions, concealed all audiovisual hardware in walnut wall panelling, and crafted a bespoke monolithic stone reception counter.",
    materials: [
      "Nero Marquina Spanish Marble",
      "Swiss Micro-Perforated Acoustic Timber",
      "Hand-Stitched Executive Saddle Leather",
      "Acoustic Mohair Velvet Drapery",
    ],
    deliverables: [
      "DIFC Authority & Building Approvals",
      "High-Performance Acoustic Engineering (54dB)",
      "Bespoke Conference & Executive Millwork",
      "Private VIP Hospitality Lounge & Pantry",
    ],
  },
  {
    id: "07",
    slug: "jumeirah-bay-beachfront-residence",
    title: "The Jumeirah Bay Villa",
    subtitle: "Sculptural waterfront residence with organic curvilinear walls and honed sandstone finishes.",
    category: "Private Villas",
    location: "Jumeirah Bay Island (Bulgari Island), Dubai",
    year: "2025",
    area: "12,800 sq ft",
    duration: "12 Months",
    coverImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791979419/pexels-shkrabaanthony-6322363_gbwg6f.jpg",
    heroImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791979419/pexels-shkrabaanthony-6322363_gbwg6f.jpg",
    galleryImages: [
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791979419/pexels-shkrabaanthony-6322363_gbwg6f.jpg",
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961970/pexels-dwi2793-34961443_bkwpcx.jpg",
    ],
    excerpt:
      "Located on the prestigious sea-horse island, this residence pairs tactile sea-washed limestone with soft curved plaster ceilings and bespoke bronze accents.",
    story:
      "Inspired by Mediterranean coastal architecture, this villa balances monumental stone masses with airy, wind-permeable courtyards. Every bathroom was sculpted from monolithic blocks of French limestone with concealed zero-edge drains.",
    materials: [
      "French Beaumaniere Limestone",
      "Raw Cast Bronze Door Furniture",
      "Hand-Troweled Venetian Stucco",
      "Bleached Elm Wood Millwork",
    ],
    deliverables: [
      "Full Interior Architecture & Joinery",
      "Stone Sourcing & In-Atelier Dry-Fitting",
      "Lighting Design & Automation Programming",
      "Curated Artwork & Collectible Design Sourcing",
    ],
  },
  {
    id: "08",
    slug: "al-barari-forest-compound",
    title: "The Forest Villa Sanctuary",
    subtitle: "Lush botanical compound integrating organic timber panelling with interior water features.",
    category: "Turnkey Renovations",
    location: "The Residences, Al Barari, Dubai",
    year: "2024",
    area: "16,000 sq ft",
    duration: "9 Months",
    coverImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961975/pexels-jonathanborba-9976128_iqwrsv.jpg",
    heroImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961975/pexels-jonathanborba-9976128_iqwrsv.jpg",
    galleryImages: [
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961975/pexels-jonathanborba-9976128_iqwrsv.jpg",
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791962094/pexels-fatih-guney-337108406-18699433_pesxoq.jpg",
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
    ],
    excerpt:
      "Designed as an oasis within an oasis. Warm Japanese hinoki and walnut accents, indoor botanical atriums, and floating limestone pathways over reflecting pools.",
    story:
      "Surrounded by Al Barari's mature forest, the homeowners wanted their interior to dissolve into nature. We created floor-to-ceiling pivot glazing, integrated living moss walls in wellness areas, and installed a custom Japanese-inspired spa bath carved from a single piece of volcanic basalt.",
    materials: [
      "Volcanic Basalt Stone",
      "Natural Hinoki & Walnut Joinery",
      "Textured Lime Plasters",
      "Brushed Gunmetal Brass",
    ],
    deliverables: [
      "Complete Interior Modernization & Extension",
      "Wellness Suite, Sauna & Cold Plunge Engineering",
      "Full Landscape Interior Integration",
      "Custom Master Dressing Suite & Kitchens",
    ],
  },
];

