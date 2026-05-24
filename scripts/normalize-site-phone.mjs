import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const EXT = new Set([".tsx", ".ts"]);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next") continue;
      walk(full, files);
    } else if (EXT.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

let changed = 0;

for (const file of walk(ROOT)) {
  if (file.includes(`${path.sep}lib${path.sep}site-contact.ts`)) continue;
  let content = fs.readFileSync(file, "utf8");
  const original = content;

  content = content.replace(/href="tel:\+17025001942"/g, "href={agentInfo.phoneTel}");
  content = content.replace(/href=\{`tel:\+17025001942`\}/g, "href={agentInfo.phoneTel}");

  if (content === original) continue;

  if (!content.includes('from "@/lib/site-config"')) {
    if (content.startsWith('"use client"')) {
      content = content.replace(
        '"use client";\n\n',
        '"use client";\n\nimport { agentInfo } from "@/lib/site-config";\n'
      );
    } else {
      content = `import { agentInfo } from "@/lib/site-config";\n${content}`;
    }
  } else if (!content.includes("agentInfo")) {
    content = content.replace(
      /import \{([^}]*)\} from "@\/lib\/site-config";/,
      (match, imports) => `import { agentInfo, ${imports.trim()} } from "@/lib/site-config";`
    );
  }

  fs.writeFileSync(file, content);
  changed++;
}

console.log(`Updated ${changed} files with agentInfo.phoneTel routing.`);
