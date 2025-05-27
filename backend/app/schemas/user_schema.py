from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str
    company_name: str
    company_gst: str

class UserResponse(BaseModel):
    user_id: int
    first_name: str
    last_name: str
    email: str
    company_name: str
    company_gst: str

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: str
    password: str

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    company_name: Optional[str] = None
    company_gst: Optional[str] = None
