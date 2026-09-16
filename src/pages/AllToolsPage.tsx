import React, { useState } from 'react';
import { tools } from '../data/tools';
import { categories } from '../data/categories';
import { ToolCard } from '../components/ToolCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Search } from 'lucide-react';

interface AllToolsPageProps {
  onNavigate: (path: string) => void;
}

export const AllToolsPage: React.FC<AllToolsPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const activeCategories = categories.filter((cat) =>
    tools.some((t) => t.category === cat.slug)
  );

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesQuery =
      !filterQuery.trim() ||
      tool.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      tool.shortIntro.toLowerCase().includes(filterQuery.toLowerCase()) ||
      tool.keywords.some((k) => k.toLowerCase().includes(filterQuery.toLowerCase()));

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[{ name: 'All Calculators & Tools' }]} onNavigate={onNavigate} />

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Practical Everyday Calculators & Tools
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
          Explore our collection of fast, browser-based calculators designed to help you make confident decisions across finances, home improvement, and daily planning.
        </p>
      </header>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Filter calculators by name or keyword..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            All Categories ({tools.length})
          </button>
          {activeCategories.map((cat) => {
            const count = tools.filter((t) => t.category === cat.slug).length;
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat.slug
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
          <p className="text-slate-600 text-sm">No calculators match your current filter.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setFilterQuery('');
            }}
            className="mt-3 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
};
