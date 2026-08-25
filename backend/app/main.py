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

# 🟢 redirect_slashes=False เพื่อป้องกัน 307 Redirect ที่ทำให้ CORS Header หลุด
app = FastAPI(title="Portfolio API", version="1.0.0", redirect_slashes=False)

# 🟢 1. CORS Sanitization Logic
raw_origins = os.getenv("ALLOWED_ORIGINS", "")
# แยก string ด้วย comma, ลบ whitespace และ trailing slash ออกทั้งหมด
parsed_origins = [o.strip().rstrip("/") for o in raw_origins.split(",") if o.strip()]

default_origins = [
    "https://portfolio-project-tawny-ten.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000"
]

# รวม List และตัดตัวซ้ำ
origins = list(set(parsed_origins + default_origins))
logger.info(f"Loaded CORS Allowed Origins: {origins}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Supabase Client Initialization
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://your-supabase-id.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "your-anon-key")

try:
    supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
except Exception as e:
    logger.error(f"Failed to initialize Supabase client: {str(e)}")
    supabase = None

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

# 🟢 2. Health Check Endpoint สำหรับ Ping ปลุก Render
@app.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    return {"status": "ok", "message": "Backend is active"}

# 🟢 3. รองรับทั้ง /projects และ /projects/
@app.get("/projects", response_model=List[ProjectResponse], status_code=status.HTTP_200_OK)
@app.get("/projects/", response_model=List[ProjectResponse], include_in_schema=False)
def get_projects():
    if not supabase:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Supabase client is not initialized"
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
        logger.error(f"API Executing Error: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal Database Query Error: {str(e)}"
        )