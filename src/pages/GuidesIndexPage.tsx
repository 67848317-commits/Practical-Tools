import React, { useState, useEffect } from 'react';
import { guides, GuideItem } from '../data/guides';
import { updatePageSEO } from '../utils/seo';

interface GuidesIndexPageProps {
  onNavigate: (path: string) => void;
}

export const GuidesIndexPage: React.FC<GuidesIndexPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const orderedCategories = ['Money', 'Home', 'Everyday', 'Cooking', 'Work & School'];
  const extraCategories = guides
    .map((g) => g.category)
    .filter((cat) => !orderedCategories.some((c) => c.toLowerCase() === cat.toLowerCase()));
  const activeCategories = [...orderedCategories, ...Array.from(new Set(extraCategories))].filter((cat) =>
    guides.some((g) => g.category.toLowerCase() === cat.toLowerCase())
  );
  const categories = ['All', ...activeCategories];

  useEffect(() => {
    updatePageSEO({
      title: 'Guides & Practical Knowledge',
      description: 'Practical explanations, formulas, and everyday tips to help you make better calculations and decisions.',
      canonicalPath: '/guides',
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Guides' },
      ],
    });
    window.scrollTo(0, 0);
  }, []);

  const filteredGuides = selectedCategory === 'All'
    ? guides
    : guides.filter((g) => g.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="max-w-6xl mx-auto px-4 min-[420px]:px-5 sm:px-6 py-12 md:py-16">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100/80 text-amber-800 border border-amber-200/70 mb-4">
          Editorial Decision Guides
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          Guides & Practical Knowledge
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Practical explanations, formulas, and everyday tips to help you make better calculations and decisions.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10" role="tablist" aria-label="Filter guides by category">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-2xs'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map((guide) => (
          <article
            key={guide.slug}
            className="group flex flex-col justify-between bg-white rounded-xl border border-slate-200 p-6 transition-all hover:border-amber-500/50 hover:shadow-md hover:-translate-y-0.5"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-3">
                <span className="font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded">
                  {guide.category}
                </span>
                <span className="text-slate-500 flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {guide.readingTime}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 mb-2 leading-snug group-hover:text-amber-600 transition-colors">
                <a
                  href={`/guides/${guide.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/guides/${guide.slug}`);
                  }}
                  className="focus:outline-none focus:underline"
                >
                  {guide.title}
                </a>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6">
                {guide.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">{guide.publishedDate}</span>
              <a
                href={`/guides/${guide.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/guides/${guide.slug}`);
                }}
                className="font-semibold text-slate-900 group-hover:text-amber-600 inline-flex items-center gap-1 transition-all group-hover:gap-1.5"
              >
                Read Guide
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
