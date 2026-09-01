from fastapi import APIRouter, status
from app.schemas import Project
from app.services.project_service import list_projects

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.get("", response_model=list[Project], status_code=status.HTTP_200_OK)
@router.get("/", response_model=list[Project], status_code=status.HTTP_200_OK, include_in_schema=False)
def get_projects() -> list[Project]:
    return list_projects()
