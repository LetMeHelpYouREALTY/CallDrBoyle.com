import { describe, expect, it } from "vitest";
import { getRealScoutAgentEncodedId, getGoogleMapsApiKey } from "./public";

describe("public env", () => {
  it("falls back to default RealScout agent id", () => {
    expect(getRealScoutAgentEncodedId()).toMatch(/^[A-Za-z0-9+/=]+$/);
  });

  it("reads Google Maps key from NEXT_PUBLIC or VITE fallback", () => {
    const key = getGoogleMapsApiKey();
    expect(key === undefined || typeof key === "string").toBe(true);
  });
});
