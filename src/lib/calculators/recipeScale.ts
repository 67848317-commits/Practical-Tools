export interface RecipeScaleInput {
  originalServings: string;
  desiredServings: string;
  ingredientQuantity: string;
  unitLabel?: string;
}

export interface RecipeScaleResult {
  originalServings: number;
  desiredServings: number;
  originalQuantity: number;
  scaleFactor: number;
  adjustedQuantity: number;
  formattedAdjusted: string;
  fractionApprox?: string;
  unitLabel: string;
  calculationSteps: string[];
  errorMessage?: string;
}

// Convert decimal to common cooking fraction string
function decimalToFraction(val: number): string | undefined {
  const whole = Math.floor(val);
  const frac = val - whole;
  if (Math.abs(frac) < 0.03) return whole > 0 ? `${whole}` : undefined;

  const fractions: [number, string][] = [
    [1 / 8, '1/8'],
    [1 / 4, '1/4'],
    [1 / 3, '1/3'],
    [3 / 8, '3/8'],
    [1 / 2, '1/2'],
    [5 / 8, '5/8'],
    [2 / 3, '2/3'],
    [3 / 4, '3/4'],
    [7 / 8, '7/8'],
  ];

  for (const [fVal, str] of fractions) {
    if (Math.abs(frac - fVal) < 0.04) {
      return whole > 0 ? `${whole} ${str}` : str;
    }
  }
  return undefined;
}

export function parseQuantity(str: string): number {
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

export function calculateRecipeScale(input: RecipeScaleInput): RecipeScaleResult {
  const origStr = (input.originalServings ?? '').trim();
  const desStr = (input.desiredServings ?? '').trim();
  const qtyStr = (input.ingredientQuantity ?? '').trim();
  const unitLabel = (input.unitLabel ?? '').trim();

  if (origStr === '' || desStr === '' || qtyStr === '') {
    return {
      originalServings: 0,
      desiredServings: 0,
      originalQuantity: 0,
      scaleFactor: 0,
      adjustedQuantity: 0,
      formattedAdjusted: '—',
      unitLabel,
      calculationSteps: [],
      errorMessage: 'Please enter original servings, desired servings, and ingredient quantity.',
    };
  }

  const origServings = parseFloat(origStr);
  const desServings = parseFloat(desStr);
  const origQty = parseQuantity(qtyStr);

  if (isNaN(origServings) || origServings <= 0) {
    return {
      originalServings: 0,
      desiredServings: 0,
      originalQuantity: 0,
      scaleFactor: 0,
      adjustedQuantity: 0,
      formattedAdjusted: '—',
      unitLabel,
      calculationSteps: [],
      errorMessage: 'Original recipe yield (servings) must be greater than zero.',
    };
  }

  if (isNaN(desServings) || desServings <= 0) {
    return {
      originalServings: origServings,
      desiredServings: 0,
      originalQuantity: 0,
      scaleFactor: 0,
      adjustedQuantity: 0,
      formattedAdjusted: '—',
      unitLabel,
      calculationSteps: [],
      errorMessage: 'Desired yield (servings) must be greater than zero.',
    };
  }

  if (isNaN(origQty) || origQty < 0) {
    return {
      originalServings: origServings,
      desiredServings: desServings,
      originalQuantity: 0,
      scaleFactor: 0,
      adjustedQuantity: 0,
      formattedAdjusted: '—',
      unitLabel,
      calculationSteps: [],
      errorMessage: 'Ingredient quantity must be a non-negative number (fractions like 1/2 or 1 1/2 supported).',
    };
  }

  const scaleFactor = desServings / origServings;
  const adjustedQuantity = origQty * scaleFactor;
  const s = adjustedQuantity.toFixed(2);
  const formattedAdjusted = Number.isInteger(adjustedQuantity)
    ? adjustedQuantity.toString()
    : (s.includes('.') ? s.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '') : s);

  const fractionApprox = decimalToFraction(adjustedQuantity);

  const steps = [
    `Calculate scaling multiplier: ${desServings} desired ÷ ${origServings} original = ${scaleFactor.toFixed(3)}x factor`,
    `Multiply ingredient by scale factor: ${origQty} ${unitLabel ? unitLabel + ' ' : ''}× ${scaleFactor.toFixed(3)} = ${formattedAdjusted} ${unitLabel}`.trim(),
    ...(fractionApprox && fractionApprox !== formattedAdjusted
      ? [`Approximate kitchen fraction: ~${fractionApprox} ${unitLabel}`.trim()]
      : []),
  ];

  return {
    originalServings: origServings,
    desiredServings: desServings,
    originalQuantity: origQty,
    scaleFactor,
    adjustedQuantity,
    formattedAdjusted,
    fractionApprox,
    unitLabel,
    calculationSteps: steps,
  };
}
