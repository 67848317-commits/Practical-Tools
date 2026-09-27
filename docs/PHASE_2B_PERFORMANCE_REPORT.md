# Practical Tools — Phase 2B Performance & Code-Splitting Report

**Date of QA Audit:** September 27, 2026  
**Auditor / Engine:** AI Studio Build Verification Engine  
**Project Domain:** https://practicaltools.org/  
**References:**
- `docs/PHASE_1_PRACTICAL_TOOLS_AUDIT.md`
- `docs/PHASE_2A_PRACTICAL_TOOLS_REPORT.md`
- `docs/PHASE_2A_VERIFICATION_REPORT.md`

---

## 1. Executive Summary

Phase 2B focused strictly on **JavaScript performance optimization and calculator-level code splitting**.

In Phase 2A, the static pre-rendering architecture was successfully implemented, producing 41 static HTML files with complete semantic content. However, the client-side JavaScript entry bundle (`index-*.js`, 520.12 kB) remained monolithic, containing the implementation code, input forms, state machines, and calculations for all 20 calculators. A visitor navigating to a single tool (e.g. `/calculators/percentage`) was forced to download the client code for all 19 other calculators (paint, flooring, concrete, fuel cost, GPA, etc.).

**Phase 2B Implementation Summary:**
1. **True Calculator-Level Code Splitting:** Separated all 20 calculator components into individual on-demand JavaScript chunks via `React.lazy()` dynamic imports, while preserving a shared vendor chunk for React runtime (`vendor-react-*.js`) and global icons (`icons-*.js`).
2. **Main Application Chunk Reduction:** The primary application JavaScript bundle shrank from **520.12 kB (103.78 kB gzip)** to **310.78 kB (73.52 kB gzip)** — a **40.3% reduction** in uncompressed JavaScript payload.
3. **Elimination of Rollup Warnings:** The Vite build now completes with **zero chunk size warnings** (previously warned: chunk > 500 kB).
4. **Pristine Static HTML Preservation:** Solved the classic SSR/Suspense pitfall by maintaining a dedicated synchronous component registry for `scripts/prerender.tsx`. As a result, all 20 calculator HTML files contain **100% full, non-fallback static markup** (all inputs, labels, default values, formulas, step-by-step arithmetic, and FAQs) directly in the raw HTML without any `<template>` fallback tags or client-hydration swap delays.
5. **Targeted Route Module Preloading:** Calculator pages now inject `<link rel="modulepreload">` for **only their specific calculator chunk** (and shared card UI), ensuring instant parallel download without fetching the other 19 calculators.
6. **Zero Functional or Algorithmic Regressions:** All 20/20 calculators passed algorithmic regression testing with zero errors (`scripts/test-calculators.ts`).

---

## 2. Previous Bundle Architecture (Phase 2A Baseline)

Prior to Phase 2B, `ToolLayout.tsx` statically imported all 20 calculator components at the top level. Consequently, Rollup bundled all calculator logic into a single monolithic chunk.

### Phase 2A Build Artifacts:
- **`dist/assets/index-*.css`:** 49.98 kB (8.90 kB gzip)
- **`dist/assets/vendor-react-*.js`:** 430.20 kB (129.16 kB gzip)
- **`dist/assets/icons-*.js`:** 14.60 kB (3.37 kB gzip)
- **`dist/assets/index-*.js`:** **520.12 kB (103.78 kB gzip)** *(Monolithic app bundle containing all 20 calculators)*
- **Total JS Payload on Any Page:** **964.92 kB**
- **Vite Warning:** `(!) Some chunks are larger than 500 kB after minification.`

---

## 3. New Bundle Architecture (Phase 2B Results)

In Phase 2B, Rollup cleanly splits shared application logic from calculator-specific modules:

### Phase 2B Shared Chunks:
- **`dist/assets/index-*.css`:** 50.34 kB (9.04 kB gzip)
- **`dist/assets/vendor-react-*.js`:** 430.33 kB (129.22 kB gzip) — *Shared React 19 core runtime*
- **`dist/assets/icons-*.js`:** 14.60 kB (3.37 kB gzip) — *Shared Lucide icon primitives*
- **`dist/assets/index-*.js`:** **310.78 kB (73.52 kB gzip)** — *Shared shell, navigation, breadcrumbs, and directory layouts*
- **`dist/assets/calc-CalculatorCard-*.js`:** 7.60 kB (1.59 kB gzip) — *Shared calculator card UI container*

### Bundle Comparison Table

| Metric | Phase 2A Monolith | Phase 2B Code-Split | Improvement |
| :--- | :--- | :--- | :--- |
| **Main App Chunk (`index-*.js`)** | 520.12 kB (103.78 kB gz) | **310.78 kB (73.52 kB gz)** | **-209.34 kB (-40.3%)** |
| **Total Initial App JS on Non-Calculator Pages** | 520.12 kB | **310.78 kB** | **-40.3%** |
| **Total Initial App JS on `/calculators/percentage`** | 520.12 kB | **332.97 kB** *(310.78k + 7.60k Card + 14.59k Calc)* | **-187.15 kB (-36.0%)** |
| **Rollup Build Warnings** | 1 chunk > 500 kB warning | **0 warnings (all chunks < 500 kB)** | **Eliminated** |

---

## 4. Calculator Code Splitting

Each of the 20 calculators is now emitted as an independent, isolated chunk in `dist/assets/`:

| Calculator Chunk File | Uncompressed Size | Gzipped Size | Purpose / Calculation Scope |
| :--- | :--- | :--- | :--- |
| `calc-MarkupCalculator-DyIJNM08.js` | 5.55 kB | 1.77 kB | Markup %, COGS, gross margin, keystone pricing |
| `calc-GasMileageCalculator-BtWjFLuZ.js` | 6.15 kB | 1.87 kB | Odometer MPG / Metric fuel economy |
| `calc-MulchCalculator-BMMv7peN.js` | 6.35 kB | 2.00 kB | Bed dimensions, cubic yards, 2 cu ft bags |
| `calc-CalculatorCard-DAX4Q4LX.js` | 7.60 kB | 1.59 kB | Shared card container, error & reset header |
| `calc-CommuteCostCalculator-BYEVcUJi.js` | 7.63 kB | 1.99 kB | Round-trip driving expenses, monthly transit |
| `calc-ConcreteCalculator-Bgx9tG3n.js` | 7.96 kB | 2.33 kB | Slab/column cubic yards, 60/80lb bags |
| `calc-DateDifferenceCalculator-D5qPlmPs.js` | 8.00 kB | 2.37 kB | Date intervals, workdays, business weeks |
| `calc-FlooringCalculator-DNggragW.js` | 8.32 kB | 2.32 kB | Room area, waste percentage, box counts |
| `calc-CupsToGramsConverter-Dg_b-vOO.js` | 8.78 kB | 2.90 kB | Ingredient-density baking conversions |
| `calc-ElectricityCostCalculator-0AtXVEVl.js` | 8.86 kB | 2.43 kB | Appliance wattage, kWh utility rate expenses |
| `calc-CookingUnitConverter-Cpx7OsbF.js` | 9.05 kB | 2.48 kB | Kitchen volume & spoon/cup conversions |
| `calc-RecipeScaleCalculator-kNqazCrh.js` | 9.16 kB | 2.42 kB | Serving multipliers, ingredient scaling |
| `calc-WorkHoursCalculator-LXLz7-fe.js` | 9.18 kB | 2.67 kB | Timesheet punches, meal breaks, overtime |
| `calc-TileCalculator-C6k0WvR_.js` | 10.73 kB | 2.63 kB | Grout joints, tile dimensions, box packaging |
| `calc-GpaCalculator-Cpbqcv7f.js` | 11.91 kB | 3.20 kB | Weighted GPA, credit hours, grade honor points |
| `calc-DiscountCalculator-C9f46id2.js` | 12.10 kB | 2.36 kB | Markdowns, coupons, post-tax checkout |
| `calc-TipCalculator-CzxjwKOh.js` | 13.82 kB | 2.67 kB | Bill splitting, tipping presets, guest counts |
| `calc-PercentageCalculator-DEe9uRxT.js` | 14.59 kB | 2.65 kB | 3 percentage calculation modes & live steps |
| `calc-SalaryCalculator-DIJW0nKf.js` | 16.08 kB | 2.84 kB | Salaried to hourly, paycheck conversion |
| `calc-FuelCostCalculator-0_qThFxB.js` | 17.57 kB | 3.31 kB | Road trip distances, vehicle MPG, split fares |
| `calc-PaintCalculator-Db-DlNoA.js` | 20.37 kB | 3.74 kB | Room perimeter, door/window deductions, coats |

---

## 5. Page-Level Loading

To verify that pages do not load all 20 calculator implementations, we inspected the `<head>` of representative pre-rendered pages for `<link rel="modulepreload">` tags:

### 1. `/calculators/percentage`
- Preloaded Chunks:
  - `/assets/vendor-react-Cdu_IAXo.js` (React runtime)
  - `/assets/icons-BFAjD7YW.js` (Icons)
  - `/assets/calc-CalculatorCard-DAX4Q4LX.js` (Shared card shell)
  - `/assets/calc-PercentageCalculator-DEe9uRxT.js` (**Only this calculator**)
- **Unrequested Chunks:** The other 19 calculators (`PaintCalculator`, `FlooringCalculator`, `GpaCalculator`, etc.) are **NEVER** preloaded or downloaded on this page.

### 2. `/calculators/paint`
- Preloaded Chunks:
  - `/assets/vendor-react-Cdu_IAXo.js`
  - `/assets/icons-BFAjD7YW.js`
  - `/assets/calc-CalculatorCard-DAX4Q4LX.js`
  - `/assets/calc-PaintCalculator-Db-DlNoA.js` (**Only this calculator**)
- **Unrequested Chunks:** `PercentageCalculator` and the remaining 18 calculators are **NEVER** loaded.

### 3. `/calculators/gpa`
- Preloaded Chunks:
  - `/assets/vendor-react-Cdu_IAXo.js`
  - `/assets/icons-BFAjD7YW.js`
  - `/assets/calc-CalculatorCard-DAX4Q4LX.js`
  - `/assets/calc-GpaCalculator-Cpbqcv7f.js` (**Only this calculator**)

### 4. `/guides/how-to-calculate-percentage` (and Non-Calculator Pages)
- Preloaded Chunks:
  - `/assets/vendor-react-Cdu_IAXo.js`
  - `/assets/icons-BFAjD7YW.js`
- **Calculator Chunks:** **0 calculator chunks** are preloaded on guide or information pages.

---

## 6. Static HTML Regression

A comprehensive inspection of the 41 pre-rendered HTML files was conducted to guarantee that code splitting did not degrade static content into client-only placeholders:

| Inspected Page | Empty `<div id="root"></div>`? | Suspense Fallback Rendered? | Real Inputs / Content Present? | Primary `<h1>` | Formula Section Present? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `dist/index.html` | **NO** | **NO** | **YES** | Simple tools for everyday decisions. | N/A |
| `dist/calculators/index.html` | **NO** | **NO** | **YES** | Practical Everyday Calculators & Tools | N/A |
| `dist/calculators/percentage/index.html` | **NO** | **NO** | **YES** | Percentage Calculator | **YES** |
| `dist/calculators/paint/index.html` | **NO** | **NO** | **YES** | Paint Calculator | **YES** |
| `dist/calculators/flooring/index.html` | **NO** | **NO** | **YES** | Flooring Calculator | **YES** |
| `dist/calculators/concrete/index.html` | **NO** | **NO** | **YES** | Concrete Calculator | **YES** |
| `dist/calculators/gpa/index.html` | **NO** | **NO** | **YES** | GPA Calculator | **YES** |
| `dist/guides/how-to-calculate-percentage/index.html` | **NO** | **NO** | **YES** | How to Calculate a Percentage: A Simple Guide | **YES** |
| `dist/category/money/index.html` | **NO** | **NO** | **YES** | Money Calculators | N/A |
| `dist/about/index.html` | **NO** | **NO** | **YES** | About Practical Tools | N/A |
| `dist/privacy/index.html` | **NO** | **NO** | **YES** | Privacy Policy | N/A |
| `dist/terms/index.html` | **NO** | **NO** | **YES** | Terms of Service | N/A |

**Total HTML Page Count:** **41 static HTML files** (100% generated).  
All static elements (Breadcrumbs, H1, Introductions, Formulas, Worked Examples, Assumptions, Pitfalls, FAQs, Related Links, Footers) remain directly in the raw HTML.

---

## 7. SEO Regression

Audited metadata across all 41 routes:
- **Duplicate Titles:** `0`
- **Duplicate Canonical URLs:** `0`
- **Canonical vs. `og:url` Mismatches:** `0`
- **Homepage Canonical Accidentally Reused:** `0`
- **Title and Meta Description Preservation:** 100% matched to Phase 2A baseline.

---

## 8. JSON-LD Regression

Inspected all Schema.org structured data blocks across `dist/**/*.html`:
- **Total Schemas Parsed:** 153 blocks.
- **JSON Syntax / Parsing Errors:** `0`.
- **Duplicate Injections:** `0`.
- **Entity Types Verified:**
  - `WebSite`: 41 instances
  - `Organization`: 21 instances
  - `BreadcrumbList`: 35 instances
  - `WebApplication`: 20 instances (all 20 calculators)
  - `FAQPage`: 28 instances (20 calculators + 8 guides)
  - `Article`: 8 instances (all 8 editorial guides)
- All schema questions and answers match visible page text.

---

## 9. 404 Regression

- **File Status:** `dist/404.html` exists (22.5 KB) with full recovery navigation and search access.
- **Vercel Configuration (`vercel.json`):**
  ```json
  {
    "cleanUrls": true,
    "trailingSlash": false
  }
  ```
- **No Wildcard SPA Rewrites:** Nonexistent paths return `HTTP 404 Not Found` with `dist/404.html` rather than converting unknown URLs to 200 responses.

---

## 10. AdSense Regression

- **Publisher Script (`ca-pub-1850854173653124`):** Present in the `<head>` of all 41 generated static HTML files (exactly 1 occurrence per file).
- **`ads.txt`:** Present at `public/ads.txt` and verified in `dist/ads.txt`:
  ```text
  google.com, pub-1850854173653124, DIRECT, f08c47fec0942fa0
  ```
- **Placeholder Ad UI:** 0 occurrences of `"Advertisement Space"`, `"ad placement slot"`, or empty dashed boxes. `AdSlot.tsx` returns `null`.

---

## 11. Calculator Regression

Re-executed `scripts/test-calculators.ts`:
```text
$ npx tsx scripts/test-calculators.ts
🧪 Starting Functional Regression Test for all 20 Calculators...
  ✓ 1. Percentage Calculator
  ✓ 2. Discount Calculator
  ✓ 3. Tip Calculator
  ✓ 4. Salary Calculator
  ✓ 5. Markup Calculator
  ✓ 6. Paint Calculator
  ✓ 7. Flooring Calculator
  ✓ 8. Tile Calculator
  ✓ 9. Concrete Calculator
  ✓ 10. Mulch Calculator
  ✓ 11. Fuel Cost Calculator
  ✓ 12. Gas Mileage Calculator
  ✓ 13. Commute Cost Calculator
  ✓ 14. Electricity Cost Calculator
  ✓ 15. Date Difference Calculator
  ✓ 16. Recipe Scale Calculator
  ✓ 17. Cooking Unit Converter
  ✓ 18. Cups to Grams Converter
  ✓ 19. Work Hours Calculator
  ✓ 20. GPA Calculator
🎉 Results: 20/20 Calculators passed functional testing without error!
```
**Result:** **20/20 passed, 0 errors**.

---

## 12. TypeScript & Build Verification

- **TypeScript Typecheck (`npx tsc --noEmit`):**
  - Exit Code: `0`
  - Errors: `0`
- **Production Build (`npm run build`):**
  - Command: `vite build && tsx scripts/prerender.tsx`
  - Modules Transformed: 1,736
  - Exit Code: `0`
  - Errors: `0`
  - Rollup Chunk Size Warnings: `0` (Warning previously triggered at 520 kB is now resolved)
  - Build Duration: ~4.7s bundle + ~2.1s SSG prerender (~6.8s total)

---

## 13. Files Changed in Phase 2B

1. **`src/components/ToolLayout.tsx`**:
   - Replaced 20 top-level static calculator imports with `React.lazy()` dynamic imports.
   - Added `calculatorRegistry` prop to support synchronous component rendering during SSG prerendering.
   - Wrapped client calculator rendering in `<Suspense>`.
2. **`src/App.tsx`**:
   - Added optional `calculatorRegistry` prop to `AppProps` and passed it down to `ToolLayout`.
3. **`vite.config.ts`**:
   - Configured `rollupOptions.output.chunkFileNames` with `calc-[name]-[hash].js` prefix for clear bundle identification.
4. **`scripts/prerender.tsx`**:
   - Imported all 20 calculator components synchronously into `syncCalculators` for server-side HTML generation only.
   - Passed `syncCalculators` into `<App />` during prerender so that static HTML files render 100% complete markup without fallbacks.
   - Added automated injection of route-specific `<link rel="modulepreload">` tags for the matching calculator chunk on each calculator route.

---

## 14. Known Limitations

1. **Shared Vendor React Runtime:**
   - React 19 core and DOM runtime remain in a single chunk (`vendor-react-*.js`, 430.33 kB / 129.22 kB gzip). This is standard for React SPA/islands frameworks and is shared across all pages via browser cache.
2. **Editorial Guide Text in Client Bundle:**
   - The article text for the 8 editorial guides remains in data files imported by `GuidePage.tsx`. In a future phase, route-level code splitting for guides can be added if guide content expands significantly.

---

## 15. Future Improvements (Phase 2C+)

1. **Route-Level Splitting for Informational Pages:**
   - Lazy-load `/about`, `/contact`, `/privacy`, and `/terms` so their text is not included in `index.js`.
2. **Guide Page Code Splitting:**
   - Dynamically load individual guide modules when navigating between guides on the client.
3. **PWA Service Worker Caching:**
   - Cache pre-rendered static HTML and calculator chunks for offline mobile use.

---

## 16. Final Status

### **PASS**

All acceptance criteria for Phase 2B have been achieved. The monolithic 520 kB bundle has been reduced to 310 kB, all 20 calculators are split into isolated chunks, and the static HTML output remains 100% complete without regressions.
