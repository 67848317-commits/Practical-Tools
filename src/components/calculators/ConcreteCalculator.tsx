import React, { useState } from 'react';
import { CalculatorCard, FormField, ResultBox } from '../CalculatorCard';
import { calculateConcrete } from '../../lib/calculators/concrete';

export const ConcreteCalculator: React.FC = () => {
  const [lengthFeet, setLengthFeet] = useState<string>('20');
  const [widthFeet, setWidthFeet] = useState<string>('10');
  const [depthInches, setDepthInches] = useState<string>('4');
  const [wastePercent, setWastePercent] = useState<string>('10');
  const [selectedBagSize, setSelectedBagSize] = useState<'80' | '60' | '50'>('80');
  const [bagYield, setBagYield] = useState<string>('0.60');

  const handleReset = () => {
    setLengthFeet('20');
    setWidthFeet('10');
    setDepthInches('4');
    setWastePercent('10');
    setSelectedBagSize('80');
    setBagYield('0.60');
  };

  const handleBagSizeChange = (size: '80' | '60' | '50') => {
    setSelectedBagSize(size);
    if (size === '80') setBagYield('0.60');
    else if (size === '60') setBagYield('0.45');
    else setBagYield('0.375');
  };

  const parsedYield = parseFloat(bagYield);
  const activeYield =
    !isNaN(parsedYield) && parsedYield > 0
      ? parsedYield
      : selectedBagSize === '80'
      ? 0.60
      : selectedBagSize === '60'
      ? 0.45
      : 0.375;

  const result = calculateConcrete({
    lengthFeet,
    widthFeet,
    depthInches,
    wastePercent,
    bagYield80lb: selectedBagSize === '80' ? activeYield : undefined,
    bagYield60lb: selectedBagSize === '60' ? activeYield : undefined,
    bagYield50lb: selectedBagSize === '50' ? activeYield : undefined,
  });

  const fmt = (v: number, dec: number = 2) =>
    v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  const selectedBags =
    selectedBagSize === '80'
      ? result.bags80lb
      : selectedBagSize === '60'
      ? result.bags60lb
      : result.bags50lb;

  const selectedWeightLbs =
    selectedBagSize === '80'
      ? result.totalWeightLbs80
      : selectedBagSize === '60'
      ? result.totalWeightLbs60
      : result.totalWeightLbs50;

  const selectedWeightTons =
    selectedBagSize === '80'
      ? result.totalWeightTons80
      : selectedBagSize === '60'
      ? result.totalWeightTons60
      : result.totalWeightTons50;

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

          {/* Bag Size Preference Selector */}
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-2">
              Select Premix Bag Size for Transport Estimation
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { size: '80' as const, label: '80 lb Bag', yield: '0.60 cu ft', note: 'Manufacturer TDS' },
                { size: '60' as const, label: '60 lb Bag', yield: '0.45 cu ft', note: 'Manufacturer TDS' },
                { size: '50' as const, label: '50 lb Bag', yield: '~0.375 cu ft', note: 'Planning Estimate' },
              ].map((b) => (
                <button
                  key={b.size}
                  type="button"
                  onClick={() => handleBagSizeChange(b.size)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedBagSize === b.size
                      ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <p className="text-sm font-bold text-slate-900">{b.label}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{b.yield}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{b.note}</p>
                </button>
              ))}
            </div>

            <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <label htmlFor="concrete-custom-yield" className="block text-xs font-semibold text-slate-700 mb-1">
                Premix Bag Yield (cu ft per bag) — Editable
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="concrete-custom-yield"
                  type="number"
                  min="0.1"
                  max="2.0"
                  step="0.025"
                  value={bagYield}
                  onChange={(e) => setBagYield(e.target.value)}
                  className="w-28 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className="text-xs text-slate-500">
                  cu ft / bag (typical for standard high-strength mix; adjust if your bag label states a different yield)
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              <strong>Yield Attribution:</strong> 80 lb (0.60 cu ft) and 60 lb (0.45 cu ft) yields are standard manufacturer specifications (e.g., QUIKRETE® #1101, Sakrete High-Strength TDS). The 50 lb yield (~0.375 cu ft) is an editable proportional planning estimate (based on ~133 lbs/cu ft aggregate density) because 50 lb bags are not listed on cited commercial premix datasheets. Check your physical bag label for exact yields.
            </p>
          </div>
        </div>

        {/* Results Box */}
        <div className="lg:col-span-6 space-y-6">
          <ResultBox
            primaryLabel="Recommended Ready-Mix Concrete Order"
            primaryValue={
              result.errorMessage ? '—' : `${fmt(result.recommendedCubicYards, 2)} Yards`
            }
            subValue={
              result.errorMessage
                ? undefined
                : `Exact slab volume: ${fmt(result.volumeCubicYards, 2)} cu yd (${fmt(result.volumeCubicFeet, 1)} cu ft) + ${result.wastePercent}% safety buffer (${fmt(result.recommendedCubicFeet, 1)} cu ft total)`
            }
            secondaryMetrics={
              result.errorMessage
                ? []
                : [
                    {
                      label: `${selectedBagSize} lb Bag ${selectedBagSize === '50' ? 'Planning Estimate' : 'Estimate'}`,
                      value: `${selectedBags} Bags`,
                      hint: `${activeYield.toFixed(3)} cu ft yield/bag (${selectedBagSize === '50' ? 'Proportional Estimate' : 'Manufacturer TDS'})`,
                    },
                    {
                      label: 'Total Bagged Weight',
                      value: `${fmt(selectedWeightLbs, 0)} lbs`,
                      hint: `Approx. ${fmt(selectedWeightTons, 2)} US Tons`,
                    },
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
                  ]
            }
            calculationSteps={result.calculationSteps}
          />

          {/* Practical Transport & Logistics Advisory */}
          {!result.errorMessage && result.recommendedCubicYards > 0 && (
            <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl text-slate-800 text-sm space-y-3">
              <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                <span>⚠️</span>
                <span>Practical Transport & Hauling Considerations</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                <strong>Weight Warning:</strong> {selectedBags} bags of {selectedBagSize} lb concrete weigh approximately{' '}
                <strong>{fmt(selectedWeightLbs, 0)} lbs ({fmt(selectedWeightTons, 2)} tons)</strong>.
              </p>
              <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-1.5 leading-relaxed">
                <li>
                  <strong>Verify Vehicle Payload:</strong> Consumer 1/2-ton pickup trucks commonly have payload limits between 1,500 and 2,000 lbs (including driver, fuel, passengers, and cargo). Hauling multiple tons requires multiple trips or a rated utility trailer. Check your vehicle door-jamb <em>Tire and Loading Information</em> placard.
                </li>
                <li>
                  <strong>Bagged vs. Ready-Mix Truck Delivery:</strong> For projects exceeding roughly 1 to 2 cubic yards (approx. 45+ bags of 80 lb concrete), ordering a ready-mix concrete delivery truck eliminates hours of manual batch mixing. However, ready-mix companies often charge "short-load fees" for small orders (e.g. under 3–5 cubic yards). We recommend requesting local delivered quotes to compare total costs against bagged premix.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </CalculatorCard>
  );
};
