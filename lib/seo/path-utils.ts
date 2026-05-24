/** Human-readable segment labels for breadcrumbs and AEO copy. */
const SEGMENT_LABELS: Record<string, string> = {
  "55-plus-communities": "55+ Communities",
  buyers: "Home Buying",
  sellers: "Home Selling",
  neighborhoods: "Neighborhoods",
  listings: "Homes for Sale",
  "home-valuation": "Home Valuation",
  "market-report": "Market Report",
  "market-update": "Market Update",
  "market-insights": "Market Insights",
  "luxury-homes": "Luxury Homes",
  "new-construction": "New Construction",
  "investment-properties": "Investment Properties",
  "why-berkshire-hathaway": "Why BHHS",
  "google-business": "Google Business Profile",
  "how-it-works": "How It Works",
  relocation: "Relocation",
  "irvine-to-las-vegas": "Irvine to Las Vegas",
  guides: "Guides",
  "moving-from-irvine-to-las-vegas": "Moving from Irvine to Las Vegas",
  locations: "Locations",
  "irvine-california": "Irvine, California",
  "las-vegas-nevada": "Las Vegas, Nevada",
  team: "Our Team",
  about: "About",
  contact: "Contact",
  faq: "FAQ",
  services: "Services",
  "move-up": "Move-Up Sellers",
  downsizing: "Downsizing",
  "divorce-probate": "Divorce & Probate",
  summerlin: "Summerlin",
  henderson: "Henderson",
  "green-valley": "Green Valley",
  "the-ridges": "The Ridges",
  "southern-highlands": "Southern Highlands",
  "north-las-vegas": "North Las Vegas",
  "skye-canyon": "Skye Canyon",
  "centennial-hills": "Centennial Hills",
  inspirada: "Inspirada",
  "mountains-edge": "Mountains Edge",
  "sun-city-summerlin": "Sun City Summerlin",
  "sun-city-anthem": "Sun City Anthem",
  "sun-city-aliante": "Sun City Aliante",
  "solera-anthem": "Solera Anthem",
  "trilogy-summerlin": "Trilogy Summerlin",
  "heritage-stonebridge": "Heritage Stonebridge",
  "del-webb-lake-las-vegas": "Del Webb Lake Las Vegas",
  "california-relocator": "California Relocators",
  "first-time-buyers": "First-Time Buyers",
  "luxury-homes-las-vegas": "Luxury Homes Las Vegas",
  "second-home-las-vegas": "Las Vegas Second Home",
};

export function humanizeSlug(slug: string): string {
  if (SEGMENT_LABELS[slug]) return SEGMENT_LABELS[slug];
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function normalizePath(path: string): string {
  if (!path || path === "") return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.length > 1 && withSlash.endsWith("/")
    ? withSlash.slice(0, -1)
    : withSlash;
}

export function buildBreadcrumbsFromPath(path: string): { name: string; href: string }[] {
  const normalized = normalizePath(path);
  if (normalized === "/") {
    return [{ name: "Home", href: "/" }];
  }

  const segments = normalized.split("/").filter(Boolean);
  const crumbs: { name: string; href: string }[] = [{ name: "Home", href: "/" }];
  let acc = "";

  for (const segment of segments) {
    acc += `/${segment}`;
    crumbs.push({ name: humanizeSlug(segment), href: acc });
  }

  return crumbs;
}
