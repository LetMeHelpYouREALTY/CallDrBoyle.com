import type { Metadata } from "next";
import { headers } from "next/headers";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import PageSeoExtras from "@/components/seo/PageSeoExtras";
import { CallDrBoyle } from "@/lib/CallDrBoyle";
import { generateDrBoylePersonSchema } from "@/lib/boyle-schema";
import { buildPageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import { MapPin } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const host = headers().get("host");
  return buildPageMetadata({
    host,
    path: "/locations/irvine-california",
    title: "Irvine, California Office | Dr. Gene Boyle",
    description:
      "Plan your move from Irvine, California to Las Vegas with Dr. Gene Boyle at 320 Junco, Irvine, CA 92618.",
    keywords: ["Dr Gene Boyle Irvine", "Irvine real estate relocation", "Orange County to Las Vegas"],
  });
}

export default async function IrvineCaliforniaPage() {
  const boyle = await CallDrBoyle();

  return (
    <>
      <PageSeoExtras
        path="/locations/irvine-california"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Locations", href: "/irvine-to-las-vegas" },
          { name: "Irvine, CA", href: "/locations/irvine-california" },
        ]}
        speakable={{
          headline: "Irvine, California — relocation planning office",
          summary: `${boyle.name} helps people move from Irvine, California to Las Vegas from ${boyle.officeAddress}.`,
        }}
        schemas={[
          generateDrBoylePersonSchema(boyle),
          {
            "@context": "https://schema.org",
            "@type": "Place",
            name: "Irvine, California",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Irvine",
              addressRegion: "CA",
              postalCode: "92618",
              addressCountry: "US",
            },
          },
        ]}
      />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Irvine, California</h1>
          <p className="text-lg text-slate-600 mb-8">{boyle.shortBio}</p>
          <div className="flex items-start gap-3 rounded-xl border border-slate-200 p-6 mb-8">
            <MapPin className="h-5 w-5 text-blue-600 mt-0.5" aria-hidden />
            <div>
              <p className="font-semibold text-slate-900">{boyle.name}</p>
              <address className="not-italic text-slate-700 mt-1">{boyle.officeAddress}</address>
            </div>
          </div>
          <Link href="/irvine-to-las-vegas" className="text-blue-600 font-semibold hover:underline">
            Irvine to Las Vegas relocation →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
