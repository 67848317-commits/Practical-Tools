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
  dailyKwh: number;
  totalKwh: number;
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

  if (wStr === '' || hStr === '' || pStr === '') {
    return {
      wattage: 0,
      hoursPerDay: 0,
      pricePerKwh: 0,
      daysUsed: 0,
      dailyKwh: 0,
      totalKwh: 0,
      dailyCost: 0,
      totalCost: 0,
      monthlyCost30Days: 0,
      annualCost365Days: 0,
      calculationSteps: [],
      errorMessage: 'Please enter appliance wattage, hours used per day, and electricity cost per kWh.',
    };
  }

  const wattage = parseFloat(wStr);
  const hoursPerDay = parseFloat(hStr);
  const pricePerKwh = parseFloat(pStr);
  const daysUsed = dStr === '' ? 30 : parseFloat(dStr);

  if (isNaN(wattage) || wattage <= 0) {
    return {
      wattage: 0,
      hoursPerDay: 0,
      pricePerKwh: 0,
      daysUsed: 0,
      dailyKwh: 0,
      totalKwh: 0,
      dailyCost: 0,
      totalCost: 0,
      monthlyCost30Days: 0,
      annualCost365Days: 0,
      calculationSteps: [],
      errorMessage: 'Appliance wattage must be a positive number greater than zero (e.g. 1500W for a space heater).',
    };
  }

  if (isNaN(hoursPerDay) || hoursPerDay <= 0 || hoursPerDay > 24) {
    return {
      wattage,
      hoursPerDay: 0,
      pricePerKwh: 0,
      daysUsed: 0,
      dailyKwh: 0,
      totalKwh: 0,
      dailyCost: 0,
      totalCost: 0,
      monthlyCost30Days: 0,
      annualCost365Days: 0,
      calculationSteps: [],
      errorMessage: 'Hours used per day must be between 0.1 and 24 hours.',
    };
  }

  if (isNaN(pricePerKwh) || pricePerKwh < 0) {
    return {
      wattage,
      hoursPerDay,
      pricePerKwh: 0,
      daysUsed: 0,
      dailyKwh: 0,
      totalKwh: 0,
      dailyCost: 0,
      totalCost: 0,
      monthlyCost30Days: 0,
      annualCost365Days: 0,
      calculationSteps: [],
      errorMessage: 'Electricity rate per kWh must be a non-negative number (US average is ~$0.16/kWh).',
    };
  }

  if (isNaN(daysUsed) || daysUsed <= 0 || daysUsed > 365) {
    return {
      wattage,
      hoursPerDay,
      pricePerKwh,
      daysUsed: 0,
      dailyKwh: 0,
      totalKwh: 0,
      dailyCost: 0,
      totalCost: 0,
      monthlyCost30Days: 0,
      annualCost365Days: 0,
      calculationSteps: [],
      errorMessage: 'Days used must be between 1 and 365 days.',
    };
  }

  const dailyKwh = (wattage / 1000) * hoursPerDay;
  const totalKwh = dailyKwh * daysUsed;
  const dailyCost = dailyKwh * pricePerKwh;
  const totalCost = totalKwh * pricePerKwh;
  const monthlyCost30Days = dailyCost * 30;
  const annualCost365Days = dailyCost * 365;

  const fmt = (v: number) => v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return {
    wattage,
    hoursPerDay,
    pricePerKwh,
    daysUsed,
    dailyKwh,
    totalKwh,
    dailyCost,
    totalCost,
    monthlyCost30Days,
    annualCost365Days,
    calculationSteps: [
      `Convert Watts to kW and multiply by hours: (${wattage} W ÷ 1000) × ${hoursPerDay} hrs = ${dailyKwh.toFixed(3)} kWh/day`,
      `Total electricity consumption over ${daysUsed} days: ${dailyKwh.toFixed(3)} kWh × ${daysUsed} days = ${totalKwh.toFixed(2)} kWh`,
      `Daily operating expense: ${dailyKwh.toFixed(3)} kWh × $${pricePerKwh.toFixed(3)}/kWh = $${fmt(dailyCost)}/day`,
      `Estimated cost for ${daysUsed} days: ${totalKwh.toFixed(2)} kWh × $${pricePerKwh.toFixed(3)}/kWh = $${fmt(totalCost)}`,
      `Standard 30-day projection: $${fmt(monthlyCost30Days)} | 365-day annual projection: $${fmt(annualCost365Days)}`,
    ],
  };
}
