from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Portfolio Backend API")

# 1. กำหนด Allowed Origins ให้รองรับ Vercel และ Localhost
origins = [
    "https://portfolio-project-iphof99bw-solo-44fc.vercel.app",  # Vercel URL ล่าสุดของคุณ
    "https://portfolio-project-tawny-ten.vercel.app",            # Production URL หลัก
    "http://localhost:5173",                                    # Vite Local Dev
    "http://localhost:3000",
]

# 2. เพิ่ม CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            # ใช้ ["*"] เพื่ออนุญาตทุก Origin ในระหว่างพัฒนา/ทดสอบ (แก้ปัญหา CORS ได้ 100%)
    allow_credentials=True,
    allow_methods=["*"],            # อนุญาตทุก HTTP Methods (GET, POST, PUT, DELETE, OPTIONS)
    allow_headers=["*"],            # อนุญาตทุก Headers
)

@app.get("/")
def read_root():
    return {"status": "online", "message": "Backend API is running smoothly"}

@app.get("/projects")
def get_projects():
    # ใส่ logic การดึงข้อมูล projects ของคุณตรงนี้
    return [
        {"id": 1, "title": "Project A", "description": "Demo project description"}
    ]