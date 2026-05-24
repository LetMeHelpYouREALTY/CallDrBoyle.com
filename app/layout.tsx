import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { headers } from "next/headers";
import { getDomainConfig } from "@/lib/domain-config";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import CalendlyScripts from "@/components/calendly/CalendlyScripts";
import CalendlyBadge from "@/components/calendly/CalendlyBadge";
import RealScoutScript from "@/components/realscout/RealScoutScript";
import { publicEnv } from "@/lib/site-env/public";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { getSiteUrlFromHost } from "@/lib/seo/site-url";
import { generateSiteOrganizationGraph } from "@/lib/seo/organization-schema";

export async function generateMetadata(): Promise<Metadata> {
  const host = headers().get("host");
  const domain = host || "";
  const config = getDomainConfig(domain);
  const isBoyleSite = config.domain === "calldrboyle.com" || config.domain === "default";

  if (isBoyleSite) {
    return buildPageMetadata({
      host,
      path: "/",
      title: "Irvine to Las Vegas Relocation | Dr. Gene Boyle",
      description: config.description,
      keywords: config.keywords,
      ogTitle: config.heroHeadline,
      ogDescription: config.heroSubheadline,
    });
  }

  return buildPageMetadata({
    host,
    path: "/",
    title: `${config.neighborhood} | Dr. Jan Duffy, REALTOR® | BHHS Nevada`,
    description: config.description,
    keywords: config.keywords,
    ogTitle: config.heroHeadline,
    ogDescription: config.description,
  });
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const host = headers().get("host");
  const baseUrl = getSiteUrlFromHost(host);
  const orgGraph = await generateSiteOrganizationGraph(baseUrl);
  const gaMeasurementId = publicEnv.gaMeasurementId;

  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgGraph) }}
        />
        {/* WidgetTracker */}
        <Script id="widget-tracker" strategy="afterInteractive">{`
          (function(w,i,d,g,e,t){w["WidgetTrackerObject"]=g;(w[g]=w[g]||function()
          {(w[g].q=w[g].q||[]).push(arguments);}),(w[g].ds=1*new Date());(e="script"),
          (t=d.createElement(e)),(e=d.getElementsByTagName(e)[0]);t.async=1;t.src=i;
          e.parentNode.insertBefore(t,e);})
          (window,"https://widgetbe.com/agent",document,"widgetTracker");
          window.widgetTracker("create","WT-XQHVYQWW");
          window.widgetTracker("send","pageview");
        `}</Script>
      </head>
      <body>
        <RealScoutScript />
        <CalendlyScripts />
        {children}
        <CalendlyBadge text="Schedule a consultation" />
        {gaMeasurementId ? <GoogleAnalytics measurementId={gaMeasurementId} /> : null}
        <Analytics />
      </body>
    </html>
  );
}
