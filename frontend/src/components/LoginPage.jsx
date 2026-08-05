import React, { useState } from 'react';
import { Activity, ShieldCheck, Stethoscope, UserCheck, Lock, Mail, ArrowRight, Sparkles, Eye, EyeOff, User } from 'lucide-react';

export default function LoginPage({ onLogin, doctors = [], patients = [] }) {
  const [selectedRole, setSelectedRole] = useState('Doctor');

  // Default preset doctors list fallback
  const doctorList = doctors.length > 0 ? doctors : [
    { id: 'doc-1', name: 'Dr. Ramesh Gupta', specialty: 'Cardiologist', email: 'ramesh.gupta@medisphere.org' },
    { id: 'doc-2', name: 'Dr. Ananya Sharma', specialty: 'Endocrinologist', email: 'ananya.sharma@medisphere.org' },
    { id: 'doc-3', name: 'Dr. Vikramaditya Rao', specialty: 'Pulmonologist', email: 'vikram.rao@medisphere.org' },
    { id: 'doc-4', name: 'Dr. Priya Nair', specialty: 'General Physician', email: 'priya.nair@medisphere.org' }
  ];

  // Default preset patients list fallback with full metadata
  const patientList = patients.length > 0 ? patients : [
    { id: 'saurabh', name: 'Saurabh Kumar', age: 25, gender: 'Male', contact: '+91 98765 12345', assignedDoctor: 'Dr. Ramesh Gupta', condition: 'Hypertension & T2 Diabetes', email: 'saurabh@medisphere.org' },
    { id: 'amit', name: 'Amit Sharma', age: 41, gender: 'Male', contact: '+91 98765 43210', assignedDoctor: 'Dr. Vikramaditya Rao', condition: 'Asthma', email: 'amit@medisphere.org' },
    { id: 'priya', name: 'Priya Verma', age: 34, gender: 'Female', contact: '+91 98111 22233', assignedDoctor: 'Dr. Ananya Sharma', condition: 'Gestational Diabetes', email: 'priya@medisphere.org' }
  ];

  const [selectedDoctorId, setSelectedDoctorId] = useState(doctorList[0].id);
  const [selectedPatientId, setSelectedPatientId] = useState(patientList[0].id);

  const [email, setEmail] = useState(doctorList[0].email);
  const [password, setPassword] = useState('passkey@2026');
  const [showPassword, setShowPassword] = useState(false);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === 'Doctor') {
      const doc = doctorList.find(d => String(d.id) === String(selectedDoctorId)) || doctorList[0];
      setEmail(doc.email);
    } else if (role === 'Patient') {
      const pat = patientList.find(p => String(p.id) === String(selectedPatientId)) || patientList[0];
      setEmail(pat.email);
    } else if (role === 'Admin') {
      setEmail('admin@medisphere.org');
    }
  };

  const handleDoctorChange = (docId) => {
    setSelectedDoctorId(docId);
    const doc = doctorList.find(d => String(d.id) === String(docId));
    if (doc) setEmail(doc.email);
  };

  const handlePatientChange = (patId) => {
    setSelectedPatientId(patId);
    const pat = patientList.find(p => String(p.id) === String(patId));
    if (pat) setEmail(pat.email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let name = 'User';
    let specialty = '';
    let patientData = null;

    if (selectedRole === 'Doctor') {
      const doc = doctorList.find(d => String(d.id) === String(selectedDoctorId) || d.email === email);
      if (doc) {
        name = doc.name;
        specialty = doc.specialty;
      } else {
        name = email.split('@')[0];
        specialty = 'Specialist';
      }
    } else if (selectedRole === 'Patient') {
      const pat = patientList.find(p => String(p.id) === String(selectedPatientId) || (p.email && p.email.toLowerCase() === email.toLowerCase()));
      if (pat) {
        name = pat.name;
        patientData = pat;
      } else {
        name = email ? email.split('@')[0] : 'Patient User';
        patientData = {
          id: 'pat-' + Date.now().toString().slice(-4),
          name,
          age: 30,
          gender: 'Male',
          contact: '+91 98765 00000',
          assignedDoctor: 'Dr. Ramesh Gupta',
          condition: 'General Monitoring'
        };
      }
    } else if (selectedRole === 'Admin') {
      name = 'System Administrator';
    }

    onLogin({
      role: selectedRole,
      email,
      name,
      specialty,
      patient: patientData
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 selection:bg-cyan-500 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-cyan-950/40 relative z-10 backdrop-blur-xl space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/20 mb-2">
            <Activity className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
            MediSphere AI Portal
          </h1>
          <p className="text-xs text-slate-400">Select your access role to enter the monitoring platform</p>
        </div>

        {/* 3 Role Selection Cards */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => handleRoleSelect('Doctor')}
            className={`p-3 rounded-xl flex flex-col items-center justify-center space-y-1 transition-all ${
              selectedRole === 'Doctor'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Stethoscope className="w-5 h-5" />
            <span className="text-xs font-semibold">Doctor</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('Patient')}
            className={`p-3 rounded-xl flex flex-col items-center justify-center space-y-1 transition-all ${
              selectedRole === 'Patient'
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-5 h-5" />
            <span className="text-xs font-semibold">Patient</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('Admin')}
            className={`p-3 rounded-xl flex flex-col items-center justify-center space-y-1 transition-all ${
              selectedRole === 'Admin'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span className="text-xs font-semibold">Admin</span>
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Doctor Account Selector Dropdown */}
          {selectedRole === 'Doctor' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Select Doctor Account</label>
              <div className="relative">
                <User className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3.5" />
                <select
                  value={selectedDoctorId}
                  onChange={(e) => handleDoctorChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-cyan-500/40 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors font-semibold"
                >
                  {doctorList.map((doc) => (
                    <option key={doc.id} value={doc.id} className="bg-slate-900 text-white">
                      {doc.name} • ({doc.specialty || doc.department})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Patient Account Selector Dropdown */}
          {selectedRole === 'Patient' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400">Select Patient Account</label>
              <div className="relative">
                <User className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3.5" />
                <select
                  value={selectedPatientId}
                  onChange={(e) => handlePatientChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-cyan-500/40 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors font-semibold"
                >
                  {patientList.map((pat) => (
                    <option key={pat.id} value={pat.id} className="bg-slate-900 text-white">
                      {pat.name} (Patient ID: {pat.id})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Email / User ID */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400">Email Address / User ID</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="user@medisphere.org"
                required
              />
            </div>
          </div>

          {/* Security Password */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400">Security Password / Passkey</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-200 transition-colors p-0.5"
                title={showPassword ? 'Hide Password' : 'Show Password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-cyan-400" />}
              </button>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Role Permissions: <strong className="text-cyan-400">{selectedRole} Workspace</strong></span>
            <span className="text-emerald-400 font-bold flex items-center">
              <Sparkles className="w-3 h-3 mr-1" /> Keycloak SSO
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-600/30 flex items-center justify-center space-x-2 transition-all transform active:scale-95"
          >
            <span>Sign In as {selectedRole === 'Doctor' ? (doctorList.find(d=>d.id===selectedDoctorId)?.name || 'Doctor') : selectedRole}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-800">
          MediSphere AI • Secured with Keycloak & Kafka Broker
        </div>

      </div>
    </div>
  );
}
