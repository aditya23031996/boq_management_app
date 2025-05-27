from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate, Project as ProjectSchema
from typing import List
from app.utils.auth import get_current_user_id
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
import os

router = APIRouter(
    prefix="/project",
    tags=["Project"]
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="user/login")
SECRET_KEY = os.getenv("SECRET_KEY", "supersecret")

def get_current_user_id(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id: int = int(payload.get("sub"))
        return user_id
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication")

@router.post("/{user_id}", response_model=ProjectSchema)
def create_project_for_user(user_id: int, project: ProjectCreate, db: Session = Depends(get_db)):
    db_project = Project(
        name=project.name,
        category=project.category,
        location=project.location,
        client_name=project.client_name,
        project_manager=project.project_manager,
        status=project.status,
        billing_progress=project.billing_progress,
        onsite_progress=project.onsite_progress,
        total_scope=project.total_scope,
        description=project.description,
        user_id=user_id
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.get("/", response_model=List[ProjectSchema])
def get_all_projects(db: Session = Depends(get_db)):
    return db.query(Project).all()

@router.get("/{user_id}", response_model=List[ProjectSchema])
def get_projects_for_user(user_id: int, db: Session = Depends(get_db)):
    return db.query(Project).filter(Project.user_id == user_id).all()

@router.get("/{user_id}/{project_id}", response_model=ProjectSchema)
def get_project_for_user(user_id: int, project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.user_id == user_id, Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.put("/{user_id}/{project_id}", response_model=ProjectSchema)
def update_project_for_user(user_id: int, project_id: int, project_update: ProjectUpdate, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.user_id == user_id, Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    for field, value in project_update.dict(exclude_unset=True).items():
        setattr(project, field, value)
    db.commit()
    db.refresh(project)
    return project

@router.delete("/{user_id}/{project_id}", response_model=ProjectSchema)
def delete_project_for_user(user_id: int, project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.user_id == user_id, Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return project

@router.delete("/{user_id}", response_model=List[ProjectSchema])
def delete_all_projects_for_user(user_id: int, db: Session = Depends(get_db)):
    projects = db.query(Project).filter(Project.user_id == user_id).all()
    for project in projects:
        db.delete(project)
    db.commit()
    return projects 