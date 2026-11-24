import { calculatePercentage } from '../src/lib/calculators/percentage';
import { calculateDiscount } from '../src/lib/calculators/discount';
import { calculateTip } from '../src/lib/calculators/tip';
import { calculateSalary } from '../src/lib/calculators/salary';
import { calculateMarkup } from '../src/lib/calculators/markup';
import { calculatePaint } from '../src/lib/calculators/paint';
import { calculateFlooring } from '../src/lib/calculators/flooring';
import { calculateTile } from '../src/lib/calculators/tile';
import { calculateConcrete } from '../src/lib/calculators/concrete';
import { calculateMulch } from '../src/lib/calculators/mulch';
import { calculateFuel } from '../src/lib/calculators/fuel';
import { calculateMileage } from '../src/lib/calculators/mileage';
import { calculateCommute } from '../src/lib/calculators/commute';
import { calculateElectricity, EIA_2024_RESIDENTIAL_BENCHMARKS } from '../src/lib/calculators/electricity';
import { calculateDateDifference } from '../src/lib/calculators/dateDifference';
import { calculateRecipeScale } from '../src/lib/calculators/recipeScale';
import { calculateCookingConverter } from '../src/lib/calculators/cookingConverter';
import { calculateCupsToGrams } from '../src/lib/calculators/cupsToGrams';
import { calculateWorkHours } from '../src/lib/calculators/workHours';
import { calculateGpa } from '../src/lib/calculators/gpa';
import { SOURCE_INVENTORY } from '../src/data/sources';

console.log('Running Automated Regression Suite for all 20 Calculators...\n');

let passed = 0;
let total = 0;

function test(name: string, fn: () => void) {
  total++;
  try {
    fn();
    passed++;
    console.log(`  [PASS] ${name}`);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`  [FAIL] ${name}:`, message);
  }
}

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertNear(actual: number, expected: number, tolerance: number, label: string) {
  if (Math.abs(actual - expected) > tolerance) {
    throw new Error(`${label}: expected ~${expected}, got ${actual}`);
  }
}

// ==========================================
// 1. PERCENTAGE CALCULATOR
// ==========================================
test('1. Percentage Calculator (normal, zero, boundary, invalid, special cases)', () => {
  // Normal inputs across all 3 modes
  const m1 = calculatePercentage({ mode: 'percent_of', m1Percent: '20', m1Value: '150' });
  assert(!m1.errorMessage && m1.resultText === '30', `Expected 30, got ${m1.resultText}`);

  const m2 = calculatePercentage({ mode: 'is_what_percent', m2Part: '35', m2Whole: '140' });
  assert(!m2.errorMessage && m2.resultText === '25%', `Expected 25%, got ${m2.resultText}`);

  const m3 = calculatePercentage({ mode: 'change', m3Initial: '50', m3Final: '65' });
  assert(!m3.errorMessage && m3.resultText === '+30%', `Expected +30%, got ${m3.resultText}`);

  // Zero values (valid 0%, 0 base, unchanged 0%, and division-by-zero rejection)
  const zeroPct = calculatePercentage({ mode: 'percent_of', m1Percent: '0', m1Value: '250' });
  assert(!zeroPct.errorMessage && zeroPct.resultText === '0', `Expected 0 for 0%, got ${zeroPct.resultText}`);

  const zeroVal = calculatePercentage({ mode: 'percent_of', m1Percent: '15', m1Value: '0' });
  assert(!zeroVal.errorMessage && zeroVal.resultText === '0', `Expected 0 for 0 base, got ${zeroVal.resultText}`);

  const zeroChange = calculatePercentage({ mode: 'change', m3Initial: '100', m3Final: '100' });
  assert(!zeroChange.errorMessage && zeroChange.resultText === '0%', `Expected 0%, got ${zeroChange.resultText}`);

  const divZeroM2 = calculatePercentage({ mode: 'is_what_percent', m2Part: '10', m2Whole: '0' });
  assert(Boolean(divZeroM2.errorMessage), 'Expected error when denominator is zero in is_what_percent');

  const divZeroM3 = calculatePercentage({ mode: 'change', m3Initial: '0', m3Final: '50' });
  assert(Boolean(divZeroM3.errorMessage), 'Expected error when baseline is zero in change mode');

  // Boundary & Special cases (decimal rate, decrease, negative baseline)
  const dec = calculatePercentage({ mode: 'percent_of', m1Percent: '2.5', m1Value: '10' });
  assert(dec.resultText === '0.25', `Expected 0.25, got ${dec.resultText}`);

  const decrease = calculatePercentage({ mode: 'change', m3Initial: '100', m3Final: '75' });
  assert(decrease.resultText === '-25%', `Expected -25%, got ${decrease.resultText}`);

  const negBaseline = calculatePercentage({ mode: 'change', m3Initial: '-100', m3Final: '-50' });
  assert(negBaseline.resultText === '+50%', `Expected +50% for -100 to -50, got ${negBaseline.resultText}`);

  // Invalid inputs
  assert(Boolean(calculatePercentage({ mode: 'percent_of', m1Percent: '', m1Value: '100' }).errorMessage), 'Expected error for empty percent');
  assert(Boolean(calculatePercentage({ mode: 'is_what_percent', m2Part: 'abc', m2Whole: '100' }).errorMessage), 'Expected error for non-numeric part');
  assert(Boolean(calculatePercentage({ mode: 'change', m3Initial: '10', m3Final: '' }).errorMessage), 'Expected error for empty final value');
});

// ==========================================
// 2. DISCOUNT CALCULATOR
// ==========================================
test('2. Discount Calculator (normal, zero, boundary, invalid, special cases)', () => {
  // Normal
  const normal = calculateDiscount({ originalPrice: '100', discountPercent: '20' });
  assert(!normal.errorMessage && normal.finalPrice === 80 && normal.discountAmount === 20, 'Normal discount failed');
  assert(normal.percentageSaved === 20, `Expected 20% saved, got ${normal.percentageSaved}`);

  // Zero values
  const zeroPrice = calculateDiscount({ originalPrice: '0', discountPercent: '20' });
  assert(!zeroPrice.errorMessage && zeroPrice.finalPrice === 0 && zeroPrice.percentageSaved === 0, 'Zero price should yield $0 and 0% saved');

  const zeroDisc = calculateDiscount({ originalPrice: '100', discountPercent: '0' });
  assert(!zeroDisc.errorMessage && zeroDisc.finalPrice === 100 && zeroDisc.discountAmount === 0, 'Zero discount should preserve price');

  // Boundary conditions (100% discount, 50% max tax, just-outside limits)
  const fullOff = calculateDiscount({ originalPrice: '85', discountPercent: '100' });
  assert(!fullOff.errorMessage && fullOff.finalPrice === 0 && fullOff.percentageSaved === 100, '100% discount failed');

  const maxTax = calculateDiscount({ originalPrice: '100', discountPercent: '0', salesTaxPercent: '50' });
  assert(!maxTax.errorMessage && maxTax.taxAmount === 50 && maxTax.finalPriceWithTax === 150, '50% max tax boundary failed');

  assert(Boolean(calculateDiscount({ originalPrice: '100', discountPercent: '100.1' }).errorMessage), 'Expected error for >100% discount');
  assert(Boolean(calculateDiscount({ originalPrice: '100', discountPercent: '10', salesTaxPercent: '50.1' }).errorMessage), 'Expected error for >50% tax');

  // Invalid inputs
  assert(Boolean(calculateDiscount({ originalPrice: '', discountPercent: '20' }).errorMessage), 'Expected error for empty price');
  assert(Boolean(calculateDiscount({ originalPrice: '-10', discountPercent: '20' }).errorMessage), 'Expected error for negative price');
  assert(Boolean(calculateDiscount({ originalPrice: 'abc', discountPercent: '20' }).errorMessage), 'Expected error for NaN price');
  assert(Boolean(calculateDiscount({ originalPrice: '100', discountPercent: '-5' }).errorMessage), 'Expected error for negative discount');
  assert(Boolean(calculateDiscount({ originalPrice: '100', discountPercent: '10', salesTaxPercent: '-1' }).errorMessage), 'Expected error for negative tax');
  assert(Boolean(calculateDiscount({ originalPrice: '100', discountPercent: '10', salesTaxPercent: 'abc' }).errorMessage), 'Expected error for NaN tax');

  // Special case: post-discount sales tax
  const withTax = calculateDiscount({ originalPrice: '100', discountPercent: '20', salesTaxPercent: '8' });
  assertNear(withTax.finalPrice, 80, 0.001, 'Pre-tax sale price');
  assertNear(withTax.taxAmount, 6.4, 0.001, 'Sales tax on discounted price');
  assertNear(withTax.finalPriceWithTax, 86.4, 0.001, 'Final price with tax');
});

// ==========================================
// 3. TIP CALCULATOR
// ==========================================
test('3. Tip Calculator (normal, zero, boundary, invalid, special cases)', () => {
  // Normal
  const normal = calculateTip({ billAmount: '100', tipPercent: 18, peopleCount: '2' });
  assert(!normal.errorMessage && normal.tipAmount === 18 && normal.totalBill === 118 && normal.amountPerPerson === 59 && normal.tipPerPerson === 9, 'Normal tip failed');

  // Zero values
  const zeroBill = calculateTip({ billAmount: '0', tipPercent: 20, peopleCount: '2' });
  assert(!zeroBill.errorMessage && zeroBill.totalBill === 0 && zeroBill.amountPerPerson === 0, 'Zero bill should return 0');

  const zeroTip = calculateTip({ billAmount: '50', tipPercent: 0, peopleCount: '1' });
  assert(!zeroTip.errorMessage && zeroTip.tipAmount === 0 && zeroTip.totalBill === 50, 'Zero tip should equal bill');

  // Boundary conditions (0..200% tip, min 1 person)
  const maxTip = calculateTip({ billAmount: '50', tipPercent: 200, peopleCount: '1' });
  assert(!maxTip.errorMessage && maxTip.tipAmount === 100 && maxTip.totalBill === 150, '200% tip boundary failed');

  assert(Boolean(calculateTip({ billAmount: '50', tipPercent: 201, peopleCount: '1' }).errorMessage), 'Expected error for >200% tip');
  assert(Boolean(calculateTip({ billAmount: '50', tipPercent: 15, peopleCount: '0' }).errorMessage), 'Expected error for 0 people');

  // Invalid inputs
  assert(Boolean(calculateTip({ billAmount: '', tipPercent: 15, peopleCount: '1' }).errorMessage), 'Expected error for empty bill');
  assert(Boolean(calculateTip({ billAmount: '-25', tipPercent: 15, peopleCount: '1' }).errorMessage), 'Expected error for negative bill');
  assert(Boolean(calculateTip({ billAmount: 'abc', tipPercent: 15, peopleCount: '1' }).errorMessage), 'Expected error for NaN bill');
  assert(Boolean(calculateTip({ billAmount: '50', tipPercent: 15, isCustom: true, customTip: '-5', peopleCount: '1' }).errorMessage), 'Expected error for negative custom tip');
  assert(Boolean(calculateTip({ billAmount: '50', tipPercent: 15, isCustom: true, customTip: 'abc', peopleCount: '1' }).errorMessage), 'Expected error for non-numeric custom tip');
  assert(Boolean(calculateTip({ billAmount: '50', tipPercent: 15, peopleCount: '2.5' }).errorMessage), 'Expected error for fractional people count');

  // Special cases: custom tip percentage & roundUp (including exact whole dollar preservation)
  const custom = calculateTip({ billAmount: '80', tipPercent: 15, isCustom: true, customTip: '22.5', peopleCount: '2' });
  assertNear(custom.tipAmount, 18, 0.001, 'Custom 22.5% tip');

  const rounded = calculateTip({ billAmount: '43', tipPercent: 15, peopleCount: '1', roundUp: true });
  // 43 + 6.45 = 49.45 -> ceil = 50 -> tip = 7
  assert(rounded.totalBill === 50 && rounded.tipAmount === 7, `Expected roundUp total 50/tip 7, got ${rounded.totalBill}/${rounded.tipAmount}`);

  const exactRound = calculateTip({ billAmount: '50', tipPercent: 0, peopleCount: '1', roundUp: true });
  assert(exactRound.totalBill === 50 && exactRound.tipAmount === 0, `Exact whole dollar should not round up: got ${exactRound.totalBill}`);

  const tinyPositiveRound = calculateTip({ billAmount: '0.0000000005', tipPercent: 0, peopleCount: '1', roundUp: true });
  assert(tinyPositiveRound.totalBill === 1, `Tiny positive bill roundUp should give $1, got ${tinyPositiveRound.totalBill}`);

  const legitExcessRound = calculateTip({ billAmount: '50.0000000005', tipPercent: 0, peopleCount: '1', roundUp: true });
  assert(legitExcessRound.totalBill === 51, `Legitimate 5e-10 excess over $50 should round up to $51, got ${legitExcessRound.totalBill}`);
});

// ==========================================
// 4. SALARY TO HOURLY CALCULATOR
// ==========================================
test('4. Salary Calculator (normal, zero, boundary, invalid, special cases)', () => {
  // Normal
  const normal = calculateSalary({ annualSalary: '52000', hoursPerWeek: '40', weeksPerYear: '52' });
  assert(!normal.errorMessage && normal.hourlyRate === 25 && normal.weeklyGross === 1000 && normal.biweeklyGross === 2000, 'Normal salary calc failed');
  assertNear(normal.monthlyGross, 52000 / 12, 0.01, 'Monthly gross');

  // Zero values (all must reject because salary, hours, and weeks must be > 0)
  assert(Boolean(calculateSalary({ annualSalary: '0', hoursPerWeek: '40', weeksPerYear: '52' }).errorMessage), 'Expected error for 0 salary');
  assert(Boolean(calculateSalary({ annualSalary: '52000', hoursPerWeek: '0', weeksPerYear: '52' }).errorMessage), 'Expected error for 0 hours/week');
  assert(Boolean(calculateSalary({ annualSalary: '52000', hoursPerWeek: '40', weeksPerYear: '0' }).errorMessage), 'Expected error for 0 weeks/year');

  // Boundary conditions (1..168 hours/week, 1..52 weeks/year)
  const upperBound = calculateSalary({ annualSalary: '87360', hoursPerWeek: '168', weeksPerYear: '52' });
  assert(!upperBound.errorMessage && upperBound.totalAnnualHours === 8736 && upperBound.hourlyRate === 10, 'Upper boundary 168h/52w failed');

  assert(Boolean(calculateSalary({ annualSalary: '52000', hoursPerWeek: '169', weeksPerYear: '52' }).errorMessage), 'Expected error for >168 hours/week');
  assert(Boolean(calculateSalary({ annualSalary: '52000', hoursPerWeek: '40', weeksPerYear: '53' }).errorMessage), 'Expected error for >52 weeks/year');

  // Invalid inputs
  assert(Boolean(calculateSalary({ annualSalary: '', hoursPerWeek: '40', weeksPerYear: '52' }).errorMessage), 'Expected error for empty salary');
  assert(Boolean(calculateSalary({ annualSalary: '-50000', hoursPerWeek: '40', weeksPerYear: '52' }).errorMessage), 'Expected error for negative salary');
  assert(Boolean(calculateSalary({ annualSalary: 'abc', hoursPerWeek: '40', weeksPerYear: '52' }).errorMessage), 'Expected error for NaN salary');

  // Special case: unpaid vacation (50 weeks/year, 35 hours/week) and biweekly consistency
  const customWeeks = calculateSalary({ annualSalary: '52500', hoursPerWeek: '35', weeksPerYear: '50' });
  assert(customWeeks.totalAnnualHours === 1750 && customWeeks.hourlyRate === 30, 'Unpaid vacation weeks calculation failed');
  assert(customWeeks.weeklyGross === 1050 && customWeeks.biweeklyGross === 2100, 'Biweekly gross must equal 2x weekly gross');
});

// ==========================================
// 5. MARKUP CALCULATOR
// ==========================================
test('5. Markup Calculator (normal, zero, boundary, invalid, special cases)', () => {
  // Normal (keystone 100% markup)
  const normal = calculateMarkup({ cost: '50', markupPercent: '100' });
  assert(!normal.errorMessage && normal.sellingPrice === 100 && normal.markupAmount === 50 && normal.grossMarginPercent === 50, 'Keystone markup failed');

  // Zero values (0 cost and 0% markup both valid non-negative)
  const zeroCost = calculateMarkup({ cost: '0', markupPercent: '50' });
  assert(!zeroCost.errorMessage && zeroCost.sellingPrice === 0 && zeroCost.grossMarginPercent === 0, 'Zero cost should yield 0 price/margin');

  const zeroMarkup = calculateMarkup({ cost: '80', markupPercent: '0' });
  assert(!zeroMarkup.errorMessage && zeroMarkup.sellingPrice === 80 && zeroMarkup.markupAmount === 0 && zeroMarkup.grossMarginPercent === 0, 'Zero markup failed');

  // Boundary & high markup (>100% markup yields <100% margin)
  const highMarkup = calculateMarkup({ cost: '10', markupPercent: '400' });
  assert(!highMarkup.errorMessage && highMarkup.sellingPrice === 50 && highMarkup.grossMarginPercent === 80, '400% markup should yield 80% margin');

  // Invalid inputs
  assert(Boolean(calculateMarkup({ cost: '', markupPercent: '50' }).errorMessage), 'Expected error for empty cost');
  assert(Boolean(calculateMarkup({ cost: '50', markupPercent: '' }).errorMessage), 'Expected error for empty markup');
  assert(Boolean(calculateMarkup({ cost: '-10', markupPercent: '50' }).errorMessage), 'Expected error for negative cost');
  assert(Boolean(calculateMarkup({ cost: '50', markupPercent: '-10' }).errorMessage), 'Expected error for negative markup');
  assert(Boolean(calculateMarkup({ cost: 'abc', markupPercent: '50' }).errorMessage), 'Expected error for NaN cost');

  // Special case: markup % vs gross margin % distinction
  const distinct = calculateMarkup({ cost: '80', markupPercent: '25' });
  assert(distinct.sellingPrice === 100 && distinct.markupAmount === 20 && distinct.grossMarginPercent === 20, '25% markup on $80 must yield 20% gross margin');
});

// ==========================================
// 6. PAINT CALCULATOR
// ==========================================
test('6. Paint Calculator (normal, zero, boundary, invalid, special cases)', () => {
  // Normal
  const res = calculatePaint({ unit: 'imperial', length: '14', width: '12', height: '8', doors: '1', windows: '2', coats: 2, coveragePerGallon: '350' });
  assert(!res.errorMessage && res.grossWallArea === 416 && res.openingsDeduction === 50 && res.estimatedWallArea === 366, 'Paint net area failed');
  assert(res.recommendedGallons === 2 && res.recommendedQuarts === 1, `Expected 2 gal + 1 qt, got ${res.recommendedGallons} gal + ${res.recommendedQuarts} qt`);

  // Zero values (0 doors/windows valid; 0 room dims or 0 coverage rejected)
  const noOpenings = calculatePaint({ unit: 'imperial', length: '10', width: '10', height: '10', doors: '0', windows: '0', coats: 1, coveragePerGallon: '400' });
  assert(!noOpenings.errorMessage && noOpenings.openingsDeduction === 0 && noOpenings.recommendedGallons === 1 && noOpenings.recommendedQuarts === 0, 'Zero openings failed');

  assert(Boolean(calculatePaint({ unit: 'imperial', length: '0', width: '10', height: '8', doors: '0', windows: '0', coats: 2, coveragePerGallon: '350' }).errorMessage), 'Expected error for 0 length');
  assert(Boolean(calculatePaint({ unit: 'imperial', length: '10', width: '10', height: '8', doors: '0', windows: '0', coats: 2, coveragePerGallon: '0' }).errorMessage), 'Expected error for 0 coverage');

  // Boundary conditions: 0.25, 0.50, 0.75 gal package thresholds & deduction clamping
  const b25 = calculatePaint({ unit: 'imperial', length: '10', width: '10', height: '10', doors: '0', windows: '0', coats: 1, coveragePerGallon: '320' }); // 1.25 gal
  assert(b25.recommendedGallons === 1 && b25.recommendedQuarts === 1 && b25.totalPurchasedVolume >= b25.estimatedPaintRequired, '0.25 gal threshold failed');

  const b50 = calculatePaint({ unit: 'imperial', length: '10', width: '10', height: '10', doors: '0', windows: '0', coats: 1, coveragePerGallon: (400 / 1.5).toString() }); // 1.50 gal
  assert(b50.recommendedGallons === 1 && b50.recommendedQuarts === 2 && b50.totalPurchasedVolume >= b50.estimatedPaintRequired, '0.50 gal threshold failed');

  const b75 = calculatePaint({ unit: 'imperial', length: '10', width: '10', height: '10', doors: '0', windows: '0', coats: 1, coveragePerGallon: (400 / 1.75).toString() }); // 1.75 gal
  assert(b75.recommendedGallons === 2 && b75.recommendedQuarts === 0 && b75.totalPurchasedVolume >= b75.estimatedPaintRequired, '0.75 gal threshold failed');

  const clamped = calculatePaint({ unit: 'imperial', length: '10', width: '10', height: '10', doors: '50', windows: '0', coats: 2, coveragePerGallon: '350' });
  assert(clamped.estimatedWallArea === 0 && clamped.estimatedPaintRequired === 0 && clamped.recommendedGallons === 0, 'Clamping over-deducted wall area failed');

  // Invalid inputs
  assert(Boolean(calculatePaint({ unit: 'imperial', length: '', width: '10', height: '8', doors: '0', windows: '0', coats: 2, coveragePerGallon: '350' }).errorMessage), 'Expected error for empty length');
  assert(Boolean(calculatePaint({ unit: 'imperial', length: '-10', width: '10', height: '8', doors: '0', windows: '0', coats: 2, coveragePerGallon: '350' }).errorMessage), 'Expected error for negative length');
  assert(Boolean(calculatePaint({ unit: 'imperial', length: '10', width: '10', height: '8', doors: '-1', windows: '0', coats: 2, coveragePerGallon: '350' }).errorMessage), 'Expected error for negative doors');
  assert(Boolean(calculatePaint({ unit: 'imperial', length: '10', width: '10', height: '8', doors: '1.5', windows: '0', coats: 2, coveragePerGallon: '350' }).errorMessage), 'Expected error for fractional doors');
  assert(Boolean(calculatePaint({ unit: 'imperial', length: '10', width: '10', height: '8', doors: '1abc', windows: '0', coats: 2, coveragePerGallon: '350' }).errorMessage), 'Expected error for malformed doors');
  assert(Boolean(calculatePaint({ unit: 'imperial', length: '10', width: '10', height: '8', doors: '0', windows: '0', coats: 2, coveragePerGallon: 'abc' }).errorMessage), 'Expected error for NaN coverage');

  // Special cases: custom opening area & metric liters
  const customOpenings = calculatePaint({ unit: 'imperial', length: '10', width: '10', height: '10', doors: '2', windows: '1', coats: 1, coveragePerGallon: '350', doorArea: '25', windowArea: '20' });
  assert(customOpenings.openingsDeduction === 70 && customOpenings.estimatedWallArea === 330, 'Custom opening deduction failed');

  const metric = calculatePaint({ unit: 'metric', length: '5', width: '4', height: '3', doors: '1', windows: '1', coats: 2, coveragePerGallon: '10' });
  // Gross: 2*(5+4)*3 = 54 m2; ded: 1.86 + 1.39 = 3.25; net: 50.75; 2 coats = 101.5 / 10 = 10.15 L -> 11 L
  assert(metric.volumeUnit === 'Liters' && metric.recommendedCans === 11, `Expected 11 Liters, got ${metric.recommendedCans}`);

  // Tiny positive paint (<1e-9 gal) must require at least 1 can, not 0
  const tinyPaint = calculatePaint({ unit: 'imperial', length: '0.001', width: '0.001', height: '0.001', doors: '0', windows: '0', coats: 1, coveragePerGallon: '1000' });
  assert(tinyPaint.recommendedCans === 1, `Expected 1 can for tiny non-zero paint area, got ${tinyPaint.recommendedCans}`);
});

// ==========================================
// 7. FLOORING CALCULATOR
// ==========================================
test('7. Flooring Calculator (normal, zero, boundary, invalid, special cases)', () => {
  // Normal
  const res = calculateFlooring({ unit: 'feet', length: '20', width: '15', wastePercent: '10', boxSize: '20', pricePerUnit: '3.00' });
  assert(!res.errorMessage && res.basicFloorArea === 300 && res.wasteArea === 30 && res.recommendedMaterial === 330, 'Flooring area failed');
  assert(res.boxesNeeded === 17 && res.totalPurchasedArea === 340 && res.overageArea === 40 && res.totalEstimatedCost === 1020, 'Flooring box/cost failed');

  // Zero values (0% waste valid; 0 length/width rejected)
  const zeroWaste = calculateFlooring({ unit: 'feet', length: '20', width: '15', wastePercent: '0' });
  assert(!zeroWaste.errorMessage && zeroWaste.wasteArea === 0 && zeroWaste.recommendedMaterial === 300, '0% waste failed');
  assert(Boolean(calculateFlooring({ unit: 'feet', length: '0', width: '15', wastePercent: '10' }).errorMessage), 'Expected error for 0 length');

  // Boundary conditions (0..100% waste)
  const maxWaste = calculateFlooring({ unit: 'feet', length: '10', width: '10', wastePercent: '100' });
  assert(!maxWaste.errorMessage && maxWaste.recommendedMaterial === 200, '100% waste boundary failed');
  assert(Boolean(calculateFlooring({ unit: 'feet', length: '10', width: '10', wastePercent: '101' }).errorMessage), 'Expected error for >100% waste');
  assert(Boolean(calculateFlooring({ unit: 'feet', length: '10', width: '10', wastePercent: '-1' }).errorMessage), 'Expected error for negative waste');

  // Invalid inputs
  assert(Boolean(calculateFlooring({ unit: 'feet', length: '', width: '10', wastePercent: '10' }).errorMessage), 'Expected error for empty length');
  assert(Boolean(calculateFlooring({ unit: 'feet', length: '-10', width: '10', wastePercent: '10' }).errorMessage), 'Expected error for negative length');
  assert(Boolean(calculateFlooring({ unit: 'feet', length: 'abc', width: '10', wastePercent: '10' }).errorMessage), 'Expected error for NaN length');

  // Special cases: metric unit, float-safe exact box count (20x10 with 10% = 220 / 20 = 11), & optional boxSize/pricePerUnit
  const exactBoxes = calculateFlooring({ unit: 'feet', length: '20', width: '10', wastePercent: '10', boxSize: '20' });
  assert(!exactBoxes.errorMessage && exactBoxes.boxesNeeded === 11, `Expected exact 11 boxes without float overshoot, got ${exactBoxes.boxesNeeded}`);

  const metric = calculateFlooring({ unit: 'meters', length: '5', width: '4', wastePercent: '15' });
  assert(metric.areaUnit === 'm²' && metric.recommendedMaterial === 23 && metric.boxesNeeded === undefined && metric.totalEstimatedCost === undefined, 'Metric flooring failed');

  // Legitimate excess < 1e-9 above integer (1.0000000005 boxes) must round UP to 2, not down to 1
  const legitBoxExcess = calculateFlooring({ unit: 'feet', length: '100', width: '1', wastePercent: '0.00000005', boxSize: '100' });
  assert(legitBoxExcess.boxesNeeded === 2, `Expected 2 boxes for 1.0000000005 boxes needed, got ${legitBoxExcess.boxesNeeded}`);
});

// ==========================================
// 8. TILE CALCULATOR
// ==========================================
test('8. Tile Calculator (normal, zero, boundary, invalid, special cases)', () => {
  // Normal (exact 100 * 1.1 = 110 without IEEE-754 float overshoot to 111)
  const res = calculateTile({ unit: 'imperial', roomLength: '10', roomWidth: '10', tileLength: '12', tileWidth: '12', wastePercent: '10' });
  assert(!res.errorMessage && res.roomAreaSqFtOrM2 === 100 && res.baseTilesNeeded === 100 && res.recommendedTiles === 110, `Normal tile calc failed: expected 110, got ${res.recommendedTiles}`);

  const metricExact = calculateTile({ unit: 'metric', roomLength: '3', roomWidth: '3', tileLength: '30', tileWidth: '30', wastePercent: '10' });
  assert(!metricExact.errorMessage && metricExact.recommendedTiles === 110, `Metric 3x3 exact tile calc failed: expected 110, got ${metricExact.recommendedTiles}`);

  // Zero values (0% waste valid; 0 room/tile dimension rejected)
  const zeroWaste = calculateTile({ unit: 'imperial', roomLength: '10', roomWidth: '10', tileLength: '12', tileWidth: '12', wastePercent: '0' });
  assert(!zeroWaste.errorMessage && zeroWaste.recommendedTiles === 100, '0% waste failed');
  assert(Boolean(calculateTile({ unit: 'imperial', roomLength: '0', roomWidth: '10', tileLength: '12', tileWidth: '12', wastePercent: '10' }).errorMessage), 'Expected error for 0 room length');
  assert(Boolean(calculateTile({ unit: 'imperial', roomLength: '10', roomWidth: '10', tileLength: '0', tileWidth: '12', wastePercent: '10' }).errorMessage), 'Expected error for 0 tile length');

  // Boundary conditions (0..100% waste; exact 10x10 with 20% waste -> 120 without float overshoot)
  const twentyPct = calculateTile({ unit: 'imperial', roomLength: '10', roomWidth: '10', tileLength: '12', tileWidth: '12', wastePercent: '20' });
  assert(!twentyPct.errorMessage && twentyPct.recommendedTiles === 120, `Expected 120 tiles at 20% waste, got ${twentyPct.recommendedTiles}`);
  const maxWaste = calculateTile({ unit: 'imperial', roomLength: '10', roomWidth: '10', tileLength: '12', tileWidth: '12', wastePercent: '100' });
  assert(!maxWaste.errorMessage && maxWaste.recommendedTiles === 200, '100% waste boundary failed');
  assert(Boolean(calculateTile({ unit: 'imperial', roomLength: '10', roomWidth: '10', tileLength: '12', tileWidth: '12', wastePercent: '101' }).errorMessage), 'Expected error for >100% waste');

  // Invalid inputs
  assert(Boolean(calculateTile({ unit: 'imperial', roomLength: '', roomWidth: '10', tileLength: '12', tileWidth: '12', wastePercent: '10' }).errorMessage), 'Expected error for empty room length');
  assert(Boolean(calculateTile({ unit: 'imperial', roomLength: '10', roomWidth: '-5', tileLength: '12', tileWidth: '12', wastePercent: '10' }).errorMessage), 'Expected error for negative room width');
  assert(Boolean(calculateTile({ unit: 'imperial', roomLength: '10', roomWidth: '10', tileLength: 'abc', tileWidth: '12', wastePercent: '10' }).errorMessage), 'Expected error for NaN tile length');

  // Special case: metric (meters + cm) and ceiling rounding
  const metric = calculateTile({ unit: 'metric', roomLength: '4', roomWidth: '3', tileLength: '30', tileWidth: '30', wastePercent: '10' });
  // 12 m² / 0.09 m² = 133.333 -> base 134, with 10% = ceil(146.666) = 147
  assert(metric.baseTilesNeeded === 134 && metric.recommendedTiles === 147, `Expected 134/147 metric tiles, got ${metric.baseTilesNeeded}/${metric.recommendedTiles}`);

  // Large-scale IEEE-754 float safety (1e8 * 1.1 = 110000000.00000001 -> must stay exact 110000000)
  const largeTile = calculateTile({ unit: 'imperial', roomLength: '10000', roomWidth: '10000', tileLength: '12', tileWidth: '12', wastePercent: '10' });
  assert(largeTile.recommendedTiles === 110000000, `Expected exact 110000000 tiles at large scale, got ${largeTile.recommendedTiles}`);

  // Slightly below integer (0.999999 tiles) must round up to 1
  const belowOneTile = calculateTile({ unit: 'imperial', roomLength: '0.999999', roomWidth: '1', tileLength: '12', tileWidth: '12', wastePercent: '0' });
  assert(belowOneTile.recommendedTiles === 1, `Expected 1 tile for 0.999999, got ${belowOneTile.recommendedTiles}`);
});

// ==========================================
// 9. CONCRETE CALCULATOR
// ==========================================
test('9. Concrete Calculator (normal, zero, boundary, invalid, special cases)', () => {
  // Normal
  const res = calculateConcrete({ lengthFeet: '10', widthFeet: '10', depthInches: '4', wastePercent: '10' });
  assert(!res.errorMessage && res.bags80lb === 62 && res.totalWeightLbs80 === 4960, '80lb bag calc failed');
  assertNear(res.totalWeightTons80, 2.48, 0.01, '80lb tons');
  assert(res.bags60lb === 82 && res.totalWeightLbs60 === 4920, `Expected 82 60lb bags, got ${res.bags60lb}`);
  assert(res.bags50lb === 98 && res.totalWeightLbs50 === 4900, `Expected 98 50lb bags, got ${res.bags50lb}`);

  // Zero values (0% waste valid; 0 length/width/depth rejected)
  const zeroWaste = calculateConcrete({ lengthFeet: '10', widthFeet: '10', depthInches: '4', wastePercent: '0' });
  // 33.333 / 0.60 = 55.55 -> 56 bags
  assert(!zeroWaste.errorMessage && zeroWaste.bags80lb === 56, `Expected 56 bags at 0% waste, got ${zeroWaste.bags80lb}`);
  assert(Boolean(calculateConcrete({ lengthFeet: '0', widthFeet: '10', depthInches: '4', wastePercent: '10' }).errorMessage), 'Expected error for 0 length');
  assert(Boolean(calculateConcrete({ lengthFeet: '10', widthFeet: '10', depthInches: '0', wastePercent: '10' }).errorMessage), 'Expected error for 0 depth');

  // Boundary conditions (0..50% waste)
  const maxWaste = calculateConcrete({ lengthFeet: '9', widthFeet: '3', depthInches: '12', wastePercent: '50' });
  assert(!maxWaste.errorMessage && maxWaste.volumeCubicYards === 1 && maxWaste.recommendedCubicYards === 1.5, '50% waste boundary failed');
  assert(Boolean(calculateConcrete({ lengthFeet: '10', widthFeet: '10', depthInches: '4', wastePercent: '51' }).errorMessage), 'Expected error for >50% waste');
  assert(Boolean(calculateConcrete({ lengthFeet: '10', widthFeet: '10', depthInches: '4', wastePercent: '-1' }).errorMessage), 'Expected error for negative waste');

  // Invalid inputs
  assert(Boolean(calculateConcrete({ lengthFeet: '', widthFeet: '10', depthInches: '4' }).errorMessage), 'Expected error for empty length');
  assert(Boolean(calculateConcrete({ lengthFeet: '-10', widthFeet: '10', depthInches: '4' }).errorMessage), 'Expected error for negative length');
  assert(Boolean(calculateConcrete({ lengthFeet: 'abc', widthFeet: '10', depthInches: '4' }).errorMessage), 'Expected error for NaN length');

  // Special case: custom bag yields, mathematical weight consistency & float-safe exact multiple (9x10x4" + 10% = 33 cu ft / 0.60 = 55)
  const exactBags = calculateConcrete({ lengthFeet: '9', widthFeet: '10', depthInches: '4', wastePercent: '10' });
  assert(!exactBags.errorMessage && exactBags.bags80lb === 55, `Expected exact 55 80lb bags without float overshoot, got ${exactBags.bags80lb}`);

  const custom = calculateConcrete({ lengthFeet: '10', widthFeet: '10', depthInches: '4', wastePercent: '10', bagYield80lb: 0.55, bagYield60lb: 0.40, bagYield50lb: 0.35 });
  assert(custom.bags80lb === 67 && custom.totalWeightLbs80 === 67 * 80, 'Custom 80lb yield mismatch');
  assert(custom.bags60lb === 92 && custom.totalWeightLbs60 === 92 * 60, 'Custom 60lb yield mismatch');
  assert(custom.bags50lb === 105 && custom.totalWeightLbs50 === 105 * 50, 'Custom 50lb yield mismatch');
});

// ==========================================
// 10. MULCH CALCULATOR
// ==========================================
test('10. Mulch Calculator (normal, zero, boundary, invalid, special cases)', () => {
  // Normal
  const res = calculateMulch({ lengthFeet: '20', widthFeet: '5', depthInches: '3' });
  assert(!res.errorMessage && res.areaSqFt === 100 && res.cubicFeet === 25 && res.bags2CuFt === 13 && res.bags3CuFt === 9, 'Normal mulch calc failed');

  // Zero values (must reject 0 length, width, or depth)
  assert(Boolean(calculateMulch({ lengthFeet: '0', widthFeet: '5', depthInches: '3' }).errorMessage), 'Expected error for 0 length');
  assert(Boolean(calculateMulch({ lengthFeet: '20', widthFeet: '0', depthInches: '3' }).errorMessage), 'Expected error for 0 width');
  assert(Boolean(calculateMulch({ lengthFeet: '20', widthFeet: '5', depthInches: '0' }).errorMessage), 'Expected error for 0 depth');

  // Boundary conditions (exact 1 cubic yard = 27 cu ft -> 14x 2cuft, 9x 3cuft)
  const oneYard = calculateMulch({ lengthFeet: '9', widthFeet: '12', depthInches: '3' });
  assert(!oneYard.errorMessage && oneYard.cubicFeet === 27 && oneYard.cubicYards === 1 && oneYard.bags2CuFt === 14 && oneYard.bags3CuFt === 9, 'Exact 1 cu yd mulch boundary failed');

  // Invalid inputs
  assert(Boolean(calculateMulch({ lengthFeet: '', widthFeet: '5', depthInches: '3' }).errorMessage), 'Expected error for empty length');
  assert(Boolean(calculateMulch({ lengthFeet: '-5', widthFeet: '5', depthInches: '3' }).errorMessage), 'Expected error for negative length');
  assert(Boolean(calculateMulch({ lengthFeet: 'abc', widthFeet: '5', depthInches: '3' }).errorMessage), 'Expected error for NaN length');

  // Special case: small area ceiling behavior (1x1x1 -> 1 bag; tiny <1e-9 cu ft -> 1 bag; 1 + 5e-10 bags -> 2 bags)
  const small = calculateMulch({ lengthFeet: '1', widthFeet: '1', depthInches: '1' });
  assert(small.bags2CuFt === 1 && small.bags3CuFt === 1, 'Minimum 1 bag ceiling check failed');

  const tinyMulch = calculateMulch({ lengthFeet: '0.0001', widthFeet: '0.0001', depthInches: '0.001' });
  assert(tinyMulch.bags2CuFt === 1 && tinyMulch.bags3CuFt === 1, `Tiny non-zero mulch must need 1 bag, got ${tinyMulch.bags2CuFt}/${tinyMulch.bags3CuFt}`);

  const legitMulchExcess = calculateMulch({ lengthFeet: '2', widthFeet: '12', depthInches: '1.0000000005' });
  assert(legitMulchExcess.bags2CuFt === 2, `Expected 2 bags for 1.0000000005x2 cuft mulch, got ${legitMulchExcess.bags2CuFt}`);
});

// ==========================================
// 11. FUEL COST CALCULATOR
// ==========================================
test('11. Fuel Cost Calculator (normal, zero, boundary, invalid, special cases)', () => {
  // Normal
  const res = calculateFuel({ unitSystem: 'us', distance: '300', efficiency: '30', fuelPrice: '3.5', passengers: '1', isRoundTrip: false });
  assert(!res.errorMessage && res.estimatedFuelUsed === 10 && res.estimatedTripCost === 35 && res.costPerPerson === 35, 'Normal fuel calc failed');

  // Zero values (0 fuelPrice valid; 0 distance, 0 efficiency, 0 passengers rejected)
  const freeGas = calculateFuel({ unitSystem: 'us', distance: '100', efficiency: '25', fuelPrice: '0', passengers: '2', isRoundTrip: false });
  assert(!freeGas.errorMessage && freeGas.estimatedFuelUsed === 4 && freeGas.estimatedTripCost === 0 && freeGas.costPerPerson === 0, 'Zero fuel price failed');

  assert(Boolean(calculateFuel({ unitSystem: 'us', distance: '0', efficiency: '30', fuelPrice: '3.5', passengers: '1', isRoundTrip: false }).errorMessage), 'Expected error for 0 distance');
  assert(Boolean(calculateFuel({ unitSystem: 'us', distance: '300', efficiency: '0', fuelPrice: '3.5', passengers: '1', isRoundTrip: false }).errorMessage), 'Expected error for 0 MPG');
  assert(Boolean(calculateFuel({ unitSystem: 'us', distance: '300', efficiency: '30', fuelPrice: '3.5', passengers: '0', isRoundTrip: false }).errorMessage), 'Expected error for 0 passengers');

  // Boundary & Special cases: round-trip, passenger split, metric L/100km
  const roundTrip = calculateFuel({ unitSystem: 'us', distance: '150', efficiency: '30', fuelPrice: '4.00', passengers: '4', isRoundTrip: true });
  assert(roundTrip.effectiveDistance === 300 && roundTrip.estimatedFuelUsed === 10 && roundTrip.estimatedTripCost === 40 && roundTrip.costPerPerson === 10, 'Round-trip / passenger split failed');

  const metric = calculateFuel({ unitSystem: 'metric', distance: '200', efficiency: '7.5', fuelPrice: '2.00', passengers: '1', isRoundTrip: false });
  assert(metric.volumeUnit === 'Liters' && metric.estimatedFuelUsed === 15 && metric.estimatedTripCost === 30, 'Metric fuel calc failed');

  // Invalid inputs
  assert(Boolean(calculateFuel({ unitSystem: 'us', distance: '', efficiency: '30', fuelPrice: '3.5', passengers: '1', isRoundTrip: false }).errorMessage), 'Expected error for empty distance');
  assert(Boolean(calculateFuel({ unitSystem: 'us', distance: '-50', efficiency: '30', fuelPrice: '3.5', passengers: '1', isRoundTrip: false }).errorMessage), 'Expected error for negative distance');
  assert(Boolean(calculateFuel({ unitSystem: 'us', distance: '300', efficiency: '30', fuelPrice: '-1', passengers: '1', isRoundTrip: false }).errorMessage), 'Expected error for negative fuel price');
  assert(Boolean(calculateFuel({ unitSystem: 'us', distance: 'abc', efficiency: '30', fuelPrice: '3.5', passengers: '1', isRoundTrip: false }).errorMessage), 'Expected error for NaN distance');
});

// ==========================================
// 12. GAS MILEAGE CALCULATOR
// ==========================================
test('12. Gas Mileage Calculator (normal, zero, boundary, invalid, special cases)', () => {
  // Normal US
  const res = calculateMileage({ unit: 'us', distance: '350', fuelUsed: '10' });
  assert(!res.errorMessage && res.mpg === 35, `Expected 35 mpg, got ${res.mpg}`);
  assertNear(res.mpg * res.lPer100km, 235.214583, 0.001, 'MPG x L/100km conversion identity');

  // Zero values (must reject 0 distance or 0 fuel)
  assert(Boolean(calculateMileage({ unit: 'us', distance: '0', fuelUsed: '10' }).errorMessage), 'Expected error for 0 distance');
  assert(Boolean(calculateMileage({ unit: 'us', distance: '350', fuelUsed: '0' }).errorMessage), 'Expected error for 0 fuel');

  // Boundary & Special case: metric mode
  const metric = calculateMileage({ unit: 'metric', distance: '500', fuelUsed: '35' });
  assert(!metric.errorMessage, 'Expected no error for metric mileage');
  assertNear(metric.lPer100km, 7, 1e-9, 'Metric L/100km');
  assertNear(metric.mpg, 235.214583 / 7, 0.001, 'Metric to MPG conversion');

  // Invalid inputs
  assert(Boolean(calculateMileage({ unit: 'us', distance: '', fuelUsed: '10' }).errorMessage), 'Expected error for empty distance');
  assert(Boolean(calculateMileage({ unit: 'us', distance: '350', fuelUsed: '' }).errorMessage), 'Expected error for empty fuel');
  assert(Boolean(calculateMileage({ unit: 'us', distance: '-100', fuelUsed: '10' }).errorMessage), 'Expected error for negative distance');
  assert(Boolean(calculateMileage({ unit: 'us', distance: '350', fuelUsed: 'abc' }).errorMessage), 'Expected error for NaN fuel');
});

// ==========================================
// 13. COMMUTE COST CALCULATOR
// ==========================================
test('13. Commute Cost Calculator (normal, zero, boundary, invalid, special cases)', () => {
  // Normal
  const res = calculateCommute({ oneWayDistance: '20', daysPerWeek: '5', efficiencyMpg: '25', fuelPrice: '3.5' });
  // Round-trip 40 mi, 1.6 gal/day, $5.60/day, $28/wk, $1456/yr, $121.333/mo
  assert(!res.errorMessage && res.roundTripDistance === 40, 'Normal commute round-trip failed');
  assertNear(res.dailyCost, 5.6, 1e-9, 'Daily commute cost');
  assertNear(res.weeklyCost, 28, 1e-9, 'Weekly commute cost');
  assertNear(res.annualCost, 1456, 1e-9, 'Annual commute cost');
  assertNear(res.monthlyCost, 1456 / 12, 0.001, 'Monthly commute cost');

  // Zero values (0 fuelPrice valid; 0 distance/days/MPG rejected)
  const zeroGas = calculateCommute({ oneWayDistance: '20', daysPerWeek: '5', efficiencyMpg: '25', fuelPrice: '0' });
  assert(!zeroGas.errorMessage && zeroGas.annualCost === 0 && zeroGas.annualDistance === 10400, 'Zero fuel price commute failed');

  assert(Boolean(calculateCommute({ oneWayDistance: '0', daysPerWeek: '5', efficiencyMpg: '25', fuelPrice: '3.5' }).errorMessage), 'Expected error for 0 distance');
  assert(Boolean(calculateCommute({ oneWayDistance: '20', daysPerWeek: '0', efficiencyMpg: '25', fuelPrice: '3.5' }).errorMessage), 'Expected error for 0 days');
  assert(Boolean(calculateCommute({ oneWayDistance: '20', daysPerWeek: '5', efficiencyMpg: '0', fuelPrice: '3.5' }).errorMessage), 'Expected error for 0 MPG');

  // Boundary conditions (1..7 days per week)
  const sevenDays = calculateCommute({ oneWayDistance: '10', daysPerWeek: '7', efficiencyMpg: '20', fuelPrice: '4.00' });
  assert(!sevenDays.errorMessage && sevenDays.weeklyCost === 28, '7-day commute boundary failed');
  assert(Boolean(calculateCommute({ oneWayDistance: '10', daysPerWeek: '8', efficiencyMpg: '20', fuelPrice: '4.00' }).errorMessage), 'Expected error for >7 days/week');

  // Invalid inputs
  assert(Boolean(calculateCommute({ oneWayDistance: '', daysPerWeek: '5', efficiencyMpg: '25', fuelPrice: '3.5' }).errorMessage), 'Expected error for empty distance');
  assert(Boolean(calculateCommute({ oneWayDistance: '-5', daysPerWeek: '5', efficiencyMpg: '25', fuelPrice: '3.5' }).errorMessage), 'Expected error for negative distance');
  assert(Boolean(calculateCommute({ oneWayDistance: '20', daysPerWeek: '5', efficiencyMpg: '25', fuelPrice: '-2' }).errorMessage), 'Expected error for negative fuel price');
  assert(Boolean(calculateCommute({ oneWayDistance: '20', daysPerWeek: 'abc', efficiencyMpg: '25', fuelPrice: '3.5' }).errorMessage), 'Expected error for NaN days');
});

// ==========================================
// 14. ELECTRICITY COST CALCULATOR & EIA 2024 PRESETS
// ==========================================
test('14. Electricity Cost Calculator (normal, zero, boundary, invalid, EIA 2024 presets)', () => {
  // Verify EIA 2024 presets exact values
  assert(EIA_2024_RESIDENTIAL_BENCHMARKS.length === 5, `Expected 5 EIA presets, got ${EIA_2024_RESIDENTIAL_BENCHMARKS.length}`);
  const us = EIA_2024_RESIDENTIAL_BENCHMARKS.find((p) => p.id === 'us-total');
  const wa = EIA_2024_RESIDENTIAL_BENCHMARKS.find((p) => p.id === 'wa');
  const tx = EIA_2024_RESIDENTIAL_BENCHMARKS.find((p) => p.id === 'tx');
  const ca = EIA_2024_RESIDENTIAL_BENCHMARKS.find((p) => p.id === 'ca');
  const hi = EIA_2024_RESIDENTIAL_BENCHMARKS.find((p) => p.id === 'hi');

  assert(us?.centsPerKwh === 16.48 && us?.rateString === '0.165', 'US benchmark mismatch');
  assert(wa?.centsPerKwh === 11.90 && wa?.rateString === '0.119', 'WA benchmark mismatch');
  assert(tx?.centsPerKwh === 14.94 && tx?.rateString === '0.149', 'TX benchmark mismatch');
  assert(ca?.centsPerKwh === 31.97 && ca?.rateString === '0.320', 'CA benchmark mismatch');
  assert(hi?.centsPerKwh === 42.86 && hi?.rateString === '0.429', 'HI benchmark mismatch');

  // Normal
  const resRounded = calculateElectricity({ wattage: '1500', hoursPerDay: '8', pricePerKwh: '0.165', daysUsed: '30' });
  assertNear(resRounded.hourlyCost, 0.2475, 0.0001, 'Hourly cost');
  assertNear(resRounded.dailyCost, 1.98, 0.001, 'Daily cost');
  assertNear(resRounded.totalCost, 59.40, 0.01, '30-day total cost');

  // Zero values (0 rate valid; 0 wattage/hours/days rejected)
  const zeroRate = calculateElectricity({ wattage: '1000', hoursPerDay: '5', pricePerKwh: '0', daysUsed: '10' });
  assert(!zeroRate.errorMessage && zeroRate.totalKwh === 50 && zeroRate.totalCost === 0, 'Zero kWh rate failed');
  assert(Boolean(calculateElectricity({ wattage: '0', hoursPerDay: '8', pricePerKwh: '0.165', daysUsed: '30' }).errorMessage), 'Expected error for 0 wattage');
  assert(Boolean(calculateElectricity({ wattage: '1000', hoursPerDay: '0', pricePerKwh: '0.165', daysUsed: '30' }).errorMessage), 'Expected error for 0 hours');
  assert(Boolean(calculateElectricity({ wattage: '1000', hoursPerDay: '8', pricePerKwh: '0.165', daysUsed: '0' }).errorMessage), 'Expected error for 0 days');

  // Boundary conditions (hours 0<h<=24, days 0<d<=365)
  const maxBounds = calculateElectricity({ wattage: '1000', hoursPerDay: '24', pricePerKwh: '0.10', daysUsed: '365' });
  assert(!maxBounds.errorMessage && maxBounds.totalKwh === 8760 && maxBounds.totalCost === 876, '24h/365d upper boundary failed');
  assert(Boolean(calculateElectricity({ wattage: '1000', hoursPerDay: '24.1', pricePerKwh: '0.10', daysUsed: '30' }).errorMessage), 'Expected error for >24 hours/day');
  assert(Boolean(calculateElectricity({ wattage: '1000', hoursPerDay: '8', pricePerKwh: '0.10', daysUsed: '366' }).errorMessage), 'Expected error for >365 days');

  // Invalid inputs
  assert(Boolean(calculateElectricity({ wattage: '', hoursPerDay: '8', pricePerKwh: '0.165', daysUsed: '30' }).errorMessage), 'Expected error for empty wattage');
  assert(Boolean(calculateElectricity({ wattage: '1000', hoursPerDay: '8', pricePerKwh: '-0.05', daysUsed: '30' }).errorMessage), 'Expected error for negative price');
  assert(Boolean(calculateElectricity({ wattage: 'abc', hoursPerDay: '8', pricePerKwh: '0.165', daysUsed: '30' }).errorMessage), 'Expected error for NaN wattage');

  // Special case: 30-day and 365-day projections independent of custom daysUsed
  const sevenDays = calculateElectricity({ wattage: '1000', hoursPerDay: '2', pricePerKwh: '0.20', daysUsed: '7' });
  assertNear(sevenDays.totalCost, 2.80, 0.001, '7-day cost');
  assertNear(sevenDays.monthlyCost30Days, 12.00, 0.001, '30-day projection');
  assertNear(sevenDays.annualCost365Days, 146.00, 0.001, '365-day projection');
});

// ==========================================
// 15. DATE DIFFERENCE CALCULATOR
// ==========================================
test('15. Date Difference Calculator (normal, zero, boundary, invalid, special cases)', () => {
  // Normal (2026-01-01 Thu to 2026-01-10 Sat exclusive = 9 days: 7 weekdays? Jan 1,2,5,6,7,8,9 = 7 weekdays, Jan 3,4 = 2 weekend days)
  const normal = calculateDateDifference({ startDate: '2026-01-01', endDate: '2026-01-10', includeEndDate: false });
  assert(!normal.errorMessage && normal.totalDays === 9 && normal.weeks === 1 && normal.remainingDays === 2, 'Normal date diff failed');
  assert(normal.businessDays === 7 && normal.weekendDays === 2, `Expected 7 business / 2 weekend days, got ${normal.businessDays}/${normal.weekendDays}`);

  // Zero-day span (same date exclusive = 0; inclusive = 1)
  const sameDayExcl = calculateDateDifference({ startDate: '2026-03-15', endDate: '2026-03-15', includeEndDate: false });
  assert(!sameDayExcl.errorMessage && sameDayExcl.totalDays === 0 && sameDayExcl.businessDays === 0 && sameDayExcl.weekendDays === 0, 'Same-day exclusive failed');

  const sameDayIncl = calculateDateDifference({ startDate: '2026-03-15', endDate: '2026-03-15', includeEndDate: true }); // Sunday
  assert(!sameDayIncl.errorMessage && sameDayIncl.totalDays === 1 && sameDayIncl.weekendDays === 1, 'Same-day inclusive failed');

  // Boundary: Leap year Feb 2024 vs non-leap year Feb 2025
  const leap = calculateDateDifference({ startDate: '2024-02-28', endDate: '2024-03-01', includeEndDate: false });
  assert(leap.totalDays === 2, `Expected 2 days across Feb 29, 2024, got ${leap.totalDays}`);
  const nonLeap = calculateDateDifference({ startDate: '2025-02-28', endDate: '2025-03-01', includeEndDate: false });
  assert(nonLeap.totalDays === 1, `Expected 1 day across Feb 2025, got ${nonLeap.totalDays}`);

  // Invalid inputs (including rolled nonexistent calendar dates and trailing characters)
  assert(Boolean(calculateDateDifference({ startDate: '', endDate: '2026-01-10' }).errorMessage), 'Expected error for empty startDate');
  assert(Boolean(calculateDateDifference({ startDate: '2026-01-01', endDate: '' }).errorMessage), 'Expected error for empty endDate');
  assert(Boolean(calculateDateDifference({ startDate: 'invalid', endDate: '2026-01-10' }).errorMessage), 'Expected error for malformed startDate');
  assert(Boolean(calculateDateDifference({ startDate: '2026-01', endDate: '2026-01-10' }).errorMessage), 'Expected error for incomplete date');
  assert(Boolean(calculateDateDifference({ startDate: '2026-02-30', endDate: '2026-03-05' }).errorMessage), 'Expected error for nonexistent Feb 30');
  assert(Boolean(calculateDateDifference({ startDate: '2025-02-29', endDate: '2025-03-05' }).errorMessage), 'Expected error for non-leap Feb 29 2025');
  assert(Boolean(calculateDateDifference({ startDate: '2026-04-31', endDate: '2026-05-05' }).errorMessage), 'Expected error for nonexistent Apr 31');
  assert(Boolean(calculateDateDifference({ startDate: '2026-13-01', endDate: '2026-12-31' }).errorMessage), 'Expected error for invalid month 13');
  assert(Boolean(calculateDateDifference({ startDate: '2026-01-10abc', endDate: '2026-01-20' }).errorMessage), 'Expected error for trailing characters');

  // Special cases: reversed dates & inclusive toggle
  const reversed = calculateDateDifference({ startDate: '2026-01-10', endDate: '2026-01-01', includeEndDate: true });
  assert(reversed.isReversed === true && reversed.totalDays === 10, `Expected isReversed=true and 10 inclusive days, got ${reversed.totalDays}`);
});

// ==========================================
// 16. RECIPE SCALE CALCULATOR
// ==========================================
test('16. Recipe Scale Calculator (normal, zero, boundary, invalid, special cases)', () => {
  // Normal
  const res = calculateRecipeScale({ originalServings: '4', desiredServings: '8', ingredientQuantity: '2', unitLabel: 'cups' });
  assert(!res.errorMessage && res.scaleFactor === 2 && res.adjustedQuantity === 4 && res.formattedAdjusted === '4', 'Normal recipe scale failed');

  // Zero values (0 ingredient quantity valid; 0 original/desired servings rejected)
  const zeroQty = calculateRecipeScale({ originalServings: '4', desiredServings: '8', ingredientQuantity: '0' });
  assert(!zeroQty.errorMessage && zeroQty.adjustedQuantity === 0 && zeroQty.formattedAdjusted === '0', 'Zero quantity failed');
  assert(Boolean(calculateRecipeScale({ originalServings: '0', desiredServings: '8', ingredientQuantity: '2' }).errorMessage), 'Expected error for 0 original servings');
  assert(Boolean(calculateRecipeScale({ originalServings: '4', desiredServings: '0', ingredientQuantity: '2' }).errorMessage), 'Expected error for 0 desired servings');

  // Boundary & Special cases: scaling down & kitchen fractions ('1/2', '1 1/2', '1-1/2')
  const half = calculateRecipeScale({ originalServings: '4', desiredServings: '3', ingredientQuantity: '1', unitLabel: 'cup' });
  assert(half.scaleFactor === 0.75 && half.fractionApprox === '3/4', `Expected 0.75 / 3/4, got ${half.scaleFactor} / ${half.fractionApprox}`);

  const frac = calculateRecipeScale({ originalServings: '2', desiredServings: '4', ingredientQuantity: '1/2' });
  assert(frac.originalQuantity === 0.5 && frac.adjustedQuantity === 1, 'Simple fraction 1/2 scaling failed');

  const mixed = calculateRecipeScale({ originalServings: '2', desiredServings: '4', ingredientQuantity: '1 1/2' });
  assert(mixed.originalQuantity === 1.5 && mixed.adjustedQuantity === 3, 'Mixed fraction 1 1/2 scaling failed');

  const hyphenMixed = calculateRecipeScale({ originalServings: '2', desiredServings: '4', ingredientQuantity: '1-1/2' });
  assert(hyphenMixed.originalQuantity === 1.5 && hyphenMixed.adjustedQuantity === 3, 'Hyphen mixed fraction 1-1/2 scaling failed');

  // Invalid inputs
  assert(Boolean(calculateRecipeScale({ originalServings: '', desiredServings: '8', ingredientQuantity: '2' }).errorMessage), 'Expected error for empty servings');
  assert(Boolean(calculateRecipeScale({ originalServings: '4', desiredServings: '8', ingredientQuantity: '-1' }).errorMessage), 'Expected error for negative quantity');
  assert(Boolean(calculateRecipeScale({ originalServings: '4', desiredServings: '8', ingredientQuantity: '1/0' }).errorMessage), 'Expected error for division by zero fraction 1/0');
  assert(Boolean(calculateRecipeScale({ originalServings: '4', desiredServings: '8', ingredientQuantity: 'abc' }).errorMessage), 'Expected error for NaN quantity');
  assert(Boolean(calculateRecipeScale({ originalServings: '4', desiredServings: '8', ingredientQuantity: '2abc' }).errorMessage), 'Expected error for trailing garbage 2abc');
});

// ==========================================
// 17. COOKING UNIT CONVERTER
// ==========================================
test('17. Cooking Unit Converter (normal, zero, boundary, invalid, special cases)', () => {
  // Normal
  const res = calculateCookingConverter({ amount: '1', fromUnit: 'cup', toUnit: 'tablespoon' });
  assert(!res.errorMessage && Math.round(res.convertedAmount) === 16, `Expected ~16 tbsp, got ${res.convertedAmount}`);

  // Zero value (valid)
  const zero = calculateCookingConverter({ amount: '0', fromUnit: 'cup', toUnit: 'tablespoon' });
  assert(!zero.errorMessage && zero.convertedAmount === 0 && zero.formattedResult === '0 tbsp', `Zero amount failed: ${zero.formattedResult}`);

  // Boundary & Special cases (identity, tiny <0.01 formatting, metric L <-> mL, all 9 conversions populated)
  const metric = calculateCookingConverter({ amount: '1', fromUnit: 'liter', toUnit: 'milliliter' });
  assert(metric.convertedAmount === 1000 && metric.allConversions.length === 9, 'Liter to mL or allConversions count failed');

  const tiny = calculateCookingConverter({ amount: '1', fromUnit: 'teaspoon', toUnit: 'gallon' });
  assert(tiny.convertedAmount > 0 && tiny.convertedAmount < 0.01 && tiny.formattedResult.includes('gal'), 'Small fraction formatting failed');

  const galQt = calculateCookingConverter({ amount: '1', fromUnit: 'gallon', toUnit: 'quart' });
  assertNear(galQt.convertedAmount, 4, 0.001, '1 gallon to quarts');

  // Invalid inputs
  assert(Boolean(calculateCookingConverter({ amount: '', fromUnit: 'cup', toUnit: 'tablespoon' }).errorMessage), 'Expected error for empty amount');
  assert(Boolean(calculateCookingConverter({ amount: '-2', fromUnit: 'cup', toUnit: 'tablespoon' }).errorMessage), 'Expected error for negative amount');
  assert(Boolean(calculateCookingConverter({ amount: 'abc', fromUnit: 'cup', toUnit: 'tablespoon' }).errorMessage), 'Expected error for NaN amount');
});

// ==========================================
// 18. CUPS TO GRAMS CONVERTER
// ==========================================
test('18. Cups to Grams Converter (normal, zero, boundary, invalid, special cases)', () => {
  // Normal
  const sugar = calculateCupsToGrams({ cups: '1', ingredientId: 'granulated_sugar' });
  assert(!sugar.errorMessage && sugar.grams === 200, `Expected 200g, got ${sugar.grams}`);

  const flour = calculateCupsToGrams({ cups: '2.5', ingredientId: 'all_purpose_flour' });
  assert(!flour.errorMessage && flour.grams === 300, `Expected 300g, got ${flour.grams}`);

  // Zero values (valid in both directions)
  const zeroCups = calculateCupsToGrams({ mode: 'cups_to_grams', cups: '0', ingredientId: 'all_purpose_flour' });
  assert(!zeroCups.errorMessage && zeroCups.grams === 0 && zeroCups.ounces === 0, '0 cups failed');

  const zeroGrams = calculateCupsToGrams({ mode: 'grams_to_cups', gramsInput: '0', ingredientId: 'all_purpose_flour' });
  assert(!zeroGrams.errorMessage && zeroGrams.cups === 0, '0 grams failed');

  // Boundary & Special cases: fractions ('1/2', '1 1/2', '1-1/2') & reverse conversion & ounces
  const halfCup = calculateCupsToGrams({ cups: '1/2', ingredientId: 'all_purpose_flour' });
  assert(halfCup.grams === 60, `Expected 60g for 1/2 cup flour, got ${halfCup.grams}`);

  const mixedCup = calculateCupsToGrams({ cups: '1 1/2', ingredientId: 'all_purpose_flour' });
  assert(mixedCup.grams === 180, `Expected 180g for 1 1/2 cups flour, got ${mixedCup.grams}`);

  const reverse = calculateCupsToGrams({ mode: 'grams_to_cups', gramsInput: '240', ingredientId: 'all_purpose_flour' });
  assert(reverse.cups === 2, `Expected 2 cups for 240g flour, got ${reverse.cups}`);
  assertNear(reverse.ounces, 240 / 28.3495, 0.01, 'Grams to ounces');

  // Invalid inputs
  assert(Boolean(calculateCupsToGrams({ cups: '', ingredientId: 'all_purpose_flour' }).errorMessage), 'Expected error for empty cups');
  assert(Boolean(calculateCupsToGrams({ cups: '-1', ingredientId: 'all_purpose_flour' }).errorMessage), 'Expected error for negative cups');
  assert(Boolean(calculateCupsToGrams({ cups: '1/0', ingredientId: 'all_purpose_flour' }).errorMessage), 'Expected error for 1/0 fraction');
  assert(Boolean(calculateCupsToGrams({ cups: '2abc', ingredientId: 'all_purpose_flour' }).errorMessage), 'Expected error for trailing garbage 2abc');
  assert(Boolean(calculateCupsToGrams({ mode: 'grams_to_cups', gramsInput: '', ingredientId: 'all_purpose_flour' }).errorMessage), 'Expected error for empty grams');
  assert(Boolean(calculateCupsToGrams({ mode: 'grams_to_cups', gramsInput: '-50', ingredientId: 'all_purpose_flour' }).errorMessage), 'Expected error for negative grams');
  assert(Boolean(calculateCupsToGrams({ mode: 'grams_to_cups', gramsInput: '240abc', ingredientId: 'all_purpose_flour' }).errorMessage), 'Expected error for malformed grams 240abc');
});

// ==========================================
// 19. WORK HOURS CALCULATOR
// ==========================================
test('19. Work Hours Calculator (normal, zero, boundary, invalid, special cases)', () => {
  // Normal
  const res = calculateWorkHours({ startTime: '09:00', endTime: '17:00', breakMinutes: '30' });
  assert(!res.errorMessage && res.decimalHours === 7.5 && res.formattedDuration === '7h 30m' && !res.isOvernight, 'Normal work hours failed');

  // Zero values (0 break valid; identical start/end with 0 break yields 0h 0m)
  const noBreak = calculateWorkHours({ startTime: '09:00', endTime: '17:00', breakMinutes: '0' });
  assert(!noBreak.errorMessage && noBreak.decimalHours === 8, 'Zero break failed');

  const zeroSpan = calculateWorkHours({ startTime: '09:00', endTime: '09:00', breakMinutes: '0' });
  assert(!zeroSpan.errorMessage && zeroSpan.decimalHours === 0 && zeroSpan.formattedDuration === '0h 0m', 'Zero-span shift with 0 break failed');

  // Boundary conditions (break == span valid 0h; break > span error; identical start/end with break > 0 error; 23:59 -> 00:01)
  const exactBreak = calculateWorkHours({ startTime: '09:00', endTime: '10:00', breakMinutes: '60' });
  assert(!exactBreak.errorMessage && exactBreak.decimalHours === 0, 'Break equal to shift span failed');

  assert(Boolean(calculateWorkHours({ startTime: '09:00', endTime: '10:00', breakMinutes: '61' }).errorMessage), 'Expected error when break exceeds shift');
  assert(Boolean(calculateWorkHours({ startTime: '09:00', endTime: '09:00', breakMinutes: '30' }).errorMessage), 'Expected error for identical times with >0 break');

  const midnightEdge = calculateWorkHours({ startTime: '23:59', endTime: '00:01', breakMinutes: '0' });
  assert(midnightEdge.isOvernight && midnightEdge.netWorkMinutes === 2, '23:59->00:01 rollover failed');

  // Invalid inputs
  assert(Boolean(calculateWorkHours({ startTime: '', endTime: '17:00', breakMinutes: '0' }).errorMessage), 'Expected error for empty startTime');
  assert(Boolean(calculateWorkHours({ startTime: '25:00', endTime: '17:00', breakMinutes: '0' }).errorMessage), 'Expected error for 25:00');
  assert(Boolean(calculateWorkHours({ startTime: '09:60', endTime: '17:00', breakMinutes: '0' }).errorMessage), 'Expected error for 09:60');
  assert(Boolean(calculateWorkHours({ startTime: '09abc:00', endTime: '17:00', breakMinutes: '0' }).errorMessage), 'Expected error for 09abc:00');
  assert(Boolean(calculateWorkHours({ startTime: '09:00', endTime: '17:30xyz', breakMinutes: '0' }).errorMessage), 'Expected error for 17:30xyz');
  assert(Boolean(calculateWorkHours({ startTime: 'invalid', endTime: '17:00', breakMinutes: '0' }).errorMessage), 'Expected error for invalid format');
  assert(Boolean(calculateWorkHours({ startTime: '09:00', endTime: '17:00', breakMinutes: '-15' }).errorMessage), 'Expected error for negative break');
  assert(Boolean(calculateWorkHours({ startTime: '09:00', endTime: '17:00', breakMinutes: '30abc' }).errorMessage), 'Expected error for malformed break 30abc');
  assert(Boolean(calculateWorkHours({ startTime: '09:00', endTime: '17:00', breakMinutes: '30', hourlyRate: '-10' }).errorMessage), 'Expected error for negative hourly rate');
  assert(Boolean(calculateWorkHours({ startTime: '09:00', endTime: '17:00', breakMinutes: '30', hourlyRate: '25abc' }).errorMessage), 'Expected error for malformed hourly rate');

  // Special cases: overnight shift + hourly gross pay
  const overnight = calculateWorkHours({ startTime: '22:00', endTime: '06:00', breakMinutes: '30', hourlyRate: '20' });
  assert(overnight.isOvernight === true && overnight.decimalHours === 7.5 && overnight.estimatedGrossPay === 150, 'Overnight shift with hourly rate failed');
});

// ==========================================
// 20. GPA CALCULATOR
// ==========================================
test('20. GPA Calculator (normal, zero, boundary, invalid, special cases)', () => {
  // Normal unweighted
  const res = calculateGpa({
    courses: [
      { id: '1', name: 'Course 1', grade: 'A', credits: '3', courseType: 'regular' },
      { id: '2', name: 'Course 2', grade: 'B', credits: '3', courseType: 'regular' },
    ],
  });
  assert(!res.errorMessage && res.gpa === 3.5 && res.weightedGpa === 3.5 && res.totalCredits === 6, 'Normal GPA calc failed');

  // Zero values (F = 0.0, 0-credit audit skipped alongside credited course, all 0-credit courses rejected)
  const failCourse = calculateGpa({
    courses: [{ id: '1', name: 'Course 1', grade: 'F', credits: '3', courseType: 'ap_ib' }],
  });
  assert(!failCourse.errorMessage && failCourse.gpa === 0 && failCourse.weightedGpa === 0, 'F grade should stay 0.0 even for AP/IB');

  const auditPlusCredit = calculateGpa({
    courses: [
      { id: '1', name: 'Audit Lab', grade: 'F', credits: '0', courseType: 'regular' },
      { id: '2', name: 'Math', grade: 'A', credits: '4', courseType: 'regular' },
    ],
  });
  assert(!auditPlusCredit.errorMessage && auditPlusCredit.gpa === 4.0 && auditPlusCredit.totalCredits === 4, '0-credit audit course should be ignored');

  const allZeroCredits = calculateGpa({
    courses: [{ id: '1', name: 'Audit', grade: 'A', credits: '0', courseType: 'regular' }],
  });
  assert(Boolean(allZeroCredits.errorMessage), 'Expected error when total credits equal zero');

  // Boundary conditions (A+ = 4.0 unweighted, 5.0 weighted AP; D- = 0.7)
  const scaleBounds = calculateGpa({
    courses: [
      { id: '1', name: 'AP Chem', grade: 'A+', credits: '4', courseType: 'ap_ib' },
      { id: '2', name: 'Elective', grade: 'D-', credits: '4', courseType: 'regular' },
    ],
  });
  assertNear(scaleBounds.gpa, 2.35, 0.001, 'A+/D- unweighted midpoint');
  assertNear(scaleBounds.weightedGpa, 2.85, 0.001, 'AP A+/D- weighted midpoint');

  // Invalid inputs
  assert(Boolean(calculateGpa({ courses: [] }).errorMessage), 'Expected error for empty courses array');
  assert(Boolean(calculateGpa({ courses: [{ id: '1', name: 'Bad', grade: 'A', credits: '-3' }] }).errorMessage), 'Expected error for negative credits');
  assert(Boolean(calculateGpa({ courses: [{ id: '1', name: 'Bad', grade: 'A', credits: 'abc' }] }).errorMessage), 'Expected error for NaN credits');

  // Special case: Honors (+0.5) & AP/IB (+1.0) weighted GPA mix
  const weightedMix = calculateGpa({
    courses: [
      { id: '1', name: 'Honors Bio', grade: 'B', credits: '3', courseType: 'honors' }, // 3.0 / 3.5
      { id: '2', name: 'AP Calc', grade: 'A', credits: '3', courseType: 'ap_ib' },     // 4.0 / 5.0
    ],
  });
  assertNear(weightedMix.gpa, 3.5, 0.001, 'Mixed unweighted GPA');
  assertNear(weightedMix.weightedGpa, 4.25, 0.001, 'Mixed weighted GPA');
});

// ==========================================
// 21. SOURCE & DEFAULT INVENTORY COMPLETENESS
// ==========================================
test('21. Source & Default Inventory integrity', () => {
  assert(SOURCE_INVENTORY.length >= 15, `Expected at least 15 inventory entries, got ${SOURCE_INVENTORY.length}`);
  for (const entry of SOURCE_INVENTORY) {
    assert(Boolean(entry.id && entry.calculator && entry.parameterName && entry.sourceTitle), `Incomplete source entry: ${entry.id}`);
    assert(entry.verificationStatus === 'verified' || entry.verificationStatus === 'illustrative', `Invalid status on ${entry.id}`);
    assert(/^\d{4}-\d{2}-\d{2}$/.test(entry.dateChecked), `Invalid dateChecked on ${entry.id}`);
  }
});

console.log(`\nResults: ${passed}/${total} test suites passed (${total} checks verified).\n`);
if (passed !== total) {
  process.exit(1);
}
