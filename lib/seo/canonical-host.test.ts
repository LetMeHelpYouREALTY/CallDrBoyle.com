import { describe, expect, it } from "vitest";
import { getCanonicalOrigin, getCanonicalHostname } from "./canonical-host";
import { getSitemapAbsoluteUrl } from "./search-console";

describe("canonical-host", () => {
  it("defaults to www.calldrboyle.com", () => {
    expect(getCanonicalOrigin()).toBe("https://www.calldrboyle.com");
    expect(getCanonicalHostname()).toBe("www.calldrboyle.com");
  });

  it("builds absolute sitemap URL", () => {
    expect(getSitemapAbsoluteUrl("https://www.calldrboyle.com")).toBe(
      "https://www.calldrboyle.com/sitemap.xml"
    );
  });
});
