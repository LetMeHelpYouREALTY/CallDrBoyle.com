import { getRealScoutAgentEncodedId } from "@/lib/site-env/public";

/** RealScout office-listings embed defaults (override via env when needed). */
export const REALSCOUT_OFFICE_LISTINGS_DEFAULTS = {
  sortOrder: "STATUS_AND_SIGNIFICANT_CHANGE",
  listingStatus: "For Sale",
  propertyTypes: "SFR",
  priceMin: "600000",
  priceMax: "900000",
} as const;

export function getRealScoutOfficeListingsMarkup(): string {
  const agentId = getRealScoutAgentEncodedId();
  const d = REALSCOUT_OFFICE_LISTINGS_DEFAULTS;
  return `<realscout-office-listings 
    agent-encoded-id="${agentId}" 
    sort-order="${d.sortOrder}" 
    listing-status="${d.listingStatus}" 
    property-types="${d.propertyTypes}" 
    price-min="${d.priceMin}" 
    price-max="${d.priceMax}"
  ></realscout-office-listings>`;
}
