import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client

app = FastAPI(title="Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ดึง Config จาก Environment Variables หรือใช้ค่า Direct
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://your-supabase-id.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "your-anon-key")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

@app.get("/projects")
def get_projects():
    try:
        # ดึงข้อมูล Projects ทั้งหมด เรียงจากใหม่ไปเก่า
        response = (
            supabase.table("projects")
            .select("id, title, category, short_desc, full_desc, tech_stack, features, github_url, canva_url, created_at")
            .order("created_at", desc=True)
            .execute()
        )
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database Query Error: {str(e)}")