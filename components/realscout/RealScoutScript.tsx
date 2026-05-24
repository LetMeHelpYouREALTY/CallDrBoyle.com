import Script from "next/script";

const REALSCOUT_WEB_COMPONENTS_URL =
  "https://em.realscout.com/widgets/realscout-web-components.umd.js";

/** Load RealScout after page is interactive — avoids blocking LCP on custom elements. */
export default function RealScoutScript() {
  return (
    <Script src={REALSCOUT_WEB_COMPONENTS_URL} type="module" strategy="lazyOnload" />
  );
}
