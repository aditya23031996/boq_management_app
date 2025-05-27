from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.boq import BOQItem
from app.schemas.boq import BOQItem as BOQItemSchema, BOQItemCreate, BOQItemUpdate
from typing import List

router = APIRouter(
    prefix="/boqSubitem",
    tags=["BOQ Subitem"]
)

@router.post("/{boq_item_id}", response_model=BOQItemSchema)
def create_boq_subitem(boq_item_id: int, subitem: BOQItemCreate, db: Session = Depends(get_db)):
    db_subitem = BOQItem(
        parent_item_id=boq_item_id,
        boq_id=subitem.boq_id,
        **subitem.dict(exclude_unset=True)
    )
    db.add(db_subitem)
    db.commit()
    db.refresh(db_subitem)
    return db_subitem

@router.get("/{boq_item_id}", response_model=List[BOQItemSchema])
def get_boq_subitems(boq_item_id: int, db: Session = Depends(get_db)):
    return db.query(BOQItem).filter(BOQItem.parent_item_id == boq_item_id).all()

@router.get("/{boq_item_id}/{boq_subitem_id}", response_model=BOQItemSchema)
def get_boq_subitem(boq_item_id: int, boq_subitem_id: int, db: Session = Depends(get_db)):
    subitem = db.query(BOQItem).filter(BOQItem.parent_item_id == boq_item_id, BOQItem.id == boq_subitem_id).first()
    if not subitem:
        raise HTTPException(status_code=404, detail="BOQ Subitem not found")
    return subitem

@router.put("/{boq_item_id}/{boq_subitem_id}", response_model=BOQItemSchema)
def update_boq_subitem(boq_item_id: int, boq_subitem_id: int, subitem_update: BOQItemUpdate, db: Session = Depends(get_db)):
    subitem = db.query(BOQItem).filter(BOQItem.parent_item_id == boq_item_id, BOQItem.id == boq_subitem_id).first()
    if not subitem:
        raise HTTPException(status_code=404, detail="BOQ Subitem not found")
    for field, value in subitem_update.dict(exclude_unset=True).items():
        setattr(subitem, field, value)
    db.commit()
    db.refresh(subitem)
    return subitem

@router.delete("/{boq_item_id}/{boq_subitem_id}")
def delete_boq_subitem(boq_item_id: int, boq_subitem_id: int, db: Session = Depends(get_db)):
    subitem = db.query(BOQItem).filter(BOQItem.parent_item_id == boq_item_id, BOQItem.id == boq_subitem_id).first()
    if not subitem:
        raise HTTPException(status_code=404, detail="BOQ Subitem not found")
    db.delete(subitem)
    db.commit()
    return {"detail": "BOQ Subitem deleted"}

@router.delete("/{boq_item_id}")
def delete_all_boq_subitems(boq_item_id: int, db: Session = Depends(get_db)):
    subitems = db.query(BOQItem).filter(BOQItem.parent_item_id == boq_item_id).all()
    for subitem in subitems:
        db.delete(subitem)
    db.commit()
    return {"detail": "All BOQ Subitems deleted for item"} 