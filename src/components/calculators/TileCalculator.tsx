import React, { useState } from 'react';
import { CalculatorCard, FormField, ResultBox } from '../CalculatorCard';
import { calculateTile, TileUnit } from '../../lib/calculators/tile';

export const TileCalculator: React.FC = () => {
  const [unit, setUnit] = useState<TileUnit>('imperial');
  const [roomLength, setRoomLength] = useState<string>('12');
  const [roomWidth, setRoomWidth] = useState<string>('10');
  const [tileLength, setTileLength] = useState<string>('12');
  const [tileWidth, setTileWidth] = useState<string>('12');
  const [wastePercent, setWastePercent] = useState<string>('10');

  const handleReset = () => {
    setUnit('imperial');
    setRoomLength('12');
    setRoomWidth('10');
    setTileLength('12');
    setTileWidth('12');
    setWastePercent('10');
  };

  const result = calculateTile({
    unit,
    roomLength,
    roomWidth,
    tileLength,
    tileWidth,
    wastePercent,
  });

  const roomUnit = unit === 'imperial' ? 'ft' : 'm';
  const tileUnit = unit === 'imperial' ? 'in' : 'cm';
  const areaUnit = unit === 'imperial' ? 'sq ft' : 'm²';

  const fmt = (v: number, dec: number = 1) =>
    v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  return (
    <CalculatorCard
      title="Tile Quantity & Square Footage Calculator"
      description="Estimate tiles required for floors, backsplashes, or showers including cut waste."
      onReset={handleReset}
      errorMessage={result.errorMessage}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl w-fit">
            <button
              type="button"
              onClick={() => {
                setUnit('imperial');
                setRoomLength('12');
                setRoomWidth('10');
                setTileLength('12');
                setTileWidth('12');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                unit === 'imperial' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Imperial (ft & inches)
            </button>
            <button
              type="button"
              onClick={() => {
                setUnit('metric');
                setRoomLength('3.5');
                setRoomWidth('3.0');
                setTileLength('30');
                setTileWidth('30');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                unit === 'metric' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Metric (meters & cm)
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField id="room-length" label={`Area Length (${roomUnit})`}>
              <input
                id="room-length"
                type="number"
                min="0.1"
                step="0.1"
                value={roomLength}
                onChange={(e) => setRoomLength(e.target.value)}
                placeholder="12"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>

            <FormField id="room-width" label={`Area Width (${roomUnit})`}>
              <input
                id="room-width"
                type="number"
                min="0.1"
                step="0.1"
                value={roomWidth}
                onChange={(e) => setRoomWidth(e.target.value)}
                placeholder="10"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField id="tile-length" label={`Tile Length (${tileUnit})`}>
              <input
                id="tile-length"
                type="number"
                min="0.5"
                step="0.5"
                value={tileLength}
                onChange={(e) => setTileLength(e.target.value)}
                placeholder="12"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>

            <FormField id="tile-width" label={`Tile Width (${tileUnit})`}>
              <input
                id="tile-width"
                type="number"
                min="0.5"
                step="0.5"
                value={tileWidth}
                onChange={(e) => setTileWidth(e.target.value)}
                placeholder="12"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>
          </div>

          {/* Quick Tile Sizes */}
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Common Tile Sizes ({tileUnit})
            </span>
            <div className="flex flex-wrap gap-2">
              {unit === 'imperial'
                ? [
                    { l: '4', w: '4', name: '4×4 Subway' },
                    { l: '3', w: '6', name: '3×6 Subway' },
                    { l: '12', w: '12', name: '12×12 Floor' },
                    { l: '12', w: '24', name: '12×24 Modern' },
                  ].map((t) => (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => {
                        setTileLength(t.l);
                        setTileWidth(t.w);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                    >
                      {t.name}
                    </button>
                  ))
                : [
                    { l: '10', w: '10', name: '10×10 cm' },
                    { l: '20', w: '20', name: '20×20 cm' },
                    { l: '30', w: '30', name: '30×30 cm' },
                    { l: '30', w: '60', name: '30×60 cm' },
                  ].map((t) => (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => {
                        setTileLength(t.l);
                        setTileWidth(t.w);
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 cursor-pointer"
                    >
                      {t.name}
                    </button>
                  ))}
            </div>
          </div>

          <FormField
            id="tile-waste"
            label="Waste Allowance Percentage"
            suffix="%"
            helperText="Illustrative planning allowances: 10% standard grid; 15% diagonal. Does not model grout spacing or box rounding."
          >
            <input
              id="tile-waste"
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
        </div>

        {/* Results Box */}
        <div className="lg:col-span-6">
          <ResultBox
            primaryLabel="Recommended Tiles to Purchase"
            primaryValue={result.errorMessage ? '—' : `${result.recommendedTiles.toLocaleString()} Tiles`}
            subValue={
              result.errorMessage
                ? undefined
                : `Base requirement: ${result.baseTilesNeeded} tiles (${fmt(result.exactTiles, 1)} exact) + ${result.wastePercent}% extra`
            }
            secondaryMetrics={
              result.errorMessage
                ? []
                : [
                    {
                      label: 'Total Surface Area',
                      value: `${fmt(result.roomAreaSqFtOrM2, 1)} ${areaUnit}`,
                      hint: `${roomLength} × ${roomWidth} ${roomUnit}`,
                    },
                    {
                      label: 'Single Tile Area',
                      value: `${fmt(result.tileAreaSqFtOrM2, 3)} ${areaUnit}`,
                      hint: `${tileLength}×${tileWidth} ${tileUnit}`,
                    },
                    {
                      label: 'Base Tiles Required',
                      value: `${result.baseTilesNeeded} tiles`,
                      hint: 'Before waste factor',
                    },
                    {
                      label: 'Extra Cut Buffer',
                      value: `+${result.recommendedTiles - result.baseTilesNeeded} tiles`,
                      hint: 'Trim, edge cuts & spares',
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
