import React from 'react';
import { Heart, Activity, Zap, Thermometer } from 'lucide-react';

export default function MyVitals({ vitals }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-extrabold text-white">My Live Vitals Telemetry</h2>
        <p className="text-xs text-slate-400 mt-1">Real-time parameters streamed from your wearbed sensor</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center space-x-3 text-rose-400">
            <Heart className="w-6 h-6 animate-pulse" />
            <h3 className="text-lg font-bold text-white">Heart Rate Monitor</h3>
          </div>
          <p className="text-4xl font-extrabold text-white">{vitals.heartRate} <span className="text-base text-slate-400 font-normal">BPM</span></p>
          <div className="p-3 bg-slate-800 rounded-xl text-xs text-slate-300">
            Status: <span className="text-emerald-400 font-bold">Stable Range (60-100 BPM)</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <div className="flex items-center space-x-3 text-blue-400">
            <Activity className="w-6 h-6" />
            <h3 className="text-lg font-bold text-white">Blood Pressure (BP)</h3>
          </div>
          <p className="text-4xl font-extrabold text-white">{vitals.bpSystolic}/{vitals.bpDiastolic} <span className="text-base text-slate-400 font-normal">mmHg</span></p>
          <div className="p-3 bg-slate-800 rounded-xl text-xs text-slate-300">
            Status: <span className="text-blue-400 font-bold">Pre-hypertension monitor active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
