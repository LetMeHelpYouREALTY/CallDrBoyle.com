import { getJanDuffyLicenseDisplay } from "./agent-jan-duffy";
import { siteEmails } from "./site-emails";

/**
 * Single source of truth for Dr. Gene Boyle profile and relocation messaging.
 * All team, relocation, contact, and California-buyer copy should consume CallDrBoyle().
 *
 * License data sourced from California DRE public lookup (License ID 02282581).
 * @see https://www2.dre.ca.gov/PublicASP/pplinfo.asp?License_id=02282581
 */

export type BoyleLicenseDetails = {
  licenseId: string;
  licenseType: string;
  licenseStatus: string;
  /** ISO date (YYYY-MM-DD) */
  expirationDate: string;
  /** ISO date (YYYY-MM-DD) */
  issuedDate: string;
  /** Name on file with California DRE */
  legalName: string;
  verifyUrl: string;
  responsibleBroker: {
    name: string;
    licenseId: string;
    address: string;
  };
};

export type DrBoyleProfile = {
  name: string;
  title: string;
  /** Short license line for UI */
  license: string;
  licenseDetails: BoyleLicenseDetails;
  officeAddress: string;
  email: string;
  relocationEmail: string;
  partnership: string;
  partnerName: string;
  partnerTitle: string;
  serviceAreas: string[];
  primaryCTA: string;
  shortBio: string;
};

const DRE_VERIFY_URL =
  "https://www2.dre.ca.gov/PublicASP/pplinfo.asp?License_id=02282581";

const LICENSE_DETAILS: BoyleLicenseDetails = {
  licenseId: "02282581",
  licenseType: "SALESPERSON",
  licenseStatus: "LICENSED",
  expirationDate: "2029-04-15",
  issuedDate: "2025-04-16",
  legalName: "Boyle, Eugene Joseph",
  verifyUrl: DRE_VERIFY_URL,
  responsibleBroker: {
    name: "Boyle, Kelly Lynn",
    licenseId: "02012693",
    address: "1 Technology Drive, Suite I829, Irvine, CA 92618",
  },
};

/** Canonical profile object — CallDrBoyle() returns this shape. */
const DR_BOYLE_PROFILE: DrBoyleProfile = {
  name: "Dr. Gene Boyle",
  title: "Helping clients move from Irvine, California to Las Vegas",
  license: `California DRE Salesperson · License #${LICENSE_DETAILS.licenseId}`,
  licenseDetails: LICENSE_DETAILS,
  officeAddress: "320 Junco, Irvine, CA 92618",
  email: siteEmails.gene,
  relocationEmail: siteEmails.relocation,
  partnership: "Works with Dr. Jan Duffy in Las Vegas",
  partnerName: "Dr. Jan Duffy",
  partnerTitle: `REALTOR®, BHHS Nevada Properties · ${getJanDuffyLicenseDisplay()}`,
  serviceAreas: [
    "Irvine, California to Las Vegas relocation",
    "Las Vegas second homes for Irvine-area buyers",
    "Move coordination from Irvine to the Las Vegas Valley",
  ],
  primaryCTA: "Schedule a relocation call",
  shortBio:
    "Dr. Gene Boyle helps people move to Las Vegas from Irvine, California. He plans your relocation or second-home purchase from Irvine and coordinates with Dr. Jan Duffy in Las Vegas for property tours, contracts, and closing support.",
};

/** Contact page anchor for relocation scheduling (Calendly). */
export const RELOCATION_SCHEDULE_PATH = "/contact#schedule-relocation";

export async function CallDrBoyle(): Promise<DrBoyleProfile> {
  return { ...DR_BOYLE_PROFILE, licenseDetails: { ...LICENSE_DETAILS } };
}

/** Approved positioning language — use site-wide for consistency. */
export function getBoylePositioningStatement(profile: DrBoyleProfile): string {
  return `${profile.name} helps people move to Las Vegas from Irvine, California. Based at ${profile.officeAddress}, he ${profile.partnership.toLowerCase()} to make your Irvine-to-Las Vegas move straightforward.`;
}

/** California DRE compliance line for footers and cards. */
export function getBoyleLicenseComplianceLine(profile: DrBoyleProfile): string {
  const { licenseDetails: d } = profile;
  return `California DRE ${d.licenseType.charAt(0) + d.licenseType.slice(1).toLowerCase()} License #${d.licenseId} (${d.licenseStatus}). Expires ${d.expirationDate}. Responsible Broker: ${d.responsibleBroker.name} (License #${d.responsibleBroker.licenseId}).`;
}

/** Parsed office address for NAP / schema (matches officeAddress field). */
export function getBoyleOfficeAddressParts(profile: DrBoyleProfile = DR_BOYLE_PROFILE) {
  return {
    street: "320 Junco",
    city: "Irvine",
    state: "CA",
    zip: "92618",
    full: profile.officeAddress,
  };
}
