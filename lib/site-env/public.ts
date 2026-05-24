/**
 * Client-safe environment (NEXT_PUBLIC_* and build-inlined values only).
 */

const DEFAULT_REALSCOUT_AGENT_ENCODED_ID = "QWdlbnQtMjI1MDUw";

function readPublic(name: string): string | undefined {
  const raw = process.env[name];
  if (raw === undefined || raw === null) return undefined;
  const value = String(raw).trim();
  return value || undefined;
}

function parseBool(value: string | undefined, defaultValue = false): boolean {
  if (value === undefined || value === "") return defaultValue;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

function isNumericAgentId(value: string): boolean {
  return /^\d+$/.test(value);
}

/** RealScout subdomain slugs (e.g. drjanduffy) are not widget agent-encoded-id values. */
function isRealScoutSubdomainSlug(value: string): boolean {
  return /^[a-z][a-z0-9-]*$/.test(value);
}

/** RealScout `agent-encoded-id` — base64-style id (e.g. QWdlbnQtMjI1MDUw). */
function isRealScoutEncodedAgentId(value: string): boolean {
  if (isNumericAgentId(value) || isRealScoutSubdomainSlug(value)) return false;
  return /^[A-Za-z0-9+/=_-]+$/.test(value) && value.length >= 8;
}

/** RealScout `agent-encoded-id` — not the numeric Follow Up Boss user id or subdomain slug. */
export function getRealScoutAgentEncodedId(): string {
  const explicit = readPublic("NEXT_PUBLIC_REALSCOUT_AGENT_ENCODED_ID");
  if (explicit && isRealScoutEncodedAgentId(explicit)) return explicit;

  const fubNamed = readPublic("FOLLOW_UP_BOSS_AGENT_ID");
  if (fubNamed && isRealScoutEncodedAgentId(fubNamed)) return fubNamed;

  return DEFAULT_REALSCOUT_AGENT_ENCODED_ID;
}

/** Google Maps — prefers Next.js name; accepts legacy Vite key from Vercel. */
export function getGoogleMapsApiKey(): string | undefined {
  return (
    readPublic("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY") ??
    readPublic("VITE_GOOGLE_MAPS_API_KEY")
  );
}

export const publicEnv = {
  siteUrl: readPublic("NEXT_PUBLIC_SITE_URL") ?? "https://www.calldrboyle.com",
  gaMeasurementId: readPublic("NEXT_PUBLIC_GA_MEASUREMENT_ID"),
  googleMapsApiKey: getGoogleMapsApiKey(),
  realScoutAgentEncodedId: getRealScoutAgentEncodedId(),
  cloudinaryCloudName: readPublic("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"),
  turnstileSiteKey: readPublic("NEXT_PUBLIC_TURNSTILE_SITE_KEY"),
  sentryDsn: readPublic("NEXT_PUBLIC_SENTRY_DSN"),
  smsAutoReplyEnabled: parseBool(readPublic("NEXT_PUBLIC_SMS_AUTO_REPLY_ENABLED")),
} as const;

export function getGoogleMapsEmbedUrl(address: string): string {
  const key = getGoogleMapsApiKey();
  const q = encodeURIComponent(address);
  if (key) {
    return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${q}`;
  }
  return `https://maps.google.com/maps?q=${q}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

export function getCloudinaryImageUrl(
  publicId: string,
  options?: { width?: number; quality?: number }
): string | null {
  const cloudName = publicEnv.cloudinaryCloudName;
  if (!cloudName) return null;
  const folder =
    readPublic("NEXT_PUBLIC_CLOUDINARY_FOLDER") ?? readPublic("CLOUDINARY_FOLDER");
  const path = folder ? `${folder}/${publicId.replace(/^\//, "")}` : publicId.replace(/^\//, "");
  const params = new URLSearchParams();
  if (options?.width) params.set("w", String(options.width));
  if (options?.quality) params.set("q", String(options.quality));
  const query = params.toString();
  return `https://res.cloudinary.com/${cloudName}/image/upload${query ? `?${query}` : ""}/${path}`;
}
