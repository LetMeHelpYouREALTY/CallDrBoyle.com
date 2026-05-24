import { agentInfo } from "@/lib/site-config";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import { MapPin, Phone, Home, BarChart3 } from "lucide-react";
import type { Metadata } from "next";
import { generateMarketingMetadata } from "@/lib/seo/generate-marketing-metadata";
import RealScoutOfficeListings from "@/components/realscout/RealScoutOfficeListings";
import { AeoAnswerLead, AeoKeyFacts } from "@/lib/seo/aeo-sections";
import { IRVINE_RELOCATION_KEY_FACTS } from "@/lib/seo/aeo-facts";
import { NEIGHBORHOOD_DIRECTORY } from "@/lib/seo/neighborhood-directory";

export async function generateMetadata(): Promise<Metadata> {
  return generateMarketingMetadata("/neighborhoods", {
    title: "Las Vegas Neighborhoods | Berkshire Hathaway HomeServices",
    description:
      "Explore Las Vegas and Henderson neighborhoods with Dr. Jan Duffy at Berkshire Hathaway HomeServices Nevada Properties. Summerlin, Henderson, The Ridges, Southern Highlands and more.",
    keywords: [
      "Las Vegas neighborhoods",
      "Henderson communities",
      "Summerlin real estate",
      "Las Vegas communities",
      "Henderson master planned",
    ],
  });
}

const neighborhoods = NEIGHBORHOOD_DIRECTORY;

export default function NeighborhoodsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Berkshire Hathaway HomeServices Nevada Properties
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Las Vegas and Henderson Neighborhoods
            </h1>
            <AeoAnswerLead className="mb-6">
              Las Vegas and Henderson offer master-planned communities from entry-level north-valley
              builds to guard-gated Summerlin estates — compare median prices, commute times, and
              amenities by area before you tour.
            </AeoAnswerLead>
            <AeoKeyFacts
              title="TL;DR — Las Vegas neighborhoods"
              facts={IRVINE_RELOCATION_KEY_FACTS.slice(0, 3)}
            />
            <p className="text-xl text-slate-600 mt-8">
              Explore Southern Nevada communities with Dr. Jan Duffy, your{" "}
              <strong>Berkshire Hathaway HomeServices</strong> neighborhood expert. Median prices
              below are directional — request a current market report for live MLS data.
            </p>
          </div>

          <RealScoutOfficeListings />

          <section className="mb-16 max-w-6xl mx-auto" aria-labelledby="neighborhood-grid-heading">
            <h2 id="neighborhood-grid-heading" className="sr-only">
              Las Vegas neighborhood directory
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {neighborhoods.map((neighborhood) => (
                <Link
                  key={neighborhood.slug}
                  href={`/neighborhoods/${neighborhood.slug}`}
                  className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-all hover:border-blue-300 group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {neighborhood.name}
                      </h3>
                      <p className="text-sm text-slate-500">{neighborhood.featureFocus}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">{neighborhood.medianPrice}</div>
                      <div className="text-sm text-green-600">{neighborhood.priceChange} YoY</div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm mb-4">{neighborhood.description}</p>
                  <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
                    {neighborhood.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="bg-slate-100 text-slate-700 text-xs px-2 py-1 rounded"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </Link>
              ))}
            </div>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <div className="bg-slate-50 rounded-lg p-8">
              <blockquote className="text-lg text-slate-700 italic mb-4">
                Every Las Vegas neighborhood has its own layout, HOA structure, and commute profile.
                Whether you want Red Rock trail access in Summerlin, golf in Green Valley, or custom
                estates in The Ridges, I will help you compare features side by side.
              </blockquote>
              <cite className="text-slate-900 font-semibold not-italic">
                — Dr. Jan Duffy, BHHS Nevada Properties
              </cite>
            </div>
          </section>

          <section className="mb-16 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">
              How do I compare Las Vegas neighborhoods before buying?
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto">
              Start with your commute target (Strip, Henderson medical corridor, or remote work),
              then filter by home style (single-family, townhome, guard-gated), HOA fees, and lot
              size. Dr. Jan provides side-by-side market snapshots from GLVAR/MLS — not generic
              rankings — so you can tour with a short list.
            </p>
          </section>

          <section className="mb-16 bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Neighborhood research services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-blue-400 mx-auto mb-3" aria-hidden="true" />
                <h3 className="font-bold mb-2">Area tours</h3>
                <p className="text-slate-400 text-sm">
                  Drive neighborhoods with an agent who knows HOA rules, builder phases, and commute
                  patterns
                </p>
              </div>
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-blue-400 mx-auto mb-3" aria-hidden="true" />
                <h3 className="font-bold mb-2">Market snapshots</h3>
                <p className="text-slate-400 text-sm">
                  Median price, days on market, and inventory by zip — sourced from MLS, not
                  estimates
                </p>
              </div>
              <div className="text-center">
                <Home className="h-12 w-12 text-blue-400 mx-auto mb-3" aria-hidden="true" />
                <h3 className="font-bold mb-2">Home matching</h3>
                <p className="text-slate-400 text-sm">
                  Saved searches and alerts when listings match your criteria in target areas
                </p>
              </div>
            </div>
          </section>

          <section className="text-center bg-blue-600 text-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need help narrowing your neighborhood list?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Dr. Jan Duffy maps commute times, HOA fees, and inventory by area — call for a
              personalized comparison.
            </p>
            <a
              href={agentInfo.phoneTel}
              className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
              Call {agentInfo.phoneFormatted}
            </a>
            <p className="mt-4 text-blue-200 text-sm">
              Berkshire Hathaway HomeServices Nevada Properties
            </p>
          </section>
        </div>

        <div className="text-center text-sm text-slate-500 mt-8">Last Updated: January 2026</div>
      </main>
      <Footer />
    </>
  );
}
