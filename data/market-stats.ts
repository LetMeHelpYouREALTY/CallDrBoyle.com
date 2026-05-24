/** Single source of truth for Las Vegas market statistics — update from GLVAR/MLS only. */
export const marketStats = {
  asOf: "2026-05-01",
  medianPrice: 0, // TODO(SEO): update from GLVAR/MLS
  avgDaysOnMarket: 0,
  activeListings: 0,
  monthsOfInventory: 0,
  yoyPriceChangePct: 0,
  source: "GLVAR / Las Vegas REALTORS",
} as const;

export function formatMarketAsOfLabel(asOf: string): string {
  const date = new Date(`${asOf}T12:00:00`);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

export function formatMarketAsOfShort(asOf: string): string {
  const date = new Date(`${asOf}T12:00:00`);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export function formatMarketAttribution(stats: typeof marketStats): string {
  return `Market data as of ${formatMarketAsOfShort(stats.asOf)} · Source: ${stats.source}`;
}

export function formatMedianPrice(value: number): string {
  if (value <= 0) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatStatNumber(value: number): string {
  if (value <= 0) return "—";
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatYoyChange(pct: number): string {
  if (pct === 0) return "—";
  const sign = pct > 0 ? "+" : "";
  return `${sign}${pct}%`;
}
