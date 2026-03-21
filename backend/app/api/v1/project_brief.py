from __future__ import annotations

from datetime import datetime, timezone
import json
import os
import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from typing import Annotated

from app.api.deps import get_current_user
from app.core.llm_specs import ensure_llm_specs_dir
from app.models.user import User
from app.schemas.project_brief import ProjectBrief, ProjectBriefRead, ProjectBriefUpsert

router = APIRouter()
CurrentUser = Annotated[User, Depends(get_current_user)]


def _default_brief() -> ProjectBrief:
    project_title = (os.getenv("AURORA_PROJECT_TITLE") or "").strip() or "Mon projet"
    return ProjectBrief(
        title=project_title,
        oneLiner="",
        projectType="website",
        targetUsers="",
        primaryGoal="",
        tone="",
        facts="",
        siteType="",
        authRequired=False,
        roles=[],
        mustHave=[],
        niceToHave=[],
        nonGoals=[],
        entities=[],
        integrations=[],
        notes="⚠️ Ne colle pas de clés API / mots de passe ici.",
        openQuestions=[],
    )


@router.get("/project/brief", response_model=ProjectBriefRead, tags=["project"])
def read_project_brief(_: CurrentUser):
    specs_dir = ensure_llm_specs_dir()
    path = specs_dir / "project-brief.json"

    if not path.exists():
        brief = _default_brief()
        path.write_text(json.dumps(brief.model_dump(by_alias=True), indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    try:
        raw = json.loads(path.read_text(encoding="utf-8"))
        brief = ProjectBrief(**raw)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Invalid project-brief.json: {exc}",
        ) from exc

    stat = path.stat()
    created = datetime.fromtimestamp(stat.st_ctime, tz=timezone.utc)
    updated = datetime.fromtimestamp(stat.st_mtime, tz=timezone.utc)

    return ProjectBriefRead(
        id=uuid.uuid5(uuid.NAMESPACE_URL, "pilot:project-brief:default"),
        slug="default",
        brief=brief,
        created_at=created,
        updated_at=updated,
    )


@router.put("/project/brief", response_model=ProjectBriefRead, tags=["project"])
def upsert_project_brief(payload: ProjectBriefUpsert, _: CurrentUser):
    specs_dir = ensure_llm_specs_dir()
    path = specs_dir / "project-brief.json"

    brief = payload.brief
    path.write_text(json.dumps(brief.model_dump(by_alias=True), indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    stat = path.stat()
    created = datetime.fromtimestamp(stat.st_ctime, tz=timezone.utc)
    updated = datetime.fromtimestamp(stat.st_mtime, tz=timezone.utc)

    return ProjectBriefRead(
        id=uuid.uuid5(uuid.NAMESPACE_URL, "pilot:project-brief:default"),
        slug="default",
        brief=brief,
        created_at=created,
        updated_at=updated,
    )
