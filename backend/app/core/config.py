from typing import List
import json
from pydantic import PostgresDsn
from pydantic import SecretStr
from pydantic import model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Pilot"
    debug: bool = True
    database_url: PostgresDsn
    api_v1_prefix: str = "/api/v1"
    allowed_origins: str = "http://localhost:3000"
    jwt_secret_key: SecretStr
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 60

    model_config = SettingsConfigDict(
        env_prefix="PILOT_",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def allowed_origins_list(self) -> List[str]:
        raw = (self.allowed_origins or "").strip()
        if not raw:
            return []

        if raw.startswith("["):
            try:
                parsed = json.loads(raw)
            except json.JSONDecodeError:
                parsed = None
            if isinstance(parsed, list):
                return [str(item).strip() for item in parsed if str(item).strip()]

        return [item.strip() for item in raw.split(",") if item.strip()]

    @model_validator(mode="after")
    def _validate_secrets(self) -> "Settings":
        secret = self.jwt_secret_key.get_secret_value().strip()
        if secret == "change_me" or len(secret) < 32:
            raise ValueError("JWT_SECRET_KEY must be set to a strong random value (>=32 chars)")
        return self


settings = Settings()