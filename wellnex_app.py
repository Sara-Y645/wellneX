import streamlit as st
import pandas as pd
from datetime import datetime

# 🧠 App Config
st.set_page_config(page_title="Wellnex", layout="centered")
st.title("🧠 WELLNEX: AI Lab Report & Wellness Simplifier")
st.markdown("Welcome! This app helps you understand your lab test results and offers simple wellness tips based on your report values.")

# 🔢 Input Sections
with st.expander("🩸 General Health Check"):
    hb = st.number_input("Hemoglobin (g/dL)", min_value=0.0, max_value=25.0, step=0.1)
    wbc = st.number_input("WBC Count (x10³/µL)", min_value=0.0, max_value=50.0, step=0.1)
    esr = st.number_input("ESR (mm/hr)", min_value=0.0, max_value=100.0, step=0.5)
    crp = st.number_input("C-Reactive Protein (mg/L)", min_value=0.0, max_value=100.0, step=0.1)

with st.expander("🧬 Basic Metabolic Panel (BMP)"):
    glucose = st.number_input("Glucose - Fasting (mg/dL)", min_value=0, max_value=500, step=1)
    calcium = st.number_input("Calcium (mg/dL)", min_value=0.0, max_value=15.0, step=0.1)
    sodium = st.number_input("Sodium (mEq/L)", min_value=100, max_value=170, step=1)
    potassium = st.number_input("Potassium (mEq/L)", min_value=2.0, max_value=8.0, step=0.1)
    creatinine = st.number_input("Creatinine (mg/dL)", min_value=0.0, max_value=5.0, step=0.1)
    bun = st.number_input("BUN (mg/dL)", min_value=0.0, max_value=100.0, step=1.0)

with st.expander("🍬 Diabetes Panel"):
    ppbs = st.number_input("Postprandial Blood Sugar (mg/dL)", min_value=0, max_value=500, step=1)
    hba1c = st.number_input("HbA1c (%)", min_value=0.0, max_value=15.0, step=0.1)

# 🧠 Analyzer Logic
explanations = []
tips = []

if st.button("🧠 Analyze My Report"):
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Hemoglobin
    if hb:
        if hb < 12:
            explanations.append(f"Hemoglobin low ({hb} g/dL): May indicate anemia.")
            tips.append("💡 Add iron-rich foods like spinach, legumes, red meat.")
        elif hb > 17.5:
            explanations.append(f"Hemoglobin high ({hb} g/dL): Possible dehydration or other causes.")
            tips.append("💡 Ensure proper hydration, recheck if symptoms persist.")
        else:
            explanations.append(f"Hemoglobin is normal ({hb} g/dL).")

    # WBC
    if wbc:
        if wbc < 4.0:
            explanations.append(f"WBC low ({wbc}): Risk of infection or bone marrow suppression.")
            tips.append("💡 Discuss with doctor; ensure adequate nutrition.")
        elif wbc > 11.0:
            explanations.append(f"WBC high ({wbc}): May indicate infection or inflammation.")
            tips.append("💡 Monitor symptoms, stay hydrated.")
        else:
            explanations.append(f"WBC is normal ({wbc}).")

    # CRP
    if crp:
        if crp > 10:
            explanations.append(f"CRP elevated ({crp} mg/L): Significant inflammation or infection.")
            tips.append("💡 Follow up with further evaluation.")
        else:
            explanations.append(f"CRP is normal ({crp} mg/L).")

    # Glucose
    if glucose:
        if glucose < 70:
            explanations.append(f"Fasting glucose low ({glucose} mg/dL): Hypoglycemia risk.")
            tips.append("💡 Don’t skip meals. Add balanced carbs.")
        elif glucose > 125:
            explanations.append(f"Fasting glucose high ({glucose} mg/dL): Possible diabetes.")
            tips.append("💡 Cut sugar, walk after meals, check HbA1c.")
        else:
            explanations.append(f"Glucose is normal ({glucose} mg/dL).")

    # HbA1c
    if hba1c:
        if hba1c >= 6.5:
            explanations.append(f"HbA1c high ({hba1c}%): Confirms diabetes.")
            tips.append("💡 Follow diabetic-friendly diet, reduce sugar.")
        elif hba1c >= 5.7:
            explanations.append(f"HbA1c borderline ({hba1c}%): Prediabetes.")
            tips.append("💡 Manage carbs, exercise regularly.")
        else:
            explanations.append(f"HbA1c is normal ({hba1c}%).")

    # 🖥️ Display results
    st.markdown("### 🔍 Analysis")
    for e in explanations:
        st.info(e)

    if tips:
        st.markdown("### 🌿 Wellness Tips")
        for t in tips:
            st.success(t)

    # Optional: Save to CSV
    try:
        entry = pd.DataFrame([[now, hb, wbc, esr, crp, glucose, calcium, sodium,
                               potassium, creatinine, bun, ppbs, hba1c]],
                             columns=["Timestamp", "Hemoglobin", "WBC", "ESR", "CRP",
                                      "Glucose", "Calcium", "Sodium", "Potassium",
                                      "Creatinine", "BUN", "PPBS", "HbA1c"])
        history = pd.read_csv("data/report_log.csv")
        updated = pd.concat([history, entry], ignore_index=True)
    except:
        updated = pd.DataFrame([[now, hb, wbc, esr, crp, glucose, calcium, sodium,
                               potassium, creatinine, bun, ppbs, hba1c]],
                             columns=["Timestamp", "Hemoglobin", "WBC", "ESR", "CRP",
                                      "Glucose", "Calcium", "Sodium", "Potassium",
                                      "Creatinine", "BUN", "PPBS", "HbA1c"])
    
    # Create data folder and save
    import os
    os.makedirs("data", exist_ok=True)
    updated.to_csv("data/report_log.csv", index=False)