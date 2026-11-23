export const products = [
  // --- FASHION & CLOTHING (1-10) ---
  {
    id: "prod-1",
    name: "Classic Denim Jacket",
    slug: "classic-denim-jacket",
    brand: "NovaStyle",
    category: "fashion",
    description: "Tailored vintage-wash denim jacket crafted from 100% organic heavyweight cotton. Features custom brass hardware, dual chest flap pockets, and a timeless relaxed silhouette suitable for all-season layering.",
    price: 2099,
    originalPrice: 2999,
    discount: 30,
    rating: 4.6,
    reviewCount: 1240,
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Indigo Blue", hex: "#2B4C7E" },
      { name: "Washed Black", hex: "#2E2E2E" },
      { name: "Light Vintage", hex: "#6E93B8" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 28,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    specifications: {
      "Material": "100% Organic Denim Cotton",
      "Fit": "Relaxed Tailored Fit",
      "Closure": "Branded Brass Shank Buttons",
      "Care": "Machine wash cold inside out"
    },
    highlights: [
      "Heavyweight 14oz ring-spun denim",
      "Reinforced contrast twin-needle stitching",
      "Interior concealed slip pocket",
      "Pre-shrunk vintage wash finish"
    ]
  },
  {
    id: "prod-2",
    name: "Chunky Knit Merino Sweater",
    slug: "chunky-knit-merino-sweater",
    brand: "NovaStyle",
    category: "fashion",
    description: "Luxurious ribbed crewneck sweater woven from ultra-fine Australian Merino wool. Offers lightweight breathable warmth, exceptional softness against bare skin, and refined drop shoulders.",
    price: 1299,
    originalPrice: 1899,
    discount: 31,
    rating: 4.9,
    reviewCount: 856,
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Warm Ivory", hex: "#F7F5F0" },
      { name: "Oatmeal", hex: "#D6C7B2" },
      { name: "Charcoal", hex: "#2A2A2A" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 19,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    specifications: {
      "Fabric": "100% Extrafine Merino Wool",
      "Gauge": "7-Gauge Fisherman Rib Knit",
      "Collar": "Double-layered ribbed crew neckline",
      "Origin": "Sustainably sourced"
    },
    highlights: [
      "Itch-free natural temperature regulation",
      "Naturally anti-odor and moisture-wicking",
      "Seamless engineered sleeve cuffs"
    ]
  },
  {
    id: "prod-3",
    name: "Tailored Linen Blend Blazer",
    slug: "tailored-linen-blend-blazer",
    brand: "LuxeCraft",
    category: "fashion",
    description: "An unstructured summer blazer in breathable flax linen and cotton. Designed with notched lapels, horn buttons, and patch pockets for elevated casual elegance.",
    price: 3499,
    originalPrice: 4999,
    discount: 30,
    rating: 4.7,
    reviewCount: 512,
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Sandstone", hex: "#D8C5A8" },
      { name: "Midnight Navy", hex: "#1C2436" }
    ],
    sizes: ["38", "40", "42", "44"],
    stock: 14,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    specifications: {
      "Material": "55% Linen, 45% Cotton",
      "Lining": "Butterfly viscose half-lining",
      "Vents": "Dual rear side vents"
    },
    highlights: [
      "Lightweight unstructured shoulder pads",
      "Interior ticket and passport pockets",
      "Resistant to heavy creasing"
    ]
  },
  {
    id: "prod-4",
    name: "Pleated Wide-Leg Trousers",
    slug: "pleated-wide-leg-trousers",
    brand: "NovaStyle",
    category: "fashion",
    description: "Contemporary high-waisted pleated trousers featuring a fluid drape, tailored waistband with side adjusters, and deep welt pockets.",
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    rating: 4.8,
    reviewCount: 420,
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Charcoal Gray", hex: "#3A3D40" },
      { name: "Cream White", hex: "#FAF8F5" }
    ],
    sizes: ["28", "30", "32", "34", "36"],
    stock: 35,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    specifications: {
      "Material": "Poly-Viscose Crepe Blend",
      "Rise": "High Rise (12 inches)",
      "Hem": "Blind hemmed with 1.5 inch let-out"
    },
    highlights: [
      "Double front pleats for flow and movement",
      "Hook-and-bar concealed zip fly",
      "Machine washable wrinkle-resistant weave"
    ]
  },
  {
    id: "prod-5",
    name: "Minimalist Trench Coat",
    slug: "minimalist-trench-coat",
    brand: "LuxeCraft",
    category: "fashion",
    description: "Water-repellent cotton gabardine trench coat with a clean storm flap, removable self-fabric tie belt, and storm collar latch.",
    price: 4999,
    originalPrice: 6999,
    discount: 28,
    rating: 4.9,
    reviewCount: 318,
    images: [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Classic Camel", hex: "#C19A6B" },
      { name: "Deep Olive", hex: "#4B5320" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 12,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    specifications: {
      "Shell": "100% Weatherproof Cotton Gabardine",
      "Lining": "Cupro twill silk-touch lining",
      "Length": "Mid-calf length"
    },
    highlights: [
      "Fluorocarbon-free Bionic Finish Eco water repellent",
      "Adjustable wrist cuff tabs",
      "Internal deep pocket"
    ]
  },
  {
    id: "prod-6",
    name: "Supima Cotton Heavyweight Tee",
    slug: "supima-cotton-heavyweight-tee",
    brand: "NovaStyle",
    category: "fashion",
    description: "The ultimate luxury basic t-shirt. Cut from 240 GSM combed long-staple Supima cotton with a bound ribbed collar that never loses shape.",
    price: 799,
    originalPrice: 1199,
    discount: 33,
    rating: 4.8,
    reviewCount: 1650,
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Optic White", hex: "#FFFFFF" },
      { name: "Pitch Black", hex: "#111111" },
      { name: "Champagne Dune", hex: "#D6C7B2" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 65,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    specifications: {
      "Fabric": "100% American Supima Cotton (240 GSM)",
      "Weave": "Dense single jersey",
      "Neckline": "1x1 ribbed bound collar"
    },
    highlights: [
      "Zero torquing or side seam twisting",
      "Silky soft handle that improves with washing",
      "Pre-shrunk organic yarn"
    ]
  },

  // --- ELECTRONICS & AUDIO (7-15) ---
  {
    id: "prod-7",
    name: "Wireless Studio Headphones",
    slug: "wireless-studio-headphones",
    brand: "SoundWave",
    category: "electronics",
    description: "Over-ear active noise cancelling headphones with custom 40mm bio-cellulose drivers, Hi-Res wireless audio certification, and plush memory foam earcups.",
    price: 2499,
    originalPrice: 3199,
    discount: 22,
    rating: 4.8,
    reviewCount: 2310,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Champagne Beige", hex: "#E8E2D8" },
      { name: "Matte Black", hex: "#1E1E1E" },
      { name: "Silver Frost", hex: "#D9DDE2" }
    ],
    sizes: ["One Size"],
    stock: 42,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    specifications: {
      "Drivers": "40mm Beryllium-coated dynamic drivers",
      "Battery Life": "40 hours with ANC on (USB-C Fast Charge)",
      "Connectivity": "Bluetooth 5.3 with LDAC, AAC, Multipoint",
      "Weight": "248 grams"
    },
    highlights: [
      "Hybrid ANC with 4 adaptive feed-forward microphones",
      "10-minute charge gives 5 hours playback",
      "Foldable magnesium swivel hinges",
      "Includes hard-shell magnetic carrying case"
    ]
  },
  {
    id: "prod-8",
    name: "Smart Watch Pro Titanium",
    slug: "smart-watch-pro-titanium",
    brand: "Chronos",
    category: "electronics",
    description: "Aerospace-grade titanium smartwatch featuring a 1.43-inch Sapphire AMOLED display, ECG heart health monitoring, dual-band GPS, and 7-day battery life.",
    price: 3499,
    originalPrice: 4699,
    discount: 25,
    rating: 4.7,
    reviewCount: 980,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Titanium Gray", hex: "#636972" },
      { name: "Gold Champagne", hex: "#C6A477" },
      { name: "Space Black", hex: "#1F2124" }
    ],
    sizes: ["42mm", "46mm"],
    stock: 24,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    specifications: {
      "Screen": "1.43\" Ultra HD AMOLED (1000 nits peak)",
      "Water Resistance": "5 ATM + IP68 (50m diving rated)",
      "Battery": "480mAh Li-Po (Up to 10 days standard use)",
      "Sensors": "Bio-optical sensor, SpO2, Temperature, Barometer"
    },
    highlights: [
      "Turn-by-turn dual frequency satellite tracking",
      "Always-On Display with 100+ custom watch faces",
      "Wireless fast charging dock included"
    ]
  },
  {
    id: "prod-9",
    name: "True Wireless Earbuds ANC",
    slug: "true-wireless-earbuds-anc",
    brand: "SoundWave",
    category: "electronics",
    description: "Featherlight in-ear buds with custom tuned graphene drivers, 35dB active noise cancelling, and spatial audio with dynamic head tracking.",
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    rating: 4.6,
    reviewCount: 780,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Pearl White", hex: "#F8F8F8" },
      { name: "Onyx Black", hex: "#181818" }
    ],
    sizes: ["One Size"],
    stock: 50,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    specifications: {
      "Driver": "11mm Liquid Silicone Rubber Drivers",
      "Playtime": "32 Hours with Case (8 Hours per charge)",
      "Codecs": "LHDC 5.0, AAC, SBC",
      "Waterproofing": "IP55 sweat & water resistant"
    },
    highlights: [
      "Custom EQ with 6-band parametric equalizer",
      "Low-latency 45ms gaming mode",
      "Touch controls for playback and volume"
    ]
  },
  {
    id: "prod-10",
    name: "Wireless Charging Pad Duo",
    slug: "wireless-charging-pad-duo",
    brand: "AuraTech",
    category: "electronics",
    description: "Anodized aluminum dual charging mat clad in Italian full-grain leather. Simultaneously delivers 15W MagSafe fast charging to smartphone and smartwatch.",
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    rating: 4.8,
    reviewCount: 340,
    images: [
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Espresso Leather", hex: "#3D2E24" },
      { name: "Ivory White", hex: "#F3EDE3" }
    ],
    sizes: ["One Size"],
    stock: 30,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    specifications: {
      "Input": "USB-C PD 30W (Adapter included)",
      "Output": "15W Phone + 5W Watch + 5W Buds",
      "Safety": "FOD foreign object detection & thermal control"
    },
    highlights: [
      "Qi2 certified magnetic alignment",
      "Weighted base prevents slipping on table",
      "Braided 1.8m nylon cable included"
    ]
  },

  // --- HOME & LIVING (11-18) ---
  {
    id: "prod-11",
    name: "Modern Minimalist Table Lamp",
    slug: "modern-minimalist-table-lamp",
    brand: "UrbanNest",
    category: "home-living",
    description: "Architectural accent table lamp crafted with a brushed brass stem and pleated Japanese washi-paper drum shade. Emits warm ambient 2700K illumination with stepless rotary dimming.",
    price: 899,
    originalPrice: 1299,
    discount: 30,
    rating: 4.8,
    reviewCount: 412,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Brushed Brass", hex: "#C6A477" },
      { name: "Matte Black", hex: "#1C1C1C" },
      { name: "Ceramic White", hex: "#F9F8F6" }
    ],
    sizes: ["Medium (35cm)", "Large (48cm)"],
    stock: 22,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    specifications: {
      "Dimensions": "H 38cm x W 22cm x D 22cm",
      "Bulb": "Integrated warm LED (50,000 hrs rating)",
      "Power": "Corded with woven cloth cable & brass dimmer",
      "Weight": "1.8 kg"
    },
    highlights: [
      "3-step touch touch or smooth rotary dimming",
      "Glare-free diffused warm ambient glow",
      "Weighted non-scratch felt padded base"
    ]
  },
  {
    id: "prod-12",
    name: "Handcrafted Ceramic Vase Set",
    slug: "handcrafted-ceramic-vase-set",
    brand: "UrbanNest",
    category: "home-living",
    description: "Trio of sculptural terracotta ceramic vases finished in speckled matte glaze. Perfect for dried pampas grass, fresh floral stems, or standalone bookshelf accents.",
    price: 1199,
    originalPrice: 1699,
    discount: 29,
    rating: 4.9,
    reviewCount: 310,
    images: [
      "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Sand & Terracotta", hex: "#B87556" },
      { name: "Stone White", hex: "#EBE7E1" }
    ],
    sizes: ["Set of 3"],
    stock: 18,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    specifications: {
      "Material": "Natural fired stoneware ceramic",
      "Sizes": "Large (24cm), Medium (18cm), Petite (12cm)",
      "Water Resistance": "100% watertight glazed interior"
    },
    highlights: [
      "Hand-thrown on traditional potter's wheel",
      "Tactile unglazed exterior texture",
      "Packed in reinforced eco-friendly molded foam"
    ]
  },
  {
    id: "prod-13",
    name: "Linen Throw Blanket with Fringe",
    slug: "linen-throw-blanket-with-fringe",
    brand: "UrbanNest",
    category: "home-living",
    description: "Heavy textured waffle-weave throw blanket spun from pure European washed flax. Breathable in summer and cozy in winter, finished with raw eyelash fringe.",
    price: 1599,
    originalPrice: 2199,
    discount: 27,
    rating: 4.7,
    reviewCount: 290,
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Warm Greige", hex: "#C7BEB1" },
      { name: "Forest Sage", hex: "#8A9A86" },
      { name: "Burnt Ochre", hex: "#C17947" }
    ],
    sizes: ["130 x 170 cm"],
    stock: 25,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    specifications: {
      "Fabric": "100% Certified European Flax Linen",
      "Weave": "Honey-comb 3D textured weave (380 GSM)",
      "Care": "Machine wash gentle, tumble dry low"
    },
    highlights: [
      "Softens with every successive wash",
      "Hypoallergenic and naturally anti-static",
      "Generously sized for sofa or queen bed"
    ]
  },

  // --- BEAUTY & PERSONAL CARE (19-24) ---
  {
    id: "prod-14",
    name: "Hydra-Glow Peptide Serum",
    slug: "hydra-glow-peptide-serum",
    brand: "PureGlow",
    category: "beauty",
    description: "Concentrated multi-peptide elixir with 5 molecular weights of hyaluronic acid, niacinamide, and Centella Asiatica. Promotes collagen synthesis and intense dewy radiance.",
    price: 999,
    originalPrice: 1499,
    discount: 33,
    rating: 4.9,
    reviewCount: 1420,
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597359-573516027a0c?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Clear Glass Dropper", hex: "#E9F2F4" }
    ],
    sizes: ["30 ml", "50 ml"],
    stock: 55,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    specifications: {
      "Volume": "30ml / 1.0 fl oz amber UV glass bottle",
      "Skin Type": "Suitable for all skin types, including sensitive",
      "Formulation": "Fragrance-free, paraben-free, cruelty-free"
    },
    highlights: [
      "Visible reduction in fine lines in 14 days",
      "Non-comedogenic water-gel consistency",
      "Dermatologically tested & certified vegan"
    ]
  },
  {
    id: "prod-15",
    name: "Botanical Eau de Parfum (Cedar & Bergamot)",
    slug: "botanical-eau-de-parfum",
    brand: "PureGlow",
    category: "beauty",
    description: "An artisanal genderless fragrance capturing sun-drenched Mediterranean citrus, smoky atlas cedarwood, pink peppercorn, and warm amber resin.",
    price: 2199,
    originalPrice: 2899,
    discount: 24,
    rating: 4.8,
    reviewCount: 380,
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Amber Flacon", hex: "#D49D6A" }
    ],
    sizes: ["50 ml", "100 ml"],
    stock: 20,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    specifications: {
      "Concentration": "22% Eau de Parfum (High Sillage)",
      "Top Notes": "Italian Bergamot, Cardamom, Petitgrain",
      "Heart Notes": "Violet Leaf, Frankincense, Jasmine",
      "Base Notes": "Atlas Cedar, Haitian Vetiver, Amber"
    },
    highlights: [
      "Sustainably harvested organic essential oils",
      "Heavy weighted magnetic metal cap",
      "Long-lasting 8+ hours skin longevity"
    ]
  },

  // --- FOOTWEAR & SHOES (25-30) ---
  {
    id: "prod-16",
    name: "CloudPace Minimalist Sneakers",
    slug: "cloudpace-minimalist-sneakers",
    brand: "Strider",
    category: "footwear",
    description: "Clean low-profile court sneakers hand-stitched from supple full-grain Italian Nappa leather. Features an ergonomic OrthoLite cushioned footbed and vulcanized rubber cupsole.",
    price: 1999,
    originalPrice: 2799,
    discount: 28,
    rating: 4.7,
    reviewCount: 1100,
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Chalk White", hex: "#F5F5F3" },
      { name: "Triple Black", hex: "#151515" },
      { name: "White & Gum", hex: "#D8A870" }
    ],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    stock: 32,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    specifications: {
      "Upper": "100% Full Grain Italian Calfskin",
      "Lining": "Breathable cowhide leather lining",
      "Sole": "Custom Margom-style Italian rubber sole"
    },
    highlights: [
      "Reinforced waxed organic cotton laces",
      "Subtle gold foil debossed heel branding",
      "Zero break-in period comfort"
    ]
  },
  {
    id: "prod-17",
    name: "Chelsea Leather Boots",
    slug: "chelsea-leather-boots",
    brand: "Strider",
    category: "footwear",
    description: "Heritage pull-on Chelsea boots built on Goodyear welt construction. Equipped with elasticated gore panels, dual pull tabs, and oil-resistant Commando rubber lug sole.",
    price: 3299,
    originalPrice: 4499,
    discount: 26,
    rating: 4.8,
    reviewCount: 430,
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Cognac Brown", hex: "#7E492B" },
      { name: "Classic Black", hex: "#1C1C1C" }
    ],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
    stock: 16,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    specifications: {
      "Construction": "360-degree Goodyear Welted",
      "Leather": "Pull-up oiled water-resistant cow leather",
      "Outsole": "Vibram-grade lug sole"
    },
    highlights: [
      "Fully re-craftable and resolable design",
      "Arch supporting cork footbed that molds to your feet",
      "Waterproof seam sealant"
    ]
  },

  // --- ACCESSORIES & BAGS (31-36) ---
  {
    id: "prod-18",
    name: "Minimalist Leather Chronograph",
    slug: "minimalist-leather-chronograph",
    brand: "Chronos",
    category: "accessories",
    description: "Bauhaus-inspired analog timepiece with surgical-grade 316L stainless steel case, anti-reflective sapphire crystal, Japanese Miyota quartz movement, and quick-release Tuscan leather strap.",
    price: 2499,
    originalPrice: 3499,
    discount: 28,
    rating: 4.9,
    reviewCount: 650,
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Silver & Tan", hex: "#C49A6C" },
      { name: "Rose Gold & Black", hex: "#B76E79" }
    ],
    sizes: ["40mm Case"],
    stock: 21,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    specifications: {
      "Case": "40mm Diameter, 7.5mm Ultra-slim Profile",
      "Glass": "Curved Domed Sapphire Crystal Glass",
      "Water Resistance": "5 ATM (50 Meters)"
    },
    highlights: [
      "Sub-dial seconds counter at 6 o'clock",
      "Interchangeable strap with tool-less pins",
      "2-year international manufacturer warranty"
    ]
  },
  {
    id: "prod-19",
    name: "Eco-Luxe Canvas Weekender Duffel",
    slug: "eco-luxe-canvas-weekender-duffel",
    brand: "LuxeCraft",
    category: "accessories",
    description: "Travel-ready 45L overnight duffel bag constructed from 20oz weatherproof waxed cotton canvas with vegetable-tanned leather handles, solid brass hardware, and a dedicated zippered shoe garage.",
    price: 2899,
    originalPrice: 3999,
    discount: 27,
    rating: 4.8,
    reviewCount: 520,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Olive Green", hex: "#556B2F" },
      { name: "Navy Blue", hex: "#1F2A44" },
      { name: "Desert Tan", hex: "#C2B280" }
    ],
    sizes: ["45 Litres"],
    stock: 27,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    specifications: {
      "Dimensions": "52cm L x 28cm W x 30cm H (Airline Carry-On Approved)",
      "Material": "20oz Heavy Duty Waxed Canvas",
      "Zippers": "YKK Excella two-way brass zippers"
    },
    highlights: [
      "Separate bottom ventilated shoe compartment",
      "Padded 16-inch laptop compartment",
      "Detachable padded shoulder strap with brass clips"
    ]
  },

  // --- SPORTS & FITNESS (37-43) ---
  {
    id: "prod-20",
    name: "Pro-Grip Natural Rubber Yoga Mat",
    slug: "pro-grip-natural-rubber-yoga-mat",
    brand: "ZenithFit",
    category: "sports-fitness",
    description: "High-density 5mm yoga mat crafted from sustainably harvested tree rubber and sweat-activated non-slip polyurethane top coat. Built with laser-etched alignment guides.",
    price: 1599,
    originalPrice: 2299,
    discount: 30,
    rating: 4.9,
    reviewCount: 680,
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Slate Sage", hex: "#7E8E7D" },
      { name: "Smoky Charcoal", hex: "#333333" }
    ],
    sizes: ["183cm x 68cm x 5mm"],
    stock: 38,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: true,
    specifications: {
      "Thickness": "5mm High Density Cushion",
      "Material": "Natural Biodegradable Tree Rubber",
      "Weight": "2.8 kg"
    },
    highlights: [
      "Maximum grip even in hot sweaty sessions",
      "Gentle joint protection for knees and wrists",
      "Includes premium woven carry harness"
    ]
  },
  {
    id: "prod-21",
    name: "Stainless Insulated Sport Flask",
    slug: "stainless-insulated-sport-flask",
    brand: "ZenithFit",
    category: "sports-fitness",
    description: "Double-wall vacuum-insulated 18/8 food grade stainless steel flask. Keeps beverages ice-cold for 24 hours or piping hot for 12 hours. Sweat-proof textured powder finish.",
    price: 799,
    originalPrice: 1199,
    discount: 33,
    rating: 4.8,
    reviewCount: 920,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Matte Olive", hex: "#4B5320" },
      { name: "Charcoal Black", hex: "#232323" },
      { name: "Arctic White", hex: "#F4F4F4" }
    ],
    sizes: ["750 ml", "1000 ml"],
    stock: 44,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    specifications: {
      "Capacity": "750ml / 25oz",
      "Material": "18/8 Pro-Grade Stainless Steel",
      "Lids": "Chug spout lid + loop carrying cap"
    },
    highlights: [
      "100% leak-proof silicone seal",
      "Zero flavor transfer or metallic aftertaste",
      "Fits standard gym bike bottle cages"
    ]
  },

  // --- KITCHEN & APPLIANCES (44-50) ---
  {
    id: "prod-22",
    name: "Artisan Pour-Over Espresso Maker",
    slug: "artisan-pour-over-espresso-maker",
    brand: "CulinaryPro",
    category: "kitchen-appliances",
    description: "Precision engineered stovetop moka espresso maker finished in matte heat-resistant powder coating with heat-insulated walnut wood handle and brass steam valve.",
    price: 1899,
    originalPrice: 2499,
    discount: 24,
    rating: 4.8,
    reviewCount: 540,
    images: [
      "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Matte Charcoal", hex: "#2A2A2A" },
      { name: "Ivory Cream", hex: "#F3EDE3" }
    ],
    sizes: ["3 Cups (150ml)", "6 Cups (300ml)"],
    stock: 19,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    specifications: {
      "Material": "Food-grade cast aluminum & solid walnut",
      "Stove Compatibility": "Gas, Electric, Ceramic hobs",
      "Extraction": "9-bar equivalent rich crema extraction"
    },
    highlights: [
      "Ergonomic stay-cool genuine wood handle",
      "Italian certified pressure safety release valve",
      "Produces rich velvety espresso in under 4 minutes"
    ]
  },
  {
    id: "prod-23",
    name: "Cast Iron Dutch Oven 5.5L",
    slug: "cast-iron-dutch-oven",
    brand: "CulinaryPro",
    category: "kitchen-appliances",
    description: "Enameled heavy-duty cast iron round Dutch oven designed for slow-cooking stews, artisanal sourdough bread baking, and tender braising. Features self-basting condensation lid nubs.",
    price: 3899,
    originalPrice: 5299,
    discount: 26,
    rating: 4.9,
    reviewCount: 380,
    images: [
      "https://images.unsplash.com/photo-1585837575652-267c041d77d4?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584990347449-a20c3a9f0295?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Champagne Cream", hex: "#EDE8DC" },
      { name: "Matte Black", hex: "#1C1C1C" },
      { name: "Burgundy Red", hex: "#6E1A24" }
    ],
    sizes: ["5.5 Litres (26cm)"],
    stock: 15,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    specifications: {
      "Capacity": "5.5 Litres / 5.8 Qt",
      "Heat Rating": "Oven safe up to 260°C (500°F)",
      "Interior": "Smooth non-reactive sand enamel finish"
    },
    highlights: [
      "Superior heat distribution and heat retention",
      "Solid stainless steel ergonomic lid knob",
      "Suitable for all cooktops including induction"
    ]
  },
  {
    id: "prod-24",
    name: "Electric Gooseneck Pour-Over Kettle",
    slug: "electric-gooseneck-pour-over-kettle",
    brand: "CulinaryPro",
    category: "kitchen-appliances",
    description: "Digital variable temperature electric kettle with balanced counter-balanced handle, 0.9L capacity, precise 1-degree temperature control, and 60-minute keep-warm mode.",
    price: 2799,
    originalPrice: 3699,
    discount: 24,
    rating: 4.9,
    reviewCount: 610,
    images: [
      "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520970014086-2208d157c9e2?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [
      { name: "Matte Black", hex: "#1D1D1D" },
      { name: "Brushed Steel", hex: "#C0C0C0" }
    ],
    sizes: ["900 ml"],
    stock: 26,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    specifications: {
      "Power": "1200W Strix ultra-fast boiling element",
      "Range": "40°C - 100°C (104°F - 212°F)",
      "Screen": "Hidden LED temperature display on base"
    },
    highlights: [
      "Precision curved spout for steady slow-pour flow",
      "Built-in brew stopwatch timer",
      "Auto shutoff with boil-dry protection"
    ]
  },
  // --- FASHION EXPANSION (25-29) ---
  {
    id: "prod-25",
    name: "Silk-Cotton Camp Collar Shirt",
    slug: "silk-cotton-camp-collar-shirt",
    brand: "NovaStyle",
    category: "fashion",
    description: "Elevated resort shirt crafted from a featherlight mulberry silk and Egyptian cotton blend with mother-of-pearl buttons.",
    price: 1599,
    originalPrice: 2299,
    discount: 30,
    rating: 4.7,
    reviewCount: 380,
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Sage Stripe", hex: "#7E8E7D" }, { name: "Ecru", hex: "#F3EDE3" }],
    sizes: ["S", "M", "L", "XL"],
    stock: 24,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: true,
    specifications: { "Fabric": "70% Cotton, 30% Mulberry Silk", "Cut": "Cuban Camp Collar Relaxed Boxy" },
    highlights: ["Breathable featherlight drape", "Natural mother-of-pearl buttons"]
  },
  {
    id: "prod-26",
    name: "Italian Wool Overcoat",
    slug: "italian-wool-overcoat",
    brand: "LuxeCraft",
    category: "fashion",
    description: "Architectural single-breasted topcoat woven from double-faced recycled Italian Melton wool.",
    price: 5499,
    originalPrice: 7999,
    discount: 31,
    rating: 4.9,
    reviewCount: 210,
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Charcoal Herringbone", hex: "#353839" }, { name: "Camel", hex: "#C19A6B" }],
    sizes: ["38", "40", "42", "44"],
    stock: 9,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: false,
    specifications: { "Weight": "650 GSM Heavy Italian Wool", "Lining": "Full Bemberg Cupro" },
    highlights: ["Deep welt pockets with fleece lining", "Internal horn button storm flap"]
  },
  {
    id: "prod-27",
    name: "Pleated Midi Slip Skirt",
    slug: "pleated-midi-slip-skirt",
    brand: "NovaStyle",
    category: "fashion",
    description: "Flowing micro-accordion pleated skirt cut on the bias in lustrous heavy satin with a concealed elastic waistband.",
    price: 1399,
    originalPrice: 1999,
    discount: 30,
    rating: 4.8,
    reviewCount: 410,
    images: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Champagne Gold", hex: "#C6A477" }, { name: "Midnight Black", hex: "#111111" }],
    sizes: ["XS", "S", "M", "L"],
    stock: 28,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    specifications: { "Material": "High-density Japanese Satin", "Length": "Mid-Calf 78cm" },
    highlights: ["Does not cling or generate static", "Concealed comfort waistband"]
  },
  {
    id: "prod-28",
    name: "Organic French Terry Hoodie",
    slug: "organic-french-terry-hoodie",
    brand: "NovaStyle",
    category: "fashion",
    description: "450 GSM ultra-heavyweight loopback fleece hoodie with a double-layered hood and kangaroo pouch pocket.",
    price: 1699,
    originalPrice: 2299,
    discount: 26,
    rating: 4.9,
    reviewCount: 890,
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Heather Gray", hex: "#9E9E9E" }, { name: "Washed Clay", hex: "#A8705C" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 45,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    specifications: { "Fabric": "100% GOTS Certified Organic Cotton", "Weight": "450 GSM" },
    highlights: ["Structured hood stands upright", "Pre-shrunk anti-pilling yarn"]
  },
  {
    id: "prod-29",
    name: "Relaxed Linen Drawstring Pants",
    slug: "relaxed-linen-drawstring-pants",
    brand: "NovaStyle",
    category: "fashion",
    description: "Easy-wearing pure linen trousers with elasticated drawstring waist and gentle taper at the ankle.",
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    rating: 4.7,
    reviewCount: 310,
    images: [
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Natural Flax", hex: "#D6C7B2" }, { name: "Deep Navy", hex: "#1C2436" }],
    sizes: ["S", "M", "L", "XL"],
    stock: 33,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    specifications: { "Fabric": "100% Normandy Flax Linen", "Fit": "Tapered Relaxed" },
    highlights: ["Breathable natural cooling", "Deep slash pockets"]
  },

  // --- ELECTRONICS EXPANSION (30-34) ---
  {
    id: "prod-30",
    name: "Portable Hi-Fi Bluetooth Speaker",
    slug: "portable-hi-fi-bluetooth-speaker",
    brand: "SoundWave",
    category: "electronics",
    description: "Compact 360-degree wireless speaker with dual passive radiators, anodized grille, and IP67 waterproof construction.",
    price: 2199,
    originalPrice: 2999,
    discount: 26,
    rating: 4.8,
    reviewCount: 740,
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Charcoal Black", hex: "#1D1D1D" }, { name: "Sand Gold", hex: "#C6A477" }],
    sizes: ["Standard"],
    stock: 37,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    specifications: { "Power": "25W RMS output", "Battery": "20 Hours playtime", "Water Resistance": "IP67 Submersible" },
    highlights: ["True Wireless Stereo pairing mode", "Punchy rich bass down to 45Hz"]
  },
  {
    id: "prod-31",
    name: "Ergonomic Mechanical Keyboard",
    slug: "ergonomic-mechanical-keyboard",
    brand: "AuraTech",
    category: "electronics",
    description: "75% low-profile wireless mechanical keyboard with CNC aluminum frame, hot-swappable tactile switches, and PBT keycaps.",
    price: 3299,
    originalPrice: 4299,
    discount: 23,
    rating: 4.9,
    reviewCount: 520,
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Space Gray", hex: "#4B4E53" }, { name: "Retro White", hex: "#EBE8E1" }],
    sizes: ["75% Layout"],
    stock: 18,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    specifications: { "Connectivity": "Bluetooth 5.1 / 2.4Ghz / USB-C", "Battery": "300 Hours with RGB off" },
    highlights: ["Acoustic silicone sound dampener", "Mac & Windows hotkey toggle"]
  },
  {
    id: "prod-32",
    name: "Precision Wireless Mouse",
    slug: "precision-wireless-mouse",
    brand: "AuraTech",
    category: "electronics",
    description: "Sculpted ergonomic productivity mouse with magspeed electromagnetic scrolling and 8000 DPI darkfield glass tracking sensor.",
    price: 1999,
    originalPrice: 2699,
    discount: 25,
    rating: 4.8,
    reviewCount: 410,
    images: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Graphite", hex: "#292929" }, { name: "Pale Gray", hex: "#E0E0E0" }],
    sizes: ["Standard"],
    stock: 29,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    specifications: { "Sensor": "8000 DPI Optical", "Battery": "70 Days on full USB-C charge" },
    highlights: ["Whisper-quiet acoustic switch dampening", "Pairs across 3 devices"]
  },
  {
    id: "prod-33",
    name: "Fast-Charging 65W GaN Charger",
    slug: "fast-charging-65w-gan-charger",
    brand: "AuraTech",
    category: "electronics",
    description: "Pocket-sized gallium nitride multi-port wall charger supporting Power Delivery 3.0, PPS, and dual USB-C + USB-A ports.",
    price: 1199,
    originalPrice: 1699,
    discount: 29,
    rating: 4.9,
    reviewCount: 880,
    images: [
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586105251261-72a756497a11?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Pure White", hex: "#FAFAFA" }, { name: "Matte Black", hex: "#1C1C1C" }],
    sizes: ["65W"],
    stock: 50,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    specifications: { "Technology": "GaN III Pro", "Ports": "2x USB-C (65W Max), 1x USB-A (30W)" },
    highlights: ["Powers laptops, tablets, and phones simultaneously", "50% smaller than standard chargers"]
  },
  {
    id: "prod-34",
    name: "Noise-Cancelling Conference Mic",
    slug: "noise-cancelling-conference-mic",
    brand: "SoundWave",
    category: "electronics",
    description: "Studio-grade USB desktop condenser microphone with cardioid polar pattern, zero-latency headphone monitoring, and tap-to-mute.",
    price: 2499,
    originalPrice: 3299,
    discount: 24,
    rating: 4.7,
    reviewCount: 320,
    images: [
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Matte Black", hex: "#1A1A1A" }],
    sizes: ["Standard"],
    stock: 22,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    specifications: { "Sample Rate": "192kHz / 24-bit", "Stand": "Cast iron vibration-damped base" },
    highlights: ["Plug and play without drivers", "Capacitive mute sensor with LED ring"]
  },

  // --- HOME & LIVING EXPANSION (35-38) ---
  {
    id: "prod-35",
    name: "Nordic Solid Oak Floating Shelf",
    slug: "nordic-solid-oak-floating-shelf",
    brand: "UrbanNest",
    category: "home-living",
    description: "Hand-planed FSC-certified European white oak floating wall ledge with invisible internal steel brackets and bevelled edge.",
    price: 1299,
    originalPrice: 1799,
    discount: 27,
    rating: 4.8,
    reviewCount: 260,
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Natural Oak", hex: "#C7A77B" }, { name: "Smoked Black", hex: "#2B2825" }],
    sizes: ["60 cm", "90 cm"],
    stock: 19,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    specifications: { "Material": "100% Solid White Oak", "Weight Capacity": "15 kg" },
    highlights: ["Pre-drilled mounting template included", "Silky natural hardwax oil finish"]
  },
  {
    id: "prod-36",
    name: "Soy Wax Aromatherapy Candle",
    slug: "soy-wax-aromatherapy-candle",
    brand: "UrbanNest",
    category: "home-living",
    description: "Clean-burning soy wax candle hand-poured in a textured ceramic vessel with notes of wild fig, amber wood, and cypress.",
    price: 699,
    originalPrice: 999,
    discount: 30,
    rating: 4.9,
    reviewCount: 580,
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Cream Ceramic", hex: "#F5F3EF" }],
    sizes: ["260g (55hr burn)"],
    stock: 45,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    specifications: { "Wax": "100% Non-GMO Soy & Coconut Wax", "Wick": "Lead-free unbleached cotton" },
    highlights: ["Clean soot-free burn", "Vessel reusable as planter or pen cup"]
  },
  {
    id: "prod-37",
    name: "Architectural Wall Clock",
    slug: "architectural-wall-clock",
    brand: "UrbanNest",
    category: "home-living",
    description: "Frameless 35cm wall clock cut from brushed champagne aluminum with silent Japanese sweep quartz movement.",
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    rating: 4.7,
    reviewCount: 190,
    images: [
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Brushed Champagne", hex: "#C6A477" }, { name: "Anodized Black", hex: "#222222" }],
    sizes: ["35 cm Diameter"],
    stock: 20,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    specifications: { "Material": "Laser-cut 3mm Aluminum", "Movement": "Silent Sweep No-Tick Quartz" },
    highlights: ["Zero ticking sound for peaceful bedrooms", "Includes brass wall mounting hardware"]
  },
  {
    id: "prod-38",
    name: "Woven Jute Area Rug",
    slug: "woven-jute-area-rug",
    brand: "UrbanNest",
    category: "home-living",
    description: "Hand-braided sustainable natural golden jute floor rug with thick woven bouclé texture and soft cotton border backing.",
    price: 2999,
    originalPrice: 4299,
    discount: 30,
    rating: 4.8,
    reviewCount: 310,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Natural Golden Jute", hex: "#C2A374" }],
    sizes: ["120 x 180 cm", "150 x 240 cm"],
    stock: 12,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    specifications: { "Fiber": "100% Hand-harvested natural jute", "Thickness": "12mm" },
    highlights: ["Biodegradable and eco-friendly", "Reversible wear for extended durability"]
  },

  // --- BEAUTY EXPANSION (39-41) ---
  {
    id: "prod-39",
    name: "Rose Quartz Facial Sculpting Roller",
    slug: "rose-quartz-facial-sculpting-roller",
    brand: "PureGlow",
    category: "beauty",
    description: "Genuine Grade-A Brazilian rose quartz dual-ended facial massager with silent zinc alloy weld-free hardware for lymphatic drainage.",
    price: 699,
    originalPrice: 999,
    discount: 30,
    rating: 4.8,
    reviewCount: 620,
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608248597359-573516027a0c?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Soft Rose", hex: "#E8C5C8" }],
    sizes: ["Standard"],
    stock: 42,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    specifications: { "Stone": "100% Natural Rose Quartz", "Frame": "Rust-resistant Rose Gold Alloy" },
    highlights: ["Relieves morning facial puffiness", "Improves serum absorption"]
  },
  {
    id: "prod-40",
    name: "Whipped Shea Body Butter",
    slug: "whipped-shea-body-butter",
    brand: "PureGlow",
    category: "beauty",
    description: "Air-whipped Ghanaian raw unrefined shea butter enriched with cold-pressed marula oil, vitamin E, and vanilla bean extract.",
    price: 799,
    originalPrice: 1099,
    discount: 27,
    rating: 4.9,
    reviewCount: 780,
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Glass Jar", hex: "#EDE8DC" }],
    sizes: ["200 ml"],
    stock: 58,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    specifications: { "Texture": "Lightweight whipped souffle", "Formula": "Non-greasy rapid absorption" },
    highlights: ["Intense 48-hour moisture barrier", "Free of sulfates, mineral oils, phthalates"]
  },
  {
    id: "prod-41",
    name: "Clarifying Charcoal Face Polish",
    slug: "clarifying-charcoal-face-polish",
    brand: "PureGlow",
    category: "beauty",
    description: "Gentle physical and enzyme exfoliating scrub powered by activated bamboo charcoal, jojoba wax beads, and salicylic acid.",
    price: 849,
    originalPrice: 1199,
    discount: 29,
    rating: 4.7,
    reviewCount: 390,
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Charcoal Black", hex: "#1B1B1B" }],
    sizes: ["100 ml"],
    stock: 35,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    specifications: { "Active": "Bamboo Charcoal + 1% BHA", "Beads": "Biodegradable round jojoba beads" },
    highlights: ["Clears congested pores without micro-tears", "Leaves skin baby-smooth"]
  },

  // --- FOOTWEAR EXPANSION (42-44) ---
  {
    id: "prod-42",
    name: "Italian Leather Penny Loafers",
    slug: "italian-leather-penny-loafers",
    brand: "Strider",
    category: "footwear",
    description: "Hand-burnished calfskin leather loafers with traditional saddle strap, hand-stitched apron toe, and stacked leather heel.",
    price: 3499,
    originalPrice: 4799,
    discount: 27,
    rating: 4.8,
    reviewCount: 340,
    images: [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Deep Oxblood", hex: "#4A1521" }, { name: "Dark Walnut", hex: "#3B271E" }],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
    stock: 14,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: false,
    specifications: { "Upper": "Full-grain Burnished Calfskin", "Sole": "Leather sole with rubber traction insert" },
    highlights: ["Blake-stitched flexible construction", "Timeless boardroom to weekend versatility"]
  },
  {
    id: "prod-43",
    name: "Trail Runner Hydro-Shield",
    slug: "trail-runner-hydro-shield",
    brand: "Strider",
    category: "footwear",
    description: "All-terrain waterproof trail shoe with responsive nitrogen-infused foam cushioning and multidirectional 5mm chevron lugs.",
    price: 2599,
    originalPrice: 3499,
    discount: 25,
    rating: 4.8,
    reviewCount: 460,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Forest Camo", hex: "#434B38" }, { name: "Steel & Orange", hex: "#5C6670" }],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
    stock: 25,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    specifications: { "Membrane": "Waterproof breathable inner bootie", "Drop": "6mm offset" },
    highlights: ["Rock-plate protection prevents puncture injuries", "Grip on wet rocks and muddy trails"]
  },
  {
    id: "prod-44",
    name: "Everyday Suede Espadrilles",
    slug: "everyday-suede-espadrilles",
    brand: "Strider",
    category: "footwear",
    description: "Spanish artisanal slip-ons in velvety water-resistant suede with genuine braided jute midsole and natural vulcanized rubber sole.",
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    rating: 4.7,
    reviewCount: 220,
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Sand Beige", hex: "#D4C5A9" }, { name: "Navy Blue", hex: "#1C2436" }],
    sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
    stock: 30,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    specifications: { "Material": "Italian Velour Suede", "Midsole": "Natural braided jute fiber" },
    highlights: ["Soft microfiber heel counter that collapses into a slide", "Lightweight summer comfort"]
  },

  // --- ACCESSORIES EXPANSION (45-46) ---
  {
    id: "prod-45",
    name: "Full-Grain Leather Cardholder Wallet",
    slug: "leather-cardholder-wallet",
    brand: "LuxeCraft",
    category: "accessories",
    description: "Ultra-slim 6-card bifold wallet hand-sewn from vegetable-tanned French buttero leather with RFID blocking brass lining.",
    price: 899,
    originalPrice: 1299,
    discount: 30,
    rating: 4.9,
    reviewCount: 890,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Chestnut Brown", hex: "#5C3317" }, { name: "Midnight Black", hex: "#191919" }],
    sizes: ["10cm x 7.5cm"],
    stock: 60,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    specifications: { "Leather": "Vegetable Tanned Full Grain Cowhide", "Thickness": "Only 4mm empty" },
    highlights: ["Central currency pocket", "Develops a lustrous patina over years of use"]
  },
  {
    id: "prod-46",
    name: "Titanium Polarized Sunglasses",
    slug: "titanium-polarized-sunglasses",
    brand: "LuxeCraft",
    category: "accessories",
    description: "Featherlight 18-gram Japanese beta-titanium aviator frames fitted with Category 3 CR-39 polarized lenses with anti-reflective back coating.",
    price: 2299,
    originalPrice: 3199,
    discount: 28,
    rating: 4.8,
    reviewCount: 410,
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Gold & G15 Green", hex: "#B89758" }, { name: "Gunmetal & Smoke", hex: "#3B3F43" }],
    sizes: ["52-19-145"],
    stock: 22,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    specifications: { "Frame": "Ultralight Beta-Titanium", "Lenses": "100% UVA/UVB 400 Protection" },
    highlights: ["Hypoallergenic silicone nose pads", "Includes origami collapsible leather hard case"]
  },

  // --- SPORTS & FITNESS EXPANSION (47-48) ---
  {
    id: "prod-47",
    name: "Cast Iron Kettlebell 16kg",
    slug: "cast-iron-kettlebell-16kg",
    brand: "ZenithFit",
    category: "sports-fitness",
    description: "Gravity-cast single-piece kettlebell with flat machined wobble-free base and smooth matte powder-coated grip handle.",
    price: 1999,
    originalPrice: 2699,
    discount: 25,
    rating: 4.9,
    reviewCount: 320,
    images: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Matte Black", hex: "#1C1C1C" }],
    sizes: ["12 kg", "16 kg", "20 kg", "24 kg"],
    stock: 15,
    isFeatured: false,
    isBestSeller: true,
    isNewArrival: false,
    specifications: { "Casting": "Void-free single piece cast iron", "Handle": "Color-coded 35mm diameter" },
    highlights: ["Smooth chalk-retentive finish", "Precision weighted within ±1%"]
  },
  {
    id: "prod-48",
    name: "Seamless Performance Compression Tight",
    slug: "seamless-performance-compression-tight",
    brand: "ZenithFit",
    category: "sports-fitness",
    description: "High-waisted squat-proof athletic leggings engineered with 4-way stretch fabric, targeted muscle compression zones, and dual side phone pockets.",
    price: 1299,
    originalPrice: 1799,
    discount: 27,
    rating: 4.8,
    reviewCount: 550,
    images: [
      "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Charcoal Slate", hex: "#383E42" }, { name: "Midnight Navy", hex: "#1B2333" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 36,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    specifications: { "Fabric": "75% Recycled Polyamide, 25% Spandex", "Waistband": "Seamless stay-put band" },
    highlights: ["100% squat proof non-sheer", "Moisture-wicking QuickDry technology"]
  },

  // --- KITCHEN APPLIANCES EXPANSION (49-50) ---
  {
    id: "prod-49",
    name: "Japanese Damascene Santoku Knife 7-Inch",
    slug: "japanese-damascene-santoku-knife",
    brand: "CulinaryPro",
    category: "kitchen-appliances",
    description: "Master-crafted 67-layer Damascus steel blade with VG-10 super-steel core, tsuchime hammered finish, and octagonal pakkawood handle.",
    price: 2999,
    originalPrice: 4199,
    discount: 28,
    rating: 4.9,
    reviewCount: 440,
    images: [
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Damascus & Walnut", hex: "#423226" }],
    sizes: ["7-Inch Blade"],
    stock: 16,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    specifications: { "Steel": "67-Layer VG-10 High Carbon Damascus", "Hardness": "60±2 HRC", "Angle": "Honbazuke 12° edge" },
    highlights: ["Razor sharp edge retention", "Hammered pattern prevents food sticking to blade"]
  },
  {
    id: "prod-50",
    name: "Artisan Ceramic Salt & Pepper Mills",
    slug: "ceramic-salt-and-pepper-mills",
    brand: "CulinaryPro",
    category: "kitchen-appliances",
    description: "Set of twin solid ash wood seasoning grinders equipped with non-corrosive ceramic burr mechanisms and magnetic quick-fill top.",
    price: 1199,
    originalPrice: 1599,
    discount: 25,
    rating: 4.8,
    reviewCount: 290,
    images: [
      "https://images.unsplash.com/photo-1588854337221-4cf9fa96059c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?q=80&w=800&auto=format&fit=crop"
    ],
    colors: [{ name: "Ash & Carbon", hex: "#2E2D2B" }],
    sizes: ["20 cm Height (Set of 2)"],
    stock: 28,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    specifications: { "Grinder": "CrushGrind® Diamond Ceramic Core", "Wood": "Sustainably Sourced European Ash" },
    highlights: ["Stepless grind adjustment from coarse flakes to fine powder", "Lifetime guarantee on ceramic mechanism"]
  }
];

