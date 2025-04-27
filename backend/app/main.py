from fastapi import FastAPI
from app.routers import boq_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

@app.get("/")
def root():
    return {"message": "Backend is live"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Or ["*"] for all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(boq_router.router)