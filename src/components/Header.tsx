import React, { useState, useEffect } from 'react';
import { Search, Menu, X, Calculator, ArrowRight } from 'lucide-react';
import { siteConfig } from '../data/site';
import { categories } from '../data/categories';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on escape or navigate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#fbfbfa]/90 backdrop-blur-md border-b border-[#e5e5e0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center gap-2.5 text-slate-900 group focus:outline-none"
          id="brand-logo-link"
        >
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-xs group-hover:bg-slate-800 transition-colors">
            <Calculator className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-base sm:text-lg text-slate-900 leading-tight">
              {siteConfig.brandName}
            </span>
            <span className="hidden sm:inline-block text-[11px] text-slate-500 font-medium leading-none">
              {siteConfig.positioning}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600" aria-label="Main Navigation">
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              currentPath === '/' ? 'text-slate-900 bg-slate-100 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Home
          </a>
          <a
            href="/calculators"
            onClick={(e) => handleLinkClick(e, '/calculators')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              currentPath.startsWith('/calculators') ? 'text-slate-900 bg-slate-100 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            All Tools
          </a>
          <a
            href="/guides"
            onClick={(e) => handleLinkClick(e, '/guides')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              currentPath.startsWith('/guides') ? 'text-slate-900 bg-slate-100 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Guides
          </a>
          <a
            href="/category/money"
            onClick={(e) => handleLinkClick(e, '/category/money')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              currentPath === '/category/money' ? 'text-slate-900 bg-slate-100 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Money
          </a>
          <a
            href="/category/home"
            onClick={(e) => handleLinkClick(e, '/category/home')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              currentPath === '/category/home' ? 'text-slate-900 bg-slate-100 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Home
          </a>
          <a
            href="/about"
            onClick={(e) => handleLinkClick(e, '/about')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              currentPath === '/about' ? 'text-slate-900 bg-slate-100 font-semibold' : 'hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            About
          </a>
        </nav>

        {/* Search button & Mobile Menu button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs hover:border-slate-300 transition-all focus:outline-none"
            aria-label="Search tools"
            id="nav-search-button"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search calculators...</span>
            <span className="sm:hidden">Search</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-100 text-slate-500 border border-slate-200 rounded">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-[#fbfbfa] px-4 py-4 space-y-3 shadow-lg animate-in fade-in duration-150">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2">Navigation</div>
          <nav className="flex flex-col space-y-1 text-sm font-medium text-slate-700">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="px-3 py-2 rounded-md hover:bg-slate-100 transition-colors"
            >
              Home
            </a>
            <a
              href="/calculators"
              onClick={(e) => handleLinkClick(e, '/calculators')}
              className="px-3 py-2 rounded-md hover:bg-slate-100 transition-colors"
            >
              All Calculators & Tools
            </a>
            <a
              href="/guides"
              onClick={(e) => handleLinkClick(e, '/guides')}
              className="px-3 py-2 rounded-md hover:bg-slate-100 transition-colors font-medium text-slate-900"
            >
              Guides & Practical Knowledge
            </a>
            <div className="pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-400 px-2">Categories</div>
            {categories.slice(0, 5).map((cat) => (
              <a
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={(e) => handleLinkClick(e, `/category/${cat.slug}`)}
                className="px-3 py-2 rounded-md hover:bg-slate-100 transition-colors flex items-center justify-between text-slate-600 hover:text-slate-900"
              >
                <span>{cat.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            ))}
            <div className="pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-400 px-2">Information</div>
            <a
              href="/about"
              onClick={(e) => handleLinkClick(e, '/about')}
              className="px-3 py-2 rounded-md hover:bg-slate-100 transition-colors"
            >
              About & Methodology
            </a>
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className="px-3 py-2 rounded-md hover:bg-slate-100 transition-colors"
            >
              Contact Us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
