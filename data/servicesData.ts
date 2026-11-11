export interface ServiceData {
  slug: string;
  id: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  heroImage: string;
  leadParagraph: string;
  description: string;
  stats: { label: string; value: string }[];
  deliverables: {
    title: string;
    description: string;
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
      "We eliminate the friction of juggling multiple subcontractors. From concept blueprints and custom joinery to stone bookmatching and white-glove handover, we deliver ready-to-inhabit luxury.",
    description:
      "Our Complete Turnkey Fit-Out practice provides absolute, single-source accountability for private residences, luxury penthouses, and bespoke commercial spaces in Dubai. We manage spatial reconfiguration, in-house millwork fabrication, Italian marble masonry, MEP coordination, statutory developer clearances, and final furnishing. No finger-pointing, no split responsibilities—just flawless architectural delivery.",
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
          "Full-spectrum architectural execution transforming bare concrete volumes into refined luxury environments with zero client coordination fatigue.",
      },
      {
        title: "Bespoke In-House Joinery & Architectural Millwork",
        description:
          "Custom walk-in dressing suites, concealed pivot doors, show kitchens, and fluted wall paneling manufactured in our Dubai facility.",
      },
      {
        title: "Natural Stone Sourcing, Bookmatching & Masonry",
        description:
          "Direct import from Italian and Greek quarries. Slabs are dry-laid, bookmatched, and diamond-honed prior to site installation.",
      },
      {
        title: "Smart Lighting & Home Automation Integration",
        description:
          "Seamless coordination of Lutron/Crestron automation, architectural recessed coves, and hidden climate sensors.",
      },
      {
        title: "Rigorous Snagging & White-Glove Handover Protocol",
        description:
          "Multi-tier quality inspections, deep cleaning, and formal handover dossier complete with all warranties and operation manuals.",
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
      },
      {
        number: "02",
        title: "Detailed Design Dossier & Material Board",
        description:
          "Photorealistic 8K virtual reality renders, fully coordinated MEP schemes, and physical stone/veneer sample sign-offs.",
      },
      {
        number: "03",
        title: "Precision Fabrication & Site Execution",
        description:
          "Concurrent workshop manufacturing and site fit-out under continuous supervision of our dedicated project engineers.",
      },
      {
        number: "04",
        title: "White-Glove Staging & Turnkey Key Handover",
        description:
          "Thorough snagging, acoustic balancing, Building Completion Certificate (BCC) clearance, and handover with full warranties.",
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
      "Renovation is not merely cosmetic renewal—it is the art of unlocking structural potential, expanding living spans, and modernizing mechanical lifelines.",
    description:
      "Specializing in high-value turnkey renovations across Dubai's most prestigious communities—including Palm Jumeirah, Emirates Hills, Downtown Dubai, Dubai Marina, and Jumeirah Golf Estates. We reconfigure outdated floor plans, remove non-structural and load-bearing masonry, overhaul bathrooms and kitchens, install floor-to-ceiling slimline glazing, and upgrade all MEP infrastructure to create expansive, timeless modern homes.",
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
          "Eliminating dated compartmentalization with certified steel portal frames to create expansive, seamless living and dining areas.",
      },
      {
        title: "Complete Master Bathroom & Spa Overhauls",
        description:
          "Floor-to-ceiling bookmatched marble slabs, walk-in rain showers, freestanding sculptural bathtubs, and concealed Dornbracht hardware.",
      },
      {
        title: "German Show Kitchen & Preparation Kitchen Rebuild",
        description:
          "Ergonomic custom cabinetry with soft-close Blum hardware, Sub-Zero & Miele integrated appliances, and seamless porcelain worktops.",
      },
      {
        title: "Expansive Slimline Glazing & Window Upgrades",
        description:
          "Replacing original frames with thermally broken, motorized minimal-profile sliding glass systems maximizing natural light.",
      },
      {
        title: "Flooring Replacement & Architectural Microtopping",
        description:
          "Seamless large-format Italian porcelain, chevron hardwood parquetry, and continuous microcement finishes.",
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
          "Non-destructive testing of existing slabs, MEP riser locations, and developer structural limits.",
      },
      {
        number: "02",
        title: "Space Optimization & Reconfiguration Scheme",
        description:
          "Designing the modernized floor plan, expanded sightlines, new ceiling coves, and 3D visual walkthroughs.",
      },
      {
        number: "03",
        title: "Controlled Demolition & Structural Reinforcement",
        description:
          "Acoustically isolated strip-out with certified dust barriers, waste disposal, and steel portal installations.",
      },
      {
        number: "04",
        title: "Refined Rebuild & Turnkey Commissioning",
        description:
          "Precision joinery fitting, stone installation, electrical/AC recommissioning, and Building Completion clearance.",
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
    subtitle: "Corporate headquarters, private family offices, and bespoke commercial spaces engineered for prestige and focus.",
    eyebrow: "CORPORATE EXCELLENCE · HIGH-IMPACT SPACES",
    heroImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961973/pexels-rashed-hossain-1520582336-38033547_tdf40v.jpg",
    leadParagraph:
      "A commercial interior is an instrument of prestige and productivity. We balance acoustic discretion, ergonomic excellence, and unmistakable corporate authority.",
    description:
      "From sovereign wealth offices in DIFC to multi-family investment suites in Business Bay and boutique flagship spaces in Downtown, our commercial interiors practice merges luxury atelier craftsmanship with commercial compliance. We create environments with STC-55+ acoustic isolation, concealed telepresence systems, executive lounges, private boardrooms, and fast-track delivery to prevent business downtime.",
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
          "Monolithic boardroom tables with concealed pop-up connectivity, acoustic baffle ceilings, and motorized privacy smart glass.",
      },
      {
        title: "High-Performance Acoustic Glazed Partitions",
        description:
          "Double-glazed acoustic partition systems with magnetic acoustic drop seals and custom black anodized or brass profiles.",
      },
      {
        title: "Private Executive Suites & Principal Offices",
        description:
          "Tailored leather-wrapped credenzas, concealed private restrooms, hidden document safes, and personalized client reception lounges.",
      },
      {
        title: "Welcoming Reception Lounges & Sculptural Desks",
        description:
          "Backlit onyx and travertine monolithic reception desks paired with architectural mood lighting creating powerful first impressions.",
      },
      {
        title: "Commercial MEP & Precision Climate Distribution",
        description:
          "Zoned VRF air conditioning, linear diffuser arrays, and fresh-air CO2 monitoring optimized for full occupancy comfort.",
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
        title: "Corporate Workflow & Acoustic Audit",
        description:
          "Evaluating headcount density, department hierarchies, IT infrastructure, and acoustic isolation criteria.",
      },
      {
        number: "02",
        title: "BIM Coordination & Authority Clearance",
        description:
          "Developing clash-free 3D MEP models, DCD fire evacuation plans, and landlord submission packages.",
      },
      {
        number: "03",
        title: "Off-Site Pre-Fabrication & Fast Assembly",
        description:
          "Manufacturing all wall paneling, reception desks, and doors in-house to minimize on-site commercial fit-out duration.",
      },
      {
        number: "04",
        title: "IT/AV Commissioning & BCC Handover",
        description:
          "Complete network stress-testing, air balancing, final DCD inspection, and official Building Completion certificate.",
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
    subtitle: "High-performance climate control, silent acoustic HVAC, precision plumbing, and intelligent electrical infrastructure.",
    eyebrow: "CRITICAL INFRASTRUCTURE · MECHANICAL ENGINEERING",
    heroImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961975/pexels-jonathanborba-9976128_iqwrsv.jpg",
    leadParagraph:
      "The true measure of luxury is invisible: silent ambient cooling without drafts, flawless water pressure, and zero hum from concealed electrical systems.",
    description:
      "In Dubai's demanding desert climate, mechanical, electrical, and plumbing systems are the vital lifelines of any prime residence or executive space. RichMan Interiors employs dedicated in-house MEP engineers who design, calculate, and install whisper-quiet variable refrigerant flow (VRF) and chilled water systems, frameless linear ceiling slot diffusers, smart power distribution, and acoustic wastewater drainage with zero tolerance for failure.",
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
          "Independent thermal zoning, variable-speed fan coil units, acoustic internal duct lining, and custom microprocessor thermostats.",
      },
      {
        title: "Architectural Frameless Linear Slot Diffusers",
        description:
          "Seamless integration into gypsum ceiling details, eliminating unsightly grills and providing draft-free laminar air distribution.",
      },
      {
        title: "High-Capacity Domestic Water & Constant Pressure Booster",
        description:
          "Central multi-stage water filtration, UV sterilization, instantaneous recirculating hot water loops, and sound-insulated drainage.",
      },
      {
        title: "Low-Voltage Infrastructure & Smart Power Distribution",
        description:
          "Structured Cat6A data networks, surge-protected master distribution panels, DALI lighting protocols, and clean uninterrupted power.",
      },
      {
        title: "Dubai Civil Defence (DCD) Fire & Life Safety Systems",
        description:
          "Concealed sprinkler heads, addressable smoke detection, fire dampers, and emergency lighting fully approved by DCD.",
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
        title: "Thermal Load & Electrical Demand Calculation",
        description:
          "ASHRAE-compliant heat load calculations, solar heat gain analysis, and DEWA load schedule preparation.",
      },
      {
        number: "02",
        title: "3D BIM Clash Detection with Joinery & Ceilings",
        description:
          "Full 3D modeling of all duct runs, pipe slopes, and cable trays to guarantee maximum finished ceiling heights.",
      },
      {
        number: "03",
        title: "Precision Mechanical Installation & Pressure Testing",
        description:
          "Hydrostatic pressure testing of plumbing at 10 bar, duct leakage testing, and electrical megger insulation testing.",
      },
      {
        number: "04",
        title: "Testing, Adjusting & Balancing (TAB) Sign-Off",
        description:
          "Calibrated air flow balancing across all diffusers, chiller delta-T verification, and DCD life safety commissioning.",
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
    subtitle: "Direct liaison and accelerated approvals across Dubai Municipality, Civil Defence, Emaar, Nakheel, and master developers.",
    eyebrow: "STATUTORY EXPEDITING · FULL REGULATORY COMPLIANCE",
    heroImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791982249/pexels-david-vinicius-562259225-28652353_ynv2xo.jpg",
    leadParagraph:
      "Permit delays can paralyze any high-end project. Our in-house regulatory division navigates UAE statutory codes with flawless speed and absolute certainty.",
    description:
      "Navigating Dubai's complex regulatory landscape requires deep technical competence and direct relationships with government engineers and developer review boards. RichMan Interiors manages the entire statutory journey: preparing compliant engineering drawings, filing structural and architectural submittals, securing developer NOCs, coordinating Civil Defence fire reviews, and obtaining the final Building Completion Certificate (BCC).",
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
          "Preparation and submission of full engineering dossiers, structural load calculations, and NOC processing for villa modifications.",
      },
      {
        title: "Dubai Civil Defence (DCD) Fire & Life Safety Approvals",
        description:
          "Fire strategy plans, egress calculations, sprinkler hydraulic calculations, and direct coordination with DCD inspecting officers.",
      },
      {
        title: "Master Developer NOC Clearances (Emaar, Nakheel, Meraas)",
        description:
          "Ensuring complete compliance with community deed covenants, exterior alterations, setback allowances, and contractor site permits.",
      },
      {
        title: "Free Zone Permitting (DIFC, DMCC, Tecom, DDA, JAFZA)",
        description:
          "Fast-track fit-out permits and security clearances for commercial suites, corporate towers, and high-security zones.",
      },
      {
        title: "Final Site Inspections & Completion Certificate (BCC)",
        description:
          "Managing on-site inspector visits, clearing snagging checklists, and securing official Building Completion Certificates for deposit returns.",
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
        title: "Regulatory Pre-Audit & Master Covenant Review",
        description:
          "Reviewing existing title deeds, as-built drawings, master developer guidelines, and structural feasibility before design begins.",
      },
      {
        number: "02",
        title: "Drawing Package Preparation & Code Alignment",
        description:
          "Formatting architectural, MEP, and structural packages strictly to Dubai Municipality and Civil Defence submittal guidelines.",
      },
      {
        number: "03",
        title: "Online Submittal & Direct Officer Follow-Up",
        description:
          "Submitting via DM, Trakhees, or developer portals with direct engineer follow-ups to resolve clarifications without delays.",
      },
      {
        number: "04",
        title: "Site Inspection Coordination & BCC Issuance",
        description:
          "Guiding authority inspectors on site, obtaining approval stamps, and releasing final completion documentation.",
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
    subtitle: "Dedicated on-site governance, milestone scheduling, procurement control, and zero-defect quality assurance.",
    eyebrow: "ON-SITE SUPERINTENDENCE · UNCOMPROMISING PRECISION",
    heroImage:
      "https://res.cloudinary.com/dugtxybef/image/upload/v1791961975/pexels-jonathanborba-9976128_iqwrsv.jpg",
    leadParagraph:
      "Exceptional design without rigorous execution is merely an illusion. We govern every millimeter of construction with relentless discipline.",
    description:
      "Our Project Management & Execution practice is the operational engine that transforms complex architectural visions into tangible reality. Led by veteran project directors and full-time on-site superintendents, we maintain continuous site governance, daily photographic milestone reporting, strict budget administration, supply chain verification, and exhaustive QA/QC audits. We guarantee delivery on time, on budget, and to bespoke standards.",
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
          "Granular activity sequencing linking procurement lead times, factory joinery production, and site milestones with zero slack.",
      },
      {
        title: "Dedicated Full-Time On-Site Project Engineers",
        description:
          "Experienced civil and MEP superintendents permanently stationed on-site enforcing design drawings and safety standards.",
      },
      {
        title: "Multi-Tier QA/QC Material & Dry-Fit Inspection",
        description:
          "Rigorous material testing, factory dry-fit sign-offs, and laser tolerance verification before materials are installed on site.",
      },
      {
        title: "Transparent Cost Engineering & Budget Governance",
        description:
          "Strict change-order controls, open-book material tracking, and milestone payment verifications aligned with real progress.",
      },
      {
        title: "12-Month Atelier Warranty & 24/7 Concierge Aftercare",
        description:
          "Post-handover rapid-response maintenance, seasonal AC calibration, and comprehensive defects liability protection.",
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
        title: "Master Timeline Baseline & Resource Allocation",
        description:
          "Establishing the critical path schedule, labor deployment, long-lead procurement milestones, and cash-flow projections.",
      },
      {
        number: "02",
        title: "Procurement Tracking & Factory Quality Checks",
        description:
          "Inspecting marble at the quarry, timber at the mill, and joinery in our workshop prior to packing and site dispatch.",
      },
      {
        number: "03",
        title: "Daily Site Superintending & Milestone Gateways",
        description:
          "Conducting daily trade coordination, MEP pressure inspections, safety briefings, and photographic client reports.",
      },
      {
        number: "04",
        title: "Exhaustive Pre-Handover Snagging & Orientation",
        description:
          "Internal 3-tier snagging protocol, full equipment commissioning, user training, and formal key handover ceremony.",
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
