from fastapi import APIRouter, HTTPException, Request
from typing import List
from ..schemas.boq_schema import Category
from ..services.boq_services import save_boq_data, get_boq_data

router = APIRouter()

@router.post("/save-boq/")
async def save_boq(request: Request):
    try:
        body = await request.json()
        print("🔥 Incoming JSON:\n", body)
        from ..schemas.boq_schema import Category
        categories = [Category(**c) for c in body]  # This will show exact schema issues
        return save_boq_data(categories)
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=422, detail=str(e))

@router.get("/get-boq/")
def get_boq():
    return get_boq_data()

@router.get("/ping-db")
def ping_database():
    try:
        from ..services.boq_services import get_db
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("SELECT 1")
        return {"status": "success", "message": "Database connected!"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
