import React, { useState } from 'react';
import { CalculatorCard, FormField, ResultBox } from '../CalculatorCard';
import { calculateMarkup } from '../../lib/calculators/markup';

export const MarkupCalculator: React.FC = () => {
  const [cost, setCost] = useState<string>('50');
  const [markupPercent, setMarkupPercent] = useState<string>('40');

  const handleReset = () => {
    setCost('50');
    setMarkupPercent('40');
  };

  const result = calculateMarkup({ cost, markupPercent });

  const fmt = (v: number) =>
    v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <CalculatorCard
      title="Product Markup & Price Calculator"
      description="Calculate your selling price, markup profit dollar amount, and gross margin percentage."
      onReset={handleReset}
      errorMessage={result.errorMessage}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls */}
        <div className="lg:col-span-6 space-y-6">
          <FormField
            id="product-cost"
            label="Original Cost (COGS)"
            prefix="$"
            helperText="Direct wholesale cost or material cost per unit."
          >
            <input
              id="product-cost"
              type="number"
              min="0"
              step="0.01"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="50.00"
              className="w-full rounded-xl border border-slate-300 pl-8 pr-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
            />
          </FormField>

          <FormField
            id="markup-percentage"
            label="Markup Percentage"
            suffix="%"
            helperText="Percentage added on top of your original unit cost."
          >
            <input
              id="markup-percentage"
              type="number"
              min="0"
              step="0.1"
              value={markupPercent}
              onChange={(e) => setMarkupPercent(e.target.value)}
              placeholder="40"
              className="w-full rounded-xl border border-slate-300 pl-4 pr-9 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
            />
          </FormField>

          {/* Quick preset chips */}
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Common Markup Presets
            </span>
            <div className="flex flex-wrap gap-2">
              {[25, 35, 50, 75, 100].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setMarkupPercent(preset.toString())}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    markupPercent === preset.toString()
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {preset}% {preset === 100 ? '(Keystone)' : ''}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Box */}
        <div className="lg:col-span-6">
          <ResultBox
            primaryLabel="Recommended Selling Price"
            primaryValue={result.errorMessage ? '—' : `$${fmt(result.sellingPrice)}`}
            subValue={
              result.errorMessage
                ? undefined
                : `Gross profit: $${fmt(result.markupAmount)} per unit`
            }
            secondaryMetrics={
              result.errorMessage
                ? []
                : [
                    {
                      label: 'Unit Markup Amount',
                      value: `$${fmt(result.markupAmount)}`,
                      hint: 'Profit over cost',
                    },
                    {
                      label: 'Gross Profit Margin',
                      value: `${result.grossMarginPercent.toFixed(2)}%`,
                      hint: 'Profit / Selling Price',
                    },
                    {
                      label: 'Original Unit Cost',
                      value: `$${fmt(result.cost)}`,
                      hint: 'Wholesale baseline',
                    },
                    {
                      label: 'Markup Multiplier',
                      value: `${(1 + result.markupPercent / 100).toFixed(2)}×`,
                      hint: 'Price-to-cost ratio',
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
