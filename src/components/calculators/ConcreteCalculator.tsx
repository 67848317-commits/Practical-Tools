import React, { useState } from 'react';
import { CalculatorCard, FormField, ResultBox } from '../CalculatorCard';
import { calculateConcrete } from '../../lib/calculators/concrete';

export const ConcreteCalculator: React.FC = () => {
  const [lengthFeet, setLengthFeet] = useState<string>('20');
  const [widthFeet, setWidthFeet] = useState<string>('10');
  const [depthInches, setDepthInches] = useState<string>('4');
  const [wastePercent, setWastePercent] = useState<string>('10');

  const handleReset = () => {
    setLengthFeet('20');
    setWidthFeet('10');
    setDepthInches('4');
    setWastePercent('10');
  };

  const result = calculateConcrete({
    lengthFeet,
    widthFeet,
    depthInches,
    wastePercent,
  });

  const fmt = (v: number, dec: number = 2) =>
    v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  return (
    <CalculatorCard
      title="Concrete Slab & Volume Calculator"
      description="Calculate cubic yards of ready-mix concrete and bagged premix required for slabs, patios, and footings."
      onReset={handleReset}
      errorMessage={result.errorMessage}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField id="concrete-length" label="Slab Length (Feet)">
              <input
                id="concrete-length"
                type="number"
                min="0.5"
                step="0.5"
                value={lengthFeet}
                onChange={(e) => setLengthFeet(e.target.value)}
                placeholder="20"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>

            <FormField id="concrete-width" label="Slab Width (Feet)">
              <input
                id="concrete-width"
                type="number"
                min="0.5"
                step="0.5"
                value={widthFeet}
                onChange={(e) => setWidthFeet(e.target.value)}
                placeholder="10"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>
          </div>

          <FormField
            id="concrete-depth"
            label="Slab Depth (Inches)"
            suffix="in"
            helperText="4 inches standard for walkways and patios; 5-6 inches for vehicle driveways."
          >
            <input
              id="concrete-depth"
              type="number"
              min="1"
              step="0.5"
              value={depthInches}
              onChange={(e) => setDepthInches(e.target.value)}
              placeholder="4"
              className="w-full rounded-xl border border-slate-300 pl-4 pr-9 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
            />
          </FormField>

          {/* Quick Depth Presets */}
          <div className="flex flex-wrap gap-2">
            {[
              { d: '4', label: '4" (Walkway/Patio)' },
              { d: '5', label: '5" (Light Driveway)' },
              { d: '6', label: '6" (Heavy Driveway)' },
              { d: '8', label: '8" (Commercial)' },
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

          <FormField
            id="concrete-waste"
            label="Safety Buffer / Waste Factor"
            suffix="%"
            helperText="Contractors recommend adding 10% to account for uneven grade, soil settlement, and form deflection."
          >
            <input
              id="concrete-waste"
              type="number"
              min="0"
              max="50"
              step="1"
              value={wastePercent}
              onChange={(e) => setWastePercent(e.target.value)}
              placeholder="10"
              className="w-full rounded-xl border border-slate-300 pl-4 pr-9 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
            />
          </FormField>
        </div>

        {/* Results Box */}
        <div className="lg:col-span-6">
          <ResultBox
            primaryLabel="Recommended Ready-Mix Concrete Order"
            primaryValue={
              result.errorMessage ? '—' : `${fmt(result.recommendedCubicYards, 2)} Yards`
            }
            subValue={
              result.errorMessage
                ? undefined
                : `Exact slab volume: ${fmt(result.volumeCubicYards, 2)} cu yd (${fmt(result.volumeCubicFeet, 1)} cu ft) + ${result.wastePercent}% safety buffer`
            }
            secondaryMetrics={
              result.errorMessage
                ? []
                : [
                    {
                      label: 'Exact Slab Volume',
                      value: `${fmt(result.volumeCubicYards, 2)} cu yd`,
                      hint: `${fmt(result.volumeCubicFeet, 1)} cubic feet`,
                    },
                    {
                      label: 'Surface Area',
                      value: `${fmt(result.surfaceAreaSqFt, 0)} sq ft`,
                      hint: `${lengthFeet} ft × ${widthFeet} ft`,
                    },
                    {
                      label: '80 lb Premix Bags',
                      value: `~${result.bags80lb} Bags`,
                      hint: '0.60 cu ft per bag',
                    },
                    {
                      label: '60 lb Premix Bags',
                      value: `~${result.bags60lb} Bags`,
                      hint: '0.45 cu ft per bag',
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
