from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from supabase import AuthApiError

from app.database import supabase, get_current_user
from app.routers import projects

# 1. Initialize FastAPI Application
app = FastAPI(title="React + FastAPI + Supabase Full-Stack")

# 2. Add CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Include Routers (ต้องวางไว้หลังประกาศ app)
app.include_router(projects.router)

# 4. Schemas
class AuthSchema(BaseModel):
    email: EmailStr
    password: str

# 5. Auth Endpoints
@app.post("/api/signup")
def signup(data: AuthSchema):
    try:
        res = supabase.auth.sign_up({"email": data.email, "password": data.password})
        return {"message": "User registered successfully", "user": res.user}
    except AuthApiError as e:
        raise HTTPException(status_code=400, detail=e.message)

@app.post("/api/login")
def login(data: AuthSchema):
    try:
        res = supabase.auth.sign_in_with_password({"email": data.email, "password": data.password})
        return {"access_token": res.session.access_token, "user": res.user}
    except AuthApiError as e:
        raise HTTPException(status_code=401, detail=e.message)

@app.get("/api/protected-data")
def get_protected_data(current_user: dict = Depends(get_current_user)):
    user_id = current_user.get("sub")
    res = supabase.table("projects").select("*").eq("user_id", user_id).execute()
    return {"user_id": user_id, "data": res.data}