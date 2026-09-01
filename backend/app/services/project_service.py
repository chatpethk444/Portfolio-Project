import logging
from fastapi import HTTPException, status
from app.config import get_settings
from app.database import get_supabase_client
from app.schemas import Project

logger = logging.getLogger(__name__)

MOCK_PROJECTS = [
    Project(
        id=1,
        title="Portfolio Web App",
        category="Full Stack",
        short_desc="Portfolio built with React, FastAPI, Docker and Supabase.",
        full_desc="A full-stack personal portfolio with animated UI and a database-backed project catalog.",
        images=[],
        tech_stack=["React", "FastAPI", "Docker", "Supabase"],
        features=["Responsive UI", "Project modal", "REST API"],
    )
]

def _normalize_project(row: dict) -> Project:
    images = row.get("images") or []
    if not images and row.get("image_url"):
        images = [row["image_url"]]
    return Project(
        id=row.get("id"),
        title=row.get("title", "Untitled Project"),
        category=row.get("category"),
        short_desc=row.get("short_desc") or row.get("description"),
        full_desc=row.get("full_desc") or row.get("description"),
        images=images,
        tech_stack=row.get("tech_stack") or row.get("technologies") or [],
        features=row.get("features") or [],
        github_url=row.get("github_url") or row.get("github_link"),
        demo_url=row.get("demo_url") or row.get("demo_link"),
        canva_url=row.get("canva_url"),
    )

def list_projects() -> list[Project]:
    client = get_supabase_client()
    settings = get_settings()
    if client is None:
        if settings.enable_mock_data:
            return MOCK_PROJECTS
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Project database is not configured.",
        )
    try:
        response = client.table("projects").select("*").order("id").execute()
        return [_normalize_project(row) for row in (response.data or [])]
    except Exception as exc:
        logger.exception("Failed to fetch projects.")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Failed to fetch projects from the database.",
        ) from exc
