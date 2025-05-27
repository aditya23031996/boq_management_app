from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database.config import engine, Base
from app.routers.boq_router import router as boq_router
from app.routers.user_router import router as user_router
from app.routers.project_router import router as project_router
from app.routers.boq_item_router import router as boq_item_router
from app.routers.boq_subitem_router import router as boq_subitem_router
from app.routers.payment_breakup_router import router as payment_breakup_router

# Explicitly import all models so SQLAlchemy knows about them
from app.models.project import Project
from app.models.boq import BOQ
from app.models.user import User

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="BOQ Management API",
    description="API for managing Bill of Quantities",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(boq_router)
app.include_router(user_router)
app.include_router(project_router)
app.include_router(boq_item_router)
app.include_router(boq_subitem_router)
app.include_router(payment_breakup_router)

@app.get("/")
def root():
    return {
        "message": "BOQ Management API",
        "version": "1.0.0",
        "documentation": "/docs"
    }
