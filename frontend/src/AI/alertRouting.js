// Alert Routing Engine: Cardiac -> Cardiologist, Diabetes -> Endocrinologist, Critical -> Doctor + Nurse + Patient

export function routeAlert(alertDetails) {
  const { type, severity, category } = alertDetails;
  
  let specialty = 'General Medicine';
  let primaryDoctor = 'Dr. Priya Nair';
  let recipients = [];

  if (category === 'Cardiac' || type.includes('AFib') || type.includes('Heart')) {
    specialty = 'Cardiology';
    primaryDoctor = 'Dr. Ramesh Gupta';
    recipients.push('Dr. Ramesh Gupta (Cardiologist)');
  } else if (category === 'Pulmonology' || type.includes('Oxygen') || type.includes('Hypoxia')) {
    specialty = 'Pulmonology';
    primaryDoctor = 'Dr. Vikramaditya Rao';
    recipients.push('Dr. Vikramaditya Rao (Pulmonologist)');
  } else if (category === 'Endocrinology' || type.includes('Diabetes') || type.includes('Glucose')) {
    specialty = 'Endocrinology';
    primaryDoctor = 'Dr. Ananya Sharma';
    recipients.push('Dr. Ananya Sharma (Endocrinologist)');
  } else {
    recipients.push('Dr. Priya Nair (General Physician)');
  }

  // Critical Escalation Rule: Critical -> Doctor + Nurse + Patient/Family
  if (severity === 'Critical') {
    recipients.push('ICU Staff Nurse Duty');
    recipients.push('Patient Emergency Contact / SMS Dispatch');
  }

  return {
    specialty,
    primaryDoctor,
    recipients
  };
}
