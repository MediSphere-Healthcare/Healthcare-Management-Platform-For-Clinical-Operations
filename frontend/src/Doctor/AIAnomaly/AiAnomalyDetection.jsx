import React from 'react';
import { 
  ChevronLeft, 
  Info, 
  Heart, 
  Droplet, 
  Thermometer, 
  Activity, 
  AlertTriangle, 
  FileText,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export default function AiAnomalyDetection({ patient, onBack }) {
  // Active patient metadata from actual clicked patient or fallback
  const activePatient = patient || {
    name: 'Sarah Mitchell',
    id: 'P10023',
    age: 52,
    gender: 'Female',
    ward: 'Cardiology',
    hr: 145,
    spo2: 88,
    temp: 37.0,
    bp: '128/82',
    event: 'Heart Rate Spike',
    prediction: 'Possible Atrial Fibrillation',
    confidence: 89,
    condition: 'Cardiology Patient'
  };

  const isFemale = activePatient.gender === 'Female' || activePatient.name.toLowerCase().includes('priya') || activePatient.name.toLowerCase().includes('sarah');
  const avatarUrl = isFemale
    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200";

  const patientIdDisplay = activePatient.id ? (String(activePatient.id).startsWith('P') ? String(activePatient.id) : `PAT-${String(activePatient.id).toUpperCase()}`) : 'P10023';
  const currentHr = activePatient.hr || activePatient.vitals?.heartRate || 145;
  const currentSpo2 = activePatient.spo2 || activePatient.vitals?.spo2 || 88;
  const currentTemp = activePatient.temp || activePatient.vitals?.temperature || 37.0;
  const currentBp = activePatient.bp || (activePatient.vitals ? `${activePatient.vitals.bpSystolic}/${activePatient.vitals.bpDiastolic}` : '128/82');
  const confidenceScore = activePatient.confidence || activePatient.riskScore || 89;

  // ECG Waveform simulated dataset
  const ecgData = [
    { v: 10 }, { v: 12 }, { v: 10 }, { v: 10 }, { v: 40 }, { v: -20 }, { v: 80 }, { v: -30 }, { v: 10 }, { v: 10 },
    { v: 12 }, { v: 10 }, { v: 10 }, { v: 50 }, { v: -25 }, { v: 95 }, { v: -35 }, { v: 10 }, { v: 10 }, { v: 12 }
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow">
            4
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Doctor – AI Anomaly Detection
          </h1>
        </div>
        <span className="bg-[#6344E7] text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm">
          Doctor
        </span>
      </div>

      {/* Navigation & Subtitle Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-1 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer mb-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Monitoring Command Center</span>
          </button>
          <h2 className="text-2xl font-bold text-slate-900">
            AI Analysis – {activePatient.name}
          </h2>
          <p className="text-sm text-slate-500 font-normal">
            Anomaly detection and risk prediction for active patient
          </p>
        </div>

        <button className="p-2.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-white bg-white/80 border border-slate-200/80 transition-colors shadow-2xs self-start sm:self-auto">
          <Info className="w-5 h-5" />
        </button>
      </div>

      {/* 2x3 Floating Cards Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Card 1: Patient Profile */}
        <div className="border border-slate-200/80 rounded-2xl p-6 bg-white space-y-4 shadow-2xs flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex flex-col items-center text-center space-y-3 pt-2">
            <img
              src={avatarUrl}
              alt={activePatient.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-indigo-50 shadow-md"
            />
            <div>
              <h3 className="text-xl font-bold text-slate-900">{activePatient.name}</h3>
              <p className="text-xs font-semibold text-indigo-600 mt-0.5">
                Patient ID: {patientIdDisplay}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Age: {activePatient.age || 52} | {activePatient.gender || 'Female'}
              </p>
              <p className="text-xs text-slate-500">
                Ward: {activePatient.ward || activePatient.specialtyRequired || 'Cardiology'}
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Detected Event & ECG Waveform */}
        <div className="border border-slate-200/80 rounded-2xl p-6 bg-white space-y-4 shadow-2xs hover:shadow-md transition-all">
          <div>
            <span className="text-xs font-semibold text-slate-400">Detected Event</span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              {currentHr >= 110 ? 'Heart Rate Spike' : 'Normal Telemetry Event'}
            </h3>
          </div>

          {/* ECG Waveform Chart */}
          <div className="h-24 w-full bg-rose-50/40 rounded-xl p-2 border border-rose-100/60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ecgData}>
                <Line type="monotone" dataKey="v" stroke={currentHr >= 110 ? '#f43f5e' : '#10b981'} strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Deviation Stats Row */}
          <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-slate-100">
            <div>
              <p className="text-[10px] font-semibold text-slate-400">Current HR</p>
              <p className={`text-base font-extrabold ${currentHr >= 110 ? 'text-rose-600' : 'text-slate-900'}`}>{currentHr} <span className="text-[10px] font-normal">bpm</span></p>
              <span className={`text-[9px] font-bold uppercase ${currentHr >= 110 ? 'text-rose-500' : 'text-emerald-500'}`}>{currentHr >= 110 ? 'High' : 'Normal'}</span>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-400">Expected Range</p>
              <p className="text-xs font-bold text-slate-800 mt-1">60 – 100 <span className="text-[10px] font-normal">bpm</span></p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-400">Deviation</p>
              <p className={`text-base font-extrabold mt-0.5 ${currentHr >= 100 ? 'text-rose-600' : 'text-emerald-600'}`}>
                {currentHr > 100 ? `+${currentHr - 100}` : '0'} <span className="text-[10px] font-normal">bpm</span>
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: AI Prediction & Confidence Ring */}
        <div className="border border-slate-200/80 rounded-2xl p-6 bg-white space-y-3 shadow-2xs flex flex-col justify-between items-center text-center hover:shadow-md transition-all">
          <div>
            <span className="text-xs font-semibold text-slate-400">AI Prediction</span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              {currentHr >= 110 ? 'Possible Atrial Fibrillation' : 'Normal Rhythm Pattern'}
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-1">Confidence Score</p>
          </div>

          {/* Circular Progress Gauge */}
          <div className="relative w-28 h-28 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-blue-600"
                strokeDasharray={`${confidenceScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold text-slate-900">{confidenceScore}%</span>
            </div>
          </div>

          <span className="text-xs font-bold text-slate-600 pb-1">
            High Confidence
          </span>
        </div>

        {/* Card 4: Recent Vitals */}
        <div className="border border-slate-200/80 rounded-2xl p-6 bg-white space-y-4 shadow-2xs hover:shadow-md transition-all">
          <h3 className="text-sm font-bold text-slate-900">Recent Vitals</h3>
          
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span className="font-semibold text-slate-700">HR</span>
              </div>
              <span className={`font-extrabold ${currentHr >= 110 ? 'text-rose-600' : 'text-slate-900'}`}>{currentHr} bpm</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
              <div className="flex items-center space-x-2">
                <Droplet className="w-4 h-4 text-blue-500" />
                <span className="font-semibold text-slate-700">SpO₂</span>
              </div>
              <span className={`font-extrabold ${currentSpo2 <= 92 ? 'text-rose-600' : 'text-blue-600'}`}>{currentSpo2} %</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
              <div className="flex items-center space-x-2">
                <Thermometer className="w-4 h-4 text-amber-500" />
                <span className="font-semibold text-slate-700">Temp</span>
              </div>
              <span className="font-extrabold text-amber-600">{currentTemp} °C</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-emerald-500" />
                <span className="font-semibold text-slate-700">BP</span>
              </div>
              <span className="font-extrabold text-slate-800">{currentBp} mmHg</span>
            </div>
          </div>
        </div>

        {/* Card 5: Contributing Factors (AI) */}
        <div className="border border-slate-200/80 rounded-2xl p-6 bg-white space-y-4 shadow-2xs hover:shadow-md transition-all">
          <h3 className="text-sm font-bold text-slate-900">Contributing Factors (AI)</h3>

          <div className="space-y-3.5 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Heart Rate</span>
                <span className="text-indigo-600 font-bold">+8%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full w-[80%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>SpO₂ Level</span>
                <span className="text-indigo-600 font-bold">+6%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full w-[60%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Age Factor</span>
                <span className="text-indigo-600 font-bold">+5%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full w-[50%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Activity Level</span>
                <span className="text-indigo-600 font-bold">+3%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-indigo-400 h-2 rounded-full w-[30%]"></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Sleep Quality</span>
                <span className="text-indigo-600 font-bold">+2%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-indigo-300 h-2 rounded-full w-[20%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 6: Recommendation Banner */}
        <div className="bg-rose-50/80 border border-rose-200/80 rounded-2xl p-6 space-y-4 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all">
          <div>
            <h3 className="text-sm font-bold text-rose-600">Recommendation</h3>
            <p className="text-xs text-slate-700 font-medium mt-2">
              {currentHr >= 110 ? 'Immediate clinical review recommended.' : 'Patient vitals within safe parameters.'}
            </p>
          </div>

          <button className="w-full py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 text-xs font-bold shadow-xs hover:bg-slate-50 transition-all cursor-pointer">
            View Full Report
          </button>
        </div>

      </div>
    </div>
  );
}
