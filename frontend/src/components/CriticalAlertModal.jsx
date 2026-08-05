import React from 'react';
import { AlertOctagon, X, PhoneCall, ShieldAlert, CheckCircle2, User, HeartPulse } from 'lucide-react';

export default function CriticalAlertModal({ alert, onClose, onAcknowledge }) {
  if (!alert) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-slate-900 border-2 border-rose-500/80 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl shadow-rose-950/50">
        
        {/* Header flashing banner */}
        <div className="bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 p-4 text-white flex items-center justify-between shadow-inner">
          <div className="flex items-center space-x-3">
            <AlertOctagon className="w-7 h-7 text-white animate-bounce" />
            <div>
              <span className="text-xs uppercase tracking-wider font-extrabold bg-white/20 px-2 py-0.5 rounded">
                CRITICAL ANOMALY DETECTED
              </span>
              <h2 className="text-lg font-extrabold">{alert.type || 'High AI Risk Score'}</h2>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-5 text-slate-200">
          {/* Patient Header */}
          <div className="flex items-center justify-between p-3.5 bg-slate-800/80 rounded-xl border border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-rose-500/20 text-rose-400 rounded-lg">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Affected Patient</p>
                <p className="text-base font-bold text-white">{alert.patientName || 'Saurabh Kumar'}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400 font-medium">Assigned Specialty</p>
              <p className="text-xs font-semibold text-cyan-400">{alert.assignedSpecialty || 'Cardiology'}</p>
            </div>
          </div>

          {/* Trigger Vitals Box */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Trigger Vitals</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                <span className="text-xs text-rose-300 font-medium">Heart Rate</span>
                <p className="text-xl font-extrabold text-rose-400">{alert.vitalsTrigger?.heartRate || 145} <span className="text-xs">BPM</span></p>
              </div>
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl">
                <span className="text-xs text-rose-300 font-medium">SpO2 Level</span>
                <p className="text-xl font-extrabold text-rose-400">{alert.vitalsTrigger?.spo2 || 89}%</p>
              </div>
              <div className="p-3 bg-slate-800 border border-slate-700 rounded-xl">
                <span className="text-xs text-slate-400 font-medium">Blood Pressure</span>
                <p className="text-base font-bold text-white">{alert.vitalsTrigger?.bpSystolic || 152}/{alert.vitalsTrigger?.bpDiastolic || 98} mmHg</p>
              </div>
              <div className="p-3 bg-slate-800 border border-slate-700 rounded-xl">
                <span className="text-xs text-slate-400 font-medium">Temperature</span>
                <p className="text-base font-bold text-white">{alert.vitalsTrigger?.temperature || 38.4}°C</p>
              </div>
            </div>
          </div>

          {/* Smart Routing Dispatch */}
          <div className="p-3.5 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-xs space-y-1.5">
            <p className="font-bold text-cyan-300 flex items-center">
              <ShieldAlert className="w-4 h-4 mr-1.5 text-cyan-400" />
              Automated Alert Routing Dispatched
            </p>
            <ul className="text-cyan-200/80 list-disc list-inside space-y-0.5">
              {alert.routedTo?.map((recipient, idx) => (
                <li key={idx}>{recipient}</li>
              )) || <li>Assigned Doctor & ICU Duty Nurse</li>}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center space-x-3">
          <button
            onClick={() => onAcknowledge(alert.id)}
            className="flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold shadow-lg shadow-emerald-600/30 transition-all"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Acknowledge Alert</span>
          </button>
          
          <button
            onClick={onClose}
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm border border-slate-700"
          >
            Dismiss
          </button>
        </div>

      </div>
    </div>
  );
}
