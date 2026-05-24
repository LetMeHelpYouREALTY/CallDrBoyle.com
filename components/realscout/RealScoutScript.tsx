import Script from "next/script";

const REALSCOUT_WEB_COMPONENTS_URL =
  "https://em.realscout.com/widgets/realscout-web-components.umd.js";

/** Load once in root layout — required for office-listings custom elements. */
export default function RealScoutScript() {
  return (
    <Script src={REALSCOUT_WEB_COMPONENTS_URL} type="module" strategy="afterInteractive" />
  );
}
