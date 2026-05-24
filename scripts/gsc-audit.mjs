/**
 * Google Search Console readiness audit for calldrboyle.com
 * Run: node scripts/gsc-audit.mjs [--live]
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const LIVE = process.argv.includes("--live");
const SITE = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.calldrboyle.com";

const issues = [];
const passes = [];
const warnings = [];

function pass(msg) {
  passes.push(msg);
}
function warn(msg) {
  warnings.push(msg);
}
function fail(msg) {
  issues.push(msg);
}

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

// --- Local checks ---
const sitemapPathsSrc = read("lib/seo/sitemap-paths.ts");
const pathMatches = [...sitemapPathsSrc.matchAll(/path: "([^"]+)"/g)].map((m) => m[1]);
pass(`Sitemap registry lists ${pathMatches.length} marketing paths`);

if (!read(".env.example").includes("GOOGLE_SITE_VERIFICATION")) {
  fail(".env.example missing GOOGLE_SITE_VERIFICATION");
} else {
  pass("GOOGLE_SITE_VERIFICATION documented in .env.example");
}

if (!read("lib/seo/search-console.ts").includes("getSearchConsoleVerificationMetadata")) {
  fail("search-console.ts verification helper missing");
} else {
  pass("Verification metadata helper exists (lib/seo/search-console.ts)");
}

if (!read("lib/seo/metadata.ts").includes("getSearchConsoleVerificationMetadata")) {
  fail("buildPageMetadata does not merge GSC verification");
} else {
  pass("buildPageMetadata merges GSC/Bing verification tokens");
}

const robotsSrc = read("app/robots.ts");
if (robotsSrc.includes('disallow: ["/_next/"]') || robotsSrc.includes('"/_next/"')) {
  fail("robots.ts may block /_next/ static assets");
} else {
  pass("robots.ts does not block /_next/ static assets");
}
if (robotsSrc.includes("/api/")) {
  pass("robots.ts disallows /api/");
}

const heyberkshireInApp = [];
for (const dir of ["app", "components", "lib"]) {
  walk(path.join(ROOT, dir), (file) => {
    if (!/\.(tsx|ts)$/.test(file)) return;
    if (file.includes("domain-config") || file.includes("faq-config")) return;
    const content = fs.readFileSync(file, "utf8");
    if (/heyberkshire\.com/i.test(content)) {
      heyberkshireInApp.push(path.relative(ROOT, file));
    }
  });
}
if (heyberkshireInApp.length) {
  warn(
    `${heyberkshireInApp.length} file(s) still reference heyberkshire.com (confuses GSC entity signals):\n  - ${heyberkshireInApp.slice(0, 12).join("\n  - ")}${heyberkshireInApp.length > 12 ? "\n  - …" : ""}`
  );
} else {
  pass("No heyberkshire.com references in app/components/lib (excluding multi-domain config)");
}

if (!pathMatches.includes("/google-business")) {
  warn("Sitemap missing /google-business (GBP landing page)");
}
if (!pathMatches.includes("/security-policy")) {
  warn("Sitemap missing /security-policy (optional — page is indexable)");
}

// --- Live checks ---
async function liveAudit() {
  console.log(`\nLive audit: ${SITE}\n`);

  const homeRes = await fetch(SITE, { redirect: "follow" });
  const homeHtml = await homeRes.text();
  if (homeRes.ok) pass(`Homepage returns ${homeRes.status}`);
  else fail(`Homepage returns ${homeRes.status}`);

  if (homeHtml.includes('rel="canonical" href="' + SITE)) {
    pass(`Canonical matches property URL (${SITE})`);
  } else {
    const canon = homeHtml.match(/rel="canonical" href="([^"]+)"/);
    fail(`Canonical mismatch: ${canon?.[1] ?? "not found"} (expected ${SITE})`);
  }

  if (/google-site-verification/i.test(homeHtml)) {
    pass("google-site-verification meta tag present on homepage");
  } else {
    fail("No google-site-verification meta on homepage — set GOOGLE_SITE_VERIFICATION in Vercel");
  }

  if (/application\/ld\+json/i.test(homeHtml)) {
    pass("JSON-LD present on homepage");
  } else {
    warn("No JSON-LD detected on homepage HTML");
  }

  const robotsRes = await fetch(`${SITE}/robots.txt`);
  const robotsTxt = await robotsRes.text();
  if (robotsRes.ok && robotsTxt.includes(`Sitemap: ${SITE}/sitemap.xml`)) {
    pass("robots.txt Sitemap line matches canonical host");
  } else {
    fail("robots.txt Sitemap line missing or wrong host");
  }

  const apexRes = await fetch("https://calldrboyle.com/", { redirect: "manual" });
  if ([301, 302, 307, 308].includes(apexRes.status)) {
    const loc = apexRes.headers.get("location") || "";
    if (loc.includes("www.calldrboyle.com")) {
      pass(`Apex redirects (${apexRes.status}) to www`);
    } else {
      warn(`Apex redirect destination unexpected: ${loc}`);
    }
  } else {
    warn(`Apex did not redirect (status ${apexRes.status})`);
  }

  const smRes = await fetch(`${SITE}/sitemap.xml`);
  const smXml = await smRes.text();
  const locs = [...smXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (smRes.ok) pass(`sitemap.xml live with ${locs.length} URLs`);
  else fail(`sitemap.xml returned ${smRes.status}`);

  const offOrigin = locs.filter((u) => !u.startsWith(SITE));
  if (offOrigin.length) fail(`${offOrigin.length} sitemap URL(s) off canonical origin`);
  else pass("All sitemap URLs use canonical origin");

  const missingFromLive = pathMatches.filter((p) => !locs.includes(`${SITE}${p}`));
  if (missingFromLive.length) {
    warn(`Registry paths not in live sitemap: ${missingFromLive.join(", ")}`);
  }

  const samplePaths = ["/contact", "/irvine-to-las-vegas", "/neighborhoods/summerlin"];
  for (const p of samplePaths) {
    const r = await fetch(`${SITE}${p}`, { redirect: "follow" });
    if (r.ok) pass(`${p} → ${r.status}`);
    else fail(`${p} → ${r.status}`);
  }
}

function walk(dir, fn) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, fn);
    else fn(full);
  }
}

async function main() {
  console.log("Google Search Console audit — CallDrBoyle.com\n");
  console.log("=== Codebase ===");
  for (const p of passes.filter((x) => !x.startsWith("Live"))) console.log(`  ✓ ${p}`);
  for (const w of warnings) console.log(`  ⚠ ${w}`);
  for (const f of issues) console.log(`  ✗ ${f}`);

  if (LIVE) {
    const livePasses = [];
    const liveIssues = [];
    const liveWarnings = [];
    const orig = { pass, warn, fail };
    const reset = () => {
      passes.length = 0;
      warnings.length = 0;
      issues.length = 0;
    };
    reset();
    await liveAudit();
    livePasses.push(...passes);
    liveWarnings.push(...warnings);
    liveIssues.push(...issues);
    for (const p of livePasses) console.log(`  ✓ ${p}`);
    for (const w of liveWarnings) console.log(`  ⚠ ${w}`);
    for (const f of liveIssues) console.log(`  ✗ ${f}`);
  } else {
    console.log("\nTip: run with --live to check production headers and sitemap.");
  }

  console.log("\n=== GSC setup checklist (manual) ===");
  console.log("  1. Add property: URL prefix https://www.calldrboyle.com");
  console.log("  2. Verify via HTML tag → GOOGLE_SITE_VERIFICATION in Vercel → redeploy");
  console.log("  3. Submit sitemap: https://www.calldrboyle.com/sitemap.xml");
  console.log("  4. Link GA4 (NEXT_PUBLIC_GA_MEASUREMENT_ID) in GSC → Settings");
  console.log("  5. URL Inspection: /, /irvine-to-las-vegas, /contact — Request indexing");
  console.log("  6. Rich Results Test: homepage + /faq + /google-business");
  console.log("  7. Page indexing: expect apex/http variants as ‘Page with redirect’ (OK)");

  process.exit(issues.length ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
