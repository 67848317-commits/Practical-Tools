import React, { useState } from 'react';
import { CalculatorCard, FormField, ResultBox } from '../CalculatorCard';
import { calculateElectricity, EIA_2024_RESIDENTIAL_BENCHMARKS } from '../../lib/calculators/electricity';
import { Zap, HelpCircle } from 'lucide-react';

export const ElectricityCostCalculator: React.FC = () => {
  const [wattage, setWattage] = useState<string>('1500');
  const [hoursPerDay, setHoursPerDay] = useState<string>('6');
  const [pricePerKwh, setPricePerKwh] = useState<string>('0.165');
  const [daysUsed, setDaysUsed] = useState<string>('30');

  const handleReset = () => {
    setWattage('1500');
    setHoursPerDay('6');
    setPricePerKwh('0.165');
    setDaysUsed('30');
  };

  const result = calculateElectricity({
    wattage,
    hoursPerDay,
    pricePerKwh,
    daysUsed,
  });

  const fmt = (v: number, dec: number = 2) =>
    v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  return (
    <CalculatorCard
      title="Appliance Electricity Usage & Cost Calculator"
      description="Estimate running costs and electrical utility bills for home appliances, AC units, heaters, and electronics."
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
            helperText="Check manufacturer label, UL nameplate, or yellow EnergyGuide tag."
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
              Common Household Appliances
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { w: '10', name: 'LED Bulb (10W)' },
                { w: '100', name: '55" TV (100W)' },
                { w: '180', name: 'Refrigerator (180W avg)' },
                { w: '400', name: 'Gaming PC (400W)' },
                { w: '1100', name: 'Microwave (1100W)' },
                { w: '1500', name: 'Space Heater (1500W)' },
                { w: '3500', name: 'Central AC (3500W)' },
                { w: '4000', name: 'Clothes Dryer (4000W)' },
              ].map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setWattage(item.w)}
                  className={`p-2 rounded-lg text-left text-xs font-semibold transition-all cursor-pointer border ${
                    wattage === item.w
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
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
              label="Hours Active / Day"
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
              id="days-used"
              label="Billing Period"
              suffix="days"
              helperText="Typical billing cycle: 30 days."
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

          <FormField
            id="kwh-rate"
            label="Utility Rate ($ / kWh)"
            prefix="$"
            suffix="/kWh"
            helperText="Check your electricity bill for total generation + transmission rate."
          >
            <input
              id="kwh-rate"
              type="number"
              min="0"
              step="0.005"
              value={pricePerKwh}
              onChange={(e) => setPricePerKwh(e.target.value)}
              placeholder="0.165"
              className="w-full rounded-xl border border-slate-300 pl-8 pr-14 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-medium"
            />
          </FormField>

          {/* Regional Rate Presets citing EIA */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Reference Benchmarks (U.S. EIA 2024 Annual Averages)
              </span>
              <a
                href="https://www.eia.gov/electricity/annual/table.php?t=epa_02_10.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-blue-600 hover:text-blue-800 underline font-medium"
              >
                EIA Table 2.10 &rarr;
              </a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {EIA_2024_RESIDENTIAL_BENCHMARKS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setPricePerKwh(preset.rateString)}
                  className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer text-left border ${
                    pricePerKwh === preset.rateString
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <p className="font-bold">{preset.label}</p>
                  <p className={`text-[10px] mt-0.5 ${pricePerKwh === preset.rateString ? 'text-emerald-100' : 'text-slate-500'}`}>
                    {preset.note}
                  </p>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
              Source: U.S. Energy Information Administration (EIA) Electric Power Annual, Table 2.10 (Residential Sector, 2024 annual averages: U.S. Total: 16.48¢/kWh; WA: 11.90¢/kWh; TX: 14.94¢/kWh; CA: 31.97¢/kWh; HI: 42.86¢/kWh). EIA benchmark rates reflect statewide annual statistical averages, not individual household utility tariffs. Your actual power bill includes local rate schedules, fixed monthly meter fees, seasonal tiers, and taxes. The rate input above is fully editable.
            </p>
          </div>
        </div>

        {/* Results Box */}
        <div className="lg:col-span-6 space-y-6">
          <ResultBox
            primaryLabel={`Estimated Cost (${daysUsed} Days)`}
            primaryValue={result.errorMessage ? '—' : `$${fmt(result.totalCost)}`}
            subValue={
              result.errorMessage
                ? undefined
                : `Total energy: ${result.totalKwh.toFixed(1)} kWh consumed (${result.dailyKwh.toFixed(2)} kWh/day)`
            }
            secondaryMetrics={
              result.errorMessage
                ? []
                : [
                    {
                      label: 'Hourly Running Cost',
                      value: `$${fmt(result.hourlyCost, 3)}/hr`,
                      hint: `${result.hourlyKwh.toFixed(2)} kW active power`,
                    },
                    {
                      label: 'Daily Cost',
                      value: `$${fmt(result.dailyCost)}/day`,
                      hint: `${hoursPerDay} hours daily`,
                    },
                    {
                      label: '30-Day Monthly Estimate',
                      value: `$${fmt(result.monthlyCost30Days)}`,
                      hint: `${(result.dailyKwh * 30).toFixed(0)} kWh/month`,
                    },
                    {
                      label: 'Annual Cost (365 Days)',
                      value: `$${fmt(result.annualCost365Days)}/yr`,
                      hint: `${(result.dailyKwh * 365).toFixed(0)} kWh/year`,
                    },
                  ]
            }
            calculationSteps={result.calculationSteps}
          />

          {/* Duty Cycle and Energy Tips */}
          {!result.errorMessage && result.totalCost > 0 && (
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 text-xs sm:text-sm space-y-2.5">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Duty Cycle & Appliance Consumption Notes</span>
              </div>
              <ul className="list-disc pl-5 text-slate-600 space-y-1.5 leading-relaxed text-xs">
                <li>
                  <strong>Thermostat Duty Cycles:</strong> Refrigerators, space heaters, and air conditioners do not draw peak wattage continuously. A 1500W space heater cycling 50% of the time averages 750W over an hour.
                </li>
                <li>
                  <strong>Standby / Vampire Draw:</strong> Modern TVs, game consoles, and chargers draw 1W to 15W in standby mode 24 hours a day, adding roughly $15 to $30 annually per device.
                </li>
                <li>
                  <strong>EIA Rate Variance:</strong> Electricity rates vary by more than 300% across the United States, from approximately 11¢/kWh in states with abundant hydropower (Washington, Idaho) to over 35¢/kWh in California, Connecticut, and Hawaii.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </CalculatorCard>
  );
};
