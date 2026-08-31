# ใช้ Python Alpine Image ขนาดจิ๋วเพื่อประหยัด RAM และบูตเร็วที่สุด
FROM python:3.11-slim

# ตั้งค่าไม่ให้ Python สร้างไฟล์ .pyc และให้แสดง Log ทันที
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# คัดลอกและติดตั้ง Dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# คัดลอก โค้ดทั้งหมด
COPY . .

# เปิด พอร์ตสำหรับ Render
EXPOSE 10000

# รัน FastAPI ด้วย Uvicorn โดยผูกกับ $PORT ของ Render
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-10000} --workers 1"]