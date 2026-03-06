import fs from "node:fs/promises";
import path from "node:path";

const REPO_ROOT = process.cwd();
const IN_DIR = path.join(REPO_ROOT, "shared/specs");
const OUT_DIR = path.join(REPO_ROOT, "frontend/public/specs");

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function writeJson(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const uiManifestPath = path.join(IN_DIR, "ui-manifest.json");
  const themePath = path.join(IN_DIR, "theme.json");
  const schemaDir = path.join(IN_DIR, "schema");

  if (!(await fileExists(uiManifestPath))) {
    throw new Error("Missing shared/specs/ui-manifest.json");
  }
  if (!(await fileExists(themePath))) {
    throw new Error("Missing shared/specs/theme.json");
  }

  await fs.mkdir(OUT_DIR, { recursive: true });

  await writeJson(path.join(OUT_DIR, "ui-manifest.json"), await readJson(uiManifestPath));
  await writeJson(path.join(OUT_DIR, "theme.json"), await readJson(themePath));

  if (await fileExists(schemaDir)) {
    const files = await fs.readdir(schemaDir, { withFileTypes: true });
    for (const dirent of files) {
      if (!dirent.isFile()) continue;
      if (!dirent.name.endsWith(".json")) continue;
      const inPath = path.join(schemaDir, dirent.name);
      const outPath = path.join(OUT_DIR, "schema", dirent.name);
      await writeJson(outPath, await readJson(inPath));
    }
  }

  // Keep examples near the export pack; useful for debugging and onboarding.
  const examples = ["site-spec.example.json", "app-spec.example.json"];
  for (const name of examples) {
    const inPath = path.join(IN_DIR, name);
    if (!(await fileExists(inPath))) continue;
    await writeJson(path.join(OUT_DIR, name), await readJson(inPath));
  }

  // eslint-disable-next-line no-console
  console.log(`Published specs to ${path.relative(REPO_ROOT, OUT_DIR)}`);
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

