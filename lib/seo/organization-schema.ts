import { CallDrBoyle, getBoyleOfficeAddressParts } from "@/lib/CallDrBoyle";
import { generateWebSiteSearchSchema } from "@/lib/boyle-schema";
import { agentInfo, janDuffyContact, siteConfig } from "@/lib/site-config";
import { getSitePhoneSchemaValue } from "@/lib/site-contact";
import { absoluteUrl } from "./site-url";

/** Site-wide WebSite + dual-agent Organization graph for GEO entity clarity. */
export async function generateSiteOrganizationGraph(baseUrl: string) {
  const boyle = await CallDrBoyle();
  const boyleAddress = getBoyleOfficeAddressParts(boyle);

  return {
    "@context": "https://schema.org",
    "@graph": [
      generateWebSiteSearchSchema(baseUrl),
      {
        "@type": "RealEstateAgent",
        "@id": `${baseUrl}#organization`,
        name: siteConfig.ogSiteName,
        url: baseUrl,
        description: boyle.shortBio,
        ...(getSitePhoneSchemaValue() ? { telephone: getSitePhoneSchemaValue() } : {}),
        email: agentInfo.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: boyleAddress.street,
          addressLocality: boyleAddress.city,
          addressRegion: boyleAddress.state,
          postalCode: boyleAddress.zip,
          addressCountry: "US",
        },
        areaServed: [
          { "@type": "City", name: "Irvine", containedInPlace: { "@type": "State", name: "California" } },
          { "@type": "City", name: "Las Vegas", containedInPlace: { "@type": "State", name: "Nevada" } },
          { "@type": "City", name: "Henderson", containedInPlace: { "@type": "State", name: "Nevada" } },
          { "@type": "Place", name: "Summerlin" },
          { "@type": "City", name: "North Las Vegas" },
        ],
        employee: [
          {
            "@type": "Person",
            "@id": `${baseUrl}#dr-gene-boyle`,
            name: boyle.name,
            jobTitle: "California DRE Salesperson — Irvine relocation planning",
            url: absoluteUrl("/team", baseUrl),
          },
          {
            "@type": "Person",
            "@id": `${baseUrl}#dr-jan-duffy`,
            name: janDuffyContact.name,
            jobTitle: "Nevada REALTOR® — Las Vegas tours and closing",
            url: absoluteUrl("/about", baseUrl),
          },
        ],
      },
    ],
  };
}
