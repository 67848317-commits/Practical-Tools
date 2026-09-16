import { siteConfig } from '../data/site';
import type { BreadcrumbItem, FAQItem, ToolDefinition } from '../types';

interface UpdateSEOOps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  type?: 'website' | 'article';
  tool?: ToolDefinition;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
}

export function updatePageSEO({
  title,
  description,
  canonicalPath = '',
  type = 'website',
  tool,
  breadcrumbs,
  faqs,
}: UpdateSEOOps): void {
  const fullTitle = title 
    ? `${title} | ${siteConfig.brandName}`
    : `${siteConfig.brandName} – ${siteConfig.tagline}`;
  
  const fullDesc = description || siteConfig.description;
  const canonicalUrl = `${siteConfig.url}${canonicalPath.startsWith('/') ? canonicalPath : '/' + canonicalPath}`;

  // 1. Update Title
  document.title = fullTitle;

  // 2. Helper to set or update meta tag
  const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('name', 'description', fullDesc);
  setMeta('name', 'robots', 'index, follow');
  setMeta('property', 'og:title', fullTitle);
  setMeta('property', 'og:description', fullDesc);
  setMeta('property', 'og:type', type);
  setMeta('property', 'og:site_name', siteConfig.brandName);
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:site', siteConfig.twitterHandle);
  setMeta('name', 'twitter:title', fullTitle);
  setMeta('name', 'twitter:description', fullDesc);

  // 3. Update or create canonical link
  let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', canonicalUrl);

  // 4. Update Schema.org Structured Data
  updateStructuredData({ tool, breadcrumbs, faqs, canonicalUrl, fullTitle, fullDesc });
}

function updateStructuredData({
  tool,
  breadcrumbs,
  faqs,
  canonicalUrl,
  fullTitle,
  fullDesc,
}: {
  tool?: ToolDefinition;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  canonicalUrl: string;
  fullTitle: string;
  fullDesc: string;
}) {
  // Remove existing dynamic ld+json tags
  const existingScripts = document.querySelectorAll('script[data-pt-ldjson="true"]');
  existingScripts.forEach((s) => s.remove());

  const schemas: any[] = [];

  // Always include Website & Organization Schema
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.brandName,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/#search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  });

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.brandName,
    url: siteConfig.url,
    email: siteConfig.contactEmail,
    foundingDate: `${siteConfig.yearEstablished}-01-01`,
  });

  // Breadcrumbs Schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        item: item.url ? `${siteConfig.url}${item.url}` : canonicalUrl,
      })),
    });
  }

  // WebApplication Schema for Calculator Tools
  if (tool) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: tool.title,
      applicationCategory: 'UtilityApplication',
      operatingSystem: 'All',
      url: canonicalUrl,
      description: tool.metaDescription,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    });
  }

  // FAQPage Schema ONLY when visible on the page
  if (faqs && faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    });
  }

  // Inject script tags
  schemas.forEach((schema) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-pt-ldjson', 'true');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}
