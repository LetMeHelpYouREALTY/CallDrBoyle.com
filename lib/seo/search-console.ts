import type { Metadata } from "next";

/**
 * Google Search Console + related webmaster verification tokens.
 * Set env vars in Vercel — paste the content value only (not the full HTML meta tag).
 */
export function getSearchConsoleVerificationMetadata(): Pick<Metadata, "verification"> {
  const google = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  const bing = process.env.BING_SITE_VERIFICATION?.trim();

  if (!google && !bing) return {};

  return {
    verification: {
      ...(google ? { google } : {}),
      ...(bing ? { other: { "msvalidate.01": bing } } : {}),
    },
  };
}

/** Absolute sitemap URL for GSC submission — must match robots.txt and canonical host. */
export function getSitemapAbsoluteUrl(baseUrl: string): string {
  return `${baseUrl.replace(/\/$/, "")}/sitemap.xml`;
}
