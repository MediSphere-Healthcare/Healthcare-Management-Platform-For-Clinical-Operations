import React, { useState } from 'react';
import { Settings, Bell, Shield, Smartphone, Globe, Lock, Save } from 'lucide-react';

export default function PatientSettings() {
  const [notifications, setNotifications] = useState(true);
  const [anomalyAlerts, setAnomalyAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow">
            6
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Patient – Portal Settings
          </h1>
        </div>
        <span className="bg-[#6344E7] text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm">
          Patient
        </span>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6 max-w-4xl">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Preferences & Alerts</h2>
          <p className="text-sm text-slate-500 font-normal mt-0.5">
            Manage your telemetry streams, notification channels, and privacy controls
          </p>
        </div>

        <div className="space-y-6 divide-y divide-slate-100">
          {/* Notification Preferences */}
          <div className="pt-4 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-indigo-600 flex items-center gap-2">
              <Bell className="w-4 h-4" /> Notification Preferences
            </h3>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Push Notifications</p>
                <p className="text-xs text-slate-500">Receive real-time push alerts for vitals status updates</p>
              </div>
              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
                className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">AI Anomaly Spikes</p>
                <p className="text-xs text-slate-500">Instant notification when heart rate or SpO2 exceeds safe limits</p>
              </div>
              <input
                type="checkbox"
                checked={anomalyAlerts}
                onChange={() => setAnomalyAlerts(!anomalyAlerts)}
                className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Emergency Contact SMS</p>
                <p className="text-xs text-slate-500">Dispatch SMS to assigned doctor & next of kin during Emergency SOS</p>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={() => setSmsAlerts(!smsAlerts)}
                className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Privacy & Data Sync */}
          <div className="pt-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-indigo-600 flex items-center gap-2">
              <Shield className="w-4 h-4" /> Data Sync & Security
            </h3>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-900">HIPAA & FHIR Compliance Active</p>
              <p>Your streaming telemetry data is encrypted end-to-end using AES-256 and synchronized with Kafka & FHIR healthcare servers.</p>
            </div>
          </div>
        </div>

        <div className="pt-4 flex items-center space-x-3">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md shadow-indigo-600/30 transition-all cursor-pointer text-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
          {saved && <span className="text-xs font-bold text-emerald-600 animate-pulse">Preferences saved!</span>}
        </div>
      </div>
    </div>
  );
}
