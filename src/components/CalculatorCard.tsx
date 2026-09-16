import React from 'react';
import { RotateCcw, AlertCircle, CheckCircle2 } from 'lucide-react';

interface CalculatorCardProps {
  title: string;
  description?: string;
  onReset: () => void;
  errorMessage?: string;
  children: React.ReactNode;
}

export const CalculatorCard: React.FC<CalculatorCardProps> = ({
  title,
  description,
  onReset,
  errorMessage,
  children,
}) => {
  return (
    <section
      aria-label={`${title} interface`}
      className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
          {description && <p className="text-sm text-slate-500 mt-0.5">{description}</p>}
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-lg transition-colors self-start sm:self-auto cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-400"
          title="Reset to default values"
          aria-label="Reset calculator to defaults"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Reset</span>
        </button>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-800 text-sm animate-fadeIn"
        >
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <strong className="font-semibold block">Input Validation Required</strong>
            <span className="text-red-700">{errorMessage}</span>
          </div>
        </div>
      )}

      <div className="mt-6">{children}</div>
    </section>
  );
};

export interface FormFieldProps {
  id: string;
  label: string;
  helperText?: string;
  prefix?: string;
  suffix?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  helperText,
  prefix,
  suffix,
  children,
}) => {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="relative rounded-xl shadow-xs">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 font-medium sm:text-sm">
            {prefix}
          </div>
        )}
        {children}
        {suffix && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 font-medium sm:text-sm">
            {suffix}
          </div>
        )}
      </div>
      {helperText && <p className="text-xs text-slate-500">{helperText}</p>}
    </div>
  );
};

export interface ResultBoxProps {
  primaryLabel: string;
  primaryValue: string;
  subValue?: string;
  secondaryMetrics?: { label: string; value: string; hint?: string }[];
  calculationSteps?: string[];
}

export const ResultBox: React.FC<ResultBoxProps> = ({
  primaryLabel,
  primaryValue,
  subValue,
  secondaryMetrics,
  calculationSteps,
}) => {
  return (
    <div
      aria-live="polite"
      className="bg-slate-900 text-white rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-md"
    >
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
          {primaryLabel}
        </span>
        <div className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight break-words">
          {primaryValue}
        </div>
        {subValue && <p className="text-sm text-slate-300 mt-2 font-medium">{subValue}</p>}

        {secondaryMetrics && secondaryMetrics.length > 0 && (
          <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-2 gap-4">
            {secondaryMetrics.map((metric, idx) => (
              <div key={idx}>
                <span className="text-xs font-medium text-slate-400 block">{metric.label}</span>
                <span className="text-lg font-bold text-white mt-0.5 block">{metric.value}</span>
                {metric.hint && <span className="text-[11px] text-slate-500">{metric.hint}</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      {calculationSteps && calculationSteps.length > 0 && (
        <div className="mt-6 pt-5 border-t border-slate-800">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            Calculation Steps
          </span>
          <ul className="space-y-1.5 text-xs text-slate-300 font-mono">
            {calculationSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold shrink-0">{idx + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
