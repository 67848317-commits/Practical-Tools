export type FuelUnitSystem = 'us' | 'metric';

export interface FuelInput {
  unitSystem: FuelUnitSystem;
  distance: string;
  efficiency: string;
  fuelPrice: string;
  passengers: string;
  isRoundTrip: boolean;
}

export interface FuelResult {
  unitSystem: FuelUnitSystem;
  effectiveDistance: number;
  estimatedFuelUsed: number;
  estimatedTripCost: number;
  costPerPerson: number;
  distanceUnit: string;
  efficiencyUnit: string;
  priceUnit: string;
  volumeUnit: string;
  calculationSteps: string[];
  errorMessage?: string;
}

export function calculateFuel(input: FuelInput): FuelResult {
  const { unitSystem, isRoundTrip } = input;
  const distanceUnit = unitSystem === 'us' ? 'miles' : 'km';
  const volumeUnit = unitSystem === 'us' ? 'Gallons' : 'Liters';
  const efficiencyUnit = unitSystem === 'us' ? 'MPG' : 'L/100 km';
  const priceUnit = unitSystem === 'us' ? '$/gal' : '$/L';

  const distStr = (input.distance ?? '').trim();
  const effStr = (input.efficiency ?? '').trim();
  const priceStr = (input.fuelPrice ?? '').trim();
  const passStr = (input.passengers ?? '').trim();

  if (distStr === '') {
    return {
      unitSystem,
      effectiveDistance: 0,
      estimatedFuelUsed: 0,
      estimatedTripCost: 0,
      costPerPerson: 0,
      distanceUnit,
      efficiencyUnit,
      priceUnit,
      volumeUnit,
      calculationSteps: [],
      errorMessage: `Please enter a valid trip distance (${distanceUnit}).`,
    };
  }

  const isStrictNumber = (s: string) => /^(?:\d+(?:\.\d+)?|\.\d+)$/.test(s);
  const dist = isStrictNumber(distStr) ? Number(distStr) : NaN;
  const eff = isStrictNumber(effStr) ? Number(effStr) : NaN;
  const price = isStrictNumber(priceStr) ? Number(priceStr) : NaN;
  const numPassengers = passStr === '' ? 1 : (/^\d+$/.test(passStr) ? Number(passStr) : NaN);

  if (isNaN(dist) || dist <= 0) {
    return {
      unitSystem,
      effectiveDistance: 0,
      estimatedFuelUsed: 0,
      estimatedTripCost: 0,
      costPerPerson: 0,
      distanceUnit,
      efficiencyUnit,
      priceUnit,
      volumeUnit,
      calculationSteps: [],
      errorMessage: `Please enter a valid trip distance greater than zero (${distanceUnit}).`,
    };
  }

  if (isNaN(eff) || eff <= 0) {
    return {
      unitSystem,
      effectiveDistance: dist * (isRoundTrip ? 2 : 1),
      estimatedFuelUsed: 0,
      estimatedTripCost: 0,
      costPerPerson: 0,
      distanceUnit,
      efficiencyUnit,
      priceUnit,
      volumeUnit,
      calculationSteps: [],
      errorMessage: unitSystem === 'us'
        ? 'Vehicle fuel economy must be greater than zero (MPG).'
        : 'Vehicle fuel consumption must be greater than zero (L/100 km).',
    };
  }

  if (isNaN(price) || price < 0) {
    return {
      unitSystem,
      effectiveDistance: dist * (isRoundTrip ? 2 : 1),
      estimatedFuelUsed: 0,
      estimatedTripCost: 0,
      costPerPerson: 0,
      distanceUnit,
      efficiencyUnit,
      priceUnit,
      volumeUnit,
      calculationSteps: [],
      errorMessage: `Please enter a valid fuel price (${priceUnit}).`,
    };
  }

  if (isNaN(numPassengers) || numPassengers < 1) {
    return {
      unitSystem,
      effectiveDistance: dist * (isRoundTrip ? 2 : 1),
      estimatedFuelUsed: 0,
      estimatedTripCost: 0,
      costPerPerson: 0,
      distanceUnit,
      efficiencyUnit,
      priceUnit,
      volumeUnit,
      calculationSteps: [],
      errorMessage: 'Passenger count must be at least 1.',
    };
  }

  const effectiveDistance = isRoundTrip ? dist * 2 : dist;
  let estimatedFuelUsed = 0;

  if (unitSystem === 'us') {
    estimatedFuelUsed = effectiveDistance / eff;
  } else {
    estimatedFuelUsed = (effectiveDistance * eff) / 100;
  }

  const estimatedTripCost = estimatedFuelUsed * price;
  const costPerPerson = estimatedTripCost / numPassengers;

  const fmtCurrency = (v: number) => v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtNum = (v: number, dec: number = 2) => v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  const steps = unitSystem === 'us'
    ? [
        `Total distance driven = ${fmtNum(effectiveDistance, 0)} ${distanceUnit}${isRoundTrip ? ' (round-trip)' : ''}`,
        `Estimated fuel used = ${fmtNum(effectiveDistance, 0)} miles ÷ ${eff} MPG = ${fmtNum(estimatedFuelUsed, 2)} Gallons`,
        `Estimated trip cost = ${fmtNum(estimatedFuelUsed, 2)} Gallons × $${fmtCurrency(price)}/gal = $${fmtCurrency(estimatedTripCost)}`,
        ...(numPassengers > 1
          ? [`Split cost per person = $${fmtCurrency(estimatedTripCost)} ÷ ${numPassengers} travelers = $${fmtCurrency(costPerPerson)}/person`]
          : []),
      ]
    : [
        `Total distance driven = ${fmtNum(effectiveDistance, 0)} ${distanceUnit}${isRoundTrip ? ' (round-trip)' : ''}`,
        `Estimated fuel used = (${fmtNum(effectiveDistance, 0)} km × ${eff} L/100km) ÷ 100 = ${fmtNum(estimatedFuelUsed, 2)} Liters`,
        `Estimated trip cost = ${fmtNum(estimatedFuelUsed, 2)} Liters × $${fmtCurrency(price)}/L = $${fmtCurrency(estimatedTripCost)}`,
        ...(numPassengers > 1
          ? [`Split cost per person = $${fmtCurrency(estimatedTripCost)} ÷ ${numPassengers} travelers = $${fmtCurrency(costPerPerson)}/person`]
          : []),
      ];

  return {
    unitSystem,
    effectiveDistance,
    estimatedFuelUsed,
    estimatedTripCost,
    costPerPerson,
    distanceUnit,
    efficiencyUnit,
    priceUnit,
    volumeUnit,
    calculationSteps: steps,
  };
}
