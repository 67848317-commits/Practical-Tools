import React, { Suspense, useEffect } from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { FAQSection } from './FAQSection';
import { RelatedTools } from './RelatedTools';
import { AdSlot } from './AdSlot';

// Dynamic code-split imports for each calculator module
const PercentageCalculator = React.lazy(() => import('./calculators/PercentageCalculator').then((m) => ({ default: m.PercentageCalculator })));
const DiscountCalculator = React.lazy(() => import('./calculators/DiscountCalculator').then((m) => ({ default: m.DiscountCalculator })));
const TipCalculator = React.lazy(() => import('./calculators/TipCalculator').then((m) => ({ default: m.TipCalculator })));
const SalaryCalculator = React.lazy(() => import('./calculators/SalaryCalculator').then((m) => ({ default: m.SalaryCalculator })));
const PaintCalculator = React.lazy(() => import('./calculators/PaintCalculator').then((m) => ({ default: m.PaintCalculator })));
const FuelCostCalculator = React.lazy(() => import('./calculators/FuelCostCalculator').then((m) => ({ default: m.FuelCostCalculator })));
const MarkupCalculator = React.lazy(() => import('./calculators/MarkupCalculator').then((m) => ({ default: m.MarkupCalculator })));
const FlooringCalculator = React.lazy(() => import('./calculators/FlooringCalculator').then((m) => ({ default: m.FlooringCalculator })));
const TileCalculator = React.lazy(() => import('./calculators/TileCalculator').then((m) => ({ default: m.TileCalculator })));
const ConcreteCalculator = React.lazy(() => import('./calculators/ConcreteCalculator').then((m) => ({ default: m.ConcreteCalculator })));
const MulchCalculator = React.lazy(() => import('./calculators/MulchCalculator').then((m) => ({ default: m.MulchCalculator })));
const GasMileageCalculator = React.lazy(() => import('./calculators/GasMileageCalculator').then((m) => ({ default: m.GasMileageCalculator })));
const CommuteCostCalculator = React.lazy(() => import('./calculators/CommuteCostCalculator').then((m) => ({ default: m.CommuteCostCalculator })));
const ElectricityCostCalculator = React.lazy(() => import('./calculators/ElectricityCostCalculator').then((m) => ({ default: m.ElectricityCostCalculator })));
const DateDifferenceCalculator = React.lazy(() => import('./calculators/DateDifferenceCalculator').then((m) => ({ default: m.DateDifferenceCalculator })));
const RecipeScaleCalculator = React.lazy(() => import('./calculators/RecipeScaleCalculator').then((m) => ({ default: m.RecipeScaleCalculator })));
const CookingUnitConverter = React.lazy(() => import('./calculators/CookingUnitConverter').then((m) => ({ default: m.CookingUnitConverter })));
const CupsToGramsConverter = React.lazy(() => import('./calculators/CupsToGramsConverter').then((m) => ({ default: m.CupsToGramsConverter })));
const WorkHoursCalculator = React.lazy(() => import('./calculators/WorkHoursCalculator').then((m) => ({ default: m.WorkHoursCalculator })));
const GpaCalculator = React.lazy(() => import('./calculators/GpaCalculator').then((m) => ({ default: m.GpaCalculator })));

import type { ToolDefinition } from '../types';
import { BookOpen, AlertTriangle, Check, Sparkles, Info, ArrowRight } from 'lucide-react';
import { getCompanionGuideForTool } from '../data/guides';
import { updatePageSEO } from '../utils/seo';

interface ToolLayoutProps {
  tool: ToolDefinition;
  onNavigate: (path: string) => void;
  calculatorRegistry?: Record<string, React.ComponentType<any>>;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({ tool, onNavigate, calculatorRegistry }) => {
  const companionGuide = getCompanionGuideForTool(tool.slug);

  useEffect(() => {
    updatePageSEO({
      title: tool.metaTitle || `${tool.title} – Practical Tools`,
      description: tool.metaDescription || tool.shortIntro,
      canonicalPath: tool.path || `/calculators/${tool.slug}`,
      breadcrumbs: [
        { name: 'Calculators', url: '/calculators' },
        { name: tool.category, url: `/category/${tool.category.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}` },
        { name: tool.shortTitle || tool.title },
      ],
      tool: tool,
      faqs: tool.faqs,
    });
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [tool]);

  const renderLazyCalculator = () => {
    switch (tool.slug) {
      case 'percentage':
      case 'percentage-calculator':
        return <PercentageCalculator />;
      case 'discount':
      case 'discount-calculator':
        return <DiscountCalculator />;
      case 'tip':
      case 'tip-calculator':
        return <TipCalculator />;
      case 'salary-to-hourly':
      case 'salary-to-hourly-calculator':
        return <SalaryCalculator />;
      case 'markup':
      case 'markup-calculator':
        return <MarkupCalculator />;
      case 'paint':
      case 'paint-calculator':
        return <PaintCalculator />;
      case 'flooring':
      case 'flooring-calculator':
        return <FlooringCalculator />;
      case 'tile':
      case 'tile-calculator':
        return <TileCalculator />;
      case 'concrete':
      case 'concrete-calculator':
        return <ConcreteCalculator />;
      case 'mulch':
      case 'mulch-calculator':
        return <MulchCalculator />;
      case 'fuel-cost':
      case 'fuel-cost-calculator':
        return <FuelCostCalculator />;
      case 'gas-mileage':
      case 'gas-mileage-calculator':
        return <GasMileageCalculator />;
      case 'commute-cost':
      case 'commute-cost-calculator':
        return <CommuteCostCalculator />;
      case 'electricity-cost':
      case 'electricity-cost-calculator':
        return <ElectricityCostCalculator />;
      case 'date-difference':
      case 'date-difference-calculator':
        return <DateDifferenceCalculator />;
      case 'recipe-scale':
      case 'recipe-scale-calculator':
        return <RecipeScaleCalculator />;
      case 'unit-converter':
      case 'cooking-unit-converter':
        return <CookingUnitConverter />;
      case 'cups-to-grams':
      case 'cups-to-grams-converter':
        return <CupsToGramsConverter />;
      case 'hours':
      case 'work-hours':
      case 'work-hours-calculator':
        return <WorkHoursCalculator />;
      case 'gpa':
      case 'gpa-calculator':
        return <GpaCalculator />;
      default:
        return (
          <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center text-slate-500">
            Calculator widget under active preparation.
          </div>
        );
    }
  };

  const renderCalculator = () => {
    // If a synchronous component registry was provided (during SSG prerendering), render directly
    if (calculatorRegistry) {
      const SyncComp = calculatorRegistry[tool.slug] || calculatorRegistry[`${tool.slug}-calculator`];
      if (SyncComp) {
        return <SyncComp />;
      }
    }

    // On the browser client, render the lazy-loaded code-split component inside Suspense
    return (
      <Suspense
        fallback={
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400 min-h-[320px] flex flex-col items-center justify-center animate-pulse">
            <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-slate-600 animate-spin mb-3"></div>
            <p className="text-sm font-medium">Loading interactive calculator...</p>
          </div>
        }
      >
        {renderLazyCalculator()}
      </Suspense>
    );
  };

  const breadcrumbs = [
    { name: 'Calculators', url: '/calculators' },
    { name: tool.category.replace('-', ' & '), url: `/category/${tool.category}` },
    { name: tool.title },
  ];

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8" id={`tool-page-${tool.slug}`}>
      {/* 1. Breadcrumbs */}
      <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

      {/* 2. Header & H1 */}
      <header className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
            {tool.category.replace('-', ' & ')}
          </span>
          {tool.badge && (
            <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
              {tool.badge}
            </span>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          {tool.title}
        </h1>
        {/* 3. Short Introduction */}
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          {tool.shortIntro}
        </p>
      </header>

      {/* 4, 5, 6. Calculator UI with Live Result & Reset Button */}
      <section className="mb-10" aria-label="Interactive Calculator">
        <Suspense
          fallback={
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400 min-h-[320px] flex flex-col items-center justify-center animate-pulse">
              <div className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-slate-600 animate-spin mb-3"></div>
              <p className="text-sm font-medium">Loading interactive calculator...</p>
            </div>
          }
        >
          {renderCalculator()}
        </Suspense>
      </section>

      {/* Optional Top Ad Slot */}
      <AdSlot id="tool-top-banner" />

      {/* 7. Formula & Equation Section */}
      <section className="my-10 p-6 sm:p-7 bg-white rounded-2xl border border-slate-200" aria-labelledby="formula-heading">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-700">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <h2 id="formula-heading" className="text-lg sm:text-xl font-bold text-slate-900">
            Mathematical Formula & Calculation Method
          </h2>
        </div>

        <div className="p-4 bg-slate-900 text-emerald-400 font-mono text-sm sm:text-base rounded-xl mb-4 overflow-x-auto">
          {tool.formulaDescription}
        </div>

        <div className="space-y-2 text-sm text-slate-600">
          <p className="font-semibold text-slate-900 text-xs uppercase tracking-wider">Formula Components:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            {tool.formulaExplanation.map((exp, idx) => (
              <li key={idx}>{exp}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8. How it works */}
      <section className="my-10 p-6 sm:p-7 bg-white rounded-2xl border border-slate-200" aria-labelledby="how-it-works-heading">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-700">
            <BookOpen className="w-3.5 h-3.5" />
          </div>
          <h2 id="how-it-works-heading" className="text-lg sm:text-xl font-bold text-slate-900">
            How It Works
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tool.howItWorks.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <p className="text-sm text-slate-700 leading-normal">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Concrete Examples */}
      <section className="my-10" aria-labelledby="examples-heading">
        <h2 id="examples-heading" className="text-xl font-bold text-slate-900 mb-4">
          Practical Calculation Examples
        </h2>
        <div className="space-y-4">
          {tool.examples.map((ex, idx) => (
            <div key={idx} className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200">
              <h3 className="text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>{ex.title}</span>
              </h3>
              <p className="text-sm text-slate-600 mb-3">{ex.scenario}</p>
              
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs font-mono text-slate-700 space-y-1 mb-3">
                {ex.steps.map((st, sIdx) => (
                  <div key={sIdx} className="flex gap-2">
                    <span className="text-slate-400">Step {sIdx + 1}:</span>
                    <span>{st}</span>
                  </div>
                ))}
              </div>

              <div className="text-sm font-semibold text-emerald-700 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-100">
                Outcome: {ex.result}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Important Assumptions */}
      {tool.assumptions && tool.assumptions.length > 0 && (
        <section className="my-10 p-6 sm:p-7 bg-white rounded-2xl border border-slate-200" aria-labelledby="assumptions-heading">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-700">
              <Info className="w-3.5 h-3.5" />
            </div>
            <h2 id="assumptions-heading" className="text-lg sm:text-xl font-bold text-slate-900">
              Important Assumptions & Estimator Guidance
            </h2>
          </div>
          <ul className="space-y-2.5 text-sm text-slate-700">
            {tool.assumptions.map((assumption, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                <span>{assumption}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Common Mistakes to Avoid */}
      {tool.commonMistakes && tool.commonMistakes.length > 0 && (
        <section className="my-10" aria-labelledby="mistakes-heading">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h2 id="mistakes-heading" className="text-xl font-bold text-slate-900">
              Common Pitfalls & Mistakes to Avoid
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tool.commonMistakes.map((m, idx) => (
              <div key={idx} className="p-5 bg-white rounded-xl border border-amber-200/80 shadow-2xs">
                <h3 className="font-semibold text-sm text-slate-900 mb-1.5">
                  {m.title}
                </h3>
                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                  {m.description}
                </p>
                <div className="text-xs font-medium text-amber-900 bg-amber-50 p-2 rounded border border-amber-100">
                  <strong>Correction:</strong> {m.fix}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 11. Companion Practical Guide Callout */}
      {companionGuide && (
        <section className="my-10 p-6 sm:p-7 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 shadow-2xs" aria-labelledby="companion-guide-heading">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded inline-block">
                In-Depth Companion Guide
              </span>
              <h2 id="companion-guide-heading" className="text-lg sm:text-xl font-bold text-slate-900">
                {companionGuide.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                {companionGuide.description}
              </p>
            </div>
            <a
              href={`/guides/${companionGuide.slug}`}
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate(`/guides/${companionGuide.slug}`);
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-xs"
            >
              <BookOpen className="w-4 h-4" />
              Read Companion Guide
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      )}

      {/* 12. FAQ Section */}
      <FAQSection faqs={tool.faqs} />

      {/* Secondary Ad Slot */}
      <AdSlot id="tool-bottom-banner" />

      {/* 12. Related Tools */}
      <RelatedTools tool={tool} onNavigate={onNavigate} />
    </article>
  );
};

