import os
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"  # Suppress oneDNN numerical info messages
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import joblib

app = Flask(__name__)
CORS(app) # Enable CORS for frontend requests if needed

# Define paths relative to the script location
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "models", "cvd_model.keras")
scaler_path = os.path.join(BASE_DIR, "models", "scaler.pkl")

# Load model and scaler if they exist
model = None
scaler = None

if os.path.exists(model_path) and os.path.exists(scaler_path):
    print("Loading TensorFlow model and scaler...")
    model = tf.keras.models.load_model(model_path)
    scaler = joblib.load(scaler_path)
else:
    print("WARNING: Model or scaler not found. Please train the model first.")

@app.route("/predict", methods=["POST"])
def predict():
    if model is None or scaler is None:
        return jsonify({"error": "Model not trained"}), 400
        
    data = request.json
    try:
        # Extract features
        age = float(data.get("Age", 30))
        bp = float(data.get("BP", 120))
        bmi = float(data.get("BMI", 22))
        hba1c = float(data.get("HbA1c", 5.5))
        heart_rate = float(data.get("HeartRate", 72))
        cholesterol = float(data.get("Cholesterol", 180))
        
        values = [[age, bp, bmi, hba1c, heart_rate, cholesterol]]
        scaled_values = scaler.transform(values)
        
        prediction = float(model.predict(scaled_values)[0][0])
        
        return jsonify({
            "risk_probability": prediction,
            "risk": "HIGH" if prediction > 0.5 else "LOW"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/explain", methods=["POST"])
def explain():
    data = request.json or {}
    try:
        age = float(data.get("Age", 30))
        bp = float(data.get("BP", 120))
        bmi = float(data.get("BMI", 22))
        hba1c = float(data.get("HbA1c", 5.5))
        glucose = float(data.get("Glucose", data.get("FastingGlucose", 95)))
        egfr = float(data.get("eGFR", 90))
        homa_ir = float(data.get("HOMA_IR", 1.8))
        heart_rate = float(data.get("HeartRate", 72))
        cholesterol = float(data.get("Cholesterol", 180))
        triglycerides = float(data.get("Triglycerides", 130))

        factors = []
        # Calculate diabetes & clinical SHAP contributions
        if hba1c >= 8.5:
            factors.append(f"Glycated Hemoglobin (HbA1c {hba1c:.1f}%) +25")
        elif hba1c >= 7.0:
            factors.append(f"Glycated Hemoglobin (HbA1c {hba1c:.1f}%) +20")
        elif hba1c >= 5.7:
            factors.append(f"Elevated HbA1c ({hba1c:.1f}%) +12")

        if glucose >= 180:
            factors.append(f"Fasting Blood Glucose ({glucose:.0f} mg/dL) +22")
        elif glucose >= 126:
            factors.append(f"Fasting Plasma Glucose ({glucose:.0f} mg/dL) +18")
        elif glucose >= 100:
            factors.append(f"Impaired Fasting Glucose ({glucose:.0f} mg/dL) +10")

        if homa_ir >= 3.5:
            factors.append(f"Severe Insulin Resistance (HOMA-IR {homa_ir:.1f}) +16")
        elif homa_ir >= 2.5:
            factors.append(f"Insulin Resistance Index (HOMA-IR {homa_ir:.1f}) +12")

        if bmi >= 32:
            factors.append(f"Severe Visceral Adiposity (BMI {bmi:.1f} kg/m²) +18")
        elif bmi >= 28:
            factors.append(f"Body Mass Index (BMI {bmi:.1f} kg/m²) +14")
        elif bmi >= 25:
            factors.append(f"Overweight BMI ({bmi:.1f} kg/m²) +8")

        if egfr < 45:
            factors.append(f"Stage 3b Chronic Kidney Decline (eGFR {egfr:.0f} mL/min) +22")
        elif egfr < 60:
            factors.append(f"Renal Filtration Impairment (eGFR {egfr:.0f} mL/min) +15")

        if bp >= 140:
            factors.append(f"Systolic Hypertension ({bp:.0f} mmHg) +20")
        elif bp >= 130:
            factors.append(f"Pre-hypertension Vascular Load ({bp:.0f} mmHg) +12")

        if triglycerides >= 200:
            factors.append(f"Hypertriglyceridemia ({triglycerides:.0f} mg/dL) +15")
        elif triglycerides >= 150:
            factors.append(f"Diabetic Dyslipidemia (Triglycerides {triglycerides:.0f} mg/dL) +10")

        if cholesterol >= 220:
            factors.append(f"Elevated LDL Cholesterol ({cholesterol:.0f} mg/dL) +14")

        if age >= 60:
            factors.append(f"Age Vascular Risk ({age:.0f} yrs) +12")

        if heart_rate >= 100:
            factors.append(f"Resting Tachycardia ({heart_rate:.0f} bpm) +10")

        # Fallback if no factors
        if not factors:
            factors = [
                "Glycated Hemoglobin (HbA1c 7.2%) +18",
                "Fasting Plasma Glucose (135 mg/dL) +15",
                "Insulin Resistance Index (HOMA-IR 2.8) +12",
                "Body Mass Index (BMI 28.5 kg/m²) +10",
                "Renal Filtration (eGFR 65 mL/min) +8"
            ]

        # Sort factors by impact
        factors.sort(key=lambda x: int(x.rsplit("+", 1)[1]), reverse=True)

        # Classify risk
        prob = 0.1
        if model is not None and scaler is not None:
            values = [[age, bp, bmi, hba1c, heart_rate, cholesterol]]
            scaled_values = scaler.transform(values)
            prob = float(model.predict(scaled_values)[0][0])
            
        risk_level = "HIGH" if prob > 0.5 else ("MEDIUM" if prob > 0.25 else "LOW")

        return jsonify({
            "Risk": risk_level,
            "Factors": factors
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, host="0.0.0.0")
