import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import {
  getBoylePositioningStatement,
  RELOCATION_SCHEDULE_PATH,
  type DrBoyleProfile,
} from "@/lib/CallDrBoyle";
import { agentInfo } from "@/lib/site-config";

type RelocationExpertPanelProps = {
  profile: DrBoyleProfile;
  heading?: string;
  showJanPartnerBlock?: boolean;
};

export default function RelocationExpertPanel({
  profile,
  heading = "Relocation to Las Vegas",
  showJanPartnerBlock = true,
}: RelocationExpertPanelProps) {
  return (
    <section className="mb-16 max-w-5xl mx-auto" aria-labelledby="relocation-expert-heading">
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 md:p-10 shadow-sm">
        <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide mb-2">
          California contact · Las Vegas coordination
        </p>
        <h2 id="relocation-expert-heading" className="text-3xl font-bold text-slate-900 mb-4">
          {heading}
        </h2>
        <p className="text-lg text-slate-700 leading-relaxed mb-6">
          {getBoylePositioningStatement(profile)}
        </p>
        <p className="text-slate-600 mb-6">{profile.shortBio}</p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-slate-900 mb-3">{profile.name}</h3>
            <p className="text-sm text-slate-600 mb-2">{profile.title}</p>
            <p className="text-sm text-slate-500 mb-1">{profile.license}</p>
            <a
              href={profile.licenseDetails.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Verify on California DRE →
            </a>
            <div className="flex items-start text-slate-700 text-sm">
              <MapPin className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" aria-hidden />
              <address className="not-italic font-medium">{profile.officeAddress}</address>
            </div>
          </div>

          {showJanPartnerBlock && (
            <div className="rounded-lg bg-white border border-slate-200 p-5">
              <h3 className="font-semibold text-slate-900 mb-2">Las Vegas partner</h3>
              <p className="text-sm text-slate-600 mb-3">
                {profile.partnership}. {profile.partnerName} handles property tours, contracts,
                and closing support in the Las Vegas market.
              </p>
              <p className="text-sm font-medium text-slate-800">{profile.partnerTitle}</p>
              <a
                href={agentInfo.phoneTel}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 mt-3 font-medium"
              >
                <Phone className="h-4 w-4 mr-1" aria-hidden />
                {agentInfo.phoneFormatted}
              </a>
            </div>
          )}
        </div>

        <ul className="grid sm:grid-cols-3 gap-3 mb-8">
          {profile.serviceAreas.map((area) => (
            <li
              key={area}
              className="text-sm text-slate-700 bg-white rounded-lg border border-slate-100 px-4 py-3 text-center"
            >
              {area}
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={RELOCATION_SCHEDULE_PATH}
            className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-blue-700 transition-colors"
          >
            {profile.primaryCTA}
            <ArrowRight className="h-5 w-5 ml-2" aria-hidden />
          </Link>
          <Link
            href="/relocation"
            className="inline-flex items-center justify-center border border-slate-300 text-slate-700 px-8 py-4 rounded-md font-semibold hover:bg-slate-50 transition-colors"
          >
            Relocation overview
          </Link>
        </div>
      </div>
    </section>
  );
}
