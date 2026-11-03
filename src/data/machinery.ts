export interface MachineryItem {
  slug: string;
  name: string;
  modelCode: string;
  category:
    | "Wicket Cylinder Mowers"
    | "Outfield & Surrounds Mowers"
    | "Scarifiers & Renovators"
    | "Rollers & Pitch Tools";
  badge: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  trentNote: string;
  idealFor: string[];
  keyFeatures: string[];
  specs: {
    label: string;
    value: string;
  }[];
  visualTheme?: {
    diagramType: string;
    accent: string;
    gradient: string;
  };
}

export const MACHINERY_CATEGORIES = [
  "All Equipment",
  "Wicket Cylinder Mowers",
  "Outfield & Surrounds Mowers",
  "Scarifiers & Renovators",
  "Rollers & Pitch Tools",
] as const;

export const MACHINERY_CATALOG: MachineryItem[] = [
  {
    slug: "mc22-pro-wicket-cylinder-mower",
    name: "MC22 Pro Wicket Cylinder Mower",
    modelCode: "TK-MC22-11B",
    category: "Wicket Cylinder Mowers",
    badge: "Flagship Wicket Finisher",
    image: "/images/machinery/cricket-wicket-mower.jpg",
    shortDescription:
      "Ultra-high-frequency 11-blade precision cylinder mower engineered specifically for 3mm–6mm Couchgrass cricket wicket tables.",
    fullDescription:
      "The benchmark cylinder mower for premier cricket squares. Featuring an 11-blade heavy-duty precision ground reel and micro-adjustable bedknife geometry, the MC22 delivers a surgical scissor-cut without bruising stolons or disturbing the compacted smectite clay crust beneath.",
    trentNote:
      "When preparing a First-Class or Premier club track, cutting geometry in the final 72 hours dictates surface moisture evaporation and seam grip. The MC22 gives ground staff tournament-grade clip rates without crown scalping.",
    idealFor: [
      "Turf Cricket Wicket Tables (3mm–6mm)",
      "Premier District & Grade Clubs",
      "Private School 1st XI Squares",
    ],
    keyFeatures: [
      "11-blade precision hardened carbon-steel cutting cylinder",
      "Micro-metric height-of-cut adjustment (2.0mm to 18mm)",
      "Twin-drive split rear roller with machined differential for zero-scuff turns on the square",
      "Balanced front grooved brass/steel roller option for upright leaf presentation",
      "Commercial power unit with low-vibration isolation mounts",
    ],
    specs: [
      { label: "Cutting Width", value: "560 mm (22 inch)" },
      { label: "Cylinder Reel", value: "11-Blade High-Clip Precision Reel" },
      { label: "Height of Cut", value: "2.0 mm – 18.0 mm (Micro-Index)" },
      { label: "Rear Roller", value: "Split Steel Differential Drive" },
      { label: "Application", value: "Cricket Wicket Blocks & Fine Turf" },
    ],
  },
  {
    slug: "mc26-wide-table-cylinder-mower",
    name: "MC26 Wide-Cut Table Cylinder Mower",
    modelCode: "TK-MC26-10B",
    category: "Wicket Cylinder Mowers",
    badge: "High-Efficiency Square Prep",
    image: "/images/machinery/cricket-wicket-mower.jpg",
    shortDescription:
      "26-inch wide-cut precision cylinder mower combining rapid multi-pitch square coverage with stadium-grade clip geometry.",
    fullDescription:
      "Designed for curators managing expansive 10-to-16 pitch center squares and multi-oval school precincts. The MC26 bridges the gap between fine wicket finishing and high-output daily square maintenance while preserving true surface levels.",
    trentNote:
      "For councils and school sports directors managing multiple turf squares with lean ground crews, the 26-inch chassis cuts mowing time by 25% while maintaining a crisp, clean cut across couch and rye transitions.",
    idealFor: [
      "Multi-Wicket Center Squares",
      "Private Colleges & University Ovals",
      "Regional Turf Associations",
    ],
    keyFeatures: [
      "10-blade heavy-duty turf reel engineered for dense Cynodon dactylon canopies",
      "Heavy-gauge steel chassis providing positive downward stability on undulating squares",
      "Quick-detach high-capacity grass catcher with optimised airflow",
      "Independent clutch controls for bail drive and cutting cylinder engagement",
      "Precision ground bottom blade configured for low-cut turf tolerances",
    ],
    specs: [
      { label: "Cutting Width", value: "660 mm (26 inch)" },
      { label: "Cylinder Reel", value: "10-Blade Fine Turf Cylinder" },
      { label: "Height of Cut", value: "3.0 mm – 25.0 mm" },
      { label: "Drive System", value: "Heavy-Duty Chain & Gear Transmission" },
      { label: "Application", value: "Center Squares & Practice Nets" },
    ],
  },
  {
    slug: "gm30-outfield-boundary-reel-mower",
    name: "GM30 Outfield & Boundary Commercial Master",
    modelCode: "TK-GM30-8B",
    category: "Outfield & Surrounds Mowers",
    badge: "Outfield Striping & Pace",
    image: "/images/machinery/cricket-outfield-mower.jpg",
    shortDescription:
      "Heavy-duty 30-inch commercial cylinder mower built for fast, cushioned cricket outfields, practice precincts, and stadium surrounds.",
    fullDescription:
      "A fast, true outfield requires clean vertical leaf presentation and bold visual striping. The GM30 features an 8-blade commercial reel and heavy rear striping roller to manicure wicket surrounds, practice complexes, and premier outfields without tracking.",
    trentNote:
      "Transitioning the collar between the 22-yard clay square and the sandy-loam outfield is where many venues lose consistency. The GM30 handles 8mm–22mm heights effortlessly with zero tearing.",
    idealFor: [
      "Premier Cricket Outfields & Surrounds",
      "Turf Practice Net Run-Ups & Aprons",
      "Multi-Use Cricket Sporting Ovals",
    ],
    keyFeatures: [
      "8-blade hardened carbon steel cylinder for clean cutting at higher ground speeds",
      "30-inch wide swath with trailing seat roller option",
      "Heavy-wall rear drive roller delivering bold stadium-style light/dark striping",
      "Reinforced side plates and sealed bearings for rigorous summer conditions",
      "Ergonomic loop handle with isolated operator controls",
    ],
    specs: [
      { label: "Cutting Width", value: "760 mm (30 inch)" },
      { label: "Cylinder Reel", value: "8-Blade Commercial Outfield Reel" },
      { label: "Height of Cut", value: "6.0 mm – 32.0 mm" },
      { label: "Roller Config", value: "3-Piece Cast Differential Rear Roller" },
      { label: "Application", value: "Outfields, Surrounds & Run-Ups" },
    ],
  },
  {
    slug: "sc18-pro-turf-scarifier-verticutter",
    name: "SC18 Pro Turf Scarifier & Verticutter",
    modelCode: "TK-SC18-TCT",
    category: "Scarifiers & Renovators",
    badge: "Thatch & Stolon Control",
    image: "/images/machinery/cricket-turf-scarifier.jpg",
    shortDescription:
      "Tungsten-tipped vertical grooming and dethatching machine designed to eliminate spongy thatch layers and prevent pitch layering.",
    fullDescription:
      "Organic thatch accumulation is the enemy of pace and bounce—trapping surface moisture and creating horizontal rootzone layering. The SC18 Scarifier uses closely spaced tungsten-tipped blades to vertically thin stolons, clean out post-match debris, and prepare wicket blocks for topdressing.",
    trentNote:
      "If your pitch feels slow or 'two-paced' despite heavy rolling, organic thatch buildup at the clay-canopy interface is usually the culprit. Regular light grooming with the SC18 keeps the clay crust breathing and tightly bound.",
    idealFor: [
      "End-of-Season Wicket Block Renovations",
      "Mid-Summer Thatch & Stolon Thinning",
      "Multi-Sport Turf Transitions",
    ],
    keyFeatures: [
      "Tungsten-carbide tipped (TCT) vertical cutting reels for prolonged edge life in clay soils",
      "Infinitely variable depth micrometer control for light grooming or deep scarification",
      "Interchangeable reel cassette system for rapid workshop servicing",
      "High-velocity front throw into reinforced steel debris catcher",
      "Heavy-duty belt tensioning system built for high-load renovation passes",
    ],
    specs: [
      { label: "Working Width", value: "450 mm (18 inch)" },
      { label: "Blade Type", value: "Tungsten-Carbide Tipped (TCT)" },
      { label: "Blade Spacing", value: "15 mm Precision Interval" },
      { label: "Working Depth", value: "+5 mm Grooming to -15 mm Deep Scarify" },
      { label: "Application", value: "Thatch Removal & Surface Renovation" },
    ],
  },
  {
    slug: "wr-heavy-hydrostatic-pitch-roller",
    name: "WR Heavy Hydrostatic Pitch Compaction Roller",
    modelCode: "TK-WR-DUAL",
    category: "Rollers & Pitch Tools",
    badge: "Clay Compaction Engineering",
    image: "/images/machinery/cricket-pitch-roller.jpg",
    shortDescription:
      "Matched dual-drum static and ballasted steel wicket roller configured to your venue's exact clay smectite profile and moisture window.",
    fullDescription:
      "Compaction is not simply about maximum weight—rolling a wet profile with excessive tonnage causes subsurface shearing and root severing. We specify and supply custom-matched light grooming rollers and heavy consolidation rollers calibrated for authentic cricket clay profiles.",
    trentNote:
      "A bowler feels subsurface compaction in the first 3 overs. Matching roller drum diameter, ballast weight, and rolling speed to your clay's plastic limit is the single biggest differentiator in wicket preparation.",
    idealFor: [
      "Pre-Season Deep Clay Consolidation",
      "Match-Week Moisture Squeeze & Crust Sealing",
      "Drop-In & In-Situ Wicket Block Compaction",
    ],
    keyFeatures: [
      "Precision-machined seamless steel drums with beveled edges to eliminate crease ridging",
      "Configurable water/steel ballast chambers for staged weight progression",
      "Hydrostatic variable-speed drive for ultra-smooth directional changes on the crease",
      "Integrated stainless-steel scraper bars and cocoa-mat moisture distribution system",
      "Supplied with Trent Kelly's custom venue rolling & moisture schedule chart",
    ],
    specs: [
      { label: "Rolling Width", value: "900 mm – 1200 mm Custom Drum" },
      { label: "Operating Mass", value: "Configurable Staged Ballast (500kg – 2000kg+)" },
      { label: "Drive Type", value: "Hydrostatic Infinitely Variable Smooth-Shift" },
      { label: "Drum Edge", value: "CNC Beveled Anti-Ridge Profile" },
      { label: "Application", value: "Wicket Consolidation & Match Prep" },
    ],
  },
  {
    slug: "tk-pitch-diagnostic-clegg-hammer-suite",
    name: "Clegg Impact Hammer & Soil Diagnostic Suite",
    modelCode: "TK-LAB-22",
    category: "Rollers & Pitch Tools",
    badge: "Agronomic Field Lab",
    image: "/images/machinery/cricket-clegg-hammer.jpg",
    shortDescription:
      "Professional cricket pitch corers, Clegg impact hammer tester, TDR soil moisture probes, and laser crease-leveling tools.",
    fullDescription:
      "Move from guesswork to empirical soil physics. We equip clubs, schools, and municipal councils with the exact field diagnostic instruments used in professional pitch curation—allowing ground staff to measure volumetric moisture, surface hardness, and rootzone depth before every fixture.",
    trentNote:
      "Empirical data backs up curatorial intuition. When your staff can log moisture gradients at 25mm, 50mm, and 100mm depths alongside surface hardness, pitch preparation becomes repeatable week after week.",
    idealFor: [
      "Head Curators & Stadium Ground Crews",
      "Municipal Council Sports Field Auditors",
      "Private School Turf Departments",
    ],
    keyFeatures: [
      "Heavy-duty stainless steel undisturbed clay profile core sampler",
      "Dual-depth TDR volumetric soil moisture & temperature sensor integration",
      "Surface hardness (gravities) & Clegg Impact CIV benchmarking protocol",
      "Optical/laser sight levels for saddle and popping-crease plane verification",
      "Includes hands-on staff training session with Trent Kelly",
    ],
    specs: [
      { label: "Core Depth", value: "0 – 150 mm Undisturbed Clay Profile" },
      { label: "Moisture Sensing", value: "Dual-Depth 38mm & 75mm TDR Probe" },
      { label: "Impact Tester", value: "Standard 2.25kg / 0.5kg Clegg Impact Soil Tester" },
      { label: "Construction", value: "316 Marine-Grade Stainless & Anodised Alloy" },
      { label: "Application", value: "Pre-Match Testing & Seasonal Audits" },
    ],
  },
];
