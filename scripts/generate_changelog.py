#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
import subprocess
import sys
from dataclasses import dataclass


@dataclass(frozen=True)
class Commit:
    subject: str


TYPE_RE = re.compile(r"^(?P<type>[a-zA-Z]+)(?:\([^)]+\))?(?P<bang>!)?:\s*(?P<msg>.+)$")


def _run_git(args: list[str]) -> str:
    res = subprocess.run(["git", *args], capture_output=True, text=True)
    if res.returncode != 0:
        raise RuntimeError(res.stderr.strip() or f"git {' '.join(args)} failed")
    return res.stdout.strip()


def _latest_tag() -> str | None:
    try:
        tag = _run_git(["describe", "--tags", "--abbrev=0"])
        return tag or None
    except Exception:
        return None


def _commit_subjects(range_spec: str | None) -> list[Commit]:
    cmd = ["log", "--no-merges", "--pretty=format:%s"]
    if range_spec:
        cmd.insert(1, range_spec)
    out = _run_git(cmd)
    subjects = [line.strip() for line in out.splitlines() if line.strip()]
    commits = []
    for s in subjects:
        if s.lower().startswith("merge "):
            continue
        commits.append(Commit(subject=s))
    return commits


def _categorize(commits: list[Commit]) -> dict[str, list[str]]:
    buckets: dict[str, list[str]] = {
        "Nouveautés": [],
        "Améliorations": [],
        "Corrections": [],
        "Documentation": [],
        "Maintenance": [],
        "Autres": [],
    }

    for c in commits:
        subject = c.subject.strip()
        m = TYPE_RE.match(subject)
        if m:
            type_ = m.group("type").lower()
            msg = m.group("msg").strip()
        else:
            type_ = ""
            msg = subject

        if type_ == "feat":
            buckets["Nouveautés"].append(msg)
        elif type_ in {"perf", "improve"}:
            buckets["Améliorations"].append(msg)
        elif type_ == "fix":
            buckets["Corrections"].append(msg)
        elif type_ == "docs":
            buckets["Documentation"].append(msg)
        elif type_ in {"chore", "refactor", "build", "ci", "test"}:
            buckets["Maintenance"].append(msg)
        else:
            buckets["Autres"].append(msg)

    return {k: v for k, v in buckets.items() if v}


def _render_markdown(groups: dict[str, list[str]], tag_hint: str | None) -> str:
    lines: list[str] = []
    if tag_hint:
        lines.append(f"> Généré à partir des commits depuis `{tag_hint}`.\n")
    for title, items in groups.items():
        lines.append(f"### {title}")
        for it in items:
            lines.append(f"- {it}")
        lines.append("")
    return "\n".join(lines).rstrip() + "\n"


def _inject_between_markers(changelog_text: str, injected: str) -> str:
    begin = "<!-- BEGIN:AUTOGEN -->"
    end = "<!-- END:AUTOGEN -->"
    if begin not in changelog_text or end not in changelog_text:
        raise RuntimeError("Markers not found in CHANGELOG.md (BEGIN:AUTOGEN / END:AUTOGEN).")
    pre, rest = changelog_text.split(begin, 1)
    _, post = rest.split(end, 1)
    return f"{pre}{begin}\n{injected}{end}{post}"


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate/update CHANGELOG.md from git commits.")
    parser.add_argument("--since-tag", action="store_true", help="Use commits since the latest git tag (default).")
    parser.add_argument("--range", dest="range_spec", default=None, help="Git range (e.g. v0.1.0..HEAD).")
    parser.add_argument("--write", action="store_true", help="Update CHANGELOG.md in place (between AUTOGEN markers).")
    args = parser.parse_args()

    tag = _latest_tag()

    range_spec = args.range_spec
    tag_hint = None
    if range_spec:
        tag_hint = range_spec
    else:
        # Default: commits since latest tag (if any), else all commits.
        if tag:
            range_spec = f"{tag}..HEAD"
            tag_hint = tag
        else:
            range_spec = None
            tag_hint = None

    commits = _commit_subjects(range_spec)
    groups = _categorize(commits)
    injected = _render_markdown(groups, tag_hint)

    if args.write:
        path = "CHANGELOG.md"
        try:
            with open(path, "r", encoding="utf-8") as f:
                current = f.read()
            updated = _inject_between_markers(current, injected)
            with open(path, "w", encoding="utf-8") as f:
                f.write(updated)
        except FileNotFoundError as exc:
            raise RuntimeError("CHANGELOG.md not found (run from repo root).") from exc
    else:
        sys.stdout.write(injected)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

