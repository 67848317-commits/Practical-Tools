import React, { useState } from 'react';
import { CalculatorCard, FormField, ResultBox } from '../CalculatorCard';
import { calculateMileage, MileageUnit } from '../../lib/calculators/mileage';

export const GasMileageCalculator: React.FC = () => {
  const [unit, setUnit] = useState<MileageUnit>('us');
  const [distance, setDistance] = useState<string>('320');
  const [fuelUsed, setFuelUsed] = useState<string>('11.5');

  const handleReset = () => {
    setUnit('us');
    setDistance('320');
    setFuelUsed('11.5');
  };

  const result = calculateMileage({ unit, distance, fuelUsed });

  const distUnit = unit === 'us' ? 'miles' : 'km';
  const volUnit = unit === 'us' ? 'gallons' : 'liters';

  return (
    <CalculatorCard
      title="Gas Mileage & Fuel Economy Calculator"
      description="Calculate your vehicle's real-world MPG and L/100 km fuel consumption from odometer readings."
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
                setUnit('us');
                setDistance('320');
                setFuelUsed('11.5');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                unit === 'us' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              US Units (Miles & Gallons)
            </button>
            <button
              type="button"
              onClick={() => {
                setUnit('metric');
                setDistance('500');
                setFuelUsed('38');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                unit === 'metric' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Metric (Kilometers & Liters)
            </button>
          </div>

          <FormField
            id="trip-distance"
            label={`Distance Traveled (${distUnit})`}
            suffix={distUnit}
            helperText="Trip odometer mileage since last full fill-up."
          >
            <input
              id="trip-distance"
              type="number"
              min="0.1"
              step="0.1"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              placeholder={unit === 'us' ? '320' : '500'}
              className="w-full rounded-xl border border-slate-300 pl-4 pr-16 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
            />
          </FormField>

          <FormField
            id="trip-fuel"
            label={`Fuel Consumed (${volUnit})`}
            suffix={volUnit}
            helperText="Exact volume pumped on the receipt to refill the tank."
          >
            <input
              id="trip-fuel"
              type="number"
              min="0.1"
              step="0.01"
              value={fuelUsed}
              onChange={(e) => setFuelUsed(e.target.value)}
              placeholder={unit === 'us' ? '11.5' : '38'}
              className="w-full rounded-xl border border-slate-300 pl-4 pr-16 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
            />
          </FormField>
        </div>

        {/* Results Box */}
        <div className="lg:col-span-6">
          <ResultBox
            primaryLabel="Fuel Efficiency"
            primaryValue={result.errorMessage ? '—' : result.primaryResultFormatted}
            subValue={result.errorMessage ? undefined : result.secondaryResultFormatted}
            secondaryMetrics={
              result.errorMessage
                ? []
                : [
                    {
                      label: 'US Fuel Economy',
                      value: `${result.mpg.toFixed(2)} MPG`,
                      hint: 'Miles per gallon',
                    },
                    {
                      label: 'Metric Consumption',
                      value: `${result.lPer100km.toFixed(2)} L/100km`,
                      hint: 'Liters per 100 kilometers',
                    },
                    {
                      label: 'Distance Logged',
                      value: `${result.distance.toLocaleString()} ${distUnit}`,
                      hint: 'Between fill-ups',
                    },
                    {
                      label: 'Fuel Added',
                      value: `${result.fuelUsed.toLocaleString()} ${volUnit}`,
                      hint: 'Pumped to full tank',
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
