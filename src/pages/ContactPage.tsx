import React from 'react';
import { siteConfig } from '../data/site';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Mail, MessageSquare, AlertCircle, Lightbulb, HelpCircle, ArrowUpRight } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

const CONTACT_TOPICS = [
  {
    title: 'Report a Calculation Discrepancy',
    description: 'Found an unexpected output or rounding issue? Send us the calculator name, inputs used, and expected result.',
    subject: 'Calculation Discrepancy Report - Practical Tools',
    icon: AlertCircle,
  },
  {
    title: 'Suggest a New Calculator',
    description: 'Have a practical everyday formula or converter you would like added to the collection?',
    subject: 'New Calculator Suggestion - Practical Tools',
    icon: Lightbulb,
  },
  {
    title: 'Editorial & Source Inquiry',
    description: 'Questions about our technical references, benchmarks, or methodology explanations.',
    subject: 'Editorial & Methodology Inquiry - Practical Tools',
    icon: MessageSquare,
  },
  {
    title: 'General & Partnership Inquiries',
    description: 'General feedback, accessibility reports, or advertising and partnership questions.',
    subject: 'General Inquiry - Practical Tools',
    icon: HelpCircle,
  },
];

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const email = siteConfig.contactEmail;
  const primaryMailtoHref = `mailto:${email}?subject=${encodeURIComponent('Feedback for Practical Tools')}`;

  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[{ name: 'Contact' }]} onNavigate={onNavigate} />

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Contact &amp; Feedback
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Have an idea for a new calculator, found a mathematical discrepancy, or have a question about our methodology? You can reach the {siteConfig.brandName} editorial team directly by email.
        </p>
      </header>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-8">
        {/* Direct Email Primary Card */}
        <section aria-labelledby="direct-email-heading" className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200/80 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 id="direct-email-heading" className="text-lg font-bold text-slate-900">
                Direct Editorial Email
              </h2>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Practical Tools operates as a static, privacy-first site without an automated web form backend. To make sure your note reaches us directly, please email our editorial team using the address below.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="text-sm text-slate-700">
              Email address:{' '}
              <a
                href={`mailto:${email}`}
                className="font-semibold text-blue-700 hover:text-blue-900 underline break-all"
              >
                {email}
              </a>
            </div>
            <a
              href={primaryMailtoHref}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-lg transition-colors shrink-0"
            >
              <Mail className="w-4 h-4" />
              <span>Email Editorial Team</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Quick-Topic Mailto Links */}
        <section aria-labelledby="contact-topics-heading" className="space-y-3">
          <h2 id="contact-topics-heading" className="text-sm font-bold uppercase tracking-wider text-slate-700">
            Choose a Topic to Pre-Fill Your Email Subject
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CONTACT_TOPICS.map((topic) => {
              const Icon = topic.icon;
              const topicHref = `mailto:${email}?subject=${encodeURIComponent(topic.subject)}`;
              return (
                <a
                  key={topic.title}
                  href={topicHref}
                  className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-colors flex flex-col justify-between gap-2 group"
                >
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-blue-700">
                      <Icon className="w-4 h-4 text-slate-500 group-hover:text-blue-600 shrink-0" />
                      <span>{topic.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-blue-700 inline-flex items-center gap-1 pt-1">
                    Open email draft
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        {/* Helpful Details Guidance */}
        <section aria-labelledby="helpful-details-heading" className="pt-6 border-t border-slate-100">
          <h2 id="helpful-details-heading" className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Helpful Details to Include When Reporting an Issue
          </h2>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-1 leading-relaxed">
            <li>The calculator page URL or tool name</li>
            <li>The exact input values and unit selection you used</li>
            <li>The displayed result versus what you expected, along with any reference source if applicable</li>
          </ul>
        </section>
      </div>
    </article>
  );
};

