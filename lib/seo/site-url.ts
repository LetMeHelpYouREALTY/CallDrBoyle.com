/**
 * Canonical origin helpers — use host header in production, env fallback locally.
 */

const DEFAULT_SITE_URL = "https://calldrboyle.com";

export function normalizeHost(host: string | null | undefined): string {
  if (!host) return "";
  return host.replace(/^www\./i, "").toLowerCase().split(":")[0] ?? "";
}

export function getSiteUrlFromHost(host: string | null | undefined): string {
  const normalized = normalizeHost(host);
  if (normalized && normalized !== "localhost" && !normalized.startsWith("127.0.0.1")) {
    return `https://${normalized}`;
  }
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return env || DEFAULT_SITE_URL;
}

export function absoluteUrl(path: string, baseUrl: string): string {
  const base = baseUrl.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
