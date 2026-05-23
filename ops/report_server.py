#!/usr/bin/env python3
from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import shutil
import smtplib
import socket
import ssl
import subprocess
import sys
from dataclasses import dataclass
from email.message import EmailMessage
from pathlib import Path
from typing import Any
from urllib.error import URLError
from urllib.request import Request, urlopen


REPO_ROOT = Path("/home/eva/mes-fragrances_CIS")
DEFAULT_CONFIG = Path("/home/eva/.config/mes-fragrances-monitor/monitor.env")
DEFAULT_STATE = Path("/home/eva/.local/state/mes-fragrances-monitor/state.json")


@dataclass
class CheckResult:
    name: str
    ok: bool
    detail: str


def load_env_file(path: Path) -> dict[str, str]:
    data: dict[str, str] = {}
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        data[key.strip()] = value.strip()
    return data


def run(cmd: list[str], cwd: Path | None = None) -> tuple[int, str, str]:
    proc = subprocess.run(
        cmd,
        cwd=str(cwd) if cwd else None,
        capture_output=True,
        text=True,
        check=False,
    )
    return proc.returncode, proc.stdout.strip(), proc.stderr.strip()


def parse_meminfo() -> dict[str, int]:
    info: dict[str, int] = {}
    for line in Path("/proc/meminfo").read_text(encoding="utf-8").splitlines():
        key, value = line.split(":", 1)
        info[key] = int(value.strip().split()[0]) * 1024
    return info


def human_bytes(value: int) -> str:
    units = ["B", "KiB", "MiB", "GiB", "TiB"]
    size = float(value)
    for unit in units:
        if size < 1024 or unit == units[-1]:
            return f"{size:.1f}{unit}"
        size /= 1024
    return f"{value}B"


def http_check(name: str, url: str, timeout: int = 8) -> CheckResult:
    req = Request(url, headers={"User-Agent": "mes-fragrances-monitor/1.0"})
    try:
        with urlopen(req, timeout=timeout) as response:
            status = getattr(response, "status", 200)
        ok = 200 <= status < 400
        return CheckResult(name, ok, f"{status} {url}")
    except URLError as exc:
        return CheckResult(name, False, f"{url} -> {exc}")
    except Exception as exc:  # pragma: no cover - defensive
        return CheckResult(name, False, f"{url} -> {exc}")


def cert_days_left(hostname: str, port: int = 443) -> tuple[bool, str, int | None]:
    ctx = ssl.create_default_context()
    try:
        with socket.create_connection((hostname, port), timeout=8) as sock:
            with ctx.wrap_socket(sock, server_hostname=hostname) as tls_sock:
                cert = tls_sock.getpeercert()
        not_after = cert["notAfter"]
        expires_at = dt.datetime.strptime(not_after, "%b %d %H:%M:%S %Y %Z").replace(tzinfo=dt.UTC)
        days = int((expires_at - dt.datetime.now(dt.UTC)).total_seconds() // 86400)
        ok = days >= 15
        return ok, expires_at.isoformat(), days
    except Exception as exc:
        return False, str(exc), None


def docker_compose_services(repo_root: Path) -> tuple[list[dict[str, Any]], str]:
    code, out, err = run(["docker", "compose", "--env-file", ".env.local", "ps", "--format", "json"], cwd=repo_root)
    if code == 0 and out:
        try:
            return json.loads(out), ""
        except json.JSONDecodeError:
            pass

    code, out, err = run(["docker", "compose", "--env-file", ".env.local", "ps"], cwd=repo_root)
    services: list[dict[str, Any]] = []
    if code != 0:
        return services, err or out
    for line in out.splitlines()[1:]:
        if not line.strip():
            continue
        services.append({"raw": line})
    return services, ""


def compose_health_checks(repo_root: Path) -> list[CheckResult]:
    services, error = docker_compose_services(repo_root)
    if error:
        return [CheckResult("docker-compose", False, error)]
    results: list[CheckResult] = []
    for service in services:
        name = service.get("Service") or service.get("Name") or service.get("raw", "service")
        state = service.get("State") or service.get("Status") or service.get("raw", "")
        health = service.get("Health")
        detail = f"state={state}"
        if health:
            detail = f"{detail}, health={health}"
        raw = service.get("raw")
        if raw:
            detail = raw
        ok = "healthy" in detail.lower() or ("Up" in detail and "unhealthy" not in detail.lower())
        results.append(CheckResult(f"docker:{name}", ok, detail))
    return results


def build_report(config: dict[str, str]) -> tuple[str, str, bool, str]:
    now = dt.datetime.now(dt.UTC)
    hostname = socket.gethostname()
    mem = parse_meminfo()
    disk = shutil.disk_usage("/")
    load1, load5, load15 = os.getloadavg()

    checks: list[CheckResult] = []
    checks.extend(compose_health_checks(REPO_ROOT))
    checks.append(http_check("site-public", config["SITE_URL"]))
    checks.append(http_check("site-admin-login", config["ADMIN_LOGIN_URL"]))
    checks.append(http_check("api-health", config["API_HEALTH_URL"]))

    cert_ok, cert_detail, cert_days = cert_days_left(config["TLS_HOSTNAME"])
    checks.append(CheckResult("tls-cert", cert_ok, f"{config['TLS_HOSTNAME']} expires={cert_detail} days_left={cert_days}"))

    issues: list[str] = []
    if disk.used / disk.total >= float(config.get("DISK_WARN_THRESHOLD", "0.85")):
        issues.append(f"disk usage high: {disk.used / disk.total:.1%}")
    if mem.get("MemAvailable", 0) / max(mem.get("MemTotal", 1), 1) <= float(config.get("MEM_AVAILABLE_MIN_RATIO", "0.10")):
        issues.append("available memory below threshold")
    if mem.get("SwapTotal", 0) and mem.get("SwapFree", 0) / mem.get("SwapTotal", 1) <= float(config.get("SWAP_FREE_MIN_RATIO", "0.10")):
        issues.append("swap almost exhausted")
    for check in checks:
        if not check.ok:
            issues.append(f"{check.name}: {check.detail}")

    alert = bool(issues)
    status_word = "ALERTE" if alert else "OK"
    subject = f"{config['SUBJECT_PREFIX']} {status_word}"

    body_lines = [
        f"Horodatage UTC: {now.isoformat()}",
        f"Hote: {hostname}",
        "",
        f"Charge systeme: {load1:.2f} / {load5:.2f} / {load15:.2f}",
        f"Disque /: {human_bytes(disk.used)} utilises / {human_bytes(disk.total)} ({disk.used / disk.total:.1%})",
        f"Memoire: {human_bytes(mem.get('MemAvailable', 0))} dispo / {human_bytes(mem.get('MemTotal', 0))}",
        f"Swap: {human_bytes(mem.get('SwapFree', 0))} libre / {human_bytes(mem.get('SwapTotal', 0))}",
        "",
        "Checks:",
    ]
    for check in checks:
        body_lines.append(f"- [{'OK' if check.ok else 'KO'}] {check.name}: {check.detail}")
    body_lines.append("")
    if issues:
        body_lines.append("Problemes detectes:")
        for issue in issues:
            body_lines.append(f"- {issue}")
    else:
        body_lines.append("Aucun probleme detecte.")

    signature = "|".join(sorted(issues)) if issues else "ok"
    return subject, "\n".join(body_lines), alert, signature


def load_state(path: Path) -> dict[str, Any]:
    if not path.exists():
        return {}
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}


def save_state(path: Path, state: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(state, indent=2) + "\n", encoding="utf-8")


def should_send(config: dict[str, str], state: dict[str, Any], now: dt.datetime, alert: bool, signature: str, force_send: bool) -> bool:
    if force_send:
        return True

    daily_interval_hours = int(config.get("DAILY_REPORT_INTERVAL_HOURS", "24"))
    repeat_alert_hours = int(config.get("REPEAT_ALERT_INTERVAL_HOURS", "6"))

    last_ok = state.get("last_ok_sent_at")
    last_alert = state.get("last_alert_sent_at")
    last_signature = state.get("last_alert_signature")

    if alert:
        if signature != last_signature:
            return True
        if not last_alert:
            return True
        elapsed = (now - dt.datetime.fromisoformat(last_alert)).total_seconds() / 3600
        return elapsed >= repeat_alert_hours

    if not last_ok:
        return True
    elapsed = (now - dt.datetime.fromisoformat(last_ok)).total_seconds() / 3600
    return elapsed >= daily_interval_hours


def send_email(config: dict[str, str], subject: str, body: str) -> None:
    msg = EmailMessage()
    msg["From"] = config.get("SMTP_FROM", config["SMTP_USERNAME"])
    msg["To"] = ", ".join(addr.strip() for addr in config["SMTP_TO"].split(",") if addr.strip())
    msg["Subject"] = subject
    msg.set_content(body)

    host = config.get("SMTP_HOST", "smtp.gmail.com")
    port = int(config.get("SMTP_PORT", "465"))
    username = config["SMTP_USERNAME"]
    password = config["SMTP_PASSWORD"]

    if config.get("SMTP_SSL", "true").lower() == "true":
        with smtplib.SMTP_SSL(host, port, timeout=20) as smtp:
            smtp.login(username, password)
            smtp.send_message(msg)
        return

    with smtplib.SMTP(host, port, timeout=20) as smtp:
        smtp.starttls(context=ssl.create_default_context())
        smtp.login(username, password)
        smtp.send_message(msg)


def main() -> int:
    parser = argparse.ArgumentParser(description="Mes Fragrances server supervision report")
    parser.add_argument("--config", type=Path, default=DEFAULT_CONFIG)
    parser.add_argument("--state-file", type=Path, default=DEFAULT_STATE)
    parser.add_argument("--force-send", action="store_true")
    args = parser.parse_args()

    if not args.config.exists():
        print(f"Missing config file: {args.config}", file=sys.stderr)
        return 2

    config = load_env_file(args.config)
    required = ["SMTP_USERNAME", "SMTP_PASSWORD", "SMTP_TO", "SUBJECT_PREFIX", "SITE_URL", "ADMIN_LOGIN_URL", "API_HEALTH_URL", "TLS_HOSTNAME"]
    missing = [key for key in required if not config.get(key)]
    if missing:
        print(f"Missing config keys: {', '.join(missing)}", file=sys.stderr)
        return 2

    subject, body, alert, signature = build_report(config)
    now = dt.datetime.now(dt.UTC)
    state = load_state(args.state_file)
    if not should_send(config, state, now, alert, signature, args.force_send):
        return 0

    send_email(config, subject, body)

    if alert:
        state["last_alert_sent_at"] = now.isoformat()
        state["last_alert_signature"] = signature
    else:
        state["last_ok_sent_at"] = now.isoformat()
        state["last_alert_signature"] = ""
    state["last_subject"] = subject
    save_state(args.state_file, state)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
