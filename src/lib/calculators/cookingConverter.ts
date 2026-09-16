export type CookingVolumeUnit =
  | 'teaspoon'
  | 'tablespoon'
  | 'fluid_ounce'
  | 'cup'
  | 'pint'
  | 'quart'
  | 'gallon'
  | 'milliliter'
  | 'liter';

export interface CookingUnitInfo {
  id: CookingVolumeUnit;
  name: string;
  plural: string;
  symbol: string;
  mlPerUnit: number;
}

export const COOKING_UNITS: CookingUnitInfo[] = [
  { id: 'teaspoon', name: 'Teaspoon', plural: 'Teaspoons', symbol: 'tsp', mlPerUnit: 4.92892 },
  { id: 'tablespoon', name: 'Tablespoon', plural: 'Tablespoons', symbol: 'tbsp', mlPerUnit: 14.7868 },
  { id: 'fluid_ounce', name: 'Fluid Ounce', plural: 'Fluid Ounces', symbol: 'fl oz', mlPerUnit: 29.5735 },
  { id: 'cup', name: 'Cup', plural: 'Cups', symbol: 'cup', mlPerUnit: 236.588 },
  { id: 'pint', name: 'Pint', plural: 'Pints', symbol: 'pt', mlPerUnit: 473.176 },
  { id: 'quart', name: 'Quart', plural: 'Quarts', symbol: 'qt', mlPerUnit: 946.353 },
  { id: 'gallon', name: 'Gallon', plural: 'Gallons', symbol: 'gal', mlPerUnit: 3785.41 },
  { id: 'milliliter', name: 'Milliliter', plural: 'Milliliters', symbol: 'mL', mlPerUnit: 1.0 },
  { id: 'liter', name: 'Liter', plural: 'Liters', symbol: 'L', mlPerUnit: 1000.0 },
];

export interface CookingConverterInput {
  amount: string;
  fromUnit: CookingVolumeUnit;
  toUnit: CookingVolumeUnit;
}

export interface CookingConverterResult {
  amount: number;
  fromUnit: CookingUnitInfo;
  toUnit: CookingUnitInfo;
  convertedAmount: number;
  formattedResult: string;
  allConversions: { unit: CookingUnitInfo; value: number; formatted: string }[];
  calculationSteps: string[];
  errorMessage?: string;
}

export function calculateCookingConverter(input: CookingConverterInput): CookingConverterResult {
  const fromInfo = COOKING_UNITS.find((u) => u.id === input.fromUnit) || COOKING_UNITS[3]; // cup
  const toInfo = COOKING_UNITS.find((u) => u.id === input.toUnit) || COOKING_UNITS[1]; // tbsp

  const amtStr = (input.amount ?? '').trim();

  if (amtStr === '') {
    return {
      amount: 0,
      fromUnit: fromInfo,
      toUnit: toInfo,
      convertedAmount: 0,
      formattedResult: '—',
      allConversions: [],
      calculationSteps: [],
      errorMessage: 'Please enter an amount to convert.',
    };
  }

  const amount = parseFloat(amtStr);

  if (isNaN(amount) || amount < 0) {
    return {
      amount: 0,
      fromUnit: fromInfo,
      toUnit: toInfo,
      convertedAmount: 0,
      formattedResult: '—',
      allConversions: [],
      calculationSteps: [],
      errorMessage: 'Amount must be a non-negative number.',
    };
  }

  // Convert from source to standard milliliters, then to target
  const mlTotal = amount * fromInfo.mlPerUnit;
  const convertedAmount = mlTotal / toInfo.mlPerUnit;

  const formatNumber = (n: number) => {
    if (n === 0) return '0';
    if (Number.isInteger(n)) return n.toLocaleString();
    if (n < 0.01) return n.toFixed(4);
    const s = n < 1 ? n.toFixed(3) : n.toFixed(2);
    return s.includes('.') ? s.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '') : s;
  };

  const formattedResult = `${formatNumber(convertedAmount)} ${convertedAmount === 1 ? toInfo.symbol : toInfo.symbol}`;

  const allConversions = COOKING_UNITS.map((unit) => {
    const val = mlTotal / unit.mlPerUnit;
    return {
      unit,
      value: val,
      formatted: `${formatNumber(val)} ${unit.symbol}`,
    };
  });

  const steps = [
    `Convert ${amount} ${fromInfo.plural} to base milliliters: ${amount} × ${fromInfo.mlPerUnit.toFixed(2)} mL = ${mlTotal.toFixed(2)} mL`,
    `Convert milliliters to ${toInfo.plural}: ${mlTotal.toFixed(2)} mL ÷ ${toInfo.mlPerUnit.toFixed(2)} mL/${toInfo.symbol} = ${formatNumber(convertedAmount)} ${toInfo.symbol}`,
    `Important: This converts fluid volume. Dry weight conversions require ingredient density (e.g. flour vs. water).`,
  ];

  return {
    amount,
    fromUnit: fromInfo,
    toUnit: toInfo,
    convertedAmount,
    formattedResult,
    allConversions,
    calculationSteps: steps,
  };
}
