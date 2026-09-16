export type PercentageMode = 'percent_of' | 'is_what_percent' | 'change';

export interface PercentageInput {
  mode: PercentageMode;
  // Mode 1: What is P% of V?
  m1Percent?: string;
  m1Value?: string;
  // Mode 2: Part is what % of Whole?
  m2Part?: string;
  m2Whole?: string;
  // Mode 3: % change from Initial to Final
  m3Initial?: string;
  m3Final?: string;
}

export interface PercentageResult {
  resultText: string;
  subResult: string;
  calculationSteps: string[];
  errorMessage?: string;
}

function formatDecimal(val: number, minDec: number = 2, maxDec: number = 4): string {
  if (Number.isInteger(val)) return val.toLocaleString();
  const formatted = val.toLocaleString('en-US', { minimumFractionDigits: minDec, maximumFractionDigits: maxDec });
  return formatted.includes('.') ? formatted.replace(/\.?0+$/, '') : formatted;
}

export function calculatePercentage(input: PercentageInput): PercentageResult {
  const { mode } = input;

  if (mode === 'percent_of') {
    const pStr = (input.m1Percent ?? '').trim();
    const vStr = (input.m1Value ?? '').trim();

    if (pStr === '' || vStr === '') {
      return {
        resultText: '—',
        subResult: 'Enter both percentage and value above.',
        calculationSteps: [],
        errorMessage: 'Please enter valid numerical values for both percentage and base value.',
      };
    }

    const p = parseFloat(pStr);
    const v = parseFloat(vStr);

    if (isNaN(p) || isNaN(v)) {
      return {
        resultText: '—',
        subResult: 'Invalid number format.',
        calculationSteps: [],
        errorMessage: 'Please enter valid numerical values for both percentage and base value.',
      };
    }

    const res = (p / 100) * v;
    const formattedRes = formatDecimal(res, 2, 4);

    return {
      resultText: formattedRes,
      subResult: `${p}% of ${v.toLocaleString()} is ${formattedRes}`,
      calculationSteps: [
        `Convert percentage to decimal: ${p} ÷ 100 = ${(p / 100).toFixed(4).replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '')}`,
        `Multiply decimal by value: ${(p / 100).toFixed(4).replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '')} × ${v.toLocaleString()} = ${formattedRes}`,
      ],
    };
  }

  if (mode === 'is_what_percent') {
    const partStr = (input.m2Part ?? '').trim();
    const wholeStr = (input.m2Whole ?? '').trim();

    if (partStr === '' || wholeStr === '') {
      return {
        resultText: '—',
        subResult: 'Enter both part and whole values above.',
        calculationSteps: [],
        errorMessage: 'Please enter valid numbers for both part and whole values.',
      };
    }

    const part = parseFloat(partStr);
    const whole = parseFloat(wholeStr);

    if (isNaN(part) || isNaN(whole)) {
      return {
        resultText: '—',
        subResult: 'Invalid number format.',
        calculationSteps: [],
        errorMessage: 'Please enter valid numbers for both part and whole values.',
      };
    }

    if (whole === 0) {
      return {
        resultText: '—',
        subResult: 'Division by zero is undefined.',
        calculationSteps: [],
        errorMessage: 'Whole value (denominator) cannot be zero.',
      };
    }

    const res = (part / whole) * 100;
    const formattedRes = Number.isInteger(res)
      ? res.toString()
      : res.toFixed(2).replace(/\.?0+$/, '');

    return {
      resultText: `${formattedRes}%`,
      subResult: `${part.toLocaleString()} is ${formattedRes}% of ${whole.toLocaleString()}`,
      calculationSteps: [
        `Divide part by whole: ${part.toLocaleString()} ÷ ${whole.toLocaleString()} = ${(part / whole).toFixed(4).replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '')}`,
        `Multiply by 100 to get percent: ${(part / whole).toFixed(4).replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '')} × 100 = ${formattedRes}%`,
      ],
    };
  }

  // mode === 'change'
  const initStr = (input.m3Initial ?? '').trim();
  const finStr = (input.m3Final ?? '').trim();

  if (initStr === '' || finStr === '') {
    return {
      resultText: '—',
      subResult: 'Enter starting and final values above.',
      calculationSteps: [],
      errorMessage: 'Please enter valid numbers for both starting and final values.',
    };
  }

  const init = parseFloat(initStr);
  const fin = parseFloat(finStr);

  if (isNaN(init) || isNaN(fin)) {
    return {
      resultText: '—',
      subResult: 'Invalid number format.',
      calculationSteps: [],
      errorMessage: 'Please enter valid numbers for both starting and final values.',
    };
  }

  if (init === 0) {
    return {
      resultText: '—',
      subResult: 'Relative percentage change from 0 is undefined.',
      calculationSteps: [],
      errorMessage: 'Starting baseline value cannot be zero when calculating relative percentage change.',
    };
  }

  const diff = fin - init;
  const pctChange = (diff / Math.abs(init)) * 100;
  const formattedPct = Number.isInteger(pctChange)
    ? pctChange.toString()
    : pctChange.toFixed(2).replace(/\.?0+$/, '');
  const isIncrease = diff > 0;
  const isZero = diff === 0;

  return {
    resultText: isZero ? '0%' : `${isIncrease ? '+' : ''}${formattedPct}%`,
    subResult: isZero
      ? 'No change between starting and final value.'
      : `${isIncrease ? 'Increase' : 'Decrease'} of ${Math.abs(Number(formattedPct))}% (Difference: ${diff > 0 ? '+' : ''}${diff.toLocaleString()})`,
    calculationSteps: [
      `Calculate absolute difference: ${fin.toLocaleString()} - ${init.toLocaleString()} = ${diff.toLocaleString()}`,
      `Divide difference by starting value: ${diff.toLocaleString()} ÷ ${Math.abs(init).toLocaleString()} = ${(diff / Math.abs(init)).toFixed(4)}`,
      `Multiply by 100: ${(diff / Math.abs(init)).toFixed(4)} × 100 = ${formattedPct}%`,
    ],
  };
}
