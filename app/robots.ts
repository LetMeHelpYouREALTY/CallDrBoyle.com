import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { AI_AND_PREVIEW_CRAWLERS } from "@/lib/seo/ai-crawler-agents";
import { getSitemapAbsoluteUrl } from "@/lib/seo/search-console";
import { getSiteUrlFromHost } from "@/lib/seo/site-url";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = headers().get("host");
  const baseUrl = getSiteUrlFromHost(host);

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/monitoring"],
      },
      ...AI_AND_PREVIEW_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/", "/monitoring"],
      })),
    ],
    sitemap: getSitemapAbsoluteUrl(baseUrl),
    host: baseUrl.replace(/^https?:\/\//, ""),
  };
}
