import React, { useState } from 'react';
import { RotateCcw, AlertCircle, Info, CheckCircle2, ShoppingBag } from 'lucide-react';
import { calculatePaint, SurfaceTexture } from '../../lib/calculators/paint';

export const PaintCalculator: React.FC = () => {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial');
  const [length, setLength] = useState<string>('14');
  const [width, setWidth] = useState<string>('12');
  const [height, setHeight] = useState<string>('9');
  const [doors, setDoors] = useState<string>('1');
  const [windows, setWindows] = useState<string>('2');
  const [coveragePerGallon, setCoveragePerGallon] = useState<string>('350');
  const [coats, setCoats] = useState<number>(2);
  const [surfaceTexture, setSurfaceTexture] = useState<SurfaceTexture>('smooth');
  const [doorArea, setDoorArea] = useState<string>('20');
  const [windowArea, setWindowArea] = useState<string>('15');
  const [showCustomOpenings, setShowCustomOpenings] = useState<boolean>(false);

  const handleReset = () => {
    setUnit('imperial');
    setLength('14');
    setWidth('12');
    setHeight('9');
    setDoors('1');
    setWindows('2');
    setCoveragePerGallon('350');
    setCoats(2);
    setSurfaceTexture('smooth');
    setDoorArea('20');
    setWindowArea('15');
    setShowCustomOpenings(false);
  };

  const handleTextureChange = (texture: SurfaceTexture) => {
    setSurfaceTexture(texture);
    if (unit === 'imperial') {
      if (texture === 'smooth') setCoveragePerGallon('350');
      else if (texture === 'textured') setCoveragePerGallon('275');
      else if (texture === 'rough') setCoveragePerGallon('175');
    } else {
      if (texture === 'smooth') setCoveragePerGallon('8.5');
      else if (texture === 'textured') setCoveragePerGallon('6.7');
      else if (texture === 'rough') setCoveragePerGallon('4.3');
    }
  };

  const result = calculatePaint({
    unit,
    length,
    width,
    height,
    doors,
    windows,
    coats,
    coveragePerGallon,
    surfaceTexture,
    doorArea,
    windowArea,
  });

  const areaUnit = result.areaUnit;
  const volumeUnit = result.volumeUnit;

  const formatNum = (val: number, decimals: number = 1) =>
    val.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  const errorMsg = result.errorMessage || '';

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
              setSurfaceTexture('smooth');
              setDoorArea('20');
              setWindowArea('15');
            }}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
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
              setSurfaceTexture('smooth');
              setDoorArea('1.86');
              setWindowArea('1.39');
            }}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              unit === 'metric' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Metric (Meters & Liters)
          </button>
        </div>
      </div>

      {/* Surface Porosity / Texture Presets */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
          Wall Surface Condition & Texture
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {[
            {
              id: 'smooth' as const,
              label: 'Smooth / Primed Drywall',
              coverage: unit === 'imperial' ? '350 sq ft/gal' : '8.5 m²/L',
              desc: 'Standard pre-primed drywall or previously painted interior walls.',
            },
            {
              id: 'textured' as const,
              label: 'Textured / Orange Peel',
              coverage: unit === 'imperial' ? '275 sq ft/gal' : '6.7 m²/L',
              desc: 'Knockdown, orange peel drywall, or unprimed plaster.',
            },
            {
              id: 'rough' as const,
              label: 'Rough Stucco / Masonry',
              coverage: unit === 'imperial' ? '175 sq ft/gal' : '4.3 m²/L',
              desc: 'Porous brick, cinder block, or heavy acoustic texture.',
            },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleTextureChange(item.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                surfaceTexture === item.id
                  ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-900">{item.label}</span>
                <span className="text-[10px] font-mono text-blue-700 bg-blue-100/70 px-1.5 py-0.5 rounded">
                  {item.coverage}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
            </button>
          ))}
        </div>
        <p className="text-[11px] text-slate-500 mt-1.5">
          Smooth default (350 sq ft/gal) sits within Sherwin-Williams (350–400) and Benjamin Moore (350–450) interior latex PDS ranges; textured, rough, and metric presets are illustrative editable planning estimates.
        </p>
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

        {/* 4. Doors Count */}
        <div>
          <label htmlFor="doors-count" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Doors Count
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
          <span className="text-[11px] text-slate-500 block mt-1">
            Planning allowance: ~{unit === 'imperial' ? '20 sq ft' : '1.86 m²'} per door (32"×80" nominal plus trim). Accepts area per opening.
          </span>
        </div>

        {/* 5. Windows Count */}
        <div>
          <label htmlFor="windows-count" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Windows Count
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
          <span className="text-[11px] text-slate-500 block mt-1">
            Planning allowance: ~{unit === 'imperial' ? '15 sq ft' : '1.39 m²'} per window (3×5 ft nominal double-hung). Accepts area per opening.
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
            onChange={(e) => {
              setCoveragePerGallon(e.target.value);
              setSurfaceTexture('custom');
            }}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder={unit === 'imperial' ? '350' : '8.5'}
            aria-label="Paint coverage per gallon or liter"
          />
          <span className="text-[11px] text-slate-400 block mt-1">
            Typically {unit === 'imperial' ? '350 sq ft/gal' : '8.5 m²/L'} on primed drywall
          </span>
        </div>
      </div>

      {/* Customizable Opening Deduction Sizes */}
      <div className="mb-6 -mt-2">
        <button
          type="button"
          onClick={() => setShowCustomOpenings(!showCustomOpenings)}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
        >
          <span>{showCustomOpenings ? '▾ Hide' : '▸ Customize'} Opening Deduction Areas (Optional)</span>
        </button>

        {showCustomOpenings && (
          <div className="mt-3 p-4 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="custom-door-area" className="block text-xs font-semibold text-slate-700 mb-1">
                Deduction Area per Door ({areaUnit} / door)
              </label>
              <input
                id="custom-door-area"
                type="number"
                min="0"
                step="0.1"
                value={doorArea}
                onChange={(e) => setDoorArea(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={unit === 'imperial' ? '20' : '1.86'}
              />
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Trade convention default: {unit === 'imperial' ? '20 sq ft (nominal 32"×80" plus frame)' : '1.86 m²'}
              </span>
            </div>

            <div>
              <label htmlFor="custom-window-area" className="block text-xs font-semibold text-slate-700 mb-1">
                Deduction Area per Window ({areaUnit} / window)
              </label>
              <input
                id="custom-window-area"
                type="number"
                min="0"
                step="0.1"
                value={windowArea}
                onChange={(e) => setWindowArea(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={unit === 'imperial' ? '15' : '1.39'}
              />
              <span className="text-[11px] text-slate-500 mt-0.5 block">
                Trade convention default: {unit === 'imperial' ? '15 sq ft (nominal 3×5 ft double-hung)' : '1.39 m²'}
              </span>
            </div>
          </div>
        )}
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
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
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
                  {formatNum(result.estimatedWallArea)}
                  <span className="text-base text-slate-300 font-sans font-normal ml-1.5">{areaUnit}</span>
                </div>
                <span className="text-xs text-slate-400 mt-1 block">
                  Gross wall area: {formatNum(result.grossWallArea)} {areaUnit} (less {formatNum(result.openingsDeduction)} {areaUnit} openings)
                </span>
              </div>

              {/* Output 2: Estimated Paint Required */}
              <div className="sm:border-l sm:border-slate-800 sm:pl-6">
                <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
                  Estimated Paint Required
                </span>
                <div className="text-3xl sm:text-4xl font-bold font-mono text-emerald-400 break-words">
                  {formatNum(result.estimatedPaintRequired, 2)}
                  <span className="text-base text-slate-300 font-sans font-normal ml-1.5">{volumeUnit}</span>
                </div>
                <span className="text-xs text-emerald-400 font-medium mt-1 block flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  Recommended purchase: {result.recommendedCans} full {unit === 'imperial' ? (result.recommendedCans === 1 ? 'gallon can' : 'gallon cans') : (result.recommendedCans === 1 ? 'liter' : 'liters')}
                </span>
              </div>
            </div>

            {/* Arithmetic Breakdown */}
            {result.calculationSteps.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-1 text-xs text-slate-300 font-mono">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 block mb-1 font-sans">
                  Formula & Arithmetic Breakdown:
                </span>
                {result.calculationSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-slate-500">{idx + 1}.</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Paint Package Combination Guide */}
          {unit === 'imperial' && result.estimatedPaintRequired > 0 && (
            <div className="mb-6 p-5 bg-emerald-50/70 border border-emerald-200 rounded-2xl text-slate-800">
              <div className="flex items-center gap-2 font-bold text-emerald-950 text-sm mb-2">
                <ShoppingBag className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Suggested Package-Size Combination</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <p className="text-xs text-slate-600 mb-1">Suggested Retail Purchase Quantity:</p>
                  <p className="text-lg font-bold text-emerald-900">
                    {result.canOptimizerSummary}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    Provides <strong>{formatNum(result.totalPurchasedVolume, 2)} Gallons</strong> total ({formatNum(result.totalPurchasedVolume - result.estimatedPaintRequired, 2)} Gal reserve for future wall touchups).
                  </p>
                </div>
                <div className="bg-white/80 p-3.5 rounded-xl border border-emerald-100 text-xs text-slate-600 space-y-1">
                  <p className="font-semibold text-slate-800">Package Combination Details</p>
                  <p>
                    Assumes standard retail containers (1 gallon = 4 quarts = 128 fl oz). For fractional needs up to 0.5 gallons, adding 1 or 2 quart cans provides adequate volume while reducing surplus paint. For needs exceeding 0.5 extra gallons (2 quarts), purchasing a full additional gallon is suggested to ensure sufficient coverage and touchup reserve.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Explicit Assumptions & Disclaimer Box */}
          <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/80 text-blue-950 text-xs leading-relaxed flex items-start gap-3 mb-6" role="note">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-blue-900">
                Estimation Assumptions & Technical References
              </p>
              <p className="text-blue-800">
                This tool provides an approximation for planning and purchasing estimates based on industry data:
              </p>
              <ul className="list-disc pl-4 space-y-0.5 text-blue-800">
                <li><strong>Coverage Baseline:</strong> Smooth default (350 sq ft/gal) sits within common interior latex PDS ranges (Sherwin-Williams 350–400; Benjamin Moore Aura 350–400, Regal Select 400–450 sq ft/gal). Textured (275), rough masonry (175), and metric presets are illustrative editable planning estimates.</li>
                <li><strong>Architectural Openings:</strong> Deductions use common trade planning allowances of ~20 sq ft (1.86 m²) per standard interior door and ~15 sq ft (1.39 m²) per double-hung window. Controls accept deduction area per opening and can be customized above. Clamped to ensure net wall area cannot be negative.</li>
                <li><strong>Texture & Porosity:</strong> Unprimed drywall, textured knockdown, or dark-to-light color transitions absorb up to 25% more paint and require a dedicated primer coat.</li>
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
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
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
