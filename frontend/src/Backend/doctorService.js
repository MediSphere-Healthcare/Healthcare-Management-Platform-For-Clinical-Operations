// Doctor service for managing doctor records, assignments, and schedule
import { ENDPOINTS } from './apiConfig';

export const MOCK_DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr. Ramesh Gupta',
    specialty: 'Cardiologist',
    department: 'Cardiology',
    email: 'ramesh.gupta@medisphere.org',
    phone: '+91 98112 34567',
    activePatients: 14,
    status: 'Available',
    avatar: '👨‍⚕️'
  },
  {
    id: 'doc-2',
    name: 'Dr. Ananya Sharma',
    specialty: 'Endocrinologist',
    department: 'Endocrinology & Diabetes',
    email: 'ananya.sharma@medisphere.org',
    phone: '+91 98223 45678',
    activePatients: 19,
    status: 'In Consultation',
    avatar: '👩‍⚕️'
  },
  {
    id: 'doc-3',
    name: 'Dr. Vikramaditya Rao',
    specialty: 'Pulmonologist',
    department: 'Pulmonology',
    email: 'vikram.rao@medisphere.org',
    phone: '+91 98334 56789',
    activePatients: 9,
    status: 'Available',
    avatar: '👨‍⚕️'
  },
  {
    id: 'doc-4',
    name: 'Dr. Priya Nair',
    specialty: 'General Physician',
    department: 'General Medicine',
    email: 'priya.nair@medisphere.org',
    phone: '+91 98445 67890',
    activePatients: 25,
    status: 'On Call',
    avatar: '👩‍⚕️'
  }
];

export async function fetchDoctors() {
  try {
    const res = await fetch(ENDPOINTS.DOCTORS);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend API fallback: Returning mock doctors list.', err);
  }
  return MOCK_DOCTORS;
}
