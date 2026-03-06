from datetime import datetime
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class BlockInstance(BaseModel):
    id: str = Field(..., description="Instance id (unique) for drag & drop and duplicates.")
    category: str
    slug: str
    title: str
    content: dict[str, Any] | None = None
    props: dict[str, Any] | None = None


class SitePageBase(BaseModel):
    slug: str
    title: str
    blocks: list[BlockInstance] = Field(default_factory=list)
    parent_id: UUID | None = None
    status: str = "published"
    show_in_nav: bool = True
    nav_order: int = 0
    is_home: bool = False
    objective: str | None = None
    expected_action: str | None = None
    key_messages: list[str] = Field(default_factory=list)
    facts: str | None = None


class SitePageUpsert(BaseModel):
    title: str | None = None
    blocks: list[BlockInstance] | None = None
    parent_id: UUID | None = None
    status: str | None = None
    show_in_nav: bool | None = None
    nav_order: int | None = None
    is_home: bool | None = None
    objective: str | None = None
    expected_action: str | None = None
    key_messages: list[str] | None = None
    facts: str | None = None


class SitePageCreate(BaseModel):
    slug: str
    title: str
    parent_id: UUID | None = None
    status: str = "published"
    show_in_nav: bool = True
    nav_order: int | None = None
    is_home: bool = False
    objective: str | None = None
    expected_action: str | None = None
    key_messages: list[str] = Field(default_factory=list)
    facts: str | None = None


class SitePageRead(SitePageBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
