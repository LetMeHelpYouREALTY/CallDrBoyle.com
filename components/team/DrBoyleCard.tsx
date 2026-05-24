import Link from "next/link";
import { MapPin, User } from "lucide-react";
import {
  getBoyleLicenseComplianceLine,
  getBoylePositioningStatement,
  RELOCATION_SCHEDULE_PATH,
  type DrBoyleProfile,
} from "@/lib/CallDrBoyle";

type DrBoyleCardProps = {
  profile: DrBoyleProfile;
  showCta?: boolean;
  className?: string;
};

export default function DrBoyleCard({
  profile,
  showCta = true,
  className = "",
}: DrBoyleCardProps) {
  return (
    <article
      className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="rounded-full bg-blue-100 p-3">
          <User className="h-6 w-6 text-blue-600" aria-hidden />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{profile.name}</h2>
          <p className="text-sm text-blue-600 font-medium mt-1">{profile.title}</p>
          <p className="text-xs text-slate-500 mt-1">{profile.license}</p>
          <a
            href={profile.licenseDetails.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-1 inline-block"
          >
            Verify license on California DRE →
          </a>
        </div>
      </div>

      <p className="text-slate-700 text-sm leading-relaxed mb-4">
        {getBoylePositioningStatement(profile)}
      </p>

      <p className="text-slate-600 text-sm mb-4">{profile.shortBio}</p>

      <div className="flex items-start text-slate-700 text-sm mb-4">
        <MapPin className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" aria-hidden />
        <address className="not-italic">{profile.officeAddress}</address>
      </div>

      <p className="text-sm text-slate-600 mb-4">
        <span className="font-medium text-slate-800">{profile.partnership}.</span>{" "}
        Local tours, contracts, and closing support:{" "}
        <span className="font-medium">{profile.partnerName}</span>, {profile.partnerTitle}.
      </p>

      <ul className="space-y-1 mb-5">
        {profile.serviceAreas.map((area) => (
          <li key={area} className="text-sm text-slate-600 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
            {area}
          </li>
        ))}
      </ul>

      <p className="text-xs text-slate-500 leading-relaxed mb-5 border-t border-slate-100 pt-4">
        {getBoyleLicenseComplianceLine(profile)}
      </p>

      {showCta && (
        <Link
          href={RELOCATION_SCHEDULE_PATH}
          className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          {profile.primaryCTA}
        </Link>
      )}
    </article>
  );
}
