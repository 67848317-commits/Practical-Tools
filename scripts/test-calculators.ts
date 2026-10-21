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

console.log('🧪 Starting Functional Regression Test for all 20 Calculators (including Phase 3B enhancements)...\n');

let passed = 0;
let total = 0;

function test(name: string, fn: () => void) {
  total++;
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (err: any) {
    console.error(`  ✗ ${name} failed:`, err.message);
  }
}

// 1. Percentage
test('1. Percentage Calculator', () => {
  const res = calculatePercentage({ mode: 'percent_of', m1Percent: '20', m1Value: '150' });
  if (res.resultText !== '30') throw new Error(`Expected 30, got ${res.resultText}`);
});

// 2. Discount
test('2. Discount Calculator', () => {
  const res = calculateDiscount({ originalPrice: '100', discountPercent: '20' });
  if (res.finalPrice !== 80 || res.discountAmount !== 20) throw new Error(`Expected 80/20, got ${res.finalPrice}/${res.discountAmount}`);
});

// 3. Tip
test('3. Tip Calculator', () => {
  const res = calculateTip({ billAmount: '100', tipPercent: 18, peopleCount: '2' });
  if (res.tipAmount !== 18 || res.totalBill !== 118 || res.amountPerPerson !== 59) throw new Error(`Tip calc mismatch: totalBill ${res.totalBill}, perPerson ${res.amountPerPerson}`);
});

// 4. Salary to Hourly
test('4. Salary Calculator', () => {
  const res = calculateSalary({ annualSalary: '52000', hoursPerWeek: '40', weeksPerYear: '52' });
  if (res.hourlyRate !== 25) throw new Error(`Expected hourly 25, got ${res.hourlyRate}`);
});

// 5. Markup
test('5. Markup Calculator', () => {
  const res = calculateMarkup({ cost: '50', markupPercent: '100' });
  if (res.sellingPrice !== 100 || res.grossMarginPercent !== 50) throw new Error(`Expected revenue 100, margin 50, got ${res.sellingPrice}/${res.grossMarginPercent}`);
});

// 6. Paint + Can Optimizer & Opening Deduction Clamping
test('6. Paint Calculator & Can Optimizer', () => {
  const res = calculatePaint({ unit: 'imperial', length: '14', width: '12', height: '8', doors: '1', windows: '2', coats: 2, coveragePerGallon: '350' });
  if (res.recommendedCans <= 0 || res.estimatedWallArea <= 0) throw new Error(`Paint calculation error`);
  if (res.grossWallArea !== 416) throw new Error(`Expected gross wall area 416, got ${res.grossWallArea}`);
  if (res.openingsDeduction !== 50) throw new Error(`Expected openings 50 (20 + 30), got ${res.openingsDeduction}`);
  if (res.estimatedWallArea !== 366) throw new Error(`Expected net wall area 366, got ${res.estimatedWallArea}`);
  // 366 * 2 = 732 sq ft; 732 / 350 = 2.091 gal
  if (res.recommendedGallons !== 2 || res.recommendedQuarts !== 1) {
    throw new Error(`Expected 2 gal + 1 qt, got ${res.recommendedGallons} gal + ${res.recommendedQuarts} qt`);
  }
  if (!res.canOptimizerSummary.includes('2 Gallons + 1 Quart')) {
    throw new Error(`Unexpected can optimizer summary: ${res.canOptimizerSummary}`);
  }

  // 6b. Test custom opening dimensions
  const resCustom = calculatePaint({
    unit: 'imperial',
    length: '10',
    width: '10',
    height: '10',
    doors: '2',
    windows: '1',
    coats: 1,
    coveragePerGallon: '350',
    doorArea: '25', // custom 25 sq ft doors
    windowArea: '20', // custom 20 sq ft window
  });
  // gross: 2 * (10+10) * 10 = 400 sq ft. Openings: 2*25 + 1*20 = 70. Net: 330.
  if (resCustom.openingsDeduction !== 70) throw new Error(`Expected custom openings deduction 70, got ${resCustom.openingsDeduction}`);
  if (resCustom.estimatedWallArea !== 330) throw new Error(`Expected net wall area 330, got ${resCustom.estimatedWallArea}`);

  // 6c. Test deduction clamping: ensure deductions cannot produce negative net paintable area
  const resClamped = calculatePaint({
    unit: 'imperial',
    length: '10',
    width: '10',
    height: '10',
    doors: '50', // 50 doors = 1000 sq ft deduction on 400 sq ft room
    windows: '0',
    coats: 2,
    coveragePerGallon: '350',
  });
  if (resClamped.estimatedWallArea < 0) throw new Error(`Net wall area cannot be negative, got ${resClamped.estimatedWallArea}`);
  if (resClamped.estimatedWallArea !== 0) throw new Error(`Expected clamped net wall area 0, got ${resClamped.estimatedWallArea}`);
  if (resClamped.estimatedPaintRequired !== 0) throw new Error(`Expected 0 paint required for 0 net area, got ${resClamped.estimatedPaintRequired}`);

  // 6d. Test boundary cases around 0.25, 0.50, and 0.75 gallons and confirm purchased volume always meets or exceeds required volume
  // Case A: excess = 0.25 gal (e.g. 1.25 gal required) -> 1 gal + 1 qt = 1.25 gal
  const resBoundary25 = calculatePaint({
    unit: 'imperial',
    length: '10',
    width: '10',
    height: '10',
    doors: '0',
    windows: '0',
    coats: 1,
    coveragePerGallon: '320', // 400 / 320 = 1.25 gal
  });
  if (Math.abs(resBoundary25.estimatedPaintRequired - 1.25) > 0.001) throw new Error(`Expected 1.25 gal, got ${resBoundary25.estimatedPaintRequired}`);
  if (resBoundary25.recommendedGallons !== 1 || resBoundary25.recommendedQuarts !== 1) {
    throw new Error(`Expected 1 gal + 1 qt for 1.25 gal need, got ${resBoundary25.recommendedGallons} gal + ${resBoundary25.recommendedQuarts} qt`);
  }
  if (resBoundary25.totalPurchasedVolume < resBoundary25.estimatedPaintRequired) {
    throw new Error(`Purchased volume ${resBoundary25.totalPurchasedVolume} must be >= required ${resBoundary25.estimatedPaintRequired}`);
  }

  // Case B: excess = 0.50 gal (e.g. 1.50 gal required) -> 1 gal + 2 qt = 1.50 gal
  const resBoundary50 = calculatePaint({
    unit: 'imperial',
    length: '10',
    width: '10',
    height: '10',
    doors: '0',
    windows: '0',
    coats: 1,
    coveragePerGallon: (400 / 1.5).toString(), // 400 / (400/1.5) = 1.50 gal
  });
  if (Math.abs(resBoundary50.estimatedPaintRequired - 1.50) > 0.001) throw new Error(`Expected 1.50 gal, got ${resBoundary50.estimatedPaintRequired}`);
  if (resBoundary50.recommendedGallons !== 1 || resBoundary50.recommendedQuarts !== 2) {
    throw new Error(`Expected 1 gal + 2 qt for 1.50 gal need, got ${resBoundary50.recommendedGallons} gal + ${resBoundary50.recommendedQuarts} qt`);
  }
  if (resBoundary50.totalPurchasedVolume < resBoundary50.estimatedPaintRequired) {
    throw new Error(`Purchased volume ${resBoundary50.totalPurchasedVolume} must be >= required ${resBoundary50.estimatedPaintRequired}`);
  }

  // Case C: excess = 0.75 gal (e.g. 1.75 gal required) -> 2 full gallons = 2.00 gal
  const resBoundary75 = calculatePaint({
    unit: 'imperial',
    length: '10',
    width: '10',
    height: '10',
    doors: '0',
    windows: '0',
    coats: 1,
    coveragePerGallon: (400 / 1.75).toString(), // 400 / (400/1.75) = 1.75 gal
  });
  if (Math.abs(resBoundary75.estimatedPaintRequired - 1.75) > 0.001) throw new Error(`Expected 1.75 gal, got ${resBoundary75.estimatedPaintRequired}`);
  if (resBoundary75.recommendedGallons !== 2 || resBoundary75.recommendedQuarts !== 0) {
    throw new Error(`Expected 2 full gallons for 1.75 gal need, got ${resBoundary75.recommendedGallons} gal + ${resBoundary75.recommendedQuarts} qt`);
  }
  if (resBoundary75.totalPurchasedVolume < resBoundary75.estimatedPaintRequired) {
    throw new Error(`Purchased volume ${resBoundary75.totalPurchasedVolume} must be >= required ${resBoundary75.estimatedPaintRequired}`);
  }
});

// 7. Flooring + Box Overage
test('7. Flooring Calculator & Carton Purchasing', () => {
  const res = calculateFlooring({ unit: 'feet', length: '20', width: '15', wastePercent: '10', boxSize: '20', pricePerUnit: '3.00' });
  if (res.basicFloorArea !== 300) throw new Error(`Expected 300 sq ft, got ${res.basicFloorArea}`);
  if (res.wasteArea !== 30) throw new Error(`Expected 30 sq ft waste, got ${res.wasteArea}`);
  if (res.recommendedMaterial !== 330) throw new Error(`Expected 330 sq ft recommended, got ${res.recommendedMaterial}`);
  if (res.boxesNeeded !== 17) throw new Error(`Expected 17 boxes, got ${res.boxesNeeded}`);
  if (res.totalPurchasedArea !== 340) throw new Error(`Expected 340 sq ft purchased, got ${res.totalPurchasedArea}`);
  if (res.overageArea !== 40) throw new Error(`Expected 40 sq ft overage, got ${res.overageArea}`);
  if (res.totalEstimatedCost !== 1020) throw new Error(`Expected $1,020 cost, got ${res.totalEstimatedCost}`);
});

// 8. Tile
test('8. Tile Calculator', () => {
  const res = calculateTile({ unit: 'imperial', roomLength: '10', roomWidth: '10', tileLength: '12', tileWidth: '12', wastePercent: '10' });
  if (res.recommendedTiles <= 0) throw new Error(`Tile calculation error`);
});

// 9. Concrete + Weight & Bags
test('9. Concrete Calculator & Weight Verification', () => {
  const res = calculateConcrete({ lengthFeet: '10', widthFeet: '10', depthInches: '4', wastePercent: '10' });
  if (res.volumeCubicFeet <= 0 || res.volumeCubicYards <= 0) throw new Error(`Concrete volume error`);
  // 100 sq ft * (4/12) ft = 33.333 cu ft. + 10% = 36.667 cu ft.
  // 80 lb bags = ceil(36.667 / 0.60) = 62 bags
  if (res.bags80lb !== 62) throw new Error(`Expected 62 bags of 80lb, got ${res.bags80lb}`);
  if (res.totalWeightLbs80 !== 4960) throw new Error(`Expected 4,960 lbs, got ${res.totalWeightLbs80}`);
  if (Math.abs(res.totalWeightTons80 - 2.48) > 0.01) throw new Error(`Expected 2.48 tons, got ${res.totalWeightTons80}`);

  // 9b. Test 50 lb bag calculations (proportional planning estimate: 0.375 cu ft)
  // ceil(36.6667 / 0.375) = 98 bags
  if (res.bags50lb !== 98) throw new Error(`Expected 98 bags of 50lb, got ${res.bags50lb}`);
  if (res.totalWeightLbs50 !== 4900) throw new Error(`Expected 4,900 lbs, got ${res.totalWeightLbs50}`);

  // 9c. Test custom bag yield parameter
  const resCustomYield = calculateConcrete({
    lengthFeet: '10',
    widthFeet: '10',
    depthInches: '4',
    wastePercent: '10',
    bagYield80lb: 0.55, // custom 0.55 cu ft yield per bag
    bagYield50lb: 0.35, // custom 0.35 cu ft yield per bag
  });
  // ceil(36.6667 / 0.55) = 67 bags
  if (resCustomYield.bags80lb !== 67) throw new Error(`Expected 67 bags with 0.55 cu ft yield, got ${resCustomYield.bags80lb}`);
  if (resCustomYield.totalWeightLbs80 !== 67 * 80) throw new Error(`Weight mismatch: ${resCustomYield.totalWeightLbs80}`);
  // ceil(36.6667 / 0.35) = 105 bags
  if (resCustomYield.bags50lb !== 105) throw new Error(`Expected 105 bags with 0.35 cu ft yield, got ${resCustomYield.bags50lb}`);
  if (resCustomYield.totalWeightLbs50 !== 105 * 50) throw new Error(`Weight mismatch: ${resCustomYield.totalWeightLbs50}`);
});

// 10. Mulch
test('10. Mulch Calculator', () => {
  const res = calculateMulch({ lengthFeet: '20', widthFeet: '5', depthInches: '3' });
  if (res.cubicYards <= 0 || res.bags2CuFt <= 0) throw new Error(`Mulch calculation error`);
});

// 11. Fuel Cost
test('11. Fuel Cost Calculator', () => {
  const res = calculateFuel({ unitSystem: 'us', distance: '300', efficiency: '30', fuelPrice: '3.5', passengers: '1', isRoundTrip: false });
  if (res.estimatedTripCost !== 35) throw new Error(`Expected $35, got ${res.estimatedTripCost}`);
});

// 12. Gas Mileage
test('12. Gas Mileage Calculator', () => {
  const res = calculateMileage({ unit: 'us', distance: '350', fuelUsed: '10' });
  if (res.mpg !== 35) throw new Error(`Expected 35 mpg, got ${res.mpg}`);
});

// 13. Commute Cost
test('13. Commute Cost Calculator', () => {
  const res = calculateCommute({ oneWayDistance: '20', daysPerWeek: '5', efficiencyMpg: '25', fuelPrice: '3.5' });
  if (res.dailyCost <= 0 || res.monthlyCost <= 0) throw new Error(`Commute calculation error`);
});

// 14. Electricity Cost & EIA 2024 Presets
test('14. Electricity Cost Calculator & Rate Breakdown', () => {
  // Verify EIA 2024 presets exact values
  if (EIA_2024_RESIDENTIAL_BENCHMARKS.length !== 5) {
    throw new Error(`Expected 5 EIA 2024 presets, got ${EIA_2024_RESIDENTIAL_BENCHMARKS.length}`);
  }

  const us = EIA_2024_RESIDENTIAL_BENCHMARKS.find((p) => p.id === 'us-total');
  const wa = EIA_2024_RESIDENTIAL_BENCHMARKS.find((p) => p.id === 'wa');
  const tx = EIA_2024_RESIDENTIAL_BENCHMARKS.find((p) => p.id === 'tx');
  const ca = EIA_2024_RESIDENTIAL_BENCHMARKS.find((p) => p.id === 'ca');
  const hi = EIA_2024_RESIDENTIAL_BENCHMARKS.find((p) => p.id === 'hi');

  if (!us || us.centsPerKwh !== 16.48 || us.rateString !== '0.165') {
    throw new Error(`US benchmark mismatch: expected 16.48¢ ($0.165), got ${us?.centsPerKwh}¢`);
  }
  if (!wa || wa.centsPerKwh !== 11.90 || wa.rateString !== '0.119') {
    throw new Error(`WA benchmark mismatch: expected 11.90¢ ($0.119), got ${wa?.centsPerKwh}¢`);
  }
  if (!tx || tx.centsPerKwh !== 14.94 || tx.rateString !== '0.149') {
    throw new Error(`TX benchmark mismatch: expected 14.94¢ ($0.149), got ${tx?.centsPerKwh}¢`);
  }
  if (!ca || ca.centsPerKwh !== 31.97 || ca.rateString !== '0.320') {
    throw new Error(`CA benchmark mismatch: expected 31.97¢ ($0.320), got ${ca?.centsPerKwh}¢`);
  }
  if (!hi || hi.centsPerKwh !== 42.86 || hi.rateString !== '0.429') {
    throw new Error(`HI benchmark mismatch: expected 42.86¢ ($0.429), got ${hi?.centsPerKwh}¢`);
  }

  // Cost calculation test with rounded default preset rate ($0.165/kWh)
  const resRounded = calculateElectricity({ wattage: '1500', hoursPerDay: '8', pricePerKwh: '0.165', daysUsed: '30' });
  // 1500W = 1.5 kW. 1.5 * 0.165 = $0.2475/hr. 8 hrs = $1.98/day. 30 days = $59.40.
  if (Math.abs(resRounded.hourlyCost - 0.2475) > 0.0001) throw new Error(`Expected 0.2475 hourly cost, got ${resRounded.hourlyCost}`);
  if (Math.abs(resRounded.dailyCost - 1.98) > 0.001) throw new Error(`Expected 1.98 daily cost, got ${resRounded.dailyCost}`);
  if (Math.abs(resRounded.totalCost - 59.40) > 0.01) throw new Error(`Expected 59.40 total cost, got ${resRounded.totalCost}`);

  // Cost calculation test with exact unrounded 16.48 cents ($0.1648/kWh)
  const resExact = calculateElectricity({ wattage: '1500', hoursPerDay: '8', pricePerKwh: '0.1648', daysUsed: '30' });
  if (Math.abs(resExact.hourlyCost - 0.2472) > 0.0001) throw new Error(`Expected 0.2472 hourly cost, got ${resExact.hourlyCost}`);
  if (Math.abs(resExact.dailyCost - 1.9776) > 0.0001) throw new Error(`Expected 1.9776 daily cost, got ${resExact.dailyCost}`);
  if (Math.abs(resExact.totalCost - 59.328) > 0.001) throw new Error(`Expected 59.328 total cost, got ${resExact.totalCost}`);

  // Test state benchmarks calculations
  for (const preset of [wa, tx, ca, hi]) {
    const calc = calculateElectricity({ wattage: '1000', hoursPerDay: '1', pricePerKwh: preset.rateString, daysUsed: '30' });
    if (calc.totalCost <= 0 || isNaN(calc.totalCost)) {
      throw new Error(`Failed calculation for preset ${preset.id}`);
    }
  }
});

// 15. Date Difference
test('15. Date Difference Calculator', () => {
  const res = calculateDateDifference({ startDate: '2026-01-01', endDate: '2026-01-10', includeEndDate: false });
  if (res.totalDays !== 9) throw new Error(`Expected 9 days, got ${res.totalDays}`);
});

// 16. Recipe Scale
test('16. Recipe Scale Calculator', () => {
  const res = calculateRecipeScale({
    originalServings: '4',
    desiredServings: '8',
    ingredientQuantity: '2',
  });
  if (res.scaleFactor !== 2 || res.adjustedQuantity !== 4) throw new Error(`Expected multiplier 2, got ${res.scaleFactor}`);
});

// 17. Cooking Unit Converter
test('17. Cooking Unit Converter', () => {
  const res = calculateCookingConverter({ amount: '1', fromUnit: 'cup', toUnit: 'tablespoon' });
  const rounded = Math.round(res.convertedAmount);
  if (rounded !== 16) throw new Error(`Expected 16 tbsp in 1 cup, got ${res.convertedAmount}`);
});

// 18. Cups to Grams (Bidirectional & Flour Density)
test('18. Cups to Grams Converter (King Arthur 120g & Bidirectional)', () => {
  // Test 1: Granulated Sugar (200g)
  const resSugar = calculateCupsToGrams({ cups: '1', ingredientId: 'granulated_sugar' });
  if (resSugar.grams !== 200) throw new Error(`Expected 200g for 1 cup granulated sugar, got ${resSugar.grams}`);

  // Test 2: AP Flour (120g spooned & leveled)
  const resFlour = calculateCupsToGrams({ cups: '2.5', ingredientId: 'all_purpose_flour' });
  if (resFlour.grams !== 300) throw new Error(`Expected 300g for 2.5 cups AP flour, got ${resFlour.grams}`);

  // Test 3: Grams to Cups reverse
  const resReverse = calculateCupsToGrams({ mode: 'grams_to_cups', gramsInput: '240', ingredientId: 'all_purpose_flour' });
  if (resReverse.cups !== 2) throw new Error(`Expected 2 cups for 240g AP flour, got ${resReverse.cups}`);
});

// 19. Work Hours
test('19. Work Hours Calculator', () => {
  const res = calculateWorkHours({ startTime: '09:00', endTime: '17:00', breakMinutes: '30' });
  if (res.decimalHours !== 7.5) throw new Error(`Expected 7.5 hours, got ${res.decimalHours}`);
});

// 20. GPA Calculator
test('20. GPA Calculator', () => {
  const res = calculateGpa({
    courses: [
      { id: '1', name: 'Course 1', grade: 'A', credits: '3', courseType: 'regular' },
      { id: '2', name: 'Course 2', grade: 'B', credits: '3', courseType: 'regular' },
    ],
  });
  if (res.gpa !== 3.5) throw new Error(`Expected 3.5 GPA, got ${res.gpa}`);
});

console.log(`\n🎉 Results: ${passed}/${total} Calculators passed functional testing without error!\n`);
if (passed !== total) {
  process.exit(1);
}
