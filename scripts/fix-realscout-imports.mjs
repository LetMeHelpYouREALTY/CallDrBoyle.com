import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const IMPORT_LINE =
  'import RealScoutOfficeListings from "@/components/realscout/RealScoutOfficeListings";\n';

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

let fixed = 0;
for (const file of walk(path.join(ROOT, "app"))) {
  let content = fs.readFileSync(file, "utf8");
  if (!content.includes("<RealScoutOfficeListings")) continue;
  if (content.includes('import RealScoutOfficeListings')) continue;

  const imports = [...content.matchAll(/^import .+;\r?\n/gm)];
  if (imports.length) {
    const last = imports[imports.length - 1];
    const idx = last.index + last[0].length;
    content = content.slice(0, idx) + IMPORT_LINE + content.slice(idx);
  } else {
    content = IMPORT_LINE + content;
  }

  fs.writeFileSync(file, content);
  fixed++;
  console.log("Fixed import:", path.relative(ROOT, file));
}

console.log(`Fixed ${fixed} file(s).`);
