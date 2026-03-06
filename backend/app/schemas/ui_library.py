from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class UiLibraryUpdate(BaseModel):
    component_keys: list[str] = Field(default_factory=list)


class UiLibraryRead(BaseModel):
    id: UUID
    user_id: UUID
    component_keys: list[str] = Field(default_factory=list)
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

