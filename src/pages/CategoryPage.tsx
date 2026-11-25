import React from 'react';
import { categories } from '../data/categories';
import { getToolsByCategory } from '../data/tools';
import { guides } from '../data/guides';
import { ToolCard } from '../components/ToolCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BookOpen, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

interface CategoryPageProps {
  categorySlug: string;
  onNavigate: (path: string) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categorySlug, onNavigate }) => {
  const category = categories.find((c) => c.slug === categorySlug);
  const categoryTools = getToolsByCategory(categorySlug);
  const categoryGuides = guides.filter((g) => g.category.toLowerCase().includes(categorySlug.toLowerCase()) || 
    (categorySlug === 'everyday' && g.category.toLowerCase().includes('daily')) ||
    (categorySlug === 'home' && g.category.toLowerCase().includes('home'))
  );

  const handleNav = (path: string, e?: React.MouseEvent) => {
    if (onNavigate) {
      if (e) e.preventDefault();
      onNavigate(path);
    }
  };

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 min-[420px]:px-5 sm:px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Category Not Found</h1>
        <p className="text-sm text-slate-500 mb-6">The requested tool category could not be located.</p>
        <a
          href="/calculators"
          onClick={(e) => handleNav('/calculators', e)}
          className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg inline-block"
        >
          View All Tools
        </a>
      </div>
    );
  }

  const breadcrumbs = [
    { name: 'Calculators', url: '/calculators' },
    { name: category.name },
  ];

  // Specific domain tips and calculation guidelines per category
  const domainGuidelines: Record<string, { title: string; tips: string[] }> = {
    money: {
      title: 'Financial Calculation Best Practices',
      tips: [
        'Always clarify whether a discount applies before or after local sales taxes are levied.',
        'Remember that markup percentage is calculated on cost, whereas gross margin is calculated on selling price.',
        'For salary conversions, account for paid time off, healthcare deductions, and non-working federal holidays when estimating hourly value.',
      ],
    },
    home: {
      title: 'Material Estimation & Waste Factor Guidelines',
      tips: [
        'Use an illustrative waste buffer suited to your layout—often around 10% for straight flooring or grid tile, 15% for diagonal installations or obstacles, and 20% for herringbone patterns—adjusting for room shape.',
        'When estimating interior paint, editable planning defaults subtract 20 sq ft per standard door and 15 sq ft per standard window and compare fractional gallons against gallon-plus-quart container mixes.',
        'Concrete and mulch tools output exact decimal cubic yards and whole retail bags; verify local bulk-delivery minimums (often half-yard or full-yard increments) or add an extra bag before ordering.',
      ],
    },
    everyday: {
      title: 'Everyday Travel & Energy Calculation Tips',
      tips: [
        'Use the odometer two-fill-up method rather than dashboard trip computer averages for verifiable gas mileage records.',
        'Electricity cost calculations should factor in seasonal utility rate tiers and phantom standby power draw from idle appliances.',
        'When budgeting daily commutes, include parking permits, highway tolls, and routine vehicle maintenance alongside pure fuel expenditure.',
      ],
    },
    cooking: {
      title: 'Culinary Conversion & Scaling Rules',
      tips: [
        'Baking yields benefit substantially from weight measurements (grams) over volume (cups), particularly for flour which compacts easily.',
        'When doubling or tripling recipes, seasonings, leaveners (baking soda/powder), and alcohol should often be scaled at 1.5× initially rather than strictly multiplied.',
        'Liquid measuring cups (with pouring spouts) measure volume differently from level-top dry measuring cups; use the appropriate vessel.',
      ],
    },
    'work-school': {
      title: 'Time Card & Academic Calculation Principles',
      tips: [
        'Deduct unpaid meal breaks (such as 30–60 minutes) from gross clock-in and clock-out times to determine net shift hours and payroll decimal hours.',
        'Weighted GPAs may assign bonus grade points (such as +0.5 Honors or +1.0 AP/IB on a 5.0 scale) depending on institutional grading policies.',
        'Under the federal Fair Labor Standards Act (FLSA), nonexempt overtime (1.5× regular rate) applies after 40 hours in a fixed 168-hour workweek, while certain states also enforce daily overtime thresholds such as hours over 8 in a day.',
      ],
    },
  };

  const currentGuidelines = domainGuidelines[category.slug];

  return (
    <div className="max-w-6xl mx-auto px-4 min-[420px]:px-5 sm:px-6 py-8">
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

      {/* Calculators Grid */}
      <section className="mb-12" aria-labelledby="tools-heading">
        <h2 id="tools-heading" className="text-xl font-bold text-slate-900 mb-4">
          Available {category.name} Tools
        </h2>
        {categoryTools.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-slate-600 text-sm">Calculators for this category are in development.</p>
            <a
              href="/calculators"
              onClick={(e) => handleNav('/calculators', e)}
              className="mt-3 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold inline-block"
            >
              Explore Other Calculators
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </section>

      {/* Concise Tool Choosers for Overlapping Multi-Tool Categories */}
      {category.slug === 'everyday' && (
        <section className="mb-12 p-5 sm:p-6 bg-white rounded-2xl border border-slate-200" aria-labelledby="driving-chooser-heading">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
            <h2 id="driving-chooser-heading" className="text-base sm:text-lg font-bold text-slate-900">
              Which Driving Calculator Should I Use?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <a
              href="/calculators/fuel-cost"
              onClick={(e) => handleNav('/calculators/fuel-cost', e)}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-colors block"
            >
              <div className="font-bold text-slate-900 mb-1">Fuel Cost Calculator →</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Best for a single road trip when you already know total distance, vehicle MPG, and gas price.
              </p>
            </a>
            <a
              href="/calculators/gas-mileage"
              onClick={(e) => handleNav('/calculators/gas-mileage', e)}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-colors block"
            >
              <div className="font-bold text-slate-900 mb-1">Gas Mileage Calculator →</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Best at the pump to measure real-world MPG (or L/100 km) from trip odometer miles and gallons filled.
              </p>
            </a>
            <a
              href="/calculators/commute-cost"
              onClick={(e) => handleNav('/calculators/commute-cost', e)}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-colors block"
            >
              <div className="font-bold text-slate-900 mb-1">Commute Cost Calculator →</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Best for budgeting recurring weekly, monthly, and annual drive-to-work costs including parking and tolls.
              </p>
            </a>
          </div>
        </section>
      )}

      {category.slug === 'cooking' && (
        <section className="mb-12 p-5 sm:p-6 bg-white rounded-2xl border border-slate-200" aria-labelledby="cooking-chooser-heading">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
            <h2 id="cooking-chooser-heading" className="text-base sm:text-lg font-bold text-slate-900">
              Which Kitchen Tool Should I Use?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <a
              href="/calculators/unit-converter"
              onClick={(e) => handleNav('/calculators/unit-converter', e)}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-colors block"
            >
              <div className="font-bold text-slate-900 mb-1">Cooking Unit Converter →</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Convert kitchen volumes (cups, tablespoons, teaspoons, mL, fl oz) when ingredients do not change physical state.
              </p>
            </a>
            <a
              href="/calculators/cups-to-grams"
              onClick={(e) => handleNav('/calculators/cups-to-grams', e)}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-colors block"
            >
              <div className="font-bold text-slate-900 mb-1">Cups to Grams Converter →</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Convert baking cups to digital scale weight (grams &amp; ounces) using ingredient-specific density for flour, sugar, or butter.
              </p>
            </a>
            <a
              href="/calculators/recipe-scale"
              onClick={(e) => handleNav('/calculators/recipe-scale', e)}
              className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-colors block"
            >
              <div className="font-bold text-slate-900 mb-1">Recipe Scale Calculator →</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Multiply or halve an entire list of ingredients cleanly from original recipe servings to target servings.
              </p>
            </a>
          </div>
        </section>
      )}

      {/* Relevant Guides Section if any exist for this category */}
      {categoryGuides.length > 0 && (
        <section className="mb-12 pt-8 border-t border-slate-200" aria-labelledby="guides-heading">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 id="guides-heading" className="text-xl font-bold text-slate-900">
                Practical Guides for {category.name}
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                In-depth mathematical breakdowns, worked scenarios, and common pitfalls explained.
              </p>
            </div>
            <a
              href="/guides"
              onClick={(e) => handleNav('/guides', e)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 hidden sm:flex"
            >
              All Guides <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryGuides.map((guide) => (
              <a
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                onClick={(e) => handleNav(`/guides/${guide.slug}`, e)}
                className="group p-5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-2xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                    <span>{guide.readingTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {guide.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Practical Estimation & Methodology Guidance */}
      {currentGuidelines && (
        <section className="p-6 sm:p-7 bg-slate-50 rounded-2xl border border-slate-200" aria-labelledby="guidelines-heading">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h2 id="guidelines-heading" className="text-lg sm:text-xl font-bold text-slate-900">
              {currentGuidelines.title}
            </h2>
          </div>
          <ul className="space-y-2.5 text-sm text-slate-700">
            {currentGuidelines.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

