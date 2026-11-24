export interface TipInput {
  billAmount: string;
  tipPercent: number;
  customTip?: string;
  isCustom?: boolean;
  peopleCount: string;
  roundUp?: boolean;
}

export interface TipResult {
  bill: number;
  tipPercent: number;
  tipAmount: number;
  totalBill: number;
  amountPerPerson: number;
  tipPerPerson: number;
  calculationSteps: string[];
  errorMessage?: string;
}

export function calculateTip(input: TipInput): TipResult {
  const billStr = (input.billAmount ?? '').trim();
  const peopleStr = (input.peopleCount ?? '').trim();
  const customTipStr = (input.customTip ?? '').trim();
  const isStrictNumber = (s: string) => /^(?:\d+(?:\.\d+)?|\.\d+)$/.test(s);
  const activeTipPct = input.isCustom
    ? (customTipStr !== '' && isStrictNumber(customTipStr) ? Number(customTipStr) : NaN)
    : input.tipPercent;

  if (billStr === '') {
    return {
      bill: 0,
      tipPercent: isNaN(activeTipPct) ? 0 : activeTipPct,
      tipAmount: 0,
      totalBill: 0,
      amountPerPerson: 0,
      tipPerPerson: 0,
      calculationSteps: [],
      errorMessage: 'Please enter a valid bill total.',
    };
  }

  const bill = isStrictNumber(billStr) ? Number(billStr) : NaN;
  const people = /^\d+$/.test(peopleStr) ? Number(peopleStr) : NaN;

  if (isNaN(bill) || bill < 0) {
    return {
      bill: 0,
      tipPercent: isNaN(activeTipPct) ? 0 : activeTipPct,
      tipAmount: 0,
      totalBill: 0,
      amountPerPerson: 0,
      tipPerPerson: 0,
      calculationSteps: [],
      errorMessage: 'Please enter a valid positive bill total.',
    };
  }

  if (isNaN(activeTipPct) || activeTipPct < 0 || activeTipPct > 200) {
    return {
      bill,
      tipPercent: 0,
      tipAmount: 0,
      totalBill: bill,
      amountPerPerson: bill,
      tipPerPerson: 0,
      calculationSteps: [],
      errorMessage: 'Tip percentage must be a valid number between 0% and 200%.',
    };
  }

  if (isNaN(people) || people < 1) {
    return {
      bill,
      tipPercent: activeTipPct,
      tipAmount: 0,
      totalBill: bill,
      amountPerPerson: bill,
      tipPerPerson: 0,
      calculationSteps: [],
      errorMessage: 'Number of people must be a whole number of at least 1.',
    };
  }

  const rawTip = (bill * activeTipPct) / 100;
  let totalBill = bill + rawTip;

  if (input.roundUp && totalBill > 1e-9) {
    const rounded = Math.round(totalBill);
    totalBill = Math.abs(totalBill - rounded) < 1e-9 ? rounded : Math.ceil(totalBill);
  }

  const finalTipAmount = Math.max(0, totalBill - bill);
  const amountPerPerson = totalBill / people;
  const tipPerPerson = finalTipAmount / people;

  const fmt = (v: number) => v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return {
    bill,
    tipPercent: activeTipPct,
    tipAmount: finalTipAmount,
    totalBill,
    amountPerPerson,
    tipPerPerson,
    calculationSteps: [
      `Tip amount = $${fmt(bill)} × ${activeTipPct}% ÷ 100 = $${fmt(finalTipAmount)}`,
      `Total bill = $${fmt(bill)} + $${fmt(finalTipAmount)} = $${fmt(totalBill)}`,
      `Amount per person = $${fmt(totalBill)} ÷ ${people} = $${fmt(amountPerPerson)} per person`,
    ],
  };
}
