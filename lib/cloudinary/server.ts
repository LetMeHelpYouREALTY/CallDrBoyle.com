import { serverEnv } from "@/lib/site-env/server";
import { publicEnv } from "@/lib/site-env/public";

/** Server-side Cloudinary config derived from Vercel env vars. */
export function getCloudinaryConfig() {
  return {
    cloudName: publicEnv.cloudinaryCloudName,
    apiKey: serverEnv.cloudinaryApiKey,
    apiSecret: serverEnv.cloudinaryApiSecret,
    folder: serverEnv.cloudinaryFolder,
    isConfigured: Boolean(
      publicEnv.cloudinaryCloudName &&
        serverEnv.cloudinaryApiKey &&
        serverEnv.cloudinaryApiSecret
    ),
  };
}
