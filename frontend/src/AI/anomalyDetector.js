// AI Anomaly Detector connecting live data stream to AI model
import { calculateAIRiskScore } from './riskScoreEngine';
import { evaluateClinicalRules } from './clinicalRuleEngine';
import { routeAlert } from './alertRouting';

export async function processVitalsForAnomalies(vitalsPayload) {
  const { riskScore, riskLevel } = await calculateAIRiskScore(vitalsPayload);
  const clinicalAlerts = evaluateClinicalRules(vitalsPayload);

  let isAnomalyDetected = clinicalAlerts.length > 0 || riskScore > 65;

  let generatedAlerts = clinicalAlerts.map(ruleAlert => {
    const routingInfo = routeAlert({
      ...ruleAlert,
      patientId: vitalsPayload.patientId,
      patientName: vitalsPayload.patientName
    });

    return {
      id: `ALT-${Date.now().toString().slice(-4)}`,
      patientId: vitalsPayload.patientId,
      patientName: vitalsPayload.patientName,
      type: ruleAlert.type,
      severity: ruleAlert.severity,
      vitalsTrigger: vitalsPayload,
      detectedAt: new Date().toLocaleString(),
      assignedSpecialty: routingInfo.specialty,
      assignedDoctor: routingInfo.primaryDoctor,
      routedTo: routingInfo.recipients,
      status: 'ACTIVE',
      notes: []
    };
  });

  return {
    isAnomalyDetected,
    riskScore,
    riskLevel,
    alerts: generatedAlerts
  };
}
