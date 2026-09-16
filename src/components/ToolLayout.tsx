import React, { useEffect } from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { FAQSection } from './FAQSection';
import { RelatedTools } from './RelatedTools';
import { AdSlot } from './AdSlot';
import { PercentageCalculator } from './calculators/PercentageCalculator';
import { DiscountCalculator } from './calculators/DiscountCalculator';
import { TipCalculator } from './calculators/TipCalculator';
import { SalaryCalculator } from './calculators/SalaryCalculator';
import { PaintCalculator } from './calculators/PaintCalculator';
import { FuelCostCalculator } from './calculators/FuelCostCalculator';
import { MarkupCalculator } from './calculators/MarkupCalculator';
import { FlooringCalculator } from './calculators/FlooringCalculator';
import { TileCalculator } from './calculators/TileCalculator';
import { ConcreteCalculator } from './calculators/ConcreteCalculator';
import { MulchCalculator } from './calculators/MulchCalculator';
import { GasMileageCalculator } from './calculators/GasMileageCalculator';
import { CommuteCostCalculator } from './calculators/CommuteCostCalculator';
import { ElectricityCostCalculator } from './calculators/ElectricityCostCalculator';
import { DateDifferenceCalculator } from './calculators/DateDifferenceCalculator';
import { RecipeScaleCalculator } from './calculators/RecipeScaleCalculator';
import { CookingUnitConverter } from './calculators/CookingUnitConverter';
import { CupsToGramsConverter } from './calculators/CupsToGramsConverter';
import { WorkHoursCalculator } from './calculators/WorkHoursCalculator';
import { GpaCalculator } from './calculators/GpaCalculator';
import type { ToolDefinition } from '../types';
import { BookOpen, AlertTriangle, Check, Sparkles, Info } from 'lucide-react';

interface ToolLayoutProps {
  tool: ToolDefinition;
  onNavigate: (path: string) => void;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({ tool, onNavigate }) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = tool.metaTitle || `${tool.title} – Practical Tools`;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', tool.metaDescription || tool.shortIntro);

    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(property.startsWith('og:') ? 'property' : 'name', property);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('og:title', tool.metaTitle || tool.title);
    setMeta('og:description', tool.metaDescription || tool.shortIntro);
    const fullUrl = `https://practicaltools.org${tool.path || `/calculators/${tool.slug}`}`;
    setMeta('og:url', fullUrl);
    setMeta('twitter:title', tool.metaTitle || tool.title);
    setMeta('twitter:description', tool.metaDescription || tool.shortIntro);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    const scriptId = 'tool-schema-jsonld';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebApplication',
          '@id': `${fullUrl}#webapp`,
          'name': tool.title,
          'url': fullUrl,
          'description': tool.metaDescription || tool.shortIntro,
          'applicationCategory': 'UtilityApplication',
          'operatingSystem': 'All',
          'offers': {
            '@type': 'Offer',
            'price': '0',
            'priceCurrency': 'USD',
          },
        },
        {
          '@type': 'WebPage',
          '@id': `${fullUrl}#webpage`,
          'url': fullUrl,
          'name': tool.metaTitle || tool.title,
          'description': tool.metaDescription || tool.shortIntro,
          'breadcrumb': {
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Calculators',
                'item': 'https://practicaltools.org/calculators',
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': tool.category.replace('-', ' & '),
                'item': `https://practicaltools.org/category/${tool.category}`,
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': tool.title,
                'item': fullUrl,
              },
            ],
          },
        },
        ...(tool.faqs && tool.faqs.length > 0
          ? [
              {
                '@type': 'FAQPage',
                '@id': `${fullUrl}#faq`,
                'mainEntity': tool.faqs.map((faq) => ({
                  '@type': 'Question',
                  'name': faq.question,
                  'acceptedAnswer': {
                    '@type': 'Answer',
                    'text': faq.answer,
                  },
                })),
              },
            ]
          : []),
      ],
    };

    scriptEl.text = JSON.stringify(schemaData);

    return () => {
      document.title = originalTitle;
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [tool]);

  const renderCalculator = () => {
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
        {renderCalculator()}
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

      {/* 11. FAQ Section */}
      <FAQSection faqs={tool.faqs} />

      {/* Secondary Ad Slot */}
      <AdSlot id="tool-bottom-banner" />

      {/* 12. Related Tools */}
      <RelatedTools tool={tool} onNavigate={onNavigate} />
    </article>
  );
};

