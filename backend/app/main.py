from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import mysql.connector
import uuid

app = FastAPI()
router = APIRouter()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# Pydantic Schemas
# ---------------------------
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

class Item(BaseModel):
    itemId: str
    description: str
    unit: str
    quantity: float
    rate: float
    breakups: List[Breakup]
    subItems: List[SubItem]

class SubCategory(BaseModel):
    subCategoryId: str
    subCategoryName: str
    items: List[Item]

class Category(BaseModel):
    categoryId: str
    categoryName: str
    subCategories: List[SubCategory]

# ---------------------------
# Database Connection Helper
# ---------------------------
def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="abcABC123!@#",
        database="boq_management_db"
    )

# ---------------------------
# Save BoQ Data
# ---------------------------
@router.post("/save-boq/")
async def save_boq(categories: List[Category]):
    try:
        conn = get_db()
        cursor = conn.cursor()

        for cat in categories:
            cursor.execute("INSERT INTO categories (id, name) VALUES (%s, %s)", (cat.categoryId, cat.categoryName))
            for sub in cat.subCategories:
                cursor.execute("INSERT INTO subcategories (id, category_id, name) VALUES (%s, %s, %s)",
                               (sub.subCategoryId, cat.categoryId, sub.subCategoryName))
                for item in sub.items:
                    cursor.execute("""
                        INSERT INTO items (id, sub_category_id, description, unit, quantity, rate)
                        VALUES (%s, %s, %s, %s, %s, %s)
                    """, (item.itemId, sub.subCategoryId, item.description, item.unit, item.quantity, item.rate))

                    for breakup in item.breakups:
                        cursor.execute("INSERT INTO breakups (item_id, name, percentage) VALUES (%s, %s, %s)",
                                       (item.itemId, breakup.name, breakup.percentage))

                    for subitem in item.subItems:
                        cursor.execute("""
                            INSERT INTO sub_items (id, parent_item_id, description, unit, quantity, rate, total_amount)
                            VALUES (%s, %s, %s, %s, %s, %s, %s)
                        """, (subitem.itemId, item.itemId, subitem.description, subitem.unit, subitem.quantity, subitem.rate, subitem.totalAmount))

                        for sub_breakup in subitem.breakups:
                            cursor.execute("INSERT INTO breakups (item_id, sub_item_id, name, percentage) VALUES (%s, %s, %s, %s)",
                                           (item.itemId, subitem.itemId, sub_breakup.name, sub_breakup.percentage))

        conn.commit()
        cursor.close()
        conn.close()

        return {"message": "BoQ saved successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ---------------------------
# Get BoQ Data
# ---------------------------
@router.get("/get-boq/")
def get_boq():
    try:
        conn = get_db()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM categories")
        categories = cursor.fetchall()

        boq = []
        for cat in categories:
            cursor.execute("SELECT * FROM subcategories WHERE category_id = %s", (cat['id'],))
            subcategories = cursor.fetchall()

            subcat_list = []
            for sub in subcategories:
                cursor.execute("SELECT * FROM items WHERE sub_category_id = %s", (sub['id'],))
                items = cursor.fetchall()

                item_list = []
                for item in items:
                    cursor.execute("SELECT * FROM breakups WHERE item_id = %s AND sub_item_id IS NULL", (item['id'],))
                    breakups = cursor.fetchall()

                    cursor.execute("SELECT * FROM sub_items WHERE parent_item_id = %s", (item['id'],))
                    sub_items = cursor.fetchall()

                    sub_item_list = []
                    for sub_item in sub_items:
                        cursor.execute("SELECT * FROM breakups WHERE sub_item_id = %s", (sub_item['id'],))
                        sub_breakups = cursor.fetchall()
                        sub_item['breakups'] = sub_breakups
                        sub_item_list.append(sub_item)

                    item['breakups'] = breakups
                    item['subItems'] = sub_item_list
                    item_list.append(item)

                sub['items'] = item_list
                subcat_list.append(sub)

            cat['subCategories'] = subcat_list
            boq.append(cat)

        return boq
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ---------------------------
# Register Routes
# ---------------------------
app.include_router(router)
