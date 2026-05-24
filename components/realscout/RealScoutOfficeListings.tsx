"use client";

import { Button } from "@/components/ui/button";
import { getRealScoutOfficeListingsMarkup } from "@/lib/realscout-config";

export default function RealScoutOfficeListings() {
  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex flex-col items-center justify-between md:flex-row">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl lg:text-5xl">
              Featured Properties
            </h2>
            <p className="text-lg text-slate-600">
              Browse Las Vegas and Henderson homes — search powered by RealScout
            </p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <a
              href="http://drjanduffy.realscout.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Properties
            </a>
          </Button>
        </div>

        <div
          className="realscout-wrapper"
          dangerouslySetInnerHTML={{
            __html: getRealScoutOfficeListingsMarkup(),
          }}
        />
      </div>
    </section>
  );
}
