import { headers } from "next/headers";
import PageSeoExtras from "@/components/seo/PageSeoExtras";
import { AeoFaqSection } from "@/lib/seo/aeo-sections";
import { enrichWithDomainKeywords, resolvePageSeo } from "@/lib/seo/resolve-page-seo";
import { generateFAQSchema, generateServiceSchema } from "@/lib/schema";
import { agentInfo } from "@/lib/site-config";

type UniversalPageSeoProps = {
  /** Override pathname when not available from middleware header. */
  path?: string;
};

/**
 * Site-wide SEO / GEO / AEO layer: breadcrumbs, FAQ + WebPage schema, speakable summary,
 * and a compact visible Q&A block for answer engines.
 */
export default async function UniversalPageSeo({ path: pathProp }: UniversalPageSeoProps) {
  const headerPath = headers().get("x-pathname");
  const path = pathProp ?? headerPath ?? "/";

  const resolvedBase = await resolvePageSeo(path);
  if (!resolvedBase) return null;

  const host = headers().get("host");
  const resolved = enrichWithDomainKeywords(resolvedBase, host);

  const serviceSchema = generateServiceSchema({
    name: `${resolved.pageTitle} — Las Vegas`,
    description: resolved.speakable.summary,
    url: resolved.path,
  });

  const schemas = [
    ...(resolved.injectSchema ? [generateFAQSchema(resolved.faqs), serviceSchema] : []),
  ];

  return (
    <div className="bg-slate-50 border-t border-slate-200">
      {resolved.injectSchema && schemas.length > 0 ? (
        <PageSeoExtras
          path={resolved.path}
          breadcrumbs={resolved.breadcrumbs}
          speakable={resolved.speakable}
          schemas={schemas}
          schemaOnly
        />
      ) : null}

      {resolved.injectVisibleFaq && resolved.faqs.length > 0 ? (
        <div className="container mx-auto px-4 py-10">
          <AeoFaqSection
            title={`Questions about ${resolved.pageTitle}`}
            faqs={resolved.faqs.slice(0, 3)}
          />
        </div>
      ) : null}

      <p className="sr-only" id="geo-entity-mention">
        {agentInfo.name}, REALTOR® with {agentInfo.brokerage}. Licensed Nevada real estate
        services for Las Vegas, Henderson, Summerlin, and Irvine, California relocation to Las
        Vegas.
      </p>
    </div>
  );
}
