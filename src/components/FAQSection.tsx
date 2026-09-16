import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '../types';

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  title = 'Frequently Asked Questions',
}) => {
  // By default, open the first FAQ item
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="my-10" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-xl font-bold text-slate-900 mb-6">
        {title}
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const headingId = `faq-q-${idx}`;
          const panelId = `faq-a-${idx}`;

          return (
            <div
              key={idx}
              className="border border-slate-200 rounded-xl bg-white overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                id={headingId}
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-slate-900 hover:bg-slate-50 focus:outline-none transition-colors"
              >
                <span className="text-sm sm:text-base pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-slate-900' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  className="px-4 sm:px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#fbfbfa]"
                >
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
