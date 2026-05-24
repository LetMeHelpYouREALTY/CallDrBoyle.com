/**
 * Wraps static `export const metadata` in registry-backed generateMarketingMetadata(),
 * preserving the full metadata object as overrides.
 *
 * Run: node scripts/apply-marketing-metadata.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const APP = path.join(ROOT, "app");

function fileToRoute(filePath) {
  const rel = path.relative(APP, filePath).replace(/\\/g, "/");
  const dir = rel.replace(/\/page\.tsx$/, "").replace(/^page\.tsx$/, "");
  if (!dir || dir === "page.tsx") return "/";
  return `/${dir}`;
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name === "page.tsx") out.push(full);
  }
  return out;
}

function extractMetadataBlock(content) {
  const marker = "export const metadata";
  const start = content.indexOf(marker);
  if (start === -1) return null;

  const eq = content.indexOf("=", start);
  const open = content.indexOf("{", eq);
  if (open === -1) return null;

  let depth = 0;
  let inString = false;
  let stringChar = "";
  let escaped = false;

  for (let i = open; i < content.length; i++) {
    const ch = content[i];

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (ch === "\\") {
        escaped = true;
        continue;
      }
      if (ch === stringChar) inString = false;
      continue;
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      inString = true;
      stringChar = ch;
      continue;
    }

    if (ch === "{") depth++;
    if (ch === "}") {
      depth--;
      if (depth === 0) {
        let end = i + 1;
        while (end < content.length && /[\s;]/.test(content[end])) end++;
        return { start, end, inner: content.slice(open, i + 1) };
      }
    }
  }
  return null;
}

function ensureImports(content) {
  if (!content.includes('import type { Metadata } from "next"')) {
    content = `import type { Metadata } from "next";\n${content}`;
  }
  if (!content.includes("generate-marketing-metadata")) {
    content = content.replace(
      'import type { Metadata } from "next";',
      'import type { Metadata } from "next";\nimport { generateMarketingMetadata } from "@/lib/seo/generate-marketing-metadata";'
    );
  }
  return content;
}

let updated = 0;
for (const file of walk(APP)) {
  if (file.includes("[id]")) continue;

  let content = fs.readFileSync(file, "utf8");
  if (content.includes("generateMarketingMetadata")) continue;
  if (content.includes("export async function generateMetadata")) continue;

  const block = extractMetadataBlock(content);
  if (!block) continue;

  const route = fileToRoute(file);
  const replacement = `export async function generateMetadata(): Promise<Metadata> {
  return generateMarketingMetadata("${route}", ${block.inner});
}`;

  content = content.slice(0, block.start) + replacement + content.slice(block.end);
  content = ensureImports(content);

  fs.writeFileSync(file, content);
  updated++;
  console.log("updated:", path.relative(ROOT, file), "->", route);
}

console.log(`Done. ${updated} page(s) migrated.`);
