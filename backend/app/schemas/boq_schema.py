from pydantic import BaseModel
from typing import List, Optional

class Breakup(BaseModel):
    name: str
    percentage: float

class SubItem(BaseModel):
    itemId: str
    description: str
    unit: str
    quantity: float
    rate: float
    breakups: List[Breakup]
    totalAmount: float
    status: Optional[str] = "Not Started"

class Item(BaseModel):
    itemId: str
    description: str
    unit: str
    quantity: float
    rate: float
    breakups: List[Breakup]
    subItems: List[SubItem]
    status: Optional[str] = "Not Started"

class SubCategory(BaseModel):
    subCategoryId: str
    subCategoryName: str
    items: List[Item]

class Category(BaseModel):
    categoryId: str
    categoryName: str
    projectId: str
    subCategories: List[SubCategory]
