from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProjectBase(BaseModel):
    user_id: int
    name: str
    category: str
    location: str
    client_name: str
    project_manager: str
    status: str
    billing_progress: float = 0
    onsite_progress: float = 0
    total_scope: float = 0
    description: str

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    pass

class Project(ProjectBase):
    project_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True 