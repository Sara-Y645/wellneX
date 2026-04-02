import json
from pathlib import Path


class LabRuleEngine:
    def __init__(self):
        self.parameter_map = {}
        self._load_rules()

    def _load_rules(self):
        rules_dir = Path(__file__).resolve().parents[1] / "rules" / "lab_rules"

        for rule_file in rules_dir.glob("*.json"):
            category = rule_file.stem  # cbc, lft, etc.

            with open(rule_file, "r") as f:
                rules = json.load(f)

            for parameter, rule_def in rules.items():
                if parameter in self.parameter_map:
                    raise ValueError(
                        f"Duplicate rule found for parameter: {parameter}"
                    )

                self.parameter_map[parameter] = {
                    "category": category,
                    "rules": rule_def
                }

    def _get_age_group(self, age: int) -> str:
        if age <= 12:
            return "child"
        elif age < 60:
            return "adult"
        else:
            return "elderly"

    def evaluate(self, parameter: str, value: float, age: int, gender: str) -> dict:
        gender = gender.lower()

        if parameter not in self.parameter_map:
            raise ValueError(f"No rules found for parameter: {parameter}")

        rule_entry = self.parameter_map[parameter]
        rules = rule_entry["rules"]
        category = rule_entry["category"]

        age_group = self._get_age_group(age)

        normal_min, normal_max = (
            rules["ranges"][age_group][gender]["normal"]
        )

        if value < normal_min:
            status = "low"
        elif value > normal_max:
            status = "high"
        else:
            status = "normal"

        severity = None
        if status in rules["flags"]:
            for level, bounds in rules["flags"][status]["severity"].items():
                if isinstance(bounds[0], str):
                    op, threshold = bounds[0].split()
                    threshold = float(threshold)

                    if op == "<" and value < threshold:
                        severity = level
                    elif op == ">" and value > threshold:
                        severity = level
                else:
                    low, high = bounds
                    if low <= value <= high:
                        severity = level

        return {
            "parameter": parameter,
            "category": category,
            "value": value,
            "unit": rules.get("unit"),
            "age": age,
            "age_group": age_group,
            "gender": gender,
            "status": status,
            "severity": severity
        }