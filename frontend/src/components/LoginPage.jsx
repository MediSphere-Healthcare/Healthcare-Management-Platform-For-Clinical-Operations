import React, { useState } from 'react';
import { Activity, ShieldCheck, Stethoscope, UserCheck, Lock, Mail, ArrowRight, Sparkles, Eye, EyeOff, User, AlertCircle, CheckCircle2, UserPlus, LogIn, Info } from 'lucide-react';
import { loginUser, registerUser, getPasswordValidationDetails, validateEmailFormat } from '../Backend/authService';

export default function LoginPage({ onLogin, doctors = [], patients = [] }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [selectedRole, setSelectedRole] = useState('Doctor');

  // Default preset doctors list fallback
  const doctorList = doctors.length > 0 ? doctors : [
    { id: 'doc-1', name: 'Dr. Ramesh Gupta', specialty: 'Cardiologist', email: 'ramesh.gupta@medisphere.org' },
    { id: 'doc-2', name: 'Dr. Ananya Sharma', specialty: 'Endocrinologist', email: 'ananya.sharma@medisphere.org' },
    { id: 'doc-3', name: 'Dr. Vikramaditya Rao', specialty: 'Pulmonologist', email: 'vikram.rao@medisphere.org' },
    { id: 'doc-4', name: 'Dr. Priya Nair', specialty: 'General Physician', email: 'priya.nair@medisphere.org' }
  ];

  // Default preset patients list fallback
  const patientList = patients.length > 0 ? patients : [
    { id: 'saurabh', name: 'Saurabh Kumar', age: 25, gender: 'Male', contact: '+91 98765 12345', assignedDoctor: 'Dr. Ramesh Gupta', condition: 'Hypertension & T2 Diabetes', email: 'saurabh@medisphere.org' },
    { id: 'amit', name: 'Amit Sharma', age: 41, gender: 'Male', contact: '+91 98765 43210', assignedDoctor: 'Dr. Vikramaditya Rao', condition: 'Asthma', email: 'amit@medisphere.org' },
    { id: 'priya', name: 'Priya Verma', age: 34, gender: 'Female', contact: '+91 98111 22233', assignedDoctor: 'Dr. Ananya Sharma', condition: 'Gestational Diabetes', email: 'priya@medisphere.org' }
  ];

  const [selectedDoctorId, setSelectedDoctorId] = useState(doctorList[0].id);
  const [selectedPatientId, setSelectedPatientId] = useState(patientList[0].id);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(doctorList[0].email);
  const [password, setPassword] = useState('Passkey@2026');
  const [specialty, setSpecialty] = useState('Cardiologist');
  const [gender, setGender] = useState('Male');
  const [age, setAge] = useState(25);
  const [showPassword, setShowPassword] = useState(false);

  // Status & Validation Feedback
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pwdValidation = getPasswordValidationDetails(password);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setErrorMessage('');
    setSuccessMessage('');
    if (authMode === 'login') {
      if (role === 'Doctor') {
        const doc = doctorList.find(d => String(d.id) === String(selectedDoctorId)) || doctorList[0];
        setEmail(doc.email);
        setPassword('Passkey@2026');
      } else if (role === 'Patient') {
        const pat = patientList.find(p => String(p.id) === String(selectedPatientId)) || patientList[0];
        setEmail(pat.email);
        setPassword('Passkey@2026');
      } else if (role === 'Admin') {
        setEmail('admin@medisphere.org');
        setPassword('Passkey@2026');
      }
    }
  };

  const handleDoctorChange = (docId) => {
    setSelectedDoctorId(docId);
    setErrorMessage('');
    const doc = doctorList.find(d => String(d.id) === String(docId));
    if (doc) {
      setEmail(doc.email);
      setPassword('Passkey@2026');
    }
  };

  const handlePatientChange = (patId) => {
    setSelectedPatientId(patId);
    setErrorMessage('');
    const pat = patientList.find(p => String(p.id) === String(patId));
    if (pat) {
      setEmail(pat.email);
      setPassword('Passkey@2026');
    }
  };

  const switchMode = (mode) => {
    setAuthMode(mode);
    setErrorMessage('');
    setSuccessMessage('');
    if (mode === 'login') {
      handleRoleSelect(selectedRole);
    } else {
      setFullName('');
      setEmail('');
      setPassword('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    try {
      if (authMode === 'login') {
        const result = await loginUser({ email, password, role: selectedRole });
        if (!result.success) {
          setErrorMessage(result.error);
          setIsSubmitting(false);
          return;
        }

        // On successful authentication
        onLogin(result.user);
      } else {
        // Registration Flow
        const result = await registerUser({
          name: fullName,
          email,
          password,
          role: selectedRole,
          specialty,
          gender,
          age
        });

        if (!result.success) {
          setErrorMessage(result.error);
          setIsSubmitting(false);
          return;
        }

        setSuccessMessage(result.message);
        setTimeout(() => {
          switchMode('login');
          setEmail(result.user.email);
          setPassword(password);
        }, 1500);
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 selection:bg-cyan-500 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-cyan-950/40 relative z-10 backdrop-blur-xl space-y-5">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-2xl shadow-lg shadow-cyan-500/20 mb-1">
            <Activity className="w-8 h-8 text-white animate-pulse" />
          </div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
            MediSphere AI Portal
          </h1>
          <p className="text-xs text-slate-400">Secured Healthcare Operations & Clinical Authentication</p>
        </div>

        {/* Login vs Register Mode Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => switchMode('login')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
              authMode === 'login'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => switchMode('register')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
              authMode === 'register'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register / Sign Up</span>
          </button>
        </div>

        {/* 3 Role Selection Cards */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => handleRoleSelect('Doctor')}
            className={`p-2.5 rounded-xl flex flex-col items-center justify-center space-y-1 transition-all ${
              selectedRole === 'Doctor'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span className="text-xs font-semibold">Doctor</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('Patient')}
            className={`p-2.5 rounded-xl flex flex-col items-center justify-center space-y-1 transition-all ${
              selectedRole === 'Patient'
                ? 'bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span className="text-xs font-semibold">Patient</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('Admin')}
            className={`p-2.5 rounded-xl flex flex-col items-center justify-center space-y-1 transition-all ${
              selectedRole === 'Admin'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-semibold">Admin</span>
          </button>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div className="p-3 bg-rose-950/70 border border-rose-600/50 rounded-xl text-rose-200 text-xs flex items-start space-x-2.5 animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="leading-tight font-medium">{errorMessage}</div>
          </div>
        )}

        {/* Success Alert Box */}
        {successMessage && (
          <div className="p-3 bg-emerald-950/70 border border-emerald-600/50 rounded-xl text-emerald-200 text-xs flex items-start space-x-2.5 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div className="leading-tight font-medium">{successMessage}</div>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          
          {/* Sign In Dropdown Helpers for easy testing */}
          {authMode === 'login' && selectedRole === 'Doctor' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                <span>Preset Doctor Account</span>
                <span className="text-[10px] text-cyan-400">(Quick Select)</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3" />
                <select
                  value={selectedDoctorId}
                  onChange={(e) => handleDoctorChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-cyan-500/40 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors font-semibold"
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

          {authMode === 'login' && selectedRole === 'Patient' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-400 flex items-center justify-between">
                <span>Preset Patient Account</span>
                <span className="text-[10px] text-cyan-400">(Quick Select)</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3" />
                <select
                  value={selectedPatientId}
                  onChange={(e) => handlePatientChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-cyan-500/40 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors font-semibold"
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

          {/* Registration Extra Fields */}
          {authMode === 'register' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="e.g. Dr. Rajesh Kumar"
                    required
                  />
                </div>
              </div>

              {selectedRole === 'Doctor' && (
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400">Medical Specialty</label>
                  <input
                    type="text"
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Cardiologist, Neurologist, etc."
                  />
                </div>
              )}

              {selectedRole === 'Patient' && (
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400">Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
                      min="1"
                      max="120"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {/* Email Address */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-slate-400">Email Address (Full ID)</label>
              {email && (
                <span className={validateEmailFormat(email) ? "text-emerald-400 text-[10px] font-bold" : "text-rose-400 text-[10px]"}>
                  {validateEmailFormat(email) ? "✓ Valid Email Format" : "✗ Full Email Required (user@domain.com)"}
                </span>
              )}
            </div>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMessage('');
                }}
                className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none transition-colors ${
                  email && !validateEmailFormat(email)
                    ? 'border-rose-500 focus:border-rose-400'
                    : 'border-slate-800 focus:border-cyan-500'
                }`}
                placeholder="user@medisphere.org"
                required
              />
            </div>
          </div>

          {/* Security Password */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 flex justify-between">
              <span>Security Password</span>
              <span className="text-[10px] text-slate-500">Min 8 chars, Upper, Lower, Num, Special</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage('');
                }}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="Passkey@2026"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200 transition-colors p-0.5"
                title={showPassword ? 'Hide Password' : 'Show Password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-cyan-400" />}
              </button>
            </div>

            {/* Live Password Policy Helper Pills */}
            <div className="grid grid-cols-5 gap-1 pt-1 text-[10px]">
              <span className={`px-1.5 py-0.5 rounded text-center font-bold ${pwdValidation.minLength ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' : 'bg-slate-950 text-slate-500 border border-slate-800'}`}>
                8+ Chars
              </span>
              <span className={`px-1.5 py-0.5 rounded text-center font-bold ${pwdValidation.hasUpper ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' : 'bg-slate-950 text-slate-500 border border-slate-800'}`}>
                Upper (A-Z)
              </span>
              <span className={`px-1.5 py-0.5 rounded text-center font-bold ${pwdValidation.hasLower ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' : 'bg-slate-950 text-slate-500 border border-slate-800'}`}>
                Lower (a-z)
              </span>
              <span className={`px-1.5 py-0.5 rounded text-center font-bold ${pwdValidation.hasNumber ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' : 'bg-slate-950 text-slate-500 border border-slate-800'}`}>
                Digit (0-9)
              </span>
              <span className={`px-1.5 py-0.5 rounded text-center font-bold ${pwdValidation.hasSpecial ? 'bg-emerald-950 text-emerald-400 border border-emerald-700' : 'bg-slate-950 text-slate-500 border border-slate-800'}`}>
                Symbol (@#$)
              </span>
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Role Access: <strong className="text-cyan-400">{selectedRole} Workspace</strong></span>
            <span className="text-emerald-400 font-bold flex items-center">
              <Sparkles className="w-3 h-3 mr-1" /> Keycloak & Auth Verified
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-600/30 flex items-center justify-center space-x-2 transition-all transform active:scale-95 disabled:opacity-50"
          >
            <span>
              {isSubmitting
                ? 'Verifying Credentials...'
                : authMode === 'login'
                ? `Sign In as ${selectedRole}`
                : `Register as New ${selectedRole}`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-[11px] text-slate-500 pt-2 border-t border-slate-800 flex items-center justify-between">
          <span>MediSphere AI Security Engine</span>
          <span className="text-slate-400 flex items-center">
            <Info className="w-3 h-3 mr-1 text-cyan-400" /> Default Passkey: <code className="text-cyan-300 ml-1 font-mono">Passkey@2026</code>
          </span>
        </div>

      </div>
    </div>
  );
}
