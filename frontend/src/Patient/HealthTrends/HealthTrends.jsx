import React from 'react';
import { TrendingUp, Activity } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function HealthTrends({ vitalsHistory, riskScore }) {
  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center">
            <TrendingUp className="w-6 h-6 text-cyan-400 mr-2" />
            Health Trends & Historical Analytics
          </h2>
          <p className="text-xs text-slate-400 mt-1">24-Hour continuous vital sign progression</p>
        </div>
        <div className="bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-xl text-xs font-bold text-cyan-400">
          AI Risk Score: {riskScore}%
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-white">Continuous Vital Trends Chart</h3>
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={vitalsHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="timestamp" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} />
              <Line type="monotone" dataKey="heartRate" stroke="#f43f5e" strokeWidth={3} name="Heart Rate (BPM)" />
              <Line type="monotone" dataKey="bpSystolic" stroke="#38bdf8" strokeWidth={3} name="BP Systolic (mmHg)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
