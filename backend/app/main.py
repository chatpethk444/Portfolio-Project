from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Portfolio Backend API")

# เพิ่ม CORS Middleware ครอบคลุมทุก Origin และ HTTP Methods
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            # อนุญาตทุก Domain (ปลดล็อก CORS 100%)
    allow_credentials=True,
    allow_methods=["*"],            # รองรับ GET, POST, PUT, DELETE, OPTIONS
    allow_headers=["*"],            # รองรับทุก Header
)

@app.get("/")
def read_root():
    return {"status": "online", "message": "Backend API is running"}

@app.get("/projects")
def get_projects():
    # ใส่ logic การดึงข้อมูลของคุณที่นี่
    return [
        {"id": 1, "title": "Sample Project", "description": "Success"}
    ]