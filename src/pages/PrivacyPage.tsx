import React from 'react';
import { siteConfig } from '../data/site';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface PrivacyPageProps {
  onNavigate: (path: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs items={[{ name: 'Privacy Policy' }]} onNavigate={onNavigate} />

      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">
          Last updated: January 2026 | Effective immediately for {siteConfig.brandName}
        </p>
      </header>

      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">1. Overview & Client-Side Architecture</h2>
          <p>
            At {siteConfig.brandName} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), privacy is a cornerstone of our architecture. Our calculators, estimators, and converters are designed to execute math client-side within your web browser. When you input sensitive data—such as financial sums, salaries, tip distributions, or dimensions—that data is processed locally by JavaScript on your machine. We do not store, intercept, or transmit your calculation parameters to our servers.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">2. Information We Do Not Collect</h2>
          <p>
            We do not require user accounts, passwords, or personal registrations to use our calculators. You do not need to provide your legal name, physical address, or payment credentials.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">3. Cookies, Web Beacons & Advertising Partners</h2>
          <p className="mb-2">
            Third-party vendors, including Google AdSense, may use cookies to serve ads based on a user’s prior visits to this website or other websites. Google’s use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting Google Ads Settings (https://www.google.com/settings/ads) or through opt-out portals like the Network Advertising Initiative (http://www.aboutads.info/choices/).
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">4. Standard Log Files</h2>
          <p>
            Like virtually all internet platforms, our hosting infrastructure may log standard non-personally identifiable technical telemetry (e.g., browser type, IP address, operating system, referring URL, time of request). This telemetry is utilized exclusively for server security, DDoS mitigation, and Core Web Vitals optimization.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">5. Children’s Privacy</h2>
          <p>
            {siteConfig.brandName} does not knowingly collect any personally identifiable information from children under the age of 13. If you believe your child has submitted personal information on our website, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-slate-900 mb-2">6. Contacting Us Regarding Privacy</h2>
          <p>
            If you have questions or concerns regarding this privacy statement, you can contact our privacy officer at{' '}
            <strong className="text-slate-900">{siteConfig.contactEmail}</strong>.
          </p>
        </section>
      </div>
    </article>
  );
};
