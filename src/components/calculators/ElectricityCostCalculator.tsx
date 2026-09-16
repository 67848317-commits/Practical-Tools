import React, { useState } from 'react';
import { CalculatorCard, FormField, ResultBox } from '../CalculatorCard';
import { calculateElectricity } from '../../lib/calculators/electricity';

export const ElectricityCostCalculator: React.FC = () => {
  const [wattage, setWattage] = useState<string>('1500');
  const [hoursPerDay, setHoursPerDay] = useState<string>('6');
  const [pricePerKwh, setPricePerKwh] = useState<string>('0.16');
  const [daysUsed, setDaysUsed] = useState<string>('30');

  const handleReset = () => {
    setWattage('1500');
    setHoursPerDay('6');
    setPricePerKwh('0.16');
    setDaysUsed('30');
  };

  const result = calculateElectricity({
    wattage,
    hoursPerDay,
    pricePerKwh,
    daysUsed,
  });

  const fmt = (v: number) =>
    v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <CalculatorCard
      title="Appliance Electricity Usage & Cost Calculator"
      description="Estimate power consumption and electricity bills for home appliances, heaters, AC units, and computers."
      onReset={handleReset}
      errorMessage={result.errorMessage}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Controls */}
        <div className="lg:col-span-6 space-y-6">
          <FormField
            id="appliance-watts"
            label="Appliance Power Rating"
            suffix="Watts"
            helperText="Check manufacturer label or spec sheet (e.g. 1500W space heater, 200W refrigerator)."
          >
            <input
              id="appliance-watts"
              type="number"
              min="1"
              step="10"
              value={wattage}
              onChange={(e) => setWattage(e.target.value)}
              placeholder="1500"
              className="w-full rounded-xl border border-slate-300 pl-4 pr-16 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
            />
          </FormField>

          {/* Common Appliance Presets */}
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
              Common Appliance Ratings
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { w: '60', name: 'LED Lamp (60W)' },
                { w: '200', name: 'Refrigerator (200W avg)' },
                { w: '350', name: 'Desktop PC (350W)' },
                { w: '1500', name: 'Space Heater (1500W)' },
                { w: '3500', name: 'Central AC (3500W)' },
              ].map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setWattage(item.w)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    wattage === item.w
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              id="hours-per-day"
              label="Hours Used / Day"
              suffix="hrs"
              helperText="Average daily active runtime."
            >
              <input
                id="hours-per-day"
                type="number"
                min="0.1"
                max="24"
                step="0.5"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(e.target.value)}
                placeholder="6"
                className="w-full rounded-xl border border-slate-300 pl-4 pr-14 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>

            <FormField
              id="kwh-rate"
              label="Utility Rate"
              prefix="$"
              suffix="/kWh"
              helperText="US avg: ~$0.16/kWh."
            >
              <input
                id="kwh-rate"
                type="number"
                min="0"
                step="0.01"
                value={pricePerKwh}
                onChange={(e) => setPricePerKwh(e.target.value)}
                placeholder="0.16"
                className="w-full rounded-xl border border-slate-300 pl-8 pr-14 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
              />
            </FormField>
          </div>

          <FormField
            id="days-used"
            label="Duration (Days)"
            suffix="days"
            helperText="Billing cycle duration (typically 30 days for monthly bill)."
          >
            <input
              id="days-used"
              type="number"
              min="1"
              max="365"
              step="1"
              value={daysUsed}
              onChange={(e) => setDaysUsed(e.target.value)}
              placeholder="30"
              className="w-full rounded-xl border border-slate-300 pl-4 pr-16 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
            />
          </FormField>
        </div>

        {/* Results Box */}
        <div className="lg:col-span-6">
          <ResultBox
            primaryLabel={`Estimated Cost (${daysUsed} Days)`}
            primaryValue={result.errorMessage ? '—' : `$${fmt(result.totalCost)}`}
            subValue={
              result.errorMessage
                ? undefined
                : `Energy used: ${result.totalKwh.toFixed(1)} kWh total (${result.dailyKwh.toFixed(2)} kWh/day)`
            }
            secondaryMetrics={
              result.errorMessage
                ? []
                : [
                    {
                      label: 'Daily Cost',
                      value: `$${fmt(result.dailyCost)}/day`,
                      hint: `${result.dailyKwh.toFixed(2)} kWh/day`,
                    },
                    {
                      label: '30-Day Month Cost',
                      value: `$${fmt(result.monthlyCost30Days)}`,
                      hint: `${(result.dailyKwh * 30).toFixed(0)} kWh/month`,
                    },
                    {
                      label: 'Full Year Cost (365d)',
                      value: `$${fmt(result.annualCost365Days)}/yr`,
                      hint: `${(result.dailyKwh * 365).toFixed(0)} kWh/year`,
                    },
                    {
                      label: 'Total Power Consumed',
                      value: `${result.totalKwh.toFixed(1)} kWh`,
                      hint: `Over ${daysUsed} days`,
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
