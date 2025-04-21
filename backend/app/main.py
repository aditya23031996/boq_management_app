from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
import mysql.connector

app = FastAPI()

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

@app.post("/save-boq/")
async def save_boq(categories: List[Category]):
    try:
        # Connect to MySQL
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="yourpassword",
            database="boq_db"
        )
        cursor = conn.cursor()

        for cat in categories:
            cursor.execute("INSERT INTO categories (id, name) VALUES (%s, %s)", (cat.categoryId, cat.categoryName))
            for sub in cat.subCategories:
                cursor.execute("INSERT INTO subcategories (id, category_id, name) VALUES (%s, %s, %s)",
                               (sub.subCategoryId, cat.categoryId, sub.subCategoryName))
                for item in sub.items:
                    cursor.execute("""INSERT INTO items (id, sub_category_id, description, unit, quantity, rate)
                                      VALUES (%s, %s, %s, %s, %s, %s)""",
                                   (item.itemId, sub.subCategoryId, item.description, item.unit, item.quantity, item.rate))
                    for breakup in item.breakups:
                        cursor.execute("INSERT INTO breakups (item_id, name, percentage) VALUES (%s, %s, %s)",
                                       (item.itemId, breakup.name, breakup.percentage))
                    for subitem in item.subItems:
                        cursor.execute("""INSERT INTO sub_items (id, parent_item_id, description, unit, quantity, rate, total_amount)
                                          VALUES (%s, %s, %s, %s, %s, %s, %s)""",
                                       (subitem.itemId, item.itemId, subitem.description, subitem.unit, subitem.quantity, subitem.rate, subitem.totalAmount))
                        for sub_breakup in subitem.breakups:
                            cursor.execute("INSERT INTO breakups (item_id, sub_item_id, name, percentage) VALUES (%s, %s, %s, %s)",
                                           (item.itemId, subitem.itemId, sub_breakup.name, sub_breakup.percentage))

        conn.commit()
        cursor.close()
        conn.close()

        return {"message": "BoQ saved successfully!"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
