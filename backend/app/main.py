import os
import logging
from typing import List, Optional
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import create_client, Client

# Logging Setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Portfolio Backend API", version="1.0.0")

# CORS Middleware (รองรับ Frontend จาก Vercel)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Supabase
SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

supabase: Optional[Client] = None
if SUPABASE_URL and SUPABASE_KEY:
    try:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
    except Exception as e:
        logger.error(f"Failed to initialize Supabase: {str(e)}")

# Data Model
class Project(BaseModel):
    id: Optional[int] = None
    title: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    tech_stack: Optional[List[str]] = None
    github_link: Optional[str] = None
    demo_link: Optional[str] = None

# Root Route
@app.get("/", status_code=status.HTTP_200_OK)
def read_root():
    return {"message": "Portfolio API is active", "docs": "/docs"}

# Health Check Route (สำหรับ cron-job.org)
@app.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    return {"status": "ok"}

# Projects Route (แก้ปัญหา 404 Not Found)
@app.get("/projects", status_code=status.HTTP_200_OK)
def get_projects():
    if not supabase:
        # Fallback Mock Data กรณีไม่ได้เชื่อมต่อ Supabase
        return [
            {
                "id": 1,
                "title": "Portfolio Web App",
                "description": "Fullstack Portfolio Project with FastAPI & React",
                "tech_stack": ["React", "FastAPI", "Docker", "Supabase"],
            }
        ]
    
    try:
        response = supabase.table("projects").select("*").execute()
        return response.data
    except Exception as e:
        logger.error(f"Database query error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch projects from database"
        )