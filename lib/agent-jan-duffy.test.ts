import { describe, expect, it } from "vitest";
import {
  getJanDuffyLicenseComplianceLine,
  getJanDuffyLicenseDisplay,
  janDuffyLicense,
} from "./agent-jan-duffy";

describe("agent-jan-duffy", () => {
  it("matches provided license roster fields", () => {
    expect(janDuffyLicense.licenseNumber).toBe("197614");
    expect(janDuffyLicense.licenseStatus).toBe("ACTIVE");
    expect(janDuffyLicense.city).toBe("LAS VEGAS");
    expect(janDuffyLicense.zipCode).toBe("89109");
  });

  it("formats display and compliance lines", () => {
    expect(getJanDuffyLicenseDisplay()).toBe("License #197614");
    expect(getJanDuffyLicenseComplianceLine()).toContain("197614");
    expect(getJanDuffyLicenseComplianceLine()).toContain("89109");
  });
});
