import { siteConfig } from '../data/site';
import { tools, getToolBySlug } from '../data/tools';
import { categories } from '../data/categories';
import { guides, getGuideBySlug } from '../data/guides';
import type { BreadcrumbItem, FAQItem, ToolDefinition } from '../types';

interface UpdateSEOOps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  type?: 'website' | 'article';
  tool?: ToolDefinition;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  article?: {
    headline: string;
    description: string;
    publishedDate: string;
    updatedDate?: string;
  };
}

export interface PageSEOData {
  title: string;
  description: string;
  canonicalUrl: string;
  ogType: 'website' | 'article';
  schemas: any[];
}

export function getPageSEOData(path: string): PageSEOData {
  const normalized = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;

  // 1. Tool Page: /calculators/:slug
  if (normalized.startsWith('/calculators/')) {
    const slug = normalized.replace('/calculators/', '').split('/')[0];
    const tool = getToolBySlug(slug);
    if (tool) {
      const fullTitle = tool.metaTitle ? `${tool.metaTitle} | ${siteConfig.brandName}` : `${tool.title} – Free Step-by-Step Tool | ${siteConfig.brandName}`;
      const fullDesc = tool.metaDescription || tool.shortIntro;
      const canonicalUrl = `${siteConfig.url}/calculators/${tool.slug}`;
      const schemas: any[] = [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteConfig.brandName,
          url: siteConfig.url,
          description: siteConfig.description,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: siteConfig.brandName,
          url: siteConfig.url,
          email: siteConfig.contactEmail,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Calculators', item: `${siteConfig.url}/calculators` },
            { '@type': 'ListItem', position: 2, name: tool.category.replace('-', ' & '), item: `${siteConfig.url}/category/${tool.category}` },
            { '@type': 'ListItem', position: 3, name: tool.shortTitle || tool.title, item: canonicalUrl },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: tool.title,
          applicationCategory: 'UtilityApplication',
          operatingSystem: 'All',
          url: canonicalUrl,
          description: fullDesc,
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        },
      ];
      if (tool.faqs && tool.faqs.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: tool.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        });
      }
      return { title: fullTitle, description: fullDesc, canonicalUrl, ogType: 'website', schemas };
    }
  }

  // 2. Guide Page: /guides/:slug
  if (normalized.startsWith('/guides/')) {
    const slug = normalized.replace('/guides/', '').split('/')[0];
    const guide = getGuideBySlug(slug);
    if (guide) {
      const fullTitle = `${guide.title} | ${siteConfig.brandName}`;
      const fullDesc = guide.description;
      const canonicalUrl = `${siteConfig.url}/guides/${guide.slug}`;
      const schemas: any[] = [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: siteConfig.brandName,
          url: siteConfig.url,
          description: siteConfig.description,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
            { '@type': 'ListItem', position: 2, name: 'Guides', item: `${siteConfig.url}/guides` },
            { '@type': 'ListItem', position: 3, name: guide.title, item: canonicalUrl },
          ],
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: guide.title,
          description: guide.description,
          datePublished: guide.publishedDate,
          dateModified: guide.updatedDate || guide.publishedDate,
          mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
          author: { '@type': 'Organization', name: siteConfig.brandName, url: siteConfig.url },
          publisher: { '@type': 'Organization', name: siteConfig.brandName, url: siteConfig.url },
        },
      ];
      if (guide.faqs && guide.faqs.length > 0) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: guide.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        });
      }
      return { title: fullTitle, description: fullDesc, canonicalUrl, ogType: 'article', schemas };
    }
  }

  // 3. Category Page: /category/:slug
  if (normalized.startsWith('/category/') || normalized.startsWith('/categories/')) {
    const catSlug = normalized.startsWith('/category/')
      ? normalized.replace('/category/', '').split('/')[0]
      : normalized.replace('/categories/', '').split('/')[0];
    const category = categories.find((c) => c.slug === catSlug);
    if (category) {
      const fullTitle = `${category.name} Calculators & Practical Decision Tools | ${siteConfig.brandName}`;
      const fullDesc = category.description;
      const canonicalUrl = `${siteConfig.url}/category/${category.slug}`;
      const schemas: any[] = [
        { '@context': 'https://schema.org', '@type': 'WebSite', name: siteConfig.brandName, url: siteConfig.url, description: siteConfig.description },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Calculators', item: `${siteConfig.url}/calculators` },
            { '@type': 'ListItem', position: 2, name: category.name, item: canonicalUrl },
          ],
        },
      ];
      return { title: fullTitle, description: fullDesc, canonicalUrl, ogType: 'website', schemas };
    }
  }

  // 4. Directory: /calculators
  if (normalized === '/calculators' || normalized === '/categories' || normalized === '/all-tools') {
    const fullTitle = `All Practical Calculators & Everyday Estimators | ${siteConfig.brandName}`;
    const fullDesc = `Browse our catalog of 20 fast, private online calculators for household finance, home renovation, travel, cooking, and productivity.`;
    const canonicalUrl = `${siteConfig.url}/calculators`;
    return {
      title: fullTitle,
      description: fullDesc,
      canonicalUrl,
      ogType: 'website',
      schemas: [
        { '@context': 'https://schema.org', '@type': 'WebSite', name: siteConfig.brandName, url: siteConfig.url, description: siteConfig.description },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
            { '@type': 'ListItem', position: 2, name: 'Calculators', item: canonicalUrl },
          ],
        },
      ],
    };
  }

  // 5. Guides Index: /guides
  if (normalized === '/guides') {
    const fullTitle = `Guides & Practical Decision Knowledge | ${siteConfig.brandName}`;
    const fullDesc = `Clear explanations, formulas, and real-world calculation guides to help you make informed everyday budgeting and planning decisions.`;
    const canonicalUrl = `${siteConfig.url}/guides`;
    return {
      title: fullTitle,
      description: fullDesc,
      canonicalUrl,
      ogType: 'website',
      schemas: [
        { '@context': 'https://schema.org', '@type': 'WebSite', name: siteConfig.brandName, url: siteConfig.url, description: siteConfig.description },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
            { '@type': 'ListItem', position: 2, name: 'Guides', item: canonicalUrl },
          ],
        },
      ],
    };
  }

  // 6. About Page: /about
  if (normalized === '/about') {
    return {
      title: `About Our Methodology & Editorial Mission | ${siteConfig.brandName}`,
      description: `Learn why ${siteConfig.brandName} is built for mathematical integrity, client-side privacy, and honest decision-making tools without promotional clutter.`,
      canonicalUrl: `${siteConfig.url}/about`,
      ogType: 'website',
      schemas: [
        { '@context': 'https://schema.org', '@type': 'WebSite', name: siteConfig.brandName, url: siteConfig.url, description: siteConfig.description },
      ],
    };
  }

  // 7. Contact Page: /contact
  if (normalized === '/contact') {
    return {
      title: `Contact Us & Calculator Feedback | ${siteConfig.brandName}`,
      description: `Have a formula suggestion, feedback, or bug report? Get in touch directly with the editorial and engineering team at ${siteConfig.brandName}.`,
      canonicalUrl: `${siteConfig.url}/contact`,
      ogType: 'website',
      schemas: [
        { '@context': 'https://schema.org', '@type': 'WebSite', name: siteConfig.brandName, url: siteConfig.url, description: siteConfig.description },
      ],
    };
  }

  // 8. Privacy Page: /privacy
  if (normalized === '/privacy') {
    return {
      title: `Privacy Policy – Client-Side Calculation Guarantee | ${siteConfig.brandName}`,
      description: `Read the privacy policy of ${siteConfig.brandName}. Your calculation inputs are processed locally in your browser and never logged.`,
      canonicalUrl: `${siteConfig.url}/privacy`,
      ogType: 'website',
      schemas: [
        { '@context': 'https://schema.org', '@type': 'WebSite', name: siteConfig.brandName, url: siteConfig.url, description: siteConfig.description },
      ],
    };
  }

  // 9. Terms Page: /terms
  if (normalized === '/terms') {
    return {
      title: `Terms of Service & Usage Disclaimer | ${siteConfig.brandName}`,
      description: `Terms of service, calculation accuracy guidelines, and usage disclaimers for ${siteConfig.brandName}.`,
      canonicalUrl: `${siteConfig.url}/terms`,
      ogType: 'website',
      schemas: [
        { '@context': 'https://schema.org', '@type': 'WebSite', name: siteConfig.brandName, url: siteConfig.url, description: siteConfig.description },
      ],
    };
  }

  // 10. Home Page: /
  if (normalized === '/' || normalized === '') {
    return {
      title: `${siteConfig.brandName} – ${siteConfig.tagline}`,
      description: siteConfig.description,
      canonicalUrl: `${siteConfig.url}/`,
      ogType: 'website',
      schemas: [
        {
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
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: siteConfig.brandName,
          url: siteConfig.url,
          email: siteConfig.contactEmail,
          foundingDate: `${siteConfig.yearEstablished}-01-01`,
        },
      ],
    };
  }

  // 11. 404 Fallback
  return {
    title: `Page Not Found | ${siteConfig.brandName}`,
    description: `The requested tool or practical guide could not be located on ${siteConfig.brandName}.`,
    canonicalUrl: `${siteConfig.url}${normalized}`,
    ogType: 'website',
    schemas: [
      { '@context': 'https://schema.org', '@type': 'WebSite', name: siteConfig.brandName, url: siteConfig.url, description: siteConfig.description },
    ],
  };
}

export function updatePageSEO({
  title,
  description,
  canonicalPath = '',
  type = 'website',
  tool,
  breadcrumbs,
  faqs,
  article,
}: UpdateSEOOps): void {
  if (typeof document === 'undefined') return;

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
  updateStructuredData({ tool, breadcrumbs, faqs, article, canonicalUrl, fullTitle, fullDesc });
}

function updateStructuredData({
  tool,
  breadcrumbs,
  faqs,
  article,
  canonicalUrl,
  fullTitle,
  fullDesc,
}: {
  tool?: ToolDefinition;
  breadcrumbs?: BreadcrumbItem[];
  faqs?: FAQItem[];
  article?: {
    headline: string;
    description: string;
    publishedDate: string;
    updatedDate?: string;
  };
  canonicalUrl: string;
  fullTitle: string;
  fullDesc: string;
}) {
  if (typeof document === 'undefined') return;

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
      description: tool.metaDescription || tool.shortIntro,
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

  // Article Schema for Guides & Knowledge Base
  if (article) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.headline,
      description: article.description,
      datePublished: article.publishedDate,
      dateModified: article.updatedDate || article.publishedDate,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
      author: {
        '@type': 'Organization',
        name: siteConfig.brandName,
        url: siteConfig.url,
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.brandName,
        url: siteConfig.url,
      },
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
