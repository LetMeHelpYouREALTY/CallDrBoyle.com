import { describe, expect, it } from "vitest";
import {
  CallDrBoyle,
  getBoyleLicenseComplianceLine,
  getBoyleOfficeAddressParts,
  getBoylePositioningStatement,
} from "./CallDrBoyle";

describe("CallDrBoyle", () => {
  it("returns the canonical Dr. Boyle profile", async () => {
    const profile = await CallDrBoyle();

    expect(profile.name).toBe("Dr. Gene Boyle");
    expect(profile.officeAddress).toBe("320 Junco, Irvine, CA 92618");
    expect(profile.partnerName).toBe("Dr. Jan Duffy");
    expect(profile.partnerTitle).toContain("197614");
    expect(profile.serviceAreas).toHaveLength(3);
    expect(profile.primaryCTA).toBe("Schedule a relocation call");
    expect(profile.licenseDetails.licenseId).toBe("02282581");
    expect(profile.licenseDetails.licenseStatus).toBe("LICENSED");
    expect(profile.licenseDetails.legalName).toBe("Boyle, Eugene Joseph");
    expect(profile.license).toContain("02282581");
  });

  it("builds approved positioning copy from profile fields", async () => {
    const profile = await CallDrBoyle();
    const statement = getBoylePositioningStatement(profile);

    expect(statement).toContain("Dr. Gene Boyle");
    expect(statement).toContain("Irvine, California");
    expect(statement).toContain("Las Vegas");
    expect(statement).toContain("320 Junco, Irvine, CA 92618");
  });

  it("includes DRE compliance disclosure text", async () => {
    const profile = await CallDrBoyle();
    const line = getBoyleLicenseComplianceLine(profile);

    expect(line).toContain("02282581");
    expect(line).toContain("Kelly Lynn");
    expect(line).toContain("02012693");
  });

  it("parses office address parts for NAP", () => {
    const parts = getBoyleOfficeAddressParts();

    expect(parts.full).toBe("320 Junco, Irvine, CA 92618");
    expect(parts.city).toBe("Irvine");
    expect(parts.state).toBe("CA");
  });
});
