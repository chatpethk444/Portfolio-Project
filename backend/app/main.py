import os
import logging
from typing import Optional
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Portfolio Backend API", version="1.0.0")

# CORS Middleware Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root Endpoint: ป้องกัน 404 เมื่อเรียก URL หลักโดยตรง
@app.get("/", status_code=status.HTTP_200_OK)
def read_root():
    return {
        "status": "online",
        "message": "Portfolio Backend Service is running.",
        "docs": "/docs"
    }

# Health Check Endpoint: สำหรับ cron-job.org ยิงเพื่อ Keep-Alive
@app.get("/health", status_code=status.HTTP_200_OK)
def health_check():
    return {"status": "ok", "message": "Service is healthy"}