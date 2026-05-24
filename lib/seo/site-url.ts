/**
 * Canonical origin helpers — use host header in production, env fallback locally.
 */

import { getCanonicalOrigin, getCanonicalHostname } from "./canonical-host";

const DEFAULT_SITE_URL = "https://www.calldrboyle.com";

export function normalizeHost(host: string | null | undefined): string {
  if (!host) return "";
  return host.replace(/^www\./i, "").toLowerCase().split(":")[0] ?? "";
}

export function getSiteUrlFromHost(host: string | null | undefined): string {
  const canonicalOrigin = getCanonicalOrigin();
  const canonicalBare = normalizeHost(getCanonicalHostname());
  const requestBare = normalizeHost(host);

  if (
    requestBare &&
    requestBare !== "localhost" &&
    !requestBare.startsWith("127.0.0.1") &&
    requestBare === canonicalBare
  ) {
    return canonicalOrigin;
  }

  if (requestBare && requestBare !== "localhost" && !requestBare.startsWith("127.0.0.1")) {
    const requestHost = host?.split(":")[0]?.toLowerCase();
    if (requestHost) return `https://${requestHost}`;
  }

  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return env || DEFAULT_SITE_URL;
}

export function absoluteUrl(path: string, baseUrl: string): string {
  const base = baseUrl.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
