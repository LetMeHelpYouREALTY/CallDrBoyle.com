import Link from "next/link";
import { getRealScoutAgentEncodedId } from "@/lib/site-env/public";
import { REALSCOUT_OFFICE_LISTINGS_DEFAULTS } from "@/lib/realscout-config";

/** Server-rendered RealScout office listings — attributes must be in initial HTML. */
export default function RealScoutOfficeListings() {
  const agentId = getRealScoutAgentEncodedId();
  const d = REALSCOUT_OFFICE_LISTINGS_DEFAULTS;

  return (
    <section
      id="las-vegas-listings"
      className="scroll-mt-28 border-b border-slate-200 bg-slate-50 py-12 md:py-16"
      aria-label="Las Vegas homes for sale"
    >
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-center justify-between md:flex-row">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
              Featured Properties
            </h2>
            <p className="text-lg text-slate-600">
              Browse Las Vegas and Henderson homes for sale — listings updated daily
            </p>
          </div>
          <Link
            href="/listings"
            className="mt-4 inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 md:mt-0"
          >
            View All Properties
          </Link>
        </div>

        <div className="realscout-wrapper">
          <realscout-office-listings
            agent-encoded-id={agentId}
            sort-order={d.sortOrder}
            listing-status={d.listingStatus}
            property-types={d.propertyTypes}
            price-min={d.priceMin}
            price-max={d.priceMax}
          />
        </div>
      </div>
    </section>
  );
}
