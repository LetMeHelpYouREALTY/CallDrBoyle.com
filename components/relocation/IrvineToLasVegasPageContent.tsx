import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import RelocationExpertPanel from "@/components/relocation/RelocationExpertPanel";
import DrBoyleCard from "@/components/team/DrBoyleCard";
import PageSeoExtras from "@/components/seo/PageSeoExtras";
import { AeoFaqSection } from "@/lib/seo/aeo-sections";
import { CallDrBoyle, RELOCATION_SCHEDULE_PATH } from "@/lib/CallDrBoyle";
import { generateDrBoylePersonSchema, generateRelocationServiceSchema } from "@/lib/boyle-schema";
import { generateFAQSchema } from "@/lib/schema";
import { getIrvineToLasVegasFaqs } from "@/lib/seo/irvine-relocation-faqs";
import { getBoylePositioningStatement } from "@/lib/CallDrBoyle";
import { ArrowRight, MapPin } from "lucide-react";

type IrvineToLasVegasPageContentProps = {
  path: string;
  h1: string;
  breadcrumbLabel: string;
};

export default async function IrvineToLasVegasPageContent({
  path,
  h1,
  breadcrumbLabel,
}: IrvineToLasVegasPageContentProps) {
  const boyle = await CallDrBoyle();
  const faqs = getIrvineToLasVegasFaqs(boyle);

  return (
    <>
      <PageSeoExtras
        path={path}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: breadcrumbLabel, href: path },
        ]}
        speakable={{
          headline: h1,
          summary: getBoylePositioningStatement(boyle),
        }}
        schemas={[
          generateDrBoylePersonSchema(boyle),
          generateRelocationServiceSchema(boyle),
          generateFAQSchema(faqs),
        ]}
      />
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-3">
              Irvine, California → Las Vegas, Nevada
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{h1}</h1>
            <p className="text-xl text-slate-600">{boyle.shortBio}</p>
          </div>

          <RelocationExpertPanel profile={boyle} heading="Your Irvine to Las Vegas team" />

          <section className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            <div className="rounded-xl border border-slate-200 p-8 bg-white">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Start in Irvine</h2>
              <p className="text-slate-600 mb-4">{getBoylePositioningStatement(boyle)}</p>
              <div className="flex items-start text-sm text-slate-700 mb-6">
                <MapPin className="h-4 w-4 text-blue-600 mr-2 mt-0.5" aria-hidden />
                <address className="not-italic">{boyle.officeAddress}</address>
              </div>
              <Link
                href={RELOCATION_SCHEDULE_PATH}
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
              >
                {boyle.primaryCTA}
                <ArrowRight className="h-4 w-4 ml-1" aria-hidden />
              </Link>
            </div>
            <DrBoyleCard profile={boyle} showCta={false} />
          </section>

          <section className="max-w-4xl mx-auto mb-12 prose prose-slate">
            <h2 className="text-2xl font-bold text-slate-900">How the move works</h2>
            <ol className="list-decimal pl-5 space-y-3 text-slate-700">
              <li>Plan your goals and timeline with {boyle.name} in Irvine.</li>
              <li>Identify Las Vegas neighborhoods and price ranges that fit your move.</li>
              <li>Tour homes in Nevada with {boyle.partnerName}.</li>
              <li>Complete contracts and closing with coordinated support on both sides.</li>
            </ol>
            <p className="text-slate-600">
              <Link href="/how-it-works" className="text-blue-600 font-medium hover:underline">
                See the full step-by-step process
              </Link>
              {" · "}
              <Link href="/guides/moving-from-irvine-to-las-vegas" className="text-blue-600 font-medium hover:underline">
                Read the moving guide
              </Link>
            </p>
          </section>

          <AeoFaqSection title="Irvine to Las Vegas — common questions" faqs={faqs} />

          <section className="mt-12 text-center">
            <Link
              href="/locations/irvine-california"
              className="text-blue-600 hover:underline mx-3 text-sm font-medium"
            >
              Irvine, California
            </Link>
            <Link
              href="/locations/las-vegas-nevada"
              className="text-blue-600 hover:underline mx-3 text-sm font-medium"
            >
              Las Vegas, Nevada
            </Link>
            <Link href="/team" className="text-blue-600 hover:underline mx-3 text-sm font-medium">
              Meet the team
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
