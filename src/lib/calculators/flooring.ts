export type FlooringUnit = 'feet' | 'meters';

export interface FlooringInput {
  unit: FlooringUnit;
  length: string;
  width: string;
  wastePercent: string;
  boxSize?: string; // optional sq ft/box
}

export interface FlooringResult {
  unit: FlooringUnit;
  basicFloorArea: number;
  wastePercent: number;
  wasteArea: number;
  recommendedMaterial: number;
  boxesNeeded?: number;
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
      errorMessage: 'Waste factor must be a percentage between 0% and 100% (standard: 10% for straight planks, 15% for diagonal/herringbone).',
    };
  }

  const basicFloorArea = length * width;
  const wasteArea = (basicFloorArea * wastePercent) / 100;
  const recommendedMaterial = basicFloorArea * (1 + wastePercent / 100);

  let boxesNeeded: number | undefined = undefined;
  if (boxSize && !isNaN(boxSize) && boxSize > 0) {
    boxesNeeded = Math.ceil(recommendedMaterial / boxSize);
  }

  const fmt = (v: number, dec: number = 2) =>
    v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  const steps = [
    `Calculate basic floor area: ${fmt(length, 1)} × ${fmt(width, 1)} = ${fmt(basicFloorArea)} ${areaUnit}`,
    `Calculate cut & pattern waste (${wastePercent}%): ${fmt(basicFloorArea)} × ${wastePercent}% ÷ 100 = ${fmt(wasteArea)} ${areaUnit}`,
    `Recommended material order: ${fmt(basicFloorArea)} × (1 + ${wastePercent} / 100) = ${fmt(recommendedMaterial)} ${areaUnit}`,
    ...(boxesNeeded
      ? [`Boxes required (at ${boxSize} ${areaUnit}/box): ceil(${fmt(recommendedMaterial)} ÷ ${boxSize}) = ${boxesNeeded} boxes`]
      : []),
  ];

  return {
    unit,
    basicFloorArea,
    wastePercent,
    wasteArea,
    recommendedMaterial,
    boxesNeeded,
    areaUnit,
    calculationSteps: steps,
  };
}
