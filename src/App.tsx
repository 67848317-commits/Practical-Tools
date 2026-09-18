import React, { useState, useEffect } from 'react';
import { siteConfig } from './data/site';
import { getToolBySlug, tools } from './data/tools';
import { categories } from './data/categories';
import { updatePageSEO } from './utils/seo';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { ToolLayout } from './components/ToolLayout';

import { HomePage } from './pages/HomePage';
import { AllToolsPage } from './pages/AllToolsPage';
import { CategoryPage } from './pages/CategoryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { GuidePage } from './pages/GuidePage';
import { GuidesIndexPage } from './pages/GuidesIndexPage';

export default function App() {
  // Normalize current path from window.location.pathname or default to '/'
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  // Synchronize browser history and back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global keyboard shortcut for search (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Route Navigation Handler
  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // SEO Update on path change
  useEffect(() => {
    // Clean trailing slash (except root '/')
    const normalized = currentPath.length > 1 && currentPath.endsWith('/')
      ? currentPath.slice(0, -1)
      : currentPath;

    // 1. Tool Page: /calculators/:slug
    if (normalized.startsWith('/calculators/')) {
      const slug = normalized.replace('/calculators/', '').split('/')[0];
      const tool = getToolBySlug(slug);
      if (tool) {
        updatePageSEO({
          title: tool.metaTitle,
          description: tool.metaDescription,
          canonicalPath: `/calculators/${tool.slug}`,
          type: 'article',
          tool: tool,
          breadcrumbs: [
            { name: 'Calculators', url: '/calculators' },
            { name: tool.category.replace('-', ' & '), url: `/category/${tool.category}` },
            { name: tool.title },
          ],
          faqs: tool.faqs,
        });
        return;
      }
    }

    // 2. All Calculators Directory: /calculators or /categories or /all-tools
    if (normalized === '/calculators' || normalized === '/categories' || normalized === '/all-tools') {
      updatePageSEO({
        title: 'All Calculators & Everyday Decision Tools',
        description: 'Explore our complete index of fast, client-side practical calculators for everyday finance, math, home improvement, and planning.',
        canonicalPath: '/calculators',
        breadcrumbs: [{ name: 'All Calculators' }],
      });
      return;
    }

    // 3. Category Page: /category/:slug or /categories/:slug
    if (normalized.startsWith('/category/') || normalized.startsWith('/categories/')) {
      const catSlug = normalized.startsWith('/category/')
        ? normalized.replace('/category/', '').split('/')[0]
        : normalized.replace('/categories/', '').split('/')[0];
      const category = categories.find((c) => c.slug === catSlug);
      if (category) {
        updatePageSEO({
          title: `${category.name} Calculators & Practical Decision Tools`,
          description: category.description,
          canonicalPath: `/category/${category.slug}`,
          breadcrumbs: [
            { name: 'Calculators', url: '/calculators' },
            { name: category.name },
          ],
        });
        return;
      }
    }

    // 4. About Page: /about
    if (currentPath === '/about') {
      updatePageSEO({
        title: `About Our Methodology & Mission`,
        description: `Learn why ${siteConfig.brandName} is built for mathematical integrity, client-side privacy, and honest decision-making tools without promotional clutter.`,
        canonicalPath: '/about',
        breadcrumbs: [{ name: 'About' }],
      });
      return;
    }

    // 5. Contact Page: /contact
    if (currentPath === '/contact') {
      updatePageSEO({
        title: `Contact Us & Calculator Suggestions`,
        description: `Have a formula suggestion, feedback, or bug report? Get in touch directly with the editorial team at ${siteConfig.brandName}.`,
        canonicalPath: '/contact',
        breadcrumbs: [{ name: 'Contact' }],
      });
      return;
    }

    // 6. Privacy Page: /privacy
    if (currentPath === '/privacy') {
      updatePageSEO({
        title: `Privacy Policy – Client-Side Calculation Guarantee`,
        description: `Read the privacy policy of ${siteConfig.brandName}. Your calculation inputs are processed locally in your browser and never logged.`,
        canonicalPath: '/privacy',
        breadcrumbs: [{ name: 'Privacy Policy' }],
      });
      return;
    }

    // 7. Terms Page: /terms
    if (currentPath === '/terms') {
      updatePageSEO({
        title: `Terms of Service & Usage Disclaimer`,
        description: `Terms of service, calculation accuracy guidelines, and usage disclaimers for ${siteConfig.brandName}.`,
        canonicalPath: '/terms',
        breadcrumbs: [{ name: 'Terms of Service' }],
      });
      return;
    }

    // 8. Guides Index: /guides
    if (currentPath === '/guides') {
      updatePageSEO({
        title: 'Guides & Practical Knowledge',
        description: 'Practical explanations, formulas, and everyday tips to help you make better calculations and decisions.',
        canonicalPath: '/guides',
        breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides' }],
      });
      return;
    }

    // 9. Guide Page: /guides/:slug
    if (currentPath.startsWith('/guides/')) {
      // GuidePage manages its own detailed SEO in useEffect
      return;
    }

    // 10. Default: Home Page: /
    updatePageSEO({
      title: `${siteConfig.brandName} – ${siteConfig.tagline}`,
      description: siteConfig.description,
      canonicalPath: '/',
    });
  }, [currentPath]);

  // Google Analytics SPA pageview tracking
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('config', 'G-KB367TCJTJ', {
        page_path: currentPath,
        page_location: window.location.href,
      });
    }
  }, [currentPath]);

  // View Component Renderer
  const renderCurrentView = () => {
    const normalized = currentPath.length > 1 && currentPath.endsWith('/')
      ? currentPath.slice(0, -1)
      : currentPath;

    // Calculator tool page: /calculators/:slug
    if (normalized.startsWith('/calculators/')) {
      const slug = normalized.replace('/calculators/', '').split('/')[0];
      const tool = getToolBySlug(slug);
      if (tool) {
        return <ToolLayout tool={tool} onNavigate={navigate} />;
      }
    }

    // Directory
    if (normalized === '/calculators' || normalized === '/categories' || normalized === '/all-tools') {
      return <AllToolsPage onNavigate={navigate} />;
    }

    // Category
    if (normalized.startsWith('/category/') || normalized.startsWith('/categories/')) {
      const catSlug = normalized.startsWith('/category/')
        ? normalized.replace('/category/', '').split('/')[0]
        : normalized.replace('/categories/', '').split('/')[0];
      return <CategoryPage categorySlug={catSlug} onNavigate={navigate} />;
    }

    // Informational pages
    if (normalized === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (normalized === '/contact') {
      return <ContactPage onNavigate={navigate} />;
    }
    if (normalized === '/privacy') {
      return <PrivacyPage onNavigate={navigate} />;
    }
    if (normalized === '/terms') {
      return <TermsPage onNavigate={navigate} />;
    }
    if (normalized === '/guides') {
      return <GuidesIndexPage onNavigate={navigate} />;
    }
    if (normalized.startsWith('/guides/')) {
      const guideSlug = normalized.replace('/guides/', '').split('/')[0];
      return <GuidePage slug={guideSlug} onNavigate={navigate} />;
    }

    // Home Page
    return <HomePage onNavigate={navigate} onOpenSearch={() => setSearchOpen(true)} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfa] text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Accessibility Skip Link (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-slate-900 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 text-xs font-semibold"
      >
        Skip to main content
      </a>

      {/* Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1" id="main-content">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectTool={(slug) => navigate(`/calculators/${slug}`)}
      />
    </div>
  );
}
