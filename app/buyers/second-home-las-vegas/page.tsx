import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RelocationExpertPanel from "@/components/relocation/RelocationExpertPanel";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import type { Metadata } from "next";
import { generateMarketingMetadata } from "@/lib/seo/generate-marketing-metadata";
import { CallDrBoyle } from "@/lib/CallDrBoyle";
import RealScoutOfficeListings from "@/components/realscout/RealScoutOfficeListings";
import {
  generateDrBoylePersonSchema,
  generateRelocationServiceSchema,
} from "@/lib/boyle-schema";

export async function generateMetadata(): Promise<Metadata> {
  return generateMarketingMetadata("/buyers/second-home-las-vegas", {
  title: "Las Vegas Second Home | California Buyers",
  description:
    "Buy a Las Vegas second home with guidance from Dr. Gene Boyle in Irvine, CA, and on-the-ground support from Dr. Jan Duffy in Las Vegas.",
  keywords: [
    "Las Vegas second home",
    "California second home Las Vegas",
    "vacation home Las Vegas",
    "second home buyer Las Vegas",
  ],
});
}const secondHomeTopics = [
  "Neighborhood fit for part-time residency",
  "HOA rules and rental restrictions",
  "Coordinating remote showings from California",
  "Local inspection and closing support in Las Vegas",
  "Investment and move timing when combining relocation goals",
];

export default async function SecondHomeLasVegasPage() {
  const boyle = await CallDrBoyle();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateDrBoylePersonSchema(boyle)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateRelocationServiceSchema(boyle)),
        }}
      />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-slate-500 mb-6 max-w-5xl mx-auto">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            {" / "}
            <Link href="/buyers" className="hover:text-blue-600">
              Buyers
            </Link>
            {" / "}
            <span className="text-slate-900">Las Vegas Second Home</span>
          </nav>

          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Las Vegas Second Home Help for California Buyers
            </h1>
            <p className="text-xl text-slate-600">{boyle.shortBio}</p>
          </div>

      <RealScoutOfficeListings />
          <RelocationExpertPanel
            profile={boyle}
            heading="Your second-home coordination team"
          />

          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              What we help you plan
            </h2>
            <ul className="grid md:grid-cols-2 gap-4">
              {secondHomeTopics.map((topic) => (
                <li
                  key={topic}
                  className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700"
                >
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

