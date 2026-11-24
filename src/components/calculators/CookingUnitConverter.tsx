import React, { useState } from 'react';
import { CalculatorCard, FormField, ResultBox } from '../CalculatorCard';
import {
  calculateCookingConverter,
  COOKING_UNITS,
  CookingVolumeUnit,
} from '../../lib/calculators/cookingConverter';

export const CookingUnitConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>('2');
  const [fromUnit, setFromUnit] = useState<CookingVolumeUnit>('cup');
  const [toUnit, setToUnit] = useState<CookingVolumeUnit>('tablespoon');

  const handleReset = () => {
    setAmount('2');
    setFromUnit('cup');
    setToUnit('tablespoon');
  };

  const result = calculateCookingConverter({ amount, fromUnit, toUnit });

  return (
    <CalculatorCard
      title="Cooking Volume & Unit Converter"
      description="Convert liquid volume between kitchen teaspoons, tablespoons, fluid ounces, cups, pints, quarts, liters, and milliliters."
      onReset={handleReset}
      errorMessage={result.errorMessage}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls */}
        <div className="lg:col-span-6 space-y-6">
          <FormField
            id="cooking-amount"
            label="Volume Amount"
            helperText="Quantity to convert."
          >
            <input
              id="cooking-amount"
              type="number"
              min="0"
              step="0.25"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="2"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="from-unit" className="block text-sm font-semibold text-slate-700 mb-1.5">
                From Unit
              </label>
              <select
                id="from-unit"
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value as CookingVolumeUnit)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base font-medium bg-white"
              >
                {COOKING_UNITS.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.plural} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="to-unit" className="block text-sm font-semibold text-slate-700 mb-1.5">
                To Target Unit
              </label>
              <select
                id="to-unit"
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value as CookingVolumeUnit)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base font-medium bg-white"
              >
                {COOKING_UNITS.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.plural} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Volume Swaps */}
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Common Kitchen Conversions
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { from: 'cup' as CookingVolumeUnit, to: 'tablespoon' as CookingVolumeUnit, label: 'Cups to Tbsp' },
                { from: 'tablespoon' as CookingVolumeUnit, to: 'teaspoon' as CookingVolumeUnit, label: 'Tbsp to Tsp' },
                { from: 'cup' as CookingVolumeUnit, to: 'milliliter' as CookingVolumeUnit, label: 'Cups to mL' },
                { from: 'quart' as CookingVolumeUnit, to: 'cup' as CookingVolumeUnit, label: 'Quarts to Cups' },
                { from: 'fluid_ounce' as CookingVolumeUnit, to: 'milliliter' as CookingVolumeUnit, label: 'Fl Oz to mL' },
              ].map((pair) => (
                <button
                  key={pair.label}
                  type="button"
                  onClick={() => {
                    setFromUnit(pair.from);
                    setToUnit(pair.to);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                >
                  {pair.label}
                </button>
              ))}
            </div>
          </div>

          {/* Volume vs Weight Disclaimer */}
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
            <strong className="block font-semibold mb-0.5">Liquid Volume vs. Dry Weight Notice:</strong>
            This tool converts <em>fluid volume</em> using US customary ratios (1 US customary cup = 236.6 mL; FDA legal cup = 240 mL; metric cup = 250 mL). Dry ingredients (such as flour or sugar) vary by density and require weight conversion (see our Cups to Grams Converter).
          </div>
        </div>

        {/* Results Box */}
        <div className="lg:col-span-6">
          <ResultBox
            primaryLabel="Converted Kitchen Volume"
            primaryValue={result.errorMessage ? '—' : result.formattedResult}
            subValue={
              result.errorMessage
                ? undefined
                : `${amount} ${result.fromUnit.plural} = ${result.formattedResult}`
            }
            secondaryMetrics={
              result.errorMessage
                ? []
                : [
                    {
                      label: 'In Milliliters (mL)',
                      value: `${(result.amount * result.fromUnit.mlPerUnit).toFixed(1)} mL`,
                      hint: 'Metric standard',
                    },
                    {
                      label: 'In Fluid Ounces',
                      value: `${((result.amount * result.fromUnit.mlPerUnit) / 29.5735).toFixed(2)} fl oz`,
                      hint: 'US fluid ounces',
                    },
                    {
                      label: 'In Tablespoons',
                      value: `${((result.amount * result.fromUnit.mlPerUnit) / 14.7868).toFixed(1)} tbsp`,
                      hint: '1 tbsp = 3 tsp',
                    },
                    {
                      label: 'In US Cups',
                      value: `${((result.amount * result.fromUnit.mlPerUnit) / 236.588).toFixed(2)} cups`,
                      hint: '1 cup = 8 fl oz',
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
