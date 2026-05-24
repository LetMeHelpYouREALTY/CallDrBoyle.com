import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { Phone, Mail, MapPin, Clock, Calendar, CheckCircle, Star, Users, Shield } from "lucide-react";
import CalendlyWidget from "@/components/calendly/CalendlyWidget";
import Link from "next/link";
import type { Metadata } from "next";
import { generateMarketingMetadata } from "@/lib/seo/generate-marketing-metadata";
import {
  agentInfo,
  getOfficePostalAddressSchema,
  officeInfo,
  officeMapUrls,
} from "@/lib/site-config";
import { mailtoHref, siteEmails } from "@/lib/site-emails";
import { CallDrBoyle } from "@/lib/CallDrBoyle";
import DrBoyleCard from "@/components/team/DrBoyleCard";
import { generateDrBoylePersonSchema } from "@/lib/boyle-schema";
import RealScoutOfficeListings from "@/components/realscout/RealScoutOfficeListings";
import { AeoAnswerLead } from "@/lib/seo/aeo-sections";

export async function generateMetadata(): Promise<Metadata> {
  return generateMarketingMetadata("/contact", {
  title: "Contact | Las Vegas Relocation & Second-Home Help",
  description:
    "Contact Dr. Gene Boyle in Irvine for California-to-Las Vegas relocation and second-home planning. Schedule a relocation call or reach Dr. Jan Duffy for Las Vegas tours and closing.",
  keywords: [
    "contact real estate agent Las Vegas",
    "Berkshire Hathaway contact",
    "Dr. Jan Duffy phone",
    "Las Vegas realtor contact",
    "schedule real estate appointment",
  ],
});
}const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  mainEntity: {
    "@type": "RealEstateAgent",
    name: "Dr. Jan Duffy - Berkshire Hathaway HomeServices Nevada Properties",
    telephone: "+17025001942",
    email: siteEmails.hello,
    address: getOfficePostalAddressSchema(),
  },
};

export default async function ContactPage() {
  const boyle = await CallDrBoyle();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
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
          <div className="text-center mb-12">
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Berkshire Hathaway HomeServices Nevada Properties
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              Contact Us
            </h1>
            <AeoAnswerLead className="mb-6">
              Call Dr. Gene Boyle in Irvine for California-side relocation planning, or reach Dr.
              Jan Duffy in Las Vegas for tours, offers, and closing — both licensed REALTOR®
              partners on one Irvine-to-Las Vegas team.
            </AeoAnswerLead>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              {boyle.shortBio}
            </p>
          </div>

      <RealScoutOfficeListings />

          <div className="max-w-6xl mx-auto mb-10">
            <DrBoyleCard profile={boyle} />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info & Map */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Get In Touch</h2>
              <p className="text-slate-700 mb-8">
                Whether you're buying your first home, selling a luxury property, or exploring
                investment opportunities, I'm here to provide expert guidance backed by the trusted{" "}
                <strong>Berkshire Hathaway HomeServices</strong> brand. Serving Las Vegas since 2008 
                with $127M+ in closed transactions.
              </p>

              {/* NAP Information */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start bg-slate-50 rounded-lg p-4">
                  <Phone className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Phone (Call or Text)</h3>
                    <a
                      href={agentInfo.phoneTel}
                      className="text-2xl font-bold text-blue-600 hover:text-blue-700"
                    >
                      (702) 500-1942
                    </a>
                    <p className="text-sm text-slate-500 mt-1">
                      Available 7 days a week, 9am-6pm
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-slate-50 rounded-lg p-4">
                  <Mail className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">General inquiries</h3>
                      <a
                        href={mailtoHref("hello")}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {siteEmails.hello}
                      </a>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Relocation planning</h3>
                      <a
                        href={mailtoHref("relocation")}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {siteEmails.relocation}
                      </a>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Dr. Gene Boyle (Irvine)</h3>
                      <a
                        href={mailtoHref("gene")}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {siteEmails.gene}
                      </a>
                    </div>
                    <p className="text-sm text-slate-500 pt-1">
                      Typically respond within 2 hours during business hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start bg-slate-50 rounded-lg p-4">
                  <MapPin className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">
                      {boyle.name} — California office
                    </h3>
                    <address className="not-italic text-slate-700">
                      {boyle.officeAddress}
                    </address>
                  </div>
                </div>

                <div className="flex items-start bg-slate-50 rounded-lg p-4">
                  <Clock className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Office Hours</h3>
                    <p className="text-slate-700">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday - Sunday: 10:00 AM - 4:00 PM
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      Available by appointment outside these hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Map Embed */}
              <div className="rounded-xl overflow-hidden shadow-md mb-4">
                <iframe
                  src={officeMapUrls.embed}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Berkshire Hathaway HomeServices Nevada Properties - Office Location"
                  className="w-full"
                />
              </div>
              
              {/* Map Action Buttons */}
              <div className="flex gap-3 mb-8">
                <a
                  href={officeMapUrls.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Get Directions
                </a>
                <a
                  href={officeMapUrls.view}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  View on Google Maps
                </a>
              </div>

              {/* Credentials */}
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-slate-700">
                  <strong>Dr. Jan Duffy, REALTOR®</strong><br />
                  {agentInfo.license}
                  <br />
                  {agentInfo.licenseDetails.city}, {agentInfo.licenseDetails.state}{" "}
                  {agentInfo.licenseDetails.zipCode}
                  <br />
                  Berkshire Hathaway HomeServices Nevada Properties
                </p>
              </div>
            </div>

            {/* Schedule Appointment - Calendly Widget */}
            <div id="schedule-relocation">
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-blue-600 text-white p-6 text-center">
                  <Calendar className="h-10 w-10 mx-auto mb-3" />
                  <h2 className="text-2xl font-bold mb-2">{boyle.primaryCTA}</h2>
                  <p className="text-blue-100">
                    Book a time with {boyle.name} to discuss your Las Vegas relocation or
                    second-home goals. {boyle.partnerName} supports tours and closing in Nevada.
                  </p>
                </div>
                <CalendlyWidget height="600px" />
              </div>

              {/* Why Contact BHHS */}
              <div className="mt-6 bg-slate-900 text-white rounded-xl p-6">
                <h3 className="font-bold text-lg mb-4">Why Contact Berkshire Hathaway HomeServices?</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300 text-sm">
                      <strong className="text-white">Trusted Brand:</strong> The only real estate brand backed by Warren Buffett's Berkshire Hathaway Inc.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Star className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300 text-sm">
                      <strong className="text-white">Proven Results:</strong> $127M+ in closed transactions serving Las Vegas since 2008.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300 text-sm">
                      <strong className="text-white">Global Network:</strong> 50,000+ agents worldwide for seamless relocations and referrals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Areas Section */}
          <section className="max-w-5xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
              Areas We Serve
            </h2>
            <p className="text-slate-600 text-center max-w-3xl mx-auto mb-8">
              Dr. Jan Duffy provides expert real estate services throughout the Las Vegas Valley. 
              Whether you're buying, selling, or investing in any of these communities, contact us 
              for personalized guidance backed by Berkshire Hathaway HomeServices.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Las Vegas",
                "Henderson",
                "Summerlin",
                "Green Valley",
                "North Las Vegas",
                "Southern Highlands",
                "Skye Canyon",
                "Centennial Hills",
                "The Ridges",
                "Inspirada",
                "Mountains Edge",
                "Spring Valley",
              ].map((area) => (
                <div key={area} className="bg-slate-50 rounded-lg p-3 text-center hover:bg-blue-50 transition-colors">
                  <span className="text-slate-700 font-medium text-sm">{area}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Contact Options */}
          <section className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
              Prefer to Reach Out Directly?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <a
                href={agentInfo.phoneTel}
                className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl transition-colors"
              >
                <Phone className="h-8 w-8 mr-4" />
                <div className="text-left">
                  <div className="font-bold text-lg">Call Now</div>
                  <div className="text-blue-100">(702) 500-1942</div>
                </div>
              </a>
              <a
                href={mailtoHref("relocation")}
                className="flex items-center justify-center bg-slate-700 hover:bg-slate-800 text-white p-6 rounded-xl transition-colors"
              >
                <Mail className="h-8 w-8 mr-4" />
                <div className="text-left">
                  <div className="font-bold text-lg">Relocation Email</div>
                  <div className="text-slate-300">{siteEmails.relocation}</div>
                </div>
              </a>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "What should I expect during my first consultation?",
                  a: "Your consultation is a no-pressure conversation about your real estate goals. We'll discuss your timeline, budget, preferences, and answer any questions you have about the Las Vegas market. Whether you're buying, selling, or exploring options, I'll provide honest guidance tailored to your situation.",
                },
                {
                  q: "Do I need to be pre-approved before scheduling a showing?",
                  a: "For buyers, having a pre-approval letter strengthens your position, but it's not required for an initial consultation. I can connect you with trusted local lenders during our first meeting if you haven't started the financing process yet.",
                },
                {
                  q: "How quickly can you respond to inquiries?",
                  a: "I typically respond to calls, texts, and emails within 2 hours during business hours (9am-6pm daily). For urgent matters, calling or texting (702) 500-1942 is the fastest way to reach me.",
                },
                {
                  q: "Do you charge for consultations?",
                  a: "No. Initial consultations are always free and without obligation. Whether you're ready to move forward or just exploring your options, there's never any pressure.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-slate-50 rounded-lg p-6">
                  <h3 className="font-bold text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Last Updated */}
        <div className="text-center text-sm text-slate-500 mt-8">Last Updated: January 2026</div>
      </main>
      <Footer />
    </>
  );
}

