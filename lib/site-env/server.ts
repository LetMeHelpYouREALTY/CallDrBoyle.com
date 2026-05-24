/**
 * Server-only secrets — never import from Client Components.
 */

function readSecret(name: string): string | undefined {
  const raw = process.env[name];
  if (raw === undefined || raw === null) return undefined;
  const value = String(raw).trim();
  return value || undefined;
}

function parseBool(value: string | undefined, defaultValue = false): boolean {
  if (value === undefined || value === "") return defaultValue;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

export const serverEnv = {
  fubApiKey: readSecret("FUB_API_KEY"),
  fubSystemKey: readSecret("FUB_SYSTEM_KEY"),
  followUpBossAgentId: readSecret("FOLLOW_UP_BOSS_AGENT_ID"),
  googleSiteVerification: readSecret("GOOGLE_SITE_VERIFICATION"),
  bingSiteVerification: readSecret("BING_SITE_VERIFICATION"),
  cloudinaryApiKey: readSecret("CLOUDINARY_API_KEY"),
  cloudinaryApiSecret: readSecret("CLOUDINARY_API_SECRET"),
  cloudinaryFolder: readSecret("CLOUDINARY_FOLDER"),
  cloudflareApiToken: readSecret("CLOUDFLARE_API_TOKEN"),
  cloudflareOriginCaKey: readSecret("CLOUDFLARE_ORIGIN_CA_KEY"),
  notionToken: readSecret("NOTION_TOKEN"),
  smsAutoReplyEnabled: parseBool(
    readSecret("SMS_AUTO_REPLY_ENABLED") ?? readSecret("NEXT_PUBLIC_SMS_AUTO_REPLY_ENABLED")
  ),
  openRouterApiKey: readSecret("OPENROUTER_API_KEY"),
  anthropicApiKey: readSecret("ANTHROPIC_API_KEY"),
  turnstileSecretKey: readSecret("TURNSTILE_SECRET_KEY"),
} as const;

export function requireSecret(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getIntegrationStatus() {
  return {
    fub: Boolean(serverEnv.fubApiKey),
    cloudinary: Boolean(serverEnv.cloudinaryApiKey && serverEnv.cloudinaryApiSecret),
    cloudflare: Boolean(serverEnv.cloudflareApiToken),
    notion: Boolean(serverEnv.notionToken),
    turnstile: Boolean(serverEnv.turnstileSecretKey),
    smsAutoReply: serverEnv.smsAutoReplyEnabled,
    googleSiteVerification: Boolean(serverEnv.googleSiteVerification),
  };
}
