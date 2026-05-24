import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const APP_DIR = path.join(ROOT, "app");
const IMPORT_LINE =
  'import RealScoutOfficeListings from "@/components/realscout/RealScoutOfficeListings";\n';
const LISTINGS = "\n      <RealScoutOfficeListings />\n";

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "api") continue;
      walk(full, files);
    } else if (entry.name === "page.tsx") {
      files.push(full);
    }
  }
  return files;
}

function addImport(content) {
  if (content.includes('import RealScoutOfficeListings')) return content;
  const imports = [...content.matchAll(/^import .+;\r?\n/gm)];
  if (!imports.length) return IMPORT_LINE + content;
  const last = imports[imports.length - 1];
  const idx = last.index + last[0].length;
  return content.slice(0, idx) + IMPORT_LINE + content.slice(idx);
}

function insertAfterHero(content) {
  if (content.includes("<RealScoutOfficeListings")) return content;

  const patterns = [
    // Full-bleed hero section (homepage)
    /(<section className="relative[\s\S]*?<\/section>)/,
    // Comment-marked hero block
    /(\{\/\*\s*Hero[^*]*\*\/\}[\s\S]*?<\/div>\s*\r?\n)/,
    // Centered intro block (team, neighborhoods, etc.)
    /(<div className="max-w-[^"]+ mx-auto text-center mb-1[26]">[\s\S]*?<\/div>\s*\r?\n)/,
    // H1 + intro paragraph
    /(<h1 className="text-4xl[^"]*"[\s\S]*?<\/h1>\s*\r?\n\s*<p className="text-lg[^"]*"[\s\S]*?<\/p>\s*\r?\n)/,
    // H1 only (simple pages)
    /(<h1 className="text-4xl[^"]*"[\s\S]*?<\/h1>\s*\r?\n)/,
  ];

  for (const re of patterns) {
    const match = content.match(re);
    if (match) {
      return content.replace(match[1], match[1] + LISTINGS);
    }
  }

  return null;
}

const files = walk(APP_DIR);
let updated = 0;
const missed = [];

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  if (content.includes("<RealScoutOfficeListings")) continue;

  const next = insertAfterHero(content);
  if (!next) {
    missed.push(path.relative(ROOT, file));
    continue;
  }

  content = addImport(next);
  fs.writeFileSync(file, content);
  updated++;
  console.log("Updated:", path.relative(ROOT, file));
}

if (missed.length) {
  console.log("\nManual review needed:");
  missed.forEach((f) => console.log(" -", f));
}

console.log(`\nDone. Updated ${updated} page(s).`);
