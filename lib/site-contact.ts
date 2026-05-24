import { siteEmails } from "./site-emails";

/** Canonical site phone — owner must confirm before go-live. */
export const SITE_PHONE = "PENDING_OWNER_CONFIRMATION" as const;
// TODO(SEO): Dr. Jan to confirm canonical CallAction number for calldrboyle.com

/** Dr. Jan Duffy / BHHS Nevada Properties Las Vegas office address. */
export const LV_OFFICE_ADDRESS = "PENDING_OWNER_CONFIRMATION" as const;
// TODO(SEO): Dr. Jan to confirm BHHS Nevada Properties Las Vegas office address for NAP/schema

/** Primary on-domain contact email (Hello@CallDrBoyle.com). */
export const CONTACT_EMAIL = siteEmails.hello;

export function getSitePhoneDisplay(): string {
  return SITE_PHONE;
}

/** E.164 tel href, or undefined when phone is pending owner confirmation. */
export function getSitePhoneTelHref(): string | undefined {
  const phone = SITE_PHONE as string;
  if (phone === "PENDING_OWNER_CONFIRMATION") {
    return undefined;
  }
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) return undefined;
  const normalized = digits.length === 10 ? digits : digits.slice(-10);
  return `tel:+1${normalized}`;
}

/** Schema.org telephone value (E.164 without tel: prefix). */
export function getSitePhoneSchemaValue(): string | undefined {
  const href = getSitePhoneTelHref();
  return href?.replace(/^tel:/, "");
}
