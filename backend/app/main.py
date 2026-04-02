from fastapi import FastAPI

from app.api import lab, radio

app = FastAPI(
    title="Wellnex API",
    description="Backend API for lab and radiology interpretation",
    version="1.0.0"
)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Lab APIs
app.include_router(
    lab.router,
    prefix="/api/labs",
    tags=["Labs"]
)

# Radiology APIs
app.include_router(
    radio.router,
    prefix="/api/radio",
    tags=["Radiology"]
)


@app.get("/")
def root():
    return {"status": "Wellnex backend running"}