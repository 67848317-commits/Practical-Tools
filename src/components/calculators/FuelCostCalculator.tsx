import React, { useState } from 'react';
import { RotateCcw, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { calculateFuel, FuelUnitSystem } from '../../lib/calculators/fuel';

export const FuelCostCalculator: React.FC = () => {
  const [unitSystem, setUnitSystem] = useState<FuelUnitSystem>('us');
  const [distance, setDistance] = useState<string>('300');
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);
  const [efficiency, setEfficiency] = useState<string>('28');
  const [fuelPrice, setFuelPrice] = useState<string>('3.65');
  const [passengers, setPassengers] = useState<string>('1');

  const handleReset = () => {
    setUnitSystem('us');
    setDistance('300');
    setIsRoundTrip(false);
    setEfficiency('28');
    setFuelPrice('3.65');
    setPassengers('1');
  };

  const result = calculateFuel({
    unitSystem,
    distance,
    efficiency,
    fuelPrice,
    passengers,
    isRoundTrip,
  });

  const errorMsg = result.errorMessage ?? '';
  const {
    effectiveDistance,
    estimatedFuelUsed,
    estimatedTripCost,
    costPerPerson,
    distanceUnit,
    volumeUnit,
    efficiencyUnit: efficiencyLabel,
    calculationSteps,
  } = result;

  const dist = parseFloat(distance);
  const eff = parseFloat(efficiency);
  const numPassengers = parseInt(passengers, 10) || 1;
  const priceUnit = unitSystem === 'us' ? 'per gallon' : 'per liter';

  const formatCurrency = (val: number) =>
    val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const formatNum = (val: number, decimals: number = 2) =>
    val.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs" id="fuel-calculator-widget">
      {/* Explicit Unit System Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
            Measurement Standard
          </span>
          <span className="text-xs text-slate-400">
            {unitSystem === 'us' ? 'Using Imperial (Miles · MPG · Gallons)' : 'Using Metric (Kilometers · L/100 km · Liters)'}
          </span>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-medium self-start sm:self-auto">
          <button
            type="button"
            aria-pressed={unitSystem === 'us'}
            onClick={() => {
              setUnitSystem('us');
              setDistance('300');
              setEfficiency('28');
              setFuelPrice('3.65');
            }}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              unitSystem === 'us' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            US (Miles / MPG / Gallons)
          </button>
          <button
            type="button"
            aria-pressed={unitSystem === 'metric'}
            onClick={() => {
              setUnitSystem('metric');
              setDistance('500');
              setEfficiency('8.5');
              setFuelPrice('1.60');
            }}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              unitSystem === 'metric' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Metric (KM / L/100km / Liters)
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* 1. Distance */}
        <div>
          <label htmlFor="fuel-distance" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Distance ({distanceUnit})
          </label>
          <input
            id="fuel-distance"
            type="number"
            min="0.1"
            step="any"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder={unitSystem === 'us' ? '300' : '500'}
            aria-label={`Trip distance in ${distanceUnit}`}
          />
        </div>

        {/* 2. Fuel Efficiency */}
        <div>
          <label htmlFor="fuel-efficiency" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Fuel Efficiency ({efficiencyLabel})
          </label>
          <input
            id="fuel-efficiency"
            type="number"
            min="0.1"
            step="any"
            value={efficiency}
            onChange={(e) => setEfficiency(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder={unitSystem === 'us' ? '28' : '8.5'}
            aria-label={`Vehicle fuel efficiency in ${efficiencyLabel}`}
          />
        </div>

        {/* 3. Fuel Price */}
        <div>
          <label htmlFor="fuel-price" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Fuel Price (${priceUnit})
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold" aria-hidden="true">$</span>
            <input
              id="fuel-price"
              type="number"
              min="0"
              step="any"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
              className="w-full pl-8 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder={unitSystem === 'us' ? '3.65' : '1.60'}
              aria-label={`Fuel price in dollars ${priceUnit}`}
            />
          </div>
        </div>

        {/* 4. Passengers (Split) */}
        <div>
          <label htmlFor="passenger-split" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
            Passengers (Split)
          </label>
          <input
            id="passenger-split"
            type="number"
            min="1"
            max="50"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono text-base focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="1"
            aria-label="Number of passengers sharing fuel cost"
          />
        </div>
      </div>

      {/* Round-trip checkbox */}
      <div className="mb-6">
        <label className="inline-flex items-center gap-2 cursor-pointer text-sm text-slate-700 select-none">
          <input
            type="checkbox"
            checked={isRoundTrip}
            onChange={(e) => setIsRoundTrip(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
          />
          <span>
            Round-trip journey (doubles total travel to {dist > 0 ? (dist * 2).toLocaleString() : 0} {distanceUnit})
          </span>
        </label>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
              {/* Output 1: Estimated Trip Cost */}
              <div>
                <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
                  Estimated Trip Cost
                </span>
                <div className="text-3xl sm:text-4xl font-bold font-mono text-emerald-400 break-words">
                  ${formatCurrency(estimatedTripCost)}
                </div>
                <span className="text-xs text-slate-400 mt-1 block">
                  For {formatNum(effectiveDistance, 0)} {distanceUnit} driven
                </span>
              </div>

              {/* Output 2: Estimated Fuel Used */}
              <div className="sm:border-l sm:border-slate-800 sm:pl-6">
                <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
                  Estimated Fuel Used
                </span>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-white break-words">
                  {formatNum(estimatedFuelUsed, 2)}
                  <span className="text-base text-slate-300 font-sans font-normal ml-1.5">{volumeUnit}</span>
                </div>
                <span className="text-xs text-slate-400 mt-1 block">
                  At vehicle efficiency of {eff} {efficiencyLabel}
                </span>
              </div>

              {/* Output 3: Cost per Person (if passengers > 1) */}
              <div className="sm:border-l sm:border-slate-800 sm:pl-6">
                <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-1">
                  Cost Per Person
                </span>
                <div className="text-2xl sm:text-3xl font-bold font-mono text-slate-200 break-words">
                  ${formatCurrency(costPerPerson)}
                </div>
                <span className="text-xs text-emerald-400 font-medium mt-1 block flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Split across {numPassengers} {numPassengers === 1 ? 'person' : 'people'}
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

          {/* Explicit Note / Assumptions Callout */}
          <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/80 text-blue-950 text-xs leading-relaxed flex items-start gap-3 mb-6" role="note">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900 mb-0.5">
                Real-World Travel Assumptions
              </p>
              <p className="text-blue-800">
                Calculations assume steady driving under normal conditions. Real-world fuel consumption increases by 10% to 25% during prolonged urban traffic idling, cold weather starts, driving with roof luggage containers, or traversing mountainous terrain.
              </p>
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
          id="btn-reset-fuel"
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
