import { siteEmails } from "./site-emails";

/** Canonical site phone — CallDrBoyle.com NAP (Dr. Gene Boyle, Irvine / relocation line). */
export const SITE_PHONE = "(949) 638-3939" as const;

/** Dr. Jan Duffy / BHHS Nevada Properties Las Vegas office (matches bhhs.com office listing). */
export const LV_OFFICE_ADDRESS =
  "1490 Center Crossing Road, Las Vegas, NV 89144" as const;

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
