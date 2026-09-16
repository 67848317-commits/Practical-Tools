import React, { useState } from 'react';
import { CalculatorCard, FormField, ResultBox } from '../CalculatorCard';
import { calculateCommute } from '../../lib/calculators/commute';

export const CommuteCostCalculator: React.FC = () => {
  const [oneWayDistance, setOneWayDistance] = useState<string>('20');
  const [daysPerWeek, setDaysPerWeek] = useState<string>('5');
  const [efficiencyMpg, setEfficiencyMpg] = useState<string>('28');
  const [fuelPrice, setFuelPrice] = useState<string>('3.65');

  const handleReset = () => {
    setOneWayDistance('20');
    setDaysPerWeek('5');
    setEfficiencyMpg('28');
    setFuelPrice('3.65');
  };

  const result = calculateCommute({
    oneWayDistance,
    daysPerWeek,
    efficiencyMpg,
    fuelPrice,
  });

  const fmt = (v: number) =>
    v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <CalculatorCard
      title="Daily Commute Fuel Expense Calculator"
      description="Estimate your daily, monthly, and annual driving costs based on your commute distance and fuel economy."
      onReset={handleReset}
      errorMessage={result.errorMessage}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              id="commute-distance"
              label="One-Way Distance"
              suffix="miles"
              helperText="Miles from home to workplace."
            >
              <input
                id="commute-distance"
                type="number"
                min="0.1"
                step="0.5"
                value={oneWayDistance}
                onChange={(e) => setOneWayDistance(e.target.value)}
                placeholder="20"
                className="w-full rounded-xl border border-slate-300 pl-4 pr-16 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>

            <FormField
              id="commute-days"
              label="Commute Days / Week"
              suffix="days"
              helperText="Days per week commuting."
            >
              <input
                id="commute-days"
                type="number"
                min="1"
                max="7"
                step="1"
                value={daysPerWeek}
                onChange={(e) => setDaysPerWeek(e.target.value)}
                placeholder="5"
                className="w-full rounded-xl border border-slate-300 pl-4 pr-16 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              id="commute-mpg"
              label="Fuel Economy"
              suffix="MPG"
              helperText="Combined vehicle MPG."
            >
              <input
                id="commute-mpg"
                type="number"
                min="1"
                step="0.5"
                value={efficiencyMpg}
                onChange={(e) => setEfficiencyMpg(e.target.value)}
                placeholder="28"
                className="w-full rounded-xl border border-slate-300 pl-4 pr-16 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>

            <FormField
              id="commute-gas-price"
              label="Fuel Price"
              prefix="$"
              suffix="/gal"
              helperText="Local gas station price."
            >
              <input
                id="commute-gas-price"
                type="number"
                min="0"
                step="0.01"
                value={fuelPrice}
                onChange={(e) => setFuelPrice(e.target.value)}
                placeholder="3.65"
                className="w-full rounded-xl border border-slate-300 pl-8 pr-14 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>
          </div>
        </div>

        {/* Results Box */}
        <div className="lg:col-span-6">
          <ResultBox
            primaryLabel="Estimated Monthly Commute Cost"
            primaryValue={result.errorMessage ? '—' : `$${fmt(result.monthlyCost)}`}
            subValue={
              result.errorMessage
                ? undefined
                : `Annual expenditure: $${fmt(result.annualCost)} across ${result.annualDistance.toLocaleString()} miles/year`
            }
            secondaryMetrics={
              result.errorMessage
                ? []
                : [
                    {
                      label: 'Daily Round-Trip',
                      value: `$${fmt(result.dailyCost)}/day`,
                      hint: `${result.roundTripDistance} miles round-trip`,
                    },
                    {
                      label: 'Weekly Cost',
                      value: `$${fmt(result.weeklyCost)}/wk`,
                      hint: `${daysPerWeek} days commuting`,
                    },
                    {
                      label: 'Annual Commute Cost',
                      value: `$${fmt(result.annualCost)}/yr`,
                      hint: '52 work weeks',
                    },
                    {
                      label: 'Daily Gas Consumed',
                      value: `${result.dailyFuelUsed.toFixed(2)} gal/day`,
                      hint: `At ${efficiencyMpg} MPG`,
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
