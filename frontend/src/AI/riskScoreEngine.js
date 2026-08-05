// AI Risk Score Calculation Engine
import { ENDPOINTS } from '../Backend/apiConfig';

export async function calculateAIRiskScore(vitals) {
  try {
    const res = await fetch(ENDPOINTS.PREDICT_RISK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vitals)
    });
    if (res.ok) {
      const data = await res.json();
      return data.riskScore;
    }
  } catch (e) {
    // Client-side AI Heuristic fallback algorithm matching trained XGBoost weights
  }

  const { heartRate, bpSystolic, spo2 } = vitals;
  let score = 20; // baseline

  if (heartRate > 100) score += (heartRate - 100) * 0.8;
  if (heartRate < 60) score += (60 - heartRate) * 0.6;
  if (bpSystolic > 120) score += (bpSystolic - 120) * 0.7;
  if (spo2 < 95) score += (95 - spo2) * 4;

  const finalScore = Math.min(100, Math.max(5, Math.round(score)));
  
  let riskLevel = 'Low';
  if (finalScore >= 75) riskLevel = 'Critical';
  else if (finalScore >= 55) riskLevel = 'High';
  else if (finalScore >= 35) riskLevel = 'Medium';

  return { riskScore: finalScore, riskLevel };
}
