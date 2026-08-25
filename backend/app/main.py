import os
import logging
from typing import List, Optional
from datetime import datetime
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from supabase import create_client, Client

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Portfolio API", version="1.0.0")

# CORS Setup
origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase Client Initialization
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://your-supabase-id.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "your-anon-key")

try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    logger.error(f"Failed to initialize Supabase client: {str(e)}")

# Safe Response Model with Fallbacks
class ProjectResponse(BaseModel):
    id: int
    title: str
    category: str
    short_desc: str
    full_desc: Optional[str] = ""
    image_url: Optional[str] = None
    tech_stack: Optional[List[str]] = Field(default_factory=list)
    features: Optional[List[str]] = Field(default_factory=list)
    github_url: Optional[str] = None
    canva_url: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

@app.get(
    "/projects",
    response_model=List[ProjectResponse],
    status_code=status.HTTP_200_OK
)
def get_projects():
    try:
        # Query Data from Supabase
        response = (
            supabase.table("projects")
            .select("id, title, category, short_desc, full_desc, tech_stack, features, github_url, canva_url, created_at, image_url")
            .order("created_at", desc=True)
            .execute()
        )
        
        # Safe extraction of response data
        raw_data = getattr(response, "data", [])
        
        # Sanitize list fields to prevent validation error when NULL in DB
        sanitized_data = []
        for item in raw_data:
            item["tech_stack"] = item.get("tech_stack") or []
            item["features"] = item.get("features") or []
            sanitized_data.append(item)
            
        return sanitized_data

    except Exception as e:
        logger.error(f"API Executing Error: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal Database Query Error: {str(e)}"
        )