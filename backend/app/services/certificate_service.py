import logging
from fastapi import HTTPException, status
from app.database import get_supabase_client
from app.schemas import Certificate

logger = logging.getLogger(__name__)

def list_certificates() -> list[Certificate]:
    client = get_supabase_client()
    if client is None:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Certificate database is not configured.")
    try:
        response = client.table("certificates").select("*").order("id").execute()
        return [
            Certificate(
                id=row.get("id"),
                name=row.get("name") or row.get("title") or "Untitled Certificate",
                description=row.get("description") or row.get("details"),
                img_url=row.get("img_url") or row.get("image_url") or row.get("image"),
            )
            for row in (response.data or [])
        ]
    except Exception as exc:
        logger.exception("Failed to fetch certificates.")
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Failed to fetch certificates from the database.") from exc
