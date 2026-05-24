import type { Metadata } from "next";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import PageSeoExtras from "@/components/seo/PageSeoExtras";
import { CallDrBoyle } from "@/lib/CallDrBoyle";
import { agentInfo } from "@/lib/site-config";
import { getJanDuffyLicenseComplianceLine } from "@/lib/agent-jan-duffy";
import { generateMarketingMetadata } from "@/lib/seo/generate-marketing-metadata";
import Link from "next/link";
import RealScoutOfficeListings from "@/components/realscout/RealScoutOfficeListings";

export async function generateMetadata(): Promise<Metadata> {
  return generateMarketingMetadata("/locations/las-vegas-nevada", {
    title: "Las Vegas, Nevada | Local Market Partner",
    description:
      "Las Vegas tours, contracts, and closing support from Dr. Jan Duffy, BHHS Nevada Properties — coordinated with Dr. Gene Boyle in Irvine.",
    keywords: ["Las Vegas real estate agent", "Dr Jan Duffy Las Vegas", "Nevada relocation support"],
  });
}

export default async function LasVegasNevadaPage() {
  const boyle = await CallDrBoyle();

  return (
    <>
      <PageSeoExtras
        path="/locations/las-vegas-nevada"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Locations", href: "/irvine-to-las-vegas" },
          { name: "Las Vegas, NV", href: "/locations/las-vegas-nevada" },
        ]}
        speakable={{
          headline: "Las Vegas, Nevada market support",
          summary: `${boyle.partnerName} provides Las Vegas property tours and closing support for clients planning their move from Irvine with ${boyle.name}.`,
        }}
        schemas={[
          {
            "@context": "https://schema.org",
            "@type": "Place",
            name: "Las Vegas, Nevada",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Las Vegas",
              addressRegion: "NV",
              addressCountry: "US",
            },
          },
        ]}
      />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Las Vegas, Nevada</h1>
          <p className="text-lg text-slate-600 mb-6">
            {boyle.partnership}. {boyle.partnerName} ({boyle.partnerTitle}) leads property tours,
            contracts, and closing coordination in the Las Vegas Valley for clients who plan their
            move from Irvine with {boyle.name}.
          </p>

      <RealScoutOfficeListings />
          <p className="text-sm text-slate-500 mb-8">{getJanDuffyLicenseComplianceLine()}</p>
          <p className="mb-4">
            <a href={agentInfo.phoneTel} className="text-blue-600 font-semibold">
              {agentInfo.phoneFormatted}
            </a>
          </p>
          <Link href="/neighborhoods" className="text-blue-600 font-semibold hover:underline">
            Explore Las Vegas neighborhoods →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
