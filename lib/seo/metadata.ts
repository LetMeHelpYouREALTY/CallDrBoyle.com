import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
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
    authors: [{ name: "Dr. Jan Duffy", url: absoluteUrl("/about", baseUrl) }],
    creator: "Berkshire Hathaway HomeServices Nevada Properties",
    publisher: "Berkshire Hathaway HomeServices Nevada Properties",
    category: "Real Estate",
    openGraph: {
      title: input.ogTitle ?? input.title,
      description: input.ogDescription ?? input.description,
      url: canonical,
      type: "website",
      locale: "en_US",
      siteName: siteConfig.ogSiteName,
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
