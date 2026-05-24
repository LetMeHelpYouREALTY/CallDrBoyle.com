import type { FAQItem } from "@/lib/schema";

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
