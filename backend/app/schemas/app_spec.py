from datetime import datetime
from typing import Literal, Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class AuroraTheme(BaseModel):
    mode: Literal["system", "light", "dark"] = "system"
    palette: str = "northern-light"


class AuroraProjectInfo(BaseModel):
    id: str = "pilot"
    title: str = "mes-fragrances"
    theme: AuroraTheme = Field(default_factory=AuroraTheme)


class AppShellNavItem(BaseModel):
    id: str
    title: str
    path: str


class AppShell(BaseModel):
    layout: Literal["sidebar"] = "sidebar"
    navigation: list[AppShellNavItem] = Field(default_factory=list)


class CustomBlockLayout(BaseModel):
    kind: Literal["stack", "split", "grid", "tabs"]
    options: dict[str, Any] = Field(default_factory=dict)


class CustomBlockNode(BaseModel):
    id: str
    component_key: str = Field(..., alias="componentKey")
    props: dict[str, Any] = Field(default_factory=dict)
    bindings: dict[str, Any] | None = None


class CustomBlock(BaseModel):
    id: str
    type: Literal["custom"] = "custom"
    title: str
    layout: CustomBlockLayout
    nodes: list[CustomBlockNode] = Field(default_factory=list)


class AppDataSource(BaseModel):
    id: str
    kind: Literal["http"] = "http"
    endpoint: str
    notes: str | None = None


class AppPage(BaseModel):
    id: str
    path: str
    title: str
    enabled: bool = True
    template_id: str | None = Field(default=None, alias="templateId")
    objective: str | None = None
    description: str | None = None
    success_criteria: list[str] = Field(default_factory=list, alias="successCriteria")
    sections: list[CustomBlock] = Field(default_factory=list)
    data_sources: list[AppDataSource] | None = Field(default=None, alias="dataSources")


class AppSpec(BaseModel):
    version: str = "1.0"
    kind: Literal["aurora.app"] = "aurora.app"
    project: AuroraProjectInfo = Field(default_factory=AuroraProjectInfo)
    shell: AppShell = Field(default_factory=AppShell)
    pages: list[AppPage] = Field(default_factory=list)

    model_config = ConfigDict(populate_by_name=True)


class AppSpecRead(BaseModel):
    id: UUID
    slug: str
    spec: AppSpec
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class AppSpecUpsert(BaseModel):
    spec: AppSpec
