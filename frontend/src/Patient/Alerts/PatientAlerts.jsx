import React from 'react';
import { Bell, AlertTriangle, ShieldCheck, CheckCircle2, Info } from 'lucide-react';

export default function PatientAlerts({ alerts = [] }) {
  const defaultAlerts = [
    {
      id: 'ALT-901',
      title: 'SpO2 Saturation Normal',
      severity: 'Normal',
      message: 'Your oxygen saturation levels are steady at 98%.',
      time: '10 mins ago',
      read: true
    },
    {
      id: 'ALT-884',
      title: 'Heart Rate Spike Alert',
      severity: 'Warning',
      message: 'Heart rate momentarily reached 112 BPM during morning workout.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 'ALT-762',
      title: 'Medication Reminder',
      severity: 'Info',
      message: 'Time to take Atorvastatin 10mg (Evening dose).',
      time: 'Yesterday',
      read: true
    }
  ];

  const activeAlerts = alerts.length > 0 ? alerts : defaultAlerts;

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow">
            4
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Patient – Alerts & Notifications
          </h1>
        </div>
        <span className="bg-[#6344E7] text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm">
          Patient
        </span>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Health Alerts</h2>
            <p className="text-sm text-slate-500 font-normal mt-0.5">
              Real-time anomaly warnings, telemetry events, and prescription reminders
            </p>
          </div>
          <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
            Mark all read
          </button>
        </div>

        <div className="space-y-3">
          {activeAlerts.map((alert, idx) => (
            <div
              key={alert.id || idx}
              className={`p-4 rounded-2xl border flex items-start space-x-4 transition-all ${
                alert.severity === 'Critical' || alert.severity === 'Warning'
                  ? 'bg-rose-50/60 border-rose-200 text-rose-900'
                  : 'bg-slate-50/60 border-slate-200 text-slate-900'
              }`}
            >
              <div className={`p-2.5 rounded-xl shrink-0 ${
                alert.severity === 'Critical' || alert.severity === 'Warning'
                  ? 'bg-rose-100 text-rose-600'
                  : 'bg-indigo-100 text-indigo-600'
              }`}>
                {alert.severity === 'Critical' ? <AlertTriangle className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">{alert.title || alert.type}</h3>
                  <span className="text-xs font-medium text-slate-400">{alert.time || alert.detectedAt || 'Just now'}</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">{alert.message || `Anomalous reading recorded for ${alert.patientName}`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
