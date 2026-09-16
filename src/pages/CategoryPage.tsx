import React from 'react';
import { categories } from '../data/categories';
import { getToolsByCategory } from '../data/tools';
import { ToolCard } from '../components/ToolCard';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface CategoryPageProps {
  categorySlug: string;
  onNavigate: (path: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categorySlug, onNavigate }) => {
  const category = categories.find((c) => c.slug === categorySlug);
  const categoryTools = getToolsByCategory(categorySlug);

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Category Not Found</h1>
        <p className="text-sm text-slate-500 mb-6">The requested tool category could not be located.</p>
        <button
          onClick={() => onNavigate('/calculators')}
          className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg"
        >
          View All Tools
        </button>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Calculators', url: '/calculators' },
    { name: category.name },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      <header className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md mb-2 inline-block">
          Tool Category
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          {category.name} Calculators
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
          {category.description}
        </p>
      </header>

      {categoryTools.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
          <p className="text-slate-600 text-sm">Calculators for this category are in development.</p>
          <button
            onClick={() => onNavigate('/calculators')}
            className="mt-3 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
          >
            Explore Other Calculators
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
};
