import type { Category } from '../types';

export const categories: Category[] = [
  {
    slug: 'money',
    name: 'Money',
    description: 'Practical financial calculators for discounts, pricing, tips, salary rates, and markups.',
    icon: 'DollarSign',
  },
  {
    slug: 'home',
    name: 'Home & Construction',
    description: 'Planning estimators for paint, flooring, tile, concrete, and landscaping materials.',
    icon: 'Home',
  },
  {
    slug: 'everyday',
    name: 'Daily Life & Travel',
    description: 'Reliable tools for fuel costs, gas mileage, daily commutes, electricity, and dates.',
    icon: 'Compass',
  },
  {
    slug: 'cooking',
    name: 'Cooking & Conversions',
    description: 'Kitchen converters, recipe scaling, cooking volume units, and ingredient weight densities.',
    icon: 'Utensils',
  },
  {
    slug: 'work-school',
    name: 'Work & Study',
    description: 'Productivity tools for work hours, time cards, breaks, and academic GPA calculations.',
    icon: 'Briefcase',
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((cat) => cat.slug === slug);
};

export const getAllCategories = (): Category[] => {
  return categories;
};
