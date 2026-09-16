import React from 'react';
import { ArrowLeft, Clock, Calendar, CheckCircle2, Calculator, ArrowRight } from 'lucide-react';
import { guides, GuideItem } from '../data/guides';
import { tools } from '../data/tools';

interface GuidePageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const GuidePage: React.FC<GuidePageProps> = ({ slug, onNavigate }) => {
  const guide = guides.find((g) => g.slug === slug);

  if (!guide) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Guide Not Found</h1>
        <p className="text-sm text-slate-500 mb-6">The requested practical guide could not be located.</p>
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Homepage
        </button>
      </div>
    );
  }

  // Find related tools based on category
  const relatedTool = tools.find((t) => t.category.toLowerCase().includes(guide.category.toLowerCase().split(' ')[0]));

  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Breadcrumb & Back */}
      <div className="mb-8">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Home
        </button>
      </div>

      <header className="mb-10">
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 mb-4">
          <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-bold uppercase tracking-wider text-[11px]">
            {guide.category}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {guide.readTime}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {guide.publishedDate}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          {guide.title}
        </h1>

        <p className="text-lg text-slate-600 leading-relaxed border-l-2 border-blue-600 pl-4 py-1">
          {guide.excerpt}
        </p>
      </header>

      {/* Guide Content Body */}
      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-sm sm:text-base border-t border-slate-200 pt-8">
        <div className="p-6 bg-white rounded-2xl border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            Key Practical Rule
          </h2>
          <p className="text-sm text-slate-600">
            Everyday percentage and estimation formulas must be calculated sequentially or multiplied as decimals, rather than combined by simple addition. Doing so prevents significant monetary and material discrepancies.
          </p>
        </div>

        <h2 className="text-xl font-bold text-slate-900 pt-4">Understanding the Arithmetic</h2>
        <p>
          When planning household budgets, purchasing renovation materials, or reviewing payroll stubs, minor rounding assumptions accumulate quickly. Using verified, transparent formulas allows you to cross-examine estimates before committing financial resources.
        </p>

        {relatedTool && (
          <div className="my-8 p-6 bg-blue-50/60 rounded-2xl border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block mb-1">Interactive Tool</span>
              <h3 className="text-base font-bold text-slate-900">{relatedTool.title}</h3>
              <p className="text-xs text-slate-600 mt-0.5">{relatedTool.shortIntro}</p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate(`/calculators/${relatedTool.slug}`)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold whitespace-nowrap transition-colors self-start sm:self-center"
            >
              <Calculator className="w-4 h-4" />
              Open Calculator
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <h2 className="text-xl font-bold text-slate-900 pt-4">Common Pitfalls to Avoid</h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
          <li><strong>Overlooking base units:</strong> Ensure measurements are converted to the same unit (feet vs. meters, annual vs. weekly hours) before calculating.</li>
          <li><strong>Ignoring realistic buffers:</strong> Material projects like wall painting or flooring typically require a 10% waste buffer.</li>
          <li><strong>Taxes and deductions:</strong> Remember that retail sales tax is applied post-discount, and take-home salary differs from gross earnings.</li>
        </ul>
      </div>
    </div>
  );
};
