import React, { useState } from 'react';
import { siteConfig } from '../data/site';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Mail, MessageSquare, CheckCircle, Send } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Feedback / Tool Suggestion');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Local simulation of contact submission
    if (name && email && message) {
      setSubmitted(true);
    }
  };

  return (
    <article className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[{ name: 'Contact' }]} onNavigate={onNavigate} />

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Contact & Feedback
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          Have an idea for a new calculator, found a mathematical discrepancy, or want to suggest a formula enhancement? We welcome feedback from our readers and users.
        </p>
      </header>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200">
        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Message Received</h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Thank you for getting in touch with the {siteConfig.brandName} team. We review all tool suggestions and bug reports attentively.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setName('');
                setEmail('');
                setMessage('');
              }}
              className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Your Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Subject
              </label>
              <select
                id="contact-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              >
                <option value="Feedback / Tool Suggestion">Suggest a New Calculator</option>
                <option value="Calculation Bug Report">Report a Calculation Discrepancy</option>
                <option value="Editorial / General Inquiry">Editorial & General Inquiry</option>
                <option value="AdSense / Partnership">Partnership / Advertising</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Message & Calculation Details
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please describe your suggestion, question, or the exact input values and expected outcome..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Message</span>
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3 text-xs text-slate-500">
          <Mail className="w-4 h-4 text-slate-400" />
          <span>Direct email: <strong className="text-slate-700">{siteConfig.contactEmail}</strong></span>
        </div>
      </div>
    </article>
  );
};
