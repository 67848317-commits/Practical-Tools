import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';
import { tools } from '../src/data/tools';
import { guides } from '../src/data/guides';
import { categories } from '../src/data/categories';
import { getPageSEOData } from '../src/utils/seo';

// Synchronous imports of all 20 calculators for SSG prerendering only.
// This allows the build to render 100% full, non-fallback HTML for bots,
// while the browser client entry graph (src/main.tsx) remains cleanly code-split.
import { PercentageCalculator } from '../src/components/calculators/PercentageCalculator';
import { DiscountCalculator } from '../src/components/calculators/DiscountCalculator';
import { TipCalculator } from '../src/components/calculators/TipCalculator';
import { SalaryCalculator } from '../src/components/calculators/SalaryCalculator';
import { PaintCalculator } from '../src/components/calculators/PaintCalculator';
import { FuelCostCalculator } from '../src/components/calculators/FuelCostCalculator';
import { MarkupCalculator } from '../src/components/calculators/MarkupCalculator';
import { FlooringCalculator } from '../src/components/calculators/FlooringCalculator';
import { TileCalculator } from '../src/components/calculators/TileCalculator';
import { ConcreteCalculator } from '../src/components/calculators/ConcreteCalculator';
import { MulchCalculator } from '../src/components/calculators/MulchCalculator';
import { GasMileageCalculator } from '../src/components/calculators/GasMileageCalculator';
import { CommuteCostCalculator } from '../src/components/calculators/CommuteCostCalculator';
import { ElectricityCostCalculator } from '../src/components/calculators/ElectricityCostCalculator';
import { DateDifferenceCalculator } from '../src/components/calculators/DateDifferenceCalculator';
import { RecipeScaleCalculator } from '../src/components/calculators/RecipeScaleCalculator';
import { CookingUnitConverter } from '../src/components/calculators/CookingUnitConverter';
import { CupsToGramsConverter } from '../src/components/calculators/CupsToGramsConverter';
import { WorkHoursCalculator } from '../src/components/calculators/WorkHoursCalculator';
import { GpaCalculator } from '../src/components/calculators/GpaCalculator';

const syncCalculators: Record<string, React.ComponentType<any>> = {
  percentage: PercentageCalculator,
  discount: DiscountCalculator,
  tip: TipCalculator,
  'salary-to-hourly': SalaryCalculator,
  markup: MarkupCalculator,
  paint: PaintCalculator,
  flooring: FlooringCalculator,
  tile: TileCalculator,
  concrete: ConcreteCalculator,
  mulch: MulchCalculator,
  'fuel-cost': FuelCostCalculator,
  'gas-mileage': GasMileageCalculator,
  'commute-cost': CommuteCostCalculator,
  'electricity-cost': ElectricityCostCalculator,
  'date-difference': DateDifferenceCalculator,
  'recipe-scale': RecipeScaleCalculator,
  'unit-converter': CookingUnitConverter,
  'cooking-unit-converter': CookingUnitConverter,
  'cups-to-grams': CupsToGramsConverter,
  hours: WorkHoursCalculator,
  'work-hours': WorkHoursCalculator,
  gpa: GpaCalculator,
};

const toolToCompMap: Record<string, string> = {
  percentage: 'PercentageCalculator',
  'percentage-calculator': 'PercentageCalculator',
  discount: 'DiscountCalculator',
  'discount-calculator': 'DiscountCalculator',
  tip: 'TipCalculator',
  'tip-calculator': 'TipCalculator',
  'salary-to-hourly': 'SalaryCalculator',
  'salary-to-hourly-calculator': 'SalaryCalculator',
  markup: 'MarkupCalculator',
  'markup-calculator': 'MarkupCalculator',
  paint: 'PaintCalculator',
  'paint-calculator': 'PaintCalculator',
  flooring: 'FlooringCalculator',
  'flooring-calculator': 'FlooringCalculator',
  tile: 'TileCalculator',
  'tile-calculator': 'TileCalculator',
  concrete: 'ConcreteCalculator',
  'concrete-calculator': 'ConcreteCalculator',
  mulch: 'MulchCalculator',
  'mulch-calculator': 'MulchCalculator',
  'fuel-cost': 'FuelCostCalculator',
  'fuel-cost-calculator': 'FuelCostCalculator',
  'gas-mileage': 'GasMileageCalculator',
  'gas-mileage-calculator': 'GasMileageCalculator',
  'commute-cost': 'CommuteCostCalculator',
  'commute-cost-calculator': 'CommuteCostCalculator',
  'electricity-cost': 'ElectricityCostCalculator',
  'electricity-cost-calculator': 'ElectricityCostCalculator',
  'date-difference': 'DateDifferenceCalculator',
  'date-difference-calculator': 'DateDifferenceCalculator',
  'recipe-scale': 'RecipeScaleCalculator',
  'recipe-scale-calculator': 'RecipeScaleCalculator',
  'unit-converter': 'CookingUnitConverter',
  'cooking-unit-converter': 'CookingUnitConverter',
  'cups-to-grams': 'CupsToGramsConverter',
  'cups-to-grams-converter': 'CupsToGramsConverter',
  hours: 'WorkHoursCalculator',
  'work-hours': 'WorkHoursCalculator',
  'work-hours-calculator': 'WorkHoursCalculator',
  gpa: 'GpaCalculator',
  'gpa-calculator': 'GpaCalculator',
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

// Escape helper for HTML attributes and titles
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function prerender() {
  console.log('🚀 Starting Practical Tools Static Site Generation (SSG)...');

  const templatePath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error(`❌ Error: dist/index.html not found. Run "vite build" first.`);
    process.exit(1);
  }

  const baseTemplate = fs.readFileSync(templatePath, 'utf-8');

  // Build complete route list
  const routes: string[] = [
    '/',
    '/calculators',
    '/guides',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ];

  // Add categories
  for (const cat of categories) {
    routes.push(`/category/${cat.slug}`);
  }

  // Add all 20 calculators
  for (const tool of tools) {
    routes.push(`/calculators/${tool.slug}`);
  }

  // Add all 8 guides
  for (const guide of guides) {
    routes.push(`/guides/${guide.slug}`);
  }

  // Add 404 page
  routes.push('/404');

  console.log(`📋 Total routes to prerender: ${routes.length}`);

  let successCount = 0;
  const failedRoutes: { route: string; error: unknown }[] = [];

  for (const route of routes) {
    try {
      // 1. Render App component to static HTML string with full synchronous calculator registry
      const appHtml = renderToString(<App initialPath={route} calculatorRegistry={syncCalculators} />);

      // 2. Obtain SEO metadata and structured data
      const seo = getPageSEOData(route);

      // 3. Inject metadata and body into base template
      let html = baseTemplate;

      // Replace Title
      html = html.replace(
        /<title>[\s\S]*?<\/title>/i,
        `<title>${escapeHtml(seo.title)}</title>`
      );

      // Replace Meta Description
      html = html.replace(
        /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta name="description" content="${escapeHtml(seo.description)}" />`
      );

      // Replace or insert Canonical Link
      if (html.includes('<link rel="canonical"')) {
        html = html.replace(
          /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i,
          `<link rel="canonical" href="${seo.canonicalUrl}" />`
        );
      } else {
        html = html.replace(
          '</head>',
          `  <link rel="canonical" href="${seo.canonicalUrl}" />\n  </head>`
        );
      }

      // Replace Open Graph Tags
      html = html.replace(
        /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta property="og:title" content="${escapeHtml(seo.title)}" />`
      );
      html = html.replace(
        /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta property="og:description" content="${escapeHtml(seo.description)}" />`
      );
      html = html.replace(
        /<meta\s+property="og:type"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta property="og:type" content="${seo.ogType}" />`
      );

      // Ensure og:url exists
      if (html.includes('<meta property="og:url"')) {
        html = html.replace(
          /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i,
          `<meta property="og:url" content="${seo.canonicalUrl}" />`
        );
      } else {
        html = html.replace(
          '</head>',
          `  <meta property="og:url" content="${seo.canonicalUrl}" />\n  </head>`
        );
      }

      // Replace Twitter Tags
      html = html.replace(
        /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`
      );
      html = html.replace(
        /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/i,
        `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`
      );

      // Inject Schema.org JSON-LD scripts
      if (seo.schemas && seo.schemas.length > 0) {
        const schemaScripts = seo.schemas
          .map((s) => `<script type="application/ld+json" data-pt-ldjson="true">${JSON.stringify(s)}</script>`)
          .join('\n    ');
        html = html.replace('</head>', `  ${schemaScripts}\n  </head>`);
      }

      // 3.5 Inject calculator-specific modulepreload for calculator routes so only this calculator's code is fetched
      if (route.startsWith('/calculators/')) {
        const slug = route.replace('/calculators/', '').split('/')[0];
        const compName = toolToCompMap[slug];
        if (compName) {
          const assetsDir = path.resolve(distDir, 'assets');
          if (fs.existsSync(assetsDir)) {
            const assetFiles = fs.readdirSync(assetsDir);
            const calcChunk = assetFiles.find((f) => f.startsWith(`calc-${compName}-`));
            const cardChunk = assetFiles.find((f) => f.startsWith('calc-CalculatorCard-'));
            let preloads = '';
            if (cardChunk) {
              preloads += `\n    <link rel="modulepreload" crossorigin href="/assets/${cardChunk}">`;
            }
            if (calcChunk) {
              preloads += `\n    <link rel="modulepreload" crossorigin href="/assets/${calcChunk}">`;
            }
            if (preloads) {
              html = html.replace('</head>', `${preloads}\n  </head>`);
            }
          }
        }
      }

      // 4. Inject rendered HTML into #root
      html = html.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      );

      // 5. Determine target file path
      let outFilePath: string;
      if (route === '/') {
        outFilePath = path.resolve(distDir, 'index.html');
      } else if (route === '/404') {
        outFilePath = path.resolve(distDir, '404.html');
      } else {
        const routeDir = path.resolve(distDir, route.replace(/^\//, ''));
        fs.mkdirSync(routeDir, { recursive: true });
        outFilePath = path.resolve(routeDir, 'index.html');
      }

      fs.writeFileSync(outFilePath, html, 'utf-8');
      successCount++;
      console.log(`  ✓ Prerendered: ${route.padEnd(42)} -> ${path.relative(rootDir, outFilePath)}`);
    } catch (err) {
      console.error(`  ✗ Error prerendering ${route}:`, err);
      failedRoutes.push({ route, error: err });
    }
  }

  console.log(`\n📋 Prerender Summary: ${successCount}/${routes.length} routes succeeded.`);

  if (failedRoutes.length > 0 || successCount !== routes.length) {
    console.error(`\n❌ Prerender Failed! ${failedRoutes.length} route(s) failed out of ${routes.length} expected routes:`);
    for (const f of failedRoutes) {
      const msg = f.error instanceof Error ? f.error.message : String(f.error);
      console.error(`  - Failed route: ${f.route} -> ${msg}`);
    }
    process.exit(1);
  }

  console.log(`🎉 Successfully prerendered all ${successCount}/${routes.length} public static HTML pages!`);
}

prerender();
