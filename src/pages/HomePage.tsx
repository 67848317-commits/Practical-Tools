import React, { useState } from 'react';
import { Search, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { siteConfig } from '../data/site';
import { tools } from '../data/tools';
import { categories } from '../data/categories';
import { guides } from '../data/guides';
import { ToolCard } from '../components/ToolCard';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // All 20 tools available on the homepage
  const allTools = tools;

  // Client-side search filtering across all 20 tools
  const filteredTools = allTools.filter((tool) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      tool.title.toLowerCase().includes(q) ||
      tool.shortTitle.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      tool.shortIntro.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  return (
    <div>
      {/* 4. Hero Section with 5. Large Search Interface */}
      <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 border-b border-slate-200/80 bg-gradient-to-b from-[#fbfbfa] to-[#f4f4f0]" aria-labelledby="hero-title">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Consumer utility badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 mb-6 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Independent Everyday Utility • No Sign-up Required</span>
          </div>

          {/* Headline */}
          <h1 id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-5">
            {siteConfig.homepageHeadline}
          </h1>

          {/* Supporting Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-8">
            Calculate, convert and estimate the things that matter in everyday life with fast, private, browser-based tools.
          </p>

          {/* Large Search Interface */}
          <div className="max-w-xl mx-auto mb-4">
            <div className="relative flex items-center bg-white border border-slate-300 rounded-2xl shadow-xs hover:border-slate-400 focus-within:border-blue-600 focus-within:ring-3 focus-within:ring-blue-100 transition-all">
              <div className="absolute left-4 text-slate-400 pointer-events-none">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search calculators (e.g., percentage, tip, paint, fuel, salary)..."
                className="w-full pl-12 pr-12 py-4 bg-transparent text-slate-900 placeholder:text-slate-400 text-base focus:outline-none rounded-2xl"
                id="hero-search-input"
                aria-label="Search calculators and tools"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-slate-400 hover:text-slate-700 text-lg font-bold p-1"
                  aria-label="Clear search input"
                >
                  ×
                </button>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Instant client-side filter — calculations never leave your browser
            </p>
          </div>

          {/* Quick Filter Tags */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-600">
            <span className="text-slate-400 font-medium mr-1">Quick searches:</span>
            {['Percentage', 'Tip & Split', 'Discount', 'Salary', 'Paint', 'Fuel'].map((keyword) => (
              <button
                key={keyword}
                type="button"
                onClick={() => setSearchQuery(keyword === 'Tip & Split' ? 'tip' : keyword.toLowerCase())}
                className="px-2.5 py-1 rounded-md bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Popular Tools Section */}
      <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6" id="tools-section" aria-labelledby="popular-tools-title">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
              Instant Utilities
            </span>
            <h2 id="popular-tools-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Tools & Calculators
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Each tool provides verified formulas, step-by-step arithmetic explanations, and sensible real-world defaults.
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg whitespace-nowrap self-start sm:self-auto">
            Showing {filteredTools.length} of {allTools.length} tools
          </div>
        </div>

        {filteredTools.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-base font-semibold text-slate-800 mb-1">No matching calculators found</p>
            <p className="text-xs text-slate-500 mb-4">We could not find any tools matching &ldquo;{searchQuery}&rdquo;. Try broader terms like &ldquo;tax&rdquo;, &ldquo;fuel&rdquo;, or &ldquo;split&rdquo;.</p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </section>

      {/* 7. Category Section */}
      <section className="py-14 bg-white border-y border-slate-200" aria-labelledby="categories-title">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
              Structured Directory
            </span>
            <h2 id="categories-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Explore by Category
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Organized decision utilities tailored for household budgeting, home improvement, and daily planning.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => {
              const catTools = tools.filter((t) => t.category === cat.slug);
              return (
                <a
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/category/${cat.slug}`);
                  }}
                  className="p-6 bg-[#fbfbfa] rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xs transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {cat.name}
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded">
                        {catTools.length} {catTools.length === 1 ? 'tool' : 'tools'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {cat.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 pt-3 border-t border-slate-200/70">
                    <span>Browse category</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Useful Guides Section */}
      <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6" aria-labelledby="guides-title">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
            Practical Decision Guides
          </span>
          <h2 id="guides-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Guides & Practical Knowledge
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Clear, jargon-free explanations that demystify everyday mathematical formulas, retail pricing, and estimation pitfalls.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <article
              key={guide.slug}
              className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-2xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5">
                  <span className="font-bold text-blue-600 uppercase tracking-wider">{guide.category}</span>
                  <span>{guide.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {guide.excerpt}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className="text-slate-400 font-normal">Published {guide.publishedDate}</span>
                <span className="text-blue-600 flex items-center gap-1">
                  Read guide <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 9. Trust & About Section */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6" aria-labelledby="trust-title">
        <div className="p-8 sm:p-12 bg-white rounded-2xl border border-slate-200">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
              Our Editorial Promise
            </span>
            <h2 id="trust-title" className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
              Built for clarity, speed, and mathematical integrity
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {siteConfig.brandName} is designed as an antidote to bloated calculator websites cluttered with auto-playing video ads, popups, and obscure equations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-mono flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Transparent Formulas</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We display the exact mathematical equations and arithmetic step-by-step logic behind every calculation so you never have to guess.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 font-mono flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Client-Side Privacy</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                All calculations run entirely in your web browser. Your salaries, travel routes, bills, and measurements are never logged or stored on our servers.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 font-mono flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Real-World Adjustments</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Physical estimators account for real-world nuances: wall texture absorption, driving conditions, and sales tax rules, preventing costly surprises.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
