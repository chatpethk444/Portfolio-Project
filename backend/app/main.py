import os
from typing import List, Optional
from datetime import datetime
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from supabase import create_client, Client

app = FastAPI(title="Portfolio API", version="1.0.0")

# 1. CORS Configuration
origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Supabase Client Initialization
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://your-supabase-id.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "your-anon-key")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# 3. Pydantic Response Schema
class ProjectResponse(BaseModel):
    id: int
    title: str
    category: str
    short_desc: str
    full_desc: Optional[str] = None
    image_url: Optional[str] = None
    tech_stack: List[str] = Field(default_factory=list)
    features: List[str] = Field(default_factory=list)
    github_url: Optional[str] = None
    canva_url: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# 4. API Endpoints
@app.get(
    "/projects", 
    response_model=List[ProjectResponse],
    status_code=status.HTTP_200_OK,
    summary="Get all portfolio projects"
)
def get_projects():
    try:
        response = (
            supabase.table("projects")
            .select(
                "id, title, category, short_desc, full_desc, "
                "tech_stack, features, github_url, canva_url, created_at, image_url"
            )
            .order("created_at", desc=True)
            .execute()
        )
        return response.data
    except Exception as e:
        # พิมพ์ Error log ฝั่ง Server เพื่อใช้วิเคราะห์
        print(f"Server Internal Error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail=f"Database Query Error: {str(e)}"
        )