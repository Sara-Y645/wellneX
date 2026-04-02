import json
import re
from pathlib import Path


class RadiologyInterpreter:
    def __init__(self):
        self.rules = {}
        self.disclaimer = None
        self._load_rules()

    def _load_rules(self):
        """
        Loads all radiology rules from subfolders:
        neuro, cardio, musculoskeletal, gastro, renal, gyno
        """
        base_dir = Path(__file__).resolve().parents[1] / "rules" / "radiology_rules"

        # Load disclaimer
        with open(base_dir / "disclaimers.json", "r") as f:
            self.disclaimer = json.load(f)["default"]

        # Load system-based findings
        for system_dir in base_dir.iterdir():
            if not system_dir.is_dir():
                continue
            if system_dir.name in ["__pycache__"]:
                continue

            findings_file = system_dir / "findings.json"
            if not findings_file.exists():
                continue

            with open(findings_file, "r") as f:
                findings = json.load(f)

            for phrase, rule in findings.items():
                self.rules[phrase] = {
                    "system": system_dir.name,
                    "rule": rule
                }

    def _extract_size(self, text: str):
        """
        Extracts size like '4.2 cm' or '32 mm'
        """
        match = re.search(r"(\d+(?:\.\d+)?)\s*(cm|mm)", text)
        if not match:
            return None

        value = float(match.group(1))
        unit = match.group(2)

        if unit == "mm":
            value = value / 10  # convert to cm

        return round(value, 2)

    def _extract_laterality(self, text: str):
        if "left" in text:
            return "left"
        if "right" in text:
            return "right"
        if "bilateral" in text:
            return "bilateral"
        return None

    def interpret(self, report_text: str) -> dict:
        text = report_text.lower()
        results = []

        for phrase, entry in self.rules.items():
            if phrase in text:
                rule = entry["rule"]

                result = {
                    "system": entry["system"],
                    "finding": phrase,
                    "severity": rule.get("severity"),
                    "category": rule.get("category"),
                    "explanation": rule.get("base_explanation"),
                    "follow_up_note": rule.get("follow_up_note")
                }

                size = self._extract_size(text)
                if size:
                    result["size_cm"] = size

                laterality = self._extract_laterality(text)
                if laterality:
                    result["location"] = laterality

                results.append(result)

        return {
            "count": len(results),
            "results": results,
            "disclaimer": self.disclaimer
        }