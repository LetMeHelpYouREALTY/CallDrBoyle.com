import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  agentInfo,
  geneBoyleContact,
  janDuffyContact,
  LV_OFFICE_ADDRESS,
} from "@/lib/site-config";
import { getSitePhoneTelHref } from "@/lib/site-contact";
import { mailtoHref, siteEmails } from "@/lib/site-emails";
import UniversalPageSeo from "@/components/seo/UniversalPageSeo";

function PhoneLink({ className }: { className?: string }) {
  const tel = getSitePhoneTelHref();
  const display = agentInfo.phoneFormatted;
  if (!tel) {
    return <span className={className}>{display}</span>;
  }
  return (
    <Link href={tel} className={className}>
      {display}
    </Link>
  );
}

export default async function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <UniversalPageSeo />
      <footer className="bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div>
              <h3 className="font-bold text-xl mb-4">Call Dr. Gene Boyle</h3>
              <p className="text-slate-300 mb-4 text-sm">
                Irvine to Las Vegas relocation — coordinated with Berkshire Hathaway HomeServices
                Nevada Properties.
              </p>
              <Link href="/listings" className="text-sm text-blue-400 hover:text-blue-300 underline">
                Browse Las Vegas listings
              </Link>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/listings" className="text-slate-300 hover:text-white text-sm">
                    All Properties
                  </Link>
                </li>
                <li>
                  <Link href="/neighborhoods" className="text-slate-300 hover:text-white text-sm">
                    Neighborhoods
                  </Link>
                </li>
                <li>
                  <Link href="/relocation" className="text-slate-300 hover:text-white text-sm">
                    Relocation
                  </Link>
                </li>
                <li>
                  <Link href="/market-report" className="text-slate-300 hover:text-white text-sm">
                    Market Report
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="text-slate-300 hover:text-white text-sm">
                    Our Team
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-300 hover:text-white text-sm">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Dr. Gene Boyle — California</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>
                    {geneBoyleContact.address.street}
                    <br />
                    {geneBoyleContact.address.city}, {geneBoyleContact.address.state}{" "}
                    {geneBoyleContact.address.zip}
                  </span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-blue-400" />
                  <Link href={mailtoHref("gene")} className="hover:text-white">
                    {siteEmails.gene}
                  </Link>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-blue-400" />
                  <Link href={mailtoHref("relocation")} className="hover:text-white">
                    {siteEmails.relocation}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Dr. Jan Duffy — Las Vegas</h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>
                    {janDuffyContact.brokerage}
                    <br />
                    {LV_OFFICE_ADDRESS}
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-blue-400" />
                  <PhoneLink className="hover:text-white" />
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-blue-400" />
                  <Link href={mailtoHref("hello")} className="hover:text-white">
                    {siteEmails.hello}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8">
            <p className="text-slate-400 text-sm text-center">
              © {currentYear} Berkshire Hathaway HomeServices Nevada Properties. All Rights
              Reserved.
            </p>
            <p className="text-slate-500 text-xs mt-4 text-center">
              {geneBoyleContact.name} · California DRE #{geneBoyleContact.license} ·{" "}
              {janDuffyContact.name} · {janDuffyContact.license} · {janDuffyContact.brokerage}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm mt-4">
              <Link href="/faq" className="text-slate-400 hover:text-white">
                FAQ
              </Link>
              <Link href="/sitemap.xml" className="text-slate-400 hover:text-white">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
