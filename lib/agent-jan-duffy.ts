/**
 * Source of truth for Dr. Jan Duffy Nevada license (MLS / license roster data).
 */

export type JanDuffyLicenseDetails = {
  name: string;
  licenseNumber: string;
  licenseType: string;
  licenseStatus: string;
  city: string;
  state: string;
  zipCode: string;
};

export const janDuffyLicense: JanDuffyLicenseDetails = {
  name: "Dr. Jan Duffy",
  licenseNumber: "197614",
  licenseType: "SALESPERSON",
  licenseStatus: "ACTIVE",
  city: "LAS VEGAS",
  state: "NV",
  zipCode: "89109",
};

/** Short line for cards and footers */
export function getJanDuffyLicenseDisplay(): string {
  return `License #${janDuffyLicense.licenseNumber}`;
}

/** Full compliance line */
export function getJanDuffyLicenseComplianceLine(): string {
  const { licenseType, licenseNumber, licenseStatus, city, state, zipCode } =
    janDuffyLicense;
  const typeLabel =
    licenseType.charAt(0) + licenseType.slice(1).toLowerCase();
  return `Nevada ${typeLabel} · License #${licenseNumber} (${licenseStatus}) · ${city}, ${state} ${zipCode}`;
}
