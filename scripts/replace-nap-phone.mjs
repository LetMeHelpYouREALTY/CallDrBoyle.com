import fs from "node:fs";
import path from "node:path";

const TARGET_DIRS = ["app", "components", "lib", "public"];
const OLD_DISPLAY = "(702) 500-1942";
const NEW_DISPLAY = "(949) 638-3939";
const OLD_TEL = "+17025001942";
const NEW_TEL = "+19496383939";
const SKIP_DIRS = new Set(["node_modules", ".next", ".git"]);
const SKIP_FILES = new Set([
  path.join("lib", "site-contact.ts"),
  path.join("scripts", "replace-nap-phone.mjs"),
  path.join("scripts", "normalize-site-phone.mjs"),
]);

const EXT = new Set([".tsx", ".ts", ".txt", ".mjs"]);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (EXT.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

let changed = 0;

for (const dir of TARGET_DIRS) {
  const base = path.join(process.cwd(), dir);
  if (!fs.existsSync(base)) continue;
  for (const file of walk(base)) {
  const rel = path.relative(process.cwd(), file);
  if (SKIP_FILES.has(rel)) continue;
  if (rel.startsWith(`docs${path.sep}`)) continue;

  let content = fs.readFileSync(file, "utf8");
  const original = content;

  content = content.replaceAll(OLD_DISPLAY, NEW_DISPLAY);
  content = content.replaceAll(OLD_TEL, NEW_TEL);
  content = content.replaceAll("tel:+1-702-500-1942", "tel:+1-949-638-3939");

  if (content === original) continue;
  fs.writeFileSync(file, content);
  changed++;
  console.log(rel);
  }
}

console.log(`\nUpdated ${changed} files.`);
