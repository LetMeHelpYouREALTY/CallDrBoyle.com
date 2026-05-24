import { agentInfo } from "@/lib/site-config";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Link from "next/link";
import { 
  Phone, 
  Plane, 
  MapPin, 
  Users, 
  CheckCircle, 
  Sun, 
  DollarSign, 
  Building,
  Home,
  School,
  ArrowRight,
  Car,
  Shield,
  Globe,
} from "lucide-react";
import type { Metadata } from "next";
import { generateMarketingMetadata } from "@/lib/seo/generate-marketing-metadata";
import { CallDrBoyle } from "@/lib/CallDrBoyle";
import RelocationExpertPanel from "@/components/relocation/RelocationExpertPanel";
import RealScoutOfficeListings from "@/components/realscout/RealScoutOfficeListings";
import {
  generateDrBoylePersonSchema,
  generateRelocationServiceSchema,
} from "@/lib/boyle-schema";
import { AeoAnswerLead, AeoKeyFacts } from "@/lib/seo/aeo-sections";
import { IRVINE_RELOCATION_KEY_FACTS } from "@/lib/seo/aeo-facts";

export async function generateMetadata(): Promise<Metadata> {
  return generateMarketingMetadata("/relocation", {
  title: "Irvine to Las Vegas Relocation | Dr. Gene Boyle",
  description:
    "Dr. Gene Boyle helps people move to Las Vegas from Irvine, California, with on-the-ground support from Dr. Jan Duffy in Las Vegas.",
  keywords: [
    "Irvine to Las Vegas relocation",
    "move from Irvine to Las Vegas",
    "relocating from Irvine California",
    "Las Vegas relocation Irvine",
    "Dr Gene Boyle Irvine",
  ],
});
}const popularRelocationAreas = [
  {
    name: "Summerlin",
    best: "Master-planned west Las Vegas",
    highlights: "150+ parks, Red Rock Canyon access, Downtown Summerlin, CCSD school districts",
    from: "Contact for current pricing",
  },
  {
    name: "Henderson",
    best: "Southeast valley, City of Henderson",
    highlights: "Lake Las Vegas access, Green Valley, Inspirada, established suburban grid",
    from: "Contact for current pricing",
  },
  {
    name: "Green Valley",
    best: "Mature Henderson neighborhoods",
    highlights: "Championship golf, The District shopping, mature landscaping, Henderson location",
    from: "Contact for current pricing",
  },
  {
    name: "Skye Canyon",
    best: "Northwest new construction",
    highlights: "Builder inventory from Lennar and others, trail access, Skye Center amenities",
    from: "Contact for current pricing",
  },
  {
    name: "Southern Highlands",
    best: "Luxury golf community",
    highlights: "Guard-gated sections, championship golf, mountain views, larger lots",
    from: "Contact for current pricing",
  },
  {
    name: "Inspirada",
    best: "Henderson master-planned",
    highlights: "Resort-style pools, extensive trails, new construction, Henderson convenience",
    from: "Contact for current pricing",
  },
];

const relocationServices = [
  "Personalized neighborhood matching based on your priorities",
  "School district research and tour coordination",
  "Virtual home tours before you arrive",
  "Coordination with your current BHHS agent",
  "Cost of living and budget comparison",
  "Commute time analysis to your workplace",
  "Community and lifestyle matching",
  "Moving company referrals and coordination",
  "Utility setup assistance and provider recommendations",
  "Local service provider recommendations",
  "HOA and community fee analysis",
  "Property tax comparison by area",
];

export default async function RelocationPage() {
  const boyle = await CallDrBoyle();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateRelocationServiceSchema(boyle)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateDrBoylePersonSchema(boyle)),
        }}
      />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Irvine, California → Las Vegas
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Moving from Irvine to Las Vegas
            </h1>
            <AeoAnswerLead className="text-center mb-6">
              Dr. Gene Boyle plans your Irvine-to-Las-Vegas relocation from California (DRE
              #02282581); Dr. Jan Duffy handles Las Vegas property tours, offers, and Nevada
              closing through Berkshire Hathaway HomeServices Nevada Properties.
            </AeoAnswerLead>
            <AeoKeyFacts title="TL;DR — Irvine to Las Vegas relocation" facts={IRVINE_RELOCATION_KEY_FACTS} />
            <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500">
              <span className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-1" /> 50,000+ Agent Network</span>
              <span className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Virtual Home Tours</span>
              <span className="flex items-center"><CheckCircle className="h-4 w-4 text-green-500 mr-1" /> School Research</span>
            </div>
          </div>

          <RelocationExpertPanel profile={boyle} heading="Irvine to Las Vegas relocation" />

          {/* Why Las Vegas */}
          <section className="mb-16 bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Why People Are Moving to Las Vegas</h2>
            <p className="text-slate-300 text-center max-w-3xl mx-auto mb-8">
              Las Vegas has become one of the fastest-growing cities in America, attracting 
              families, professionals, and retirees from across the country. Here's why so 
              many people are making the move to Southern Nevada.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <DollarSign className="h-12 w-12 text-green-400 mx-auto mb-3" />
                <h3 className="font-bold mb-1">No State Income Tax</h3>
                <p className="text-slate-400 text-sm">Keep more of what you earn—California residents can save 10%+ on taxes</p>
              </div>
              <div className="text-center">
                <Sun className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
                <h3 className="font-bold mb-1">300+ Days of Sunshine</h3>
                <p className="text-slate-400 text-sm">Year-round outdoor lifestyle with golf, hiking, and recreation</p>
              </div>
              <div className="text-center">
                <Building className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold mb-1">Affordable Housing</h3>
                <p className="text-slate-400 text-sm">40-60% lower home prices than California coastal cities</p>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                <h3 className="font-bold mb-1">Growing Economy</h3>
                <p className="text-slate-400 text-sm">Sports, tech, healthcare, and entertainment job growth</p>
              </div>
            </div>
          </section>

          {/* Las Vegas partner */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
              On-the-ground support in Las Vegas
            </h2>
            <div className="bg-slate-50 rounded-lg p-8">
              <p className="text-lg text-slate-700 mb-4">
                {boyle.partnership}. {boyle.partnerName} ({boyle.partnerTitle}) handles neighborhood
                tours, contracts, and closing coordination in the Las Vegas Valley while you plan
                from California.
              </p>
              <p className="text-slate-600 text-sm">
                Start with {boyle.name} at {boyle.officeAddress}, then transition seamlessly to
                local execution in Nevada.
              </p>
            </div>
          </section>

          {/* Relocation Services */}
          <section className="mb-16 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Comprehensive Relocation Services
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              Relocating involves much more than just finding a home. Dr. Jan Duffy provides 
              end-to-end relocation services that address every aspect of your move, from 
              neighborhood selection to utility setup and local provider recommendations.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relocationServices.map((service) => (
                <div key={service} className="flex items-center bg-white p-4 rounded-lg border border-slate-200">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{service}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Neighborhoods */}
          <section className="mb-16 bg-slate-50 rounded-2xl p-8 md:p-12 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Popular Relocation Destinations
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              Choosing the right neighborhood is crucial for a successful relocation. Each Las 
              Vegas community offers a unique lifestyle, price point, and amenities. Dr. Jan 
              helps you identify which area matches your priorities—whether that's schools, 
              commute times, outdoor access, or community feel.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularRelocationAreas.map((area) => (
                <div
                  key={area.name}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-slate-900">{area.name}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                      From {area.from}
                    </span>
                  </div>
                  <p className="text-sm text-blue-600 mb-3">Best for: {area.best}</p>
                  <p className="text-slate-600 text-sm">{area.highlights}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/neighborhoods" className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center">
                Explore All Neighborhoods <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </section>

          {/* School Information */}
          <section className="mb-16 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Las Vegas Schools & Education
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              For families with children, school quality is often the top priority when 
              relocating. Las Vegas offers a range of public, charter, and private school 
              options. Dr. Jan provides detailed school research to help you make informed decisions.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center">
                  <School className="h-5 w-5 text-blue-600 mr-2" />
                  Top-Rated School Areas
                </h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Summerlin:</strong> Palo Verde HS, West Career & Tech Academy</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Henderson:</strong> Coronado HS, Green Valley HS, The Meadows</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>Private:</strong> The Meadows, Bishop Gorman, Faith Lutheran</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center">
                  <Home className="h-5 w-5 text-blue-600 mr-2" />
                  School Research Services
                </h3>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>School ratings and test score comparisons</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Zoned school identification for specific addresses</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Magnet and charter school options</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span>Private school recommendations</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Coming From California */}
          <section className="mb-16 bg-blue-600 text-white rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Moving from California?</h2>
            <p className="text-blue-100 text-center max-w-3xl mx-auto mb-8">
              California to Nevada is one of the most popular relocation routes in the country. 
              Thousands of California families move to Las Vegas each year seeking lower costs, 
              no state income tax, and a better quality of life. Here's what the numbers look like.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-3">What You'll Save</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>• <strong>State income tax:</strong> 0% vs CA's up to 13.3%</li>
                  <li>• <strong>Home prices:</strong> 40-60% lower than LA/SF</li>
                  <li>• <strong>Property taxes:</strong> Typically lower rates</li>
                  <li>• <strong>Cost of living:</strong> 30-40% less overall</li>
                  <li>• <strong>Example:</strong> $200K earner saves $20K+ in taxes annually</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-3">What You'll Gain</h3>
                <ul className="space-y-2 text-blue-100">
                  <li>• <strong>More home:</strong> 50%+ more space for your budget</li>
                  <li>• <strong>Short commutes:</strong> 20-30 min vs 60+ in CA</li>
                  <li>• <strong>Outdoor recreation:</strong> Red Rock, Lake Mead, skiing</li>
                  <li>• <strong>Entertainment:</strong> World-class dining, shows, sports</li>
                  <li>• <strong>Easy visits back:</strong> 4-hour drive, 1-hour flight to SoCal</li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link 
                href="/buyers/california-relocator" 
                className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                California Relocator Guide <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </section>

          {/* BHHS Network */}
          <section className="mb-16 max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              The Berkshire Hathaway HomeServices Advantage
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              With 50,000+ agents in 1,500+ offices worldwide, Berkshire Hathaway HomeServices 
              provides seamless coordination for relocations. Your agent back home can connect 
              directly with Dr. Jan to ensure a smooth transition—no gaps, no miscommunication.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-slate-50 rounded-xl">
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Nationwide Network</h3>
                <p className="text-slate-600 text-sm">
                  Seamless referrals from any BHHS agent in the country directly to Dr. Jan
                </p>
              </div>
              <div className="text-center p-6 bg-slate-50 rounded-xl">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Coordinated Transactions</h3>
                <p className="text-slate-600 text-sm">
                  Sell your current home and buy in Las Vegas with coordinated timelines
                </p>
              </div>
              <div className="text-center p-6 bg-slate-50 rounded-xl">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Trusted Referrals</h3>
                <p className="text-slate-600 text-sm">
                  Not using BHHS? Dr. Jan can recommend a trusted agent in your area
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
              Relocation Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              Moving to a new city raises many questions. Here are answers to the most common 
              concerns from people relocating to Las Vegas.
            </p>
            <div className="space-y-4">
              {[
                {
                  q: "Can you help me find a home before I move?",
                  a: "Absolutely. Dr. Jan provides virtual tours, video walkthroughs, and detailed neighborhood analysis so you can purchase confidently before relocating. Many clients buy their Las Vegas home without ever visiting in person until closing day.",
                },
                {
                  q: "Which Las Vegas areas do California relocators choose most often?",
                  a: "Summerlin, Henderson (Green Valley and Inspirada), and Skye Canyon are frequent starting points for Irvine-area buyers. Dr. Jan Duffy compares commute routes, HOA structures, home styles, and CCSD school district assignments to match your budget and timeline.",
                },
                {
                  q: "How does the cost of living compare to California?",
                  a: "Las Vegas costs about 30-40% less than LA/Orange County and 50%+ less than San Francisco. The biggest savings come from no state income tax (California charges up to 13.3%) and significantly lower housing costs. A family earning $200K in California could save $20,000+ annually just in state taxes.",
                },
                {
                  q: "Do you help coordinate the sale of my current home too?",
                  a: "Yes! Through the BHHS referral network, Dr. Jan can connect you with a trusted agent in your current city. This coordination ensures both transactions stay on track with synchronized timelines for a seamless transition.",
                },
                {
                  q: "What's the job market like in Las Vegas?",
                  a: "Las Vegas has diversified beyond gaming and hospitality. Major growth sectors include healthcare (Intermountain Health, UMC), technology (Switch, various startups), sports (Raiders, Golden Knights, Aces), logistics (Amazon), and professional services. The economy is growing faster than the national average.",
                },
                {
                  q: "What public resources help me compare Las Vegas areas?",
                  a: "Clark County and city websites publish park locations, zoning maps, and permit data. CCSD publishes school boundary maps (verify enrollment with the district). Dr. Jan can pair those resources with MLS inventory and HOA documents for the areas you are considering.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center bg-slate-900 text-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Planning Your Move to Las Vegas?</h2>
            <p className="text-xl text-slate-300 mb-8">
              Let Dr. Jan Duffy and Berkshire Hathaway HomeServices make your relocation stress-free.
              Whether you're moving next month or exploring options, a free consultation can help 
              you understand the Las Vegas market and plan your transition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call (702) 500-1942
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-md font-bold text-lg transition-colors"
              >
                Schedule Consultation
              </Link>
            </div>
            <p className="mt-4 text-slate-400 text-sm">
              Berkshire Hathaway HomeServices Nevada Properties
            </p>
          </section>
        </div>

      <RealScoutOfficeListings />

        {/* Last Updated */}
        <div className="text-center text-sm text-slate-500 mt-8">Last Updated: January 2026</div>
      </main>
      <Footer />
    </>
  );
}

