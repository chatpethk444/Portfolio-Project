from functools import lru_cache
from typing import Literal
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "Portfolio Backend API"
    app_version: str = "2.0.0"
    environment: Literal["development", "production", "test"] = "development"
    supabase_url: str | None = None
    supabase_key: str | None = None
    cors_origins: str = "http://localhost:5173"
    enable_mock_data: bool = False

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

@lru_cache
def get_settings() -> Settings:
    return Settings()
