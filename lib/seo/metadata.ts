import type { Metadata } from "next";
import { absoluteUrl, getSiteUrlFromHost } from "./site-url";
import { getSearchConsoleVerificationMetadata } from "./search-console";

export type PageMetadataInput = {
  host?: string | null;
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
};

export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const baseUrl = getSiteUrlFromHost(input.host);
  const canonical = absoluteUrl(input.path, baseUrl);
  const verification = getSearchConsoleVerificationMetadata();

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    metadataBase: new URL(baseUrl),
    alternates: { canonical },
    openGraph: {
      title: input.ogTitle ?? input.title,
      description: input.ogDescription ?? input.description,
      url: canonical,
      type: "website",
      locale: "en_US",
      siteName: "Call Dr. Gene Boyle — Irvine to Las Vegas Relocation",
    },
    twitter: {
      card: "summary_large_image",
      title: input.ogTitle ?? input.title,
      description: input.ogDescription ?? input.description,
    },
    robots: { index: true, follow: true },
    ...verification,
  };
}
