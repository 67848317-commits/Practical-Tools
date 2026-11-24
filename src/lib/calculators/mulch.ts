export interface MulchInput {
  lengthFeet: string;
  widthFeet: string;
  depthInches: string;
}

export interface MulchResult {
  lengthFeet: number;
  widthFeet: number;
  depthInches: number;
  areaSqFt: number;
  cubicFeet: number;
  cubicYards: number;
  bags2CuFt: number;
  bags3CuFt: number;
  calculationSteps: string[];
  errorMessage?: string;
}

export function calculateMulch(input: MulchInput): MulchResult {
  const lStr = (input.lengthFeet ?? '').trim();
  const wStr = (input.widthFeet ?? '').trim();
  const dStr = (input.depthInches ?? '').trim();

  if (lStr === '' || wStr === '' || dStr === '') {
    return {
      lengthFeet: 0,
      widthFeet: 0,
      depthInches: 0,
      areaSqFt: 0,
      cubicFeet: 0,
      cubicYards: 0,
      bags2CuFt: 0,
      bags3CuFt: 0,
      calculationSteps: [],
      errorMessage: 'Please enter garden bed length, width (in feet), and mulch depth (in inches).',
    };
  }

  const length = parseFloat(lStr);
  const width = parseFloat(wStr);
  const depthInches = parseFloat(dStr);

  if (isNaN(length) || length <= 0 || isNaN(width) || width <= 0 || isNaN(depthInches) || depthInches <= 0) {
    return {
      lengthFeet: 0,
      widthFeet: 0,
      depthInches: 0,
      areaSqFt: 0,
      cubicFeet: 0,
      cubicYards: 0,
      bags2CuFt: 0,
      bags3CuFt: 0,
      calculationSteps: [],
      errorMessage: 'Length, width, and depth must all be positive numbers greater than zero.',
    };
  }

  const depthFeet = depthInches / 12;
  const areaSqFt = length * width;
  const cubicFeet = areaSqFt * depthFeet;
  const cubicYards = cubicFeet / 27;

  const safeCeil = (val: number): number => {
    if (val <= 1e-9) return 0;
    const rounded = Math.round(val);
    return Math.abs(val - rounded) < 1e-9 ? rounded : Math.ceil(val);
  };

  const bags2CuFt = safeCeil(cubicFeet / 2);
  const bags3CuFt = safeCeil(cubicFeet / 3);

  const fmt = (v: number, dec: number = 2) =>
    v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  return {
    lengthFeet: length,
    widthFeet: width,
    depthInches,
    areaSqFt,
    cubicFeet,
    cubicYards,
    bags2CuFt,
    bags3CuFt,
    calculationSteps: [
      `Calculate garden bed footprint: ${fmt(length, 1)} ft × ${fmt(width, 1)} ft = ${fmt(areaSqFt)} sq ft`,
      `Convert mulch depth to feet: ${depthInches}" ÷ 12 = ${fmt(depthFeet, 3)} ft`,
      `Calculate total volume in cubic feet: ${fmt(areaSqFt)} sq ft × ${fmt(depthFeet, 3)} ft = ${fmt(cubicFeet)} cu ft`,
      `Convert to bulk cubic yards: ${fmt(cubicFeet)} cu ft ÷ 27 = ${fmt(cubicYards)} cu yd`,
      `Standard retail bag estimate (2 cu ft bags): ceil(${fmt(cubicFeet)} ÷ 2) = ${bags2CuFt} bags`,
      `Commercial bag estimate (3 cu ft bags): ceil(${fmt(cubicFeet)} ÷ 3) = ${bags3CuFt} bags`,
    ],
  };
}
