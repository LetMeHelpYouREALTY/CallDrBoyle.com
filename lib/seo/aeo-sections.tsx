import type { FAQItem } from "@/lib/schema";
import type { AeoFact } from "@/lib/seo/aeo-facts";

type AeoKeyFactsProps = {
  title?: string;
  facts: AeoFact[];
};

/** TL;DR / key-facts block for AEO — cite sources for AI extraction. */
export function AeoKeyFacts({ title = "Key facts", facts }: AeoKeyFactsProps) {
  return (
    <aside
      className="rounded-xl border border-blue-200 bg-blue-50 p-6 mb-10"
      aria-label={title}
    >
      <h2 className="text-lg font-bold text-slate-900 mb-4">{title}</h2>
      <ul className="space-y-3 text-sm text-slate-700">
        {facts.map((fact) => (
          <li key={fact.label}>
            <strong className="text-slate-900">{fact.label}:</strong> {fact.value}
            {fact.source ? (
              <span className="block text-xs text-slate-500 mt-1">
                Source:{" "}
                {fact.sourceUrl ? (
                  <a href={fact.sourceUrl} className="underline hover:text-blue-700">
                    {fact.source}
                  </a>
                ) : (
                  fact.source
                )}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </aside>
  );
}

type AeoAnswerLeadProps = {
  children: React.ReactNode;
  className?: string;
};

/** Answer-first lead paragraph — first sentence should directly answer the page topic. */
export function AeoAnswerLead({ children, className = "" }: AeoAnswerLeadProps) {
  return (
    <p className={`text-lg text-slate-700 leading-relaxed ${className}`}>{children}</p>
  );
}

type AeoFaqSectionProps = {
  title: string;
  faqs: FAQItem[];
};

/** Visible FAQ block for AEO — pair with generateFAQSchema in PageSeoExtras schemas. */
export function AeoFaqSection({ title, faqs }: AeoFaqSectionProps) {
  return (
    <section className="max-w-4xl mx-auto mt-16" aria-labelledby="aeo-faq-heading">
      <h2 id="aeo-faq-heading" className="text-2xl font-bold text-slate-900 mb-6">
        {title}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <article key={faq.question} className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
            <p className="text-slate-700 text-sm leading-relaxed">{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

type AeoSectionBlockProps = {
  /** Question-phrased H2 for AI query matching */
  heading: string;
  children: React.ReactNode;
};

export function AeoSectionBlock({ heading, children }: AeoSectionBlockProps) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">{heading}</h2>
      {children}
    </section>
  );
}
