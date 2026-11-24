export interface IngredientDensity {
  id: string;
  name: string;
  gramsPerCup: number;
  description: string;
  measuringTip: string;
  sourceAttribution: string;
}

export const INGREDIENT_DENSITIES: IngredientDensity[] = [
  {
    id: 'all_purpose_flour',
    name: 'All-Purpose Flour',
    gramsPerCup: 120,
    description: 'Standard wheat all-purpose flour (spooned and leveled).',
    measuringTip: 'Fluff with a fork, spoon into the measuring cup, and sweep level with a straight knife edge. Scooping directly from the sack packs up to 145–150g, causing dense, dry baked goods.',
    sourceAttribution: 'King Arthur Baking Weight Chart (120g spooned & leveled; USDA FDC ID 168893 uses 125g)',
  },
  {
    id: 'bread_flour',
    name: 'Bread Flour',
    gramsPerCup: 125,
    description: 'High-protein wheat flour for yeast breads and pizza dough.',
    measuringTip: 'Slightly denser culinary planning value than all-purpose; spoon and level for accuracy. (Note: King Arthur lists 120g/cup.)',
    sourceAttribution: 'Culinary Planning Reference (125g/cup; King Arthur Weight Chart lists 120g/cup)',
  },
  {
    id: 'granulated_sugar',
    name: 'Granulated Sugar',
    gramsPerCup: 200,
    description: 'Standard white refined cane or beet table sugar.',
    measuringTip: 'Free-flowing crystalline structure pours evenly with negligible packing variation across brands.',
    sourceAttribution: 'USDA FoodData Central (FDC ID 169655: 200g/cup; King Arthur lists 198g)',
  },
  {
    id: 'brown_sugar',
    name: 'Brown Sugar (Packed)',
    gramsPerCup: 220,
    description: 'Light or dark brown sugar packed firmly into cup.',
    measuringTip: 'Standard American recipes assume firmly packed brown sugar (it should hold the shape of the cup when inverted). Unpacked is ~170g.',
    sourceAttribution: 'Culinary Planning Reference (220g packed; King Arthur Weight Chart lists 213g)',
  },
  {
    id: 'powdered_sugar',
    name: 'Powdered Sugar (Confectioners)',
    gramsPerCup: 120,
    description: 'Unsifted 10X confectioners sugar with cornstarch.',
    measuringTip: 'If a recipe states "1 cup sifted powdered sugar", measure after sifting (~100g). If "1 cup powdered sugar, sifted", measure before sifting (120g).',
    sourceAttribution: 'Culinary Planning Reference (120g; King Arthur Weight Chart lists 113g unsifted)',
  },
  {
    id: 'cocoa_powder',
    name: 'Cocoa Powder (Unsweetened)',
    gramsPerCup: 85,
    description: 'Dutch-process or natural unsweetened cocoa powder.',
    measuringTip: 'Very light and prone to clumping; sift or spoon gently into measuring cup without packing.',
    sourceAttribution: 'Culinary Planning Reference (85g; King Arthur lists 84g, USDA FDC lists 86g)',
  },
  {
    id: 'butter',
    name: 'Butter',
    gramsPerCup: 227,
    description: 'Standard solid dairy butter (2 sticks = 1 cup = 8 oz).',
    measuringTip: '1 stick of butter = 1/2 cup = 113.5g = 8 tablespoons. 2 sticks = 1 cup = 227g.',
    sourceAttribution: 'King Arthur Baking Weight Chart & USDA FoodData Central (227g = 2 US sticks = 8 oz)',
  },
  {
    id: 'rolled_oats',
    name: 'Rolled Oats (Old Fashioned)',
    gramsPerCup: 90,
    description: 'Traditional whole rolled oats.',
    measuringTip: 'Quick oats or instant oats pack tighter (~95-100g/cup). Steel-cut oats weigh ~160g/cup.',
    sourceAttribution: 'Culinary Planning Reference (90g; King Arthur Weight Chart lists 89g)',
  },
  {
    id: 'water',
    name: 'Water',
    gramsPerCup: 240,
    description: 'Pure liquid water at room temperature (FDA US legal cup = 240 mL = 240g).',
    measuringTip: 'Water density is 1.00 g/mL (1 fluid ounce = 29.57 mL ≈ 29.6g). A traditional US customary cup is 236.6 mL; a metric cup is 250 mL.',
    sourceAttribution: 'U.S. FDA Legal Cup (21 CFR 101.9: 240 mL; US customary cup = 236.6 mL)',
  },
  {
    id: 'milk',
    name: 'Milk (Whole 3.25%)',
    gramsPerCup: 245,
    description: 'Whole cow milk (approx. 3.25% butterfat).',
    measuringTip: 'Whole milk is slightly denser than water (~1.03 g/mL). Skim milk is ~242g/cup; heavy cream is ~238g/cup.',
    sourceAttribution: 'Culinary Planning Reference (~245g/cup; USDA FoodData Central lists 244g)',
  },
];

export type ConversionMode = 'cups_to_grams' | 'grams_to_cups';

export interface CupsToGramsInput {
  ingredientId: string;
  cups?: string;
  gramsInput?: string;
  mode?: ConversionMode;
}

export interface CupsToGramsResult {
  ingredient: IngredientDensity;
  mode: ConversionMode;
  cups: number;
  grams: number;
  ounces: number;
  formattedGrams: string;
  formattedOunces: string;
  formattedCups: string;
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

  if (!/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(trimmed)) return NaN;
  return Number(trimmed);
}

export function calculateCupsToGrams(input: CupsToGramsInput): CupsToGramsResult {
  const mode: ConversionMode = input.mode ?? 'cups_to_grams';
  const ingredient =
    INGREDIENT_DENSITIES.find((ing) => ing.id === input.ingredientId) || INGREDIENT_DENSITIES[0];

  const emptyResult: CupsToGramsResult = {
    ingredient,
    mode,
    cups: 0,
    grams: 0,
    ounces: 0,
    formattedGrams: '—',
    formattedOunces: '—',
    formattedCups: '—',
    calculationSteps: [],
  };

  if (mode === 'cups_to_grams') {
    const cupsStr = (input.cups ?? '').trim();
    if (cupsStr === '') {
      return {
        ...emptyResult,
        errorMessage: 'Please enter a number of cups.',
      };
    }

    const cups = parseCupsQuantity(cupsStr);
    if (isNaN(cups) || cups < 0) {
      return {
        ...emptyResult,
        errorMessage: 'Cups must be a non-negative number (fractions like 1/2 or 1 1/2 supported).',
      };
    }

    const grams = cups * ingredient.gramsPerCup;
    const ounces = grams / 28.3495;
    const formattedGrams = Number.isInteger(grams) ? grams.toLocaleString() : grams.toFixed(1);
    const formattedOunces = ounces.toFixed(2);
    const formattedCups = cups.toString();

    const steps = [
      `Reference density for ${ingredient.name}: ~${ingredient.gramsPerCup} grams per US cup (${ingredient.sourceAttribution})`,
      `Multiply cups by density: ${cups} cups × ${ingredient.gramsPerCup} g/cup = ${formattedGrams} grams`,
      `Ounces equivalent (dry weight): ${formattedGrams} g ÷ 28.35 g/oz = ${formattedOunces} oz`,
      `Technique note: ${ingredient.measuringTip}`,
    ];

    return {
      ingredient,
      mode,
      cups,
      grams,
      ounces,
      formattedGrams,
      formattedOunces,
      formattedCups,
      calculationSteps: steps,
    };
  } else {
    // Grams to Cups
    const gramsStr = (input.gramsInput ?? '').trim();
    if (gramsStr === '') {
      return {
        ...emptyResult,
        errorMessage: 'Please enter weight in grams.',
      };
    }

    const grams = /^(?:\d+(?:\.\d+)?|\.\d+)$/.test(gramsStr) ? Number(gramsStr) : NaN;
    if (isNaN(grams) || grams < 0) {
      return {
        ...emptyResult,
        errorMessage: 'Grams must be a non-negative number.',
      };
    }

    const cups = grams / ingredient.gramsPerCup;
    const ounces = grams / 28.3495;
    const formattedGrams = grams.toLocaleString();
    const formattedOunces = ounces.toFixed(2);
    const formattedCups = cups.toFixed(2);

    const steps = [
      `Reference density for ${ingredient.name}: ~${ingredient.gramsPerCup} grams per US cup`,
      `Divide grams by density: ${grams} g ÷ ${ingredient.gramsPerCup} g/cup = ${formattedCups} cups`,
      `Ounces equivalent: ${grams} g ÷ 28.35 g/oz = ${formattedOunces} oz`,
      `Attribution: ${ingredient.sourceAttribution}`,
    ];

    return {
      ingredient,
      mode,
      cups,
      grams,
      ounces,
      formattedGrams,
      formattedOunces,
      formattedCups,
      calculationSteps: steps,
    };
  }
}
