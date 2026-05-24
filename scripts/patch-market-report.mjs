import fs from "node:fs";
import {
  formatMarketAsOfLabel,
  formatMarketAttribution,
  formatMedianPrice,
  formatStatNumber,
  formatYoyChange,
  marketStats,
} from "../data/market-stats.ts";

// Note: script uses string patch only
const path = "app/market-report/page.tsx";
let content = fs.readFileSync(path, "utf8");

const monthLabel = formatMarketAsOfLabel(marketStats.asOf);
const reportTitle = `Las Vegas Real Estate Market Report — ${monthLabel}`;

content = content.replace(
  /title: "Las Vegas Real Estate Market Report January 2026[^"]*"/,
  `title: "${reportTitle} | Call Dr. Gene Boyle"`
);

content = content.replace(
  /description:\s*\n\s*"Get the latest Las Vegas real estate market statistics for January 2026[^"]*"/,
  `description:\n    "Las Vegas market statistics as of ${monthLabel}. Median price, days on market, and inventory from ${marketStats.source}."`
);

content = content.replace(
  /name: "Las Vegas Real Estate Market Report - January 2026"/,
  `name: "${reportTitle}"`
);

content = content.replace(
  /datePublished: "2026-01-23"/,
  `datePublished: "${marketStats.asOf}",\n  dateModified: "${marketStats.asOf}"`
);

content = content.replace(
  /January 2026 \| Expert analysis/g,
  `${monthLabel} | Expert analysis`
);

content = content.replace(
  /Las Vegas Market Snapshot \| January 2026/g,
  `Las Vegas Market Snapshot | ${monthLabel}`
);

content = content.replace(
  /<div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">\$450,000<\/motionSafeValue>/g,
  `<div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{formatMedianPrice(marketStats.medianPrice)}</motionSafeValue>`
);

if (!content.includes("from \"@/data/market-stats\"")) {
  content = content.replace(
    'import RealScoutOfficeListings from "@/components/realscout/RealScoutOfficeListings";',
    `import RealScoutOfficeListings from "@/components/realscout/RealScoutOfficeListings";\nimport {\n  formatMarketAsOfLabel,\n  formatMarketAttribution,\n  formatMedianPrice,\n  formatStatNumber,\n  formatYoyChange,\n  marketStats,\n} from "@/data/market-stats";\nimport { generateMarketReportSchema } from "@/lib/boyle-schema";`
  );
}

// Replace hardcoded stat block values
content = content.replace(
  `<motionSafeStatBlock />`,
  `<MarketStatSnapshot />`
);

fs.writeFileSync(path, content);
console.log("Patched market-report metadata strings");
