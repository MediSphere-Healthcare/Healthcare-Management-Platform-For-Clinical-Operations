import React from 'react';
import { User, Shield, Stethoscope, Phone, Mail, MapPin, Heart, Calendar, Activity } from 'lucide-react';

export default function PatientProfile({ patientName = "Saurabh Kumar", currentUser }) {
  const patient = currentUser?.patient || {};
  const activeName = patient.name || currentUser?.name || patientName;
  const gender = patient.gender || (activeName.toLowerCase().includes('priya') || activeName.toLowerCase().includes('sarah') ? 'Female' : 'Male');
  const age = patient.age || 25;
  const contact = patient.contact || '+91 98765-43210';
  const assignedDoctor = patient.assignedDoctor || 'Dr. Ramesh Gupta (Cardiology)';
  const condition = patient.condition || 'Mild Hypertension, Wellness Tracking';
  const patientId = patient.id ? `PAT-${patient.id.toUpperCase()}` : 'PAT-8892';

  const avatarUrl = gender === 'Female'
    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200";

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner Bar Header matching mockup */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow">
            7
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Patient – Personal Profile
          </h1>
        </div>
        <span className="bg-[#6344E7] text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm">
          Patient
        </span>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-5 pb-6 border-b border-slate-100">
          <img
            src={avatarUrl}
            alt={activeName}
            className="w-20 h-20 rounded-2xl object-cover border-4 border-indigo-50 shadow-md"
          />
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">{activeName}</h2>
            <p className="text-xs font-semibold text-indigo-600 mt-0.5">
              Patient ID: {patientId} • Monitored via MediSphere Telemetry Stream
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-indigo-500" /> {age} yrs ({gender})</span>
              <span>•</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-indigo-500" /> New Delhi, India</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-indigo-500" /> {contact}</span>
            </div>
          </div>
        </div>

        {/* Profile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Medical Summary */}
          <div className="border border-slate-200/80 rounded-2xl p-6 bg-slate-50/50 space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200/80 pb-2 flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-600" /> Medical Profile & Care Team
            </h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-200/40">
                <span className="font-semibold text-slate-700">Primary Care Physician:</span>
                <span className="text-indigo-600 font-bold">{assignedDoctor}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/40">
                <span className="font-semibold text-slate-700">Diagnoses:</span>
                <span>{condition}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/40">
                <span className="font-semibold text-slate-700">Blood Group:</span>
                <span className="font-bold text-rose-600">A+ Positive</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/40">
                <span className="font-semibold text-slate-700">Emergency SOS Contact:</span>
                <span>Primary Care Contact ({contact})</span>
              </div>
            </div>
          </div>

          {/* Connected Wearables Summary */}
          <div className="border border-slate-200/80 rounded-2xl p-6 bg-slate-50/50 space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200/80 pb-2 flex items-center gap-2">
              <Heart className="w-4 h-4 text-indigo-600" /> Active Wearable Sensors
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/60">
                <span className="font-bold text-slate-800">Apple Watch Series 9</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">87% Battery</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/60">
                <span className="font-bold text-slate-800">Fitbit Charge 6</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">74% Battery</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/60">
                <span className="font-bold text-slate-800">Omron BP Monitor</span>
                <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">91% Battery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
