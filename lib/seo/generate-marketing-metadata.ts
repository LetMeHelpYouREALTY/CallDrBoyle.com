import { headers } from "next/headers";
import type { Metadata } from "next";
import { buildPageMetadata, type PageMetadataInput } from "@/lib/seo/metadata";
import {
  buildRegistryMetadata,
  enrichWithDomainKeywords,
  resolvePageSeo,
} from "@/lib/seo/resolve-page-seo";

export type MarketingMetadataOverrides = Partial<
  Omit<PageMetadataInput, "host" | "path">
> &
  Pick<Partial<Metadata>, "openGraph" | "twitter" | "robots" | "alternates">;

function mergeMetadata(
  base: Metadata,
  extras: Pick<
    Partial<Metadata>,
    "openGraph" | "twitter" | "robots" | "alternates"
  >
): Metadata {
  const merged: Metadata = { ...base };

  if (extras.robots) merged.robots = extras.robots;
  if (extras.alternates) {
    merged.alternates = { ...base.alternates, ...extras.alternates };
  }
  if (extras.openGraph) {
    merged.openGraph = {
      ...(typeof base.openGraph === "object" ? base.openGraph : {}),
      ...extras.openGraph,
    };
  }
  if (extras.twitter) {
    merged.twitter = {
      ...(typeof base.twitter === "object" ? base.twitter : {}),
      ...extras.twitter,
    };
  }

  return merged;
}

/** Trim to ~160 chars for meta description without mid-word cuts. */
export function trimMetaDescription(text: string, max = 160): string {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  const truncated = cleaned.slice(0, max - 1);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 80 ? truncated.slice(0, lastSpace) : truncated).trim() + "…";
}

/**
 * Registry-backed metadata for marketing pages — merges page-specific copy with
 * GEO/AEO keywords from resolve-page-seo.
 */
export async function generateMarketingMetadata(
  path: string,
  overrides: MarketingMetadataOverrides = {}
): Promise<Metadata> {
  const host = headers().get("host");
  const resolved = await resolvePageSeo(path);

  const { robots, openGraph, twitter, alternates, ...restOverrides } = overrides;
  const metadataExtras = { robots, openGraph, twitter, alternates };

  if (!resolved) {
    const base = buildPageMetadata({
      host,
      path,
      title:
        restOverrides.title ??
        "Las Vegas Real Estate | Berkshire Hathaway HomeServices",
      description:
        restOverrides.description ??
        "Expert real estate in Las Vegas, Henderson, and Summerlin.",
      keywords: restOverrides.keywords,
      ogTitle: restOverrides.ogTitle,
      ogDescription: restOverrides.ogDescription,
    });
    return mergeMetadata(base, metadataExtras);
  }

  const enriched = enrichWithDomainKeywords(resolved, host);
  const mergedKeywords = restOverrides.keywords
    ? Array.from(
        new Set([...restOverrides.keywords, ...enriched.keywords])
      ).slice(0, 15)
    : enriched.keywords;

  const input = buildRegistryMetadata(path, enriched, {
    ...restOverrides,
    keywords: mergedKeywords,
    title: restOverrides.title,
    description:
      restOverrides.description ??
      trimMetaDescription(enriched.speakable.summary),
    ogTitle: restOverrides.ogTitle,
    ogDescription: restOverrides.ogDescription,
  });

  const base = buildPageMetadata({ ...input, host });
  return mergeMetadata(base, metadataExtras);
}
