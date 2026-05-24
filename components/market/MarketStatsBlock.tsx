import {
  formatMarketAttribution,
  formatMedianPrice,
  formatStatNumber,
  formatYoyChange,
  marketStats,
} from "@/data/market-stats";

type MarketStatsBlockProps = {
  heading?: string;
  className?: string;
};

export function MarketStatsBlock({
  heading = "Las Vegas Real Estate Market",
  className = "",
}: MarketStatsBlockProps) {
  const yoy = formatYoyChange(marketStats.yoyPriceChangePct);

  const stats = [
    {
      value: formatMedianPrice(marketStats.medianPrice),
      label: "Median Price",
      sub: yoy !== "—" ? `${yoy} YoY` : "",
    },
    {
      value: formatStatNumber(marketStats.avgDaysOnMarket),
      label: "Avg Days on Market",
      sub: "",
    },
    {
      value: formatStatNumber(marketStats.activeListings),
      label: "Active Listings",
      sub: "",
    },
    {
      value:
        marketStats.monthsOfInventory > 0
          ? String(marketStats.monthsOfInventory)
          : "—",
      label: "Months Inventory",
      sub: "",
    },
  ];

  return (
    <section className={`py-16 bg-slate-900 text-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">{heading}</h2>
          <p className="text-slate-400 text-sm">{formatMarketAttribution(marketStats)}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map(({ value, label, sub }) => (
            <div key={label} className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-1">{value}</div>
              <div className="text-slate-300 text-sm">{label}</div>
              {sub ? <div className="text-green-400 text-xs mt-1">{sub}</div> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
