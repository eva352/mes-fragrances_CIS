from __future__ import annotations

import csv
import json
import re
from dataclasses import dataclass
from math import log
from pathlib import Path
from typing import Any, Iterable


DATA_DIR = Path(__file__).parent / "data"


_DOMAIN_CONFIG: dict[str, dict[str, Any]] = {
    "style": {
        "file": "styles.csv",
        "search_cols": ["Style Category", "Keywords", "Best For", "Type", "AI Prompt Keywords"],
    },
    "color": {
        "file": "colors.csv",
        "search_cols": ["Product Type", "Notes"],
    },
    "typography": {
        "file": "typography.csv",
        "search_cols": ["Font Pairing Name", "Category", "Mood/Style Keywords", "Best For", "Heading Font", "Body Font"],
    },
    "landing": {
        "file": "landing.csv",
        "search_cols": ["Pattern Name", "Keywords", "Conversion Optimization", "Section Order"],
    },
    "product": {
        "file": "products.csv",
        "search_cols": ["Product Type", "Keywords", "Primary Style Recommendation", "Key Considerations"],
    },
    "icons": {
        "file": "icons.csv",
        "search_cols": ["Category", "Icon Name", "Keywords", "Library", "Usage", "Best For", "Style"],
    },
    "charts": {
        "file": "charts.csv",
        "search_cols": [
            "Data Type",
            "Keywords",
            "Best Chart Type",
            "Secondary Options",
            "Color Guidance",
            "Performance Impact",
            "Accessibility Notes",
            "Library Recommendation",
            "Interactive Level",
        ],
    },
    "ux_guidelines": {
        "file": "ux-guidelines.csv",
        "search_cols": ["Category", "Issue", "Platform", "Description", "Do", "Don't", "Severity"],
    },
    "web_interface": {
        "file": "web-interface.csv",
        "search_cols": ["Category", "Issue", "Keywords", "Platform", "Description", "Do", "Don't", "Severity"],
    },
    "react_performance": {
        "file": "react-performance.csv",
        "search_cols": ["Category", "Issue", "Keywords", "Platform", "Description", "Do", "Don't", "Severity"],
    },
}


def _read_csv(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8", newline="") as f:
        return list(csv.DictReader(f))


class BM25:
    def __init__(self, k1: float = 1.5, b: float = 0.75):
        self.k1 = k1
        self.b = b
        self.corpus: list[list[str]] = []
        self.doc_lengths: list[int] = []
        self.avgdl: float = 0.0
        self.idf: dict[str, float] = {}
        self.doc_freqs: dict[str, int] = {}
        self.N: int = 0

    @staticmethod
    def tokenize(text: str) -> list[str]:
        text = re.sub(r"[^\w\s]", " ", str(text).lower())
        return [w for w in text.split() if len(w) > 2]

    def fit(self, documents: Iterable[str]) -> None:
        self.corpus = [self.tokenize(doc) for doc in documents]
        self.N = len(self.corpus)
        if self.N == 0:
            return
        self.doc_lengths = [len(doc) for doc in self.corpus]
        self.avgdl = sum(self.doc_lengths) / max(1, self.N)

        doc_freqs: dict[str, int] = {}
        for doc in self.corpus:
            seen = set()
            for word in doc:
                if word in seen:
                    continue
                doc_freqs[word] = doc_freqs.get(word, 0) + 1
                seen.add(word)
        self.doc_freqs = doc_freqs

        self.idf = {word: log((self.N - freq + 0.5) / (freq + 0.5) + 1) for word, freq in doc_freqs.items()}

    def score(self, query: str) -> list[tuple[int, float]]:
        q = self.tokenize(query)
        scores: list[tuple[int, float]] = []
        for idx, doc in enumerate(self.corpus):
            score = 0.0
            dl = self.doc_lengths[idx]
            term_freqs: dict[str, int] = {}
            for w in doc:
                term_freqs[w] = term_freqs.get(w, 0) + 1
            for token in q:
                idf = self.idf.get(token)
                if idf is None:
                    continue
                tf = term_freqs.get(token, 0)
                numerator = tf * (self.k1 + 1)
                denominator = tf + self.k1 * (1 - self.b + self.b * dl / max(1e-9, self.avgdl))
                score += idf * (numerator / max(1e-9, denominator))
            scores.append((idx, score))
        scores.sort(key=lambda x: x[1], reverse=True)
        return scores


def _clean_cell(value: str) -> str:
    raw = str(value or "")
    raw = raw.replace("\r\n", "\n").replace("\r", "\n")
    # Some rows contain accidental embedded CSV fragments; drop lines that look like "28,Something,..."
    lines = []
    for line in raw.split("\n"):
        if re.match(r"^\s*\d{1,3},", line.strip()):
            continue
        lines.append(line)
    cleaned = " ".join(" ".join(lines).split())
    return cleaned.strip()


def search(domain: str, query: str, max_results: int = 3) -> list[dict[str, str]]:
    cfg = _DOMAIN_CONFIG.get(domain)
    if not cfg:
        raise ValueError(f"Unknown domain: {domain}")
    path = DATA_DIR / str(cfg["file"])
    if not path.exists():
        return []
    rows = _read_csv(path)
    search_cols = list(cfg.get("search_cols") or [])
    documents = [" ".join(str(row.get(col, "")) for col in search_cols) for row in rows]
    bm25 = BM25()
    bm25.fit(documents)
    ranked = bm25.score(query)
    out: list[dict[str, str]] = []
    for idx, score in ranked:
        if score <= 0:
            continue
        row = rows[idx]
        out.append({k: _clean_cell(v) for k, v in row.items()})
        if len(out) >= max_results:
            break
    return out


def _load_reasoning() -> list[dict[str, str]]:
    path = DATA_DIR / "ui-reasoning.csv"
    if not path.exists():
        return []
    rows = _read_csv(path)
    return [{k: _clean_cell(v) for k, v in row.items()} for row in rows]


def _find_reasoning_rule(category: str, rules: list[dict[str, str]]) -> dict[str, str]:
    cat = (category or "").strip().lower()
    if not cat:
        return {}
    for r in rules:
        if (r.get("UI_Category") or "").strip().lower() == cat:
            return r
    for r in rules:
        ui_cat = (r.get("UI_Category") or "").strip().lower()
        if ui_cat and (ui_cat in cat or cat in ui_cat):
            return r
    return {}


def _split_priority(value: str) -> list[str]:
    raw = (value or "").strip()
    if not raw:
        return []
    return [p.strip() for p in raw.split("+") if p.strip()]


def _select_best_style(styles: list[dict[str, str]], priorities: list[str]) -> dict[str, str]:
    if not styles:
        return {}
    if not priorities:
        return styles[0]

    def score_row(row: dict[str, str]) -> int:
        s = (row.get("Style Category") or "").lower()
        kw = (row.get("Keywords") or "").lower()
        blob = (json.dumps(row, ensure_ascii=False) if row else "").lower()
        score = 0
        for p in priorities:
            pl = p.lower()
            if pl and pl in s:
                score += 10
            elif pl and pl in kw:
                score += 3
            elif pl and pl in blob:
                score += 1
        return score

    scored = sorted(((score_row(r), r) for r in styles), key=lambda x: x[0], reverse=True)
    return scored[0][1] if scored else styles[0]


def _infer_sections_from_landing(section_order: str) -> list[str]:
    text = (section_order or "").lower()
    wanted: list[str] = []

    def add(cat: str) -> None:
        if cat not in wanted:
            wanted.append(cat)

    if "hero" in text:
        add("hero")
    if "intro" in text or "hook" in text:
        add("hero")
    if "feature" in text or "value prop" in text or "value proposition" in text:
        add("features")
    if "grid" in text or "bento" in text:
        add("features")
    if "journey" in text or "track" in text or "detail" in text or "reveal" in text or "spec" in text:
        add("features")
    if "comparison" in text or "compare" in text or "table" in text:
        add("compare")
    if "pricing" in text or "plans" in text:
        add("pricing")
    if "process" in text or "how it works" in text or "steps" in text or "step" in text or "onboarding" in text:
        add("process")
    if "about" in text or "mission" in text:
        add("about")
    if "testimonial" in text or "social proof" in text or "reviews" in text or "ratings" in text:
        # Pilot doesn't have a testimonials category yet; timeline is the closest available section-like block.
        add("timeline")
    if "faq" in text:
        add("tabs")
    if "cta" in text or "call-to-action" in text:
        # Keep CTA inside available categories (hero often contains CTA).
        add("hero")

    return wanted


@dataclass(frozen=True)
class DesignSystem:
    query: str
    category: str
    pattern_name: str
    pattern_sections_text: str
    pattern_sections: list[str]
    cta_placement: str
    color_strategy: str
    conversion: str
    style_name: str
    style_keywords: str
    style_best_for: str
    style_effects: str
    style_performance: str
    style_accessibility: str
    colors: dict[str, str]
    typography: dict[str, str]
    key_effects: str
    anti_patterns: str
    severity: str
    ux_guidelines: list[dict[str, str]]
    web_interface_guidelines: list[dict[str, str]]
    react_performance_guidelines: list[dict[str, str]]
    icon_suggestions: list[dict[str, str]]
    chart_suggestions: list[dict[str, str]]

    def to_markdown(self) -> str:
        lines: list[str] = []
        lines.append("## Max UI — Design System")
        lines.append("")
        lines.append("### Pattern")
        lines.append(f"- **Name:** {self.pattern_name}")
        if self.conversion:
            lines.append(f"- **Conversion Focus:** {self.conversion}")
        if self.cta_placement:
            lines.append(f"- **CTA Placement:** {self.cta_placement}")
        if self.color_strategy:
            lines.append(f"- **Color Strategy:** {self.color_strategy}")
        if self.pattern_sections_text:
            lines.append(f"- **Sections:** {self.pattern_sections_text}")
        lines.append("")
        lines.append("### Style")
        lines.append(f"- **Name:** {self.style_name}")
        if self.style_keywords:
            lines.append(f"- **Keywords:** {self.style_keywords}")
        if self.style_best_for:
            lines.append(f"- **Best For:** {self.style_best_for}")
        if self.style_performance or self.style_accessibility:
            lines.append(f"- **Performance:** {self.style_performance} | **Accessibility:** {self.style_accessibility}")
        lines.append("")
        lines.append("### Colors")
        lines.append("| Role | Hex |")
        lines.append("|------|-----|")
        for role in ["primary", "secondary", "cta", "background", "text"]:
            lines.append(f"| {role.title()} | {self.colors.get(role, '')} |")
        if self.colors.get("notes"):
            lines.append(f"\n*Notes: {self.colors.get('notes','')}*")
        lines.append("")
        lines.append("### Typography")
        lines.append(f"- **Heading:** {self.typography.get('heading','')}")
        lines.append(f"- **Body:** {self.typography.get('body','')}")
        if self.typography.get("mood"):
            lines.append(f"- **Mood:** {self.typography.get('mood','')}")
        if self.typography.get("google_fonts_url"):
            lines.append(f"- **Google Fonts:** {self.typography.get('google_fonts_url','')}")
        lines.append("")
        if self.key_effects:
            lines.append("### Key Effects")
            lines.append(self.key_effects)
            lines.append("")
        if self.anti_patterns:
            lines.append("### Avoid (Anti-patterns)")
            lines.append(self.anti_patterns)
            lines.append("")

        if self.ux_guidelines:
            lines.append("### UX Guidelines (Max UI)")
            for g in self.ux_guidelines[:5]:
                sev = (g.get("Severity") or "").strip()
                cat = (g.get("Category") or "").strip()
                issue = (g.get("Issue") or "").strip()
                do = (g.get("Do") or "").strip()
                dont = (g.get("Don't") or "").strip()
                head = " — ".join([p for p in [sev, cat, issue] if p])
                detail = "; ".join([p for p in [do and f"Do: {do}", dont and f"Avoid: {dont}"] if p])
                lines.append(f"- {head}{(': ' + detail) if detail else ''}")
            lines.append("")

        if self.web_interface_guidelines:
            lines.append("### Web Interface Checklist (Max UI)")
            for g in self.web_interface_guidelines[:5]:
                sev = (g.get("Severity") or "").strip()
                cat = (g.get("Category") or "").strip()
                issue = (g.get("Issue") or "").strip()
                do = (g.get("Do") or "").strip()
                head = " — ".join([p for p in [sev, cat, issue] if p])
                lines.append(f"- {head}{(': ' + do) if do else ''}")
            lines.append("")

        if self.react_performance_guidelines:
            lines.append("### React/Next Performance (Max UI)")
            for g in self.react_performance_guidelines[:5]:
                sev = (g.get("Severity") or "").strip()
                cat = (g.get("Category") or "").strip()
                issue = (g.get("Issue") or "").strip()
                do = (g.get("Do") or "").strip()
                head = " — ".join([p for p in [sev, cat, issue] if p])
                lines.append(f"- {head}{(': ' + do) if do else ''}")
            lines.append("")

        if self.icon_suggestions:
            lines.append("### Icon Suggestions (Max UI)")
            # Keep this compact: name + usage + library.
            for row in self.icon_suggestions[:8]:
                name = (row.get("Icon Name") or "").strip()
                usage = (row.get("Usage") or "").strip()
                lib = (row.get("Library") or "").strip()
                if not name:
                    continue
                tail = " — ".join([p for p in [usage, lib] if p])
                lines.append(f"- `{name}`{(': ' + tail) if tail else ''}")
            lines.append("")

        if self.chart_suggestions:
            lines.append("### Chart Guidance (Max UI)")
            for row in self.chart_suggestions[:3]:
                data_type = (row.get("Data Type") or "").strip()
                best = (row.get("Best Chart Type") or "").strip()
                lib = (row.get("Library Recommendation") or "").strip()
                head = " — ".join([p for p in [data_type, best] if p])
                lines.append(f"- {head}{(': ' + lib) if lib else ''}")
            lines.append("")
        return "\n".join(lines).strip() + "\n"


def generate_design_system(query: str, *, mode: str = "website") -> DesignSystem:
    q = (query or "").strip()
    if not q:
        q = "website"

    product = search("product", q, 1)
    category = (product[0].get("Product Type") if product else "") or "General"

    rules = _load_reasoning()
    rule = _find_reasoning_rule(category, rules) if rules else {}

    style_priorities = _split_priority(rule.get("Style_Priority") or "")
    recommended_pattern = (rule.get("Recommended_Pattern") or "").strip()
    anti_patterns = (rule.get("Anti_Patterns") or "").strip()
    key_effects = (rule.get("Key_Effects") or "").strip()
    severity = (rule.get("Severity") or "").strip() or "MEDIUM"

    style_query = q
    if style_priorities:
        style_query = f"{q} {' '.join(style_priorities[:2])}".strip()

    styles = search("style", style_query, 3)
    best_style = _select_best_style(styles, style_priorities)

    colors = search("color", q, 2)
    best_color = colors[0] if colors else {}

    typography = search("typography", q, 2)
    best_typography = typography[0] if typography else {}

    landing = search("landing", q, 2) if mode == "website" else []
    best_landing = landing[0] if landing else {}

    pattern_name = (best_landing.get("Pattern Name") or recommended_pattern or "Hero + Features + CTA").strip()
    section_order = (best_landing.get("Section Order") or "").strip()
    cta_placement = (best_landing.get("Primary CTA Placement") or "").strip()
    color_strategy = (best_landing.get("Color Strategy") or "").strip()
    conversion = (best_landing.get("Conversion Optimization") or "").strip()

    style_effects = (best_style.get("Effects & Animation") or "").strip()
    combined_effects = style_effects or key_effects

    pattern_sections = _infer_sections_from_landing(section_order) if section_order else []
    if not pattern_sections:
        pattern_sections = ["hero", "features", "pricing"]
    elif pattern_sections == ["hero"]:
        pattern_sections = ["hero", "features", "pricing"]
    elif len(pattern_sections) < 3 and "pricing" not in pattern_sections:
        pattern_sections = [*pattern_sections, "pricing"]

    guidelines_query = " ".join(p for p in [q, category, pattern_name] if p).strip()
    ux_guidelines = search("ux_guidelines", guidelines_query, 5)
    web_interface_guidelines = search("web_interface", guidelines_query, 5)
    react_performance_guidelines = search("react_performance", guidelines_query, 5)
    icon_suggestions = search("icons", guidelines_query, 8)
    chart_suggestions = search("charts", guidelines_query, 3)

    return DesignSystem(
        query=q,
        category=category,
        pattern_name=pattern_name,
        pattern_sections_text=section_order or "Hero > Features > CTA",
        pattern_sections=pattern_sections,
        cta_placement=cta_placement,
        color_strategy=color_strategy,
        conversion=conversion,
        style_name=(best_style.get("Style Category") or "Minimalism").strip(),
        style_keywords=(best_style.get("Keywords") or "").strip(),
        style_best_for=(best_style.get("Best For") or "").strip(),
        style_effects=style_effects,
        style_performance=(best_style.get("Performance") or "").strip(),
        style_accessibility=(best_style.get("Accessibility") or "").strip(),
        colors={
            "primary": (best_color.get("Primary (Hex)") or "#2563EB").strip(),
            "secondary": (best_color.get("Secondary (Hex)") or "#3B82F6").strip(),
            "cta": (best_color.get("CTA (Hex)") or "#F97316").strip(),
            "background": (best_color.get("Background (Hex)") or "#F8FAFC").strip(),
            "text": (best_color.get("Text (Hex)") or "#1E293B").strip(),
            "notes": (best_color.get("Notes") or "").strip(),
        },
        typography={
            "heading": (best_typography.get("Heading Font") or "Inter").strip(),
            "body": (best_typography.get("Body Font") or "Inter").strip(),
            "mood": (best_typography.get("Mood/Style Keywords") or "").strip(),
            "google_fonts_url": (best_typography.get("Google Fonts URL") or "").strip(),
            "css_import": (best_typography.get("CSS Import") or "").strip(),
        },
        key_effects=combined_effects,
        anti_patterns=anti_patterns,
        severity=severity,
        ux_guidelines=ux_guidelines,
        web_interface_guidelines=web_interface_guidelines,
        react_performance_guidelines=react_performance_guidelines,
        icon_suggestions=icon_suggestions,
        chart_suggestions=chart_suggestions,
    )
