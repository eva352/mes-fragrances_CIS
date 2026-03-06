import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

const sourcePath = path.join(rootDir, "themes", "aurora-themes.source.txt");
const globalsPath = path.join(rootDir, "app", "globals.css");
const outCssPath = path.join(rootDir, "app", "aurora-themes.css");
const outTsPath = path.join(rootDir, "lib", "aurora-theme", "themes.ts");

function normalize(text) {
  return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function slugify(name) {
  return normalize(name)
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
}

function extractBlock(text, selectorRe) {
  const match = selectorRe.exec(text);
  if (!match) return null;
  return match[1] ?? null;
}

function extractVarsInOrder(blockText) {
  if (!blockText) return [];

  const vars = [];
  const seen = new Set();
  const re = /--([a-zA-Z0-9-_]+)\s*:\s*([^;]+);/g;
  let m;
  // eslint-disable-next-line no-cond-assign
  while ((m = re.exec(blockText)) !== null) {
    const key = m[1];
    const value = (m[2] ?? "").trim();
    if (!key || seen.has(key)) continue;
    vars.push({ key, value });
    seen.add(key);
  }
  return vars;
}

function ensureDerivedVars(vars) {
  const byKey = new Map(vars.map((v) => [v.key, v.value]));

  const sidebar = byKey.get("sidebar");
  const sidebarBg = byKey.get("sidebar-background");
  if (sidebar && !sidebarBg) {
    vars.push({ key: "sidebar-background", value: sidebar });
  }
  if (!sidebar && sidebarBg) {
    vars.push({ key: "sidebar", value: sidebarBg });
  }

  return vars;
}

function varsToCss(vars, indent = "  ") {
  return vars
    .map((v) => `${indent}--${v.key}: ${v.value};`)
    .join("\n");
}

function parseThemeSections(sourceText) {
  const lines = normalize(sourceText).split("\n");
  const headerRe = /^\s*theme\s*:\s*(.+?)\s*$/i;

  const sections = [];
  let current = null;

  for (const line of lines) {
    const header = headerRe.exec(line);
    if (header) {
      if (current) sections.push(current);
      current = { label: header[1].trim(), content: "" };
      continue;
    }
    if (current) current.content += line + "\n";
  }
  if (current) sections.push(current);

  return sections;
}

function pickSwatches(vars) {
  const byKey = new Map(vars.map((v) => [v.key, v.value]));
  const hsl = (v) => (v ? `hsl(${v})` : "hsl(0 0% 0%)");

  return {
    background: hsl(byKey.get("background")),
    primary: hsl(byKey.get("primary")),
    secondary: hsl(byKey.get("secondary")),
    accent: hsl(byKey.get("accent")),
  };
}

function parseGlobalsDefaultSwatches() {
  if (!fs.existsSync(globalsPath)) return null;
  const globalsText = normalize(fs.readFileSync(globalsPath, "utf8"));
  const rootBlock = extractBlock(globalsText, /:root\s*{([\s\S]*?)}/m);
  if (!rootBlock) return null;
  const rootVars = ensureDerivedVars(extractVarsInOrder(rootBlock));
  return pickSwatches(rootVars);
}

function parseGlobalsDefaultVars() {
  if (!fs.existsSync(globalsPath)) return { rootVars: null, darkVars: null };
  const globalsText = normalize(fs.readFileSync(globalsPath, "utf8"));
  const rootBlock = extractBlock(globalsText, /:root\s*{([\s\S]*?)}/m);
  const darkBlock = extractBlock(globalsText, /\.dark\s*{([\s\S]*?)}/m);

  const rootVars = ensureDerivedVars(extractVarsInOrder(rootBlock));
  const darkVars = ensureDerivedVars(extractVarsInOrder(darkBlock));

  return {
    rootVars: rootVars.length ? rootVars : null,
    darkVars: darkVars.length ? darkVars : null,
  };
}

function main() {
  if (!fs.existsSync(sourcePath)) {
    console.error(`Missing theme source: ${sourcePath}`);
    process.exit(1);
  }

  const sourceText = fs.readFileSync(sourcePath, "utf8");
  const sections = parseThemeSections(sourceText);

  const themes = [];
  const cssChunks = [];

  const { rootVars: defaultRootVars, darkVars: defaultDarkVars } = parseGlobalsDefaultVars();
  if (defaultRootVars?.length) {
    const id = "northern-light";
    cssChunks.push(
      `  :root[data-aurora-theme="${id}"] {\n${varsToCss(
        defaultRootVars,
        "    ",
      )}\n  }\n`,
    );
    if (defaultDarkVars?.length) {
      cssChunks.push(
        `  :root.dark[data-aurora-theme="${id}"] {\n${varsToCss(
          defaultDarkVars,
          "    ",
        )}\n  }\n`,
      );
    }
  }

  for (const section of sections) {
    const id = slugify(section.label);
    if (!id) continue;

    const rootBlock = extractBlock(section.content, /:root\s*{([\s\S]*?)}/m);
    const darkBlock = extractBlock(section.content, /\.dark\s*{([\s\S]*?)}/m);

    const rootVars = ensureDerivedVars(extractVarsInOrder(rootBlock));
    const darkVars = ensureDerivedVars(extractVarsInOrder(darkBlock));

    if (rootVars.length === 0) continue;

    themes.push({
      id,
      label: section.label,
      swatches: pickSwatches(rootVars),
      hasDark: darkVars.length > 0,
    });

    cssChunks.push(
      `  :root[data-aurora-theme="${id}"] {\n${varsToCss(
        rootVars,
        "    ",
      )}\n  }\n`,
    );
    if (darkVars.length > 0) {
      cssChunks.push(
        `  :root.dark[data-aurora-theme="${id}"] {\n${varsToCss(
          darkVars,
          "    ",
        )}\n  }\n`,
      );
    }
  }

  const defaultSwatches =
    parseGlobalsDefaultSwatches() ?? pickSwatches([{ key: "background", value: "0 0% 100%" }]);

  const ts = `/* eslint-disable */
// This file is generated by frontend/scripts/gen-aurora-themes.mjs. Do not edit by hand.

export type AuroraTheme = {
  id: string;
  label: string;
  swatches: {
    background: string;
    primary: string;
    secondary: string;
    accent: string;
  };
  hasDark: boolean;
};

export const DEFAULT_AURORA_THEME_ID = "northern-light";
export const AURORA_THEME_STORAGE_KEY = "aurora-theme";

export const AURORA_THEMES: AuroraTheme[] = [
  {
    id: DEFAULT_AURORA_THEME_ID,
    label: "Northern Light",
    swatches: ${JSON.stringify(defaultSwatches, null, 2)},
    hasDark: true,
  },
${themes
  .map((t) => `  ${JSON.stringify(t, null, 2)},`)
  .join("\n")}
];
`;

  const css = `/* This file is generated by frontend/scripts/gen-aurora-themes.mjs. Do not edit by hand. */
${cssChunks.join("\n")}
`;

  fs.mkdirSync(path.dirname(outTsPath), { recursive: true });
  fs.writeFileSync(outTsPath, ts, "utf8");

  fs.mkdirSync(path.dirname(outCssPath), { recursive: true });
  fs.writeFileSync(outCssPath, css, "utf8");
}

main();
