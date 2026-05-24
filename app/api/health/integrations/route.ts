import { NextResponse } from "next/server";
import { getIntegrationStatus } from "@/lib/site-env/server";
import { publicEnv } from "@/lib/site-env/public";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Non-secret integration checklist for post-deploy verification. */
export async function GET() {
  try {
    const integrations = getIntegrationStatus();

    return NextResponse.json({
      ok: true,
      siteUrl: publicEnv.siteUrl,
      integrations: {
        ...integrations,
        ga4: Boolean(publicEnv.gaMeasurementId),
        googleMaps: Boolean(publicEnv.googleMapsApiKey),
        realScout: Boolean(publicEnv.realScoutAgentEncodedId),
        cloudinaryPublic: Boolean(publicEnv.cloudinaryCloudName),
        turnstile: Boolean(publicEnv.turnstileSiteKey),
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[health/integrations]", error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
