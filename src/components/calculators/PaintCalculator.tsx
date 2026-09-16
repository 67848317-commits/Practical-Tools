import React, { useState } from 'react';
import { RotateCcw, AlertCircle, Info, Paintbrush, CheckCircle2 } from 'lucide-react';

export const PaintCalculator: React.FC = () => {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [length, setLength] = useState<string>('14');
  const [width, setWidth] = useState<string>('12');
  const [height, setHeight] = useState<string>('9');
  const [doors, setDoors] = useState<string>('1');
  const [windows, setWindows] = useState<string>('2');
  const [coveragePerGallon, setCoveragePerGallon] = useState<string>('350');
  const [coats, setCoats] = useState<number>(2);

  const handleReset = () => {
    setUnit('imperial');
    setLength('14');
    setWidth('12');
    setHeight('9');
    setDoors('1');
    setWindows('2');
    setCoveragePerGallon('350');
    setCoats(2);
  };

  const l = parseFloat(length);
  const w = parseFloat(width);
  const h = parseFloat(height);
  const numDoors = parseInt(doors, 10);
  const numWindows = parseInt(windows, 10);
  const coverage = parseFloat(coveragePerGallon);

  let errorMsg = '';
  if (
    length.trim() === '' || isNaN(l) || l <= 0 ||
    width.trim() === '' || isNaN(w) || w <= 0 ||
    height.trim() === '' || isNaN(h) || h <= 0
  ) {
    errorMsg = 'Please enter valid room dimensions (length, width, and height greater than zero).';
  } else if (doors.trim() === '' || isNaN(numDoors) || numDoors < 0 || windows.trim() === '' || isNaN(numWindows) || numWindows < 0) {
    errorMsg = 'Door and window counts must be zero or a positive integer.';
  } else if (coveragePerGallon.trim() === '' || isNaN(coverage) || coverage <= 0) {
    errorMsg = unit === 'imperial'
      ? 'Paint coverage must be a valid number greater than zero (e.g. 350 sq ft/gal).'
      : 'Paint coverage must be a valid number greater than zero (e.g. 8.5 m²/L).';
  }

  // Deductions per standard opening:
  // Imperial: door ~20 sq ft, window ~15 sq ft
  // Metric: door ~1.86 m², window ~1.39 m²
  const doorArea = unit === 'imperial' ? 20 : 1.86;
  const windowArea = unit === 'imperial' ? 15 : 1.39;

  const grossWallArea = !errorMsg ? 2 * (l + w) * h : 0;
  const openingsDeduction = !errorMsg ? (numDoors * doorArea) + (numWindows * windowArea) : 0;
  const estimatedWallArea = !errorMsg ? Math.max(0, grossWallArea - openingsDeduction) : 0;
  const totalSurfaceToPaint = estimatedWallArea * coats;
  const estimatedPaintRequired = !errorMsg && coverage > 0 ? totalSurfaceToPaint / coverage : 0;
  const recommendedCans = Math.ceil(estimatedPaintRequired);

  const areaUnit = unit === 'imperial' ? 'sq ft' : 'm²';
  const volumeUnit = unit === 'imperial' ? 'Gallons' : 'Liters';

  const formatNum = (val: number, decimals: number = 1) =>
    val.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  const calculationSteps = !errorMsg
    ? [
        `Gross wall area = 2 × (${l} + ${w}) × ${h} = ${formatNum(grossWallArea)} ${areaUnit}`,
        `Openings deduction = (${numDoors} doors × ${doorArea} ${areaUnit}) + (${numWindows} windows × ${windowArea} ${areaUnit}) = ${formatNum(openingsDeduction)} ${areaUnit}`,
        `Estimated net wall area = ${formatNum(grossWallArea)} - ${formatNum(openingsDeduction)} = ${formatNum(estimatedWallArea)} ${areaUnit}`,
        `Total coverage for ${coats} ${coats === 1 ? 'coat' : 'coats'} = ${formatNum(estimatedWallArea)} × ${coats} = ${formatNum(totalSurfaceToPaint)} ${areaUnit}`,
        `Estimated paint required = ${formatNum(totalSurfaceToPaint)} ÷ ${coverage} ${areaUnit}/${unit === 'imperial' ? 'gal' : 'L'} = ${formatNum(estimatedPaintRequired, 2)} ${volumeUnit}`,
      ]
    : [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs" id="paint-calculator-widget">
      {/* Unit Switcher */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Unit System
        </span>
        <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-medium">
          <button
            type="button"
            aria-pressed={unit === 'imperial'}
            onClick={() => {
              setUnit('imperial');
              setCoveragePerGallon('350');
              setLength('14');
              setWidth('12');
              setHeight('9');
            }}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              unit === 'imperial' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Imperial (Feet & Gallons)
          </button>
          <button
            type="button"
            aria-pressed={unit === 'metric'}
            onClick={() => {
              setUnit('metric');
              setCoveragePerGallon('8.5');
              setLength('4.2');
              setWidth('3.6');
              setHeight('2.7');
            }}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              unit === 'metric' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Metric (Meters & Liters)
          </button>
        </div>
      </div>

      {/* 6 Explicit Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {/* 1. Room Length */}
        <div>
          <label htmlFor="room-length" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Room Length ({unit === 'imperial' ? 'ft' : 'm'})
          </label>
          <input
            id="room-length"
            type="number"
            min="0.1"
            step="any"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder={unit === 'imperial' ? '14' : '4.2'}
            aria-label="Room length"
          />
        </div>

        {/* 2. Room Width */}
        <div>
          <label htmlFor="room-width" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Room Width ({unit === 'imperial' ? 'ft' : 'm'})
          </label>
          <input
            id="room-width"
            type="number"
            min="0.1"
            step="any"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder={unit === 'imperial' ? '12' : '3.6'}
            aria-label="Room width"
          />
        </div>

        {/* 3. Wall Height */}
        <div>
          <label htmlFor="wall-height" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Wall Height ({unit === 'imperial' ? 'ft' : 'm'})
          </label>
          <input
            id="wall-height"
            type="number"
            min="0.1"
            step="any"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder={unit === 'imperial' ? '9' : '2.7'}
            aria-label="Wall height"
          />
        </div>

        {/* 4. Number of Doors */}
        <div>
          <label htmlFor="doors-count" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Number of Doors
          </label>
          <input
            id="doors-count"
            type="number"
            min="0"
            max="20"
            value={doors}
            onChange={(e) => setDoors(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="1"
            aria-label="Number of doors"
          />
          <span className="text-[11px] text-slate-400 block mt-1">
            Deducts ~{doorArea} {areaUnit} per door
          </span>
        </div>

        {/* 5. Number of Windows */}
        <div>
          <label htmlFor="windows-count" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Number of Windows
          </label>
          <input
            id="windows-count"
            type="number"
            min="0"
            max="20"
            value={windows}
            onChange={(e) => setWindows(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="2"
            aria-label="Number of windows"
          />
          <span className="text-[11px] text-slate-400 block mt-1">
            Deducts ~{windowArea} {areaUnit} per window
          </span>
        </div>

        {/* 6. Coverage Per Gallon / Liter */}
        <div>
          <label htmlFor="coverage-per-gallon" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Coverage ({unit === 'imperial' ? 'sq ft / gallon' : 'm² / liter'})
          </label>
          <input
            id="coverage-per-gallon"
            type="number"
            min="1"
            step="any"
            value={coveragePerGallon}
            onChange={(e) => setCoveragePerGallon(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder={unit === 'imperial' ? '350' : '8.5'}
            aria-label="Paint coverage per gallon or liter"
          />
          <span className="text-[11px] text-slate-400 block mt-1">
            Typically {unit === 'imperial' ? '350 sq ft/gal' : '8.5 m²/L'} on primed drywall
          </span>
        </div>
      </div>

      {/* Number of Coats Toggle */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-700">
          Coats of Paint:
        </span>
        <div className="flex gap-2">
          {[1, 2, 3].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={coats === c}
              onClick={() => setCoats(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                coats === c
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              {c} {c === 1 ? 'Coat' : 'Coats'}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-500 hidden sm:inline">
          (2 coats recommended for even, durable opacity)
        </span>
      </div>

      {/* Output / Result display */}
      {errorMsg ? (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 mb-6" role="alert">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold">Unable to calculate</p>
            <p className="text-amber-800 text-xs mt-0.5">{errorMsg}</p>
          </div>
        </div>
      ) : (
        <>
          <div className="p-6 rounded-xl bg-slate-900 text-white mb-6" aria-live="polite">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              {/* Output 1: Estimated Wall Area */}
              <div>
                <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
                  Estimated Wall Area (Net)
                </span>
                <div className="text-3xl sm:text-4xl font-bold font-mono text-white break-words">
                  {formatNum(estimatedWallArea)}
                  <span className="text-base text-slate-300 font-sans font-normal ml-1.5">{areaUnit}</span>
                </div>
                <span className="text-xs text-slate-400 mt-1 block">
                  Gross wall area: {formatNum(grossWallArea)} {areaUnit} (less {formatNum(openingsDeduction)} {areaUnit} openings)
                </span>
              </div>

              {/* Output 2: Estimated Paint Required */}
              <div className="sm:border-l sm:border-slate-800 sm:pl-6">
                <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
                  Estimated Paint Required
                </span>
                <div className="text-3xl sm:text-4xl font-bold font-mono text-emerald-400 break-words">
                  {formatNum(estimatedPaintRequired, 2)}
                  <span className="text-base text-slate-300 font-sans font-normal ml-1.5">{volumeUnit}</span>
                </div>
                <span className="text-xs text-emerald-400 font-medium mt-1 block flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Recommended purchase: {recommendedCans} full {unit === 'imperial' ? (recommendedCans === 1 ? 'gallon can' : 'gallon cans') : (recommendedCans === 1 ? 'liter' : 'liters')}
                </span>
              </div>
            </div>

            {/* Arithmetic Breakdown */}
            {calculationSteps.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-1 text-xs text-slate-300 font-mono">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 block mb-1 font-sans">
                  Formula & Arithmetic Breakdown:
                </span>
                {calculationSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-slate-500">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Explicit Assumptions & Disclaimer Box */}
          <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/80 text-blue-950 text-xs leading-relaxed flex items-start gap-3 mb-6" role="note">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-blue-900">
                Estimation Assumptions & Real-World Variances
              </p>
              <p className="text-blue-800">
                This tool provides an approximation for planning and purchasing estimates. It <strong>does not claim exact real-world paint requirements</strong>. Real-world paint consumption varies significantly based on:
              </p>
              <ul className="list-disc pl-4 space-y-0.5 text-blue-800">
                <li><strong>Surface texture:</strong> Textured drywall (knockdown, orange peel) or rough masonry absorbs 15% to 25% more paint than smooth sealed surfaces.</li>
                <li><strong>Color transition & porosity:</strong> Transitioning from dark to light walls, or painting unprimed drywall, typically requires a dedicated primer or additional coat.</li>
                <li><strong>Application tools:</strong> Rollers with thick naps and paint sprayers deposit differing thicknesses compared to standard 3/8-inch roller sleeves.</li>
              </ul>
            </div>
          </div>
        </>
      )}

      {/* Bottom Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          id="btn-reset-paint"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Defaults
        </button>
        <span className="text-xs text-slate-400">
          Evaluated instantly in your browser
        </span>
      </div>
    </div>
  );
};
