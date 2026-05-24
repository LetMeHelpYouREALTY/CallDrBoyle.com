import { getSitePhoneDisplay, getSitePhoneTelHref } from "@/lib/site-contact";

type SitePhoneLinkProps = {
  className?: string;
  /** Prefix before the phone number, e.g. "Call " */
  prefix?: string;
};

/** Renders the canonical site phone as a tel: link when confirmed, otherwise plain text. */
export function SitePhoneLink({ className, prefix = "" }: SitePhoneLinkProps) {
  const display = getSitePhoneDisplay();
  const tel = getSitePhoneTelHref();
  const label = `${prefix}${display}`;

  if (!tel) {
    return <span className={className}>{label}</span>;
  }

  return (
    <a href={tel} className={className}>
      {label}
    </a>
  );
}
