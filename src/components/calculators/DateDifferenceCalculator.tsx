import React, { useState } from 'react';
import { CalculatorCard, FormField, ResultBox } from '../CalculatorCard';
import { calculateDateDifference } from '../../lib/calculators/dateDifference';

export const DateDifferenceCalculator: React.FC = () => {
  const formatLocalYMD = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const getTodayStr = () => formatLocalYMD(new Date());
  const getFutureStr = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return formatLocalYMD(d);
  };

  const [startDate, setStartDate] = useState<string>(getTodayStr());
  const [endDate, setEndDate] = useState<string>(getFutureStr(45));
  const [includeEndDate, setIncludeEndDate] = useState<boolean>(false);

  const handleReset = () => {
    setStartDate(getTodayStr());
    setEndDate(getFutureStr(45));
    setIncludeEndDate(false);
  };

  const result = calculateDateDifference({ startDate, endDate, includeEndDate });

  return (
    <CalculatorCard
      title="Date Difference & Duration Calculator"
      description="Calculate the exact number of days, weeks, months, and business days between two dates."
      onReset={handleReset}
      errorMessage={result.errorMessage}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField id="start-date" label="Start Date">
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base font-medium"
              />
            </FormField>

            <FormField id="end-date" label="End Date">
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base font-medium"
              />
            </FormField>
          </div>

          {/* Quick preset intervals */}
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Quick Target Intervals
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: '+30 Days', days: 30 },
                { label: '+60 Days', days: 60 },
                { label: '+90 Days (Quarter)', days: 90 },
                { label: '+180 Days (Half Year)', days: 180 },
                { label: '+365 Days (1 Year)', days: 365 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setStartDate(getTodayStr());
                    setEndDate(getFutureStr(preset.days));
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Inclusive Toggle */}
          <div className="pt-2">
            <label className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
              <input
                type="checkbox"
                checked={includeEndDate}
                onChange={(e) => setIncludeEndDate(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded-sm border-slate-300 focus:ring-emerald-500"
              />
              <div>
                <span className="text-sm font-semibold text-slate-800 block">
                  Include end date in count (+1 day)
                </span>
                <span className="text-xs text-slate-500">
                  Standard counting is exclusive (e.g. Monday to Tuesday is 1 day). Check to count both boundary days (2 days).
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Results Box */}
        <div className="lg:col-span-6">
          <ResultBox
            primaryLabel="Total Calendar Span"
            primaryValue={
              result.errorMessage ? '—' : `${result.totalDays.toLocaleString()} Days`
            }
            subValue={
              result.errorMessage
                ? undefined
                : `${result.weeks} full ${result.weeks === 1 ? 'week' : 'weeks'} and ${result.remainingDays} ${result.remainingDays === 1 ? 'day' : 'days'}`
            }
            secondaryMetrics={
              result.errorMessage
                ? []
                : [
                    {
                      label: 'Business Days (Mon–Fri)',
                      value: `${result.businessDays.toLocaleString()} Days`,
                      hint: 'Excludes Sat/Sun (holidays not deducted)',
                    },
                    {
                      label: 'Weekend Days',
                      value: `${result.weekendDays.toLocaleString()} Days`,
                      hint: 'Saturdays and Sundays',
                    },
                    {
                      label: 'Approx. Months',
                      value: `~${result.monthsApprox} Months`,
                      hint: 'Based on 30.4 days/mo avg',
                    },
                    {
                      label: 'Counting Convention',
                      value: result.isInclusive ? 'Inclusive (+1d)' : 'Exclusive (Standard)',
                      hint: result.isInclusive ? 'Both dates included' : 'End date excluded',
                    },
                  ]
            }
            calculationSteps={result.calculationSteps}
          />
        </div>
      </div>
    </CalculatorCard>
  );
};
