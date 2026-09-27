import React from 'react';
import { Calculator, BookOpen, Home, Search, ArrowRight } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate?: (path: string) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const handleNav = (path: string, e?: React.MouseEvent) => {
    if (onNavigate) {
      if (e) e.preventDefault();
      onNavigate(path);
    }
  };

  const popularTools = [
    { title: 'Percentage Calculator', path: '/calculators/percentage', category: 'Money' },
    { title: 'Paint Calculator', path: '/calculators/paint', category: 'Home' },
    { title: 'Gas Mileage Calculator', path: '/calculators/gas-mileage', category: 'Travel' },
    { title: 'Salary to Hourly', path: '/calculators/salary-to-hourly', category: 'Money' },
    { title: 'Recipe Scale Calculator', path: '/calculators/recipe-scale', category: 'Cooking' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mb-6 border border-amber-200">
        <span className="text-2xl font-black">404</span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
        Page Not Found
      </h1>

      <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
        The tool or page you requested doesn't exist or has moved. Explore our directory of fast, private everyday calculators and guides below.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
        <a
          href="/calculators"
          onClick={(e) => handleNav('/calculators', e)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-colors shadow-xs"
        >
          <Calculator className="w-4 h-4" />
          Browse All 20 Calculators
        </a>
        <a
          href="/guides"
          onClick={(e) => handleNav('/guides', e)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-sm font-semibold transition-colors shadow-2xs"
        >
          <BookOpen className="w-4 h-4" />
          Read Practical Guides
        </a>
        <a
          href="/"
          onClick={(e) => handleNav('/', e)}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-slate-600 hover:text-slate-900 text-sm font-semibold transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </a>
      </div>

      <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 text-left shadow-2xs">
        <h2 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-4">
          Popular Practical Calculators
        </h2>
        <ul className="divide-y divide-slate-100">
          {popularTools.map((tool) => (
            <li key={tool.path}>
              <a
                href={tool.path}
                onClick={(e) => handleNav(tool.path, e)}
                className="py-3 flex items-center justify-between group hover:text-blue-600 transition-colors"
              >
                <div>
                  <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-600">
                    {tool.title}
                  </span>
                  <span className="ml-2 text-[11px] font-medium text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                    {tool.category}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
