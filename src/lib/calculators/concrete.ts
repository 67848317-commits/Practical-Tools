export interface ConcreteInput {
  lengthFeet: string;
  widthFeet: string;
  depthInches: string;
  wastePercent?: string; // default 10% for uneven subgrade and spillage
  bagYield80lb?: number; // cu ft yield per 80 lb bag (typical manufacturer TDS: 0.60 cu ft, e.g. QUIKRETE® #1101, Sakrete)
  bagYield60lb?: number; // cu ft yield per 60 lb bag (typical manufacturer TDS: 0.45 cu ft, e.g. QUIKRETE® #1101, Sakrete)
  bagYield50lb?: number; // cu ft yield per 50 lb bag (editable proportional planning estimate: 0.375 cu ft; not directly specified in cited manufacturer TDS)
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
  recommendedCubicFeet: number;
  bags80lb: number;
  bags60lb: number;
  bags50lb: number;
  totalWeightLbs80: number;
  totalWeightTons80: number;
  totalWeightLbs60: number;
  totalWeightTons60: number;
  totalWeightLbs50: number;
  totalWeightTons50: number;
  calculationSteps: string[];
  errorMessage?: string;
}

export function calculateConcrete(input: ConcreteInput): ConcreteResult {
  const lStr = (input.lengthFeet ?? '').trim();
  const wStr = (input.widthFeet ?? '').trim();
  const dStr = (input.depthInches ?? '').trim();
  const wasteStr = (input.wastePercent ?? '').trim();

  const emptyResult: ConcreteResult = {
    lengthFeet: 0,
    widthFeet: 0,
    depthInches: 0,
    depthFeet: 0,
    surfaceAreaSqFt: 0,
    volumeCubicFeet: 0,
    volumeCubicYards: 0,
    wastePercent: 0,
    recommendedCubicYards: 0,
    recommendedCubicFeet: 0,
    bags80lb: 0,
    bags60lb: 0,
    bags50lb: 0,
    totalWeightLbs80: 0,
    totalWeightTons80: 0,
    totalWeightLbs60: 0,
    totalWeightTons60: 0,
    totalWeightLbs50: 0,
    totalWeightTons50: 0,
    calculationSteps: [],
  };

  if (lStr === '' || wStr === '' || dStr === '') {
    return {
      ...emptyResult,
      errorMessage: 'Please enter length, width (in feet), and depth (in inches).',
    };
  }

  const length = parseFloat(lStr);
  const width = parseFloat(wStr);
  const depthInches = parseFloat(dStr);
  const wastePercent = wasteStr === '' ? 10 : parseFloat(wasteStr);

  if (isNaN(length) || length <= 0 || isNaN(width) || width <= 0 || isNaN(depthInches) || depthInches <= 0) {
    return {
      ...emptyResult,
      errorMessage: 'All dimensions (length, width, and depth) must be positive numbers greater than zero.',
    };
  }

  if (isNaN(wastePercent) || wastePercent < 0 || wastePercent > 50) {
    return {
      ...emptyResult,
      lengthFeet: length,
      widthFeet: width,
      depthInches,
      depthFeet: depthInches / 12,
      surfaceAreaSqFt: length * width,
      errorMessage: 'Recommended waste buffer should be between 0% and 50% (standard contractor allowance: 10%).',
    };
  }

  const depthFeet = depthInches / 12;
  const surfaceAreaSqFt = length * width;
  const volumeCubicFeet = surfaceAreaSqFt * depthFeet;
  const volumeCubicYards = volumeCubicFeet / 27;

  const recommendedCubicYards = volumeCubicYards * (1 + wastePercent / 100);
  const recommendedCubicFeet = volumeCubicFeet * (1 + wastePercent / 100);

  // Bag yields:
  // - 80-lb bag ≈ 0.60 cubic feet (manufacturer TDS documented, e.g. QUIKRETE® Concrete Mix #1101, Sakrete)
  // - 60-lb bag ≈ 0.45 cubic feet (manufacturer TDS documented, e.g. QUIKRETE® Concrete Mix #1101, Sakrete)
  // - 50-lb bag ≈ 0.375 cubic feet (editable proportional planning estimate based on ~133 lbs/cu ft density; not listed on cited commercial premix TDS)
  // Note: Individual manufacturer aggregate blends differ; users should verify the exact yield printed on the bag label.
  const yield80 = input.bagYield80lb && input.bagYield80lb > 0 ? input.bagYield80lb : 0.60;
  const yield60 = input.bagYield60lb && input.bagYield60lb > 0 ? input.bagYield60lb : 0.45;
  const yield50 = input.bagYield50lb && input.bagYield50lb > 0 ? input.bagYield50lb : 0.375;

  const safeCeil = (val: number): number => {
    if (val <= 0 || !Number.isFinite(val)) return 0;
    const rounded = Math.round(val);
    if (rounded >= 1 && val > rounded && val - rounded <= Number.EPSILON * rounded * 64) {
      return rounded;
    }
    return Math.ceil(val);
  };

  const bags80lb = safeCeil(recommendedCubicFeet / yield80);
  const bags60lb = safeCeil(recommendedCubicFeet / yield60);
  const bags50lb = safeCeil(recommendedCubicFeet / yield50);

  const totalWeightLbs80 = bags80lb * 80;
  const totalWeightTons80 = totalWeightLbs80 / 2000;

  const totalWeightLbs60 = bags60lb * 60;
  const totalWeightTons60 = totalWeightLbs60 / 2000;

  const totalWeightLbs50 = bags50lb * 50;
  const totalWeightTons50 = totalWeightLbs50 / 2000;

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
    recommendedCubicFeet,
    bags80lb,
    bags60lb,
    bags50lb,
    totalWeightLbs80,
    totalWeightTons80,
    totalWeightLbs60,
    totalWeightTons60,
    totalWeightLbs50,
    totalWeightTons50,
    calculationSteps: [
      `Convert depth from inches to feet: ${depthInches}" ÷ 12 = ${fmt(depthFeet, 3)} ft`,
      `Calculate surface footprint: ${fmt(length, 1)} ft × ${fmt(width, 1)} ft = ${fmt(surfaceAreaSqFt)} sq ft`,
      `Calculate exact volume in cubic feet: ${fmt(surfaceAreaSqFt)} sq ft × ${fmt(depthFeet, 3)} ft = ${fmt(volumeCubicFeet)} cu ft`,
      `Convert cubic feet to cubic yards: ${fmt(volumeCubicFeet)} cu ft ÷ 27 = ${fmt(volumeCubicYards)} cu yd`,
      `Recommended order with ${wastePercent}% safety buffer: ${fmt(volumeCubicYards)} × ${(1 + wastePercent / 100).toFixed(2)} = ${fmt(recommendedCubicYards)} cu yd (${fmt(recommendedCubicFeet)} cu ft)`,
      `80 lb premix bags: ceil(${fmt(recommendedCubicFeet)} ÷ ${yield80} cu ft/bag) = ${bags80lb} bags (${fmt(totalWeightLbs80, 0)} lbs / ${fmt(totalWeightTons80, 2)} tons)`,
      `60 lb premix bags: ceil(${fmt(recommendedCubicFeet)} ÷ ${yield60} cu ft/bag) = ${bags60lb} bags (${fmt(totalWeightLbs60, 0)} lbs / ${fmt(totalWeightTons60, 2)} tons)`,
      `Planning Note: 80 lb and 60 lb yields are typical manufacturer TDS values (QUIKRETE® #1101, Sakrete). The 50 lb yield (~0.375 cu ft) is an editable proportional planning estimate. Always verify yield on your product bag label.`,
    ],
  };
}
