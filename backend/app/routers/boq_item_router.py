from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.boq import BOQItem
from app.schemas.boq import BOQItem as BOQItemSchema, BOQItemCreate, BOQItemUpdate
from typing import List

router = APIRouter(
    prefix="/boqItem",
    tags=["BOQ Item"]
)

@router.post("/{boq_id}", response_model=BOQItemSchema)
def create_boq_item(boq_id: int, item: BOQItemCreate, db: Session = Depends(get_db)):
    db_item = BOQItem(
        boq_id=boq_id,
        **item.dict(exclude_unset=True)
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/{boq_id}", response_model=List[BOQItemSchema])
def get_boq_items(boq_id: int, db: Session = Depends(get_db)):
    return db.query(BOQItem).filter(BOQItem.boq_id == boq_id, BOQItem.parent_item_id == None).all()

@router.get("/{boq_id}/{boq_item_id}", response_model=BOQItemSchema)
def get_boq_item(boq_id: int, boq_item_id: int, db: Session = Depends(get_db)):
    item = db.query(BOQItem).filter(BOQItem.boq_id == boq_id, BOQItem.id == boq_item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="BOQ Item not found")
    return item

@router.put("/{boq_id}/{boq_item_id}", response_model=BOQItemSchema)
def update_boq_item(boq_id: int, boq_item_id: int, item_update: BOQItemUpdate, db: Session = Depends(get_db)):
    item = db.query(BOQItem).filter(BOQItem.boq_id == boq_id, BOQItem.id == boq_item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="BOQ Item not found")
    for field, value in item_update.dict(exclude_unset=True).items():
        setattr(item, field, value)
    db.commit()
    db.refresh(item)
    return item

@router.delete("/{boq_id}/{boq_item_id}")
def delete_boq_item(boq_id: int, boq_item_id: int, db: Session = Depends(get_db)):
    item = db.query(BOQItem).filter(BOQItem.boq_id == boq_id, BOQItem.id == boq_item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="BOQ Item not found")
    db.delete(item)
    db.commit()
    return {"detail": "BOQ Item deleted"}

@router.delete("/{boq_id}")
def delete_all_boq_items(boq_id: int, db: Session = Depends(get_db)):
    items = db.query(BOQItem).filter(BOQItem.boq_id == boq_id).all()
    for item in items:
        db.delete(item)
    db.commit()
    return {"detail": "All BOQ Items deleted for BOQ"} 