from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class LlmSettingsRead(BaseModel):
    has_openrouter_api_key: bool = Field(default=False, alias="hasOpenRouterApiKey")
    openrouter_model: str | None = Field(default=None, alias="openRouterModel")

    model_config = ConfigDict(populate_by_name=True)


class LlmSettingsUpdate(BaseModel):
    openrouter_api_key: str | None = Field(default=None, alias="openRouterApiKey")
    openrouter_model: str | None = Field(default=None, alias="openRouterModel")

    model_config = ConfigDict(populate_by_name=True)


class OpenRouterModelItem(BaseModel):
    id: str
    name: str | None = None


class OpenRouterProviderGroup(BaseModel):
    provider: str
    models: list[OpenRouterModelItem] = Field(default_factory=list)


class OpenRouterModelsResponse(BaseModel):
    providers: list[OpenRouterProviderGroup] = Field(default_factory=list)


class GeneratedFile(BaseModel):
    path: str
    content: str


class GeneratePreviewRequest(BaseModel):
    model: str


class GeneratePreviewResponse(BaseModel):
    files: list[GeneratedFile] = Field(default_factory=list)


class GenerateApplyRequest(BaseModel):
    files: list[GeneratedFile] = Field(default_factory=list)


class LlmPackPrecheckResponse(BaseModel):
    warnings: list[str] = Field(default_factory=list)


class LlmPackGenerateResponse(BaseModel):
    pack_id: str = Field(alias="packId")
    download_url: str = Field(alias="downloadUrl")
    wrote_dir: str = Field(alias="wroteDir")
    warnings: list[str] = Field(default_factory=list)

    model_config = ConfigDict(populate_by_name=True)
