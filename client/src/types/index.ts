export interface ReelHighlight {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  views: string;
  desc: string;
}

export interface PortfolioProject {
  id: string;
  src: string;
  beforeSrc?: string;
  title: string;
  category: "Living Room" | "Living Room" | "Bedroom" | "Ceiling" | "Commercial";
  tag: string;
  location: string;
  areaSqFt: number;
  completionYear: string;
  materials: string[];
  description: string;
  clientReview?: string;
  budgetRange?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  features: string[];
  startingPrice: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  location: string;
  projectType: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "Pricing" | "Process" | "Materials" | "Warranty";
}

export interface ProcessStep {
  n: string;
  title: string;
  body: string;
  deliverables: string[];
}
