import type { FAQItem } from "@/lib/schema";
import { agentInfo, siteConfig } from "@/lib/site-config";
import { trimMetaDescription } from "@/lib/seo/generate-marketing-metadata";
import { getFaqsForDomain } from "@/lib/faq-config";
import { getDomainConfig } from "@/lib/domain-config";
import { SELLER_PAGE_FAQS } from "@/lib/seo/seller-faqs";
import { getIrvineToLasVegasFaqs } from "@/lib/seo/irvine-relocation-faqs";
import { CallDrBoyle } from "@/lib/CallDrBoyle";
import { buildBreadcrumbsFromPath, humanizeSlug, normalizePath } from "@/lib/seo/path-utils";
import type { PageMetadataInput } from "@/lib/seo/metadata";
import { SITEMAP_PATHS } from "@/lib/seo/sitemap-paths";

const PHONE = agentInfo.phoneFormatted;

/** Pages that already ship full JSON-LD in the page file — avoid duplicate FAQ/breadcrumb graphs. */
const MANUAL_SCHEMA_PATHS = new Set([
  "/faq",
  "/neighborhoods/summerlin",
  "/55-plus-communities/sun-city-anthem",
  "/how-it-works",
  "/locations/irvine-california",
  "/locations/las-vegas-nevada",
  "/investment-properties",
  "/google-business",
  "/sellers/move-up",
  "/irvine-to-las-vegas",
  "/relocation",
  "/guides/moving-from-irvine-to-las-vegas",
]);

/** Pages with a large on-page FAQ block — skip footer quick answers. */
const SUPPRESS_VISIBLE_FAQ_PATHS = new Set([
  "/faq",
  "/how-it-works",
  "/irvine-to-las-vegas",
  "/relocation",
  "/guides/moving-from-irvine-to-las-vegas",
  "/neighborhoods/summerlin",
  "/55-plus-communities/sun-city-anthem",
]);

export type ResolvedPageSeo = {
  path: string;
  pageTitle: string;
  speakable: { headline: string; summary: string };
  breadcrumbs: { name: string; href: string }[];
  faqs: FAQItem[];
  keywords: string[];
  injectSchema: boolean;
  injectVisibleFaq: boolean;
};

function segmentAfter(path: string, prefix: string): string | null {
  if (!path.startsWith(prefix)) return null;
  const rest = path.slice(prefix.length);
  const slug = rest.split("/")[0];
  return slug || null;
}

function neighborhoodFaqs(name: string): FAQItem[] {
  return [
    {
      question: `What types of homes are available in ${name}, Las Vegas?`,
      answer: `${name} offers single-family homes, townhomes, condos, and new construction across multiple price ranges. Call ${PHONE} for a current inventory snapshot before you schedule showings.`,
    },
    {
      question: `Which Las Vegas neighborhoods are most popular with California relocators?`,
      answer: `Summerlin, Henderson, and Green Valley are frequent choices for Irvine-area buyers who want master-planned amenities and valley access. ${agentInfo.name} compares commute times, HOA structures, and lot sizes to match your budget.`,
    },
    {
      question: `How do I search homes for sale in ${name}?`,
      answer: `Browse updated listings on this page or visit /listings, then call ${PHONE} to set up personalized alerts for ${name} so you see new homes and price changes quickly.`,
    },
  ];
}

function fiftyFiveFaqs(name: string): FAQItem[] {
  return [
    {
      question: `What are the age requirements for ${name}?`,
      answer: `Most Las Vegas 55+ communities require at least one resident age 55+ in at least 80% of occupied homes. Rules vary by community — call ${PHONE} for specifics on ${name}.`,
    },
    {
      question: `How much do homes cost in ${name}?`,
      answer: `Pricing depends on floor plan, upgrades, and market demand. Dr. Jan Duffy provides current ${name} comps and helps you compare value against other Summerlin and Henderson 55+ options.`,
    },
    {
      question: `Can I tour ${name} before moving from California?`,
      answer: `Yes. Many buyers relocate from Irvine and other California markets. We coordinate video tours, neighborhood comparisons, and remote contract support when you cannot visit in person.`,
    },
  ];
}

function buyerPathFaqs(slug: string | null): FAQItem[] {
  if (slug === "california-relocator") {
    return [
      {
        question: "How do I buy a home in Las Vegas while living in California?",
        answer: `Dr. Jan specializes in California-to-Las Vegas moves with remote tours, neighborhood comparisons, and contract coordination. Plan your Irvine timeline with Dr. Gene Boyle, then tour and close in Nevada with ${agentInfo.name}.`,
      },
      {
        question: "What Las Vegas areas do California relocators choose most?",
        answer:
          "Summerlin, Henderson, and Green Valley are popular for schools, parks, and suburban feel. Your advisor can match budget, commute, and lifestyle before you schedule Nevada showings.",
      },
      {
        question: "How long does it take to close on a Las Vegas home from out of state?",
        answer:
          "Financed purchases often close in 21–30 days; cash can be faster. Pre-approval early helps you compete when the right home appears on the market.",
      },
    ];
  }
  if (slug === "first-time-buyers") {
    return [
      {
        question: "What do first-time buyers need before house hunting in Las Vegas?",
        answer: `Start with a lender pre-approval and a clear monthly budget. Call ${PHONE} for a step-by-step buyer consult covering neighborhoods, incentives, and inspection contingencies.`,
      },
      {
        question: "Are there down payment programs for Las Vegas first-time buyers?",
        answer:
          "Nevada and local programs change over time. Your agent connects you with trusted lenders who can outline current assistance options during your consultation.",
      },
      {
        question: "How much are closing costs for buyers in Las Vegas?",
        answer:
          "Buyers typically pay loan fees, title, and escrow charges — often 2–3% of the purchase price depending on the offer. Your agent reviews an estimate before you submit.",
      },
    ];
  }
  return [
    {
      question: "How do I start searching for a home in Las Vegas?",
      answer: `Call ${PHONE} or use our home search tools to filter by neighborhood, price, and beds. You will get alerts when matching homes hit the market — often before they appear on major public portals.`,
    },
    {
      question: "Do I pay to work with a buyer's agent in Las Vegas?",
      answer:
        "In most transactions the seller pays the buyer agent commission through the listing agreement. You get representation, negotiation, and contract guidance at no direct cost in typical sales.",
    },
    {
      question: "How competitive is the Las Vegas housing market for buyers?",
      answer:
        "Competition varies by price point and neighborhood. Well-priced homes under $500K can see multiple offers; higher price ranges often allow more negotiation time.",
    },
  ];
}

function sellerPathFaqs(slug: string | null): FAQItem[] {
  if (slug && slug in SELLER_PAGE_FAQS) {
    return SELLER_PAGE_FAQS[slug];
  }
  return [
    {
      question: "How do I get a home valuation in Las Vegas?",
      answer: `Request a free, no-obligation market analysis from Dr. Jan Duffy using recent comparable sales and local listing data. Call ${PHONE} to schedule.`,
    },
    {
      question: "How long does it take to sell a house in Las Vegas?",
      answer:
        "Well-priced homes in popular areas often sell in a few weeks. Overpriced listings can sit longer. Accurate pricing and professional marketing shorten time on market.",
    },
    {
      question: "What marketing do you provide when I sell my Las Vegas home?",
      answer:
        "Professional photos, virtual tours when appropriate, syndication to Zillow and Realtor.com plus 100+ sites, BHHS network exposure, and targeted digital advertising.",
    },
  ];
}

function aboutFaqs(): FAQItem[] {
  return [
    {
      question: "Who is Dr. Gene Boyle on this site?",
      answer: `Dr. Gene Boyle is the California-side relocation contact based at 320 Junco, Irvine, CA 92618 (DRE #02282581). He plans Irvine-to-Las-Vegas moves and coordinates timing with the Nevada team.`,
    },
    {
      question: "Who handles Las Vegas property tours and contracts?",
      answer: `${agentInfo.name} (${agentInfo.license}) with ${agentInfo.brokerage} leads Nevada showings, offers, inspections, and closing support after your relocation plan is set.`,
    },
    {
      question: "Why does this site list two real estate professionals?",
      answer: "California and Nevada each require local licensed representation. Dr. Boyle handles Irvine planning; Dr. Duffy executes the Las Vegas transaction — one coordinated team across both states.",
    },
  ];
}

function contactFaqs(): FAQItem[] {
  return [
    {
      question: "How do I schedule an Irvine to Las Vegas relocation call?",
      answer: `Use the contact form or email ${agentInfo.email}. Dr. Gene Boyle schedules California-side planning calls; Dr. Jan Duffy supports Las Vegas tour scheduling once your search criteria are set.`,
    },
    {
      question: "Which email should I use for relocation questions?",
      answer: "Use Relocation@CallDrBoyle.com for move planning, Gene@CallDrBoyle.com for California-side questions, and Hello@CallDrBoyle.com for general inquiries.",
    },
    {
      question: "Where are the California and Nevada offices?",
      answer: `Dr. Gene Boyle's California office is 320 Junco, Irvine, CA 92618. Dr. Jan Duffy works through ${agentInfo.brokerage} in Las Vegas — office address on file pending owner confirmation.`,
    },
  ];
}

function neighborhoodsIndexFaqs(): FAQItem[] {
  return [
    {
      question: "Which Las Vegas neighborhoods are most popular with California relocators?",
      answer: "Summerlin, Henderson, Green Valley, Skye Canyon, and Inspirada are common starting points for Irvine-area buyers comparing master-planned amenities, commute routes, and price ranges.",
    },
    {
      question: "How do Summerlin and Henderson compare for commute times?",
      answer: "Summerlin sits west of the Strip with Red Rock access; Henderson is southeast with established suburban grids. Actual commute depends on your workplace — we map drive times before you tour.",
    },
    {
      question: "Can I compare neighborhoods before flying to Las Vegas?",
      answer: `Yes. Dr. Gene Boyle narrows options from Irvine while Dr. Jan Duffy provides video tours and listing alerts. Call ${PHONE} to start with a neighborhood shortlist.`,
    },
  ];
}

function marketReportFaqs(): FAQItem[] {
  return [
    {
      question: "Where does the Las Vegas market report data come from?",
      answer: "Valley-wide statistics on this page come from GLVAR / Las Vegas REALTORS and display an as-of date. Neighborhood medians may require a custom comp pull — contact us for area-specific numbers.",
    },
    {
      question: "How often is the market report updated?",
      answer: "The as-of date on each stat block shows when figures were last refreshed. Monthly GLVAR releases typically drive updates — stale numbers are replaced rather than carried forward.",
    },
    {
      question: "Can I get a market report for a specific neighborhood?",
      answer: `${agentInfo.name} prepares area-specific snapshots for Summerlin, Henderson, and other valley communities. Email ${agentInfo.email} or call ${PHONE} with your target neighborhood.`,
    },
  ];
}

function defaultFaqs(pageTitle: string): FAQItem[] {
  return [
    {
      question: `Who helps with ${pageTitle.toLowerCase()} in Las Vegas?`,
      answer: `${agentInfo.name} with ${agentInfo.brokerage} serves Las Vegas, Henderson, Summerlin, and Irvine-to-Vegas relocations. Call ${PHONE}.`,
    },
    {
      question: "How do I schedule a consultation?",
      answer: `Visit our contact page or call ${PHONE}. ${agentInfo.name} answers questions about buying, selling, and relocating to Southern Nevada.`,
    },
    {
      question: "Why choose Berkshire Hathaway HomeServices in Las Vegas?",
      answer:
        "You get a trusted global brand, local market expertise since 2008, and coordinated support for California-to-Nevada moves with Dr. Gene Boyle in Irvine and Dr. Jan Duffy in Las Vegas.",
    },
  ];
}

function buildPageTitle(path: string): string {
  const normalized = normalizePath(path);
  if (normalized === "/") {
    return "Irvine to Las Vegas Relocation";
  }
  const crumbs = buildBreadcrumbsFromPath(normalized);
  const last = crumbs[crumbs.length - 1]?.name ?? "Las Vegas Real Estate";
  if (normalized.startsWith("/neighborhoods/")) {
    return `${last} Homes for Sale`;
  }
  if (normalized.startsWith("/55-plus-communities")) {
    return normalized === "/55-plus-communities" ? "55+ Communities Las Vegas" : `${last} 55+ Homes`;
  }
  return last;
}

function buildSpeakableSummary(path: string, pageTitle: string): string {
  const normalized = normalizePath(path);
  if (normalized === "/" || normalized.includes("irvine") || normalized.includes("relocation")) {
    return `Dr. Gene Boyle in Irvine, California helps you plan a move to Las Vegas with Dr. Jan Duffy, ${agentInfo.brokerage}. Call ${PHONE} for relocation planning, home search, and selling support.`;
  }
  if (normalized.startsWith("/sellers")) {
    return `Sell your Las Vegas home with ${agentInfo.name} at ${agentInfo.brokerage}. Free market analysis, professional marketing, and expert negotiation. Call ${PHONE}.`;
  }
  if (normalized.startsWith("/buyers") || normalized === "/listings") {
    return `Search homes for sale in Las Vegas and Henderson with ${agentInfo.name}. Updated listings, neighborhood guidance, and buyer representation. Call ${PHONE}.`;
  }
  if (normalized.startsWith("/neighborhoods/")) {
    const name = humanizeSlug(normalized.split("/").pop() ?? "");
    return `Explore ${name} homes for sale with local market insight from ${agentInfo.name}, ${agentInfo.brokerage}. Median prices, schools, and lifestyle fit — call ${PHONE}.`;
  }
  return `${pageTitle} — expert Las Vegas real estate guidance from ${agentInfo.name}, ${agentInfo.brokerage}. Call ${PHONE}.`;
}

function buildKeywords(path: string, pageTitle: string): string[] {
  const normalized = normalizePath(path);
  const base = [
    "Las Vegas real estate",
    "Henderson homes for sale",
    "Berkshire Hathaway HomeServices Nevada",
    agentInfo.name,
  ];
  if (normalized.includes("irvine") || normalized.includes("relocation")) {
    return [
      ...base,
      "Irvine to Las Vegas relocation",
      "moving from California to Las Vegas",
      "California to Nevada home purchase",
      "Irvine CA real estate agent",
    ];
  }
  if (normalized.startsWith("/sellers")) {
    return [...base, "sell my house Las Vegas", "Las Vegas home valuation", "list home Las Vegas"];
  }
  if (normalized.startsWith("/buyers") || normalized === "/listings") {
    return [...base, "homes for sale Las Vegas", "Las Vegas home buyer agent", "search homes Las Vegas"];
  }
  if (normalized.startsWith("/neighborhoods/")) {
    const n = humanizeSlug(normalized.split("/").pop() ?? "");
    return [...base, `${n} homes for sale`, `${n} Las Vegas real estate`];
  }
  if (normalized.startsWith("/55-plus")) {
    return [...base, "55 plus communities Las Vegas", "active adult homes Las Vegas"];
  }
  return [...base, pageTitle, "Summerlin homes", "Las Vegas REALTOR"];
}

async function buildFaqsForPath(path: string, pageTitle: string): Promise<FAQItem[]> {
  const normalized = normalizePath(path);

  if (
    normalized === "/irvine-to-las-vegas" ||
    normalized === "/relocation" ||
    normalized === "/guides/moving-from-irvine-to-las-vegas"
  ) {
    const boyle = await CallDrBoyle();
    return getIrvineToLasVegasFaqs(boyle);
  }

  const neighborhoodSlug = segmentAfter(normalized, "/neighborhoods/");
  if (neighborhoodSlug) {
    return neighborhoodFaqs(humanizeSlug(neighborhoodSlug));
  }

  const fiftySlug = segmentAfter(normalized, "/55-plus-communities/");
  if (fiftySlug) {
    return fiftyFiveFaqs(humanizeSlug(fiftySlug));
  }
  if (normalized === "/55-plus-communities") {
    return fiftyFiveFaqs("Las Vegas 55+");
  }

  if (normalized.startsWith("/buyers")) {
    return buyerPathFaqs(segmentAfter(normalized, "/buyers/"));
  }
  if (normalized.startsWith("/sellers")) {
    return sellerPathFaqs(segmentAfter(normalized, "/sellers/"));
  }

  if (normalized === "/faq") {
    return getFaqsForDomain("search", "calldrboyle.com");
  }

  if (normalized === "/about") return aboutFaqs();
  if (normalized === "/contact") return contactFaqs();
  if (normalized === "/neighborhoods") return neighborhoodsIndexFaqs();
  if (normalized === "/market-report" || normalized === "/market-update") {
    return marketReportFaqs();
  }

  return defaultFaqs(pageTitle);
}

export async function resolvePageSeo(path: string): Promise<ResolvedPageSeo | null> {
  const normalized = normalizePath(path);

  if (normalized.startsWith("/api") || normalized.startsWith("/_next")) {
    return null;
  }

  const known = SITEMAP_PATHS.some((p) => p.path === normalized);
  if (!known && normalized !== "/" && !normalized.startsWith("/listings/")) {
    return null;
  }

  const pageTitle = buildPageTitle(normalized);
  const faqs = await buildFaqsForPath(normalized, pageTitle);

  return {
    path: normalized,
    pageTitle,
    speakable: {
      headline: pageTitle,
      summary: buildSpeakableSummary(normalized, pageTitle),
    },
    breadcrumbs: buildBreadcrumbsFromPath(normalized),
    faqs,
    keywords: buildKeywords(normalized, pageTitle),
    injectSchema: !MANUAL_SCHEMA_PATHS.has(normalized),
    injectVisibleFaq: !SUPPRESS_VISIBLE_FAQ_PATHS.has(normalized),
  };
}

/** Metadata helper for pages that adopt registry-driven titles/descriptions. */
export function buildRegistryMetadata(
  path: string,
  resolved: ResolvedPageSeo,
  overrides?: Partial<PageMetadataInput>
): PageMetadataInput {
  const normalized = normalizePath(path);
  const brand = siteConfig.brandName;
  const title =
    overrides?.title ??
    (normalized === "/"
      ? "Irvine to Las Vegas Relocation | Dr. Gene Boyle"
      : `${resolved.pageTitle} | ${brand} Las Vegas`);

  const description =
    overrides?.description ??
    trimMetaDescription(resolved.speakable.summary);

  return {
    path: normalized,
    title,
    description,
    keywords: overrides?.keywords ?? resolved.keywords,
    ogTitle: overrides?.ogTitle,
    ogDescription: overrides?.ogDescription,
  };
}

/** Domain microsites: merge domain config keywords into resolved SEO. */
export function enrichWithDomainKeywords(
  resolved: ResolvedPageSeo,
  host: string | null
): ResolvedPageSeo {
  if (!host) return resolved;
  try {
    const config = getDomainConfig(host);
    return {
      ...resolved,
      keywords: Array.from(new Set([...resolved.keywords, ...config.keywords])).slice(0, 12),
    };
  } catch {
    return resolved;
  }
}
