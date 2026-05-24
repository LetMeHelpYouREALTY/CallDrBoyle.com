import type { MetadataRoute } from "next";
import { headers } from "next/headers";
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
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
    ],
    sitemap: getSitemapAbsoluteUrl(baseUrl),
    host: baseUrl.replace(/^https?:\/\//, ""),
  };
}
