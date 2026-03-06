from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated
import uuid
import json

from app.api.deps import get_current_user
from app.models.user import User
from app.schemas.app_spec import AppSpec, AppSpecRead, AppSpecUpsert, AppShellNavItem
from app.core.llm_specs import ensure_llm_specs_dir

router = APIRouter()
CurrentUser = Annotated[User, Depends(get_current_user)]


RESERVED_DYNAMIC_PATHS = {
    "/login",
    "/builder",
    "/builder/app",
    "/builder/landing",
    "/ui",
    "/ui/components",
    "/site",
    "/site/showroom",
    "/api",
    "/settings",
    "/aide",
    "/support",
    "/documentation",
    "/profil",
}

FIXED_PATHS = {"/", "/settings", "/aide"}


def normalize_legacy_app_path(path: str) -> str:
    if path == "/app/dashboard":
        return "/"
    if path.startswith("/app/"):
        return "/" + path[len("/app/") :]
    return path


def slugify_title(title: str) -> str:
    import re
    import unicodedata

    text = unicodedata.normalize("NFKD", (title or "").strip().lower())
    text = "".join(ch for ch in text if not unicodedata.combining(ch))
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    base = text or "page"

    if base in {"settings", "aide", "support", "documentation", "profil", "login", "builder", "ui", "site", "api"}:
        return f"{base}-page"

    return base


def uniquify_path(base_path: str, used: set[str]) -> str:
    if base_path not in used:
        return base_path

    suffix = 2
    while True:
        candidate = f"{base_path}-{suffix}"
        if candidate not in used:
            return candidate
        suffix += 1


def normalize_app_spec(spec: AppSpec) -> tuple[AppSpec, bool]:
    changed = False

    # Normalize page paths (legacy /app/* -> /*)
    used_paths: set[str] = set()
    for page in spec.pages:
        normalized = normalize_legacy_app_path(page.path)
        if normalized != page.path:
            page.path = normalized
            changed = True

    # Ensure unique + valid paths for non-fixed pages
    for page in spec.pages:
        if page.path in FIXED_PATHS:
            used_paths.add(page.path)

    for page in spec.pages:
        if page.path in FIXED_PATHS:
            continue

        desired = page.path or ""
        if not desired.startswith("/") or desired == "/" or desired in RESERVED_DYNAMIC_PATHS or desired in used_paths:
            desired = "/" + slugify_title(page.title)

        # Avoid reserved + fixed conflicts
        while desired in RESERVED_DYNAMIC_PATHS or desired in FIXED_PATHS:
            desired = desired + "-page"

        unique = uniquify_path(desired, used_paths | RESERVED_DYNAMIC_PATHS | FIXED_PATHS)
        if unique != page.path:
            page.path = unique
            changed = True
        used_paths.add(page.path)

    # Normalize navigation (keep order, but sync titles/paths, remove fixed pages)
    page_by_path = {p.path: p for p in spec.pages}
    seen: set[str] = set()
    normalized_nav: list[AppShellNavItem] = []

    for item in spec.shell.navigation:
        normalized_path = normalize_legacy_app_path(item.path)
        page = page_by_path.get(normalized_path)
        if not page:
            changed = True
            continue
        if page.enabled is False:
            changed = True
            continue
        if page.path in FIXED_PATHS:
            changed = True
            continue
        if page.path in seen:
            changed = True
            continue

        seen.add(page.path)
        if normalized_path != item.path:
            changed = True

        normalized_nav.append(AppShellNavItem(id=item.id, title=page.title, path=page.path))

    for page in spec.pages:
        if page.enabled is False:
            continue
        if page.path in FIXED_PATHS:
            continue
        if page.path in seen:
            continue
        seen.add(page.path)
        normalized_nav.append(AppShellNavItem(id=f"nav_{page.id}", title=page.title, path=page.path))
        changed = True

    if normalized_nav:
        spec.shell.navigation = normalized_nav

    return spec, changed


def build_default_spec() -> AppSpec:
    return AppSpec(
        shell={
            "layout": "sidebar",
            "navigation": [
                {"id": "nav_users", "title": "Users", "path": "/users"},
                {"id": "nav_jobs", "title": "Jobs", "path": "/jobs"},
                {"id": "nav_logs", "title": "Logs", "path": "/logs"},
                {"id": "nav_integrations", "title": "Integrations", "path": "/integrations"},
                {"id": "nav_billing", "title": "Billing", "path": "/billing"},
                {"id": "nav_notifications", "title": "Notifications", "path": "/notifications"},
            ],
        },
        pages=[
            {
                "id": "page_dashboard",
                "path": "/",
                "title": "Dashboard",
                "enabled": True,
                "templateId": "dashboard-analytics",
                "sections": [],
                "dataSources": [],
            },
            {
                "id": "page_users",
                "path": "/users",
                "title": "Users",
                "enabled": False,
                "templateId": "users-table",
                "sections": [],
                "dataSources": [],
            },
            {
                "id": "page_jobs",
                "path": "/jobs",
                "title": "Jobs",
                "enabled": False,
                "templateId": "jobs-runs",
                "sections": [],
                "dataSources": [],
            },
            {
                "id": "page_logs",
                "path": "/logs",
                "title": "Logs",
                "enabled": False,
                "templateId": "logs-audit",
                "sections": [],
                "dataSources": [],
            },
            {
                "id": "page_integrations",
                "path": "/integrations",
                "title": "Integrations",
                "enabled": False,
                "templateId": "integrations-cards",
                "sections": [],
                "dataSources": [],
            },
            {
                "id": "page_billing",
                "path": "/billing",
                "title": "Billing",
                "enabled": False,
                "templateId": "billing-overview",
                "sections": [],
                "dataSources": [],
            },
            {
                "id": "page_notifications",
                "path": "/notifications",
                "title": "Notifications",
                "enabled": False,
                "templateId": "notifications-inbox",
                "sections": [],
                "dataSources": [],
            },
            {
                "id": "page_settings",
                "path": "/settings",
                "title": "Settings",
                "enabled": True,
                "templateId": "settings-general",
                "sections": [],
                "dataSources": [],
            },
        ],
    )


@router.get("/app/spec", response_model=AppSpecRead, tags=["app"])
def read_app_spec(_: CurrentUser):
    specs_dir = ensure_llm_specs_dir()
    path = specs_dir / "app.json"

    if not path.exists():
        spec = build_default_spec()
        path.write_text(json.dumps(spec.model_dump(by_alias=True), indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    try:
        raw = json.loads(path.read_text(encoding="utf-8"))
        spec = AppSpec(**raw)
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Invalid app.json: {exc}") from exc

    spec, changed = normalize_app_spec(spec)
    if changed:
        path.write_text(
            json.dumps(spec.model_dump(by_alias=True), indent=2, ensure_ascii=False) + "\n",
            encoding="utf-8",
        )

    stat = path.stat()
    created = datetime.fromtimestamp(stat.st_ctime, tz=timezone.utc)
    updated = datetime.fromtimestamp(stat.st_mtime, tz=timezone.utc)

    return AppSpecRead(
        id=uuid.uuid5(uuid.NAMESPACE_URL, "aurora_stack:default"),
        slug="default",
        spec=spec,
        created_at=created,
        updated_at=updated,
    )


@router.put("/app/spec", response_model=AppSpecRead, tags=["app"])
def upsert_app_spec(payload: AppSpecUpsert, _: CurrentUser):
    specs_dir = ensure_llm_specs_dir()
    path = specs_dir / "app.json"

    spec, _ = normalize_app_spec(payload.spec)

    path.write_text(
        json.dumps(spec.model_dump(by_alias=True), indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    stat = path.stat()
    created = datetime.fromtimestamp(stat.st_ctime, tz=timezone.utc)
    updated = datetime.fromtimestamp(stat.st_mtime, tz=timezone.utc)

    return AppSpecRead(
        id=uuid.uuid5(uuid.NAMESPACE_URL, "aurora_stack:default"),
        slug="default",
        spec=spec,
        created_at=created,
        updated_at=updated,
    )
