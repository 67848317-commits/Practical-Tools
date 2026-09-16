export interface CommuteInput {
  oneWayDistance: string;
  daysPerWeek: string;
  efficiencyMpg: string;
  fuelPrice: string;
}

export interface CommuteResult {
  oneWayDistance: number;
  roundTripDistance: number;
  daysPerWeek: number;
  dailyFuelUsed: number;
  dailyCost: number;
  weeklyCost: number;
  monthlyCost: number;
  annualCost: number;
  annualDistance: number;
  calculationSteps: string[];
  errorMessage?: string;
}

export function calculateCommute(input: CommuteInput): CommuteResult {
  const distStr = (input.oneWayDistance ?? '').trim();
  const daysStr = (input.daysPerWeek ?? '').trim();
  const effStr = (input.efficiencyMpg ?? '').trim();
  const priceStr = (input.fuelPrice ?? '').trim();

  if (distStr === '' || daysStr === '' || effStr === '' || priceStr === '') {
    return {
      oneWayDistance: 0,
      roundTripDistance: 0,
      daysPerWeek: 0,
      dailyFuelUsed: 0,
      dailyCost: 0,
      weeklyCost: 0,
      monthlyCost: 0,
      annualCost: 0,
      annualDistance: 0,
      calculationSteps: [],
      errorMessage: 'Please enter one-way distance, commute days, vehicle MPG, and fuel price.',
    };
  }

  const oneWayDistance = parseFloat(distStr);
  const daysPerWeek = parseFloat(daysStr);
  const efficiencyMpg = parseFloat(effStr);
  const fuelPrice = parseFloat(priceStr);

  if (isNaN(oneWayDistance) || oneWayDistance <= 0) {
    return {
      oneWayDistance: 0,
      roundTripDistance: 0,
      daysPerWeek: 0,
      dailyFuelUsed: 0,
      dailyCost: 0,
      weeklyCost: 0,
      monthlyCost: 0,
      annualCost: 0,
      annualDistance: 0,
      calculationSteps: [],
      errorMessage: 'One-way commute distance must be a positive number greater than zero.',
    };
  }

  if (isNaN(daysPerWeek) || daysPerWeek <= 0 || daysPerWeek > 7) {
    return {
      oneWayDistance,
      roundTripDistance: oneWayDistance * 2,
      daysPerWeek: 0,
      dailyFuelUsed: 0,
      dailyCost: 0,
      weeklyCost: 0,
      monthlyCost: 0,
      annualCost: 0,
      annualDistance: 0,
      calculationSteps: [],
      errorMessage: 'Commute days per week must be between 1 and 7 days.',
    };
  }

  if (isNaN(efficiencyMpg) || efficiencyMpg <= 0) {
    return {
      oneWayDistance,
      roundTripDistance: oneWayDistance * 2,
      daysPerWeek,
      dailyFuelUsed: 0,
      dailyCost: 0,
      weeklyCost: 0,
      monthlyCost: 0,
      annualCost: 0,
      annualDistance: 0,
      calculationSteps: [],
      errorMessage: 'Vehicle fuel economy must be greater than zero (MPG).',
    };
  }

  if (isNaN(fuelPrice) || fuelPrice < 0) {
    return {
      oneWayDistance,
      roundTripDistance: oneWayDistance * 2,
      daysPerWeek,
      dailyFuelUsed: 0,
      dailyCost: 0,
      weeklyCost: 0,
      monthlyCost: 0,
      annualCost: 0,
      annualDistance: 0,
      calculationSteps: [],
      errorMessage: 'Fuel price must be a valid positive dollar amount.',
    };
  }

  const roundTripDistance = oneWayDistance * 2;
  const dailyFuelUsed = roundTripDistance / efficiencyMpg;
  const dailyCost = dailyFuelUsed * fuelPrice;
  const weeklyCost = dailyCost * daysPerWeek;
  // 52 weeks per year / 12 months = 4.3333 weeks per month
  const annualCost = weeklyCost * 52;
  const monthlyCost = annualCost / 12;
  const annualDistance = roundTripDistance * daysPerWeek * 52;

  const fmt = (v: number) => v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return {
    oneWayDistance,
    roundTripDistance,
    daysPerWeek,
    dailyFuelUsed,
    dailyCost,
    weeklyCost,
    monthlyCost,
    annualCost,
    annualDistance,
    calculationSteps: [
      `Daily round-trip distance: ${oneWayDistance} miles × 2 = ${roundTripDistance} miles/day`,
      `Daily fuel consumed: ${roundTripDistance} miles ÷ ${efficiencyMpg} MPG = ${dailyFuelUsed.toFixed(2)} gallons/day`,
      `Daily fuel expense: ${dailyFuelUsed.toFixed(2)} gal × $${fmt(fuelPrice)}/gal = $${fmt(dailyCost)}/day`,
      `Weekly commute cost: $${fmt(dailyCost)}/day × ${daysPerWeek} days = $${fmt(weeklyCost)}/week`,
      `Estimated monthly cost: ($${fmt(weeklyCost)} × 52 weeks) ÷ 12 months = $${fmt(monthlyCost)}/month`,
      `Estimated annual cost: $${fmt(weeklyCost)} × 52 work weeks = $${fmt(annualCost)}/year (${annualDistance.toLocaleString()} miles total)`,
    ],
  };
}
