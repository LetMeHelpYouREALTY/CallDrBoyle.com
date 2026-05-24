import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import DrBoyleCard from "@/components/team/DrBoyleCard";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import type { Metadata } from "next";
import { CallDrBoyle } from "@/lib/CallDrBoyle";
import { generateDrBoylePersonSchema } from "@/lib/boyle-schema";
import { agentInfo } from "@/lib/site-config";
import { getJanDuffyLicenseComplianceLine } from "@/lib/agent-jan-duffy";
import RealScoutOfficeListings from "@/components/realscout/RealScoutOfficeListings";

export const metadata: Metadata = {
  title: "Our Team | Las Vegas Relocation & Second-Home Help",
  description:
    "Meet Dr. Gene Boyle, California relocation expert for Las Vegas moves and second homes, and Dr. Jan Duffy, your Las Vegas REALTOR® partner for tours and closing.",
  keywords: [
    "Dr Gene Boyle",
    "Las Vegas relocation team",
    "California to Las Vegas realtor",
    "Las Vegas second home agent",
    "Dr Jan Duffy Las Vegas",
  ],
};

export default async function TeamPage() {
  const boyle = await CallDrBoyle();
  const boyleSchema = generateDrBoylePersonSchema(boyle);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(boyleSchema) }}
      />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our Team</h1>
            <p className="text-lg text-slate-600">
              Moves from Irvine, California to Las Vegas are coordinated across two specialists:
              your Irvine contact and your Las Vegas market partner.
            </p>
          </div>

      <RealScoutOfficeListings />
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <DrBoyleCard profile={boyle} />

            <article className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-1">{boyle.partnerName}</h2>
              <p className="text-sm text-blue-600 font-medium mb-2">{boyle.partnerTitle}</p>
              <p className="text-xs text-slate-500 mb-4">{getJanDuffyLicenseComplianceLine()}</p>
              <p className="text-slate-700 text-sm leading-relaxed mb-6">
                {boyle.partnerName} leads property tours, offer strategy, contracts, and closing
                support throughout the Las Vegas Valley. {boyle.name} introduces your goals and
                timeline from California; {boyle.partnerName} executes on the ground in Nevada.
              </p>
              <div className="space-y-3 text-sm">
                <a
                  href={agentInfo.phoneTel}
                  className="flex items-center text-slate-700 hover:text-blue-600"
                >
                  <Phone className="h-4 w-4 mr-2 text-blue-600" />
                  {agentInfo.phoneFormatted}
                </a>
                <a
                  href={`mailto:${agentInfo.email}`}
                  className="flex items-center text-slate-700 hover:text-blue-600"
                >
                  <Mail className="h-4 w-4 mr-2 text-blue-600" />
                  {agentInfo.email}
                </a>
              </div>
              <Link
                href="/about"
                className="inline-block mt-6 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                More about {boyle.partnerName} →
              </Link>
            </article>
          </div>

          <p className="text-center text-slate-600 text-sm mt-10 max-w-2xl mx-auto">
            Ready to start?{" "}
            <Link href="/contact#schedule-relocation" className="text-blue-600 font-semibold hover:underline">
              {boyle.primaryCTA}
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
