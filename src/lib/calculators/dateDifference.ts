export interface DateDifferenceInput {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  includeEndDate?: boolean; // false = standard exclusive (end - start); true = inclusive (+1 day)
}

export interface DateDifferenceResult {
  startDate: string;
  endDate: string;
  isInclusive: boolean;
  totalDays: number;
  weeks: number;
  remainingDays: number;
  businessDays: number; // Monday through Friday
  weekendDays: number;
  monthsApprox: number;
  isReversed: boolean;
  summaryText: string;
  calculationSteps: string[];
  errorMessage?: string;
}

export function calculateDateDifference(input: DateDifferenceInput): DateDifferenceResult {
  const startStr = (input.startDate ?? '').trim();
  const endStr = (input.endDate ?? '').trim();
  const isInclusive = Boolean(input.includeEndDate);

  if (startStr === '' || endStr === '') {
    return {
      startDate: '',
      endDate: '',
      isInclusive,
      totalDays: 0,
      weeks: 0,
      remainingDays: 0,
      businessDays: 0,
      weekendDays: 0,
      monthsApprox: 0,
      isReversed: false,
      summaryText: '—',
      calculationSteps: [],
      errorMessage: 'Please select both a start date and an end date.',
    };
  }

  // Parse YYYY-MM-DD using UTC to avoid timezone drift
  const parseDateUTC = (dStr: string) => {
    const parts = dStr.split('-').map((p) => parseInt(p, 10));
    if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
      return null;
    }
    return new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  };

  const startUTC = parseDateUTC(startStr);
  const endUTC = parseDateUTC(endStr);

  if (!startUTC || !endUTC || isNaN(startUTC.getTime()) || isNaN(endUTC.getTime())) {
    return {
      startDate: startStr,
      endDate: endStr,
      isInclusive,
      totalDays: 0,
      weeks: 0,
      remainingDays: 0,
      businessDays: 0,
      weekendDays: 0,
      monthsApprox: 0,
      isReversed: false,
      summaryText: '—',
      calculationSteps: [],
      errorMessage: 'Invalid date format. Please select valid calendar dates.',
    };
  }

  let isReversed = false;
  let d1 = startUTC;
  let d2 = endUTC;

  if (d1.getTime() > d2.getTime()) {
    isReversed = true;
    d1 = endUTC;
    d2 = startUTC;
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const rawDiffDays = Math.round((d2.getTime() - d1.getTime()) / msPerDay);
  const totalDays = isInclusive ? rawDiffDays + 1 : rawDiffDays;

  // Calculate business days (Monday to Friday)
  let businessDays = 0;
  let weekendDays = 0;
  const cur = new Date(d1.getTime());
  const limit = isInclusive ? rawDiffDays + 1 : rawDiffDays;

  for (let i = 0; i < limit; i++) {
    const dayOfWeek = cur.getUTCDay(); // 0 = Sunday, 6 = Saturday
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      weekendDays++;
    } else {
      businessDays++;
    }
    cur.setUTCDate(cur.getUTCDate() + 1);
  }

  const weeks = Math.floor(totalDays / 7);
  const remainingDays = totalDays % 7;
  const monthsApprox = parseFloat((totalDays / 30.4375).toFixed(1));

  const conventionNote = isInclusive
    ? 'Inclusive counting convention: both the start date and the end date are included (+1 day).'
    : 'Standard exclusive convention: calculates time elapsed between start and end (End date - Start date).';

  const steps = [
    `Baseline difference: |${endStr} - ${startStr}| = ${rawDiffDays} calendar days`,
    isInclusive ? `Inclusive toggle enabled: ${rawDiffDays} + 1 = ${totalDays} total days` : `Exclusive counting: ${totalDays} total days`,
    `Breakdown: ${weeks} full ${weeks === 1 ? 'week' : 'weeks'} and ${remainingDays} ${remainingDays === 1 ? 'day' : 'days'}`,
    `Workday breakdown: ${businessDays} business days (Mon–Fri) and ${weekendDays} weekend days`,
  ];

  return {
    startDate: startStr,
    endDate: endStr,
    isInclusive,
    totalDays,
    weeks,
    remainingDays,
    businessDays,
    weekendDays,
    monthsApprox,
    isReversed,
    summaryText: `${totalDays.toLocaleString()} days (${weeks} weeks, ${remainingDays} days)`,
    calculationSteps: steps,
  };
}
