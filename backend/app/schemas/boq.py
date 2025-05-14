from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class PaymentBreakupBase(BaseModel):
    description: str
    percentage: float

class PaymentBreakupCreate(PaymentBreakupBase):
    pass

class PaymentBreakup(PaymentBreakupBase):
    id: int
    boq_item_id: int
    created_at: datetime
    updated_at: datetime
    class Config:
        orm_mode = True

class BOQItemBase(BaseModel):
    wbs_id: Optional[str] = None
    category1: Optional[str] = None
    category2: Optional[str] = None
    category3: Optional[str] = None
    description: str = Field(..., min_length=1, max_length=500)
    uom: Optional[str] = None
    scope_quantity: Optional[float] = None
    sor: Optional[float] = None
    total_amount: Optional[float] = None
    notes: Optional[str] = None
    subItems: Optional[List['BOQItemCreate']] = []
    paymentBreakups: Optional[List[PaymentBreakupCreate]] = []

class BOQItemCreate(BOQItemBase):
    pass

class BOQItemUpdate(BOQItemBase):
    pass

class BOQItem(BOQItemBase):
    id: int
    boq_id: int
    parent_item_id: Optional[int] = None
    created_at: datetime
    updated_at: datetime
    subItems: List['BOQItem'] = []
    paymentBreakups: List[PaymentBreakup] = []
    class Config:
        orm_mode = True

class BOQBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    project_id: int

class BOQCreate(BOQBase):
    items: List[BOQItemCreate]

class BOQUpdate(BOQBase):
    items: Optional[List[BOQItemCreate]] = None

class BOQ(BOQBase):
    id: int
    total_amount: float
    items: List[BOQItem]
    created_at: datetime
    updated_at: datetime
    class Config:
        orm_mode = True

BOQItemCreate.update_forward_refs()
BOQItem.update_forward_refs() 