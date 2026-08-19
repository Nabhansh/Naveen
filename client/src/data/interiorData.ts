import { PortfolioProject, ServiceItem, FAQItem, ProcessStep } from "@/types";

export const INSTAGRAM_URL = "https://www.instagram.com/sanwariyaintirior8558?igsh=MXVrMDJmcmo3OTIzYQ%3D%3D";
export const INSTAGRAM_HANDLE = "@sanwariyaintirior8558";
export const PHONE_DISPLAY = "+91 90539 53833";
export const PHONE_MONTU = "+91 90539 53833";
export const PHONE_SANDEEP = "+91 90539 53833";
export const PHONE_HREF = "tel:+919053953833";
export const WHATSAPP_HREF = "https://wa.me/919053953833";
export const STUDIO_ADDRESS = "SURAJGARH BYPASS, CHIDAWA, RAJASTHAN";

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "p1",
    src: "/images/portfolio/p1-after.jpg",
    beforeSrc: "/images/portfolio/p1-before.jpg",
    title: "The Sharma Residence",
    category: "Bedroom",
    tag: "Luxury Master Suite",
    location: "Chidawa, Rajasthan",
    areaSqFt: 450,
    completionYear: "2024",
    materials: ["Fluted Wall Panels", "Warm Cove LED", "Upholstered Headboard", "Wood Veneer"],
    description: "A serene bedroom featuring custom wall paneling, ambient cove lighting, and a carefully composed material palette.",
    budgetRange: "Custom quote",
  },
  {
    id: "p2",
    src: "/images/portfolio/p2-after.jpg",
    beforeSrc: "/images/portfolio/p2-before.jpg",
    title: "The Surajgarh Living Room",
    category: "Living Room",
    tag: "Wall Paneling",
    location: "Surajgarh Bypass, Rajasthan",
    areaSqFt: 620,
    completionYear: "2024",
    materials: ["Fluted Wood Panels", "Clay Plaster", "Brass Lighting", "Textured Finish"],
    description: "A warm living room anchored by a tactile feature wall, a slim console, and soft architectural lighting.",
    budgetRange: "Custom quote",
  },
  {
    id: "p3",
    src: "/images/portfolio/p3-after.jpg",
    beforeSrc: "/images/portfolio/p3-before.jpg",
    title: "MD Executive Suite",
    category: "Commercial",
    tag: "Commercial Office",
    location: "Chidawa, Rajasthan",
    areaSqFt: 850,
    completionYear: "2023",
    materials: ["Teak Wood Veneer", "Acoustic Wall Panels", "Architectural Ceiling"],
    description: "An executive office with acoustic wall paneling, custom joinery, concealed wiring, and a focused material language.",
    budgetRange: "Custom quote",
  },
  {
    id: "p4",
    src: "/images/portfolio/p4-after.jpg",
    beforeSrc: "/images/portfolio/p4-before.jpg",
    title: "Grand Living & Louver Wall",
    category: "Living Room",
    tag: "Living Room & Lounge",
    location: "Chidawa, Rajasthan",
    areaSqFt: 620,
    completionYear: "2024",
    materials: ["Marble Texture Sheet", "WPC Louvers", "Metal Inlays", "Track Lights"],
    description: "A refined lounge with a full-height feature wall, framed louvers, and warm light that gives the room its rhythm.",
    budgetRange: "Custom quote",
  },
  {
    id: "p5",
    src: "/images/portfolio/p5-after.jpg",
    beforeSrc: "/images/portfolio/p5-before.jpg",
    title: "Seth Residence Ceiling Study",
    category: "Ceiling",
    tag: "False Ceiling & Lighting",
    location: "Chidawa, Rajasthan",
    areaSqFt: 780,
    completionYear: "2024",
    materials: ["Cove Lighting", "Profile Light", "Gypsum Geometry", "Warm LED"],
    description: "A layered false-ceiling composition with recessed lighting and clean architectural geometry that softens the room after sunset.",
    budgetRange: "Custom quote",
  },
  {
    id: "p6",
    src: "/images/portfolio/p6-after.jpg",
    beforeSrc: "/images/portfolio/p6-before.jpg",
    title: "Modern Minimalist Ceiling",
    category: "Ceiling",
    tag: "Architectural Ceiling",
    location: "Chidawa, Rajasthan",
    areaSqFt: 310,
    completionYear: "2023",
    materials: ["Gypsum Board", "Warm Strip Lights", "Minimalist Finish"],
    description: "A clean, minimalist ceiling design that emphasizes space and light through simple geometry and warm illumination.",
    budgetRange: "Custom quote",
  },
  {
    id: "p7",
    src: "/images/portfolio/p7-after.jpg",
    beforeSrc: "/images/portfolio/p7-before.jpg",
    title: "Corporate Hub Reception",
    category: "Commercial",
    tag: "Commercial Fit-out",
    location: "Chidawa, Rajasthan",
    areaSqFt: 1200,
    completionYear: "2024",
    materials: ["Glass Partitions", "Acoustic Panels", "Branding Wall"],
    description: "A professional commercial reception area designed for impact, featuring glass partitions and integrated branding elements.",
    budgetRange: "Custom quote",
  },
];

export const services: ServiceItem[] = [
  {
    id: "s1",
    title: "Living Room & TV Wall Paneling",
    shortDesc: "Statement TV backdrops, fluted panels, and louvers with warm ambient lighting.",
    fullDesc: "Transform your living room with textured wall treatments, wood-inspired louvers, refined consoles, and concealed lighting channels.",
    image: "/images/sanwariya-wall-panel.jpg",
    features: ["Fluted & WPC Louvers", "Textured Feature Walls", "Floating TV Consoles", "Ambient Lighting"],
    startingPrice: "On consultation",
    iconName: "Tv",
  },
  {
    id: "s2",
    title: "False Ceiling & Lighting Design",
    shortDesc: "Architectural ceilings with cove, spot, and layered lighting.",
    fullDesc: "Create a stronger sense of height and atmosphere with clean ceiling geometry, cove lighting, profile lights, and crafted details.",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=1000",
    features: ["Layered Ceiling Geometry", "COB & Profile Lighting", "CNC Detail Work", "Thermal & Sound Insulation"],
    startingPrice: "On consultation",
    iconName: "Sparkles",
  },
  {
    id: "s3",
    title: "Bespoke Bedroom & Wardrobes",
    shortDesc: "Tactile bedroom walls, wardrobes, headboards, and integrated storage.",
    fullDesc: "Shape a bedroom that feels personal with upholstered headboards, textured walls, considered wardrobes, and soft bedside light.",
    image: "/images/sanwariya-bedroom.jpg",
    features: ["Textured Accent Walls", "Custom Sliding Wardrobes", "Upholstered Headboards", "Integrated Storage"],
    startingPrice: "On consultation",
    iconName: "Bed",
  },
  {
    id: "s4",
    title: "Turnkey Commercial Fit-Outs",
    shortDesc: "Executive offices, retail showrooms, and hospitality interiors.",
    fullDesc: "End-to-end commercial execution from partitions and reception desks to acoustic treatment, branding walls, and coordinated services.",
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000",
    features: ["Glass Office Cabins", "Acoustic Wall Treatments", "Reception & Branding Walls", "Electrical Coordination"],
    startingPrice: "On consultation",
    iconName: "Building2",
  },
];

export const processSteps: ProcessStep[] = [
  { n: "01", title: "First Meeting & Site Measurement", body: "We sit down together at your space to understand the room, your routines, and the atmosphere you want to create.",  deliverables: ["Exact Site Floorplan", "Design Brief", "Initial Budget Orientation"] },
  { n: "02", title: "Design Concept & Materials", body: "We shape the visual direction with 3D concepts, material swatches, and clear working drawings before execution begins.",  deliverables: ["3D Visualizations", "Material Swatch Board", "Itemized Quote"] },
  { n: "03", title: "Precision Execution", body: "Our craftsmen bring the plan to life with supervised installation, careful finishing, and regular quality checks on site.",  deliverables: ["Supervised Installation", "Quality Audits", "Clean Handover"] },
  { n: "04", title: "Final Polish & Handover", body: "We complete the last details, inspect every finish, and hand over a room ready to live in.",  deliverables: ["Deep Cleaning", "Final Walkthrough", "Care Guide"] },
];

export const faqs: FAQItem[] = [
  { id: "faq1", question: "What is the typical timeline for a complete residential interior project?", answer: "A standard residential project usually takes between 25 and 45 days from approved design to final handover, depending on the scope and custom woodwork involved.", category: "Process" },
  { id: "faq2", question: "Do you offer 3D visualization before starting on-site work?", answer: "Yes. We create realistic 3D designs and floor plans so you can visualize materials, lighting, and the overall room direction before execution.", category: "Process" },
  { id: "faq3", question: "Can we get a cost estimate before booking?", answer: "Absolutely. Call or message us for a consultation and site measurement so we can understand your space and prepare a clear custom estimate.", category: "Pricing" },
  { id: "faq4", question: "Which areas do you serve?", answer: "Our studio is based at Surajgarh Bypass, Chidawa, Rajasthan, and we work with homeowners and businesses across the surrounding region.", category: "Process" },
];

export const tickerItems = [
  "SANWARIYA INTERIORS AND WALLPAPERS",
  "Interior Design",
  "Wall Paneling",
  "False Ceiling & Lighting",
  "Turnkey Fit-Outs",
  "SURAJGARH BYPASS, CHIDAWA, RAJASTHAN",
  "@sanwariyaintirior8558",
];
