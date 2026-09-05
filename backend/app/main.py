import logging
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.database import get_supabase_client
from app.routers.projects import router as projects_router
from app.routers.certificates import router as certificates_router
from app.schemas import HealthResponse

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="REST API for the portfolio frontend.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    # Keep the production Vercel domain allowed even if Render's CORS_ORIGINS
    # environment variable still contains an older value.
    allow_origin_regex=r"https://(?:chatpethkarisuk-portfolio|portfolio-project-[a-z0-9-]+|chatpeth-portfolio(?:-[a-z0-9-]+)?)\.vercel\.app",
    allow_credentials=False,
    allow_methods=["GET", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

app.include_router(projects_router)
app.include_router(certificates_router)

@app.get("/", status_code=status.HTTP_200_OK)
def read_root() -> dict[str, str]:
    return {
        "message": "Portfolio API is active",
        "docs": "/docs",
        "health": "/health",
    }

@app.get("/health", response_model=HealthResponse, status_code=status.HTTP_200_OK)
def health_check() -> HealthResponse:
    database_status = "connected" if get_supabase_client() else "not_configured"
    return HealthResponse(status="ok", database=database_status)
