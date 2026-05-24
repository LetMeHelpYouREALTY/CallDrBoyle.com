import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const LISTINGS = "\n      <RealScoutOfficeListings />\n";

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "api") continue;
      walk(full, files);
    } else if (entry.name.endsWith(".tsx")) {
      files.push(full);
    }
  }
  return files;
}

function reposition(content) {
  if (!content.includes("RealScoutOfficeListings")) return content;

  let next = content.replace(/\s*<RealScoutOfficeListings \/>\s*\r?\n/g, "\n");

  const tryInsert = (re, group = 1) => {
    const match = next.match(re);
    if (match) {
      next = next.replace(match[group], match[group] + LISTINGS);
      return true;
    }
    return false;
  };

  if (tryInsert(/(<section className="relative[\s\S]*?<\/section>)/)) return next;
  if (tryInsert(/(\{\/\*\s*Hero[^*]*\*\/\}[\s\S]*?<\/div>\s*\r?\n)(\s*\r?\n\s*(?:\{\/\*|<div|<section|<ol))/)) return next;
  if (tryInsert(/(<div className="max-w-[^"]+ mx-auto text-center mb-1[26]">[\s\S]*?<\/div>\s*\r?\n)/)) return next;
  if (tryInsert(/(<h1 className="text-4xl[^"]*"[\s\S]*?<\/h1>\s*\r?\n\s*<p className="text-lg[^"]*"[\s\S]*?<\/p>\s*\r?\n)/)) return next;
  if (tryInsert(/(<h1 className="text-4xl[^"]*"[\s\S]*?<\/h1>\s*\r?\n)/)) return next;

  return next;
}

let fixed = 0;
for (const file of [...walk(path.join(ROOT, "app")), path.join(ROOT, "components/relocation/IrvineToLasVegasPageContent.tsx")]) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, "utf8");
  const next = reposition(content);
  if (next !== content) {
    fs.writeFileSync(file, next);
    fixed++;
    console.log("Repositioned:", path.relative(ROOT, file));
  }
}

console.log(`Done. Repositioned ${fixed} file(s).`);
