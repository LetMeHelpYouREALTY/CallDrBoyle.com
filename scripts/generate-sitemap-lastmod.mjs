/**
 * Regenerate lib/seo/sitemap-lastmod.ts from git history per route file.
 * Run after substantive page edits: node scripts/generate-sitemap-lastmod.mjs
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const pathsFile = path.join(ROOT, "lib/seo/sitemap-paths.ts");
const outFile = path.join(ROOT, "lib/seo/sitemap-lastmod.ts");

const pathsSrc = fs.readFileSync(pathsFile, "utf8");
const pathMatches = [...pathsSrc.matchAll(/path: "([^"]+)"/g)].map((m) => m[1]);

/** Stable dates for utility/legal pages that rarely change content. */
const STATIC_LASTMOD = {
  "/faq": "2026-03-01",
  "/google-business": "2026-03-01",
  "/why-berkshire-hathaway": "2026-02-15",
  "/services": "2026-02-15",
};

function routeToFile(routePath) {
  if (routePath === "/") return "app/page.tsx";
  return `app${routePath}/page.tsx`;
}

function gitLastMod(file) {
  const full = path.join(ROOT, file);
  if (!fs.existsSync(full)) return null;
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${file}"`, {
      cwd: ROOT,
      encoding: "utf8",
    }).trim();
    return iso ? iso.slice(0, 10) : null;
  } catch {
    return null;
  }
}

const entries = {};
for (const routePath of pathMatches) {
  if (routePath === "/security-policy") continue;
  if (STATIC_LASTMOD[routePath]) {
    entries[routePath] = STATIC_LASTMOD[routePath];
    continue;
  }
  const file = routeToFile(routePath);
  entries[routePath] = gitLastMod(file) ?? "2026-01-15";
}

const lines = Object.entries(entries)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([p, d]) => `  "${p}": "${d}",`)
  .join("\n");

const content = `/** Honest per-route lastmod for sitemap.xml — regenerate via scripts/generate-sitemap-lastmod.mjs */
export const SITEMAP_LASTMOD: Record<string, string> = {
${lines}
};

const FALLBACK_LASTMOD = "2026-01-15";

export function getSitemapLastModified(routePath: string): Date {
  const iso = SITEMAP_LASTMOD[routePath] ?? FALLBACK_LASTMOD;
  return new Date(\`\${iso}T12:00:00.000Z\`);
}
`;

fs.writeFileSync(outFile, content);
console.log(`Wrote ${Object.keys(entries).length} lastmod entries to lib/seo/sitemap-lastmod.ts`);
