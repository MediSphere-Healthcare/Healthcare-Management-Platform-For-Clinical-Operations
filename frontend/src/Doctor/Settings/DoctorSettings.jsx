import React, { useState } from 'react';
import { 
  Settings, 
  Bell, 
  ShieldAlert, 
  Sliders, 
  Volume2, 
  Smartphone, 
  Clock, 
  Save, 
  CheckCircle2,
  Stethoscope
} from 'lucide-react';

export default function DoctorSettings() {
  const [hrThreshold, setHrThreshold] = useState(110);
  const [spo2Threshold, setSpo2Threshold] = useState(92);
  const [soundAlerts, setSoundAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow">
            9
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Doctor – Command Center Settings
          </h1>
        </div>
        <span className="bg-[#6344E7] text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm">
          Doctor
        </span>
      </div>

      {/* Title */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Alert Thresholds & Preferences
        </h2>
        <p className="text-sm text-slate-500 font-normal mt-0.5">
          Configure telemetry alarm thresholds, audio notifications, and auto-dispatch rules
        </p>
      </div>

      {/* Floating Card Container */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xs border border-slate-200/80 space-y-6 max-w-4xl hover:shadow-md transition-all">
        <div className="space-y-6 divide-y divide-slate-100">
          
          {/* Anomaly Alarm Thresholds */}
          <div className="pt-2 space-y-4">
            <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4" /> Anomaly Threshold Settings
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-800">
                <span>Heart Rate Tachycardia Trigger</span>
                <span className="text-rose-600 font-extrabold">&gt; {hrThreshold} BPM</span>
              </div>
              <input
                type="range"
                min="90"
                max="160"
                value={hrThreshold}
                onChange={(e) => setHrThreshold(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <p className="text-[11px] text-slate-400">Triggers Critical Alarm when patient heart rate exceeds this threshold</p>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-semibold text-slate-800">
                <span>SpO₂ Hypoxia Trigger</span>
                <span className="text-blue-600 font-extrabold">&lt; {spo2Threshold} %</span>
              </div>
              <input
                type="range"
                min="85"
                max="96"
                value={spo2Threshold}
                onChange={(e) => setSpo2Threshold(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <p className="text-[11px] text-slate-400">Triggers Emergency Alert when blood oxygen drops below this value</p>
            </div>
          </div>

          {/* Sound & Dispatch Preferences */}
          <div className="pt-6 space-y-4">
            <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider flex items-center gap-2">
              <Bell className="w-4 h-4" /> Notification & Audio Controls
            </h3>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">ICU Audio Siren</p>
                <p className="text-xs text-slate-500">Play audio chime when critical anomaly event is detected</p>
              </div>
              <input
                type="checkbox"
                checked={soundAlerts}
                onChange={() => setSoundAlerts(!soundAlerts)}
                className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">Mobile Push Notifications</p>
                <p className="text-xs text-slate-500">Send push notifications for high risk patient vitals</p>
              </div>
              <input
                type="checkbox"
                checked={pushNotifications}
                onChange={() => setPushNotifications(!pushNotifications)}
                className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>

        </div>

        {/* Action Save Button */}
        <div className="pt-4 flex items-center space-x-3 border-t border-slate-100">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md shadow-indigo-600/30 transition-all cursor-pointer text-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
          {saved && <span className="text-xs font-bold text-emerald-600 animate-pulse">Settings updated successfully!</span>}
        </div>

      </div>
    </div>
  );
}
