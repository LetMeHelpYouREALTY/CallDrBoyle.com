import fs from "node:fs";

const path = "app/market-report/page.tsx";
let s = fs.readFileSync(path, "utf8");

s = s.replace(
  '<motionSafeValue value="$450,000" />',
  '<motionSafeValue value={formatMedianPrice(marketStats.medianPrice)} />'
);
s = s.replace(
  '<motionSafeValue value="$450,000"/>',
  '<motionSafeValue value={formatMedianPrice(marketStats.medianPrice)}/>'
);
s = s.replace(
  '<div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">$450,000</div>',
  '<div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{formatMedianPrice(marketStats.medianPrice)}</div>'
);
s = s.replace(
  '<div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">28</div>',
  '<motionSafeValue value={formatStatNumber(marketStats.avgDaysOnMarket)} />'
);
s = s.replace(
  '<div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">28</motionSafeValue>',
  '<div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{formatStatNumber(marketStats.avgDaysOnMarket)}</motionSafeValue>'
);
s = s.replace(
  '<div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">28</div>',
  '<div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{formatStatNumber(marketStats.avgDaysOnMarket)}</div>'
);
s = s.replace(
  '<div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">4,850</div>',
  '<div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{formatStatNumber(marketStats.activeListings)}</div>'
);
s = s.replace(
  '<div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">2.1</div>',
  '<div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{marketStats.monthsOfInventory > 0 ? String(marketStats.monthsOfInventory) : "—"}</div>'
);

s = s.replace(
  "+4.2% YoY",
  '{formatYoyChange(marketStats.yoyPriceChangePct) !== "—" ? `${formatYoyChange(marketStats.yoyPriceChangePct)} YoY` : "Pending update"}'
);

// Remove unsourced trend lines
s = s.replace(
  `<motionSafeTrend />
                <div className="flex items-center justify-center mt-1 text-green-400 text-sm">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  -3 days
                </div>`,
  ""
);

s = s.replace(
  `<div className="flex items-center justify-center mt-1 text-green-400 text-sm">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  -3 days
                </div>`,
  ""
);

s = s.replace(
  `<div className="flex items-center justify-center mt-1 text-yellow-400 text-sm">
                  +12% YoY
                </div>`,
  ""
);

s = s.replace(
  `<div className="flex items-center justify-center mt-1 text-slate-400 text-sm">
                  Seller's Market
                </div>`,
  ""
);

fs.writeFileSync(path, s);
console.log("Patched market-report stats");
