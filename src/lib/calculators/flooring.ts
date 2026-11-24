export type FlooringUnit = 'feet' | 'meters';
export type FlooringPattern = 'straight' | 'diagonal' | 'herringbone' | 'custom';

export interface FlooringInput {
  unit: FlooringUnit;
  length: string;
  width: string;
  wastePercent: string;
  boxSize?: string; // sq ft/box or m²/box
  pricePerUnit?: string; // optional price per sq ft or m²
  pattern?: FlooringPattern;
}

export interface FlooringResult {
  unit: FlooringUnit;
  basicFloorArea: number;
  wastePercent: number;
  wasteArea: number;
  recommendedMaterial: number;
  boxesNeeded?: number;
  totalPurchasedArea?: number;
  overageArea?: number;
  totalEstimatedCost?: number;
  pricePerUnit?: number;
  areaUnit: string;
  calculationSteps: string[];
  errorMessage?: string;
}

export function calculateFlooring(input: FlooringInput): FlooringResult {
  const { unit } = input;
  const areaUnit = unit === 'feet' ? 'sq ft' : 'm²';

  const lStr = (input.length ?? '').trim();
  const wStr = (input.width ?? '').trim();
  const wasteStr = (input.wastePercent ?? '').trim();
  const boxStr = (input.boxSize ?? '').trim();
  const priceStr = (input.pricePerUnit ?? '').trim();

  if (lStr === '' || wStr === '') {
    return {
      unit,
      basicFloorArea: 0,
      wastePercent: 0,
      wasteArea: 0,
      recommendedMaterial: 0,
      areaUnit,
      calculationSteps: [],
      errorMessage: 'Please enter room length and width.',
    };
  }

  const length = parseFloat(lStr);
  const width = parseFloat(wStr);
  const wastePercent = wasteStr === '' ? 10 : parseFloat(wasteStr);
  const boxSize = boxStr !== '' ? parseFloat(boxStr) : undefined;
  const pricePerUnit = priceStr !== '' ? parseFloat(priceStr) : undefined;

  if (isNaN(length) || length <= 0 || isNaN(width) || width <= 0) {
    return {
      unit,
      basicFloorArea: 0,
      wastePercent: 0,
      wasteArea: 0,
      recommendedMaterial: 0,
      areaUnit,
      calculationSteps: [],
      errorMessage: 'Room length and width must be positive numbers greater than zero.',
    };
  }

  if (isNaN(wastePercent) || wastePercent < 0 || wastePercent > 100) {
    return {
      unit,
      basicFloorArea: length * width,
      wastePercent: 0,
      wasteArea: 0,
      recommendedMaterial: length * width,
      areaUnit,
      calculationSteps: [],
      errorMessage: 'Waste factor must be a percentage between 0% and 100% (common trade planning allowances: 10% straight planks, 15% diagonal, 20% herringbone).',
    };
  }

  const basicFloorArea = length * width;
  const wasteArea = (basicFloorArea * wastePercent) / 100;
  const recommendedMaterial = basicFloorArea * (1 + wastePercent / 100);

  let boxesNeeded: number | undefined = undefined;
  let totalPurchasedArea: number | undefined = undefined;
  let overageArea: number | undefined = undefined;

  const safeCeil = (val: number): number => {
    if (val <= 0 || !Number.isFinite(val)) return 0;
    const rounded = Math.round(val);
    if (rounded >= 1 && val > rounded && val - rounded <= Number.EPSILON * rounded * 64) {
      return rounded;
    }
    return Math.ceil(val);
  };

  if (boxSize && !isNaN(boxSize) && boxSize > 0) {
    boxesNeeded = safeCeil(recommendedMaterial / boxSize);
    totalPurchasedArea = boxesNeeded * boxSize;
    overageArea = totalPurchasedArea - basicFloorArea;
  }

  let totalEstimatedCost: number | undefined = undefined;
  if (pricePerUnit && !isNaN(pricePerUnit) && pricePerUnit > 0) {
    // If buying by the box, cost is based on total purchased box coverage; otherwise on recommended material
    const billableArea = totalPurchasedArea ?? recommendedMaterial;
    totalEstimatedCost = billableArea * pricePerUnit;
  }

  const fmt = (v: number, dec: number = 2) =>
    v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  const steps = [
    `Calculate basic net floor area: ${fmt(length, 1)} × ${fmt(width, 1)} = ${fmt(basicFloorArea)} ${areaUnit}`,
    `Calculate cut & pattern waste allowance (${wastePercent}%): ${fmt(basicFloorArea)} × ${wastePercent}% ÷ 100 = ${fmt(wasteArea)} ${areaUnit}`,
    `Recommended material with buffer: ${fmt(basicFloorArea)} × (1 + ${wastePercent} / 100) = ${fmt(recommendedMaterial)} ${areaUnit}`,
    ...(boxesNeeded && boxSize
      ? [
          `Cartons required: ceil(${fmt(recommendedMaterial)} ÷ ${boxSize} ${areaUnit}/box) = ${boxesNeeded} full boxes`,
          `Actual coverage purchased: ${boxesNeeded} boxes × ${boxSize} ${areaUnit} = ${fmt(totalPurchasedArea!)} ${areaUnit} (${fmt(overageArea!)} ${areaUnit} total margin over net floor)`,
        ]
      : []),
    ...(totalEstimatedCost && pricePerUnit
      ? [`Estimated total flooring material cost: ${fmt(totalPurchasedArea ?? recommendedMaterial)} ${areaUnit} × $${fmt(pricePerUnit)}/${areaUnit} = $${fmt(totalEstimatedCost)}`]
      : []),
  ];

  return {
    unit,
    basicFloorArea,
    wastePercent,
    wasteArea,
    recommendedMaterial,
    boxesNeeded,
    totalPurchasedArea,
    overageArea,
    totalEstimatedCost,
    pricePerUnit,
    areaUnit,
    calculationSteps: steps,
  };
}
