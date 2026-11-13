export interface ServiceData {
  slug: string;
  id: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  heroImage: string;
  leadParagraph: string;
  description: string;
  features?: string[];
  deliverablesSummary?: string;
  stats: { label: string; value: string }[];
  deliverables: {
    title: string;
    description: string;
    points?: string[];
  }[];
  materials: {
    name: string;
    origin: string;
    description: string;
  }[];
  processSteps: {
    number: string;
    title: string;
    description: string;
    timing?: string;
    milestone?: string;
    approvals?: string;
  }[];
  gallery: {
    src: string;
    caption: string;
    alt: string;
  }[];
  featuredProject: {
    title: string;
    location: string;
    area: string;
    scope: string;
  };
}

export const SERVICES: ServiceData[] = [
  {
    slug: "complete-turnkey-fit-out",
    id: "01",
    title: "Complete Turnkey Fit-Out",
    subtitle: "Total interior delivery from bare shell to white-glove handover under one unified atelier roof.",
    eyebrow: "COMPREHENSIVE ATELIER EXECUTION · SINGLE CONTRACT",
    heroImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
    leadParagraph:
      "We eliminate the complexity of coordinating multiple contractors. From initial design development and bespoke joinery to precision stone bookmatching and white-glove handover, we manage every stage of the fit-out process to deliver cohesive, move-in-ready interiors.",
    description:
      "Our Complete Turnkey Fit-Out service provides a single point of accountability for private residences, luxury penthouses and bespoke commercial spaces in Dubai. We coordinate every stage of the project, from spatial reconfiguration and bespoke in-house joinery fabrication to natural stone installation, MEP integration, developer and authority approval coordination, and final furnishing. With every stage managed through one coordinated process, we deliver cohesive interiors with greater control over quality, timelines and execution.",
    features: [
      "Single-Contract Turnkey Delivery",
      "Bespoke In-House Joinery Fabrication",
      "Developer & Authority Approval Coordination",
    ],
    deliverablesSummary:
      "From initial design development and technical drawings to material selection, bespoke joinery, natural stone installation, MEP coordination and final furnishing, every stage is carefully managed. Project specifications, material selections, responsibilities and delivery milestones are established before execution to ensure a coordinated process and a consistent finish throughout the property.",
    stats: [
      { label: "Accountability", value: "100% In-House" },
      { label: "Atelier Facility", value: "35,000 sq ft" },
      { label: "Milestone Tracking", value: "Real-Time Portal" },
      { label: "Handover State", value: "White-Glove Ready" },
    ],
    deliverables: [
      {
        title: "Complete Shell & Core to Turnkey Transformation",
        description:
          "Full-spectrum architectural execution transforming bare concrete spaces into refined luxury environments, with every stage carefully coordinated to minimise the client's involvement.",
        points: [
          "Architectural design development, technical drawings and construction documentation",
          "Coordination of structural modifications, MEP works and interior finishing",
          "Project supervision, quality inspections and final furnishing coordination",
        ],
      },
      {
        title: "Bespoke In-House Joinery & Architectural Millwork",
        description:
          "Custom walk-in dressing suites, concealed pivot doors, show kitchens and fluted wall panelling, designed and manufactured at our Dubai facility.",
        points: [
          "Bespoke joinery design, detailed shop drawings and material specifications",
          "Custom fabrication of wardrobes, kitchens, doors and architectural wall features",
          "Precision installation, alignment checks and final finish inspections",
        ],
      },
      {
        title: "Natural Stone Sourcing, Bookmatching & Installation",
        description:
          "Natural stone sourcing and specialist installation, with careful slab selection, bookmatching and precision finishing to achieve a consistent, refined appearance.",
        points: [
          "Natural stone selection, sourcing and slab quality inspections",
          "Dry-laying and bookmatching to achieve consistent vein alignment",
          "Precision cutting, edge finishing, polishing and on-site installation",
        ],
      },
      {
        title: "Smart Lighting & Home Automation Integration",
        description:
          "Seamless coordination of Lutron and Crestron automation systems, architectural recessed lighting, concealed coves and integrated climate controls.",
        points: [
          "Coordination of lighting layouts, fixtures and architectural lighting details",
          "Integration of compatible home automation and climate control systems",
          "Installation coordination, system configuration and operational testing",
        ],
      },
      {
        title: "Rigorous Snagging & White-Glove Handover Protocol",
        description:
          "Multi-stage quality inspections, final cleaning and formal handover documentation, including applicable warranties and equipment operation manuals.",
        points: [
          "Detailed snagging inspections and documented defect reports",
          "Final cleaning, installation checks and quality verification",
          "Handover documentation, equipment manuals and applicable warranty records",
        ],
      },
    ],
    materials: [
      {
        name: "Calacatta Oro & Statuario Marble",
        origin: "Carrara, Italy",
        description: "Honed bookmatched feature walls, monolithic kitchen islands, and seamless bathroom slabs with rich golden veining.",
      },
      {
        name: "Fumed European White Oak",
        origin: "Normandy, France",
        description: "Wide-plank architectural flooring and bespoke cabinetry with micro-bevelled edges and natural hardwax oil finish.",
      },
      {
        name: "Custom Brushed Champagne Brass",
        origin: "Milan, Italy",
        description: "Solid brass extrusions, transition thresholds, pocket door trims, and bespoke architectural metalwork.",
      },
    ],
    processSteps: [
      {
        number: "01",
        title: "Spatial Diagnostics & Feasibility Audit",
        description:
          "Laser 3D scanning of the shell, structural review, lifestyle briefing, and Dubai developer covenant assessment.",
        timing: "Weeks 1–3",
        milestone: "Laser 3D survey and preliminary filing with Dubai authorities",
        approvals: "Initial Emaar, Nakheel and Civil Defence clearance checks",
      },
      {
        number: "02",
        title: "Detailed Design Dossier & Material Board",
        description:
          "Photorealistic 8K virtual reality renders, fully coordinated MEP schemes, and physical stone/veneer sample sign-offs.",
        timing: "Weeks 4–7",
        milestone: "Virtual reality walkthrough and final material board",
        approvals: "Your sign-off on stone cuts, timber veneers and MEP schemes",
      },
      {
        number: "03",
        title: "Precision Fabrication & Site Execution",
        description:
          "Concurrent workshop manufacturing and site fit-out under continuous supervision of our dedicated project engineers.",
        timing: "Weeks 8–18",
        milestone: "Factory dry-fit, then precise assembly on site",
        approvals: "Interim Civil Defence site safety inspection",
      },
      {
        number: "04",
        title: "White-Glove Staging & Turnkey Key Handover",
        description:
          "Thorough snagging, acoustic balancing, Building Completion Certificate (BCC) clearance, and handover with full warranties.",
        timing: "Weeks 19–22",
        milestone: "Styling, acoustic tuning and key handover",
        approvals: "Building Completion Certificate and 10-year workshop warranty",
      },
    ],
    gallery: [
      {
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
        caption: "Monolithic travertine living pavilion with fumed oak acoustic ceilings on Palm Jumeirah.",
        alt: "Modern luxury living space in Dubai",
      },
      {
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791961970/pexels-dwi2793-34961443_bkwpcx.jpg",
        caption: "Bespoke show kitchen with Calacatta Oro stone island and integrated German appliances.",
        alt: "Contemporary designer kitchen",
      },
      {
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791961975/pexels-jonathanborba-9976128_iqwrsv.jpg",
        caption: "Master dressing suite featuring smoked glass wardrobes and warm bronze framing.",
        alt: "Luxury walk-in closet",
      },
    ],
    featuredProject: {
      title: "The Palm Jumeirah Signature Turnkey Villa",
      location: "Frond G, Palm Jumeirah, Dubai",
      area: "14,800 sq ft",
      scope: "Full Turnkey Shell-to-Handover Architecture, Joinery, MEP & Automation",
    },
  },
  {
    slug: "villa-apartment-renovations",
    id: "02",
    title: "Villa & Apartment Renovations",
    subtitle: "Transforming mature villas and luxury apartments into contemporary, light-filled architectural sanctuaries.",
    eyebrow: "STRUCTURAL MODERNIZATION · RESIDENTIAL TRANSFORMATION",
    heroImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961970/pexels-dwi2793-34961443_bkwpcx.jpg",
    leadParagraph:
      "Specialising in high-value turnkey renovations across Dubai's prestigious communities, including Palm Jumeirah, Emirates Hills, Downtown Dubai, Dubai Marina and Jumeirah Golf Estates.",
    description:
      "We reconfigure existing floor plans, undertake approved structural modifications, transform bathrooms and kitchens, install floor-to-ceiling slimline glazing and upgrade mechanical, electrical and plumbing (MEP) systems to create more functional, refined and contemporary homes.",
    features: [
      "Single-Contract Turnkey Renovations",
      "Bespoke In-House Joinery",
      "Developer & Authority Approval Coordination",
    ],
    deliverablesSummary:
      "From initial property assessment and design planning to material selection, structural modifications, bathroom and kitchen upgrades, MEP improvements and final finishing, every stage is carefully coordinated. Drawings, material specifications, project responsibilities and key milestones are agreed upon before work begins to ensure clarity throughout the renovation.",
    stats: [
      { label: "Communities", value: "Palm, Hills, Downtown, Marina" },
      { label: "Structural Works", value: "Certified Steel & Masonry" },
      { label: "Property Equity", value: "Up to 35% Uplift" },
      { label: "Dust & Noise Control", value: "Class A Isolation" },
    ],
    deliverables: [
      {
        title: "Structural Partition Removal & Open-Concept Engineering",
        description:
          "Reconfiguring dated layouts through carefully engineered structural modifications, including steel portal frames where required, to create more expansive, connected living and dining areas.",
        points: [
          "Structural assessment and engineering design for proposed modifications",
          "Coordination of required developer and authority approvals",
          "Installation of approved steel supports and associated masonry works",
        ],
      },
      {
        title: "Complete Master Bathroom & Spa Overhauls",
        description:
          "Transforming master bathrooms into refined private retreats with floor-to-ceiling bookmatched marble, walk-in rain showers, freestanding sculptural bathtubs and premium concealed fittings.",
        points: [
          "Bathroom layout planning, waterproofing and plumbing upgrades",
          "Installation of natural stone, premium sanitaryware and shower systems",
          "Custom vanity fabrication, lighting integration and finishing",
        ],
      },
      {
        title: "German Show Kitchen & Preparation Kitchen Rebuild",
        description:
          "Creating functional, design-led kitchens with bespoke cabinetry, soft-close Blum hardware, integrated appliances from brands such as Sub-Zero and Miele, and seamless porcelain worktops.",
        points: [
          "Custom kitchen layouts, cabinetry design and storage planning",
          "Integration of appliances, hardware and kitchen equipment",
          "Worktop installation, plumbing, electrical and lighting coordination",
        ],
      },
      {
        title: "Expansive Slimline Glazing & Window Upgrades",
        description:
          "Upgrading existing windows and openings with thermally broken, minimal-profile glazing systems and motorised sliding solutions to maximise natural light and improve indoor comfort.",
        points: [
          "Assessment of existing window openings and glazing requirements",
          "Selection and installation of suitable slimline glazing systems",
          "Coordination of structural interfaces, weather sealing and finishing",
        ],
      },
      {
        title: "Flooring Replacement & Architectural Microtopping",
        description:
          "Elevating interior spaces with large-format Italian porcelain, chevron hardwood parquetry and seamless microcement finishes, selected to complement the property's overall design.",
        points: [
          "Existing floor assessment and substrate preparation",
          "Installation of porcelain tiles, hardwood flooring and microcement finishes",
          "Grouting, surface finishing, sealing and final quality inspections",
        ],
      },
    ],
    materials: [
      {
        name: "Navona Roman Travertine",
        origin: "Tivoli, Italy",
        description: "Cross-cut, unfilled, and micro-honed for serene monolithic wall paneling and interior-to-terrace transitional flooring.",
      },
      {
        name: "Smoked American Walnut",
        origin: "Pennsylvania, USA",
        description: "Rich chocolate grain specified for custom library paneling, wine cellars, and executive master bed headboards.",
      },
      {
        name: "Fluted Cast Glass & Bronze Framing",
        origin: "Murano, Italy",
        description: "Acoustically insulated architectural reeded glass screens providing privacy while filtering ambient natural light.",
      },
    ],
    processSteps: [
      {
        number: "01",
        title: "Laser Scanning & Structural Survey",
        description:
          "3D laser scanning of existing spaces, assessment of MEP riser locations, structural condition reviews and evaluation of applicable developer structural guidelines.",
        timing: "Weeks 1–3",
        milestone: "Completed 3D laser survey, initial structural assessment and preliminary renovation feasibility review.",
        approvals: "Initial assessment of applicable Emaar, Nakheel and relevant authority requirements, including Civil Defence where required.",
      },
      {
        number: "02",
        title: "Space Optimization & Reconfiguration Scheme",
        description:
          "Designing the modernized floor plan, expanded sightlines, new ceiling coves, and 3D visual walkthroughs.",
        timing: "Weeks 4–7",
        milestone: "Approved spatial reconfiguration schemes, photorealistic 3D design approvals, and material board sign-off.",
        approvals: "Developer NOC package submission and preliminary municipality clearance coordination.",
      },
      {
        number: "03",
        title: "Controlled Demolition & Structural Reinforcement",
        description:
          "Carefully managed strip-out works with protective dust barriers, noise-control measures and responsible waste disposal, alongside approved structural reinforcement and steel portal frame installations where required.",
        timing: "Weeks 8–18",
        milestone: "Completion of demolition, structural reinforcement and key site preparation works, followed by inspections before reconstruction.",
        approvals: "Coordination of applicable interim site inspections and required developer or authority clearances, including Civil Defence inspections where applicable.",
      },
      {
        number: "04",
        title: "Refined Rebuild & Turnkey Commissioning",
        description:
          "Precision joinery installation, natural stone finishing, MEP system testing and recommissioning, final interior finishing and coordination of applicable completion clearances.",
        timing: "Weeks 19–22",
        milestone: "Final styling, system commissioning, snagging inspections and formal key handover.",
        approvals: "Applicable final inspections and Building Completion Certificate (BCC), subject to relevant authority requirements.",
      },
    ],
    gallery: [
      {
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791961970/pexels-dwi2793-34961443_bkwpcx.jpg",
        caption: "Transformed living room in Emirates Hills with double-height travertine feature chimney breast.",
        alt: "Renovated luxury villa living area",
      },
      {
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
        caption: "Open-plan kitchen and dining conversion with concealed butler pantry access.",
        alt: "Open-plan kitchen renovation in Dubai",
      },
      {
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791961973/pexels-rashed-hossain-1520582336-38033547_tdf40v.jpg",
        caption: "Master bathroom overhaul with freestanding stone tub overlooking Dubai Marina skyline.",
        alt: "Renovated luxury bathroom",
      },
    ],
    featuredProject: {
      title: "The Downtown Sky Penthouse Reimagining",
      location: "The Address Sky View, Downtown Dubai",
      area: "8,600 sq ft Duplex",
      scope: "Total Gut Renovation, Structural Wall Removal & Bespoke Joinery Fit-Out",
    },
  },
  {
    slug: "office-commercial-interiors",
    id: "03",
    title: "Office & Commercial Interiors",
    subtitle: "A commercial interior is an instrument of prestige and productivity, supporting business performance and brand perception.",
    eyebrow: "CORPORATE EXCELLENCE · HIGH-IMPACT SPACES",
    heroImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961973/pexels-rashed-hossain-1520582336-38033547_tdf40v.jpg",
    leadParagraph:
      "A commercial interior is an instrument of prestige and productivity.",
    description:
      "We balance acoustic comfort, ergonomic functionality and distinctive corporate identity to create professional environments that support both business performance and brand perception.",
    features: [
      "Executive Boardrooms & Telepresence Suites",
      "High-Performance Acoustic Glazing",
      "Commercial MEP & Precision Climate Distribution",
    ],
    deliverablesSummary:
      "From initial space planning and design development to technical drawings, material specifications, bespoke joinery, MEP coordination and final finishing, every stage is carefully managed. Project deliverables, material selections, responsibilities and key milestones are agreed upon before execution to ensure clarity and coordination throughout the project.",
    stats: [
      { label: "Acoustic Rating", value: "STC 55+ Executive" },
      { label: "Free Zones Covered", value: "DIFC, DMCC, DDA, Tecom" },
      { label: "AV Integration", value: "Concealed 4K Biamp" },
      { label: "Delivery Speed", value: "Fast-Track Protocol" },
    ],
    deliverables: [
      {
        title: "Executive Boardrooms & Telepresence Suites",
        description:
          "Monolithic boardroom tables with concealed pop-up connectivity, integrated telepresence systems, acoustic ceiling treatments and motorised privacy smart glass.",
        points: [
          "Custom boardroom layouts, furniture design and technical drawings",
          "Integration of AV systems, concealed connectivity and video conferencing technology",
          "Acoustic treatments, lighting coordination and smart glass installation",
        ],
      },
      {
        title: "High-Performance Acoustic Glazed Partitions",
        description:
          "Double-glazed acoustic partition systems with magnetic acoustic drop seals and custom black anodised or brass-finished profiles, designed to provide privacy while maintaining a refined workplace aesthetic.",
        points: [
          "Acoustic partition planning, technical detailing and system specifications",
          "Supply and installation of double-glazed partition systems and acoustic seals",
          "Custom profile finishes, door integration and acoustic performance checks",
        ],
      },
      {
        title: "Private Executive Suites & Principal Offices",
        description:
          "Tailored leather-wrapped credenzas, bespoke executive furniture, integrated private en-suite facilities, secure document storage and personalised client reception lounges.",
        points: [
          "Executive office space planning and bespoke furniture design",
          "Custom credenzas, secure storage and integrated interior features",
          "Coordination of private facilities, lighting and premium interior finishes",
        ],
      },
      {
        title: "Welcoming Reception Lounges & Sculptural Desks",
        description:
          "Backlit onyx and travertine reception desks paired with architectural lighting, bespoke finishes and carefully planned waiting areas to create a distinctive first impression.",
        points: [
          "Reception layouts, visitor flow planning and custom desk design",
          "Natural stone selection, fabrication and precision installation",
          "Architectural lighting, feature walls and lounge finishing",
        ],
      },
      {
        title: "Commercial MEP & Precision Climate Distribution",
        description:
          "Zoned VRF air-conditioning systems, coordinated linear diffuser layouts and CO₂ monitoring solutions designed to support effective ventilation and indoor comfort across commercial spaces.",
        points: [
          "MEP planning and coordination for commercial interior layouts",
          "VRF air-conditioning, ventilation and linear diffuser integration",
          "CO₂ monitoring, system testing and commissioning coordination",
        ],
      },
    ],
    materials: [
      {
        name: "Micro-Perforated Acoustic Oak Veneer",
        origin: "Black Forest, Germany",
        description: "Seamless acoustic absorption panels concealed behind architectural timber surfaces for boardroom speech privacy.",
      },
      {
        name: "Nero Marquina & Gunmetal Steel",
        origin: "Bilbao, Spain",
        description: "Deep black marble with delicate white veining paired with powder-coated architectural steel framing.",
      },
      {
        name: "Architectural Woven Wool Carpet",
        origin: "Copenhagen, Denmark",
        description: "High-traffic executive carpet with integrated acoustic underlay and low-VOC emissions certification.",
      },
    ],
    processSteps: [
      {
        number: "01",
        title: "Workplace Planning & Acoustic Assessment",
        description:
          "Evaluating employee headcount, workspace density, departmental layouts, IT infrastructure requirements and acoustic performance criteria to establish the project's initial design and technical requirements.",
        timing: "Weeks 1–3",
        milestone: "Completed 3D laser survey, initial workplace assessment and preliminary project feasibility review.",
        approvals: "Initial assessment of applicable building management, developer and authority requirements, including Emaar, Nakheel and Dubai Civil Defence where relevant.",
      },
      {
        number: "02",
        title: "BIM Coordination & Design Approvals",
        description:
          "Developing coordinated 3D BIM models, reviewing MEP service clashes, preparing applicable fire and life-safety documentation, and compiling landlord, developer and authority submission packages.",
        timing: "Weeks 4–7",
        milestone: "Approved design layouts, coordinated BIM models, virtual reality walkthrough and final material board.",
        approvals: "Client sign-off on stone selections, timber veneers, material finishes, furniture specifications and coordinated MEP designs.",
      },
      {
        number: "03",
        title: "Off-Site Fabrication & On-Site Execution",
        description:
          "Coordinating off-site fabrication of bespoke wall panelling, reception desks, doors and custom joinery, alongside on-site preparation and installation to minimise disruption and reduce fit-out time at the premises.",
        timing: "Weeks 8–18",
        milestone: "Completion of factory dry-fit inspections, followed by coordinated delivery and precision installation on site.",
        approvals: "Coordination of applicable interim site inspections, building management requirements and developer or authority clearances, including Civil Defence requirements where applicable.",
      },
      {
        number: "04",
        title: "IT/AV Commissioning & Final Handover",
        description:
          "Conducting network and AV system testing, HVAC air balancing, final MEP checks, acoustic performance reviews and applicable authority inspections to prepare the commercial space for handover.",
        timing: "Weeks 19–22",
        milestone: "Final styling, system commissioning, acoustic checks, snagging completion and formal key handover.",
        approvals: "Applicable final inspection clearances and Building Completion Certificate (BCC), where required by the relevant authority. Handover of applicable system documentation and warranty records.",
      },
    ],
    gallery: [
      {
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791961973/pexels-rashed-hossain-1520582336-38033547_tdf40v.jpg",
        caption: "DIFC Sovereign Wealth Boardroom with acoustic ribbed oak walls and integrated videoconferencing.",
        alt: "Modern executive office in DIFC Dubai",
      },
      {
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
        caption: "Sculptural travertine reception desk with back-illuminated brass practice emblem.",
        alt: "Corporate reception interior",
      },
      {
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791961975/pexels-jonathanborba-9976128_iqwrsv.jpg",
        caption: "Executive lounge with bespoke library joinery and concealed pantry bar.",
        alt: "Private executive suite interior",
      },
    ],
    featuredProject: {
      title: "The DIFC Sovereign Wealth Family Suite",
      location: "Gate Precinct 4, DIFC, Dubai",
      area: "9,600 sq ft",
      scope: "Turnkey Interior Architecture, Acoustic Isolation & Executive Fit-Out",
    },
  },
  {
    slug: "mep-works",
    id: "04",
    title: "MEP Works — Electrical, HVAC & Plumbing",
    subtitle: "In Dubai's demanding climate, precision MEP engineering is essential to everyday comfort, acoustic tranquility, and energy performance.",
    eyebrow: "CRITICAL INFRASTRUCTURE · MECHANICAL ENGINEERING",
    heroImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961975/pexels-jonathanborba-9976128_iqwrsv.jpg",
    leadParagraph:
      "In Dubai's demanding desert climate, mechanical, electrical and plumbing (MEP) systems are essential to the comfort, functionality and performance of every prime residence and executive space.",
    description:
      "RichMan Interiors coordinates MEP design, engineering and installation, covering variable refrigerant flow (VRF) and chilled water air-conditioning systems, integrated linear ceiling slot diffusers, smart electrical distribution and acoustic wastewater drainage. Each system is carefully planned and coordinated to support reliable operation, energy efficiency and everyday comfort.",
    features: [
      "Single-Contract Turnkey Delivery",
      "Integrated MEP & Interior Coordination",
      "Developer & Authority Approval Coordination",
    ],
    deliverablesSummary:
      "From initial site assessments and MEP design development to engineering drawings, equipment specifications, HVAC and plumbing installations, electrical distribution and system commissioning, every stage is carefully coordinated. Technical requirements, equipment selections, project responsibilities and key milestones are established before execution to ensure clarity and reliable system integration throughout the project.",
    stats: [
      { label: "Acoustic Criteria", value: "Under NC-25 Whisper-Quiet" },
      { label: "Climate Systems", value: "VRF & Chilled Water" },
      { label: "DCD Compliance", value: "100% Certified Life Safety" },
      { label: "Air Balancing", value: "Certified TAB Verification" },
    ],
    deliverables: [
      {
        title: "Silent Chilled Water & VRF Air Conditioning",
        description:
          "Independently controlled thermal zones, variable-speed fan coil units, acoustically lined internal ductwork and programmable thermostats designed to maintain consistent indoor comfort.",
        points: [
          "HVAC load calculations, equipment selection and coordinated MEP drawings",
          "Installation of VRF or chilled water systems, fan coil units and associated ductwork",
          "System testing, air balancing and commissioning",
        ],
      },
      {
        title: "Architectural Frameless Linear Slot Diffusers",
        description:
          "Seamless integration of linear slot diffusers into gypsum ceiling details, creating a clean architectural finish while supporting controlled and evenly distributed airflow.",
        points: [
          "Linear diffuser layouts, airflow calculations and ceiling coordination",
          "Integration of concealed ductwork, plenum boxes and air distribution components",
          "Airflow testing, balancing and final diffuser adjustments",
        ],
      },
      {
        title: "High-Capacity Domestic Water & Constant Pressure Booster Systems",
        description:
          "Domestic water systems incorporating multi-stage filtration, UV treatment where specified, hot water circulation loops, pressure booster pumps and sound-insulated drainage solutions.",
        points: [
          "Domestic water supply layouts, pressure calculations and plumbing drawings",
          "Installation coordination for filtration, UV treatment, booster pumps and hot water circulation",
          "Drainage installation, pressure testing and plumbing system commissioning",
        ],
      },
      {
        title: "Low-Voltage Infrastructure & Smart Power Distribution",
        description:
          "Structured Cat6A data networks, surge-protected electrical distribution panels, DALI lighting control systems and integrated power infrastructure designed for modern residential and commercial environments.",
        points: [
          "Electrical load calculations, power distribution layouts and technical drawings",
          "Structured cabling, distribution panels and smart lighting control integration",
          "Electrical testing, safety checks and system commissioning",
        ],
      },
      {
        title: "Dubai Civil Defence (DCD) Fire & Life Safety Systems",
        description:
          "Integrated fire and life safety provisions, including concealed sprinkler heads, addressable smoke detection, fire dampers and emergency lighting, coordinated with applicable Dubai Civil Defence requirements.",
        points: [
          "Fire protection and life safety design coordination and technical documentation",
          "Installation coordination for sprinklers, detection systems, fire dampers and emergency lighting",
          "Inspection preparation, system testing and coordination of applicable DCD approvals",
        ],
      },
    ],
    materials: [
      {
        name: "Aerofoil Aluminum Linear Slot Diffusers",
        origin: "Dubai, UAE (Carrier / Trox Grade)",
        description: "Extruded architectural aluminum with matte black internal blades and powder-coated perimeter frames.",
      },
      {
        name: "Geberit Silent-PP Multi-Layer Acoustic Pipes",
        origin: "Rapperswil-Jona, Switzerland",
        description: "Mineral-reinforced polypropylene wastewater piping eliminating water transit noise through living room ceilings.",
      },
      {
        name: "Class A Low-Smoke Zero-Halogen Cables",
        origin: "Ducab, Dubai, UAE",
        description: "Fully certified copper electrical conductors engineered for maximum current-carrying capacity and life safety.",
      },
    ],
    processSteps: [
      {
        number: "01",
        title: "MEP Load Calculations & Engineering Design",
        description:
          "ASHRAE-based HVAC load calculations, solar heat gain analysis, electrical demand assessments and preparation of applicable DEWA load schedules to establish the project's initial engineering requirements.",
        timing: "Weeks 1–3",
        milestone: "Completed site survey, preliminary HVAC load calculations, electrical demand assessment and initial MEP design requirements.",
        approvals: "Initial assessment of applicable DEWA requirements, building management guidelines, developer requirements and relevant authority regulations, including Dubai Civil Defence where required.",
      },
      {
        number: "02",
        title: "Coordinated MEP Schematics & Authority Filings",
        description:
          "Fully coordinated composite MEP BIM modeling, clash-detection between ductwork and architectural ceiling details, and submission of electrical/water applications.",
        timing: "Weeks 4–7",
        milestone: "Coordinated MEP BIM drawings, equipment schedule approvals, and utility submission dossiers.",
        approvals: "DEWA electrical connection approvals, Civil Defence drawing approvals, and master developer clearances.",
      },
      {
        number: "03",
        title: "MEP Installation, Testing & Pressure Checks",
        description:
          "Executing mechanical, electrical and plumbing installations, including hydrostatic pressure testing of water supply lines, HVAC duct leakage testing and electrical insulation resistance testing using calibrated megohmmeters.",
        timing: "Weeks 8–18",
        milestone: "Completion of major MEP installations, plumbing pressure tests, duct leakage inspections and electrical insulation resistance testing.",
        approvals: "Coordination of applicable installation inspections, building management requirements and developer or authority clearances, including Civil Defence inspections where required.",
      },
      {
        number: "04",
        title: "MEP System Commissioning, Testing & TAB",
        description:
          "Carrying out final HVAC air balancing across supply and return diffusers, verifying chilled water system performance through delta-T measurements, and coordinating the testing and commissioning of applicable fire and life safety systems.",
        timing: "Weeks 19–22",
        milestone: "Completed HVAC testing, adjusting and balancing (TAB), MEP system commissioning, final performance checks and handover of system documentation.",
        approvals: "Coordination of applicable final inspections and Dubai Civil Defence clearances where required, along with the Building Completion Certificate (BCC) process, subject to the relevant authority requirements.",
      },
    ],
    gallery: [
      {
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791961975/pexels-jonathanborba-9976128_iqwrsv.jpg",
        caption: "Concealed linear slot diffusers integrated seamlessly into coffered architectural ceiling in Emirates Hills.",
        alt: "Architectural ceiling with linear AC diffuser",
      },
      {
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
        caption: "Smart low-voltage lighting control panel with centralized DALI drivers and clean wiring harnesses.",
        alt: "MEP electrical smart installation",
      },
      {
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791961970/pexels-dwi2793-34961443_bkwpcx.jpg",
        caption: "Chilled water plant and acoustic booster pump station serving a private Palm Jumeirah estate.",
        alt: "Modern residential mechanical plant room",
      },
    ],
    featuredProject: {
      title: "The Emirates Hills Climate & Infrastructure Overhaul",
      location: "Sector L, Emirates Hills, Dubai",
      area: "16,200 sq ft",
      scope: "Total MEP Replacement, Silent Chilled Water HVAC & Smart Automation",
    },
  },
  {
    slug: "authority-approval-coordination",
    id: "05",
    title: "Authority Approval Coordination",
    subtitle: "From developer NOCs to municipality and Civil Defence approvals, we coordinate every stage to keep your project compliant and moving forward.",
    eyebrow: "STATUTORY EXPEDITING · FULL REGULATORY COMPLIANCE",
    heroImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
    leadParagraph:
      "Regulatory approvals are a critical part of every successful interior project. Delays in permits and compliance documentation can affect project timelines and construction progress. Our authority approval coordination team manages the documentation, submission processes and regulatory requirements involved in securing the necessary permissions.",
    description:
      "Navigating Dubai's regulatory landscape requires technical expertise, accurate documentation and careful coordination with relevant authorities and property developers. RichMan Interiors manages the approval coordination process, including the preparation and submission of architectural and engineering drawings, structural documentation, developer NOC applications and applicable Civil Defence fire safety submissions. We also coordinate the required inspections and completion documentation to help move your project towards final handover.",
    features: [
      "End-to-End Approval Coordination",
      "Technical Drawings & Compliance Documentation",
      "Developer & Relevant Authority Submissions",
    ],
    deliverablesSummary:
      "From architectural and engineering drawings to developer NOC applications, authority submissions and final inspection documentation, every approval requirement is carefully coordinated. Submission documents, compliance requirements and approval milestones are established in advance to help minimise delays and keep your project progressing.",
    stats: [
      { label: "First-Pass Rate", value: "98.4% On First Submittal" },
      { label: "Authorities Covered", value: "DM, DCD, Trakhees, DDA" },
      { label: "Developers Managed", value: "Emaar, Nakheel, Meraas, DH" },
      { label: "BCC Success", value: "100% Handover Record" },
    ],
    deliverables: [
      {
        title: "Dubai Municipality (DM) Architectural & Structural Permits",
        description:
          "Preparation and coordination of architectural and structural documentation for applicable property modifications, including engineering calculations, technical drawings and required NOC submissions.",
        points: [
          "Architectural and structural drawings with supporting technical documentation",
          "Structural assessment reports and calculations where required",
          "Coordination of applicable developer NOCs and municipality submissions",
        ],
      },
      {
        title: "Dubai Civil Defence (DCD) Fire & Life Safety Approvals",
        description:
          "Coordination of fire and life safety documentation, including fire strategy drawings, means-of-egress layouts, sprinkler system calculations and applicable fire safety submissions.",
        points: [
          "Fire alarm, sprinkler and emergency exit layout documentation",
          "Fire safety calculations and technical compliance documents",
          "Coordination of DCD submissions, inspections and required revisions",
        ],
      },
      {
        title: "Master Developer NOC Clearances (Emaar, Nakheel, Meraas)",
        description:
          "Coordination of developer approvals for interior modifications, renovation works and fit-out activities in applicable residential and commercial developments.",
        points: [
          "Review of developer design guidelines and modification requirements",
          "Preparation of drawings and documents for NOC applications",
          "Coordination of contractor access permits and site work permissions",
        ],
      },
      {
        title: "Free Zone & Development Authority Fit-Out Permits",
        description:
          "Coordination of fit-out documentation and approval requirements for applicable developments and commercial properties within DIFC, DMCC, TECOM, DDA and JAFZA jurisdictions.",
        points: [
          "Preparation of fit-out drawings and technical submission packages",
          "Coordination of building management and relevant authority requirements",
          "Follow-up on permit applications, comments and required revisions",
        ],
      },
      {
        title: "Final Site Inspections & Completion Documentation",
        description:
          "Coordination of final inspections, technical documentation and applicable completion certificate requirements to support project closeout and handover.",
        points: [
          "Coordination of final site inspections and snagging rectification",
          "Preparation of as-built drawings, test reports and completion documents",
          "Follow-up on applicable completion certificate and handover requirements",
        ],
      },
    ],
    materials: [
      {
        name: "Certified Autodesk BIM Submittal Packages",
        origin: "Autodesk Revit / AutoCAD Certified",
        description: "Standardized 3D architectural, structural, and MEP models prepared to official Dubai Building Code (DBC) specifications.",
      },
      {
        name: "DCD-Approved Fire-Rated Assembly Certifications",
        origin: "Civil Defence Material Approval Lab",
        description: "Official test certificates for fire-rated doors, partition drywall assemblies, and intumescent structural coatings.",
      },
      {
        name: "Chartered Structural Engineering Affidavits",
        origin: "Dubai Municipality Registered Consultants",
        description: "Formal engineering stamps and beam calculation dossiers required for structural wall demolitions and staircase cuts.",
      },
    ],
    processSteps: [
      {
        number: "01",
        title: "Regulatory Assessment & Developer Requirements Review",
        description:
          "Initial evaluation of property jurisdiction, developer master guidelines, and applicable municipality or free-zone modification restrictions.",
        timing: "Weeks 1–3",
        milestone: "Completed compliance audit, property constraint report, and authority submission roadmap.",
        approvals: "Landlord initial consent and property management registration.",
      },
      {
        number: "02",
        title: "Drawing Package Preparation & Code Alignment",
        description:
          "Preparation and coordination of architectural, MEP and structural drawing packages in line with applicable Dubai authority and developer submission requirements.",
        timing: "Weeks 4–7",
        milestone: "Completed technical drawing package, compliance review and submission-ready documentation.",
        approvals: "Client review of proposed layouts and technical drawings, followed by confirmation to proceed with relevant authority submissions.",
      },
      {
        number: "03",
        title: "Authority Submissions & Application Follow-Up",
        description:
          "Submission of architectural, structural and MEP documentation through the relevant authority and developer portals, with follow-up on technical comments, clarification requests and required revisions.",
        timing: "Weeks 8–18",
        milestone: "Confirmation of application submissions, tracking of review status and resolution of authority comments.",
        approvals: "Responses to technical observations and coordination of revised drawings or supporting documents required for approval.",
      },
      {
        number: "04",
        title: "Final Site Inspections & Completion Certification",
        description:
          "Coordinating final authority inspections, addressing compliance observations and managing the documentation required for project completion and handover.",
        timing: "Weeks 19–22",
        milestone: "Completion of required site inspections, closure of outstanding observations and submission of final compliance documentation.",
        approvals: "Final inspection clearance and applicable Building Completion Certificate (BCC), subject to the relevant authority's requirements and approval.",
      },
    ],
    gallery: [
      {
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
        caption: "Bulgari Residence villa extension permit successfully cleared through Dubai Municipality and DCD.",
        alt: "Dubai luxury villa with architectural approval",
      },
      {
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791961970/pexels-dwi2793-34961443_bkwpcx.jpg",
        caption: "Palm Jumeirah structural permit allowing removal of 4 columns and introduction of a 16m clear span.",
        alt: "Structural interior renovation with engineer approval",
      },
      {
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791961973/pexels-rashed-hossain-1520582336-38033547_tdf40v.jpg",
        caption: "DIFC commercial fit-out license and final BCC obtained within record 14-day turnaround.",
        alt: "Commercial office space with DIFC approval",
      },
    ],
    featuredProject: {
      title: "The Jumeirah Bay Island Regulatory Expediting",
      location: "Jumeirah Bay Island (Bulgari Precinct), Dubai",
      area: "12,800 sq ft Residence",
      scope: "Expedited DM, DCD & Master Developer NOCs for Structural Additions",
    },
  },
  {
    slug: "project-management-execution",
    id: "06",
    title: "Project Management & Execution",
    subtitle: "From contractor coordination and site supervision to quality inspections, we oversee every stage to keep projects on schedule and within budget.",
    eyebrow: "ON-SITE SUPERINTENDENCE · UNCOMPROMISING PRECISION",
    heroImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961975/pexels-jonathanborba-9976128_iqwrsv.jpg",
    leadParagraph:
      "Exceptional design requires equally exceptional execution. We bring structure, precision and accountability to every stage of construction, ensuring that each detail is delivered in line with the approved design, specifications and project objectives.",
    description:
      "Our Project Management & Execution service transforms architectural plans into carefully coordinated, well-executed projects. From contractor coordination and site supervision to procurement tracking, budget monitoring and quality inspections, we oversee every stage of the construction process. Through structured planning, regular progress reporting and close attention to approved specifications, we help keep projects on schedule, within agreed budgets and aligned with the intended design standards.",
    features: [
      "Master Critical Path Scheduling",
      "Dedicated Full-Time On-Site Project Engineers",
      "12-Month Defects Liability & Post-Handover Aftercare",
    ],
    deliverablesSummary:
      "From initial project planning and detailed scheduling to procurement coordination, on-site supervision, budget monitoring and quality inspections, every stage is carefully managed. Project deliverables, responsibilities, material specifications and key milestones are established before execution to maintain clarity, accountability and control throughout the project.",
    stats: [
      { label: "On-Time Delivery", value: "99.2% Track Record" },
      { label: "Site Superintendence", value: "Full-Time Dedicated" },
      { label: "Reporting Cadence", value: "Daily Logs & Weekly PM Dossier" },
      { label: "Atelier Warranty", value: "12-Month Comprehensive Defects Liability" },
    ],
    deliverables: [
      {
        title: "Master Critical Path Scheduling (Primavera / MS Project)",
        description:
          "Detailed project scheduling that connects construction activities, procurement lead times, joinery production and site milestones to establish a coordinated execution plan.",
        points: [
          "Development of project schedules, activity sequences and key milestones",
          "Coordination of procurement, supplier deliveries and off-site fabrication timelines",
          "Regular schedule reviews, progress tracking and identification of potential delays",
        ],
      },
      {
        title: "Dedicated Full-Time On-Site Project Engineers",
        description:
          "On-site project supervision and technical coordination to ensure construction activities follow approved drawings, project specifications and applicable safety requirements.",
        points: [
          "Daily coordination of civil, MEP and specialist subcontractors",
          "Site supervision to monitor workmanship, construction progress and safety practices",
          "Technical clarification, drawing coordination and resolution of site execution issues",
        ],
      },
      {
        title: "Multi-Stage QA/QC, Material & Factory Inspection",
        description:
          "Structured quality control throughout procurement, fabrication and installation, with inspections to verify materials, workmanship and compliance with approved specifications.",
        points: [
          "Material inspections and verification against approved samples and specifications",
          "Factory joinery inspections and pre-installation dry-fit checks, where applicable",
          "Site quality inspections, dimensional checks and documentation of defects for rectification",
        ],
      },
      {
        title: "Transparent Cost Engineering & Budget Governance",
        description:
          "Proactive cost monitoring and financial coordination to maintain visibility over project expenditure, approved variations and procurement commitments.",
        points: [
          "Preparation and monitoring of project budgets and cost breakdowns",
          "Review and documentation of variation orders and additional work costs",
          "Procurement cost tracking, payment milestone monitoring and budget reporting",
        ],
      },
      {
        title: "12-Month Defects Liability & Post-Handover Aftercare",
        description:
          "Post-completion support to address reported defects and coordinate maintenance requirements in accordance with the agreed project contract and warranty terms.",
        points: [
          "Coordination of defects inspections and rectification during the applicable liability period",
          "Follow-up on reported maintenance issues and post-handover service requests",
          "Guidance on system operation, maintenance requirements and relevant warranty documentation",
        ],
      },
    ],
    materials: [
      {
        name: "Leica Geosystems 3D Laser Measurement Scanners",
        origin: "Heerbrugg, Switzerland",
        description: "Millimeter-precision laser scanning verifying levelness, plumbness, and spatial tolerances throughout construction.",
      },
      {
        name: "Heavy-Duty Polyethylene & Timber Floor Protection",
        origin: "Industrial Spec, Germany",
        description: "Multi-layer shock-absorbing surface protection safeguarding installed marble and timber floors from foot traffic.",
      },
      {
        name: "Cloud-Based Digital QA/QC & Snagging Systems",
        origin: "Enterprise Construction Tech",
        description: "Real-time photo-documented defect tracking ensuring zero items remain open prior to client walkthrough.",
      },
    ],
    processSteps: [
      {
        number: "01",
        title: "Master Project Planning & Resource Allocation",
        description:
          "Establishing the project execution plan through critical path scheduling, workforce allocation, procurement planning and cash-flow forecasting. Key activities, responsibilities and delivery milestones are defined to provide a clear roadmap for project execution.",
        timing: "Weeks 1–3",
        milestone: "Completion of the initial site assessment, project scope definition, baseline schedule and resource allocation plan.",
        approvals: "Initial review of applicable developer guidelines, project documentation requirements and relevant authority approval procedures.",
      },
      {
        number: "02",
        title: "Procurement Tracking & Factory Quality Inspections",
        description:
          "Coordinating material procurement, supplier deliveries and factory inspections to verify that selected materials, finishes and custom joinery meet the approved project specifications before dispatch to site.",
        timing: "Weeks 4–7",
        milestone: "Completion of material sample approvals, procurement schedules and factory quality inspections before site dispatch.",
        approvals: "Client sign-off on stone selections, timber veneers, material samples, finish specifications and relevant MEP equipment selections.",
      },
      {
        number: "03",
        title: "On-Site Project Supervision & Progress Monitoring",
        description:
          "Managing daily site activities through trade coordination, MEP installation inspections, safety monitoring and regular photographic progress reporting. Workmanship, construction quality and execution milestones are monitored against approved drawings and project specifications.",
        timing: "Weeks 8–18",
        milestone: "Completion of key construction and installation milestones, with progress inspections and documented quality checks.",
        approvals: "Coordination of required interim inspections, technical reviews and applicable developer or authority site clearances.",
      },
      {
        number: "04",
        title: "Final Quality Inspections, Snagging & Handover",
        description:
          "Conducting detailed pre-handover inspections, coordinating defect rectification, verifying completed installations and overseeing system commissioning. We also provide client orientation and organise the required handover documentation to support a smooth project closeout.",
        timing: "Weeks 19–22",
        milestone: "Completion of final snagging, defect rectification, system commissioning, client orientation and formal project handover.",
        approvals: "Coordination of applicable final inspections, completion documentation and Building Completion Certificate (BCC), subject to relevant authority requirements.",
      },
    ],
    gallery: [
      {
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791961975/pexels-jonathanborba-9976128_iqwrsv.jpg",
        caption: "On-site quality audit and laser leveling verification during bespoke joinery installation in Dubai Hills.",
        alt: "Project management and quality inspection in Dubai",
      },
      {
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
        caption: "Daily site superintendence ensuring seamless coordination between marble masons and MEP technicians.",
        alt: "Luxury interior construction execution",
      },
      {
        src: "https://res.cloudinary.com/dugtxybef/image/upload/v1791961970/pexels-dwi2793-34961443_bkwpcx.jpg",
        caption: "Final handover inspection and client walk-through of completed Palm Jumeirah estate.",
        alt: "Completed luxury interior handover",
      },
    ],
    featuredProject: {
      title: "The Dubai Hills Parkway Private Estate",
      location: "Dubai Hills Estate, Dubai",
      area: "22,000 sq ft Mansion",
      scope: "Turnkey Project Management, Site Superintendence & QA/QC Governance",
    },
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  const normalized = slug.toLowerCase();

  // Primary matches
  const direct = SERVICES.find((s) => s.slug === normalized);
  if (direct) return direct;

  // Aliases for Complete Turnkey Fit-Out
  if (
    normalized === "turnkey-fit-out" ||
    normalized === "turnkey-fitout" ||
    normalized === "interior-architecture" ||
    normalized === "turnkey" ||
    normalized === "fit-out" ||
    normalized === "fitout"
  ) {
    return SERVICES[0];
  }

  // Aliases for Villa & Apartment Renovations
  if (
    normalized === "villa-apartment-renovations" ||
    normalized === "luxury-renovation" ||
    normalized === "renovation" ||
    normalized === "renovations" ||
    normalized === "villa-renovation" ||
    normalized === "apartment-renovations"
  ) {
    return SERVICES[1];
  }

  // Aliases for Office & Commercial Interiors
  if (
    normalized === "office-commercial-interiors" ||
    normalized === "commercial-fit-out" ||
    normalized === "commercial-interiors" ||
    normalized === "commercial" ||
    normalized === "office" ||
    normalized === "office-fit-out"
  ) {
    return SERVICES[2];
  }

  // Aliases for MEP Works — Electrical, HVAC & Plumbing
  if (
    normalized === "mep-works" ||
    normalized === "mep" ||
    normalized === "mep-works-electrical-hvac-plumbing" ||
    normalized === "electrical-hvac-plumbing" ||
    normalized === "bespoke-joinery"
  ) {
    return SERVICES[3];
  }

  // Aliases for Authority Approval Coordination
  if (
    normalized === "authority-approval-coordination" ||
    normalized === "authority-approvals" ||
    normalized === "approvals" ||
    normalized === "coordination" ||
    normalized === "dubai-municipality-approvals"
  ) {
    return SERVICES[4];
  }

  // Aliases for Project Management & Execution
  if (
    normalized === "project-management-execution" ||
    normalized === "project-management" ||
    normalized === "execution" ||
    normalized === "superintendence"
  ) {
    return SERVICES[5];
  }

  return undefined;
}
