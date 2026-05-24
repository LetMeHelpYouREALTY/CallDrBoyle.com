import type { MetadataRoute } from "next";
import { SITEMAP_PATHS } from "@/lib/seo/sitemap-paths";
import { getSiteUrlFromHost } from "@/lib/seo/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrlFromHost(
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, "") ?? "calldrboyle.com"
  );
  const lastModified = new Date();

  return SITEMAP_PATHS.map((entry) => ({
    url: `${baseUrl.replace(/\/$/, "")}${entry.path}`,
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
