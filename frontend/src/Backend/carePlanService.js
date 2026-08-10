import { ENDPOINTS } from './apiConfig';

const MOCK_CARE_PLAN = {
  id: 'cp-saurabh-001',
  patientId: 'saurabh',
  patientName: 'Saurabh Kumar',
  riskLevel: 'HIGH',
  riskScore: 24.3,
  status: 'APPROVED',
  reviewPeriod: '30 Days',
  goals: [
    'Reduce HbA1c below 6.5%',
    'Maintain Systolic BP < 130 mmHg',
    'Reduce Cardiovascular Risk by 35%'
  ],
  medicines: [
    { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily after meals', instructions: 'Take with food to prevent GI upset', active: true },
    { name: 'Losartan', dosage: '50mg', frequency: 'Once daily morning', instructions: 'Monitor blood pressure regularly', active: true },
    { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily at bedtime', instructions: 'For lipid management', active: true }
  ],
  diet: [
    'Low Salt / Low Sodium (< 2g daily)',
    'Strictly No Sugar & Refined Carbohydrates',
    'High Fiber Vegetables & Whole Grains'
  ],
  exercise: [
    'Walk 30 mins daily',
    'Yoga & Breathing Exercises - 20 mins'
  ],
  sleep: '8 Hours',
  waterIntake: '3 Liters',
  doctorNotes: 'Patient exhibits high cardiovascular risk with pre-hypertension load. Initiate Metformin & Losartan, restrict sodium, review after 30 days.',
  doctorComments: [
    { id: 'c1', author: 'Dr. Sarah Johnson', role: 'DOCTOR', comment: 'Care plan approved. Continue prescribed medication and daily tracking.', timestamp: new Date().toISOString() },
    { id: 'c2', author: 'Nurse Anjali', role: 'NURSE', comment: 'Patient verified medication schedule during morning round.', timestamp: new Date().toISOString() }
  ],
  adherencePercentage: 78.0,
  approvedBy: 'Dr. Sarah Johnson',
  approvedAt: new Date().toISOString(),
  validations: {
    clinicalGuidelineCheck: 'Passed',
    drugInteractionCheck: 'No Interaction Found',
    doctorApproval: 'Approved Successfully',
    adherence: '78%',
    outcomeTracking: 'Risk Reduced',
    auditLog: 'Care Plan Generated -> Doctor Approved -> Patient Updated'
  }
};

const MOCK_OUTCOME = {
  patientId: 'saurabh',
  carePlanId: 'cp-saurabh-001',
  previousRisk: 24.3,
  currentRisk: 16.2,
  weightInitial: 85.0,
  weightCurrent: 80.0,
  bpInitial: '150/95',
  bpCurrent: '125/82',
  sugarInitial: 185.0,
  sugarCurrent: 120.0,
  outcomeStatus: 'RISK_REDUCED'
};

const MOCK_DASHBOARD = {
  activeCarePlans: 1124,
  averageAdherence: '78%',
  pendingApproval: 12,
  recoveredPatients: 320,
  highRiskPatients: 47
};

export async function generateCarePlan(patientId = 'saurabh') {
  try {
    const res = await fetch(`${ENDPOINTS.CAREPLAN}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientId })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend CarePlan generate offline, using fallback:', err.message);
  }
  return { ...MOCK_CARE_PLAN, patientId };
}

export async function fetchCarePlan(patientId = 'saurabh') {
  try {
    const res = await fetch(`${ENDPOINTS.CAREPLAN}/${patientId}`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend CarePlan fetch offline, using fallback:', err.message);
  }
  return MOCK_CARE_PLAN;
}

export async function approveCarePlan(carePlanId, doctorName, doctorNotes, medicines) {
  try {
    const res = await fetch(`${ENDPOINTS.CAREPLAN}/approve`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ carePlanId, doctorName, doctorNotes, medicines })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend CarePlan approve offline, using local state:', err.message);
  }
  return {
    ...MOCK_CARE_PLAN,
    status: 'APPROVED',
    approvedBy: doctorName || 'Dr. Sarah Johnson',
    doctorNotes: doctorNotes || MOCK_CARE_PLAN.doctorNotes
  };
}

export async function updateProgress(carePlanId, tasks) {
  try {
    const res = await fetch(`${ENDPOINTS.CAREPLAN}/updateProgress`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ carePlanId, tasks })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend CarePlan updateProgress offline, using local state:', err.message);
  }
  const completed = tasks.filter(t => t.completed).length;
  const percentage = Math.round((completed / tasks.length) * 100);
  return { ...MOCK_CARE_PLAN, adherencePercentage: percentage };
}

export async function fetchOutcome(patientId = 'saurabh') {
  try {
    const res = await fetch(`${ENDPOINTS.CAREPLAN}/outcome/${patientId}`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend CarePlan outcome fetch offline, using fallback:', err.message);
  }
  return MOCK_OUTCOME;
}

export async function fetchCarePlanDashboard() {
  try {
    const res = await fetch(`${ENDPOINTS.CAREPLAN}/dashboard`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend CarePlan dashboard fetch offline, using fallback:', err.message);
  }
  return MOCK_DASHBOARD;
}

export async function addDoctorComment(carePlanId, author, role, comment) {
  try {
    const res = await fetch(`${ENDPOINTS.CAREPLAN}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ carePlanId, author, role, comment })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend CarePlan comment offline, updating locally:', err.message);
  }
  return {
    ...MOCK_CARE_PLAN,
    doctorComments: [
      ...MOCK_CARE_PLAN.doctorComments,
      { id: Date.now().toString(), author, role, comment, timestamp: new Date().toISOString() }
    ]
  };
}
