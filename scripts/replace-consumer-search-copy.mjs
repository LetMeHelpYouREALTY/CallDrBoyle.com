/**
 * One-off: replace MLS / RealScout jargon in user-facing copy.
 * Run: node scripts/replace-consumer-search-copy.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

const REPLACEMENTS = [
  ["search powered by RealScout", "listings updated daily"],
  ["Sign up for a personalized RealScout search", "Set up a personalized home search"],
  ["<strong>RealScout:</strong> MLS/IDX property data", "<strong>Home search:</strong> property listing data"],
  ["Full MLS access + off-market opportunities", "Search all homes for sale + off-market opportunities"],
  ["Full MLS Access", "Search All Homes for Sale"],
  ["Full MLS access", "Search all homes for sale"],
  ["Live MLS Data", "Updated Listings Daily"],
  ["Live MLS listings", "Live home listings"],
  ["live MLS listings", "live home listings"],
  ["Las Vegas MLS Property Listings", "Las Vegas Homes for Sale"],
  ["MLS Property Search", "Home Search"],
  ["MLS listings Las Vegas", "Las Vegas homes for sale"],
  ["MLS listing syndicated to 100+ websites", "Listed on Zillow, Realtor.com, and 100+ home search sites"],
  ["MLS syndication to 100+ websites", "listing on Zillow, Realtor.com, and 100+ home search sites"],
  ["current MLS data", "current local listing data"],
  ["Using current MLS", "Using current local listing"],
  ["MLS data", "local listing data"],
  ["all MLS listings", "all current homes for sale"],
  ["automated MLS alerts", "automated new home alerts"],
  ["before they hit the MLS", "before they appear on public home search sites"],
  ["listed on the MLS", "listed for sale online"],
  ["listing it on the MLS", "listing your home online"],
  ["more than just an MLS listing", "more than just posting your home online"],
  ["Direct MLS access", "Direct access to all homes for sale"],
  ["Every MLS listing", "Every home for sale"],
  ["latest MLS data", "the latest listing updates"],
  ["MLS Search Expert", "Home Search Expert"],
  ["Las Vegas MLS search", "Las Vegas home search"],
  ["MLS Las Vegas", "homes for sale Las Vegas"],
  ["Las Vegas MLS", "Las Vegas home search"],
  ["MLS listings updated daily", "Home listings updated daily"],
  ["MLS listings", "homes for sale"],
  ["public MLS", "public home search websites"],
  ["the Las Vegas MLS", "the local home listings database"],
  ["How current is your MLS data?", "How current are your home listings?"],
  ["Data Source: Las Vegas REALTORS® MLS", "Data source: Las Vegas area home listing records"],
  ["{/* RealScout Widget - Live MLS Listings */}", "{/* Live home listings */}"],
  ["{/* RealScout Search Widget */}", "{/* Home search widget */}"],
  ["{/* RealScout Search Widget */}", "{/* Home search widget */}"],
];

const SCAN_DIRS = ["app", "components", "lib"];
const EXT = new Set([".tsx", ".ts", ".mdx"]);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "api" || entry.name === "node_modules") continue;
      walk(full, out);
    } else if (EXT.has(path.extname(entry.name))) {
      out.push(full);
    }
  }
  return out;
}

let changedFiles = 0;
for (const dir of SCAN_DIRS) {
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) continue;
  for (const file of walk(abs)) {
    if (file.includes(`${path.sep}lib${path.sep}site-env${path.sep}`)) continue;
    if (file.includes(`${path.sep}lib${path.sep}realscout-config`)) continue;
    if (file.includes(`${path.sep}components${path.sep}realscout${path.sep}RealScoutScript`)) continue;
    if (file.includes("claude/prompt-templates")) continue;
    if (file.includes("agent-jan-duffy")) continue;

    let text = fs.readFileSync(file, "utf8");
    const before = text;
    for (const [from, to] of REPLACEMENTS) {
      text = text.split(from).join(to);
    }
    if (text !== before) {
      fs.writeFileSync(file, text);
      changedFiles += 1;
      console.log("updated:", path.relative(ROOT, file));
    }
  }
}

console.log(`Done. ${changedFiles} file(s) updated.`);
