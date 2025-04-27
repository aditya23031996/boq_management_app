from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database.connection import Base, get_db
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserResponse
from passlib.hash import bcrypt

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = bcrypt.hash(user.password)

    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        password=hashed_password,
        company_name=user.company_name,
        company_gst=user.company_gst
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user
