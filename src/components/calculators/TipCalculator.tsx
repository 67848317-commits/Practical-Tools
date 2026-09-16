import React, { useState } from 'react';
import { RotateCcw, AlertCircle, Plus, Minus, CheckCircle2 } from 'lucide-react';

export const TipCalculator: React.FC = () => {
  const [billAmount, setBillAmount] = useState<string>('68.50');
  const [tipPercent, setTipPercent] = useState<number>(18);
  const [customTip, setCustomTip] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [peopleCountInput, setPeopleCountInput] = useState<string>('2');
  const [roundUp, setRoundUp] = useState<boolean>(false);

  const handleReset = () => {
    setBillAmount('68.50');
    setTipPercent(18);
    setCustomTip('');
    setIsCustom(false);
    setPeopleCountInput('2');
    setRoundUp(false);
  };

  const bill = parseFloat(billAmount);
  const activeTipPct = isCustom ? parseFloat(customTip) || 0 : tipPercent;
  const peopleCount = parseInt(peopleCountInput, 10);

  let errorMsg = '';
  if (billAmount.trim() === '' || isNaN(bill) || bill < 0) {
    errorMsg = 'Please enter a valid positive bill total.';
  } else if (isCustom && (customTip.trim() === '' || isNaN(activeTipPct) || activeTipPct < 0 || activeTipPct > 200)) {
    errorMsg = 'Tip percentage must be a valid number between 0% and 200%.';
  } else if (isNaN(peopleCount) || peopleCount < 1) {
    errorMsg = 'Number of people must be at least 1.';
  }

  // Formulas strictly as specified:
  // Tip amount = Bill amount × Tip percentage / 100
  // Total bill = Bill amount + Tip amount
  // Amount per person = Total bill / Number of people
  let tipAmount = !errorMsg ? (bill * activeTipPct) / 100 : 0;
  let totalBill = !errorMsg ? bill + tipAmount : 0;

  // Optional round up option
  if (roundUp && totalBill > 0) {
    const roundedTotal = Math.ceil(totalBill);
    tipAmount = roundedTotal - bill;
    totalBill = roundedTotal;
  }

  const amountPerPerson = !errorMsg && peopleCount > 0 ? totalBill / peopleCount : 0;
  const tipPerPerson = !errorMsg && peopleCount > 0 ? tipAmount / peopleCount : 0;

  const formatCurrency = (val: number) =>
    val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculationSteps = !errorMsg
    ? [
        `Tip amount = $${formatCurrency(bill)} × ${activeTipPct}% ÷ 100 = $${formatCurrency(tipAmount)}`,
        `Total bill = $${formatCurrency(bill)} + $${formatCurrency(tipAmount)} = $${formatCurrency(totalBill)}`,
        `Amount per person = $${formatCurrency(totalBill)} ÷ ${peopleCount} = $${formatCurrency(amountPerPerson)} per person`,
      ]
    : [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs" id="tip-calculator-widget">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* 1. Bill Amount */}
        <div>
          <label htmlFor="bill-amount" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Bill Amount ($)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold" aria-hidden="true">$</span>
            <input
              id="bill-amount"
              type="number"
              min="0"
              step="any"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="0.00"
              aria-label="Bill amount in dollars"
            />
          </div>
        </div>

        {/* 2. Number of People */}
        <div>
          <label htmlFor="people-count" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Number of People (Split)
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const current = parseInt(peopleCountInput, 10) || 1;
                setPeopleCountInput(String(Math.max(1, current - 1)));
              }}
              disabled={peopleCount <= 1}
              className="p-2.5 border border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 disabled:opacity-40 text-slate-700 transition-colors"
              aria-label="Decrease guest count"
            >
              <Minus className="w-4 h-4" />
            </button>
            <div className="flex-1 relative">
              <input
                id="people-count"
                type="number"
                min="1"
                max="100"
                value={peopleCountInput}
                onChange={(e) => setPeopleCountInput(e.target.value)}
                className="w-full text-center py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base font-semibold focus:bg-white focus:border-blue-600 focus:outline-none"
                aria-label="Number of people sharing the bill"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                const current = parseInt(peopleCountInput, 10) || 1;
                setPeopleCountInput(String(current + 1));
              }}
              className="p-2.5 border border-slate-300 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
              aria-label="Increase guest count"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Tip Percentage Selection */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
          Tip Percentage (%)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {[10, 15, 18, 20].map((pct) => (
            <button
              key={pct}
              type="button"
              aria-pressed={!isCustom && tipPercent === pct}
              onClick={() => {
                setIsCustom(false);
                setTipPercent(pct);
              }}
              className={`py-2 px-3 rounded-lg text-sm font-semibold border transition-all ${
                !isCustom && tipPercent === pct
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {pct}%
            </button>
          ))}
          <div className="relative">
            <input
              type="number"
              min="0"
              max="200"
              step="any"
              placeholder="Custom %"
              value={customTip}
              onFocus={() => setIsCustom(true)}
              onChange={(e) => {
                setIsCustom(true);
                setCustomTip(e.target.value);
              }}
              className={`w-full py-2 px-3 rounded-lg text-sm font-semibold border text-center focus:outline-none transition-all ${
                isCustom
                  ? 'bg-white text-slate-900 border-blue-600 ring-1 ring-blue-600'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
              aria-label="Custom tip percentage"
            />
          </div>
        </div>
      </div>

      {/* Round up checkbox */}
      <div className="mb-6">
        <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-slate-700 select-none">
          <input
            type="checkbox"
            checked={roundUp}
            onChange={(e) => setRoundUp(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
          />
          <span>Round up total bill to nearest whole dollar</span>
        </label>
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
        <div className="p-6 rounded-xl bg-slate-900 text-white mb-6" aria-live="polite">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
            {/* Output 1: Tip Amount */}
            <div>
              <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
                Tip Amount
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white break-words">
                ${formatCurrency(tipAmount)}
              </div>
              <span className="text-xs text-slate-400 mt-1 block">
                {activeTipPct}% of ${formatCurrency(bill)}
              </span>
            </div>

            {/* Output 2: Total Bill */}
            <div className="sm:border-l sm:border-slate-800 sm:pl-6">
              <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
                Total Bill
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white break-words">
                ${formatCurrency(totalBill)}
              </div>
              <span className="text-xs text-slate-400 mt-1 block">
                Check (${formatCurrency(bill)}) + Tip
              </span>
            </div>

            {/* Output 3: Amount Per Person */}
            <div className="sm:border-l sm:border-slate-800 sm:pl-6">
              <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
                Amount Per Person
              </span>
              <div className="text-3xl sm:text-4xl font-bold font-mono text-emerald-400 break-words">
                ${formatCurrency(amountPerPerson)}
              </div>
              <span className="text-xs text-emerald-400 font-medium mt-1 block">
                (${formatCurrency(tipPerPerson)} tip per person)
              </span>
            </div>
          </div>

          {/* Arithmetic Breakdown */}
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
          id="btn-reset-tip"
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
