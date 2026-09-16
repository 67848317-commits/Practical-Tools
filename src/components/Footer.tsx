import React from 'react';
import { Calculator, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/site';
import { categories } from '../data/categories';
import { tools } from '../data/tools';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLink = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-white border-t border-slate-200 mt-20 text-slate-600">
      {/* Trust & Guarantee Banner */}
      <div className="border-b border-slate-100 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Private & Client-Side</h4>
                <p className="text-slate-500 text-xs mt-1">
                  All math runs directly inside your browser. No sensitive financial inputs are sent to remote servers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Immediate Calculations</h4>
                <p className="text-slate-500 text-xs mt-1">
                  Instant results as you type with transparent formulas, step-by-step arithmetic, and zero lag.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-900">Formula Transparency</h4>
                <p className="text-slate-500 text-xs mt-1">
                  Every tool documents the underlying mathematical equations, standard rules, and real-world caveats.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="inline-flex items-center gap-2 text-slate-900 font-bold text-lg"
            >
              <div className="w-7 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs">
                <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span>{siteConfig.brandName}</span>
            </a>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              {siteConfig.positioning} Fast, reliable, and accessible online calculators designed to help you make informed everyday choices without distractions.
            </p>
            <div className="text-xs text-slate-400">
              Free educational & decision utilities. Built for clarity and speed.
            </div>
          </div>

          {/* Popular Calculators */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Popular Tools
            </h4>
            <ul className="space-y-2 text-sm">
              {tools.map((t) => (
                <li key={t.slug}>
                  <a
                    href={`/calculators/${t.slug}`}
                    onClick={(e) => handleLink(e, `/calculators/${t.slug}`)}
                    className="hover:text-slate-900 transition-colors"
                  >
                    {t.shortTitle}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-sm">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <a
                    href={`/category/${cat.slug}`}
                    onClick={(e) => handleLink(e, `/category/${cat.slug}`)}
                    className="hover:text-slate-900 transition-colors"
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/calculators"
                  onClick={(e) => handleLink(e, '/calculators')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View All Tools →
                </a>
              </li>
            </ul>
          </div>

          {/* About & Trust */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Information & Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleLink(e, '/about')}
                  className="hover:text-slate-900 transition-colors"
                >
                  About Practical Tools
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleLink(e, '/contact')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Contact & Feedback
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  onClick={(e) => handleLink(e, '/privacy')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  onClick={(e) => handleLink(e, '/terms')}
                  className="hover:text-slate-900 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Bottom bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center md:text-left max-w-2xl leading-relaxed">
            <strong>Disclaimer:</strong> {siteConfig.brandName} calculations are provided for general educational, estimation, and planning purposes only. We do not provide certified tax, legal, architectural, or certified financial advice. Verify critical estimates with licensed professionals.
          </p>
          <div className="shrink-0">
            © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
