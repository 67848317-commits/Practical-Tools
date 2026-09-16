export interface WorkHoursInput {
  startTime: string; // HH:MM (24-hour format)
  endTime: string;   // HH:MM (24-hour format)
  breakMinutes: string; // duration in minutes, e.g. 30, 45, 60
  hourlyRate?: string; // optional wage for gross pay calculation
}

export interface WorkHoursResult {
  startTime: string;
  endTime: string;
  isOvernight: boolean;
  totalSpanMinutes: number;
  breakMinutes: number;
  netWorkMinutes: number;
  hours: number;
  minutes: number;
  decimalHours: number;
  formattedDuration: string;
  estimatedGrossPay?: number;
  calculationSteps: string[];
  errorMessage?: string;
}

export function calculateWorkHours(input: WorkHoursInput): WorkHoursResult {
  const startStr = (input.startTime ?? '').trim();
  const endStr = (input.endTime ?? '').trim();
  const breakStr = (input.breakMinutes ?? '').trim();
  const rateStr = (input.hourlyRate ?? '').trim();

  if (startStr === '' || endStr === '') {
    return {
      startTime: '',
      endTime: '',
      isOvernight: false,
      totalSpanMinutes: 0,
      breakMinutes: 0,
      netWorkMinutes: 0,
      hours: 0,
      minutes: 0,
      decimalHours: 0,
      formattedDuration: '—',
      calculationSteps: [],
      errorMessage: 'Please enter both start time and end time.',
    };
  }

  const parseTime = (t: string): number | null => {
    const parts = t.split(':').map((p) => parseInt(p, 10));
    if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) return null;
    if (parts[0] < 0 || parts[0] > 23 || parts[1] < 0 || parts[1] > 59) return null;
    return parts[0] * 60 + parts[1];
  };

  const startMins = parseTime(startStr);
  const endMins = parseTime(endStr);

  if (startMins === null || endMins === null) {
    return {
      startTime: startStr,
      endTime: endStr,
      isOvernight: false,
      totalSpanMinutes: 0,
      breakMinutes: 0,
      netWorkMinutes: 0,
      hours: 0,
      minutes: 0,
      decimalHours: 0,
      formattedDuration: '—',
      calculationSteps: [],
      errorMessage: 'Invalid time format. Please use standard HH:MM times.',
    };
  }

  const breakMinutes = breakStr === '' ? 0 : parseInt(breakStr, 10);
  if (isNaN(breakMinutes) || breakMinutes < 0) {
    return {
      startTime: startStr,
      endTime: endStr,
      isOvernight: false,
      totalSpanMinutes: 0,
      breakMinutes: 0,
      netWorkMinutes: 0,
      hours: 0,
      minutes: 0,
      decimalHours: 0,
      formattedDuration: '—',
      calculationSteps: [],
      errorMessage: 'Break duration must be a non-negative number of minutes.',
    };
  }

  // Handle overnight shifts:
  // If endMins < startMins, shift spanned midnight (+ 1440 minutes)
  // If endMins === startMins, treat as 24-hour shift (or 0 if break is 0)
  let isOvernight = false;
  let totalSpanMinutes = endMins - startMins;

  if (totalSpanMinutes < 0) {
    totalSpanMinutes += 24 * 60; // 1440 mins
    isOvernight = true;
  } else if (totalSpanMinutes === 0) {
    totalSpanMinutes = 0;
  }

  if (breakMinutes > totalSpanMinutes) {
    return {
      startTime: startStr,
      endTime: endStr,
      isOvernight,
      totalSpanMinutes,
      breakMinutes,
      netWorkMinutes: 0,
      hours: 0,
      minutes: 0,
      decimalHours: 0,
      formattedDuration: '—',
      calculationSteps: [],
      errorMessage:
        totalSpanMinutes === 0
          ? 'Start time and end time are identical (0-hour shift).'
          : 'Unpaid break duration cannot exceed total shift span.',
    };
  }

  const netWorkMinutes = Math.max(0, totalSpanMinutes - breakMinutes);
  const hours = Math.floor(netWorkMinutes / 60);
  const minutes = netWorkMinutes % 60;
  const decimalHours = parseFloat((netWorkMinutes / 60).toFixed(2));

  let estimatedGrossPay: number | undefined = undefined;
  if (rateStr !== '') {
    const rate = parseFloat(rateStr);
    if (!isNaN(rate) && rate >= 0) {
      estimatedGrossPay = decimalHours * rate;
    }
  }

  const format12h = (m: number) => {
    const hh = Math.floor(m / 60);
    const mm = m % 60;
    const period = hh >= 12 ? 'PM' : 'AM';
    const displayH = hh % 12 === 0 ? 12 : hh % 12;
    return `${displayH}:${mm.toString().padStart(2, '0')} ${period}`;
  };

  const steps = [
    `Shift span: ${format12h(startMins)} to ${format12h(endMins)}${isOvernight ? ' (crosses midnight, +24h applied)' : ''} = ${Math.floor(totalSpanMinutes / 60)}h ${totalSpanMinutes % 60}m (${totalSpanMinutes} minutes)`,
    breakMinutes > 0
      ? `Deduct unpaid break: ${totalSpanMinutes} mins - ${breakMinutes} mins break = ${netWorkMinutes} net minutes`
      : `No unpaid break deducted: ${netWorkMinutes} net minutes`,
    `Standard time: ${hours} hours and ${minutes} minutes`,
    `Decimal payroll hours: ${netWorkMinutes} ÷ 60 = ${decimalHours.toFixed(2)} hours`,
    ...(estimatedGrossPay !== undefined
      ? [`Estimated gross pay: ${decimalHours.toFixed(2)} hrs × $${parseFloat(rateStr).toFixed(2)}/hr = $${estimatedGrossPay.toFixed(2)}`]
      : []),
  ];

  return {
    startTime: startStr,
    endTime: endStr,
    isOvernight,
    totalSpanMinutes,
    breakMinutes,
    netWorkMinutes,
    hours,
    minutes,
    decimalHours,
    formattedDuration: `${hours}h ${minutes}m`,
    estimatedGrossPay,
    calculationSteps: steps,
  };
}
