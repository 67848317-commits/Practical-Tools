import React, { useState } from 'react';
import { CalculatorCard, FormField, ResultBox } from '../CalculatorCard';
import { calculateFlooring, FlooringUnit } from '../../lib/calculators/flooring';

export const FlooringCalculator: React.FC = () => {
  const [unit, setUnit] = useState<FlooringUnit>('feet');
  const [length, setLength] = useState<string>('18');
  const [width, setWidth] = useState<string>('14');
  const [wastePercent, setWastePercent] = useState<string>('10');
  const [boxSize, setBoxSize] = useState<string>('24');

  const handleReset = () => {
    setUnit('feet');
    setLength('18');
    setWidth('14');
    setWastePercent('10');
    setBoxSize('24');
  };

  const result = calculateFlooring({ unit, length, width, wastePercent, boxSize });

  const fmt = (v: number, dec: number = 1) =>
    v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  const unitLabel = unit === 'feet' ? 'ft' : 'm';
  const areaLabel = result.areaUnit;

  return (
    <CalculatorCard
      title="Flooring Material & Square Footage Calculator"
      description="Calculate net room floor area, recommended extra material for cuts, and required boxes."
      onReset={handleReset}
      errorMessage={result.errorMessage}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* Unit Toggle */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl w-fit">
            <button
              type="button"
              onClick={() => setUnit('feet')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                unit === 'feet' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Feet & Square Feet
            </button>
            <button
              type="button"
              onClick={() => setUnit('meters')}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                unit === 'meters' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Meters & m²
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField id="floor-length" label={`Room Length (${unitLabel})`}>
              <input
                id="floor-length"
                type="number"
                min="0.1"
                step="0.1"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="18"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>

            <FormField id="floor-width" label={`Room Width (${unitLabel})`}>
              <input
                id="floor-width"
                type="number"
                min="0.1"
                step="0.1"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="14"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>
          </div>

          <FormField
            id="waste-percent"
            label="Waste Factor Percentage"
            suffix="%"
            helperText="10% standard straight planks, 15% for diagonal or herringbone patterns."
          >
            <input
              id="waste-percent"
              type="number"
              min="0"
              max="100"
              step="1"
              value={wastePercent}
              onChange={(e) => setWastePercent(e.target.value)}
              placeholder="10"
              className="w-full rounded-xl border border-slate-300 pl-4 pr-9 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
            />
          </FormField>

          {/* Quick preset chips */}
          <div className="flex flex-wrap gap-2">
            {[5, 10, 15, 20].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setWastePercent(preset.toString())}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  wastePercent === preset.toString()
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {preset}% {preset === 10 ? '(Standard)' : preset === 15 ? '(Herringbone)' : ''}
              </button>
            ))}
          </div>

          <FormField
            id="box-coverage"
            label={`Box Coverage (${areaLabel} / box)`}
            helperText="Optional: Found on manufacturer label (typically 20-25 sq ft/box)."
          >
            <input
              id="box-coverage"
              type="number"
              min="1"
              step="0.5"
              value={boxSize}
              onChange={(e) => setBoxSize(e.target.value)}
              placeholder="24"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
            />
          </FormField>
        </div>

        {/* Results Box */}
        <div className="lg:col-span-6">
          <ResultBox
            primaryLabel="Recommended Material Order"
            primaryValue={
              result.errorMessage ? '—' : `${fmt(result.recommendedMaterial, 1)} ${areaLabel}`
            }
            subValue={
              result.errorMessage
                ? undefined
                : `Net floor space: ${fmt(result.basicFloorArea, 1)} ${areaLabel} + ${result.wastePercent}% cut buffer`
            }
            secondaryMetrics={
              result.errorMessage
                ? []
                : [
                    {
                      label: 'Net Room Area',
                      value: `${fmt(result.basicFloorArea, 1)} ${areaLabel}`,
                      hint: 'Length × Width',
                    },
                    {
                      label: 'Cut & Trim Allowance',
                      value: `+${fmt(result.wasteArea, 1)} ${areaLabel}`,
                      hint: `${result.wastePercent}% extra`,
                    },
                    ...(result.boxesNeeded
                      ? [
                          {
                            label: 'Full Boxes Needed',
                            value: `${result.boxesNeeded} Boxes`,
                            hint: `At ${boxSize} ${areaLabel}/box`,
                          },
                        ]
                      : []),
                    {
                      label: 'Order Safety Margin',
                      value: `${result.wastePercent}%`,
                      hint: 'Protects against broken planks',
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
