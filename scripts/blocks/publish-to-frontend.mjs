import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";

const REPO_ROOT = process.cwd();
const SHARED_BLOCKS_ROOT = path.join(REPO_ROOT, "shared/blocks");
const FRONTEND_ROOT = path.join(REPO_ROOT, "frontend");

const OUT_REGISTRY_ROOT = path.join(FRONTEND_ROOT, "blocks/registry");
const OUT_PUBLIC_ROOT = path.join(FRONTEND_ROOT, "public/blocks");
const OUT_MANIFEST = path.join(FRONTEND_ROOT, "blocks/manifest.ts");
const OUT_REPORT = path.join(REPO_ROOT, "docs/BLOCKS_REPORT.md");

function normalizeNewlines(input) {
  return input.replaceAll("\r\n", "\n").replaceAll("\r", "\n");
}

function toTitleCase(slug) {
  return slug
    .split(/[-\s]+/g)
    .filter(Boolean)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join(" ");
}

function toIdentifier(input) {
  const cleaned = input.replace(/[^A-Za-z0-9]+/g, " ").trim();
  const pascal = cleaned
    .split(/\s+/g)
    .filter(Boolean)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join("");
  return pascal ? `Block${pascal}` : `Block${createHash("sha1").update(input).digest("hex").slice(0, 8)}`;
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function listBlocks() {
  const categories = await fs.readdir(SHARED_BLOCKS_ROOT, { withFileTypes: true });
  const result = [];

  for (const dirent of categories) {
    if (!dirent.isDirectory()) continue;
    if (dirent.name.startsWith("_")) continue;
    const category = dirent.name;

    const categoryRoot = path.join(SHARED_BLOCKS_ROOT, category);
    const blocks = await fs.readdir(categoryRoot, { withFileTypes: true });
    for (const blockDir of blocks) {
      if (!blockDir.isDirectory()) continue;
      const slug = blockDir.name;
      const root = path.join(categoryRoot, slug);
      const metaPath = path.join(root, "meta.json");
      const tsxPath = path.join(root, "block.tsx");
      if (!(await fileExists(metaPath)) || !(await fileExists(tsxPath))) continue;

      const meta = JSON.parse(await fs.readFile(metaPath, "utf8"));
      const code = await fs.readFile(tsxPath, "utf8");
      result.push({ category, slug, title: meta.title ?? slug, meta, code });
    }
  }

  result.sort((a, b) => a.category.localeCompare(b.category) || a.slug.localeCompare(b.slug));
  return result;
}

function sanitizeTailwindClasses(code) {
  let out = code;

  out = out.replaceAll("bg-linear-to-", "bg-gradient-to-");
  out = out.replace(/aspect-(\d+)\/(\d+)/g, "aspect-[$1/$2]");

  // Non-standard spacing sizes found in sample blocks (Tailwind default doesn't include these).
  out = out.replace(/\bh-132\b/g, "h-[528px]");
  out = out.replace(/\bh-150\b/g, "h-[600px]");
  out = out.replace(/\bmt-18\b/g, "mt-[4.5rem]");

  // Avoid hardcoded “success green” to keep themes consistent.
  out = out.replace(/\btext-green-500\b/g, "text-primary");

  // Replace demo mesh colors with token-based gradient.
  out = out.replace(
    /\bbg-gradient-to-r from-amber-100 via-red-200 to-teal-100\b/g,
    "bg-gradient-to-r from-primary/15 via-secondary/10 to-accent/15",
  );

  return out;
}

function stripShadcnblocksMentions(code) {
  let out = code;
  out = out.replaceAll("https://shadcnblocks.com", "#");
  out = out.replaceAll("shadcnblocks.com", "AuroraStack");
  return out;
}

function extractComponentName(code) {
  const match = code.match(/export\s*{\s*([A-Za-z0-9_]+)\s*};/);
  if (match) return match[1];
  return null;
}

function ensureDefaultExport(code) {
  if (/export\s+default\s+/m.test(code)) return code;
  const name = extractComponentName(code);
  if (!name) return code;
  return `${code.trim()}\n\nexport default ${name};\n`;
}

function extractUiImports(code) {
  const ui = new Set();
  const magicui = new Set();

  for (const match of code.matchAll(/from\s+["']@\/components\/ui\/([^"']+)["']/g)) {
    ui.add(match[1]);
  }
  for (const match of code.matchAll(/from\s+["']@\/components\/magicui\/([^"']+)["']/g)) {
    magicui.add(match[1]);
  }

  return { ui: [...ui], magicui: [...magicui] };
}

function extractExternalImports(code) {
  const externals = new Set();
  for (const match of code.matchAll(/from\s+["']([^"'.@/][^"']*)["']/g)) {
    externals.add(match[1]);
  }
  return [...externals].sort();
}

function extractImageUrls(code) {
  const urls = new Set();
  for (const match of code.matchAll(/\ssrc=["'](https?:\/\/[^"']+)["']/g)) {
    urls.add(match[1]);
  }
  for (const match of code.matchAll(/\bimage:\s*["'](https?:\/\/[^"']+)["']/g)) {
    urls.add(match[1]);
  }
  return [...urls];
}

function safeFilenameFromUrl(url) {
  try {
    const u = new URL(url);
    const pathname = u.pathname;
    const base = pathname.split("/").filter(Boolean).pop() ?? "asset";
    const cleaned = base.replace(/[^A-Za-z0-9._-]/g, "_");
    if (cleaned && cleaned !== "_") return cleaned;
  } catch {
    // ignore
  }
  return `asset-${createHash("sha1").update(url).digest("hex").slice(0, 10)}`;
}

async function downloadTo(url, destPath) {
  if (await fileExists(destPath)) return { ok: true, skipped: true };
  const res = await fetch(url);
  if (!res.ok) return { ok: false, skipped: false, status: res.status };
  const arrayBuffer = await res.arrayBuffer();
  await fs.mkdir(path.dirname(destPath), { recursive: true });
  await fs.writeFile(destPath, Buffer.from(arrayBuffer));
  return { ok: true, skipped: false };
}

async function main() {
  const blocks = await listBlocks();
  if (blocks.length === 0) {
    throw new Error("No ingested blocks found under shared/blocks/<category>/<slug>/");
  }

  const report = [];
  const manifestCategories = new Map();

  await fs.mkdir(OUT_REGISTRY_ROOT, { recursive: true });
  await fs.mkdir(OUT_PUBLIC_ROOT, { recursive: true });

  for (const block of blocks) {
    const category = block.category;
    const slug = block.slug;
    const title = block.title;

    const uiImports = extractUiImports(block.code);
    const externalImports = extractExternalImports(block.code);
    const imageUrls = extractImageUrls(block.code);

    const missingUi = [];
    for (const uiName of uiImports.ui) {
      const uiPath = path.join(FRONTEND_ROOT, "components/ui", `${uiName}.tsx`);
      if (!(await fileExists(uiPath))) missingUi.push(`ui/${uiName}`);
    }
    for (const magicName of uiImports.magicui) {
      const magicPath = path.join(FRONTEND_ROOT, "components/magicui", `${magicName}.tsx`);
      if (!(await fileExists(magicPath))) missingUi.push(`magicui/${magicName}`);
    }

    let code = normalizeNewlines(block.code);
    code = stripShadcnblocksMentions(code);
    code = sanitizeTailwindClasses(code);

    const localImageDir = path.join(OUT_PUBLIC_ROOT, category, slug);
    const localImageWebPrefix = `/blocks/${category}/${slug}`;
    const imageDownloads = [];

    for (const url of imageUrls) {
      const filename = safeFilenameFromUrl(url);
      const dest = path.join(localImageDir, filename);
      const dl = await downloadTo(url, dest);
      imageDownloads.push({ url, filename, ...dl });
      if (dl.ok) {
        code = code.replaceAll(url, `${localImageWebPrefix}/${filename}`);
      }
    }

    code = ensureDefaultExport(code);

    const outDir = path.join(OUT_REGISTRY_ROOT, category);
    await fs.mkdir(outDir, { recursive: true });
    const outFile = path.join(outDir, `${slug}.tsx`);
    await fs.writeFile(outFile, code, "utf8");

    if (!manifestCategories.has(category)) {
      manifestCategories.set(category, {
        slug: category,
        title: toTitleCase(category),
        blocks: [],
      });
    }
    manifestCategories.get(category).blocks.push({
      title,
      slug,
      file: `./registry/${category}/${slug}`,
    });

    report.push({
      title,
      category,
      slug,
      required: {
        ui: uiImports.ui,
        magicui: uiImports.magicui,
        externals: externalImports,
      },
      missing: missingUi,
      images: imageDownloads,
    });
  }

  const manifestCategoryList = [...manifestCategories.values()].sort((a, b) => a.slug.localeCompare(b.slug));
  for (const c of manifestCategoryList) {
    c.blocks.sort((a, b) => a.slug.localeCompare(b.slug));
  }

  const importLines = [];
  const categoryLines = [];

  for (const category of manifestCategoryList) {
    const blocksLines = [];
    for (const blk of category.blocks) {
      const ident = toIdentifier(`${category.slug} ${blk.slug}`);
      importLines.push(`import ${ident} from "${blk.file}";`);
      blocksLines.push(`      { title: ${JSON.stringify(blk.title)}, slug: ${JSON.stringify(blk.slug)}, Component: ${ident} },`);
    }
    categoryLines.push(
      `  {\n    slug: ${JSON.stringify(category.slug)},\n    title: ${JSON.stringify(category.title)},\n    blocks: [\n${blocksLines.join("\n")}\n    ],\n  },`,
    );
  }

  const manifestTs = `/* eslint-disable @typescript-eslint/consistent-type-imports */\nimport type { ComponentType } from \"react\";\n\n${importLines.join("\n")}\n\nexport type AuroraBlockComponent = ComponentType<any>;\n\nexport interface AuroraBlockDefinition {\n  title: string;\n  slug: string;\n  Component: AuroraBlockComponent;\n}\n\nexport interface AuroraBlockCategory {\n  slug: string;\n  title: string;\n  blocks: AuroraBlockDefinition[];\n}\n\nexport const auroraBlockCatalog: AuroraBlockCategory[] = [\n${categoryLines.join("\n")}\n];\n`;
  await fs.mkdir(path.dirname(OUT_MANIFEST), { recursive: true });
  await fs.writeFile(OUT_MANIFEST, manifestTs, "utf8");

  const reportMdLines = [];
  reportMdLines.push("# Blocks report (généré)\n");
  reportMdLines.push("Ce fichier est généré depuis `shared/blocks/**/block.tsx`.\n");
  for (const item of report) {
    reportMdLines.push(`## ${item.title}`);
    reportMdLines.push(`- Catégorie: \`${item.category}\``);
    reportMdLines.push(`- Slug: \`${item.slug}\``);
    reportMdLines.push(`- Imports UI: ${item.required.ui.length ? item.required.ui.map((n) => `\`${n}\``).join(", ") : "_aucun_"}`);
    reportMdLines.push(`- Imports magicui: ${item.required.magicui.length ? item.required.magicui.map((n) => `\`${n}\``).join(", ") : "_aucun_"}`);
    reportMdLines.push(`- Déps externes: ${item.required.externals.length ? item.required.externals.map((n) => `\`${n}\``).join(", ") : "_aucune_"}`);
    reportMdLines.push(
      `- Manquants (frontend): ${item.missing.length ? item.missing.map((n) => `\`${n}\``).join(", ") : "_aucun_"}`,
    );
    const failedImages = item.images.filter((x) => !x.ok);
    if (failedImages.length) {
      reportMdLines.push(`- Images non téléchargées: ${failedImages.map((x) => `\`${x.url}\``).join(", ")}`);
    }
    reportMdLines.push("");
  }

  await fs.writeFile(OUT_REPORT, reportMdLines.join("\n"), "utf8");

  // eslint-disable-next-line no-console
  console.log(`Published ${blocks.length} blocks to frontend/blocks + generated ${path.relative(REPO_ROOT, OUT_REPORT)}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});
