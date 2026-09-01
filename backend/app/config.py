from functools import lru_cache
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


DEFAULT_CORS_ORIGINS = (
    "http://localhost:5173,"
    "https://portfolio-project-tawny-ten.vercel.app,"
    "https://portfolio-project-solo-44fc.vercel.app"
)


class Settings(BaseSettings):
    app_name: str = "Portfolio Backend API"
    app_version: str = "2.0.0"
    environment: Literal["development", "production", "test"] = "development"
    supabase_url: str | None = None
    supabase_key: str | None = None

    # Comma-separated list of frontend origins allowed to call this API.
    cors_origins: str = DEFAULT_CORS_ORIGINS

    enable_mock_data: bool = False

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    @property
    def cors_origin_list(self) -> list[str]:
        return [
            origin.strip().rstrip("/")
            for origin in self.cors_origins.split(",")
            if origin.strip()
        ]


@lru_cache
def get_settings() -> Settings:
    return Settings()
