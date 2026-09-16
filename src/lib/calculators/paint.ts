export type UnitSystem = 'imperial' | 'metric';

export interface PaintInput {
  unit: UnitSystem;
  length: string;
  width: string;
  height: string;
  doors: string;
  windows: string;
  coats: number;
  coveragePerGallon: string;
}

export interface PaintResult {
  unit: UnitSystem;
  grossWallArea: number;
  openingsDeduction: number;
  estimatedWallArea: number;
  totalSurfaceToPaint: number;
  estimatedPaintRequired: number;
  recommendedCans: number;
  areaUnit: string;
  volumeUnit: string;
  calculationSteps: string[];
  errorMessage?: string;
}

export function calculatePaint(input: PaintInput): PaintResult {
  const { unit, coats } = input;
  const areaUnit = unit === 'imperial' ? 'sq ft' : 'm²';
  const volumeUnit = unit === 'imperial' ? 'Gallons' : 'Liters';

  const lStr = (input.length ?? '').trim();
  const wStr = (input.width ?? '').trim();
  const hStr = (input.height ?? '').trim();
  const dStr = (input.doors ?? '').trim();
  const winStr = (input.windows ?? '').trim();
  const covStr = (input.coveragePerGallon ?? '').trim();

  if (lStr === '' || wStr === '' || hStr === '') {
    return {
      unit,
      grossWallArea: 0,
      openingsDeduction: 0,
      estimatedWallArea: 0,
      totalSurfaceToPaint: 0,
      estimatedPaintRequired: 0,
      recommendedCans: 0,
      areaUnit,
      volumeUnit,
      calculationSteps: [],
      errorMessage: 'Please enter valid room dimensions (length, width, and height greater than zero).',
    };
  }

  const l = parseFloat(lStr);
  const w = parseFloat(wStr);
  const h = parseFloat(hStr);
  const numDoors = dStr === '' ? 0 : parseInt(dStr, 10);
  const numWindows = winStr === '' ? 0 : parseInt(winStr, 10);
  const coverage = parseFloat(covStr);

  if (isNaN(l) || l <= 0 || isNaN(w) || w <= 0 || isNaN(h) || h <= 0) {
    return {
      unit,
      grossWallArea: 0,
      openingsDeduction: 0,
      estimatedWallArea: 0,
      totalSurfaceToPaint: 0,
      estimatedPaintRequired: 0,
      recommendedCans: 0,
      areaUnit,
      volumeUnit,
      calculationSteps: [],
      errorMessage: 'Please enter valid room dimensions (length, width, and height greater than zero).',
    };
  }

  if (isNaN(numDoors) || numDoors < 0 || isNaN(numWindows) || numWindows < 0) {
    return {
      unit,
      grossWallArea: 0,
      openingsDeduction: 0,
      estimatedWallArea: 0,
      totalSurfaceToPaint: 0,
      estimatedPaintRequired: 0,
      recommendedCans: 0,
      areaUnit,
      volumeUnit,
      calculationSteps: [],
      errorMessage: 'Door and window counts must be zero or positive numbers.',
    };
  }

  if (isNaN(coverage) || coverage <= 0) {
    return {
      unit,
      grossWallArea: 0,
      openingsDeduction: 0,
      estimatedWallArea: 0,
      totalSurfaceToPaint: 0,
      estimatedPaintRequired: 0,
      recommendedCans: 0,
      areaUnit,
      volumeUnit,
      calculationSteps: [],
      errorMessage: unit === 'imperial'
        ? 'Paint coverage must be greater than zero (typical: 350 sq ft/gal).'
        : 'Paint coverage must be greater than zero (typical: 8.5 m²/L).',
    };
  }

  // Standard architectural opening deductions:
  // Imperial: 20 sq ft per standard door (32"x80" plus trim), 15 sq ft per standard window (3x5 ft)
  // Metric: 1.86 m² per door, 1.39 m² per window
  const doorArea = unit === 'imperial' ? 20 : 1.86;
  const windowArea = unit === 'imperial' ? 15 : 1.39;

  const perimeter = 2 * (l + w);
  const grossWallArea = perimeter * h;
  const openingsDeduction = (numDoors * doorArea) + (numWindows * windowArea);
  const estimatedWallArea = Math.max(0, grossWallArea - openingsDeduction);
  const totalSurfaceToPaint = estimatedWallArea * coats;
  const estimatedPaintRequired = totalSurfaceToPaint / coverage;
  const recommendedCans = Math.ceil(estimatedPaintRequired);

  const fmt = (val: number, dec: number = 1) =>
    val.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  return {
    unit,
    grossWallArea,
    openingsDeduction,
    estimatedWallArea,
    totalSurfaceToPaint,
    estimatedPaintRequired,
    recommendedCans,
    areaUnit,
    volumeUnit,
    calculationSteps: [
      `Gross wall area = 2 × (${l} + ${w}) × ${h} = ${fmt(grossWallArea)} ${areaUnit}`,
      `Openings deduction = (${numDoors} doors × ${doorArea} ${areaUnit}) + (${numWindows} windows × ${windowArea} ${areaUnit}) = ${fmt(openingsDeduction)} ${areaUnit}`,
      `Estimated net wall area = ${fmt(grossWallArea)} - ${fmt(openingsDeduction)} = ${fmt(estimatedWallArea)} ${areaUnit}`,
      `Total surface for ${coats} ${coats === 1 ? 'coat' : 'coats'} = ${fmt(estimatedWallArea)} × ${coats} = ${fmt(totalSurfaceToPaint)} ${areaUnit}`,
      `Estimated paint required = ${fmt(totalSurfaceToPaint)} ÷ ${coverage} ${areaUnit}/${unit === 'imperial' ? 'gal' : 'L'} = ${fmt(estimatedPaintRequired, 2)} ${volumeUnit}`,
    ],
  };
}
