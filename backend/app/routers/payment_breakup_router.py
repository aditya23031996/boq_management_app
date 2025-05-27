from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.boq import PaymentBreakup
from app.schemas.boq import PaymentBreakup as PaymentBreakupSchema, PaymentBreakupCreate
from typing import List

router = APIRouter(
    prefix="/paymentBreakup",
    tags=["Payment Breakup"]
)

@router.post("/{boq_item_id}", response_model=PaymentBreakupSchema)
def create_payment_breakup(boq_item_id: int, breakup: PaymentBreakupCreate, db: Session = Depends(get_db)):
    db_breakup = PaymentBreakup(
        boq_item_id=boq_item_id,
        **breakup.dict(exclude_unset=True)
    )
    db.add(db_breakup)
    db.commit()
    db.refresh(db_breakup)
    return db_breakup

@router.get("/{boq_item_id}", response_model=List[PaymentBreakupSchema])
def get_payment_breakups(boq_item_id: int, db: Session = Depends(get_db)):
    return db.query(PaymentBreakup).filter(PaymentBreakup.boq_item_id == boq_item_id).all()

@router.get("/{boq_item_id}/{payment_breakup_id}", response_model=PaymentBreakupSchema)
def get_payment_breakup(boq_item_id: int, payment_breakup_id: int, db: Session = Depends(get_db)):
    breakup = db.query(PaymentBreakup).filter(PaymentBreakup.boq_item_id == boq_item_id, PaymentBreakup.id == payment_breakup_id).first()
    if not breakup:
        raise HTTPException(status_code=404, detail="Payment Breakup not found")
    return breakup

@router.put("/{boq_item_id}/{payment_breakup_id}", response_model=PaymentBreakupSchema)
def update_payment_breakup(boq_item_id: int, payment_breakup_id: int, breakup_update: PaymentBreakupCreate, db: Session = Depends(get_db)):
    breakup = db.query(PaymentBreakup).filter(PaymentBreakup.boq_item_id == boq_item_id, PaymentBreakup.id == payment_breakup_id).first()
    if not breakup:
        raise HTTPException(status_code=404, detail="Payment Breakup not found")
    for field, value in breakup_update.dict(exclude_unset=True).items():
        setattr(breakup, field, value)
    db.commit()
    db.refresh(breakup)
    return breakup

@router.delete("/{boq_item_id}/{payment_breakup_id}")
def delete_payment_breakup(boq_item_id: int, payment_breakup_id: int, db: Session = Depends(get_db)):
    breakup = db.query(PaymentBreakup).filter(PaymentBreakup.boq_item_id == boq_item_id, PaymentBreakup.id == payment_breakup_id).first()
    if not breakup:
        raise HTTPException(status_code=404, detail="Payment Breakup not found")
    db.delete(breakup)
    db.commit()
    return {"detail": "Payment Breakup deleted"}

@router.delete("/{boq_item_id}")
def delete_all_payment_breakups(boq_item_id: int, db: Session = Depends(get_db)):
    breakups = db.query(PaymentBreakup).filter(PaymentBreakup.boq_item_id == boq_item_id).all()
    for breakup in breakups:
        db.delete(breakup)
    db.commit()
    return {"detail": "All Payment Breakups deleted for item"} 