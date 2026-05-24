/** Cited, fair-housing-neutral facts for AEO blocks on money pages. */

export type AeoFact = {
  label: string;
  value: string;
  source: string;
  sourceUrl?: string;
};

/** Irvine → Las Vegas relocation key facts (sources cited inline for AI extraction). */
export const IRVINE_RELOCATION_KEY_FACTS: AeoFact[] = [
  {
    label: "Nevada state income tax",
    value: "Nevada does not levy a personal state income tax on wages or self-employment income.",
    source: "Nevada Department of Taxation",
    sourceUrl: "https://tax.nv.gov/",
  },
  {
    label: "California DRE contact",
    value: "Dr. Gene Boyle (California DRE Salesperson #02282581) plans your move from 320 Junco, Irvine, CA 92618.",
    source: "California Department of Real Estate",
    sourceUrl: "https://www2.dre.ca.gov/PublicASP/pplinfo.asp?License_id=02282581",
  },
  {
    label: "Nevada transaction agent",
    value: "Dr. Jan Duffy (Nevada REALTOR® #S.0197614, Berkshire Hathaway HomeServices Nevada Properties) handles Las Vegas tours, contracts, and closing.",
    source: "CallDrBoyle.com team page",
    sourceUrl: "https://www.calldrboyle.com/team",
  },
  {
    label: "Typical financed close timeline",
    value: "Financed purchases in Nevada often close in 21–30 days after offer acceptance; cash can close faster depending on title and inspection terms.",
    source: "Industry practice — confirm with your lender and title company",
  },
  {
    label: "Drive time Irvine → Las Vegas",
    value: "Driving from Irvine, CA to Las Vegas, NV is roughly 4–4.5 hours via I-15 under normal traffic.",
    source: "Google Maps driving estimate (varies by time of day)",
  },
];

export const BUYERS_KEY_FACTS: AeoFact[] = [
  {
    label: "Buyer agent cost",
    value: "In a typical Nevada resale, the seller pays the listing-side commission; your buyer agent representation is usually covered through that arrangement — confirm terms in writing before you tour.",
    source: "NAR buyer representation practice",
  },
  {
    label: "Financed close timeline",
    value: "Financed purchases in Clark County often close in 21–45 days after offer acceptance, depending on lender, appraisal, and inspection timelines.",
    source: "Local closing practice — verify with your lender",
  },
  {
    label: "Nevada transfer taxes",
    value: "Nevada does not levy a state real estate transfer tax on most residential resales; Clark County recording and title fees still apply at closing.",
    source: "Nevada Department of Taxation",
    sourceUrl: "https://tax.nv.gov/",
  },
];

export const SELLERS_KEY_FACTS: AeoFact[] = [
  {
    label: "Days on market (verify live)",
    value: "Median days on market varies by price band and neighborhood — request a current CMA before you set list price rather than relying on a site-wide average.",
    source: "GLVAR/MLS — owner to populate in data/market-stats.ts",
  },
  {
    label: "Listing exposure",
    value: "BHHS Nevada listings syndicate to major portals (Zillow, Realtor.com, etc.) plus the RealScout/BHHS network; marketing mix should be confirmed in your listing agreement.",
    source: "CallDrBoyle.com seller services",
  },
  {
    label: "Net proceeds",
    value: "Seller net sheets should itemize payoff, commissions, title, HOA transfer fees, and any buyer credits — review the estimated settlement statement before accepting an offer.",
    source: "Nevada residential settlement practice",
  },
];

export const HOW_IT_WORKS_KEY_FACTS: AeoFact[] = [
  {
    label: "Who you call first",
    value: "Start with Dr. Gene Boyle in Irvine to define budget, timeline, and target Las Vegas areas before scheduling Nevada showings.",
    source: "CallDrBoyle.com relocation process",
  },
  {
    label: "When the Nevada agent joins",
    value: "Dr. Jan Duffy leads property tours, offers, and Nevada contract steps once your search criteria are set.",
    source: "CallDrBoyle.com how-it-works",
  },
  {
    label: "Remote buying",
    value: "Many Irvine-area buyers preview homes via video tour and submit offers before their first in-person visit.",
    source: "CallDrBoyle.com relocation service",
  },
];
