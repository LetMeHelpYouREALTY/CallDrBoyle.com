import SchemaScript from "@/components/SchemaScript";
import Link from "next/link";
import { generateSpeakableSchema, type SpeakableBlock } from "@/lib/seo/speakable";
import { generateBreadcrumbSchema } from "@/lib/schema";
import { getSiteUrlFromHost } from "@/lib/seo/site-url";
import { headers } from "next/headers";

export type BreadcrumbItem = { name: string; href: string };

type PageSeoExtrasProps = {
  breadcrumbs: BreadcrumbItem[];
  speakable?: SpeakableBlock;
  schemas?: Record<string, unknown>[];
  path: string;
};

export default async function PageSeoExtras({
  breadcrumbs,
  speakable,
  schemas = [],
  path,
}: PageSeoExtrasProps) {
  const host = headers().get("host");
  const baseUrl = getSiteUrlFromHost(host);

  const breadcrumbSchema = generateBreadcrumbSchema(
    breadcrumbs.map((b) => ({ name: b.name, url: b.href }))
  );

  const speakableSchema = speakable
    ? generateSpeakableSchema(baseUrl, path, speakable)
    : null;

  const allSchemas = [
    breadcrumbSchema,
    ...(speakableSchema ? [speakableSchema] : []),
    ...schemas,
  ];

  return (
    <>
      <SchemaScript schemas={allSchemas} id={`page-seo-${path.replace(/\//g, "-")}`} />
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500 mb-6 max-w-5xl mx-auto">
        <ol className="flex flex-wrap items-center gap-1">
          {breadcrumbs.map((item, i) => (
            <li key={item.href} className="flex items-center gap-1">
              {i > 0 && <span aria-hidden>/</span>}
              {i === breadcrumbs.length - 1 ? (
                <span className="text-slate-800 font-medium">{item.name}</span>
              ) : (
                <Link href={item.href} className="hover:text-blue-600">
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      {speakable && (
        <p
          id="speakable-summary"
          className="sr-only"
        >
          {speakable.summary}
        </p>
      )}
    </>
  );
}
