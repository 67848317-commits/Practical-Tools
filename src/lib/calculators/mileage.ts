export type MileageUnit = 'us' | 'metric';

export interface MileageInput {
  unit: MileageUnit;
  distance: string; // miles or kilometers
  fuelUsed: string; // gallons or liters
}

export interface MileageResult {
  unit: MileageUnit;
  distance: number;
  fuelUsed: number;
  mpg: number;
  lPer100km: number;
  primaryResultFormatted: string;
  secondaryResultFormatted: string;
  calculationSteps: string[];
  errorMessage?: string;
}

export function calculateMileage(input: MileageInput): MileageResult {
  const { unit } = input;
  const distStr = (input.distance ?? '').trim();
  const fuelStr = (input.fuelUsed ?? '').trim();

  if (distStr === '' || fuelStr === '') {
    return {
      unit,
      distance: 0,
      fuelUsed: 0,
      mpg: 0,
      lPer100km: 0,
      primaryResultFormatted: '—',
      secondaryResultFormatted: '',
      calculationSteps: [],
      errorMessage: `Please enter both distance traveled (${unit === 'us' ? 'miles' : 'km'}) and fuel used (${unit === 'us' ? 'gallons' : 'liters'}).`,
    };
  }

  const distance = parseFloat(distStr);
  const fuelUsed = parseFloat(fuelStr);

  if (isNaN(distance) || distance <= 0) {
    return {
      unit,
      distance: 0,
      fuelUsed: 0,
      mpg: 0,
      lPer100km: 0,
      primaryResultFormatted: '—',
      secondaryResultFormatted: '',
      calculationSteps: [],
      errorMessage: 'Distance traveled must be a positive number greater than zero.',
    };
  }

  if (isNaN(fuelUsed) || fuelUsed <= 0) {
    return {
      unit,
      distance,
      fuelUsed: 0,
      mpg: 0,
      lPer100km: 0,
      primaryResultFormatted: '—',
      secondaryResultFormatted: '',
      calculationSteps: [],
      errorMessage: 'Fuel used must be a positive number greater than zero.',
    };
  }

  let mpg = 0;
  let lPer100km = 0;
  let steps: string[] = [];

  const fmt = (v: number, dec: number = 2) =>
    v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  if (unit === 'us') {
    mpg = distance / fuelUsed;
    lPer100km = mpg > 0 ? 235.214583 / mpg : 0;
    steps = [
      `Calculate Miles Per Gallon: ${fmt(distance, 1)} miles ÷ ${fmt(fuelUsed, 2)} gallons = ${fmt(mpg, 2)} MPG`,
      `Convert to metric consumption: 235.215 ÷ ${fmt(mpg, 2)} MPG = ${fmt(lPer100km, 2)} L/100 km`,
    ];
  } else {
    lPer100km = (fuelUsed / distance) * 100;
    mpg = lPer100km > 0 ? 235.214583 / lPer100km : 0;
    steps = [
      `Calculate Liters per 100 km: (${fmt(fuelUsed, 2)} L ÷ ${fmt(distance, 1)} km) × 100 = ${fmt(lPer100km, 2)} L/100 km`,
      `Convert to US efficiency: 235.215 ÷ ${fmt(lPer100km, 2)} L/100km = ${fmt(mpg, 2)} MPG`,
    ];
  }

  return {
    unit,
    distance,
    fuelUsed,
    mpg,
    lPer100km,
    primaryResultFormatted: unit === 'us' ? `${fmt(mpg, 2)} MPG` : `${fmt(lPer100km, 2)} L/100 km`,
    secondaryResultFormatted: unit === 'us' ? `Equivalent to ${fmt(lPer100km, 2)} L/100 km` : `Equivalent to ${fmt(mpg, 2)} MPG`,
    calculationSteps: steps,
  };
}
