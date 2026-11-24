export type UnitSystem = 'imperial' | 'metric';
export type SurfaceTexture = 'smooth' | 'textured' | 'rough' | 'custom';

export interface PaintInput {
  unit: UnitSystem;
  length: string;
  width: string;
  height: string;
  doors: string;
  windows: string;
  coats: number;
  coveragePerGallon: string;
  surfaceTexture?: SurfaceTexture;
  doorArea?: string; // optional custom door deduction area
  windowArea?: string; // optional custom window deduction area
}

export interface PaintResult {
  unit: UnitSystem;
  grossWallArea: number;
  openingsDeduction: number;
  estimatedWallArea: number;
  totalSurfaceToPaint: number;
  estimatedPaintRequired: number;
  recommendedCans: number; // Whole full-gallon or full-liter cans (ceil)
  recommendedGallons: number; // Suggested package mix (whole gallons)
  recommendedQuarts: number; // Suggested package mix (quarts)
  totalPurchasedVolume: number; // Total volume provided by suggested package combination
  canOptimizerSummary: string; // E.g., "2 Gallons + 1 Quart"
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

  const emptyResult: PaintResult = {
    unit,
    grossWallArea: 0,
    openingsDeduction: 0,
    estimatedWallArea: 0,
    totalSurfaceToPaint: 0,
    estimatedPaintRequired: 0,
    recommendedCans: 0,
    recommendedGallons: 0,
    recommendedQuarts: 0,
    totalPurchasedVolume: 0,
    canOptimizerSummary: '—',
    areaUnit,
    volumeUnit,
    calculationSteps: [],
  };

  if (lStr === '' || wStr === '' || hStr === '') {
    return {
      ...emptyResult,
      errorMessage: 'Please enter valid room dimensions (length, width, and height greater than zero).',
    };
  }

  const l = parseFloat(lStr);
  const w = parseFloat(wStr);
  const h = parseFloat(hStr);
  const numDoors = dStr === '' ? 0 : (/^\d+$/.test(dStr) ? Number(dStr) : NaN);
  const numWindows = winStr === '' ? 0 : (/^\d+$/.test(winStr) ? Number(winStr) : NaN);
  const coverage = parseFloat(covStr);

  if (isNaN(l) || l <= 0 || isNaN(w) || w <= 0 || isNaN(h) || h <= 0) {
    return {
      ...emptyResult,
      errorMessage: 'Please enter valid room dimensions (length, width, and height greater than zero).',
    };
  }

  if (isNaN(numDoors) || numDoors < 0 || isNaN(numWindows) || numWindows < 0) {
    return {
      ...emptyResult,
      errorMessage: 'Door and window counts must be zero or positive whole numbers.',
    };
  }

  if (isNaN(coverage) || coverage <= 0) {
    return {
      ...emptyResult,
      errorMessage: unit === 'imperial'
        ? 'Paint coverage must be greater than zero (typical: 350 sq ft/gal on smooth primed drywall).'
        : 'Paint coverage must be greater than zero (typical: 8.5 m²/L on smooth primed surface).',
    };
  }

  // Illustrative planning defaults for standard openings (editable if custom value passed):
  // Imperial: ~20 sq ft per typical interior door (nominal 32"×80" door plus casing trim); ~15 sq ft per window (nominal 3×5 ft double-hung)
  // Metric: ~1.86 m² per door; ~1.39 m² per window
  const defaultDoorArea = unit === 'imperial' ? 20 : 1.86;
  const defaultWindowArea = unit === 'imperial' ? 15 : 1.39;

  const parsedDoorArea = input.doorArea ? parseFloat(input.doorArea) : defaultDoorArea;
  const parsedWindowArea = input.windowArea ? parseFloat(input.windowArea) : defaultWindowArea;

  const doorArea = isNaN(parsedDoorArea) || parsedDoorArea < 0 ? defaultDoorArea : parsedDoorArea;
  const windowArea = isNaN(parsedWindowArea) || parsedWindowArea < 0 ? defaultWindowArea : parsedWindowArea;

  const perimeter = 2 * (l + w);
  const grossWallArea = perimeter * h;
  const openingsDeduction = (numDoors * doorArea) + (numWindows * windowArea);
  // Ensure deductions cannot produce negative net paintable area
  const estimatedWallArea = Math.max(0, grossWallArea - openingsDeduction);
  const totalSurfaceToPaint = estimatedWallArea * coats;
  const estimatedPaintRequired = totalSurfaceToPaint / coverage;
  const safeCeil = (val: number): number => {
    if (val <= 0 || !Number.isFinite(val)) return 0;
    const rounded = Math.round(val);
    if (rounded >= 1 && val > rounded && val - rounded <= Number.EPSILON * rounded * 64) {
      return rounded;
    }
    return Math.ceil(val);
  };
  const recommendedCans = safeCeil(estimatedPaintRequired);

  // Suggested package-size combination (gallons vs quarts for imperial, full liters for metric)
  let recommendedGallons = 0;
  let recommendedQuarts = 0;
  let totalPurchasedVolume = 0;
  let canOptimizerSummary = '';

  if (unit === 'imperial') {
    if (estimatedPaintRequired <= 0.001) {
      recommendedGallons = 0;
      recommendedQuarts = 0;
      totalPurchasedVolume = 0;
      canOptimizerSummary = '0 Gallons';
    } else {
      const wholeGal = Math.floor(estimatedPaintRequired);
      const excess = estimatedPaintRequired - wholeGal;

      if (excess <= 0.001) {
        recommendedGallons = wholeGal;
        recommendedQuarts = 0;
        totalPurchasedVolume = wholeGal;
        canOptimizerSummary = `${wholeGal} Gallon${wholeGal === 1 ? '' : 's'}`;
      } else if (excess <= 0.25) {
        recommendedGallons = wholeGal;
        recommendedQuarts = 1;
        totalPurchasedVolume = wholeGal + 0.25;
        canOptimizerSummary = wholeGal === 0 ? '1 Quart (0.25 Gal)' : `${wholeGal} Gallon${wholeGal === 1 ? '' : 's'} + 1 Quart`;
      } else if (excess <= 0.50) {
        recommendedGallons = wholeGal;
        recommendedQuarts = 2;
        totalPurchasedVolume = wholeGal + 0.50;
        canOptimizerSummary = wholeGal === 0 ? '2 Quarts (0.50 Gal)' : `${wholeGal} Gallon${wholeGal === 1 ? '' : 's'} + 2 Quarts`;
      } else {
        // Retail packaging: when requirements exceed 0.50 gallons (2 quarts), suggest a full additional gallon container to ensure adequate coverage and touchup reserve
        recommendedGallons = wholeGal + 1;
        recommendedQuarts = 0;
        totalPurchasedVolume = wholeGal + 1;
        canOptimizerSummary = `${wholeGal + 1} Gallon${wholeGal + 1 === 1 ? '' : 's'} (Full 1-gallon container suggested for fractional needs exceeding 2 quarts)`;
      }
    }
  } else {
    recommendedGallons = recommendedCans;
    recommendedQuarts = 0;
    totalPurchasedVolume = recommendedCans;
    canOptimizerSummary = `${recommendedCans} Liter${recommendedCans === 1 ? '' : 's'}`;
  }

  const fmt = (val: number, dec: number = 1) =>
    val.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  const bufferVol = Math.max(0, totalPurchasedVolume - estimatedPaintRequired);

  return {
    unit,
    grossWallArea,
    openingsDeduction,
    estimatedWallArea,
    totalSurfaceToPaint,
    estimatedPaintRequired,
    recommendedCans,
    recommendedGallons,
    recommendedQuarts,
    totalPurchasedVolume,
    canOptimizerSummary,
    areaUnit,
    volumeUnit,
    calculationSteps: [
      `Gross wall area = 2 × (${l} + ${w}) × ${h} = ${fmt(grossWallArea)} ${areaUnit}`,
      `Openings deduction = (${numDoors} doors × ${doorArea} ${areaUnit}) + (${numWindows} windows × ${windowArea} ${areaUnit}) = ${fmt(openingsDeduction)} ${areaUnit}`,
      `Estimated net wall area = max(0, ${fmt(grossWallArea)} - ${fmt(openingsDeduction)}) = ${fmt(estimatedWallArea)} ${areaUnit}`,
      `Total surface for ${coats} ${coats === 1 ? 'coat' : 'coats'} = ${fmt(estimatedWallArea)} × ${coats} = ${fmt(totalSurfaceToPaint)} ${areaUnit}`,
      `Estimated paint required = ${fmt(totalSurfaceToPaint)} ÷ ${coverage} ${areaUnit}/${unit === 'imperial' ? 'gal' : 'L'} = ${fmt(estimatedPaintRequired, 2)} ${volumeUnit}`,
      unit === 'imperial'
        ? `Suggested retail package combination: ${canOptimizerSummary} = ${fmt(totalPurchasedVolume, 2)} Gal (${fmt(bufferVol, 2)} Gal reserve for touchups)`
        : `Suggested purchase quantity: ${recommendedCans} Liter cans (${fmt(bufferVol, 2)} L reserve for touchups)`,
    ],
  };
}
