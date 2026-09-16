export interface SiteConfig {
  brandName: string;
  tagline: string;
  homepageHeadline: string;
  positioning: string;
  description: string;
  domain: string;
  url: string;
  author: string;
  contactEmail: string;
  twitterHandle: string;
  locale: string;
  yearEstablished: number;
}

export type CategorySlug = 'money' | 'home' | 'everyday' | 'cooking' | 'work-school';

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  icon: string;
  accentColor?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ToolExample {
  title: string;
  scenario: string;
  steps: string[];
  result: string;
}

export interface ToolMistake {
  title: string;
  description: string;
  fix: string;
}

export interface ToolDefinition {
  slug: string;
  path: string;
  title: string;
  shortTitle: string;
  category: CategorySlug;
  badge?: string;
  metaTitle: string;
  metaDescription: string;
  shortIntro: string;
  formulaDescription: string;
  formulaLatex?: string;
  formulaExplanation: string[];
  howItWorks: string[];
  examples: ToolExample[];
  assumptions?: string[];
  commonMistakes: ToolMistake[];
  faqs: FAQItem[];
  relatedSlugs: string[];
  keywords: string[];
}

export interface BreadcrumbItem {
  name: string;
  url?: string;
}
