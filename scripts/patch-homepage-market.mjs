import fs from "node:fs";

const path = "app/page.tsx";
let content = fs.readFileSync(path, "utf8");

const startMarker = "        {/* Market Stats */}";
const endMarker = "        <WhyChooseUs />";

const start = content.indexOf(startMarker);
const end = content.indexOf(endMarker);

if (start === -1 || end === -1) {
  console.error("Markers not found", { start, end });
  process.exit(1);
}

const replacement = `        <MarketStatsBlock heading={\`\${config.neighborhood} Real Estate Market\`} />
        <motionSafeMarketCta />
`;

content = content.slice(0, start) + replacement + content.slice(end);

if (!content.includes("function motionSafeMarketCta")) {
  content += `

function motionSafeMarketCta() {
  return (
    <div className="bg-slate-900 pb-8">
      <div className="container mx-auto px-4 text-center">
        <Link
          href="/market-report"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold transition-colors"
        >
          Full Market Report
        </Link>
      </div>
    </div>
  );
}
`;
}

fs.writeFileSync(path, content);
console.log("Patched app/page.tsx market stats section");
