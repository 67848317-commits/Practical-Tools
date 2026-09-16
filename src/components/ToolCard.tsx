import React from 'react';
import { ArrowRight, Calculator, DollarSign, Home, Compass, Briefcase, Utensils } from 'lucide-react';
import type { ToolDefinition } from '../types';

interface ToolCardProps {
  tool: ToolDefinition;
  onNavigate: (path: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onNavigate }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'money':
        return <DollarSign className="w-4 h-4 text-emerald-600" />;
      case 'home':
        return <Home className="w-4 h-4 text-amber-600" />;
      case 'work-school':
        return <Briefcase className="w-4 h-4 text-indigo-600" />;
      case 'cooking':
        return <Utensils className="w-4 h-4 text-rose-600" />;
      case 'math':
        return <Calculator className="w-4 h-4 text-blue-600" />;
      default:
        return <Compass className="w-4 h-4 text-slate-600" />;
    }
  };

  const targetUrl = tool.path || `/calculators/${tool.slug}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(targetUrl);
  };

  return (
    <a
      href={targetUrl}
      onClick={handleClick}
      className="group relative flex flex-col justify-between p-5 sm:p-6 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
      id={`tool-card-${tool.slug}`}
    >
      <div>
        {/* Header with category tag and badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">
            {getCategoryIcon(tool.category)}
            <span className="capitalize">{tool.category.replace('-', ' & ')}</span>
          </span>
          {tool.badge && (
            <span className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-700 rounded-full">
              {tool.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
          {tool.title}
        </h3>

        {/* Short description */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
          {tool.shortIntro}
        </p>
      </div>

      {/* Footer callout */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500 group-hover:text-slate-900">
        <span>Instant calculation</span>
        <span className="inline-flex items-center gap-1 font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform">
          Open tool <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </a>
  );
};
