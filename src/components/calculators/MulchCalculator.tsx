import React, { useState } from 'react';
import { CalculatorCard, FormField, ResultBox } from '../CalculatorCard';
import { calculateMulch } from '../../lib/calculators/mulch';

export const MulchCalculator: React.FC = () => {
  const [lengthFeet, setLengthFeet] = useState<string>('25');
  const [widthFeet, setWidthFeet] = useState<string>('8');
  const [depthInches, setDepthInches] = useState<string>('3');

  const handleReset = () => {
    setLengthFeet('25');
    setWidthFeet('8');
    setDepthInches('3');
  };

  const result = calculateMulch({ lengthFeet, widthFeet, depthInches });

  const fmt = (v: number, dec: number = 2) =>
    v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  return (
    <CalculatorCard
      title="Mulch & Soil Coverage Calculator"
      description="Calculate cubic yards of bulk mulch or number of standard bags needed for landscaping garden beds."
      onReset={handleReset}
      errorMessage={result.errorMessage}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField id="mulch-length" label="Garden Bed Length (Feet)">
              <input
                id="mulch-length"
                type="number"
                min="0.5"
                step="0.5"
                value={lengthFeet}
                onChange={(e) => setLengthFeet(e.target.value)}
                placeholder="25"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>

            <FormField id="mulch-width" label="Garden Bed Width (Feet)">
              <input
                id="mulch-width"
                type="number"
                min="0.5"
                step="0.5"
                value={widthFeet}
                onChange={(e) => setWidthFeet(e.target.value)}
                placeholder="8"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>
          </div>

          <FormField
            id="mulch-depth"
            label="Mulch Layer Depth (Inches)"
            suffix="in"
            helperText="2-3 inches recommended for moisture retention and weed suppression; 1-2 inches for annual top-dressing."
          >
            <input
              id="mulch-depth"
              type="number"
              min="0.5"
              step="0.5"
              value={depthInches}
              onChange={(e) => setDepthInches(e.target.value)}
              placeholder="3"
              className="w-full rounded-xl border border-slate-300 pl-4 pr-9 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
            />
          </FormField>

          {/* Quick Depth Presets */}
          <div className="flex flex-wrap gap-2">
            {[
              { d: '1.5', label: '1.5" (Freshen up)' },
              { d: '2', label: '2" (Flower beds)' },
              { d: '3', label: '3" (Standard beds)' },
              { d: '4', label: '4" (Weed barrier/trees)' },
            ].map((p) => (
              <button
                key={p.d}
                type="button"
                onClick={() => setDepthInches(p.d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  depthInches === p.d
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Box */}
        <div className="lg:col-span-6">
          <ResultBox
            primaryLabel="Estimated Bulk Mulch"
            primaryValue={result.errorMessage ? '—' : `${fmt(result.cubicYards, 2)} Cubic Yards`}
            subValue={
              result.errorMessage
                ? undefined
                : `Total volume: ${fmt(result.cubicFeet, 1)} cu ft covering ${fmt(result.areaSqFt, 0)} sq ft`
            }
            secondaryMetrics={
              result.errorMessage
                ? []
                : [
                    {
                      label: 'Standard 2 cu ft Bags',
                      value: `${result.bags2CuFt} Bags`,
                      hint: 'Most common garden center bag',
                    },
                    {
                      label: 'Large 3 cu ft Bags',
                      value: `${result.bags3CuFt} Bags`,
                      hint: 'Large contractor bag',
                    },
                    {
                      label: 'Garden Bed Area',
                      value: `${fmt(result.areaSqFt, 0)} sq ft`,
                      hint: `${lengthFeet} ft × ${widthFeet} ft`,
                    },
                    {
                      label: 'Applied Depth',
                      value: `${depthInches} Inches`,
                      hint: 'Evenly spread',
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
