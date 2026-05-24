import type { DrBoyleProfile } from "./CallDrBoyle";
import { getBoyleOfficeAddressParts } from "./CallDrBoyle";
import { siteConfig } from "./site-config";

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
    colleague: {
      "@type": "Person",
      name: profile.partnerName,
      jobTitle: profile.partnerTitle,
    },
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
    url: profile.licenseDetails.verifyUrl,
  };
}

/**
 * Relocation service schema: Boyle (California) + Duffy (Las Vegas execution).
 */
export function generateRelocationServiceSchema(profile: DrBoyleProfile) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Las Vegas Relocation and Second-Home Coordination",
    description: profile.shortBio,
    provider: {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.title,
    },
    areaServed: ["California", "Las Vegas", "Henderson", "Summerlin", "Clark County NV"],
    serviceType: profile.serviceAreas,
  };
}
