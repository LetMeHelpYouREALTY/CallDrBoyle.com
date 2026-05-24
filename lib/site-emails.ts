/** Official CallDrBoyle.com contact addresses — single source of truth for NAP/schema. */
export const siteEmails = {
  /** General site inquiries */
  hello: "Hello@CallDrBoyle.com",
  /** Dr. Gene Boyle — Irvine / California side */
  gene: "Gene@CallDrBoyle.com",
  /** Irvine → Las Vegas relocation and second-home planning */
  relocation: "Relocation@CallDrBoyle.com",
} as const;

export type SiteEmailKey = keyof typeof siteEmails;

export function mailtoHref(key: SiteEmailKey): string {
  return `mailto:${siteEmails[key]}`;
}
