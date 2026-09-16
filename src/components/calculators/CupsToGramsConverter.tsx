import React, { useState } from 'react';
import { CalculatorCard, FormField, ResultBox } from '../CalculatorCard';
import {
  calculateCupsToGrams,
  INGREDIENT_DENSITIES,
} from '../../lib/calculators/cupsToGrams';

export const CupsToGramsConverter: React.FC = () => {
  const [ingredientId, setIngredientId] = useState<string>('all_purpose_flour');
  const [cups, setCups] = useState<string>('2');

  const handleReset = () => {
    setIngredientId('all_purpose_flour');
    setCups('2');
  };

  const result = calculateCupsToGrams({ ingredientId, cups });

  return (
    <CalculatorCard
      title="Cups to Grams Ingredient Converter"
      description="Convert baking recipe cups to grams and ounces based on true ingredient densities."
      onReset={handleReset}
      errorMessage={result.errorMessage}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <label htmlFor="ingredient-select" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Select Baking Ingredient
            </label>
            <select
              id="ingredient-select"
              value={ingredientId}
              onChange={(e) => setIngredientId(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-base font-medium bg-white"
            >
              {INGREDIENT_DENSITIES.map((ing) => (
                <option key={ing.id} value={ing.id}>
                  {ing.name} (~{ing.gramsPerCup}g/cup)
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-1">{result.ingredient.description}</p>
          </div>

          <FormField
            id="cup-amount"
            label="Number of Cups"
            helperText="Support fractions or decimals (e.g. 1/2, 3/4, 1 1/2, or 2)."
          >
            <input
              id="cup-amount"
              type="text"
              inputMode="decimal"
              value={cups}
              onChange={(e) => setCups(e.target.value)}
              placeholder="e.g. 2 or 1/2"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
            />
          </FormField>

          {/* Quick Cup Presets */}
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Common Kitchen Measures
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { c: '0.25', label: '1/4 Cup' },
                { c: '0.333', label: '1/3 Cup' },
                { c: '0.5', label: '1/2 Cup' },
                { c: '0.75', label: '3/4 Cup' },
                { c: '1', label: '1 Cup' },
                { c: '2', label: '2 Cups' },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setCups(p.c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    cups === p.c
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Measuring Technique Advice */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
            <strong className="block font-semibold text-slate-900 mb-1">Baker's Density Note:</strong>
            {result.ingredient.measuringTip}
          </div>
        </div>

        {/* Results Box */}
        <div className="lg:col-span-6">
          <ResultBox
            primaryLabel="Estimated Weight"
            primaryValue={
              result.errorMessage ? '—' : `${result.formattedGrams} Grams`
            }
            subValue={
              result.errorMessage
                ? undefined
                : `Equivalent to ${result.formattedOunces} oz for ${cups} cups of ${result.ingredient.name}`
            }
            secondaryMetrics={
              result.errorMessage
                ? []
                : [
                    {
                      label: 'Metric Grams',
                      value: `${result.formattedGrams} g`,
                      hint: 'Precision scale measure',
                    },
                    {
                      label: 'Ounces (Weight)',
                      value: `${result.formattedOunces} oz`,
                      hint: 'Dry weight (avoirdupois)',
                    },
                    {
                      label: 'Reference Density',
                      value: `${result.ingredient.gramsPerCup} g/cup`,
                      hint: 'Spooned and leveled',
                    },
                    {
                      label: 'Pounds Equivalent',
                      value: `${(result.grams / 453.592).toFixed(2)} lbs`,
                      hint: '1 lb = 453.6 grams',
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
