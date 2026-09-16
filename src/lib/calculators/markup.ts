export interface MarkupInput {
  cost: string;
  markupPercent: string;
}

export interface MarkupResult {
  cost: number;
  markupPercent: number;
  markupAmount: number;
  sellingPrice: number;
  grossMarginPercent: number;
  calculationSteps: string[];
  errorMessage?: string;
}

export function calculateMarkup(input: MarkupInput): MarkupResult {
  const costStr = (input.cost ?? '').trim();
  const markupStr = (input.markupPercent ?? '').trim();

  if (costStr === '' || markupStr === '') {
    return {
      cost: 0,
      markupPercent: 0,
      markupAmount: 0,
      sellingPrice: 0,
      grossMarginPercent: 0,
      calculationSteps: [],
      errorMessage: 'Please enter both cost and markup percentage.',
    };
  }

  const cost = parseFloat(costStr);
  const markupPercent = parseFloat(markupStr);

  if (isNaN(cost) || cost < 0) {
    return {
      cost: 0,
      markupPercent: 0,
      markupAmount: 0,
      sellingPrice: 0,
      grossMarginPercent: 0,
      calculationSteps: [],
      errorMessage: 'Cost must be a valid non-negative number.',
    };
  }

  if (isNaN(markupPercent) || markupPercent < 0) {
    return {
      cost,
      markupPercent: 0,
      markupAmount: 0,
      sellingPrice: cost,
      grossMarginPercent: 0,
      calculationSteps: [],
      errorMessage: 'Markup percentage must be a valid positive percentage.',
    };
  }

  const markupAmount = (cost * markupPercent) / 100;
  const sellingPrice = cost + markupAmount;
  const grossMarginPercent = sellingPrice > 0 ? (markupAmount / sellingPrice) * 100 : 0;

  const fmt = (v: number) => v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return {
    cost,
    markupPercent,
    markupAmount,
    sellingPrice,
    grossMarginPercent,
    calculationSteps: [
      `Calculate markup dollar amount: $${fmt(cost)} × ${markupPercent}% ÷ 100 = $${fmt(markupAmount)}`,
      `Calculate final selling price: $${fmt(cost)} + $${fmt(markupAmount)} = $${fmt(sellingPrice)}`,
      `Calculate resulting gross margin: ($${fmt(markupAmount)} ÷ $${fmt(sellingPrice)}) × 100 = ${grossMarginPercent.toFixed(2)}%`,
    ],
  };
}
