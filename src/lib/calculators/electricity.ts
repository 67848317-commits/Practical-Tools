export interface ElectricityPreset {
  id: string;
  ratePerKwh: number;
  rateString: string;
  centsPerKwh: number;
  label: string;
  region: string;
  note: string;
}

/**
 * Official U.S. EIA Electric Power Annual, Table 2.10 (2024 residential electricity prices by state).
 * Reference: https://www.eia.gov/electricity/annual/table.php?t=epa_02_10.html
 */
export const EIA_2024_RESIDENTIAL_BENCHMARKS: ElectricityPreset[] = [
  {
    id: 'us-total',
    ratePerKwh: 0.165,
    rateString: '0.165',
    centsPerKwh: 16.48,
    label: 'U.S. Total ($0.165)',
    region: 'U.S. Total',
    note: '2024 Annual Avg (16.48¢)',
  },
  {
    id: 'wa',
    ratePerKwh: 0.119,
    rateString: '0.119',
    centsPerKwh: 11.90,
    label: 'WA ($0.119)',
    region: 'Washington',
    note: '2024 Annual Avg (11.90¢)',
  },
  {
    id: 'tx',
    ratePerKwh: 0.149,
    rateString: '0.149',
    centsPerKwh: 14.94,
    label: 'TX ($0.149)',
    region: 'Texas',
    note: '2024 Annual Avg (14.94¢)',
  },
  {
    id: 'ca',
    ratePerKwh: 0.320,
    rateString: '0.320',
    centsPerKwh: 31.97,
    label: 'CA ($0.320)',
    region: 'California',
    note: '2024 Annual Avg (31.97¢)',
  },
  {
    id: 'hi',
    ratePerKwh: 0.429,
    rateString: '0.429',
    centsPerKwh: 42.86,
    label: 'HI ($0.429)',
    region: 'Hawaii',
    note: '2024 Annual Avg (42.86¢)',
  },
];

export interface ElectricityInput {
  wattage: string;
  hoursPerDay: string;
  pricePerKwh: string;
  daysUsed: string;
}

export interface ElectricityResult {
  wattage: number;
  hoursPerDay: number;
  pricePerKwh: number;
  daysUsed: number;
  hourlyKwh: number;
  dailyKwh: number;
  totalKwh: number;
  hourlyCost: number;
  dailyCost: number;
  totalCost: number;
  monthlyCost30Days: number;
  annualCost365Days: number;
  calculationSteps: string[];
  errorMessage?: string;
}

export function calculateElectricity(input: ElectricityInput): ElectricityResult {
  const wStr = (input.wattage ?? '').trim();
  const hStr = (input.hoursPerDay ?? '').trim();
  const pStr = (input.pricePerKwh ?? '').trim();
  const dStr = (input.daysUsed ?? '').trim();

  const emptyResult: ElectricityResult = {
    wattage: 0,
    hoursPerDay: 0,
    pricePerKwh: 0,
    daysUsed: 0,
    hourlyKwh: 0,
    dailyKwh: 0,
    totalKwh: 0,
    hourlyCost: 0,
    dailyCost: 0,
    totalCost: 0,
    monthlyCost30Days: 0,
    annualCost365Days: 0,
    calculationSteps: [],
  };

  if (wStr === '' || hStr === '' || pStr === '') {
    return {
      ...emptyResult,
      errorMessage: 'Please enter appliance wattage, hours used per day, and electricity cost per kWh.',
    };
  }

  const wattage = parseFloat(wStr);
  const hoursPerDay = parseFloat(hStr);
  const pricePerKwh = parseFloat(pStr);
  const daysUsed = dStr === '' ? 30 : parseFloat(dStr);

  if (isNaN(wattage) || wattage <= 0) {
    return {
      ...emptyResult,
      errorMessage: 'Appliance wattage must be a positive number greater than zero (e.g. 1500W for a space heater).',
    };
  }

  if (isNaN(hoursPerDay) || hoursPerDay <= 0 || hoursPerDay > 24) {
    return {
      ...emptyResult,
      wattage,
      errorMessage: 'Hours used per day must be between 0.1 and 24 hours.',
    };
  }

  if (isNaN(pricePerKwh) || pricePerKwh < 0) {
    return {
      ...emptyResult,
      wattage,
      hoursPerDay,
      errorMessage: 'Electricity rate per kWh must be a non-negative number (US 2024 annual average was 16.48¢/kWh or ~$0.165/kWh, EIA Table 2.10).',
    };
  }

  if (isNaN(daysUsed) || daysUsed <= 0 || daysUsed > 365) {
    return {
      ...emptyResult,
      wattage,
      hoursPerDay,
      pricePerKwh,
      errorMessage: 'Days used must be between 1 and 365 days.',
    };
  }

  const hourlyKwh = wattage / 1000;
  const dailyKwh = hourlyKwh * hoursPerDay;
  const totalKwh = dailyKwh * daysUsed;
  const hourlyCost = hourlyKwh * pricePerKwh;
  const dailyCost = dailyKwh * pricePerKwh;
  const totalCost = totalKwh * pricePerKwh;
  const monthlyCost30Days = dailyCost * 30;
  const annualCost365Days = dailyCost * 365;

  const fmt = (v: number, dec: number = 2) =>
    v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  return {
    wattage,
    hoursPerDay,
    pricePerKwh,
    daysUsed,
    hourlyKwh,
    dailyKwh,
    totalKwh,
    hourlyCost,
    dailyCost,
    totalCost,
    monthlyCost30Days,
    annualCost365Days,
    calculationSteps: [
      `Convert Watts to kW: ${wattage} W ÷ 1000 = ${hourlyKwh.toFixed(3)} kW (${hourlyKwh.toFixed(3)} kWh per hour of operation)`,
      `Hourly running cost: ${hourlyKwh.toFixed(3)} kW × $${pricePerKwh.toFixed(3)}/kWh = $${fmt(hourlyCost, 3)}/hr`,
      `Daily consumption: ${hourlyKwh.toFixed(3)} kW × ${hoursPerDay} hrs/day = ${dailyKwh.toFixed(3)} kWh/day ($${fmt(dailyCost)}/day)`,
      `Total electricity consumption over ${daysUsed} days: ${dailyKwh.toFixed(3)} kWh × ${daysUsed} days = ${totalKwh.toFixed(2)} kWh`,
      `Estimated cost for ${daysUsed} days: ${totalKwh.toFixed(2)} kWh × $${pricePerKwh.toFixed(3)}/kWh = $${fmt(totalCost)}`,
      `Standard 30-day billing cycle projection: $${fmt(monthlyCost30Days)} | 365-day annual projection: $${fmt(annualCost365Days)}`,
    ],
  };
}
