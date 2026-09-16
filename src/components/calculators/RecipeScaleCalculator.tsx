import React, { useState } from 'react';
import { CalculatorCard, FormField, ResultBox } from '../CalculatorCard';
import { calculateRecipeScale } from '../../lib/calculators/recipeScale';

export const RecipeScaleCalculator: React.FC = () => {
  const [originalServings, setOriginalServings] = useState<string>('4');
  const [desiredServings, setDesiredServings] = useState<string>('6');
  const [ingredientQuantity, setIngredientQuantity] = useState<string>('2.5');
  const [unitLabel, setUnitLabel] = useState<string>('cups');

  const handleReset = () => {
    setOriginalServings('4');
    setDesiredServings('6');
    setIngredientQuantity('2.5');
    setUnitLabel('cups');
  };

  const result = calculateRecipeScale({
    originalServings,
    desiredServings,
    ingredientQuantity,
    unitLabel,
  });

  return (
    <CalculatorCard
      title="Recipe Yield & Portion Scaler"
      description="Scale recipe ingredients up or down precisely based on your target number of servings."
      onReset={handleReset}
      errorMessage={result.errorMessage}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              id="orig-servings"
              label="Original Servings"
              helperText="Yield stated in the recipe."
            >
              <input
                id="orig-servings"
                type="number"
                min="0.5"
                step="0.5"
                value={originalServings}
                onChange={(e) => setOriginalServings(e.target.value)}
                placeholder="4"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>

            <FormField
              id="desired-servings"
              label="Desired Servings"
              helperText="Portions you want to make."
            >
              <input
                id="desired-servings"
                type="number"
                min="0.5"
                step="0.5"
                value={desiredServings}
                onChange={(e) => setDesiredServings(e.target.value)}
                placeholder="6"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>
          </div>

          {/* Quick multiplier presets */}
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Quick Scaling Presets (Based on {originalServings || '4'} Servings)
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { factor: 0.5, label: 'Half (0.5×)' },
                { factor: 1.5, label: '1.5× Yield' },
                { factor: 2, label: 'Double (2×)' },
                { factor: 3, label: 'Triple (3×)' },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    const orig = parseFloat(originalServings) || 4;
                    setDesiredServings((orig * p.factor).toString());
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <FormField
                id="ingredient-qty"
                label="Ingredient Amount"
                helperText="Decimals or fractions supported (e.g. 2.5, 3/4, or 1 1/2)."
              >
                <input
                  id="ingredient-qty"
                  type="text"
                  inputMode="decimal"
                  value={ingredientQuantity}
                  onChange={(e) => setIngredientQuantity(e.target.value)}
                  placeholder="2.5 or 1 1/2"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
                />
              </FormField>
            </div>

            <div>
              <FormField id="unit-label" label="Unit" helperText="e.g. cups, grams, tbsp">
                <input
                  id="unit-label"
                  type="text"
                  value={unitLabel}
                  onChange={(e) => setUnitLabel(e.target.value)}
                  placeholder="cups"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* Results Box */}
        <div className="lg:col-span-6">
          <ResultBox
            primaryLabel="Scaled Ingredient Amount"
            primaryValue={
              result.errorMessage
                ? '—'
                : `${result.formattedAdjusted} ${unitLabel}`.trim()
            }
            subValue={
              result.errorMessage
                ? undefined
                : result.fractionApprox && result.fractionApprox !== result.formattedAdjusted
                ? `Kitchen fraction: approx. ${result.fractionApprox} ${unitLabel}`.trim()
                : `Scaling factor: ${result.scaleFactor.toFixed(3)}×`
            }
            secondaryMetrics={
              result.errorMessage
                ? []
                : [
                    {
                      label: 'Scale Multiplier',
                      value: `${result.scaleFactor.toFixed(3)}×`,
                      hint: `${desiredServings} ÷ ${originalServings}`,
                    },
                    {
                      label: 'Original Quantity',
                      value: `${ingredientQuantity} ${unitLabel}`.trim(),
                      hint: `For ${originalServings} servings`,
                    },
                    {
                      label: 'Adjusted Yield',
                      value: `${desiredServings} Servings`,
                      hint: 'Target portion batch',
                    },
                    {
                      label: 'Fraction Approx.',
                      value: result.fractionApprox ? `~${result.fractionApprox}` : 'Exact decimal',
                      hint: 'For kitchen measuring spoons',
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
