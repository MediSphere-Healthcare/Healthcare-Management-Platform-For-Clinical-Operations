// Clinical Rule Engine checking AFib, Hypertension, Oxygen alert thresholds

export function evaluateClinicalRules(vitals) {
  const alerts = [];
  const { heartRate, bpSystolic, bpDiastolic, spo2, temperature } = vitals;

  // Rule 1: AFib / Arrhythmia Check
  if (heartRate > 130 || heartRate < 45) {
    alerts.push({
      type: 'AFib / Cardiac Anomaly',
      severity: heartRate > 140 ? 'Critical' : 'High',
      message: `Abnormal Heart Rate detected: ${heartRate} BPM (Normal: 60-100)`,
      category: 'Cardiac'
    });
  }

  // Rule 2: Hypertension Check
  if (bpSystolic >= 140 || bpDiastolic >= 90) {
    const isStage2 = bpSystolic >= 160 || bpDiastolic >= 100;
    alerts.push({
      type: 'Hypertension Crisis',
      severity: isStage2 ? 'Critical' : 'High',
      message: `Elevated Blood Pressure: ${bpSystolic}/${bpDiastolic} mmHg`,
      category: 'Cardiology'
    });
  }

  // Rule 3: Oxygen Alert (Hypoxia)
  if (spo2 < 92) {
    alerts.push({
      type: 'Hypoxia / Oxygen Alert',
      severity: spo2 < 88 ? 'Critical' : 'High',
      message: `Dangerously Low SpO2: ${spo2}% (Threshold: <92%)`,
      category: 'Pulmonology'
    });
  }

  // Rule 4: Hyperthermia / High Fever
  if (temperature >= 38.5) {
    alerts.push({
      type: 'Severe Pyrexia / Fever',
      severity: 'Medium',
      message: `High Body Temperature: ${temperature}°C`,
      category: 'General'
    });
  }

  return alerts;
}
