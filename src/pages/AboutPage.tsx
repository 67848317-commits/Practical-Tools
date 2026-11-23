import React from 'react';
import { siteConfig } from '../data/site';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShieldCheck, Target, Sparkles, BookOpen, CheckCircle2, Lock, Cpu, ExternalLink } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[{ name: 'About & Methodology' }]} onNavigate={onNavigate} />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          About {siteConfig.brandName} &amp; Calculation Methodology
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          {siteConfig.positioning} Editorial standards, technical reference bibliography, and calculation methodologies for every tool on Practical Tools.
        </p>
      </header>

      <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        {/* Mission Section */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600 shrink-0" />
            Our Editorial Mandate
          </h2>
          <p className="mb-3">
            Every day, millions of homeowners, students, DIY builders, and consumers search for straightforward quantitative answers: <em>&ldquo;How many bags of concrete do I need for a 10×20 slab?&rdquo;</em>, <em>&ldquo;What is 20% off $85?&rdquo;</em>, or <em>&ldquo;How many grams is 1 1/2 cups of all-purpose flour?&rdquo;</em>
          </p>
          <p className="mb-3">
            Too often, search results lead to bloated web pages cluttered with intrusive banner ads, slow popups, forced signups, and &ldquo;black-box&rdquo; calculators that display a single number without showing the underlying formula or real-world practicalities.
          </p>
          <p>
            <strong>{siteConfig.brandName}</strong> was founded as an antidote: a clean, high-speed, editorially transparent utility website where essential computations happen instantly in your browser, backed by authoritative industry standards and clear arithmetic breakdowns.
          </p>
        </section>

        {/* Calculation Principles */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
            Core Calculation &amp; Engineering Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Zero Black-Box Formulas
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculations must be inspectable. Every tool prints its exact mathematical formula and step-by-step arithmetic derivation so users can verify the numbers themselves.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Real-World Decision Value
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                A mathematical formula alone rarely solves a physical problem. Our calculators bridge the gap to real-world decisions—like converting concrete volume into physical bag weight for vehicle safety, or suggesting gallon and quart combinations to avoid surplus paint waste.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-sm">
                <Lock className="w-4 h-4 text-blue-600 shrink-0" />
                Client-Side Privacy
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your personal inputs—salaries, home dimensions, power bills, and GPA grades—are computed strictly inside your browser. No personal calculation input is transmitted to or logged on our servers.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Reference Bibliography */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600 shrink-0" />
            Standards &amp; Technical Reference Bibliography
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            To ensure factual precision and prevent arbitrary assertions, our calculators anchor formulas and defaults against verified primary sources, explicitly distinguishing government statistical data, manufacturer product specifications, professional baking references, and editable trade planning estimates:
          </p>

          <div className="space-y-5">
            {/* 1. Concrete */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div>
                  <span className="font-bold text-slate-900 text-sm sm:text-base">Commercial Premix Concrete Yields &amp; Volume Geometry</span>
                  <span className="ml-2 text-[10px] uppercase font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                    Manufacturer Specifications
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded w-fit">
                  Concrete Calculator
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                Exact slab volume uses standard geometric conversion (1 cubic yard = 27 cubic feet = 46,656 cubic inches). Product-specific premixed concrete bag yields are cited directly from manufacturer Technical Data Sheets rather than universal ASTM mandates: QUIKRETE® Concrete Mix (#1101) technical documentation specifies ~0.60 cu ft per 80-lb bag, ~0.45 cu ft per 60-lb bag, and ~0.30 cu ft per 40-lb bag (meeting ASTM C387 compressive strength criteria). Sakrete® High-Strength Concrete TDS similarly documents yields of ~0.60 cu ft for 80-lb and ~0.45 cu ft for 60-lb bags. Because commercial 50-lb premixed concrete bags are not listed on these cited datasheets, our 50-lb default (~0.375 cu ft) is provided as an editable proportional planning estimate (based on ~133 lbs/cu ft aggregate density). Users can adjust the bag yield field directly to match the net volume printed on their specific product bag label.
              </p>
              <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-200/60 text-xs">
                <a
                  href="https://www.quikrete.com/pdfs/spec_data-concretemix.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  <span>QUIKRETE® Concrete Mix (#1101) Technical Data Sheet (PDF)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-slate-300">|</span>
                <a
                  href="https://www.sakrete.com/wp-content/uploads/2024/01/Sakrete-High-Strength-Concrete-Mix-TDS.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  <span>Sakrete® High-Strength Concrete Mix Technical Data Sheet (PDF)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 2. Electricity */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div>
                  <span className="font-bold text-slate-900 text-sm sm:text-base">U.S. Energy Information Administration (EIA)</span>
                  <span className="ml-2 text-[10px] uppercase font-semibold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                    Government Statistical Data
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded w-fit">
                  Electricity Cost Calculator
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                <strong>Electric Power Annual (Table 2.10 — Average Retail Price of Electricity to Ultimate Customers by End-Use Sector, by State):</strong> Presets are calibrated to official EIA Table 2.10 data for 2024 residential sector annual averages (U.S. total residential annual average of 16.48¢/kWh [~$0.165/kWh]; Washington at 11.90¢/kWh [~$0.119/kWh]; Texas at 14.94¢/kWh [~$0.149/kWh]; California at 31.97¢/kWh [~$0.320/kWh]; and Hawaii at 42.86¢/kWh [~$0.429/kWh]). These benchmark averages are point-in-time annual reference values and do not represent individual current household tariffs. Actual electric bills depend on local utility rates, transmission delivery fees, monthly fixed meter charges, seasonal tiers, time-of-use pricing, and municipal taxes. The electricity rate input is fully editable.
              </p>
              <div className="pt-2 border-t border-slate-200/60 text-xs">
                <a
                  href="https://www.eia.gov/electricity/annual/table.php?t=epa_02_10.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  <span>U.S. EIA Electric Power Annual Table 2.10: 2024 Residential Electricity Prices by State</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 3. Flooring */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div>
                  <span className="font-bold text-slate-900 text-sm sm:text-base">Flooring Material Planning &amp; Waste Allowances</span>
                  <span className="ml-2 text-[10px] uppercase font-semibold text-slate-700 bg-slate-200/70 px-2 py-0.5 rounded">
                    Trade Planning Allowances
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded w-fit">
                  Flooring &amp; Tile Calculators
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Preset waste allowances (10% straight planks, 15% diagonal layouts, 20% herringbone/chevron patterns) represent illustrative trade planning conventions, not mandatory association standards. Material cut loss is not determined solely by installation pattern; actual scrap is significantly influenced by room perimeter geometry (hallways, closets, alcoves), plank width/length, installer skill, manufacturer defect culling tolerances, and carton packaging rounding. Our calculator keeps waste percentages fully customizable and computes whole unopened carton purchasing math.
              </p>
            </div>

            {/* 4. Architectural Openings */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div>
                  <span className="font-bold text-slate-900 text-sm sm:text-base">Architectural Opening Deductions</span>
                  <span className="ml-2 text-[10px] uppercase font-semibold text-slate-700 bg-slate-200/70 px-2 py-0.5 rounded">
                    Trade Estimating Practice
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded w-fit">
                  Paint Calculator
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Standard opening deductions (~20 sq ft per passage door, ~15 sq ft per double-hung window) are illustrative trade planning allowances rather than building code mandates. (Building codes such as the IRC specify minimum clear dimensions for egress rather than painting finish allowances.) Controls accept deduction area per opening (in sq ft or m²), with metric values (1.86 m² per door, 1.39 m² per window) mathematically converted from US customary defaults. The calculation clamps net wall area at zero, ensuring deductions cannot produce negative wall areas or negative paint orders.
              </p>
            </div>

            {/* 5. Paint Coverage & Container Sizing */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div>
                  <span className="font-bold text-slate-900 text-sm sm:text-base">Architectural Coatings Coverage &amp; Package Sizing</span>
                  <span className="ml-2 text-[10px] uppercase font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                    Manufacturer Specifications
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded w-fit">
                  Paint Calculator &amp; Guides
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Spreading rates (350–400 sq ft/gal on smooth primed drywall; 250–300 sq ft/gal on textured surfaces; 150–200 sq ft/gal on masonry/stucco) reflect architectural coatings manufacturer Technical Data Sheets (Sherwin-Williams and Benjamin Moore). The suggested retail package combination (whole gallons plus quarts for fractional needs up to 0.5 gal) reflects standard retail packaging (1 gallon = 4 quarts = 128 fl oz) to provide sufficient volume while reducing leftover paint, without making unverified price-saving claims.
              </p>
            </div>

            {/* 6. Culinary Ingredient Densities */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div>
                  <span className="font-bold text-slate-900 text-sm sm:text-base">Culinary Bulk Densities &amp; Ingredient References</span>
                  <span className="ml-2 text-[10px] uppercase font-semibold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded">
                    Ingredient Weight Reference
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded w-fit">
                  Cups to Grams &amp; Cooking Converters
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                Ingredient density conversions in our culinary utilities are referenced against respected professional baking guidelines and public food science databases. The King Arthur Baking Company Master Ingredient Weight Chart serves as a widely recognized professional baking reference for common home and commercial baking conversions (it is a practical industry reference, not a regulatory standards authority). The USDA FoodData Central database is maintained as a comprehensive public government food composition database rather than an official culinary conversion standard. Different ingredients across our broader catalog (such as sugars, leaveners, dairy, and liquids) reference respective food science benchmarks rather than a single source. For all-purpose flour, calculations explicitly account for measurement technique: gently &ldquo;spooned and leveled&rdquo; flour weighs approximately 120 grams per US cup (4.25 oz), whereas compacted &ldquo;dipped and scooped&rdquo; flour weighs 140 to 150 grams per cup, which can cause dense or dry baked goods.
              </p>
              <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-200/60 text-xs">
                <a
                  href="https://www.kingarthurbaking.com/learn/ingredient-weight-chart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  <span>King Arthur Baking Master Ingredient Weight Chart (Professional Reference)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-slate-300">|</span>
                <a
                  href="https://fdc.nal.usda.gov/fdc-app.html#/food-details/168893/nutrients"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  <span>USDA FoodData Central: All-Purpose Wheat Flour Density (Government Food Database, FDC ID 168893)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Assurance & Verification */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-slate-800 shrink-0" />
            Automated Quality Assurance &amp; Verification
          </h2>
          <p className="mb-3 text-xs sm:text-sm text-slate-600">
            Before publishing updates, we run automated verification checks across our calculator modules and static pages:
          </p>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-1.5 leading-relaxed">
            <li><strong>Automated Test Suite:</strong> All 20 calculator modules are checked by an automated test script covering representative normal inputs, zero-value handling, boundary limits, invalid or empty inputs, and calculator-specific special cases (such as overnight shifts, leap-year dates, and unit conversions). While these checks help catch regressions, users should verify critical figures independently.</li>
            <li><strong>Static Pre-rendering:</strong> All 20 calculators, 8 practical guides, category indexes, and site pages are pre-rendered to static HTML during the build process.</li>
            <li><strong>Periodic Review:</strong> Reference benchmarks (such as EIA electricity rate averages and manufacturer material specifications) are periodically reviewed and updated against published source documents.</li>
          </ul>
        </section>

        {/* Disclaimer */}
        <section className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-slate-700 shrink-0" />
            General Planning Disclaimer
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Calculations and educational content published on {siteConfig.brandName} are intended for estimation, purchasing planning, and educational purposes. They do not substitute for formal structural engineering calculations, certified electrical load assessments, licensed architectural plans, or formal tax filings. Always verify vehicle payload capacities via manufacturer door-jamb placards before transporting heavy materials, and consult certified trade professionals for hazardous or permitted work.
          </p>
        </section>
      </div>
    </article>
  );
};
