from __future__ import annotations

from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


class AvailableBlock(BaseModel):
    category: str
    slug: str
    title: str


class SuggestedBlock(BaseModel):
    category: str
    slug: str
    title: str
    content: dict | None = None
    props: dict | None = None


class AvailableTemplate(BaseModel):
    id: str
    title: str


class SuggestWebsiteStructureRequest(BaseModel):
    mode: Literal["website"] = "website"
    page_slug: str = Field(alias="pageSlug")
    available_blocks: list[AvailableBlock] = Field(default_factory=list, alias="availableBlocks")

    model_config = ConfigDict(populate_by_name=True)


class SuggestWebappStructureRequest(BaseModel):
    mode: Literal["webapp"] = "webapp"
    available_templates: list[AvailableTemplate] = Field(default_factory=list, alias="availableTemplates")

    model_config = ConfigDict(populate_by_name=True)


class WebsiteStructurePlan(BaseModel):
    blocks: list[SuggestedBlock] = Field(default_factory=list)
    notes: list[str] = Field(default_factory=list)


class WebappStructurePagePlan(BaseModel):
    id: str
    title: str
    path: str
    enabled: bool = True
    template_id: str | None = Field(default=None, alias="templateId")
    objective: str | None = None
    description: str | None = None
    success_criteria: list[str] = Field(default_factory=list, alias="successCriteria")

    model_config = ConfigDict(populate_by_name=True)


class WebappStructurePlan(BaseModel):
    navigation_page_ids: list[str] = Field(default_factory=list, alias="navigationPageIds")
    pages: list[WebappStructurePagePlan] = Field(default_factory=list)
    notes: list[str] = Field(default_factory=list)

    model_config = ConfigDict(populate_by_name=True)


class MaxUiPattern(BaseModel):
    id: str
    name: str
    sections: list[str] = Field(default_factory=list)


class MaxUiDesignSystem(BaseModel):
    category: str = "General"
    severity: str = "MEDIUM"
    pattern_name: str = Field(default="", alias="patternName")
    pattern_sections_text: str = Field(default="", alias="patternSectionsText")
    cta_placement: str = Field(default="", alias="ctaPlacement")
    color_strategy: str = Field(default="", alias="colorStrategy")
    conversion_focus: str = Field(default="", alias="conversionFocus")

    style_name: str = Field(default="", alias="styleName")
    style_keywords: str = Field(default="", alias="styleKeywords")
    style_best_for: str = Field(default="", alias="styleBestFor")
    style_effects: str = Field(default="", alias="styleEffects")
    style_performance: str = Field(default="", alias="stylePerformance")
    style_accessibility: str = Field(default="", alias="styleAccessibility")

    colors: dict[str, str] = Field(default_factory=dict)
    typography: dict[str, str] = Field(default_factory=dict)

    key_effects: str = Field(default="", alias="keyEffects")
    anti_patterns: str = Field(default="", alias="antiPatterns")

    model_config = ConfigDict(populate_by_name=True)


class MaxUiHint(BaseModel):
    query: str
    pattern: MaxUiPattern
    notes: list[str] = Field(default_factory=list)
    design_system: MaxUiDesignSystem | None = Field(default=None, alias="designSystem")
    design_system_markdown: str | None = Field(default=None, alias="designSystemMarkdown")

    model_config = ConfigDict(populate_by_name=True)


class SuggestWebsiteStructureResponse(BaseModel):
    mode: Literal["website"] = "website"
    max_ui: MaxUiHint = Field(alias="maxUi")
    plan: WebsiteStructurePlan

    model_config = ConfigDict(populate_by_name=True)


class SuggestWebappStructureResponse(BaseModel):
    mode: Literal["webapp"] = "webapp"
    max_ui: MaxUiHint = Field(alias="maxUi")
    plan: WebappStructurePlan

    model_config = ConfigDict(populate_by_name=True)
