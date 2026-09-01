from fastapi import APIRouter, status
from app.schemas import Certificate
from app.services.certificate_service import list_certificates

router = APIRouter(prefix="/certificates", tags=["Certificates"])

@router.get("", response_model=list[Certificate], status_code=status.HTTP_200_OK)
@router.get("/", response_model=list[Certificate], status_code=status.HTTP_200_OK, include_in_schema=False)
def get_certificates() -> list[Certificate]:
    return list_certificates()
