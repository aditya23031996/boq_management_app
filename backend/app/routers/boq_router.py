from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.boq import BOQ, BOQItem
from app.models.project import Project
from app.schemas.boq import BOQ as BOQSchema, BOQCreate, BOQItemCreate, BOQItemUpdate, PaymentBreakup, PaymentBreakupCreate, BOQItem as BOQItemSchema
from typing import List, Optional

router = APIRouter(
    prefix="/boq",
    tags=["BOQ"]
)

def create_boq_item(db: Session, boq_id: int, item_data: BOQItemCreate, parent_item: Optional[BOQ] = None):
    db_item = BOQ(
        boq_id=boq_id,
        parent_item_id=parent_item.id if parent_item else None,
        description=item_data.description,
        unit=item_data.unit,
        quantity=item_data.quantity,
        unit_price=item_data.unit_price,
        total_price=item_data.quantity * item_data.unit_price,
        notes=item_data.notes
    )
    db.add(db_item)
    db.flush()  # get db_item.id for sub-items
    # Payment breakups
    if item_data.paymentBreakups:
        for pb in item_data.paymentBreakups:
            db_pb = PaymentBreakup(
                boq_item_id=db_item.id,
                description=pb.description,
                percentage=pb.percentage
            )
            db.add(db_pb)
    # Sub-items
    if item_data.subItems:
        for sub in item_data.subItems:
            create_boq_item(db, boq_id, sub, parent_item=db_item)
    return db_item

@router.post("/{user_id}/{project_id}", response_model=BOQSchema)
def create_boq(user_id: int, project_id: int, boq: BOQCreate, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.project_id == project_id, Project.user_id == user_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found for user")
    db_boq = BOQ(
        title=boq.title,
        description=boq.description,
        project_id=project_id,
        total_amount=0.0,
        billing_completed=boq.billing_completed or "",
        work_completed=boq.work_completed or ""
    )
    db.add(db_boq)
    db.commit()
    db.refresh(db_boq)
    total = 0.0
    for item in boq.items:
        db_item = create_boq_item(db, db_boq.id, item)
        total += getattr(db_item, 'total_price', 0.0)
    db_boq.total_amount = total
    db.commit()
    db.refresh(db_boq)
    return db_boq

def build_boq_item(item: BOQItem) -> dict:
    return {
        "id": item.id,
        "boq_id": item.boq_id,
        "parent_item_id": item.parent_item_id,
        "description": item.description,
        "unit": item.unit,
        "quantity": item.quantity,
        "unit_price": item.unit_price,
        "total_price": item.total_price,
        "notes": item.notes,
        "created_at": item.created_at,
        "updated_at": item.updated_at,
        "paymentBreakups": [
            {
                "id": pb.id,
                "boq_item_id": pb.boq_item_id,
                "description": pb.description,
                "percentage": pb.percentage,
                "created_at": pb.created_at,
                "updated_at": pb.updated_at
            } for pb in item.payment_breakups
        ],
        "subItems": [build_boq_item(sub) for sub in item.sub_items]
    }

@router.get("/", response_model=List[BOQSchema])
def get_all_boqs(db: Session = Depends(get_db)):
    boqs = db.query(BOQ).all()
    result = []
    for boq in boqs:
        boq.items = [build_boq_item(item) for item in db.query(BOQItem).filter_by(boq_id=boq.boq_id, parent_item_id=None).all()]
        project = db.query(Project).filter(Project.project_id == boq.project_id).first()
        boq_dict = boq.__dict__.copy()
        boq_dict['project_name'] = getattr(project, 'name', '-') if project else "-"
        boq_dict['boq_id'] = boq.boq_id
        boq_dict['items'] = boq.items
        result.append(boq_dict)
    return result

@router.get("/{user_id}", response_model=List[BOQSchema])
def get_boqs_for_user(user_id: int, db: Session = Depends(get_db)):
    projects = db.query(Project).filter(Project.user_id == user_id).all()
    project_ids = [p.project_id for p in projects]
    if not project_ids:
        return []  # Return empty list if user has no projects
    boqs = db.query(BOQ).filter(BOQ.project_id.in_(project_ids)).all()
    result = []
    for boq in boqs:
        boq.items = [build_boq_item(item) for item in db.query(BOQItem).filter_by(boq_id=boq.boq_id, parent_item_id=None).all()]
        # Attach project_name and ensure boq_id is present
        project = next((p for p in projects if p.project_id == boq.project_id), None)
        boq_dict = boq.__dict__.copy()
        boq_dict['project_name'] = getattr(project, 'name', '-') if project else "-"
        boq_dict['boq_id'] = boq.boq_id
        boq_dict['items'] = boq.items
        result.append(boq_dict)
    return result

@router.get("/{user_id}/{project_id}", response_model=List[BOQSchema])
def get_boqs_for_project(user_id: int, project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.project_id == project_id, Project.user_id == user_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found for user")
    boqs = db.query(BOQ).filter(BOQ.project_id == project_id).all()
    result = []
    for boq in boqs:
        boq.items = [build_boq_item(item) for item in db.query(BOQItem).filter_by(boq_id=boq.boq_id, parent_item_id=None).all()]
        boq_dict = boq.__dict__.copy()
        boq_dict['project_name'] = project.name
        boq_dict['boq_id'] = boq.boq_id
        boq_dict['items'] = boq.items
        result.append(boq_dict)
    return result

@router.get("/{user_id}/{project_id}/{boq_id}", response_model=BOQSchema)
def get_boq(user_id: int, project_id: int, boq_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.project_id == project_id, Project.user_id == user_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found for user")
    boq = db.query(BOQ).filter(BOQ.project_id == project_id, BOQ.id == boq_id).first()
    if not boq:
        raise HTTPException(status_code=404, detail="BOQ not found")
    boq.items = [build_boq_item(item) for item in db.query(BOQItem).filter_by(boq_id=boq.id, parent_item_id=None).all()]
    return boq

@router.put("/{user_id}/{project_id}/{boq_id}", response_model=BOQSchema)
def update_boq(user_id: int, project_id: int, boq_id: int, boq_update: BOQCreate, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.project_id == project_id, Project.user_id == user_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found for user")
    boq = db.query(BOQ).filter(BOQ.project_id == project_id, BOQ.id == boq_id).first()
    if not boq:
        raise HTTPException(status_code=404, detail="BOQ not found")
    boq.title = boq_update.title
    boq.description = boq_update.description
    boq.project_id = project_id
    db.query(BOQItem).filter(BOQItem.boq_id == boq_id).delete()
    total = 0.0
    for item in boq_update.items:
        db_item = create_boq_item(db, boq.id, item)
        total += db_item.total_price
    boq.total_amount = total
    db.commit()
    db.refresh(boq)
    return boq

@router.delete("/{user_id}/{project_id}/{boq_id}")
def delete_boq(user_id: int, project_id: int, boq_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.project_id == project_id, Project.user_id == user_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found for user")
    boq = db.query(BOQ).filter(BOQ.project_id == project_id, BOQ.id == boq_id).first()
    if not boq:
        raise HTTPException(status_code=404, detail="BOQ not found")
    db.delete(boq)
    db.commit()
    return {"detail": "BOQ deleted"}

@router.delete("/{user_id}/{project_id}")
def delete_all_boqs_for_project(user_id: int, project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.project_id == project_id, Project.user_id == user_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found for user")
    boqs = db.query(BOQ).filter(BOQ.project_id == project_id).all()
    for boq in boqs:
        db.delete(boq)
    db.commit()
    return {"detail": "All BOQs deleted for project"}
