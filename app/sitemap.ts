import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { getSitemapLastModified } from "@/lib/seo/sitemap-lastmod";
import { SITEMAP_PATHS } from "@/lib/seo/sitemap-paths";
import { getSiteUrlFromHost } from "@/lib/seo/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const host = headers().get("host");
  const baseUrl = getSiteUrlFromHost(host);

  return SITEMAP_PATHS.map((entry) => ({
    url: `${baseUrl.replace(/\/$/, "")}${entry.path}`,
    lastModified: getSitemapLastModified(entry.path),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
