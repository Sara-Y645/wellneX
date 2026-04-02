// frontend/src/config/labConfig.ts

export type LabConfigItem = {
  key: string;
  label: string;
  unit: string;
  category: string;
};

export const LAB_CONFIG: LabConfigItem[] = [
  {
    key: "creatinine",
    label: "Creatinine",
    unit: "mg/dL",
    category: "RFT",
  },
  {
    key: "hba1c",
    label: "HbA1c",
    unit: "%",
    category: "Sugar",
  },
  {
    key: "ldl",
    label: "LDL Cholesterol",
    unit: "mg/dL",
    category: "Lipid",
  },
  {
    key: "tsh",
    label: "TSH",
    unit: "µIU/mL",
    category: "Thyroid",
  },
  {
    key: "hemoglobin",
    label: "Hemoglobin",
    unit: "g/dL",
    category: "CBC",
  },
];