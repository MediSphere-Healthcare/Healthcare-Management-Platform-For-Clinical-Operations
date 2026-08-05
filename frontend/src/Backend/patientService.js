// Patient service for managing patient records, vitals history, and risk scores
import { ENDPOINTS } from './apiConfig';

export const MOCK_PATIENTS = [
  {
    id: 'saurabh',
    name: 'Saurabh Kumar',
    age: 25,
    gender: 'Male',
    contact: '+91 98765 12345',
    assignedDoctor: 'Dr. Ramesh Gupta',
    specialtyRequired: 'Cardiology',
    condition: 'Hypertension & T2 Diabetes',
    riskScore: 78,
    riskLevel: 'High',
    vitals: {
      heartRate: 115,
      bpSystolic: 152,
      bpDiastolic: 98,
      spo2: 91,
      temperature: 38.2,
      respiratoryRate: 22,
      timestamp: new Date().toLocaleTimeString()
    },
    history: [
      { timestamp: '10:00 AM', heartRate: 75, bpSystolic: 124, bpDiastolic: 82, spo2: 98, temperature: 36.8 },
      { timestamp: '10:30 AM', heartRate: 88, bpSystolic: 135, bpDiastolic: 88, spo2: 95, temperature: 37.1 },
      { timestamp: '11:00 AM', heartRate: 98, bpSystolic: 142, bpDiastolic: 92, spo2: 93, temperature: 37.6 },
      { timestamp: '11:30 AM', heartRate: 115, bpSystolic: 152, bpDiastolic: 98, spo2: 91, temperature: 38.2 },
    ]
  },
  {
    id: 'amit',
    name: 'Amit Sharma',
    age: 41,
    gender: 'Male',
    contact: '+91 98765 43210',
    assignedDoctor: 'Dr. Vikramaditya Rao',
    specialtyRequired: 'Pulmonology',
    condition: 'Asthma',
    riskScore: 32,
    riskLevel: 'Low',
    vitals: {
      heartRate: 74,
      bpSystolic: 120,
      bpDiastolic: 80,
      spo2: 97,
      temperature: 36.9,
      respiratoryRate: 16,
      timestamp: new Date().toLocaleTimeString()
    },
    history: [
      { timestamp: '10:00 AM', heartRate: 72, bpSystolic: 118, bpDiastolic: 78, spo2: 98, temperature: 36.7 },
      { timestamp: '10:30 AM', heartRate: 74, bpSystolic: 120, bpDiastolic: 80, spo2: 97, temperature: 36.9 },
    ]
  },
  {
    id: 'priya',
    name: 'Priya Verma',
    age: 34,
    gender: 'Female',
    contact: '+91 98111 22233',
    assignedDoctor: 'Dr. Ananya Sharma',
    specialtyRequired: 'Endocrinology',
    condition: 'Gestational Diabetes',
    riskScore: 62,
    riskLevel: 'Medium',
    vitals: {
      heartRate: 92,
      bpSystolic: 138,
      bpDiastolic: 88,
      spo2: 96,
      temperature: 37.0,
      respiratoryRate: 18,
      timestamp: new Date().toLocaleTimeString()
    },
    history: [
      { timestamp: '10:00 AM', heartRate: 85, bpSystolic: 130, bpDiastolic: 84, spo2: 97, temperature: 36.8 },
      { timestamp: '10:30 AM', heartRate: 92, bpSystolic: 138, bpDiastolic: 88, spo2: 96, temperature: 37.0 },
    ]
  }
];

export async function fetchPatients() {
  try {
    const res = await fetch(ENDPOINTS.PATIENTS);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend API fallback: Returning mock patients list.', err);
  }
  return MOCK_PATIENTS;
}
