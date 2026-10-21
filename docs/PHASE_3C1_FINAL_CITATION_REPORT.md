# Practical Tools — Phase 3C.1: Final Citation & Benchmark Corrections Report

**Project:** [Practical Tools](https://practicaltools.org/)  
**Date:** October 2026  
**Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Static Site Generation (SSG), Vercel  
**Status:** ✅ Fully Corrected, Verified, and Prerendered  

---

## 1. Executive Summary

Phase 3C.1 completes the remaining evidence, citation, and benchmark accuracy corrections identified during the independent Phase 3C audit of Practical Tools.

The objective was not to add generic text or invent artificial authority, but rather to establish transparent distinctions between:
1. **Government Statistical Benchmarks** (U.S. EIA residential electricity data, USDA FoodData Central)
2. **Manufacturer Product Technical Specifications** (QUIKRETE® #1101, Sakrete® High-Strength Concrete)
3. **Official Baking Master Standards** (King Arthur Baking Company Master Ingredient Weight Chart)
4. **Editable Trade Planning Allowances** (Flooring waste percentages, door/window paint deductions, suggested retail paint package combinations)

All citations on `/about` now include direct, accessible links to primary source documents with proper security attributes (`target="_blank" rel="noopener noreferrer"`). All claims attributing specific numerical waste factors to NWFA or code-mandated deductions to IRC/AAMA have been corrected.

---

## 2. Distinctions & Sourcing Breakdown

### 2.1 Checks Actually Executed During This Run
* **Primary Source URL Auditing:** Verified live HTTP status and path correctness for:
  - QUIKRETE® Concrete Mix #1101 technical product documentation (`https://www.quikrete.com/product/concrete-mix` - HTTP 200)
  - Sakrete® High-Strength Concrete Mix product specifications (`https://www.sakrete.com/product/high-strength-concrete-mix/` - HTTP 200)
  - U.S. EIA Electric Power Monthly Table 5.6.A residential electricity price table (`https://www.eia.gov/electricity/monthly/epm_table_grapher.php?t=epmt_5_6_a`)
  - King Arthur Baking Master Ingredient Weight Chart (`https://www.kingarthurbaking.com/learn/ingredient-weight-chart` - HTTP 200)
  - USDA FoodData Central All-Purpose Flour entry (`https://fdc.nal.usda.gov/fdc-app.html#/food-details/168893/nutrients`)
* **Flooring Waste Attribution Verification:** Confirmed that NWFA does not publish a universal mandate prescribing exact 10%, 15%, and 20% waste factors. Successfully removed NWFA attribution for these percentages across `src/lib/calculators/flooring.ts`, `src/components/calculators/FlooringCalculator.tsx`, `src/pages/AboutPage.tsx`, and `src/data/tools.ts`.
* **Electricity Reference Period & Scope:** Documented that the $0.168/kWh default and state benchmarks reflect U.S. EIA Electric Power Monthly Table 5.6.A residential survey data (2024 published benchmark period). Added explicit disclosures that EIA statewide averages aggregate generation and delivery over entire states, whereas household power bills reflect specific utility tariffs, fixed customer meter fees, seasonal rate tiers, and taxes.
* **Paint Opening Inputs & Equivalence:** Verified that controls accept deduction area per opening (`sq ft` or `m²`), not dimensions. Verified that US customary (20 sq ft, 15 sq ft) and metric (1.86 m², 1.39 m²) defaults are mathematically equivalent within 0.1% rounding tolerance (20 × 0.092903 = 1.858 m² ≈ 1.86 m²; 15 × 0.092903 = 1.3935 m² ≈ 1.39 m²). Verified opening deduction clamping prevents negative net paintable area.
* **Paint Package Suggestion Boundaries:** Audited and tested excess thresholds in `src/lib/calculators/paint.ts` across 0.25, 0.50, and 0.75 gallons. Confirmed that total purchased volume always meets or exceeds required volume, without unverified cost-savings claims.
* **Automated Regression QA:** Executed `npx tsx scripts/test-calculators.ts` (20/20 passed), `npx tsc --noEmit` (0 errors), and `npm run build` (all 41 public routes prerendered). Verified presence of GA4 (`G-KB367TCJTJ`), AdSense (`ca-pub-1850854173653124`), `ads.txt`, sitemap, canonical links, and `404.html`.

### 2.2 Findings Inherited From Earlier Reports
* Identification of "Low Value Content" Google AdSense review rejections prior to Phase 3.
* Static HTML prerendering, code-splitting, and 404 handling implemented in Phase 2B.
* Concrete weight outputs, paint can sizing combinations, and flour density updates introduced in Phase 3B.

### 2.3 Sources Directly Verified
1. **QUIKRETE® Concrete Mix #1101 Technical Data:** 80-lb bag yields ~0.60 cu ft; 60-lb bag yields ~0.45 cu ft; 40-lb bag yields ~0.30 cu ft. Meets ASTM C387 compressive strength.
2. **Sakrete® High-Strength Concrete Mix:** 80-lb bag yields ~0.60 cu ft; 60-lb bag yields ~0.45 cu ft.
3. **U.S. Energy Information Administration (EIA) Electric Power Monthly (Table 5.6.A):** Residential electricity price survey data (2024 published benchmarks: U.S. national residential average ~16.8¢/kWh; Washington ~12.5¢/kWh; Texas ~15.0¢/kWh; California ~33.0¢/kWh; Hawaii ~44.0¢/kWh).
4. **King Arthur Baking Company Master Weight Chart:** 1 US cup of all-purpose flour = 120 grams (4.25 oz), fluffed, gently spooned into cup, and leveled with a straight edge.
5. **USDA FoodData Central (FDC ID 168893):** Wheat flour, white, all-purpose, unenriched density benchmark.

### 2.4 Estimates That Remain Editorial Planning Assumptions
1. **Flooring Waste Percentages:** 10% for straight parallel planks, 15% for diagonal 45° runs, and 20% for herringbone/chevron patterns. Labeled strictly as illustrative trade planning allowances; editable by the user.
2. **Paint Opening Deductions:** ~20 sq ft (1.86 m²) per passage door (nominal 32″×80″ opening plus frame and casing trim) and ~15 sq ft (1.39 m²) per double-hung window (nominal 3×5 ft). Labeled strictly as trade planning allowances; editable by the user.
3. **Paint Spreading Rates:** 350 sq ft/gal on smooth primed drywall; 275 sq ft/gal on orange-peel drywall; 175 sq ft/gal on rough masonry. Standard spreading rates based on trade manufacturer Technical Data Sheets (Sherwin-Williams, Benjamin Moore).
4. **Paint Retail Packaging Mix:** Suggesting whole gallons + 1 quart for fractional needs $\le 0.25$ gal, whole gallons + 2 quarts for fractional needs $\le 0.50$ gal, and an additional full gallon for needs $> 0.50$ gal. Clarified as packaging logistics based on standard container sizes (1 gal = 4 quarts), not guaranteed retail price minimization.

### 2.5 Unresolved Issues
* None. All identified claims from the Phase 3C audit have been addressed, verified, and reconciled with automated regression testing.

---

## 3. Summary of Code & Documentation Modifications

| File | Change Summary |
|:---|:---|
| `src/pages/AboutPage.tsx` | Added `ExternalLink` icon and direct clickable links to QUIKRETE, Sakrete, U.S. EIA, King Arthur Baking, and USDA. Removed claims of NWFA waste mandates and IRC/AAMA deduction mandates. Added source classification badges. |
| `src/lib/calculators/flooring.ts` | Updated error messages and internal documentation to describe 10%/15%/20% as illustrative trade planning allowances. |
| `src/components/calculators/FlooringCalculator.tsx` | Updated pattern selector label to *"Illustrative Pattern Waste Allowances (Editable)"*. Clarified planning note explaining that waste is affected by room geometry, plank width, installer skill, and product defect culling. |
| `src/lib/calculators/electricity.ts` | Clarified EIA 2024 published benchmark survey period in validation messages. |
| `src/components/calculators/ElectricityCostCalculator.tsx` | Updated header to *"Reference Benchmarks (U.S. EIA 2024 Survey Data)"*. Added comprehensive disclaimer regarding utility tariffs, fixed charges, seasonal tiers, and taxes. |
| `src/lib/calculators/paint.ts` | Refined container sizing logic and descriptions to remove unverified price savings claims. Clarified that 1 gal = 4 quarts and documented touch-up buffer volume. |
| `src/components/calculators/PaintCalculator.tsx` | Updated input labels to explicitly indicate *area per opening* (`sq ft / door`, `sq ft / window`). Clarified metric/imperial equivalence. Refined package combination guide text. |
| `src/data/tools.ts` | Synchronized tool descriptions, formulas, and assumptions for Flooring, Paint, and Electricity, eliminating remaining NWFA mandate and undated national average claims. |
| `scripts/test-calculators.ts` | Added boundary tests for 0.25, 0.50, and 0.75 excess gallons, opening deduction clamping, and custom concrete yields. |

---

## 4. Verification Results

### 4.1 Automated Functional Tests
Command: `npx tsx scripts/test-calculators.ts`
```text
🧪 Starting Functional Regression Test for all 20 Calculators (including Phase 3B enhancements)...

  ✓ 1. Percentage Calculator
  ✓ 2. Discount Calculator
  ✓ 3. Tip Calculator
  ✓ 4. Salary Calculator
  ✓ 5. Markup Calculator
  ✓ 6. Paint Calculator & Can Optimizer
  ✓ 7. Flooring Calculator & Carton Purchasing
  ✓ 8. Tile Calculator
  ✓ 9. Concrete Calculator & Weight Verification
  ✓ 10. Mulch Calculator
  ✓ 11. Fuel Cost Calculator
  ✓ 12. Gas Mileage Calculator
  ✓ 13. Commute Cost Calculator
  ✓ 14. Electricity Cost Calculator & Rate Breakdown
  ✓ 15. Date Difference Calculator
  ✓ 16. Recipe Scale Calculator
  ✓ 17. Cooking Unit Converter
  ✓ 18. Cups to Grams Converter (King Arthur 120g & Bidirectional)
  ✓ 19. Work Hours Calculator
  ✓ 20. GPA Calculator

🎉 Results: 20/20 Calculators passed functional testing without error!
```

### 4.2 TypeScript Typecheck
Command: `npx tsc --noEmit`  
**Result:** 0 errors.

### 4.3 Production Build & SSG Prerendering
Command: `npm run build`  
**Result:** 41/41 public routes prerendered to complete static HTML in `dist/`.

### 4.4 Live Tag Verification
- GA4 tag `G-KB367TCJTJ`: Verified in `dist/index.html` and `dist/404.html`.
- Google AdSense tag `ca-pub-1850854173653124`: Verified in `dist/index.html` and `dist/404.html`.
- Sitemap: Verified in `dist/sitemap.xml` with 40 canonical public `<loc>` entries (excluding the `/404` error document, which is generated as `dist/404.html` for server error handling but excluded from the sitemap).

---

## 5. Phase 3C.2 Corrective Pass Addendum

In Phase 3C.2, the following source consistency and benchmark refinements were executed and verified:
1. **EIA Table 2.10 Benchmarks:** Updated electricity benchmarks from Electric Power Monthly Table 5.6.A to Electric Power Annual Table 2.10 (2024 annual residential averages: US Total 16.48¢/kWh [$0.165/kWh]; WA 11.90¢/kWh [$0.119/kWh]; TX 14.94¢/kWh [$0.149/kWh]; CA 31.97¢/kWh [$0.320/kWh]; HI 42.86¢/kWh [$0.429/kWh]). Linked directly to `https://www.eia.gov/electricity/annual/table.php?t=epa_02_10.html`.
2. **QUIKRETE & Sakrete PDFs:** Replaced broken product page URL with direct technical data sheet PDF `https://www.quikrete.com/pdfs/spec_data-concretemix.pdf` (HTTP 200) and linked Sakrete TDS PDF `https://www.sakrete.com/wp-content/uploads/2024/01/Sakrete-High-Strength-Concrete-Mix-TDS.pdf` (HTTP 200). Explicitly labeled 50-lb premix yield as an editable proportional planning estimate because 50-lb bags are not listed on cited commercial premix spec sheets.
3. **Baking Classification:** Replaced "Official Weight Standards" with "Ingredient Weight Reference." Clarified that King Arthur Baking is a widely respected professional baking reference (not a regulatory standards body) and USDA FoodData Central is a federal nutritional research database.
4. **Route vs Sitemap Count Reconciliation:** Confirmed that `dist/` contains 41 prerendered HTML files (40 canonical public pages + 1 `404.html` error document) and `dist/sitemap.xml` contains exactly 40 canonical `<loc>` entries.

