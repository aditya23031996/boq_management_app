from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ProjectBase(BaseModel):
    name: str
    category: Optional[str] = None
    location: Optional[str] = None
    client_name: str
    project_manager: Optional[str] = None
    status: Optional[str] = None
    billing_progress: Optional[int] = 0
    onsite_progress: Optional[int] = 0
    total_scope: Optional[int] = 0
    description: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True 