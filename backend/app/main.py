from fastapi import FastAPI
from app.routers import boq_router

app = FastAPI()

app.include_router(boq_router.router)
