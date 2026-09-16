export interface IngredientDensity {
  id: string;
  name: string;
  gramsPerCup: number;
  description: string;
  measuringTip: string;
}

export const INGREDIENT_DENSITIES: IngredientDensity[] = [
  {
    id: 'all_purpose_flour',
    name: 'All-Purpose Flour',
    gramsPerCup: 125,
    description: 'Standard wheat all-purpose flour (spooned and leveled).',
    measuringTip: 'Fluff with a fork, spoon into the measuring cup, and sweep level with a straight edge. Scooping directly can pack in up to 150g.',
  },
  {
    id: 'granulated_sugar',
    name: 'Granulated Sugar',
    gramsPerCup: 200,
    description: 'Standard white refined table sugar.',
    measuringTip: 'Pours evenly and packs minimally. Consistent across brands.',
  },
  {
    id: 'brown_sugar',
    name: 'Brown Sugar (Packed)',
    gramsPerCup: 220,
    description: 'Light or dark brown sugar packed firmly into cup.',
    measuringTip: 'Standard recipes assume firmly packed brown sugar (should hold cup shape when dumped). Unpacked is ~170g.',
  },
  {
    id: 'butter',
    name: 'Butter',
    gramsPerCup: 227,
    description: 'Standard salted or unsalted solid dairy butter (2 sticks = 1 cup).',
    measuringTip: '1 stick of butter = 1/2 cup = 113.5g = 8 tablespoons. 2 sticks = 1 cup = 227g.',
  },
  {
    id: 'rolled_oats',
    name: 'Rolled Oats (Old Fashioned)',
    gramsPerCup: 90,
    description: 'Traditional whole rolled rolled oats.',
    measuringTip: 'Quick oats or instant oats pack slightly tighter (~95-100g/cup).',
  },
  {
    id: 'powdered_sugar',
    name: 'Powdered Sugar (Confectioners)',
    gramsPerCup: 120,
    description: 'Unsifted confectioners / 10x powdered sugar.',
    measuringTip: 'If recipe calls for "1 cup sifted powdered sugar", measure after sifting (~100g). If "1 cup powdered sugar, sifted", measure before sifting (120g).',
  },
  {
    id: 'water',
    name: 'Water',
    gramsPerCup: 240,
    description: 'Pure liquid water at room temperature (standard metric cup is 250g; US legal cup is 240g).',
    measuringTip: 'Water density is 1.00 g/mL (240 mL ≈ 240g).',
  },
  {
    id: 'milk',
    name: 'Milk (Whole)',
    gramsPerCup: 245,
    description: 'Whole cow milk (approx. 3.25% butterfat).',
    measuringTip: 'Skim milk is ~242g/cup; heavy cream is ~238g/cup.',
  },
];

export interface CupsToGramsInput {
  ingredientId: string;
  cups: string;
}

export interface CupsToGramsResult {
  ingredient: IngredientDensity;
  cups: number;
  grams: number;
  ounces: number;
  formattedGrams: string;
  formattedOunces: string;
  calculationSteps: string[];
  errorMessage?: string;
}

export function parseCupsQuantity(str: string): number {
  const trimmed = str.trim();
  if (!trimmed) return NaN;

  // Mixed number like "1 1/2" or "1-1/2"
  const mixedMatch =
    trimmed.match(/^(\d+)\s+([0-9]+)\s*\/\s*([0-9]+)$/) ||
    trimmed.match(/^(\d+)-([0-9]+)\s*\/\s*([0-9]+)$/);
  if (mixedMatch) {
    const whole = parseFloat(mixedMatch[1]);
    const num = parseFloat(mixedMatch[2]);
    const den = parseFloat(mixedMatch[3]);
    if (den === 0) return NaN;
    return whole + num / den;
  }

  // Simple fraction like "1/2" or "3/4"
  const fracMatch = trimmed.match(/^([0-9]+)\s*\/\s*([0-9]+)$/);
  if (fracMatch) {
    const num = parseFloat(fracMatch[1]);
    const den = parseFloat(fracMatch[2]);
    if (den === 0) return NaN;
    return num / den;
  }

  return parseFloat(trimmed);
}

export function calculateCupsToGrams(input: CupsToGramsInput): CupsToGramsResult {
  const ingredient = INGREDIENT_DENSITIES.find((ing) => ing.id === input.ingredientId) || INGREDIENT_DENSITIES[0];
  const cupsStr = (input.cups ?? '').trim();

  if (cupsStr === '') {
    return {
      ingredient,
      cups: 0,
      grams: 0,
      ounces: 0,
      formattedGrams: '—',
      formattedOunces: '—',
      calculationSteps: [],
      errorMessage: 'Please enter a number of cups.',
    };
  }

  const cups = parseCupsQuantity(cupsStr);

  if (isNaN(cups) || cups < 0) {
    return {
      ingredient,
      cups: 0,
      grams: 0,
      ounces: 0,
      formattedGrams: '—',
      formattedOunces: '—',
      calculationSteps: [],
      errorMessage: 'Cups must be a non-negative number (fractions like 1/2 or 1 1/2 supported).',
    };
  }

  const grams = cups * ingredient.gramsPerCup;
  const ounces = grams / 28.3495;

  const formattedGrams = Number.isInteger(grams) ? grams.toLocaleString() : grams.toFixed(1);
  const formattedOunces = ounces.toFixed(2);

  const steps = [
    `Reference density for ${ingredient.name}: ~${ingredient.gramsPerCup} grams per US cup`,
    `Multiply cups by density: ${cups} cups × ${ingredient.gramsPerCup} g/cup = ${formattedGrams} grams`,
    `Ounces equivalent: ${formattedGrams} g ÷ 28.35 g/oz = ${formattedOunces} oz`,
    `Density notice: Real weight varies with packing technique (${ingredient.measuringTip})`,
  ];

  return {
    ingredient,
    cups,
    grams,
    ounces,
    formattedGrams,
    formattedOunces,
    calculationSteps: steps,
  };
}
