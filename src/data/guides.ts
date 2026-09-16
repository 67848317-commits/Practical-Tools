export interface GuideItem {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedDate: string;
}

export const guides: GuideItem[] = [
  {
    slug: 'how-to-calculate-stacked-discounts',
    title: 'How Stacked Discounts Actually Work (And Why Simple Addition Fails)',
    excerpt: 'Retailers love advertising 30% off plus an extra 20% coupon. Learn why that does not equal 50% off and how to quickly compute the real savings in your head.',
    category: 'Money',
    readTime: '3 min read',
    publishedDate: 'January 2026',
  },
  {
    slug: 'salary-to-hourly-gross-vs-net',
    title: 'Salary vs. Hourly Pay: The 2,080-Hour Work Year Rule',
    excerpt: 'How to reliably translate an annual corporate salary into an equivalent hourly wage, accounting for standard 40-hour weeks, paid time off, and payroll schedules.',
    category: 'Work & School',
    readTime: '4 min read',
    publishedDate: 'January 2026',
  },
  {
    slug: 'paint-estimation-rules-of-thumb',
    title: 'How Much Paint Do You Really Need? The Standard Room Formula',
    excerpt: 'Step-by-step methods for measuring room perimeters, deducting standard doors and windows, and budgeting for wall texture absorption and second coats.',
    category: 'Home',
    readTime: '4 min read',
    publishedDate: 'February 2026',
  },
  {
    slug: 'restaurant-tipping-pre-tax-vs-post-tax',
    title: 'Tipping Etiquette: Should You Tip on the Pre-Tax or Post-Tax Total?',
    excerpt: 'A clear guide to modern dining math, how automated gratuities affect check totals, and how to split checks fairly without mathematical headaches.',
    category: 'Everyday',
    readTime: '3 min read',
    publishedDate: 'February 2026',
  },
];
