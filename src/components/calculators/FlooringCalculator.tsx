import React, { useState } from 'react';
import { CalculatorCard, FormField, ResultBox } from '../CalculatorCard';
import { calculateFlooring, FlooringUnit, FlooringPattern } from '../../lib/calculators/flooring';
import { Box, Layers, DollarSign } from 'lucide-react';

export const FlooringCalculator: React.FC = () => {
  const [unit, setUnit] = useState<FlooringUnit>('feet');
  const [length, setLength] = useState<string>('18');
  const [width, setWidth] = useState<string>('14');
  const [wastePercent, setWastePercent] = useState<string>('10');
  const [boxSize, setBoxSize] = useState<string>('24');
  const [pricePerUnit, setPricePerUnit] = useState<string>('3.50');
  const [pattern, setPattern] = useState<FlooringPattern>('straight');

  const handleReset = () => {
    setUnit('feet');
    setLength('18');
    setWidth('14');
    setWastePercent('10');
    setBoxSize('24');
    setPricePerUnit('3.50');
    setPattern('straight');
  };

  const handlePatternSelect = (pat: FlooringPattern, pct: string) => {
    setPattern(pat);
    setWastePercent(pct);
  };

  const result = calculateFlooring({
    unit,
    length,
    width,
    wastePercent,
    boxSize,
    pricePerUnit,
    pattern,
  });

  const fmt = (v: number, dec: number = 1) =>
    v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  const unitLabel = unit === 'feet' ? 'ft' : 'm';
  const areaLabel = result.areaUnit;

  return (
    <CalculatorCard
      title="Flooring Material & Square Footage Calculator"
      description="Calculate net room floor area, pattern cut allowances, and exact carton purchasing requirements."
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
              onClick={() => {
                setUnit('feet');
                setLength('18');
                setWidth('14');
                setBoxSize('24');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                unit === 'feet' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Feet & Square Feet
            </button>
            <button
              type="button"
              onClick={() => {
                setUnit('meters');
                setLength('5.5');
                setWidth('4.2');
                setBoxSize('2.2');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                unit === 'meters' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Meters & m²
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField id="floor-length" label={`Room Length (${unitLabel})`}>
              <input
                id="floor-length"
                type="number"
                min="0.1"
                step="0.1"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder={unit === 'feet' ? '18' : '5.5'}
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
                placeholder={unit === 'feet' ? '14' : '4.2'}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>
          </div>

          {/* Installation Pattern Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
              Illustrative Pattern Waste Allowances (Editable)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                {
                  id: 'straight' as const,
                  pct: '10',
                  label: 'Straight Lay (10%)',
                  desc: 'Illustrative allowance for parallel plank layout.',
                },
                {
                  id: 'diagonal' as const,
                  pct: '15',
                  label: 'Diagonal 45° (15%)',
                  desc: 'Illustrative allowance for angled perimeter cuts.',
                },
                {
                  id: 'herringbone' as const,
                  pct: '20',
                  label: 'Herringbone (20%)',
                  desc: 'Illustrative allowance for geometric end-cuts.',
                },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePatternSelect(p.id, p.pct)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    pattern === p.id && wastePercent === p.pct
                      ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <p className="text-xs font-bold text-slate-900">{p.label}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{p.desc}</p>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
              Planning Note: Percentages are illustrative trade planning allowances, not rigid mandates. Actual material waste is not determined solely by pattern: room geometry (alcoves, hallways, non-square corners), plank dimensions, installer experience, and product defect culling all impact material needs. The waste buffer is fully editable below.
            </p>
          </div>

          <FormField
            id="waste-percent"
            label="Custom Waste Buffer"
            suffix="%"
            helperText="Illustrative starting allowances begin around 10% for perimeter cuts, end pieces, and defective planks; adjust higher for diagonal, herringbone, or irregular rooms."
          >
            <input
              id="waste-percent"
              type="number"
              min="0"
              max="100"
              step="1"
              value={wastePercent}
              onChange={(e) => {
                setWastePercent(e.target.value);
                setPattern('custom');
              }}
              placeholder="10"
              className="w-full rounded-xl border border-slate-300 pl-4 pr-9 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              id="box-coverage"
              label={`Box Coverage (${areaLabel} / box)`}
              helperText="Found on manufacturer label (typically 20-25 sq ft)."
            >
              <input
                id="box-coverage"
                type="number"
                min="0.5"
                step="0.5"
                value={boxSize}
                onChange={(e) => setBoxSize(e.target.value)}
                placeholder={unit === 'feet' ? '24' : '2.2'}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>

            <FormField
              id="price-per-unit"
              label={`Material Cost ($ / ${areaLabel})`}
              prefix="$"
              helperText="Optional: for budget projection."
            >
              <input
                id="price-per-unit"
                type="number"
                min="0"
                step="0.25"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                placeholder="3.50"
                className="w-full rounded-xl border border-slate-300 pl-8 pr-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>
          </div>
        </div>

        {/* Results Box */}
        <div className="lg:col-span-6 space-y-6">
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
                      hint: `${length} ${unitLabel} × ${width} ${unitLabel}`,
                    },
                    {
                      label: 'Cut & Waste Allowance',
                      value: `+${fmt(result.wasteArea, 1)} ${areaLabel}`,
                      hint: `${result.wastePercent}% extra for layout`,
                    },
                    ...(result.boxesNeeded
                      ? [
                          {
                            label: 'Full Cartons Needed',
                            value: `${result.boxesNeeded} Boxes`,
                            hint: `At ${boxSize} ${areaLabel}/box`,
                          },
                          {
                            label: 'Actual Area Purchased',
                            value: `${fmt(result.totalPurchasedArea!, 1)} ${areaLabel}`,
                            hint: `+${fmt(result.overageArea!, 1)} ${areaLabel} total reserve`,
                          },
                        ]
                      : []),
                    ...(result.totalEstimatedCost
                      ? [
                          {
                            label: 'Estimated Cost',
                            value: `$${fmt(result.totalEstimatedCost, 2)}`,
                            hint: `@ $${fmt(result.pricePerUnit ?? 0, 2)}/${areaLabel}`,
                          },
                        ]
                      : []),
                  ]
            }
            calculationSteps={result.calculationSteps}
          />

          {/* Trade Buying Advisory */}
          {!result.errorMessage && result.recommendedMaterial > 0 && (
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs sm:text-sm space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Layers className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Professional Flooring Installation Advice</span>
              </div>
              <ul className="list-disc pl-5 text-slate-600 space-y-1.5 leading-relaxed text-xs">
                <li>
                  <strong>Lot Matching:</strong> Always verify that all cartons share the same <em>Lot / Run Number</em> on the box label. Planks from separate manufacturing runs frequently exhibit noticeable sheen and stain variations.
                </li>
                <li>
                  <strong>Acclimation Period:</strong> Solid hardwood requires 3 to 7 days inside the installation room prior to installation. Engineered wood and luxury vinyl plank (LVP) require 48 hours to reach ambient indoor temperature and humidity.
                </li>
                <li>
                  <strong>Keep 1 Spare Carton:</strong> Never discard the leftover planks. Store at least 1 unopened box flat in a closet for future repairs (plumbing leaks, dropped iron dents, or board replacements).
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </CalculatorCard>
  );
};
