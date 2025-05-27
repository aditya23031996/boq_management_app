from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.boq import BOQ, BOQItem
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

@router.post("/", response_model=BOQSchema)
def create_boq(boq: BOQCreate, db: Session = Depends(get_db)):
    db_boq = BOQ(
        title=boq.title,
        description=boq.description,
        project_id=boq.project_id,
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

# Helper to recursively build nested items for GET

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
def get_all_boqs(project_id: Optional[int] = None, db: Session = Depends(get_db)):
    query = db.query(BOQ)
    if project_id:
        query = query.filter(BOQ.project_id == project_id)
    boqs = query.all()
    for boq in boqs:
        boq.items = [build_boq_item(item) for item in db.query(BOQItem).filter_by(boq_id=boq.id, parent_item_id=None).all()]
        if boq.project:
            boq.project_name = boq.project.name
        else:
            boq.project_name = "-"
    return boqs

@router.get("/{boq_id}", response_model=BOQSchema)
def get_boq(boq_id: int, db: Session = Depends(get_db)):
    boq = db.query(BOQ).get(boq_id)
    if not boq:
        raise HTTPException(status_code=404, detail="BOQ not found")
    boq.items = [build_boq_item(item) for item in db.query(BOQItem).filter_by(boq_id=boq.id, parent_item_id=None).all()]
    return boq

@router.put("/{boq_id}", response_model=BOQSchema)
def update_boq(boq_id: int, boq_update: BOQCreate, db: Session = Depends(get_db)):
    boq = db.query(BOQ).get(boq_id)
    if not boq:
        raise HTTPException(status_code=404, detail="BOQ not found")
    boq.title = boq_update.title
    boq.description = boq_update.description
    boq.project_id = boq_update.project_id
    # Remove old items (cascade will remove sub-items and payment breakups)
    db.query(BOQItem).filter(BOQItem.boq_id == boq_id).delete()
    total = 0.0
    for item in boq_update.items:
        db_item = create_boq_item(db, boq.id, item)
        total += db_item.total_price
    boq.total_amount = total
    db.commit()
    db.refresh(boq)
    return boq

@router.post("/{boq_id}/item/", response_model=BOQItemSchema)
def create_boq_item(boq_id: int, item: BOQItemCreate, db: Session = Depends(get_db)):
    db_item = BOQItem(
        boq_id=boq_id,
        wbs_id=item.wbs_id,
        category1=item.category1,
        category2=item.category2,
        category3=item.category3,
        description=item.description,
        uom=item.uom,
        scope_quantity=item.scope_quantity,
        sor=item.sor,
        total_amount=item.total_amount,
        notes=item.notes,
        parent_item_id=None
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.post("/{boq_id}/item/{parent_item_id}/subitem/", response_model=BOQItemSchema)
def create_boq_subitem(boq_id: int, parent_item_id: int, item: BOQItemCreate, db: Session = Depends(get_db)):
    db_item = BOQItem(
        boq_id=boq_id,
        parent_item_id=parent_item_id,
        wbs_id=item.wbs_id,
        category1=item.category1,
        category2=item.category2,
        category3=item.category3,
        description=item.description,
        uom=item.uom,
        scope_quantity=item.scope_quantity,
        sor=item.sor,
        total_amount=item.total_amount,
        notes=item.notes
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/item/{item_id}", response_model=BOQItemSchema)
def get_boq_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(BOQItem).get(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="BOQ Item not found")
    return item

@router.put("/item/{item_id}", response_model=BOQItemSchema)
def update_boq_item(item_id: int, item_update: BOQItemUpdate, db: Session = Depends(get_db)):
    item = db.query(BOQItem).get(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="BOQ Item not found")
    for field, value in item_update.dict(exclude_unset=True).items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item

@router.delete("/item/{item_id}")
def delete_boq_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(BOQItem).get(item_id)
    if not item:
        raise HTTPException(status_code=404, detail="BOQ Item not found")
    db.delete(item)
    db.commit()
    return {"detail": "BOQ Item deleted"}

@router.post("/item/{item_id}/breakup/", response_model=PaymentBreakup)
def create_payment_breakup(item_id: int, breakup: PaymentBreakupCreate, db: Session = Depends(get_db)):
    db_breakup = PaymentBreakup(
        boq_item_id=item_id,
        description=breakup.description,
        percentage=breakup.percentage
    )
    db.add(db_breakup)
    db.commit()
    db.refresh(db_breakup)
    return db_breakup

@router.get("/breakup/{breakup_id}", response_model=PaymentBreakup)
def get_payment_breakup(breakup_id: int, db: Session = Depends(get_db)):
    breakup = db.query(PaymentBreakup).get(breakup_id)
    if not breakup:
        raise HTTPException(status_code=404, detail="Payment Breakup not found")
    return breakup

@router.put("/breakup/{breakup_id}", response_model=PaymentBreakup)
def update_payment_breakup(breakup_id: int, breakup_update: PaymentBreakupCreate, db: Session = Depends(get_db)):
    breakup = db.query(PaymentBreakup).get(breakup_id)
    if not breakup:
        raise HTTPException(status_code=404, detail="Payment Breakup not found")
    for field, value in breakup_update.dict(exclude_unset=True).items():
        setattr(breakup, field, value)
    db.commit()
    db.refresh(breakup)
    return breakup

@router.delete("/breakup/{breakup_id}")
def delete_payment_breakup(breakup_id: int, db: Session = Depends(get_db)):
    breakup = db.query(PaymentBreakup).get(breakup_id)
    if not breakup:
        raise HTTPException(status_code=404, detail="Payment Breakup not found")
    db.delete(breakup)
    db.commit()
    return {"detail": "Payment Breakup deleted"}
