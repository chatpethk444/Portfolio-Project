import logging
from fastapi import APIRouter, HTTPException, status
from app.database import supabase

logger = logging.getLogger("uvicorn.error")

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)

@router.get("")
@router.get("/")
async def get_projects():
    """ดึงข้อมูลโปรเจกต์ทั้งหมดจาก Supabase"""
    try:
        # ตรวจสอบให้แน่ใจว่าชื่อตารางใน Supabase ตรงกับ "projects" (ตัวเล็กทั้งหมด)
        response = supabase.table("projects").select("*").execute()
        return response.data
    except Exception as e:
        # แสดงรายละเอียด Error ออกที่ Terminal ของ Uvicorn
        logger.error(f"PostgREST Error Detail: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database query failed. Please verify table existence in Supabase."
        )