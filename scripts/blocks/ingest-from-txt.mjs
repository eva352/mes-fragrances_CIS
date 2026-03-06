import fs from "node:fs/promises";
import path from "node:path";

const REPO_ROOT = process.cwd();
const DEFAULT_SOURCE = path.join(REPO_ROOT, "shared/blocks/shadcn blocks.txt");
const DEFAULT_OUT_ROOT = path.join(REPO_ROOT, "shared/blocks");

function normalizeNewlines(input) {
  return input.replaceAll("\r\n", "\n").replaceAll("\r", "\n");
}

function isHeaderLine(line) {
  const trimmed = line.trim();
  return /^[A-Za-z][A-Za-z\s]*\s+\d+\s*$/.test(trimmed);
}

function parseHeader(line) {
  const trimmed = line.trim();
  const match = trimmed.match(/^([A-Za-z][A-Za-z\s]*?)\s+(\d+)\s*$/);
  if (!match) return null;
  const categoryRaw = match[1].trim();
  const number = match[2];
  const category = categoryRaw.toLowerCase().replace(/\s+/g, "-");
  const slug = `${category}-${number}`;
  return { title: trimmed, category, slug, number };
}

function findCodeStartIndex(lines) {
  for (let i = 0; i < lines.length; i += 1) {
    const t = lines[i].trim();
    if (!t) continue;
    if (t === '"use client";' || t === "'use client';") return i;
    if (t.startsWith("import ")) return i;
  }
  return -1;
}

function extractInstallLines(lines) {
  return lines
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => /^(npx|npm|pnpm|yarn)\b/.test(l));
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function main() {
  const sourcePath = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_SOURCE;
  const outRoot = process.argv[3] ? path.resolve(process.argv[3]) : DEFAULT_OUT_ROOT;

  const raw = await fs.readFile(sourcePath, "utf8");
  const text = normalizeNewlines(raw);
  const allLines = text.split("\n");

  const headerIndices = [];
  for (let i = 0; i < allLines.length; i += 1) {
    if (isHeaderLine(allLines[i])) headerIndices.push(i);
  }

  if (headerIndices.length === 0) {
    throw new Error(`No blocks detected in ${sourcePath}`);
  }

  for (let b = 0; b < headerIndices.length; b += 1) {
    const start = headerIndices[b];
    const end = b + 1 < headerIndices.length ? headerIndices[b + 1] : allLines.length;
    const header = parseHeader(allLines[start]);
    if (!header) continue;

    const sectionLines = allLines.slice(start + 1, end);
    const codeStart = findCodeStartIndex(sectionLines);
    const installLines = extractInstallLines(codeStart === -1 ? sectionLines : sectionLines.slice(0, codeStart));
    const codeLines =
      codeStart === -1
        ? []
        : sectionLines
            .slice(codeStart)
            .join("\n")
            .trim()
            .split("\n");

    const blockDir = path.join(outRoot, header.category, header.slug);
    await ensureDir(blockDir);

    const meta = {
      title: header.title,
      category: header.category,
      slug: header.slug,
      source: {
        file: path.relative(REPO_ROOT, sourcePath),
      },
      install: installLines,
    };

    await fs.writeFile(path.join(blockDir, "meta.json"), JSON.stringify(meta, null, 2) + "\n", "utf8");
    await fs.writeFile(path.join(blockDir, "install.txt"), installLines.join("\n") + "\n", "utf8");
    await fs.writeFile(path.join(blockDir, "block.tsx"), codeLines.join("\n") + "\n", "utf8");
  }

  // eslint-disable-next-line no-console
  console.log(`Ingested ${headerIndices.length} blocks into ${path.relative(REPO_ROOT, outRoot)}/<category>/<slug>/`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exitCode = 1;
});

