import React from 'react';

interface AdSlotProps {
  id: string;
  format?: 'banner' | 'rectangle' | 'horizontal';
  className?: string;
}

/**
 * AdSlot provides an unobtrusive, structured container ready for future AdSense monetization
 * without violating AdSense placement policies or cluttering the initial MVP experience.
 */
export const AdSlot: React.FC<AdSlotProps> = ({ id, format = 'horizontal', className = '' }) => {
  // During MVP stage, render a subtle, compliant placeholder container or keep it clean
  return (
    <div
      className={`w-full my-8 flex flex-col items-center justify-center ${className}`}
      data-ad-slot={id}
      aria-label="Sponsorship or advertisement placeholder"
    >
      <div className="w-full max-w-3xl py-2 px-4 bg-slate-50/70 border border-dashed border-slate-200 rounded-lg text-center">
        <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
          Advertisement Space
        </span>
        <div className="text-xs text-slate-400 italic py-3">
          Clean, non-intrusive ad placement slot ready for Google AdSense integration.
        </div>
      </div>
    </div>
  );
};
