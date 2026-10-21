import React, { useState } from 'react';
import { CalculatorCard, FormField, ResultBox } from '../CalculatorCard';
import {
  calculateCupsToGrams,
  INGREDIENT_DENSITIES,
  ConversionMode,
} from '../../lib/calculators/cupsToGrams';
import { Scale, AlertTriangle, ArrowRightLeft } from 'lucide-react';

export const CupsToGramsConverter: React.FC = () => {
  const [mode, setMode] = useState<ConversionMode>('cups_to_grams');
  const [ingredientId, setIngredientId] = useState<string>('all_purpose_flour');
  const [cups, setCups] = useState<string>('2');
  const [gramsInput, setGramsInput] = useState<string>('240');

  const handleReset = () => {
    setMode('cups_to_grams');
    setIngredientId('all_purpose_flour');
    setCups('2');
    setGramsInput('240');
  };

  const result = calculateCupsToGrams({
    ingredientId,
    cups,
    gramsInput,
    mode,
  });

  return (
    <CalculatorCard
      title="Cups to Grams Baking Ingredient Converter"
      description="Convert recipe cup volumes to weight in grams and ounces using verified density tables from King Arthur Baking & USDA."
      onReset={handleReset}
      errorMessage={result.errorMessage}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* Conversion Direction Toggle */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl w-fit">
            <button
              type="button"
              onClick={() => setMode('cups_to_grams')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === 'cups_to_grams' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cups → Grams
            </button>
            <button
              type="button"
              onClick={() => setMode('grams_to_cups')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === 'grams_to_cups' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Grams → Cups
            </button>
          </div>

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
                  {ing.name} (~{ing.gramsPerCup}g / US cup)
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500 mt-1">{result.ingredient.description}</p>
          </div>

          {mode === 'cups_to_grams' ? (
            <>
              <FormField
                id="cup-amount"
                label="Number of Cups"
                helperText="Supports fractions or decimals (e.g. 1/4, 1/3, 1/2, 3/4, 1 1/2, or 2)."
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
            </>
          ) : (
            <FormField
              id="gram-amount"
              label="Weight in Grams"
              suffix="grams"
              helperText="Enter measured or target gram weight (e.g. 250g, 500g)."
            >
              <input
                id="gram-amount"
                type="number"
                min="1"
                step="5"
                value={gramsInput}
                onChange={(e) => setGramsInput(e.target.value)}
                placeholder="240"
                className="w-full rounded-xl border border-slate-300 pl-4 pr-16 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>
          )}

          {/* Measuring Technique Callout: Spooned & Leveled vs Scooped */}
          <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs text-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-amber-950">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Critical Measuring Technique: Spooned vs. Scooped</span>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-white/90 p-2.5 rounded-lg border border-amber-100">
                <p className="font-bold text-emerald-800">✓ Spooned & Leveled</p>
                <p className="font-mono text-xs text-slate-900 mt-0.5">~120g / cup</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Fluffed with a fork, spooned lightly into cup, and leveled with a knife. Recipe standard.
                </p>
              </div>
              <div className="bg-white/90 p-2.5 rounded-lg border border-amber-100">
                <p className="font-bold text-red-700">✗ Dipped & Scooped</p>
                <p className="font-mono text-xs text-slate-900 mt-0.5">~140–150g / cup</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Dipping the cup directly into the flour bag compacts it by 20–25%, causing dry, tough baked goods.
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-600">
              Source: {result.ingredient.sourceAttribution}.
            </p>
          </div>
        </div>

        {/* Results Box */}
        <div className="lg:col-span-6 space-y-6">
          <ResultBox
            primaryLabel={mode === 'cups_to_grams' ? 'Calculated Weight' : 'Calculated Volume'}
            primaryValue={
              result.errorMessage
                ? '—'
                : mode === 'cups_to_grams'
                ? `${result.formattedGrams} Grams`
                : `${result.formattedCups} Cups`
            }
            subValue={
              result.errorMessage
                ? undefined
                : mode === 'cups_to_grams'
                ? `Equivalent to ${result.formattedOunces} oz for ${cups} cups of ${result.ingredient.name}`
                : `Equivalent to ${result.formattedGrams}g (${result.formattedOunces} oz) of ${result.ingredient.name}`
            }
            secondaryMetrics={
              result.errorMessage
                ? []
                : [
                    {
                      label: 'Metric Grams',
                      value: `${result.formattedGrams} g`,
                      hint: 'Kitchen digital scale',
                    },
                    {
                      label: 'Ounces (Weight)',
                      value: `${result.formattedOunces} oz`,
                      hint: 'Avoirdupois dry ounces',
                    },
                    {
                      label: 'Standard Reference',
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

          {/* Baker's Scale Trade Insight */}
          {!result.errorMessage && (
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs sm:text-sm space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Scale className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Why Professional Pastry Chefs Use Weight</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Volume measuring cups are inherently imprecise for compressible dry goods like flour, cocoa, and brown sugar. Humidity, particle settling, and scooping force can alter cup weight by more than 25%. Weighing ingredients directly into the mixing bowl eliminates measuring cups, guarantees consistent recipe crumb structure, and speeds up kitchen cleanup.
              </p>
            </div>
          )}
        </div>
      </div>
    </CalculatorCard>
  );
};
