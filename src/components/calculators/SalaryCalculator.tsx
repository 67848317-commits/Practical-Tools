import React, { useState } from 'react';
import { RotateCcw, AlertCircle, Info, CheckCircle2 } from 'lucide-react';

export const SalaryCalculator: React.FC = () => {
  const [annualSalaryInput, setAnnualSalaryInput] = useState<string>('65000');
  const [hoursPerWeekInput, setHoursPerWeekInput] = useState<string>('40');
  const [weeksPerYearInput, setWeeksPerYearInput] = useState<string>('52');

  const handleReset = () => {
    setAnnualSalaryInput('65000');
    setHoursPerWeekInput('40');
    setWeeksPerYearInput('52');
  };

  const salary = parseFloat(annualSalaryInput);
  const hpw = parseFloat(hoursPerWeekInput);
  const wpy = parseFloat(weeksPerYearInput);

  let errorMsg = '';
  if (annualSalaryInput.trim() === '' || isNaN(salary) || salary <= 0) {
    errorMsg = 'Please enter a valid annual salary greater than zero.';
  } else if (hoursPerWeekInput.trim() === '' || isNaN(hpw) || hpw <= 0 || hpw > 168) {
    errorMsg = 'Hours per week must be between 1 and 168 hours.';
  } else if (weeksPerYearInput.trim() === '' || isNaN(wpy) || wpy <= 0 || wpy > 52) {
    errorMsg = 'Working weeks per year must be between 1 and 52 weeks.';
  }

  // Formula strictly as specified:
  // Annual salary / (hours per week × weeks per year)
  const totalAnnualHours = !errorMsg ? hpw * wpy : 0;
  const estimatedHourlyRate = !errorMsg && totalAnnualHours > 0 ? salary / totalAnnualHours : 0;

  // Secondary breakdown intervals for practical budgeting
  const weeklyGross = estimatedHourlyRate * hpw;
  const biweeklyGross = !errorMsg ? salary / 26 : 0;
  const monthlyGross = !errorMsg ? salary / 12 : 0;

  const formatCurrency = (val: number) =>
    val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculationSteps = !errorMsg
    ? [
        `Calculate total annual work hours: ${hpw} hours/week × ${wpy} weeks/year = ${totalAnnualHours.toLocaleString()} hours`,
        `Calculate estimated hourly rate: $${formatCurrency(salary)} ÷ ${totalAnnualHours.toLocaleString()} hours = $${formatCurrency(estimatedHourlyRate)}/hr`,
      ]
    : [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs" id="salary-calculator-widget">
      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        {/* 1. Annual Salary */}
        <div>
          <label htmlFor="annual-salary" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Annual Salary ($)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold" aria-hidden="true">$</span>
            <input
              id="annual-salary"
              type="number"
              min="1"
              step="any"
              value={annualSalaryInput}
              onChange={(e) => setAnnualSalaryInput(e.target.value)}
              className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="65000"
              aria-label="Annual salary in dollars"
            />
          </div>
        </div>

        {/* 2. Hours Per Week */}
        <div>
          <label htmlFor="hours-per-week" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Hours per Week
          </label>
          <input
            id="hours-per-week"
            type="number"
            min="1"
            max="168"
            step="any"
            value={hoursPerWeekInput}
            onChange={(e) => setHoursPerWeekInput(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="40"
            aria-label="Hours worked per week"
          />
          <span className="text-[11px] text-slate-400 block mt-1">
            Standard full-time is 40 hrs/wk
          </span>
        </div>

        {/* 3. Weeks Per Year */}
        <div>
          <label htmlFor="weeks-per-year" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Weeks per Year
          </label>
          <input
            id="weeks-per-year"
            type="number"
            min="1"
            max="52"
            step="any"
            value={weeksPerYearInput}
            onChange={(e) => setWeeksPerYearInput(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="52"
            aria-label="Working weeks per year"
          />
          <span className="text-[11px] text-slate-400 block mt-1">
            52 weeks for salaried roles with paid leave
          </span>
        </div>
      </div>

      {/* Output / Result display */}
      {errorMsg ? (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 mb-6" role="alert">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold">Unable to calculate</p>
            <p className="text-amber-800 text-xs mt-0.5">{errorMsg}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="p-6 rounded-xl bg-slate-900 text-white mb-6" aria-live="polite">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Primary Requested Output: Estimated Hourly Rate */}
              <div>
                <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
                  Estimated Hourly Rate
                </span>
                <div className="text-3xl sm:text-4xl font-bold font-mono text-emerald-400">
                  ${estimatedHourlyRate.toFixed(2)}
                  <span className="text-base text-slate-300 font-sans font-normal ml-1">/ hour</span>
                </div>
                <span className="text-xs text-slate-400 mt-1 block">
                  Based on {totalAnnualHours.toLocaleString()} total working hours per year
                </span>
              </div>

              {/* Secondary Equivalent Pay Benchmarks */}
              <div className="sm:border-l sm:border-slate-800 sm:pl-6">
                <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
                  Monthly Gross Equivalent
                </span>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white break-words">
                  ${formatCurrency(monthlyGross)}
                </div>
                <span className="text-xs text-slate-400 mt-1 block">
                  Bi-weekly (26 paychecks): ${formatCurrency(biweeklyGross)}
                </span>
              </div>
            </div>

            {/* Arithmetic Breakdown */}
            {calculationSteps.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-1 text-xs text-slate-300 font-mono">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 block mb-1 font-sans">
                  Formula & Arithmetic Breakdown:
                </span>
                {calculationSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-slate-500">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Explicit Estimate Disclaimer Callout */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-950 text-xs leading-relaxed flex items-start gap-3 mb-6" role="note">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-900 mb-0.5">
                Estimation Notice & Exclusions
              </p>
              <p className="text-amber-800">
                This calculation is an estimate and reflects gross pre-tax compensation. It <strong>does not account for</strong> federal, state, or municipal income taxes, FICA (Social Security & Medicare), employee-sponsored healthcare premiums, retirement contributions (401k/pension), unpaid time off, overtime premiums, or bonuses.
              </p>
            </div>
          </div>

          {/* Complete Gross Pay Equivalent Schedule */}
          <div className="mb-6 border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-600">
              Equivalent Pay Frequency Schedule (Gross)
            </div>
            <div className="divide-y divide-slate-100 text-sm">
              <div className="flex justify-between items-center px-4 py-2.5">
                <span className="text-slate-600 font-medium">Hourly Rate</span>
                <span className="font-mono font-bold text-slate-900">${formatCurrency(estimatedHourlyRate)}/hr</span>
              </div>
              <div className="flex justify-between items-center px-4 py-2.5 bg-slate-50/50">
                <span className="text-slate-600 font-medium">Weekly Pay ({hpw} hours)</span>
                <span className="font-mono font-semibold text-slate-900">${formatCurrency(weeklyGross)}</span>
              </div>
              <div className="flex justify-between items-center px-4 py-2.5">
                <span className="text-slate-600 font-medium">Bi-Weekly Pay (26 pay periods)</span>
                <span className="font-mono font-semibold text-slate-900">${formatCurrency(biweeklyGross)}</span>
              </div>
              <div className="flex justify-between items-center px-4 py-2.5 bg-slate-50/50">
                <span className="text-slate-600 font-medium">Monthly Pay (12 pay periods)</span>
                <span className="font-mono font-semibold text-slate-900">${formatCurrency(monthlyGross)}</span>
              </div>
              <div className="flex justify-between items-center px-4 py-2.5">
                <span className="text-slate-600 font-medium">Annual Gross Salary</span>
                <span className="font-mono font-bold text-slate-900">${formatCurrency(salary)}</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bottom Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          id="btn-reset-salary"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Defaults
        </button>
        <span className="text-xs text-slate-400">
          Evaluated instantly in your browser
        </span>
      </div>
    </div>
  );
};
