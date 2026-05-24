import Script from "next/script";

/** Load Calendly assets once in root layout; widgets listen for `calendly-loaded`. */
export default function CalendlyScripts() {
  return (
    <>
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("calendly-loaded"));
          }
        }}
      />
    </>
  );
}
