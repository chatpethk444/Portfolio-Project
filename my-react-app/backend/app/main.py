from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# กำหนด Origin ที่ยอมรับให้ยิง API เข้ามาได้
origins = [
    "https://portfolio-project-gv7swnszv-solo-44fc.vercel.app",
    "https://portfolio-project-tawny-ten.vercel.app",
    "http://localhost:5173", # สำหรับทดสอบในเครื่อง Local
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, # หรือใช้ ["*"] สำหรับเปิดสาธารณะทั้งหมด
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)