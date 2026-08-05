import os
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"  # Suppress oneDNN numerical info messages
import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Input

# Create directories if they do not exist
os.makedirs("dataset", exist_ok=True)
os.makedirs("models", exist_ok=True)

csv_path = "dataset/patient_data.csv"

# 1. Generate Dataset if not exists
if not os.path.exists(csv_path):
    print("Generating synthetic healthcare dataset...")
    np.random.seed(42)
    num_samples = 1500
    
    # Generate realistic metrics
    age = np.random.randint(18, 85, num_samples)
    bp = np.random.randint(90, 180, num_samples)
    bmi = np.random.uniform(15.0, 42.0, num_samples)
    hba1c = np.random.uniform(4.0, 11.5, num_samples)
    heart_rate = np.random.randint(55, 125, num_samples)
    cholesterol = np.random.randint(130, 310, num_samples)
    
    data = pd.DataFrame({
        "Age": age,
        "BP": bp,
        "BMI": bmi,
        "HbA1c": hba1c,
        "HeartRate": heart_rate,
        "Cholesterol": cholesterol
    })
    
    # Define Risk assignment based on guidelines to ensure high predictability
    # Age>60 (15), BP>140 (20), BMI>30 (15), HbA1c>7 (20), HeartRate>110 (10), Cholesterol>220 (20)
    score = np.zeros(num_samples)
    score += (age > 60) * 15
    score += (bp > 140) * 20
    score += (bmi > 30) * 15
    score += (hba1c > 7) * 20
    score += (heart_rate > 110) * 10
    score += (cholesterol > 220) * 20
    
    # If score > 35, classify as High Risk (1), else Low Risk (0)
    risk = (score > 35).astype(int)
    data["Risk"] = risk
    
    data.to_csv(csv_path, index=False)
    print(f"Generated {num_samples} records and saved to {csv_path}")
else:
    print(f"Dataset already exists at {csv_path}")

# 2. Load Dataset
data = pd.read_csv(csv_path)
X = data.drop("Risk", axis=1)
y = data["Risk"]

# 3. Scale Features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
joblib.dump(scaler, "models/scaler.pkl")
print("Scaler saved to models/scaler.pkl")

# 4. Split Dataset
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# 5. Build Sequential Keras Neural Network
model = Sequential([
    Input(shape=(6,)),
    Dense(16, activation="relu"),
    Dense(8, activation="relu"),
    Dense(1, activation="sigmoid")
])

model.compile(
    optimizer="adam",
    loss="binary_crossentropy",
    metrics=["accuracy"]
)

# 6. Train Model
print("Training TensorFlow model...")
model.fit(X_train, y_train, epochs=40, batch_size=8, validation_split=0.1, verbose=1)

# 7. Evaluate
loss, accuracy = model.evaluate(X_test, y_test)
print(f"Test Accuracy: {accuracy * 100:.2f}%")

# 8. Save Model
model.save("models/cvd_model.keras")
print("Model saved to models/cvd_model.keras")
