import React from 'react';
import { siteConfig } from '../data/site';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShieldCheck, Target, Sparkles, UserCheck } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[{ name: 'About' }]} onNavigate={onNavigate} />

      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          About {siteConfig.brandName}
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          {siteConfig.positioning} Fast, accurate, and completely transparent online calculators designed to cut through confusion.
        </p>
      </header>

      <div className="space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Our Mission
          </h2>
          <p className="mb-3">
            Every day, millions of people search for simple answers: <em>&ldquo;How much tip should I leave?&rdquo;</em>, <em>&ldquo;What is 15% off $85?&rdquo;</em>, or <em>&ldquo;How many gallons of paint do I need for my bedroom?&rdquo;</em>
          </p>
          <p>
            Too often, search results lead to bloated websites covered in spammy banner ads, forced signups, and confusing interfaces. {siteConfig.brandName} was created as an antidote: a clean, responsive, editorial utility website where everyday calculations happen instantly and privately right in your browser.
          </p>
        </section>

        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            Our Editorial & Mathematical Principles
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900">1. Formula Openness</h3>
              <p className="text-sm text-slate-600 mt-1">
                We believe a calculation is only trustworthy if you can inspect how it was derived. Every calculator on our platform shows the mathematical formula and provides an arithmetic breakdown.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">2. Real-World Honesty</h3>
              <p className="text-sm text-slate-600 mt-1">
                When tools involve physical estimates (like paint surface coverage or fuel consumption), we explicitly distinguish between theoretical numbers and real-world results, highlighting sensible safety buffers and texture variances.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">3. Privacy by Architecture</h3>
              <p className="text-sm text-slate-600 mt-1">
                All math is computed locally via modern client-side JavaScript. Your salary numbers, bill amounts, and travel distances are never sent to or logged on remote servers.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-slate-700" />
            General Information Disclaimer
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Calculations and educational content published on {siteConfig.brandName} are intended for general planning and informational purposes only. They do not constitute formal legal, architectural, structural, or certified tax advice. For high-stakes decisions, always consult a certified professional in your jurisdiction.
          </p>
        </section>
      </div>
    </article>
  );
};
