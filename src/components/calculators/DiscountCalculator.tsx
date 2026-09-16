import React, { useState } from 'react';
import { RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';

export const DiscountCalculator: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState<string>('89.99');
  const [discountPercent, setDiscountPercent] = useState<string>('25');
  const [salesTaxPercent, setSalesTaxPercent] = useState<string>('0');

  const handleReset = () => {
    setOriginalPrice('89.99');
    setDiscountPercent('25');
    setSalesTaxPercent('0');
  };

  const price = parseFloat(originalPrice);
  const discount = parseFloat(discountPercent);
  const tax = parseFloat(salesTaxPercent) || 0;

  let errorMsg = '';
  if (originalPrice.trim() === '' || isNaN(price) || price < 0) {
    errorMsg = 'Please enter a valid positive original price.';
  } else if (discountPercent.trim() === '' || isNaN(discount) || discount < 0 || discount > 100) {
    errorMsg = 'Discount percentage must be a valid number between 0% and 100%.';
  } else if (tax < 0 || tax > 50) {
    errorMsg = 'Optional sales tax rate must be between 0% and 50%.';
  }

  // Formulas strictly as specified:
  // Discount amount = Original price × Discount percentage / 100
  // Final price = Original price - Discount amount
  const discountAmount = !errorMsg ? (price * discount) / 100 : 0;
  const finalPrice = !errorMsg ? Math.max(0, price - discountAmount) : 0;
  const taxAmount = !errorMsg && tax > 0 ? (finalPrice * tax) / 100 : 0;
  const finalPriceWithTax = finalPrice + taxAmount;

  const formatCurrency = (val: number) =>
    val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculationSteps = !errorMsg
    ? [
        `Calculate discount amount: $${formatCurrency(price)} × ${discount}% ÷ 100 = $${formatCurrency(discountAmount)}`,
        `Calculate final price: $${formatCurrency(price)} - $${formatCurrency(discountAmount)} = $${formatCurrency(finalPrice)}`,
        ...(tax > 0
          ? [`Add sales tax (${tax}%): $${formatCurrency(finalPrice)} + $${formatCurrency(taxAmount)} = $${formatCurrency(finalPriceWithTax)}`]
          : []),
      ]
    : [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs" id="discount-calculator-widget">
      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {/* 1. Original Price */}
        <div>
          <label htmlFor="original-price" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Original Price ($)
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold" aria-hidden="true">$</span>
            <input
              id="original-price"
              type="number"
              min="0"
              step="any"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="89.99"
              aria-label="Original price in dollars"
            />
          </div>
        </div>

        {/* 2. Discount Percentage */}
        <div>
          <label htmlFor="discount-percentage" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Discount Percentage (%)
          </label>
          <div className="relative">
            <input
              id="discount-percentage"
              type="number"
              min="0"
              max="100"
              step="any"
              value={discountPercent}
              onChange={(e) => setDiscountPercent(e.target.value)}
              className="w-full pl-4 pr-9 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="25"
              aria-label="Discount percentage"
            />
            <span className="absolute right-3.5 top-2.5 text-slate-400 font-semibold" aria-hidden="true">%</span>
          </div>
        </div>

        {/* 3. Optional Sales Tax */}
        <div>
          <label htmlFor="sales-tax-percent" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Sales Tax (%) <span className="text-[10px] font-normal text-slate-400 lowercase">(optional)</span>
          </label>
          <div className="relative">
            <input
              id="sales-tax-percent"
              type="number"
              min="0"
              max="50"
              step="any"
              value={salesTaxPercent}
              onChange={(e) => setSalesTaxPercent(e.target.value)}
              className="w-full pl-4 pr-9 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="0"
              aria-label="Sales tax percentage"
            />
            <span className="absolute right-3.5 top-2.5 text-slate-400 font-semibold" aria-hidden="true">%</span>
          </div>
        </div>
      </div>

      {/* Quick Discount Presets */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-slate-500 mr-1">Quick Presets:</span>
        {['10', '15', '20', '25', '30', '40', '50', '75'].map((preset) => (
          <button
            key={preset}
            type="button"
            aria-pressed={discountPercent === preset}
            onClick={() => setDiscountPercent(preset)}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold border transition-colors ${
              discountPercent === preset
                ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {preset}% OFF
          </button>
        ))}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* Output 1: Final Price */}
            <div>
              <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
                Final Price {tax > 0 ? '(With Tax)' : ''}
              </span>
              <div className="text-3xl sm:text-4xl font-bold font-mono text-emerald-400 break-words">
                ${formatCurrency(finalPriceWithTax)}
              </div>
              <span className="text-xs text-slate-400 mt-1 block">
                Original price: ${formatCurrency(price)} {tax > 0 ? `($${formatCurrency(finalPrice)} before tax)` : ''}
              </span>
            </div>

            {/* Output 2: Discount Amount */}
            <div className="sm:border-l sm:border-slate-800 sm:pl-6">
              <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
                Discount Amount (Savings)
              </span>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white break-words">
                ${formatCurrency(discountAmount)}
              </div>
              <span className="text-xs text-emerald-400 font-medium mt-1 block flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                You save {discount}% on this purchase
              </span>
            </div>
          </div>

          {/* Arithmetic Steps */}
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
          id="btn-reset-discount"
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
