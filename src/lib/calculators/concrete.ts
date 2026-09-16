export interface ConcreteInput {
  lengthFeet: string;
  widthFeet: string;
  depthInches: string;
  wastePercent?: string; // default 10% for uneven subgrade and spillage
}

export interface ConcreteResult {
  lengthFeet: number;
  widthFeet: number;
  depthInches: number;
  depthFeet: number;
  surfaceAreaSqFt: number;
  volumeCubicFeet: number;
  volumeCubicYards: number;
  wastePercent: number;
  recommendedCubicYards: number;
  bags60lb: number;
  bags80lb: number;
  calculationSteps: string[];
  errorMessage?: string;
}

export function calculateConcrete(input: ConcreteInput): ConcreteResult {
  const lStr = (input.lengthFeet ?? '').trim();
  const wStr = (input.widthFeet ?? '').trim();
  const dStr = (input.depthInches ?? '').trim();
  const wasteStr = (input.wastePercent ?? '').trim();

  if (lStr === '' || wStr === '' || dStr === '') {
    return {
      lengthFeet: 0,
      widthFeet: 0,
      depthInches: 0,
      depthFeet: 0,
      surfaceAreaSqFt: 0,
      volumeCubicFeet: 0,
      volumeCubicYards: 0,
      wastePercent: 0,
      recommendedCubicYards: 0,
      bags60lb: 0,
      bags80lb: 0,
      calculationSteps: [],
      errorMessage: 'Please enter length, width (in feet), and depth (in inches).',
    };
  }

  const length = parseFloat(lStr);
  const width = parseFloat(wStr);
  const depthInches = parseFloat(dStr);
  const wastePercent = wasteStr === '' ? 10 : parseFloat(wasteStr);

  if (isNaN(length) || length <= 0 || isNaN(width) || width <= 0 || isNaN(depthInches) || depthInches <= 0) {
    return {
      lengthFeet: 0,
      widthFeet: 0,
      depthInches: 0,
      depthFeet: 0,
      surfaceAreaSqFt: 0,
      volumeCubicFeet: 0,
      volumeCubicYards: 0,
      wastePercent: 0,
      recommendedCubicYards: 0,
      bags60lb: 0,
      bags80lb: 0,
      calculationSteps: [],
      errorMessage: 'All dimensions (length, width, and depth) must be positive numbers greater than zero.',
    };
  }

  if (isNaN(wastePercent) || wastePercent < 0 || wastePercent > 50) {
    return {
      lengthFeet: length,
      widthFeet: width,
      depthInches,
      depthFeet: depthInches / 12,
      surfaceAreaSqFt: length * width,
      volumeCubicFeet: 0,
      volumeCubicYards: 0,
      wastePercent: 0,
      recommendedCubicYards: 0,
      bags60lb: 0,
      bags80lb: 0,
      calculationSteps: [],
      errorMessage: 'Recommended waste buffer should be between 0% and 50% (standard contractor allowance: 10%).',
    };
  }

  const depthFeet = depthInches / 12;
  const surfaceAreaSqFt = length * width;
  const volumeCubicFeet = surfaceAreaSqFt * depthFeet;
  const volumeCubicYards = volumeCubicFeet / 27;

  const recommendedCubicYards = volumeCubicYards * (1 + wastePercent / 100);
  const recommendedCubicFeet = volumeCubicFeet * (1 + wastePercent / 100);

  // Bag estimates:
  // 60-lb bag = 0.45 cubic feet
  // 80-lb bag = 0.60 cubic feet
  const bags60lb = Math.ceil(recommendedCubicFeet / 0.45);
  const bags80lb = Math.ceil(recommendedCubicFeet / 0.60);

  const fmt = (v: number, dec: number = 2) =>
    v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  return {
    lengthFeet: length,
    widthFeet: width,
    depthInches,
    depthFeet,
    surfaceAreaSqFt,
    volumeCubicFeet,
    volumeCubicYards,
    wastePercent,
    recommendedCubicYards,
    bags60lb,
    bags80lb,
    calculationSteps: [
      `Convert depth from inches to feet: ${depthInches}" ÷ 12 = ${fmt(depthFeet, 3)} ft`,
      `Calculate surface footprint: ${fmt(length, 1)} ft × ${fmt(width, 1)} ft = ${fmt(surfaceAreaSqFt)} sq ft`,
      `Calculate exact volume in cubic feet: ${fmt(surfaceAreaSqFt)} sq ft × ${fmt(depthFeet, 3)} ft = ${fmt(volumeCubicFeet)} cu ft`,
      `Convert cubic feet to cubic yards: ${fmt(volumeCubicFeet)} cu ft ÷ 27 = ${fmt(volumeCubicYards)} cu yd`,
      `Contractor recommended order (${wastePercent}% overrun buffer for subgrade irregularity): ${fmt(volumeCubicYards)} × ${(1 + wastePercent / 100).toFixed(2)} = ${fmt(recommendedCubicYards)} cu yd`,
      `Premix alternative: approx. ${bags80lb} bags (80 lb) OR ${bags60lb} bags (60 lb)`,
    ],
  };
}
