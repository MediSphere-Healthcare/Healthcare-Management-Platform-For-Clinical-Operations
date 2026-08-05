// Alert service for managing active alerts, routing, and acknowledgement
import { ENDPOINTS } from './apiConfig';

export const INITIAL_ALERTS = [
  {
    id: 'ALT-1001',
    patientId: 'saurabh',
    patientName: 'Saurabh Kumar',
    type: 'Oxygen Alert & AFib Risk',
    severity: 'Critical', // Critical, High, Medium, Low
    vitalsTrigger: { heartRate: 145, bp: '152/98', bpSystolic: 152, bpDiastolic: 98, spo2: 89, temp: 38.4, temperature: 38.4 },
    detectedAt: '2026-08-05 12:28:10',
    assignedSpecialty: 'Cardiology',
    assignedDoctor: 'Dr. Ramesh Gupta',
    routedTo: ['Dr. Ramesh Gupta (Cardiologist)', 'Staff Nurse Duty', 'Patient/Family'],
    status: 'ACTIVE', // ACTIVE, ACKNOWLEDGED, CLOSED
    acknowledgedBy: null,
    acknowledgedAt: null,
    notes: []
  },
  {
    id: 'ALT-1002',
    patientId: 'priya',
    patientName: 'Priya Verma',
    type: 'Hypertension Spike',
    severity: 'High',
    vitalsTrigger: { heartRate: 92, bp: '148/94', bpSystolic: 148, bpDiastolic: 94, spo2: 96, temp: 37.0, temperature: 37.0 },
    detectedAt: '2026-08-05 12:15:00',
    assignedSpecialty: 'Endocrinology',
    assignedDoctor: 'Dr. Ananya Sharma',
    routedTo: ['Dr. Ananya Sharma (Endocrinologist)'],
    status: 'ACTIVE',
    acknowledgedBy: null,
    acknowledgedAt: null,
    notes: []
  },
  {
    id: 'ALT-1003',
    patientId: 'amit',
    patientName: 'Amit Sharma',
    type: 'Mild Wheezing / RR Elevation',
    severity: 'Low',
    vitalsTrigger: { heartRate: 82, bp: '122/80', bpSystolic: 122, bpDiastolic: 80, spo2: 95, temp: 37.1, temperature: 37.1 },
    detectedAt: '2026-08-05 11:30:00',
    assignedSpecialty: 'Pulmonology',
    assignedDoctor: 'Dr. Vikramaditya Rao',
    routedTo: ['Dr. Vikramaditya Rao (Pulmonologist)'],
    status: 'CLOSED',
    acknowledgedBy: 'Dr. Vikramaditya Rao',
    acknowledgedAt: '2026-08-05 11:45:12',
    notes: ['Administered Nebulizer. SpO2 stable now at 97%.']
  }
];

export async function fetchAlerts() {
  try {
    const res = await fetch(ENDPOINTS.ALERTS);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend API fallback: Returning initial alerts list.', err);
  }
  return INITIAL_ALERTS;
}
