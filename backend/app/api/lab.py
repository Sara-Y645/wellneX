from fastapi import APIRouter, HTTPException
from app.engines.lab_rule_engine import LabRuleEngine
from typing import List
from pydantic import BaseModel

router = APIRouter()
engine = LabRuleEngine()


class LabItem(BaseModel):
    parameter: str
    value: float
    age: int
    gender: str


@router.post("/evaluate")
def evaluate_lab(item: LabItem):
    try:
        return engine.evaluate(
            parameter=item.parameter,
            value=item.value,
            age=item.age,
            gender=item.gender
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/evaluate/batch")
def evaluate_lab_batch(items: List[LabItem]):
    results = []

    for item in items:
        try:
            result = engine.evaluate(
                parameter=item.parameter,
                value=item.value,
                age=item.age,
                gender=item.gender
            )
            results.append(result)
        except ValueError as e:
            results.append({
                "parameter": item.parameter,
                "error": str(e)
            })

    return {
        "count": len(results),
        "results": results
    }