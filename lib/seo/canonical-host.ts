import type { NextRequest } from "next/server";

const DEFAULT_ORIGIN = "https://www.calldrboyle.com";

/** Production canonical origin from NEXT_PUBLIC_SITE_URL (matches GSC property URL). */
export function getCanonicalOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (!raw) return DEFAULT_ORIGIN;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  return `https://${raw}`;
}

export function getCanonicalHostname(): string {
  return new URL(getCanonicalOrigin()).hostname;
}

/** 308 redirect when host is a non-canonical alias (e.g. apex → www). Skips localhost and Vercel previews. */
export function getCanonicalHostRedirectUrl(request: NextRequest): URL | null {
  const requestHost = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (!requestHost) return null;
  if (
    requestHost === "localhost" ||
    requestHost.startsWith("127.0.0.1") ||
    requestHost.endsWith(".vercel.app")
  ) {
    return null;
  }

  const canonical = new URL(getCanonicalOrigin());
  const canonicalHost = canonical.hostname.toLowerCase();
  if (requestHost === canonicalHost) return null;

  const requestBare = requestHost.replace(/^www\./, "");
  const canonicalBare = canonicalHost.replace(/^www\./, "");
  if (requestBare !== canonicalBare) return null;

  const target = request.nextUrl.clone();
  target.protocol = canonical.protocol;
  target.host = canonical.host;
  return target;
}
