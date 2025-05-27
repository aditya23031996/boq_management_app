from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.user import User
from app.schemas.user_schema import UserCreate, UserResponse, UserLogin, UserUpdate
from passlib.hash import bcrypt
from jose import jwt
import os

SECRET_KEY = os.getenv("SECRET_KEY", "supersecret")  # Use a secure key in production

router = APIRouter(
    prefix="/user",
    tags=["Users"]
)

@router.get("/", response_model=List[UserResponse])
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    return users

@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

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

@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not bcrypt.verify(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    # Create JWT token
    token_data = {"sub": str(db_user.id)}
    token = jwt.encode(token_data, SECRET_KEY, algorithm="HS256")
    return {"token": token, "user": {
        "id": db_user.id,
        "email": db_user.email,
        "first_name": db_user.first_name,
        "last_name": db_user.last_name,
        # ...other fields...
    }}

@router.put("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db)):
    user = db.query(User).get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user_update.first_name is not None:
        user.first_name = user_update.first_name
    if user_update.last_name is not None:
        user.last_name = user_update.last_name
    if user_update.email is not None:
        existing_user = db.query(User).filter(User.email == user_update.email, User.id != user_id).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already registered to another user")
        user.email = user_update.email
    if user_update.password is not None:
        user.password = bcrypt.hash(user_update.password)
    if user_update.company_name is not None:
        user.company_name = user_update.company_name
    if user_update.company_gst is not None:
        user.company_gst = user_update.company_gst

    db.commit()
    db.refresh(user)
    return user

@router.delete("/{user_id}", response_model=UserResponse)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return user

@router.delete("/", response_model=List[UserResponse])
def delete_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    for user in users:
        db.delete(user)
    db.commit()
    return users

