# Practical Tools — Phase 3C: Source Accuracy, Assumption Transparency & Regression QA Report

**Project:** [Practical Tools](https://practicaltools.org/)  
**Date:** October 2026  
**Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Static HTML Pre-rendering (SSG), Vercel  
**Status:** ✅ Successfully Audited, Corrected, and Verified  

---

## 1. Executive Summary

Phase 3C is a focused corrective and audit pass following the Phase 3B differentiation implementation. The objective of Phase 3C is to eliminate any over-extended or inaccurate citations, establish complete transparency for calculation defaults and planning estimates, and verify mathematical and structural integrity through comprehensive regression QA.

Specifically, Phase 3C addresses:
1. **Concrete Bag Yield Attribution:** Removed the claim that ASTM C387 universally mandates fixed yields for every bag size. Bag yields (~0.60 cu ft for 80-lb, ~0.45 cu ft for 60-lb, ~0.375 cu ft for 50-lb) are accurately attributed to manufacturer Technical Data Sheets (e.g., QUIKRETE® Concrete Mix #1101, Sakrete). Users can now directly edit the bag yield in `ConcreteCalculator.tsx` to match their specific product label.
2. **Paint Opening Deductions:** Removed claims that International Residential Code (IRC) Section R311.2 mandates a 20 sq ft paint deduction per door, and that AAMA/FGIA mandates a universal 15 sq ft deduction per window. Standard allowances are correctly attributed to architectural trade estimating conventions. Added optional custom opening deduction inputs in `PaintCalculator.tsx` and mathematically guaranteed that deductions cannot produce negative net wall area.
3. **About Page & Site-Wide Sourcing Audit:** Updated `AboutPage.tsx` and `src/data/tools.ts` to ensure every citation reflects true published standards and manufacturer literature without exaggerating code authority.
4. **Automated Regression QA:** Expanded `scripts/test-calculators.ts` to test custom opening dimensions, opening deduction clamping, and custom concrete bag yields. All 20 calculators pass automated regression testing, and all 41 public routes prerender to static HTML with zero build warnings or type errors.

---

## 2. Detailed Corrections & Engineering Changes

### 2.1 Concrete Calculator (`/calculators/concrete`)

* **Identified Defect:** Prior copy suggested that ASTM C387 universally establishes fixed volume yields for every 80-lb, 60-lb, and 50-lb premix bag. In reality, ASTM C387/C387M specifies manufacturing performance standards (compressive strength, consistency, packaging requirements), while specific yield per bag depends on aggregate gradation, density, and manufacturer blend.
* **Corrections Implemented:**
  - **Accurate Source Attribution:** Bag yields are explicitly attributed to commercial manufacturer Technical Data Sheets (such as QUIKRETE® Concrete Mix #1101 and Sakrete Concrete Mix).
  - **Editable Bag Yield Input:** Added an editable `Premix Bag Yield (cu ft per bag)` input in `src/components/calculators/ConcreteCalculator.tsx`. While typical defaults are provided (0.60 cu ft for 80-lb; 0.45 cu ft for 60-lb; 0.375 cu ft for 50-lb), users can adjust the yield to reflect lightweight formulas, rapid-set mixes, or regional aggregate densities.
  - **Mathematical Consistency:** Verified that bag count (`Math.ceil(recommendedCubicFeet / activeYield)`), total weight in pounds (`bags × bagWeight`), and total weight in US tons (`weightLbs / 2000`) remain strictly synchronized with user-edited yields.
  - **Delivery Logistics Guidance:** Ready-mix delivery advice is presented as practical economic and logistical planning guidance (explaining short-load minimum charges and recommending local quote comparison) rather than an inflexible rule.

### 2.2 Paint Calculator (`/calculators/paint`)

* **Identified Defect:** Prior references suggested that IRC Section R311.2 mandates a 20 sq ft paint deduction per door and that FGIA/AAMA mandates a 15 sq ft deduction per window. In reality, building codes like IRC specify minimum clear opening widths and heights for egress, not interior finish estimating allowances.
* **Corrections Implemented:**
  - **Accurate Attribution:** Opening deductions are explicitly identified as standard residential trade estimating conventions (~20 sq ft for typical 32″×80″ or 36″×80″ passage doors including jamb and casing; ~15 sq ft for nominal 3×5 ft double-hung windows).
  - **Custom Opening Controls:** Added an optional expandable section in `src/components/calculators/PaintCalculator.tsx` enabling users to enter custom deduction area per door and per window.
  - **Negative Area Clamping:** Verified that `estimatedWallArea` is clamped via `Math.max(0, grossWallArea - openingsDeduction)` in `src/lib/calculators/paint.ts`, preventing negative paintable areas and negative paint orders under extreme input conditions.
  - **Unit Consistency:** Verified seamless conversion between imperial (sq ft, gallons, quarts) and metric (m², liters) modes, including properly scaled default opening deductions (1.86 m² per door, 1.39 m² per window).

### 2.3 About Page & Technical Bibliography (`/about`)

* **Corrections in `src/pages/AboutPage.tsx`:**
  - **Concrete Citation:** Re-titled entry to *"Concrete Volume Geometry & Manufacturer Technical Data Sheets"*. Clarified that ASTM C387/C387M governs manufacturing quality and strength, while bag volume yields derive from manufacturer TDS (QUIKRETE® #1101, Sakrete) and volume geometry (27 cu ft/cu yd).
  - **Paint Opening Citation:** Re-titled entry to *"Architectural Opening Deductions (Trade Estimating Practice)"*. Clearly notes that ~20 sq ft per door and ~15 sq ft per window are trade estimating conventions rather than building code mandates.
  - **Utility Rates Citation:** Clarified that EIA Electric Power Monthly Table 5.6.A figures are point-in-time regional benchmarks subject to local utility tariffs and fuel adjustment tiers.
  - **Flooring Citation:** Clarified that NWFA Installation Guidelines provide trade recommended waste allowances (10% straight, 15% diagonal, 20% herringbone) rather than rigid mandates.

### 2.4 Tool Metadata Audit (`src/data/tools.ts`)

* Updated formula explanations for the Concrete Calculator in `src/data/tools.ts` to remove `[ASTM C387]` from the bag count step, replacing it with `[Commercial Premix TDS: ~0.60 cu ft/bag]`.
* Confirmed that Paint Calculator explanations and assumptions describe door and window deductions as illustrative trade planning conventions.

---

## 3. Verification & Quality Assurance Results

### 3.1 Automated Functional Test Suite (`scripts/test-calculators.ts`)
Run command: `npx tsx scripts/test-calculators.ts`  
**Result:** 20/20 Calculators passed with zero errors.

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

Key test assertions verified:
- `PaintCalculator`: Custom opening deduction calculation (e.g. 25 sq ft door + 20 sq ft window).
- `PaintCalculator`: Negative net area clamping test (50 doors on a 400 sq ft room clamped to 0 net area and 0 gallons).
- `ConcreteCalculator`: Custom bag yield parameter test (0.55 cu ft/bag yield producing exact 67 bags and 5,360 lbs weight).

### 3.2 TypeScript Typecheck
Run command: `npx tsc --noEmit`  
**Result:** 0 errors.

### 3.3 Static Site Pre-rendering (SSG) & Production Build
Run command: `npm run build`  
**Result:**
- Vite build completed in 4.25s with zero Rollup chunk warnings.
- All 41 public routes pre-rendered to static HTML in `dist/`.
- Validated that corrected citations, updated methodology disclosures, and interactive controls are pre-rendered for search engines and crawlers.

---

## 4. Summary Table of Addressed Items

| Target Area | Initial State / Finding | Phase 3C Correction | Verification Status |
|:---|:---|:---|:---|
| **Concrete Bag Yield** | Attributed 0.60/0.45/0.375 cu ft yields directly to ASTM C387 | Attributed yields to manufacturer Technical Data Sheets (QUIKRETE® #1101, Sakrete); clarified ASTM C387 governs material strength; added editable yield input | Passed automated tests & manual UI verification |
| **Concrete Delivery Advice** | Fixed threshold for ready-mix vs. bagged | Framed as practical economic guidance advising users to check local short-load minimums | Verified in component copy & tool data |
| **Paint Door Deduction** | Claimed IRC R311.2 mandates 20 sq ft deduction per door | Removed code mandate claim; attributed to trade estimating practice; added custom door area input | Passed clamping and custom area tests |
| **Paint Window Deduction** | Claimed AAMA/FGIA mandates 15 sq ft deduction per window | Removed standard mandate claim; attributed to trade estimating practice; added custom window area input | Passed custom area tests |
| **Paint Area Clamping** | Potential risk of negative net area if openings exceed room | Enforced `Math.max(0, gross - openings)` preventing negative paint requirements | Unit test verified |
| **About Page Citations** | Exaggerated code authority across concrete and openings | Re-anchored bibliography to manufacturer TDS, volume geometry, and trade conventions | Pre-rendered and verified |
| **Regression Coverage** | 20 baseline tests | Expanded test suite with custom opening, clamp, and custom yield edge cases | 20/20 passed |
