import React, { useState } from 'react';
import { CalculatorCard, FormField, ResultBox } from '../CalculatorCard';
import { calculateWorkHours } from '../../lib/calculators/workHours';

export const WorkHoursCalculator: React.FC = () => {
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('17:30');
  const [breakMinutes, setBreakMinutes] = useState<string>('30');
  const [hourlyRate, setHourlyRate] = useState<string>('25');

  const handleReset = () => {
    setStartTime('09:00');
    setEndTime('17:30');
    setBreakMinutes('30');
    setHourlyRate('25');
  };

  const result = calculateWorkHours({
    startTime,
    endTime,
    breakMinutes,
    hourlyRate,
  });

  const fmt = (v: number) =>
    v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <CalculatorCard
      title="Work Hours & Payroll Timecard Calculator"
      description="Calculate net daily shift hours, deduct unpaid meal breaks, and compute decimal hours for timesheets."
      onReset={handleReset}
      errorMessage={result.errorMessage}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField id="shift-start" label="Shift Start Time" helperText="e.g. 09:00 (9:00 AM) or 22:00">
              <input
                id="shift-start"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base font-medium"
              />
            </FormField>

            <FormField id="shift-end" label="Shift End Time" helperText="e.g. 17:30 (5:30 PM) or 06:00">
              <input
                id="shift-end"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base font-medium"
              />
            </FormField>
          </div>

          {result.isOvernight && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 font-medium">
              Overnight shift detected: End time occurs the following morning (crosses midnight). Total span includes +24h rollover.
            </div>
          )}

          {!result.errorMessage && result.totalSpanMinutes === 0 && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium">
              Start and end times are identical, resulting in a 0h 0m clock span.
            </div>
          )}

          {/* Quick Shift Presets */}
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Common Shift Presets
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { s: '09:00', e: '17:00', b: '30', label: '9 to 5 (30m break)' },
                { s: '08:00', e: '16:30', b: '30', label: '8:00 to 4:30' },
                { s: '07:00', e: '15:30', b: '30', label: 'Early (7 to 3:30)' },
                { s: '22:00', e: '06:30', b: '30', label: 'Night Shift (10pm–6:30am)' },
                { s: '19:00', e: '07:30', b: '60', label: '12h Night (7pm–7:30am)' },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setStartTime(p.s);
                    setEndTime(p.e);
                    setBreakMinutes(p.b);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="break-mins"
              label="Unpaid Break"
              suffix="mins"
              helperText="Meal break deduction."
            >
              <input
                id="break-mins"
                type="number"
                min="0"
                step="5"
                value={breakMinutes}
                onChange={(e) => setBreakMinutes(e.target.value)}
                placeholder="30"
                className="w-full rounded-xl border border-slate-300 pl-4 pr-16 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>

            <FormField
              id="hourly-wage"
              label="Hourly Wage"
              prefix="$"
              suffix="/hr"
              helperText="Optional for gross pay."
            >
              <input
                id="hourly-wage"
                type="number"
                min="0"
                step="0.5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                placeholder="25"
                className="w-full rounded-xl border border-slate-300 pl-8 pr-14 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>
          </div>
        </div>

        {/* Results Box */}
        <div className="lg:col-span-6">
          <ResultBox
            primaryLabel="Net Working Time"
            primaryValue={result.errorMessage ? '—' : result.formattedDuration}
            subValue={
              result.errorMessage
                ? undefined
                : `${result.decimalHours} decimal hours for timesheet entry`
            }
            secondaryMetrics={
              result.errorMessage
                ? []
                : [
                    {
                      label: 'Decimal Hours',
                      value: `${result.decimalHours} hrs`,
                      hint: 'For timesheet & payroll',
                    },
                    ...(result.estimatedGrossPay !== undefined
                      ? [
                          {
                            label: 'Estimated Shift Pay',
                            value: `$${fmt(result.estimatedGrossPay)}`,
                            hint: `Gross at $${hourlyRate}/hr`,
                          },
                        ]
                      : []),
                    {
                      label: 'Gross Clock Span',
                      value: `${Math.floor(result.totalSpanMinutes / 60)}h ${result.totalSpanMinutes % 60}m`,
                      hint: 'Before break deduction',
                    },
                    {
                      label: 'Break Deducted',
                      value: `${result.breakMinutes} mins`,
                      hint: 'Unpaid rest or lunch',
                    },
                  ]
            }
            calculationSteps={result.calculationSteps}
          />
        </div>
      </div>

      <p className="mt-5 pt-4 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
        Single-Shift Scope: Calculates net duration, decimal hours, and straight-time gross pay for one shift (including midnight rollover). Under U.S. FLSA rules, nonexempt 1.5× overtime is measured over a fixed 168-hour (40-hour) workweek, while certain states also enforce daily overtime thresholds (such as &gt;8 hours/day).
      </p>
    </CalculatorCard>
  );
};
