from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class PaymentBreakupBase(BaseModel):
    description: str
    percentage: float

class PaymentBreakupCreate(PaymentBreakupBase):
    pass

class PaymentBreakup(PaymentBreakupBase):
    payment_breakup_id: int
    boq_item_id: int
    created_at: datetime
    updated_at: datetime
    class Config:
        orm_mode = True

class BOQItemBase(BaseModel):
    boq_id: int
    parent_item_id: Optional[int] = None
    wbs_id: Optional[str] = None
    category1: Optional[str] = None
    category2: Optional[str] = None
    category3: Optional[str] = None
    description: str = Field(..., min_length=1, max_length=500)
    uom: str
    scope_quantity: Optional[float] = None
    sor: float
    total_amount: Optional[float] = None
    notes: Optional[str] = None
    subItems: Optional[List['BOQItemCreate']] = []
    paymentBreakups: Optional[List[PaymentBreakupCreate]] = []

class BOQItemCreate(BOQItemBase):
    pass

class BOQItemUpdate(BOQItemBase):
    pass

class BOQItem(BOQItemBase):
    boq_item_id: int
    created_at: datetime
    updated_at: datetime
    subItems: List['BOQItem'] = []
    paymentBreakups: List[PaymentBreakup] = []
    class Config:
        orm_mode = True

class BOQBase(BaseModel):
    project_id: int
    title: str = Field(..., min_length=1, max_length=255)
    description: str
    billing_completed: Optional[str] = ""
    work_completed: Optional[str] = ""

class BOQCreate(BOQBase):
    items: List[BOQItemCreate]

class BOQUpdate(BOQBase):
    items: Optional[List[BOQItemCreate]] = None

class BOQ(BOQBase):
    boq_id: int
    total_amount: float
    items: List[BOQItem]
    created_at: datetime
    updated_at: datetime
    class Config:
        orm_mode = True

BOQItemCreate.update_forward_refs()
BOQItem.update_forward_refs() 