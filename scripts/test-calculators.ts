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
import { calculateElectricity } from '../src/lib/calculators/electricity';
import { calculateDateDifference } from '../src/lib/calculators/dateDifference';
import { calculateRecipeScale } from '../src/lib/calculators/recipeScale';
import { calculateCookingConverter } from '../src/lib/calculators/cookingConverter';
import { calculateCupsToGrams } from '../src/lib/calculators/cupsToGrams';
import { calculateWorkHours } from '../src/lib/calculators/workHours';
import { calculateGpa } from '../src/lib/calculators/gpa';

console.log('🧪 Starting Functional Regression Test for all 20 Calculators...\n');

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

// 6. Paint
test('6. Paint Calculator', () => {
  const res = calculatePaint({ unit: 'imperial', length: '12', width: '10', height: '8', doors: '1', windows: '1', coats: 2, coveragePerGallon: '350' });
  if (res.recommendedCans <= 0 || res.estimatedWallArea <= 0) throw new Error(`Paint calculation error`);
});

// 7. Flooring
test('7. Flooring Calculator', () => {
  const res = calculateFlooring({ unit: 'feet', length: '20', width: '15', wastePercent: '10', boxSize: '20' });
  if (res.boxesNeeded !== 17) throw new Error(`Expected 17 boxes, got ${res.boxesNeeded}`);
});

// 8. Tile
test('8. Tile Calculator', () => {
  const res = calculateTile({ unit: 'imperial', roomLength: '10', roomWidth: '10', tileLength: '12', tileWidth: '12', wastePercent: '10' });
  if (res.recommendedTiles <= 0) throw new Error(`Tile calculation error`);
});

// 9. Concrete
test('9. Concrete Calculator', () => {
  const res = calculateConcrete({ lengthFeet: '10', widthFeet: '10', depthInches: '4' });
  if (res.volumeCubicYards <= 0 || res.bags80lb <= 0) throw new Error(`Concrete calculation error`);
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

// 14. Electricity Cost
test('14. Electricity Cost Calculator', () => {
  const res = calculateElectricity({ wattage: '1500', hoursPerDay: '8', pricePerKwh: '0.15', daysUsed: '30' });
  if (Math.abs(res.dailyCost - 1.8) > 0.001) throw new Error(`Expected 1.8 daily cost, got ${res.dailyCost}`);
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

// 18. Cups to Grams
test('18. Cups to Grams Converter', () => {
  const res = calculateCupsToGrams({ cups: '1', ingredientId: 'granulated_sugar' });
  if (res.grams !== 200) throw new Error(`Expected 200g for 1 cup granulated sugar, got ${res.grams}`);
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
