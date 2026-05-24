/**
 * Cloudflare Worker - Security Headers
 *
 * Adds comprehensive security headers to origin responses.
 */

export function applySecurityHeaders(response: Response): Response {
  const newResponse = new Response(response.body, response);

  const securityHeaders: Record<string, string> = {
    "Content-Security-Policy": [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://em.realscout.com https://www.realscout.com https://assets.calendly.com https://www.googletagmanager.com https://www.google-analytics.com https://widgetbe.com",
      "style-src 'self' 'unsafe-inline' https://em.realscout.com https://www.realscout.com https://assets.calendly.com",
      "img-src 'self' data: blob: https: http:",
      "font-src 'self' data: https://assets.calendly.com",
      "connect-src 'self' https://em.realscout.com https://www.realscout.com https://openrouter.ai https://api.openai.com https://calendly.com https://www.google-analytics.com https://analytics.google.com https://*.ingest.sentry.io https://widgetbe.com",
      "frame-src 'self' https://em.realscout.com https://www.realscout.com https://calendly.com https://assets.calendly.com https://www.google.com https://maps.google.com https://*.google.com",
      "worker-src 'self' blob:",
    ].join("; "),
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    "X-DNS-Prefetch-Control": "on",
    "X-XSS-Protection": "1; mode=block",
  };

  Object.entries(securityHeaders).forEach(([key, value]) => {
    newResponse.headers.set(key, value);
  });

  return newResponse;
}

export default {
  async fetch(request: Request): Promise<Response> {
    const response = await fetch(request);
    return applySecurityHeaders(response);
  },
};
