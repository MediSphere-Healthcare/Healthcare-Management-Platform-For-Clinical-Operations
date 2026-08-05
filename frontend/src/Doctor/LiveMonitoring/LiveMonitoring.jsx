import React, { useState, useEffect } from 'react';
import { Heart, Activity, Thermometer, Zap, RefreshCw, Radio, Play, Pause, AlertOctagon } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function LiveMonitoring({ currentVitals, vitalsHistory, isAutoRefresh, toggleAutoRefresh, triggerSimulatedSpike }) {
  const [selectedPatient, setSelectedPatient] = useState('saurabh');

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between shadow-xl gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h2 className="text-xl font-extrabold text-white">Live Vitals Monitoring</h2>
            <span className="text-xs bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
              vitals-stream ACTIVE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Real-time Kafka telemetry stream for Patient: <strong className="text-cyan-400">Saurabh Kumar</strong></p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Auto Refresh Toggle */}
          <button
            onClick={toggleAutoRefresh}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              isAutoRefresh
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {isAutoRefresh ? <Pause className="w-4 h-4 text-emerald-400" /> : <Play className="w-4 h-4" />}
            <span>{isAutoRefresh ? 'Auto Refresh ON (4s)' : 'Auto Refresh PAUSED'}</span>
          </button>

          {/* Simulate Critical Anomaly Button */}
          <button
            onClick={triggerSimulatedSpike}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all"
          >
            <AlertOctagon className="w-4 h-4 animate-bounce" />
            <span>Simulate Anomaly Spike</span>
          </button>
        </div>
      </div>

      {/* 4 Core Vitals Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Heart Rate */}
        <div className={`p-5 rounded-2xl border shadow-xl relative overflow-hidden transition-all ${
          currentVitals.heartRate > 120 ? 'bg-rose-500/10 border-rose-500/40 text-rose-300' : 'bg-slate-900 border-slate-800 text-white'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Heart Rate (HR)</p>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-4xl font-extrabold">{currentVitals.heartRate}</span>
                <span className="text-xs text-slate-400 font-bold">BPM</span>
              </div>
            </div>
            <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl">
              <Heart className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <div className="mt-3 text-[11px] font-medium text-slate-400 flex items-center justify-between">
            <span>Normal: 60 - 100 BPM</span>
            <span className={currentVitals.heartRate > 120 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
              {currentVitals.heartRate > 120 ? 'High Tachycardia' : 'Normal Rhythm'}
            </span>
          </div>
        </div>

        {/* Blood Pressure */}
        <div className={`p-5 rounded-2xl border shadow-xl relative overflow-hidden transition-all ${
          currentVitals.bpSystolic >= 140 ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' : 'bg-slate-900 border-slate-800 text-white'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Blood Pressure (BP)</p>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-4xl font-extrabold">{currentVitals.bpSystolic}/{currentVitals.bpDiastolic}</span>
                <span className="text-xs text-slate-400 font-bold">mmHg</span>
              </div>
            </div>
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
              <Activity className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-3 text-[11px] font-medium text-slate-400 flex items-center justify-between">
            <span>Target: 120/80 mmHg</span>
            <span className={currentVitals.bpSystolic >= 140 ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
              {currentVitals.bpSystolic >= 140 ? 'Stage 1 Hypertension' : 'Optimal'}
            </span>
          </div>
        </div>

        {/* Oxygen Level SpO2 */}
        <div className={`p-5 rounded-2xl border shadow-xl relative overflow-hidden transition-all ${
          currentVitals.spo2 < 92 ? 'bg-rose-500/10 border-rose-500/40 text-rose-300' : 'bg-slate-900 border-slate-800 text-white'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Blood Oxygen (SpO₂)</p>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-4xl font-extrabold">{currentVitals.spo2}%</span>
              </div>
            </div>
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl">
              <Zap className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-3 text-[11px] font-medium text-slate-400 flex items-center justify-between">
            <span>Target: &gt; 95%</span>
            <span className={currentVitals.spo2 < 92 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
              {currentVitals.spo2 < 92 ? 'Hypoxia Risk' : 'Normal Oxygen'}
            </span>
          </div>
        </div>

        {/* Body Temperature */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl relative overflow-hidden text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Body Temperature</p>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-4xl font-extrabold">{currentVitals.temperature}°C</span>
              </div>
            </div>
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
              <Thermometer className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-3 text-[11px] font-medium text-slate-400 flex items-center justify-between">
            <span>Normal: 36.5 - 37.5°C</span>
            <span className={currentVitals.temperature >= 38.0 ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
              {currentVitals.temperature >= 38.0 ? 'Fever Spike' : 'Afebrile'}
            </span>
          </div>
        </div>
      </div>

      {/* Live Vitals Telemetry Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center">
              <Radio className="w-5 h-5 text-cyan-400 mr-2 animate-pulse" />
              Live Telemetry Stream (Heart Rate & Blood Pressure)
            </h3>
            <p className="text-xs text-slate-400">Streamed from Kafka topic: vitals-stream</p>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={vitalsHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="timestamp" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" domain={[50, 180]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
              />
              <Line type="monotone" dataKey="heartRate" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4 }} name="Heart Rate (BPM)" />
              <Line type="monotone" dataKey="bpSystolic" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} name="BP Systolic (mmHg)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
