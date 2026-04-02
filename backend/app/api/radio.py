from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.engines.radiology_interpreter import RadiologyInterpreter

router = APIRouter()
interpreter = RadiologyInterpreter()


class RadiologyRequest(BaseModel):
    report_text: str


@router.post("/interpret")
def interpret_radiology(data: RadiologyRequest):
    try:
        return interpreter.interpret(data.report_text)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))