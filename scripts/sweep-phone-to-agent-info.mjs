/**
 * Replace hardcoded (949) 638-3939 / +19496383939 with site-contact helpers.
 * - app/ + components/: agentInfo.phoneFormatted, getSitePhoneSchemaValue()
 * - lib/ (except site-contact): SITE_PHONE / getSitePhoneDisplay()
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PHONE = "(949) 638-3939";
const E164 = "+19496383939";
const SKIP = new Set([
  path.join("lib", "site-contact.ts"),
  path.join("scripts", "sweep-phone-to-agent-info.mjs"),
  path.join("scripts", "normalize-site-phone.mjs"),
  path.join("scripts", "replace-nap-phone.mjs"),
]);

const TARGET_DIRS = ["app", "components", "lib"];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === ".next") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.tsx?$/.test(entry.name)) files.push(full);
  }
  return files;
}

function isLib(rel) {
  return rel.startsWith(`lib${path.sep}`);
}

function ensureSiteConfigImport(content) {
  if (!content.includes("agentInfo")) return content;
  if (content.includes('from "@/lib/site-config"')) {
    if (/import\s*\{[^}]*\bagentInfo\b/.test(content)) return content;
    return content.replace(
      /import \{([^}]*)\} from "@\/lib\/site-config";/,
      (m, imports) => {
        const trimmed = imports.trim();
        return `import { agentInfo, ${trimmed} } from "@/lib/site-config";`;
      }
    );
  }
  if (content.startsWith('"use client"')) {
    return content.replace(
      '"use client";\n\n',
      '"use client";\n\nimport { agentInfo } from "@/lib/site-config";\n'
    );
  }
  return `import { agentInfo } from "@/lib/site-config";\n${content}`;
}

function ensureSiteContactImport(content, names) {
  const need = names.filter((n) => content.includes(n));
  if (need.length === 0) return content;

  const existing = content.match(
    /import \{([^}]*)\} from "@\/lib\/site-contact";/
  );
  if (existing) {
    const have = new Set(
      existing[1].split(",").map((s) => s.trim().split(/\s+as\s+/)[0])
    );
    const add = need.filter((n) => !have.has(n));
    if (add.length === 0) return content;
    return content.replace(
      /import \{([^}]*)\} from "@\/lib\/site-contact";/,
      `import { ${[...have, ...add].join(", ")} } from "@/lib/site-contact";`
    );
  }
  return `import { ${need.join(", ")} } from "@/lib/site-contact";\n${content}`;
}

function processContent(content, rel) {
  if (SKIP.has(rel)) return { content, changed: false };
  if (!content.includes(PHONE) && !content.includes(E164)) {
    return { content, changed: false };
  }

  const original = content;
  const libFile = isLib(rel);

  // Schema telephone fields
  content = content.replace(
    /telephone:\s*"(?:\+19496383939|\(949\) 638-3939)"/g,
    "telephone: getSitePhoneSchemaValue() ?? \"\""
  );

  if (libFile) {
    // Template / string literals in lib
    content = content.replace(
      /"([^"]*)\(949\) 638-3939([^"]*)"/g,
      (_, before, after) => `\`${before}\${getSitePhoneDisplay()}${after}\``
    );
    content = content.replace(
      /'([^']*)\(949\) 638-3939([^']*)'/g,
      (_, before, after) => `\`${before}\${getSitePhoneDisplay()}${after}\``
    );
    content = content.replaceAll(PHONE, "${getSitePhoneDisplay()}");
  } else {
    // Metadata / FAQ string literals only (avoid matching across JSX attribute quotes)
    content = content.replace(
      /^( *)(description|text|title):\s*"([^"]*)\(949\) 638-3939([^"]*)"/gm,
      (_, indent, key, before, after) =>
        `${indent}${key}: \`${before}\${agentInfo.phoneFormatted}${after}\`,`
    );
    // JSX / remaining visible copy (after string literals)
    content = content.replaceAll(PHONE, "{agentInfo.phoneFormatted}");
  }

  if (content === original) return { content, changed: false };

  if (libFile) {
    const names = [];
    if (content.includes("getSitePhoneDisplay")) names.push("getSitePhoneDisplay");
    if (content.includes("getSitePhoneSchemaValue")) names.push("getSitePhoneSchemaValue");
    if (content.includes("SITE_PHONE")) names.push("SITE_PHONE");
    content = ensureSiteContactImport(content, names);
  } else {
    if (content.includes("getSitePhoneSchemaValue")) {
      content = ensureSiteContactImport(content, ["getSitePhoneSchemaValue"]);
    }
    if (content.includes("agentInfo")) {
      content = ensureSiteConfigImport(content);
    }
  }

  return { content, changed: true };
}

let changed = 0;

for (const dir of TARGET_DIRS) {
  const base = path.join(ROOT, dir);
  if (!fs.existsSync(base)) continue;
  for (const file of walk(base)) {
    const rel = path.relative(ROOT, file);
    if (SKIP.has(rel)) continue;
    const { content, changed: did } = processContent(
      fs.readFileSync(file, "utf8"),
      rel
    );
    if (!did) continue;
    fs.writeFileSync(file, content);
    changed++;
    console.log(rel);
  }
}

console.log(`\nUpdated ${changed} files.`);
