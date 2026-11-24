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

  // Parse YYYY-MM-DD strictly and verify calendar date (rejects rolled dates like 2026-02-30 or trailing characters)
  const parseDateUTC = (dStr: string) => {
    const match = dStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;
    const year = Number(match[1]);
    const month = Number(match[2]);
    const day = Number(match[3]);
    if (month < 1 || month > 12 || day < 1 || day > 31) return null;
    const d = new Date(Date.UTC(year, month - 1, day));
    if (
      d.getUTCFullYear() !== year ||
      d.getUTCMonth() !== month - 1 ||
      d.getUTCDate() !== day
    ) {
      return null;
    }
    return d;
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

  // Calculate business days (Monday to Friday; weekends excluded, public holidays not deducted)
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

  const steps = [
    `Baseline difference: |${endStr} - ${startStr}| = ${rawDiffDays} calendar days`,
    isInclusive ? `Inclusive toggle enabled: ${rawDiffDays} + 1 = ${totalDays} total days` : `Exclusive counting: ${totalDays} total days`,
    `Breakdown: ${weeks} full ${weeks === 1 ? 'week' : 'weeks'} and ${remainingDays} ${remainingDays === 1 ? 'day' : 'days'}`,
    `Workday breakdown: ${businessDays} weekday days (Mon–Fri, weekends excluded; public holidays not deducted) and ${weekendDays} weekend days`,
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
