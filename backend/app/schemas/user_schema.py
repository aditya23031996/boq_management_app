from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    company_name: str
    company_gst: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        orm_mode = True
