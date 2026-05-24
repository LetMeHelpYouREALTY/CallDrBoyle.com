import type { Metadata } from "next";
import { headers } from "next/headers";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import PageSeoExtras from "@/components/seo/PageSeoExtras";
import { AeoFaqSection } from "@/lib/seo/aeo-sections";
import { CallDrBoyle } from "@/lib/CallDrBoyle";
import { generateDrBoylePersonSchema } from "@/lib/boyle-schema";
import { generateFAQSchema } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo/metadata";
import Link from "next/link";

export async function generateMetadata(): Promise<Metadata> {
  const host = headers().get("host");
  return buildPageMetadata({
    host,
    path: "/how-it-works",
    title: "How It Works | Irvine to Las Vegas Relocation",
    description:
      "How Dr. Gene Boyle in Irvine and Dr. Jan Duffy in Las Vegas work together on your move from California to Nevada.",
  });
}

export default async function HowItWorksPage() {
  const boyle = await CallDrBoyle();

  const faqs = [
    {
      question: "What happens on the first call?",
      answer: `You speak with ${boyle.name} about your timeline, budget, and whether you are relocating or buying a second home. The call is focused on your Irvine-to-Las Vegas goals.`,
    },
    {
      question: "When does the Las Vegas agent get involved?",
      answer: `After your plan is clear, ${boyle.partnerName} schedules property tours and handles Nevada contract steps while ${boyle.name} stays your California point of contact.`,
    },
    {
      question: "Where is Dr. Gene Boyle located?",
      answer: `${boyle.name} is based at ${boyle.officeAddress}.`,
    },
  ];

  return (
    <>
      <PageSeoExtras
        path="/how-it-works"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "How it works", href: "/how-it-works" },
        ]}
        speakable={{
          headline: "How Irvine to Las Vegas relocation works",
          summary: boyle.shortBio,
        }}
        schemas={[generateDrBoylePersonSchema(boyle), generateFAQSchema(faqs)]}
      />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-slate-900 mb-6 text-center">
            How Irvine to Las Vegas relocation works
          </h1>
          <p className="text-lg text-slate-600 text-center mb-12">{boyle.shortBio}</p>

          <ol className="space-y-8">
            {[
              {
                step: "1",
                title: "Plan in Irvine",
                body: `${boyle.name} learns your move goals, second-home plans, and timing from ${boyle.officeAddress}.`,
              },
              {
                step: "2",
                title: "Match Las Vegas options",
                body: "Together you narrow neighborhoods, price ranges, and property types before you fly or drive to Nevada.",
              },
              {
                step: "3",
                title: "Tour and offer in Las Vegas",
                body: `${boyle.partnerName} (${boyle.partnerTitle}) leads showings, offers, and local contract coordination.`,
              },
              {
                step: "4",
                title: "Close with coordinated support",
                body: "California planning and Nevada execution stay aligned through closing.",
              },
            ].map((item) => (
              <li key={item.step} className="flex gap-4 rounded-xl border border-slate-200 p-6 bg-white">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                  {item.step}
                </span>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h2>
                  <p className="text-slate-600">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="text-center mt-12">
            <Link
              href="/contact#schedule-relocation"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-md font-bold hover:bg-blue-700"
            >
              {boyle.primaryCTA}
            </Link>
          </div>

          <AeoFaqSection title="Process questions" faqs={faqs} />
        </div>
      </main>
      <Footer />
    </>
  );
}
