import os
import logging
from typing import List, Optional
from datetime import datetime
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from supabase import create_client, Client

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Portfolio API", version="1.0.0", redirect_slashes=False)

# Enable CORS for All Origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Supabase Env Retrieval
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

# Initialize Client directly to avoid lifecycle lock
supabase: Optional[Client] = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        logger.error(f"Supabase init error: {str(e)}")

class ProjectResponse(BaseModel):
    id: int
    title: str
    category: str
    short_desc: str
    full_desc: Optional[str] = ""
    images: List[str] = Field(default_factory=list)
    tech_stack: List[str] = Field(default_factory=list)
    features: List[str] = Field(default_factory=list)
    github_url: Optional[str] = None
    canva_url: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

@app.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    return {"status": "ok", "message": "Backend is active"}

@app.get("/projects", response_model=List[ProjectResponse], status_code=status.HTTP_200_OK)
def get_projects():
    if not supabase:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database connection failed"
        )
        
    try:
        response = (
            supabase.table("projects")
            .select("id, title, category, short_desc, full_desc, images, image_url, tech_stack, features, github_url, canva_url, created_at")
            .order("created_at", desc=True)
            .execute()
        )
        
        raw_data = getattr(response, "data", []) or []
        sanitized_data = []
        
        for item in raw_data:
            images = item.get("images")
            image_url = item.get("image_url")
            
            if isinstance(images, list) and len(images) > 0:
                item["images"] = images
            elif image_url:
                item["images"] = [image_url]
            else:
                item["images"] = []

            item["tech_stack"] = item.get("tech_stack") or []
            item["features"] = item.get("features") or []
            
            sanitized_data.append(item)
            
        return sanitized_data

    except Exception as e:
        logger.error(f"Error fetching projects: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database query error: {str(e)}"
        )