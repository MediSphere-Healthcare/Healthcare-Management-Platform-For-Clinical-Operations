import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CriticalAlertModal from './components/CriticalAlertModal';
import LoginPage from './components/LoginPage';

// Services
import { fetchDoctors } from './Backend/doctorService';
import { fetchPatients } from './Backend/patientService';
import { fetchAlerts } from './Backend/alertService';
import { vitalsStream } from './Kafka/vitalsStream';
import { processVitalsForAnomalies } from './AI/anomalyDetector';

// Doctor Pages
import DoctorDashboard from './Doctor/Dashboard/DoctorDashboard';
import LiveMonitoring from './Doctor/LiveMonitoring/LiveMonitoring';
import AiAnomalyDetection from './Doctor/AIAnomaly/AiAnomalyDetection';
import AlertManagement from './Doctor/Alerts/AlertManagement';
import AlertHistory from './Doctor/AlertHistory/AlertHistory';
import DoctorNotifications from './Doctor/Notifications/DoctorNotifications';
import PatientMonitoring from './Doctor/PatientMonitoring/PatientMonitoring';
import DoctorAnalytics from './Doctor/Analytics/DoctorAnalytics';
import DoctorSettings from './Doctor/Settings/DoctorSettings';

// Patient Pages
import PatientDashboard from './Patient/Dashboard/PatientDashboard';
import MyVitals from './Patient/MyVitals/MyVitals';
import ConnectedDevices from './Patient/Devices/ConnectedDevices';
import MedicalHistory from './Patient/History/MedicalHistory';
import PatientAlerts from './Patient/Alerts/PatientAlerts';
import PatientMedications from './Patient/Medications/PatientMedications';
import PatientProfile from './Patient/Profile/PatientProfile';
import PatientSettings from './Patient/Settings/PatientSettings';

// Admin Pages
import AdminDashboard from './Admin/Dashboard/AdminDashboard';
import ManageDoctors from './Admin/ManageDoctors/ManageDoctors';
import ManagePatients from './Admin/ManagePatients/ManagePatients';
import AdminAlertManagement from './Admin/AlertManagement/AdminAlertManagement';
import Reports from './Admin/Reports/Reports';

export default function App() {
  // Authentication & Session State
  const [currentUser, setCurrentUser] = useState(null); // null shows LoginPage
  const [currentRole, setCurrentRole] = useState('Doctor');
  const [activeTab, setActiveTab] = useState('DoctorDashboard');

  // Application State
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'CRITICAL', title: 'Critical SpO2 & AFib Alert', message: 'Saurabh Kumar: SpO2 dropped to 89%, HR 145 BPM.', time: 'Just now' },
    { id: 2, type: 'ALERT', title: 'Hypertension Spike', message: 'Priya Verma: BP reached 148/94 mmHg.', time: '15 mins ago' }
  ]);

  // Telemetry Stream State
  const [currentVitals, setCurrentVitals] = useState({
    heartRate: 72,
    bpSystolic: 124,
    bpDiastolic: 82,
    spo2: 98,
    temperature: 36.8,
    timestamp: new Date().toLocaleTimeString()
  });

  const [vitalsHistory, setVitalsHistory] = useState([
    { timestamp: '10:00 AM', heartRate: 72, bpSystolic: 120 },
    { timestamp: '10:15 AM', heartRate: 75, bpSystolic: 122 },
    { timestamp: '10:30 AM', heartRate: 78, bpSystolic: 125 }
  ]);

  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [riskScore, setRiskScore] = useState(25);
  const [riskLevel, setRiskLevel] = useState('Low');
  const [activeCriticalModalAlert, setActiveCriticalModalAlert] = useState(null);
  const [selectedPatientForAnomaly, setSelectedPatientForAnomaly] = useState(null);

  // Initial Data Fetch
  useEffect(() => {
    fetchDoctors().then(setDoctors);
    fetchPatients().then(setPatients);
    fetchAlerts().then(setAlerts);
  }, []);

  // Handle Login
  const handleLogin = (userCredentials) => {
    setCurrentUser(userCredentials);
    setCurrentRole(userCredentials.role);
    if (userCredentials.role === 'Doctor') setActiveTab('DoctorDashboard');
    else if (userCredentials.role === 'Patient') setActiveTab('PatientDashboard');
    else if (userCredentials.role === 'Admin') setActiveTab('AdminDashboard');
  };

  // Handle Logout
  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Kafka Vitals Subscriber
  useEffect(() => {
    if (!isLiveStreaming || !currentUser) return;
    vitalsStream.startSimulation();

    const unsubscribe = vitalsStream.subscribe(async (payload) => {
      setCurrentVitals(payload);

      setVitalsHistory(prev => {
        const next = [...prev, { timestamp: payload.timestamp, heartRate: payload.heartRate, bpSystolic: payload.bpSystolic }];
        return next.slice(-12);
      });

      // AI Anomaly Processing
      const result = await processVitalsForAnomalies(payload);
      setRiskScore(result.riskScore);
      setRiskLevel(result.riskLevel);

      if (result.isAnomalyDetected && result.alerts.length > 0) {
        const newAlert = result.alerts[0];
        setAlerts(prev => [newAlert, ...prev.filter(a => a.id !== newAlert.id)]);

        if (newAlert.severity === 'Critical') {
          setActiveCriticalModalAlert(newAlert);
        }
      }
    });

    return () => {
      unsubscribe();
      vitalsStream.stopSimulation();
    };
  }, [isLiveStreaming, currentUser]);

  // Alert Actions
  const handleAcknowledgeAlert = (alertId) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'ACKNOWLEDGED', acknowledgedBy: 'Dr. Ramesh Gupta', acknowledgedAt: new Date().toLocaleTimeString() } : a));
    if (activeCriticalModalAlert && activeCriticalModalAlert.id === alertId) {
      setActiveCriticalModalAlert(null);
    }
  };

  const handleCloseAlert = (alertId) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, status: 'CLOSED' } : a));
  };

  const triggerSimulatedSpike = () => {
    const spikePayload = {
      topic: 'vitals-stream',
      patientId: 'saurabh',
      patientName: 'Saurabh Kumar',
      heartRate: 148,
      bpSystolic: 165,
      bpDiastolic: 102,
      spo2: 88,
      temperature: 38.6,
      timestamp: new Date().toLocaleTimeString()
    };
    setCurrentVitals(spikePayload);
    
    const criticalAlert = {
      id: `ALT-${Date.now().toString().slice(-4)}`,
      patientId: 'saurabh',
      patientName: 'Saurabh Kumar',
      type: 'AFib Spike & Oxygen Drop (SpO2 88%)',
      severity: 'Critical',
      vitalsTrigger: spikePayload,
      detectedAt: new Date().toLocaleString(),
      assignedSpecialty: 'Cardiology',
      assignedDoctor: 'Dr. Ramesh Gupta',
      routedTo: ['Dr. Ramesh Gupta (Cardiologist)', 'ICU Staff Nurse Duty', 'Patient Emergency Contact'],
      status: 'ACTIVE'
    };

    setAlerts(prev => [criticalAlert, ...prev]);
    setActiveCriticalModalAlert(criticalAlert);
  };

  // Render Login Page if user is not authenticated
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} doctors={doctors} patients={patients} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        activeAlertsCount={alerts.filter(a => a.status === 'ACTIVE').length}
        isLiveStreaming={isLiveStreaming}
        toggleLiveStream={() => setIsLiveStreaming(!isLiveStreaming)}
      />

      {/* Main Layout Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Menu */}
        <Sidebar
          currentRole={currentRole}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
        />

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto bg-slate-100 min-h-[calc(100vh-61px)] max-w-7xl mx-auto w-full">
          {/* Doctor Portal */}
          {currentRole === 'Doctor' && (
            <>
              {activeTab === 'DoctorDashboard' && (
                <DoctorDashboard
                  patients={patients}
                  alerts={alerts}
                  notifications={notifications}
                  onSelectTab={setActiveTab}
                  onSelectPatient={(pat) => {
                    setSelectedPatientForAnomaly(pat);
                    setActiveTab('AiAnomalyDetection');
                  }}
                />
              )}

              {activeTab === 'AiAnomalyDetection' && (
                <AiAnomalyDetection
                  patient={selectedPatientForAnomaly}
                  onBack={() => setActiveTab('DoctorDashboard')}
                />
              )}

              {activeTab === 'LiveMonitoring' && (
                <LiveMonitoring
                  currentVitals={currentVitals}
                  vitalsHistory={vitalsHistory}
                  isAutoRefresh={isLiveStreaming}
                  toggleAutoRefresh={() => setIsLiveStreaming(!isLiveStreaming)}
                  triggerSimulatedSpike={triggerSimulatedSpike}
                />
              )}

              {activeTab === 'Alerts' && (
                <AlertManagement
                  alerts={alerts}
                  onAcknowledgeAlert={handleAcknowledgeAlert}
                  onCloseAlert={handleCloseAlert}
                />
              )}

              {activeTab === 'AlertHistory' && (
                <AlertHistory alerts={alerts} />
              )}

              {activeTab === 'DoctorNotifications' && (
                <DoctorNotifications notifications={notifications} />
              )}

              {activeTab === 'PatientMonitoring' && (
                <PatientMonitoring
                  patients={patients}
                  onSelectPatient={() => setActiveTab('LiveMonitoring')}
                />
              )}

              {activeTab === 'Reports' && (
                <Reports />
              )}

              {activeTab === 'Analytics' && (
                <DoctorAnalytics patients={patients} alerts={alerts} />
              )}

              {activeTab === 'Settings' && (
                <DoctorSettings />
              )}
            </>
          )}

          {/* Patient Portal */}
          {currentRole === 'Patient' && (
            <>
              {activeTab === 'PatientDashboard' && (
                <PatientDashboard
                  vitals={currentVitals}
                  riskScore={riskScore}
                  riskLevel={riskLevel}
                  vitalsHistory={vitalsHistory}
                  onEmergencyTrigger={triggerSimulatedSpike}
                  patientName={currentUser?.name || "Patient"}
                  currentUser={currentUser}
                />
              )}

              {activeTab === 'MyVitals' && (
                <MyVitals vitals={currentVitals} currentUser={currentUser} />
              )}

              {activeTab === 'Devices' && (
                <ConnectedDevices patientName={currentUser?.name || "Patient"} currentUser={currentUser} />
              )}

              {activeTab === 'History' && (
                <MedicalHistory currentUser={currentUser} />
              )}

              {activeTab === 'Alerts' && (
                <PatientAlerts alerts={alerts} currentUser={currentUser} />
              )}

              {activeTab === 'Medications' && (
                <PatientMedications currentUser={currentUser} />
              )}

              {activeTab === 'Profile' && (
                <PatientProfile patientName={currentUser?.name || "Patient"} currentUser={currentUser} />
              )}

              {activeTab === 'Settings' && (
                <PatientSettings currentUser={currentUser} />
              )}
            </>
          )}

          {/* Admin Portal */}
          {currentRole === 'Admin' && (
            <>
              {activeTab === 'AdminDashboard' && (
                <AdminDashboard
                  doctors={doctors}
                  patients={patients}
                  alerts={alerts}
                  onSelectTab={setActiveTab}
                />
              )}

              {activeTab === 'ManageDoctors' && (
                <ManageDoctors
                  doctors={doctors}
                  onAddDoctor={doc => setDoctors(prev => [...prev, doc])}
                />
              )}

              {activeTab === 'ManagePatients' && (
                <ManagePatients
                  patients={patients}
                  onAddPatient={pat => setPatients(prev => [...prev, pat])}
                />
              )}

              {activeTab === 'AdminAlertManagement' && (
                <AdminAlertManagement />
              )}

              {activeTab === 'Reports' && (
                <Reports />
              )}
            </>
          )}
        </main>
      </div>

      {/* Critical Alert Modal Popup */}
      <CriticalAlertModal
        alert={activeCriticalModalAlert}
        onClose={() => setActiveCriticalModalAlert(null)}
        onAcknowledge={handleAcknowledgeAlert}
      />
    </div>
  );
}
