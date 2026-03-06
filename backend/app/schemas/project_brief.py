from __future__ import annotations

from datetime import datetime
from typing import Literal
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class ProjectEntity(BaseModel):
    name: str
    description: str | None = None


class ProjectBrief(BaseModel):
    version: str = "1.0"
    kind: Literal["aurora.projectBrief"] = "aurora.projectBrief"

    title: str = ""
    one_liner: str = Field(default="", alias="oneLiner")
    project_type: Literal["website", "webapp", "both"] = Field(default="both", alias="projectType")

    target_users: str = Field(default="", alias="targetUsers")
    primary_goal: str = Field(default="", alias="primaryGoal")
    tone: str = ""
    facts: str = ""
    site_type: str = Field(default="", alias="siteType")

    auth_required: bool = Field(default=False, alias="authRequired")
    roles: list[str] = Field(default_factory=list)

    must_have: list[str] = Field(default_factory=list, alias="mustHave")
    nice_to_have: list[str] = Field(default_factory=list, alias="niceToHave")
    non_goals: list[str] = Field(default_factory=list, alias="nonGoals")

    entities: list[ProjectEntity] = Field(default_factory=list)
    integrations: list[str] = Field(default_factory=list)

    notes: str = ""
    open_questions: list[str] = Field(default_factory=list, alias="openQuestions")

    model_config = ConfigDict(populate_by_name=True)


class ProjectBriefRead(BaseModel):
    id: UUID
    slug: str
    brief: ProjectBrief
    created_at: datetime
    updated_at: datetime


class ProjectBriefUpsert(BaseModel):
    brief: ProjectBrief
