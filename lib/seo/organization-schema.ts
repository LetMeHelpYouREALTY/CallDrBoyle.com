import { CallDrBoyle } from "@/lib/CallDrBoyle";
import { agentInfo } from "@/lib/site-config";
import { getBoyleOfficeAddressParts } from "@/lib/CallDrBoyle";
import { absoluteUrl } from "./site-url";

/** Site-wide WebSite + dual-agent Organization graph for GEO entity clarity. */
export async function generateSiteOrganizationGraph(baseUrl: string) {
  const boyle = await CallDrBoyle();
  const boyleAddress = getBoyleOfficeAddressParts(boyle);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}#website`,
        url: baseUrl,
        name: "Dr. Gene Boyle — Irvine to Las Vegas Relocation",
        description: boyle.shortBio,
        publisher: { "@id": `${baseUrl}#organization` },
        inLanguage: "en-US",
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${baseUrl}#organization`,
        name: "Dr. Gene Boyle & Dr. Jan Duffy — Las Vegas Relocation Team",
        url: baseUrl,
        description: boyle.shortBio,
        telephone: agentInfo.phoneFormatted,
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
        ],
        employee: [
          {
            "@type": "Person",
            "@id": `${baseUrl}#dr-gene-boyle`,
            name: boyle.name,
            jobTitle: boyle.title,
            url: absoluteUrl("/team", baseUrl),
          },
          {
            "@type": "Person",
            "@id": `${baseUrl}#dr-jan-duffy`,
            name: agentInfo.name,
            jobTitle: agentInfo.title,
            url: absoluteUrl("/about", baseUrl),
          },
        ],
      },
    ],
  };
}
