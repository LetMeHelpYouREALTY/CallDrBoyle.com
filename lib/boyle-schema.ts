import type { DrBoyleProfile } from "./CallDrBoyle";
import { getBoyleOfficeAddressParts } from "./CallDrBoyle";
import { janDuffyContact, siteConfig } from "./site-config";
import { getSitePhoneSchemaValue } from "./site-contact";
import { janDuffyLicense } from "./agent-jan-duffy";
import { socialProfiles } from "./schema";
import { CONTACT_EMAIL } from "./site-contact";

const DRE_VERIFY_URL =
  "https://www2.dre.ca.gov/PublicASP/pplinfo.asp?License_id=02282581";

/**
 * JSON-LD Person schema for Dr. Gene Boyle (California relocation contact).
 */
export function generateDrBoylePersonSchema(profile: DrBoyleProfile) {
  const address = getBoyleOfficeAddressParts(profile);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#dr-gene-boyle`,
    name: profile.name,
    jobTitle: profile.title,
    description: profile.shortBio,
    email: profile.email,
    url: `${siteConfig.url}/team`,
    knowsAbout: profile.serviceAreas,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.zip,
      addressCountry: "US",
    },
    alternateName: profile.licenseDetails.legalName,
    colleague: { "@id": `${siteConfig.url}/#dr-jan-duffy` },
    sameAs: [DRE_VERIFY_URL, profile.licenseDetails.verifyUrl],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: profile.licenseDetails.licenseType,
      credentialNumber: profile.licenseDetails.licenseId,
      recognizedBy: {
        "@type": "Organization",
        name: "California Department of Real Estate",
        url: "https://www.dre.ca.gov/",
      },
    },
  };
}

/** JSON-LD Person schema for Dr. Jan Duffy (Nevada transaction agent). */
export function generateJanDuffyPersonSchema() {
  const telephone = getSitePhoneSchemaValue();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#dr-jan-duffy`,
    name: janDuffyContact.name,
    jobTitle: janDuffyContact.title,
    description:
      "Nevada licensed REALTOR® who handles Las Vegas property tours, contracts, and closing through Berkshire Hathaway HomeServices Nevada Properties.",
    url: `${siteConfig.url}/about`,
    ...(telephone ? { telephone } : {}),
    email: CONTACT_EMAIL,
    worksFor: {
      "@type": "RealEstateAgent",
      name: janDuffyContact.brokerage,
    },
    colleague: { "@id": `${siteConfig.url}/#dr-gene-boyle` },
    sameAs: [socialProfiles.linkedin],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Real Estate License",
      credentialNumber: janDuffyLicense.licenseNumber,
      recognizedBy: {
        "@type": "Organization",
        name: "Nevada Real Estate Division",
      },
    },
    knowsAbout: [
      "Las Vegas real estate",
      "Henderson properties",
      "Summerlin homes",
      "California relocation",
      "55+ communities",
    ],
  };
}

/**
 * Relocation service schema: Boyle (California) + Duffy (Las Vegas execution).
 */
export function generateRelocationServiceSchema(profile: DrBoyleProfile) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Irvine to Las Vegas Relocation Coordination",
    description: profile.shortBio,
    provider: { "@id": `${siteConfig.url}/#dr-gene-boyle` },
    areaServed: [
      { "@type": "City", name: "Irvine", containedInPlace: { "@type": "State", name: "California" } },
      { "@type": "City", name: "Las Vegas", containedInPlace: { "@type": "State", name: "Nevada" } },
      { "@type": "City", name: "Henderson" },
      { "@type": "Place", name: "Summerlin" },
    ],
    serviceType: profile.serviceAreas,
  };
}

/** WebSite + SearchAction for site-wide discovery. */
export function generateWebSiteSearchSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}#website`,
    url: baseUrl,
    name: siteConfig.ogSiteName,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/listings?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Report schema for /market-report with dateModified tied to market data asOf. */
export function generateMarketReportSchema(asOf: string, reportTitle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Report",
    name: reportTitle,
    dateModified: asOf,
    datePublished: asOf,
    author: { "@id": `${siteConfig.url}/#dr-jan-duffy` },
    about: {
      "@type": "Place",
      name: "Las Vegas, Nevada",
    },
  };
}
