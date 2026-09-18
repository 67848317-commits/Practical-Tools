import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Calculator, 
  ArrowRight, 
  Lightbulb, 
  AlertTriangle, 
  ChevronDown, 
  BookOpen,
  Share2,
  BookmarkCheck,
  ListTree,
  ExternalLink,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { guides, getGuideBySlug, getRelatedGuides, GuideItem } from '../data/guides';
import { tools } from '../data/tools';
import { updatePageSEO } from '../utils/seo';

interface GuidePageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const GuidePage: React.FC<GuidePageProps> = ({ slug, onNavigate }) => {
  const guide = getGuideBySlug(slug);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (guide) {
      updatePageSEO({
        title: guide.title,
        description: guide.description,
        canonicalPath: `/guides/${guide.slug}`,
        type: 'article',
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: 'Guides', url: '/guides' },
          { name: guide.category, url: `/guides` },
          { name: guide.title },
        ],
        faqs: guide.faqs.map((f) => ({ question: f.question, answer: f.answer })),
        article: {
          headline: guide.title,
          description: guide.description,
          publishedDate: guide.publishedDate,
          updatedDate: guide.updatedDate,
        },
      });
      window.scrollTo(0, 0);
    }
  }, [guide, slug]);

  if (!guide) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-3">Guide Not Found</h1>
        <p className="text-sm text-slate-600 mb-6">The requested practical guide could not be located.</p>
        <button
          type="button"
          onClick={() => onNavigate('/guides')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-semibold shadow-sm hover:bg-slate-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Browse All Guides
        </button>
      </div>
    );
  }

  const relatedTools = guide.relatedTools
    .map((s) => tools.find((t) => t.slug === s))
    .filter((t): t is typeof tools[0] => t !== undefined);

  const primaryTool = relatedTools[0];
  const relatedGuidesList = getRelatedGuides(guide.relatedGuides || []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <article className="pt-page-container py-8 sm:py-12 max-w-4xl mx-auto">
      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-xs text-slate-500 mb-6">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="hover:text-slate-900 transition-colors"
        >
          Home
        </button>
        <span>/</span>
        <button
          type="button"
          onClick={() => onNavigate('/guides')}
          className="hover:text-slate-900 transition-colors"
        >
          Guides
        </button>
        <span>/</span>
        <span className="font-semibold text-slate-900 truncate max-w-[280px] sm:max-w-md">
          {guide.title}
        </span>
      </nav>

      {/* 2 & 3 & 4. Article Header & Meta */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 mb-4">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Category label */}
            <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200/70 font-bold uppercase tracking-wider text-[11px]">
              {guide.category}
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {guide.readingTime}
            </span>
            <span className="text-slate-300">•</span>
            <span className="flex items-center gap-1 text-slate-600">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Updated {guide.updatedDate}
            </span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition-colors"
            title="Copy guide link to clipboard"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copied ? 'Link Copied!' : 'Share'}
          </button>
        </div>

        {/* H1 Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          {guide.title}
        </h1>

        {/* Short Introduction */}
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
          {guide.shortIntro}
        </p>

        {/* 5. Quick Answer / Key Takeaway Box */}
        <div id="quick-answer" className="bg-emerald-50/90 border-2 border-emerald-300 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              Quick Answer & Summary
            </div>
            {primaryTool && (
              <button
                type="button"
                onClick={() => onNavigate(`/calculators/${primaryTool.slug}`)}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline"
              >
                Use {primaryTool.shortTitle} →
              </button>
            )}
          </div>

          <p className="text-sm sm:text-base text-emerald-950 leading-relaxed font-medium mb-3">
            {guide.quickAnswer ? guide.quickAnswer.text : guide.directAnswer}
          </p>

          {guide.quickAnswer && (
            <div className="mt-3 pt-3 border-t border-emerald-200 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-white rounded-lg p-3 border border-emerald-200 font-mono text-emerald-950 shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-emerald-800 block mb-1">
                  Quick Formula
                </span>
                {guide.quickAnswer.formula}
              </div>
              <div className="bg-white rounded-lg p-3 border border-emerald-200 text-slate-800 shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-emerald-800 block mb-1">
                  Instant Example
                </span>
                {guide.quickAnswer.example}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* 6. Table of Contents */}
      <nav aria-label="Table of Contents" className="mb-10 p-5 bg-white border border-slate-200 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
          <ListTree className="w-4 h-4 text-amber-600" />
          Table of Contents
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
          <button type="button" onClick={() => scrollToSection('quick-answer')} className="text-left hover:text-amber-700 hover:underline transition-colors">
            1. Quick Answer & Summary
          </button>
          <button type="button" onClick={() => scrollToSection('concepts')} className="text-left hover:text-amber-700 hover:underline transition-colors">
            2. Understanding the Concepts
          </button>
          <button type="button" onClick={() => scrollToSection('formula')} className="text-left hover:text-amber-700 hover:underline transition-colors">
            3. The Formula & Notation
          </button>
          <button type="button" onClick={() => scrollToSection('steps')} className="text-left hover:text-amber-700 hover:underline transition-colors">
            4. Step-by-Step Calculation
          </button>
          <button type="button" onClick={() => scrollToSection('examples')} className="text-left hover:text-amber-700 hover:underline transition-colors">
            5. Worked Practical Examples
          </button>
          <button type="button" onClick={() => scrollToSection('real-world')} className="text-left hover:text-amber-700 hover:underline transition-colors">
            6. Real-World Considerations
          </button>
          <button type="button" onClick={() => scrollToSection('mistakes')} className="text-left hover:text-amber-700 hover:underline transition-colors">
            7. Common Mistakes to Avoid
          </button>
          <button type="button" onClick={() => scrollToSection('tips')} className="text-left hover:text-amber-700 hover:underline transition-colors">
            8. Practical Tips & Shortcuts
          </button>
          <button type="button" onClick={() => scrollToSection('faqs')} className="text-left hover:text-amber-700 hover:underline transition-colors">
            9. Frequently Asked Questions
          </button>
          <button type="button" onClick={() => scrollToSection('takeaway')} className="text-left hover:text-amber-700 hover:underline transition-colors">
            10. Final Takeaway
          </button>
        </div>
      </nav>

      {/* 14. Primary Interactive Calculator CTA Banner */}
      {primaryTool && (
        <aside aria-label="Interactive Tool Recommendation" className="my-8 p-6 bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block">
              Interactive Calculator
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Want to calculate this instantly?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Use our free client-side {primaryTool.title} with real-time arithmetic breakdown and instant input updates.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate(`/calculators/${primaryTool.slug}`)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold whitespace-nowrap transition-colors self-start sm:self-center shrink-0 shadow-sm"
          >
            <Calculator className="w-4 h-4" />
            Open {primaryTool.shortTitle}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}

      {/* Article Content Sections */}
      <div className="space-y-12 border-t border-slate-200 pt-8">
        
        {/* 7. Understanding the Concepts (Explain Concepts Before Formulas) */}
        {guide.concepts && guide.concepts.length > 0 && (
          <section id="concepts" aria-labelledby="concepts-heading">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <h2 id="concepts-heading" className="text-xl sm:text-2xl font-bold text-slate-900">
                Understanding the Concepts
              </h2>
            </div>
            {guide.conceptsIntro && (
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                {guide.conceptsIntro}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {guide.concepts.map((concept, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    {concept.term}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2">
                    {concept.definition}
                  </p>
                  {concept.example && (
                    <div className="text-[11px] font-mono bg-slate-50 p-2 rounded text-slate-700 border border-slate-200">
                      <strong className="text-slate-900">Example:</strong> {concept.example}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. The Mathematical Formula (Visually distinct, selectable text) */}
        <section id="formula" aria-labelledby="formula-heading">
          <h2 id="formula-heading" className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
            The Formula
          </h2>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              {guide.formula.name}
            </span>
            <div className="bg-slate-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-4 select-text">
              <pre className="text-xs sm:text-sm font-mono font-bold text-slate-900 whitespace-pre-wrap select-all leading-relaxed">
                {guide.formula.equation}
              </pre>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 list-disc pl-5">
              {guide.formula.explanation.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 9. Step-by-Step Calculation */}
        <section id="steps" aria-labelledby="steps-heading">
          <h2 id="steps-heading" className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
            Step-by-Step Calculation
          </h2>
          <div className="space-y-3">
            {guide.steps.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-2xs"
              >
                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-900 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-slate-300">
                  {idx + 1}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed pt-0.5">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 10. Worked Practical Examples */}
        <section id="examples" aria-labelledby="examples-heading">
          <h2 id="examples-heading" className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
            Worked Practical Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {guide.workedExamples.map((ex, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                    {ex.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                    {ex.scenario}
                  </p>
                  <div className="bg-slate-50 rounded-lg p-3 space-y-1 mb-4 border border-slate-200 text-xs font-mono text-slate-700">
                    {ex.steps.map((s, sIdx) => (
                      <div key={sIdx} className="leading-relaxed">→ {s}</div>
                    ))}
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-500">Calculated Result:</span>
                  <span className="text-emerald-700 font-mono font-bold">
                    {ex.result}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 11. Real-World Considerations (Where Simple Calculations Fail in Practice) */}
        {guide.realWorldConsiderations && guide.realWorldConsiderations.length > 0 && (
          <section id="real-world" aria-labelledby="real-world-heading">
            <h2 id="real-world-heading" className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
              Real-World Considerations
            </h2>
            <div className="space-y-4">
              {guide.realWorldConsiderations.map((rw, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                    {rw.factor}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    {rw.description}
                  </p>
                  <div className="text-xs bg-amber-50 border-l-2 border-amber-500 p-2.5 rounded-r text-amber-900">
                    <strong className="text-amber-950">Practical Impact:</strong> {rw.impact}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 12. Common Mistakes to Avoid */}
        <section id="mistakes" aria-labelledby="mistakes-heading">
          <h2 id="mistakes-heading" className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
            Common Mistakes to Avoid
          </h2>
          <div className="space-y-4">
            {guide.commonMistakes.map((mistake, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs"
              >
                <div className="flex items-start gap-3 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {mistake.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3 pl-8">
                  {mistake.description}
                </p>
                <div className="ml-8 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                  <span className="font-bold text-emerald-900">How to fix it: </span>
                  {mistake.fix}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 13. Practical Tips & Mental Math Shortcuts */}
        <section id="tips" aria-labelledby="tips-heading">
          <h2 id="tips-heading" className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
            Practical Tips & Mental Math Shortcuts
          </h2>
          <div className="space-y-3">
            {guide.practicalTips.map((tip, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs sm:text-sm text-slate-800"
              >
                <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{tip}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 14. Related Calculators */}
        {relatedTools.length > 0 && (
          <section id="calculators" aria-labelledby="related-tools-heading">
            <h2 id="related-tools-heading" className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
              Related Calculators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {relatedTools.map((tool) => (
                <button
                  key={tool.slug}
                  type="button"
                  onClick={() => onNavigate(`/calculators/${tool.slug}`)}
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-amber-500 text-left transition-colors flex flex-col justify-between group shadow-2xs"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      {tool.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-amber-600 mb-1">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {tool.shortIntro}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center gap-1 text-xs font-semibold text-amber-700">
                    Use Calculator
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* 15. Related Practical Guides */}
        {relatedGuidesList.length > 0 && (
          <section aria-labelledby="related-guides-heading">
            <h2 id="related-guides-heading" className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
              Related Practical Guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedGuidesList.map((relGuide) => (
                <button
                  key={relGuide.slug}
                  type="button"
                  onClick={() => onNavigate(`/guides/${relGuide.slug}`)}
                  className="p-5 rounded-xl bg-white border border-slate-200 hover:border-amber-500 text-left transition-colors flex flex-col justify-between group shadow-2xs"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
                      {relGuide.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-amber-600 mb-1.5">
                      {relGuide.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {relGuide.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                    <span>{relGuide.readingTime}</span>
                    <span className="font-semibold text-amber-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                      Read Guide →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* 16. Frequently Asked Questions */}
        {guide.faqs && guide.faqs.length > 0 && (
          <section id="faqs" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {guide.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform shrink-0 ${
                        openFaqIndex === idx ? 'rotate-180 text-amber-600' : ''
                      }`}
                    />
                  </button>
                  {openFaqIndex === idx && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed bg-slate-50/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 17. Final Takeaway */}
        {guide.finalTakeaway && (
          <section id="takeaway" aria-labelledby="takeaway-heading" className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Final Takeaway
            </div>
            <h2 id="takeaway-heading" className="text-lg sm:text-xl font-bold mb-3 text-white">
              Summary & Best Practices
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {guide.finalTakeaway}
            </p>
          </section>
        )}

      </div>
    </article>
  );
};
