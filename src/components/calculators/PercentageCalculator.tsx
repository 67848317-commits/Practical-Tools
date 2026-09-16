import React, { useState } from 'react';
import { RotateCcw, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

type Mode = 'percent_of' | 'is_what_percent' | 'change';

export const PercentageCalculator: React.FC = () => {
  const [mode, setMode] = useState<Mode>('percent_of');

  // Mode 1: What is X% of Y?
  const [m1Percent, setM1Percent] = useState<string>('15');
  const [m1Value, setM1Value] = useState<string>('240');

  // Mode 2: X is what percent of Y?
  const [m2Part, setM2Part] = useState<string>('36');
  const [m2Whole, setM2Whole] = useState<string>('180');

  // Mode 3: Percentage change from X to Y
  const [m3Initial, setM3Initial] = useState<string>('50');
  const [m3Final, setM3Final] = useState<string>('75');

  const handleReset = () => {
    setM1Percent('15');
    setM1Value('240');
    setM2Part('36');
    setM2Whole('180');
    setM3Initial('50');
    setM3Final('75');
  };

  // Calculations & Validations
  let resultText = '';
  let subResult = '';
  let calculationSteps: string[] = [];
  let errorMsg = '';

  if (mode === 'percent_of') {
    const p = parseFloat(m1Percent);
    const v = parseFloat(m1Value);
    if (m1Percent.trim() === '' || m1Value.trim() === '' || isNaN(p) || isNaN(v)) {
      errorMsg = 'Please enter valid numerical values for both percentage and base value.';
    } else {
      const res = (p / 100) * v;
      // Format cleanly (e.g. max 4 decimal digits, or 2 for currency-like)
      const formattedRes = Number.isInteger(res)
        ? res.toLocaleString()
        : res.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 }).replace(/\.?0+$/, '');
      resultText = formattedRes;
      subResult = `${p}% of ${v.toLocaleString()} is ${formattedRes}`;
      calculationSteps = [
        `Convert percentage to decimal: ${p} ÷ 100 = ${(p / 100).toFixed(4).replace(/\.?0+$/, '')}`,
        `Multiply decimal by value: ${(p / 100).toFixed(4).replace(/\.?0+$/, '')} × ${v.toLocaleString()} = ${formattedRes}`,
      ];
    }
  } else if (mode === 'is_what_percent') {
    const part = parseFloat(m2Part);
    const whole = parseFloat(m2Whole);
    if (m2Part.trim() === '' || m2Whole.trim() === '' || isNaN(part) || isNaN(whole)) {
      errorMsg = 'Please enter valid numbers for both part and whole values.';
    } else if (whole === 0) {
      errorMsg = 'Whole value (denominator) cannot be zero.';
    } else {
      const res = (part / whole) * 100;
      const formattedRes = Number.isInteger(res) ? res.toString() : res.toFixed(2).replace(/\.?0+$/, '');
      resultText = `${formattedRes}%`;
      subResult = `${part.toLocaleString()} is ${formattedRes}% of ${whole.toLocaleString()}`;
      calculationSteps = [
        `Divide part by whole: ${part.toLocaleString()} ÷ ${whole.toLocaleString()} = ${(part / whole).toFixed(4).replace(/\.?0+$/, '')}`,
        `Multiply by 100 to get percent: ${(part / whole).toFixed(4).replace(/\.?0+$/, '')} × 100 = ${formattedRes}%`,
      ];
    }
  } else if (mode === 'change') {
    const init = parseFloat(m3Initial);
    const fin = parseFloat(m3Final);
    if (m3Initial.trim() === '' || m3Final.trim() === '' || isNaN(init) || isNaN(fin)) {
      errorMsg = 'Please enter valid numbers for both starting and final values.';
    } else if (init === 0) {
      errorMsg = 'Starting baseline value cannot be zero when calculating relative percentage change.';
    } else {
      const diff = fin - init;
      const pct = (diff / Math.abs(init)) * 100;
      const formattedPct = Number.isInteger(pct) ? pct.toString() : pct.toFixed(2).replace(/\.?0+$/, '');
      const isIncrease = diff > 0;
      const isZero = diff === 0;

      resultText = isZero ? '0%' : `${isIncrease ? '+' : ''}${formattedPct}%`;
      subResult = isZero
        ? 'No change between starting and final value.'
        : `${isIncrease ? 'Increase' : 'Decrease'} of ${Math.abs(Number(formattedPct))}% (Difference: ${diff > 0 ? '+' : ''}${diff.toLocaleString()})`;
      calculationSteps = [
        `Calculate absolute difference: ${fin.toLocaleString()} - ${init.toLocaleString()} = ${diff.toLocaleString()}`,
        `Divide difference by starting value: ${diff.toLocaleString()} ÷ ${Math.abs(init).toLocaleString()} = ${(diff / Math.abs(init)).toFixed(4)}`,
        `Multiply by 100: ${(diff / Math.abs(init)).toFixed(4)} × 100 = ${formattedPct}%`,
      ];
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs" id="percentage-calculator-widget">
      {/* Mode Selector Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100/80 rounded-xl mb-6 text-xs sm:text-sm font-medium">
        <button
          type="button"
          aria-pressed={mode === 'percent_of'}
          onClick={() => setMode('percent_of')}
          className={`flex-1 py-2 px-3 rounded-lg text-center transition-all ${
            mode === 'percent_of'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          What is X% of Y?
        </button>
        <button
          type="button"
          aria-pressed={mode === 'is_what_percent'}
          onClick={() => setMode('is_what_percent')}
          className={`flex-1 py-2 px-3 rounded-lg text-center transition-all ${
            mode === 'is_what_percent'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          X is what % of Y?
        </button>
        <button
          type="button"
          aria-pressed={mode === 'change'}
          onClick={() => setMode('change')}
          className={`flex-1 py-2 px-3 rounded-lg text-center transition-all ${
            mode === 'change'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          % Change (Increase / Decrease)
        </button>
      </div>

      {/* Input Fields based on active Mode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        {mode === 'percent_of' && (
          <>
            <div>
              <label htmlFor="m1-percent" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Percentage (%)
              </label>
              <div className="relative">
                <input
                  id="m1-percent"
                  type="number"
                  step="any"
                  value={m1Percent}
                  onChange={(e) => setM1Percent(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="e.g. 15"
                />
                <span className="absolute right-3.5 top-2.5 text-slate-400 font-semibold">%</span>
              </div>
            </div>

            <div>
              <label htmlFor="m1-value" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Of Value (Number)
              </label>
              <input
                id="m1-value"
                type="number"
                step="any"
                value={m1Value}
                onChange={(e) => setM1Value(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="e.g. 240"
              />
            </div>
          </>
        )}

        {mode === 'is_what_percent' && (
          <>
            <div>
              <label htmlFor="m2-part" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Part Value (X)
              </label>
              <input
                id="m2-part"
                type="number"
                step="any"
                value={m2Part}
                onChange={(e) => setM2Part(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="e.g. 36"
              />
            </div>

            <div>
              <label htmlFor="m2-whole" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Whole Value (Y)
              </label>
              <input
                id="m2-whole"
                type="number"
                step="any"
                value={m2Whole}
                onChange={(e) => setM2Whole(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="e.g. 180"
              />
            </div>
          </>
        )}

        {mode === 'change' && (
          <>
            <div>
              <label htmlFor="m3-initial" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Initial / Starting Value (From)
              </label>
              <input
                id="m3-initial"
                type="number"
                step="any"
                value={m3Initial}
                onChange={(e) => setM3Initial(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="e.g. 50"
              />
            </div>

            <div>
              <label htmlFor="m3-final" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Final / New Value (To)
              </label>
              <input
                id="m3-final"
                type="number"
                step="any"
                value={m3Final}
                onChange={(e) => setM3Final(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="e.g. 75"
              />
            </div>
          </>
        )}
      </div>

      {/* Error or Result Display */}
      {errorMsg ? (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 mb-6" role="alert">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold">Unable to calculate</p>
            <p className="text-amber-800 text-xs mt-0.5">{errorMsg}</p>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-xl bg-slate-900 text-white mb-6" aria-live="polite">
          <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
            Calculated Result
          </span>
          <div className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight break-words">
            {resultText}
          </div>
          <div className="text-sm text-emerald-400 font-medium mt-1">
            {subResult}
          </div>

          {/* Steps */}
          {calculationSteps.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-800 space-y-1 text-xs text-slate-300 font-mono">
              <span className="text-[11px] uppercase tracking-wider text-slate-500 block mb-1 font-sans">
                Arithmetic Breakdown:
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
      )}

      {/* Bottom Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          id="btn-reset-percentage"
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
