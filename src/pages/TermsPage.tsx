import React from 'react';
import { siteConfig } from '../data/site';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface TermsPageProps {
  onNavigate: (path: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[{ name: 'Terms of Service' }]} onNavigate={onNavigate} />

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Terms of Service
        </h1>
        <p className="text-xs text-slate-500">
          Last revised: January 2026 | Governing access to {siteConfig.brandName}
        </p>
      </header>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing and utilizing {siteConfig.brandName} ({siteConfig.domain}), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any portion of these terms, you should discontinue use of the website immediately.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">2. Nature of Services & Calculation Disclaimer</h2>
          <p className="mb-2">
            The tools, converters, formulas, and estimates presented on {siteConfig.brandName} are intended exclusively for general educational, estimation, and informational assistance.
          </p>
          <p className="p-3 bg-amber-50 rounded-lg text-amber-900 text-xs border border-amber-200">
            <strong>Important Notice:</strong> While we rigorously verify our algorithms against standard mathematical rules, we do not warrant that all results will be error-free or perfectly suited for every edge case. Calculations do not constitute certified tax, legal, structural, or financial counsel.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">3. Limitation of Liability</h2>
          <p>
            Under no circumstances shall {siteConfig.brandName}, its authors, or contributors be held liable for any direct, indirect, incidental, or consequential damages arising from reliance upon the calculations, estimates, or content provided on this website. Users assume full responsibility for verifying critical calculations prior to entering financial contracts, purchasing materials, or taking legal actions.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">4. Intellectual Property</h2>
          <p>
            All original text, formulas layout, site architecture, and user interface designs are the intellectual property of {siteConfig.brandName}. You may freely use our calculators for personal or internal commercial calculations, but bulk scraping, automated extraction, or re-publishing of our proprietary content without attribution is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">5. Governing Law & Inquiries</h2>
          <p>
            These terms are governed by standard international web publishing conventions. For questions regarding these terms, please contact us at{' '}
            <strong className="text-slate-900">{siteConfig.contactEmail}</strong>.
          </p>
        </section>
      </div>
    </article>
  );
};
