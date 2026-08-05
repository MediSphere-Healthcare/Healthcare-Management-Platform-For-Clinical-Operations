import React, { useState } from 'react';
import { Sliders, Save, ShieldAlert, Check } from 'lucide-react';

export default function AdminAlertManagement() {
  const [thresholds, setThresholds] = useState({
    hrMax: 130,
    hrMin: 45,
    bpSystolicMax: 140,
    bpDiastolicMax: 90,
    spo2Min: 92,
    tempMax: 38.5
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center">
            <Sliders className="w-6 h-6 text-amber-400 mr-2.5" />
            Clinical Rule Engine Threshold Configuration
          </h2>
          <p className="text-xs text-slate-400 mt-1">Configure global vitals alert boundaries for automated Kafka event dispatches</p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold text-xs shadow-lg transition-all"
        >
          {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
          <span>{isSaved ? 'Thresholds Saved!' : 'Save Thresholds'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Heart Rate Boundaries */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 mr-2"></span>
            Heart Rate Thresholds (BPM)
          </h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Max HR (Tachycardia / AFib)</label>
              <input
                type="number"
                value={thresholds.hrMax}
                onChange={e => setThresholds({...thresholds, hrMax: parseInt(e.target.value) || 0})}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Min HR (Bradycardia)</label>
              <input
                type="number"
                value={thresholds.hrMin}
                onChange={e => setThresholds({...thresholds, hrMin: parseInt(e.target.value) || 0})}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Oxygen & BP Boundaries */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 mr-2"></span>
            Blood Oxygen & Pressure Limits
          </h3>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Min SpO2 (%)</label>
              <input
                type="number"
                value={thresholds.spo2Min}
                onChange={e => setThresholds({...thresholds, spo2Min: parseInt(e.target.value) || 0})}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Max Systolic BP (mmHg)</label>
              <input
                type="number"
                value={thresholds.bpSystolicMax}
                onChange={e => setThresholds({...thresholds, bpSystolicMax: parseInt(e.target.value) || 0})}
                className="w-full p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
