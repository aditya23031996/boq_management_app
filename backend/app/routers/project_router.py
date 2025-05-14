from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate, Project as ProjectSchema
from typing import List

router = APIRouter(
    prefix="/project",
    tags=["Project"]
)

@router.post("/", response_model=ProjectSchema)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
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
        description=project.description
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.get("/", response_model=List[ProjectSchema])
def get_all_projects(db: Session = Depends(get_db)):
    return db.query(Project).all()

@router.get("/{project_id}", response_model=ProjectSchema)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).get(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.put("/{project_id}", response_model=ProjectSchema)
def update_project(project_id: int, project_update: ProjectUpdate, db: Session = Depends(get_db)):
    project = db.query(Project).get(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    project.name = project_update.name
    project.category = project_update.category
    project.location = project_update.location
    project.client_name = project_update.client_name
    project.project_manager = project_update.project_manager
    project.status = project_update.status
    project.billing_progress = project_update.billing_progress
    project.onsite_progress = project_update.onsite_progress
    project.total_scope = project_update.total_scope
    project.description = project_update.description
    db.commit()
    db.refresh(project)
    return project

@router.delete("/{project_id}", response_model=ProjectSchema)
def delete_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).get(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return project 