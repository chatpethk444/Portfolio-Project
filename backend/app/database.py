import logging
from functools import lru_cache
from supabase import Client, create_client
from app.config import get_settings

logger = logging.getLogger(__name__)

@lru_cache
def get_supabase_client() -> Client | None:
    settings = get_settings()
    if not settings.supabase_url or not settings.supabase_key:
        logger.warning("Supabase is not configured.")
        return None
    try:
        return create_client(settings.supabase_url, settings.supabase_key)
    except Exception:
        logger.exception("Failed to initialize Supabase client.")
        return None
