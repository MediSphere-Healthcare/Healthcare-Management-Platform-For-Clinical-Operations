import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Droplet, 
  Thermometer, 
  Activity, 
  ShieldCheck, 
  Bell, 
  Zap,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function PatientDashboard({ vitals, riskScore, riskLevel, vitalsHistory, onEmergencyTrigger, patientName = "Sarah Mitchell", currentUser }) {
  const [timeRange, setTimeRange] = useState('6H');
  const [lastSyncSeconds, setLastSyncSeconds] = useState(2);

  const activePatientName = currentUser?.patient?.name || currentUser?.name || patientName;
  const isFemale = currentUser?.patient?.gender === 'Female' || activePatientName.toLowerCase().includes('priya') || activePatientName.toLowerCase().includes('sarah');
  const avatarUrl = isFemale 
    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200";

  // Dynamic seconds counter for "Last updated: X sec ago"
  useEffect(() => {
    const timer = setInterval(() => {
      setLastSyncSeconds((prev) => (prev >= 10 ? 1 : prev + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Format vitals trend history for Recharts line chart
  const sampleTrendData = [
    { time: '04:00', heartRate: 74, spo2: 97, temp: 36.6 },
    { time: '06:00', heartRate: 76, spo2: 98, temp: 36.7 },
    { time: '08:00', heartRate: 82, spo2: 98, temp: 36.9 },
    { time: '10:00', heartRate: 78, spo2: 99, temp: 36.8 },
    { time: '12:00', heartRate: 80, spo2: 98, temp: 36.8 },
    { time: '14:00', heartRate: 78, spo2: 98, temp: 36.8 },
  ];

  const trendData = vitalsHistory && vitalsHistory.length >= 6
    ? vitalsHistory.map((item, idx) => ({
        time: item.timestamp || `0${idx*2}:00`,
        heartRate: item.heartRate || 78,
        spo2: item.spo2 || 98,
        temp: item.temperature || 36.8
      }))
    : sampleTrendData;

  const currentHeartRate = vitals?.heartRate || 78;
  const currentSpO2 = vitals?.spo2 || 98;
  const currentTemp = vitals?.temperature || 36.8;
  const currentBp = `${vitals?.bpSystolic || 120}/${vitals?.bpDiastolic || 80}`;

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner Bar Header matching mockup */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow">
            1
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Patient – Live Health Dashboard
          </h1>
        </div>
        <span className="bg-[#6344E7] text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm">
          Patient
        </span>
      </div>

      {/* Main Dashboard Card Container */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
        
        {/* Header Greeting Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              Hello, {activePatientName} <span className="inline-block animate-bounce">👋</span>
            </h2>
            <p className="text-sm text-slate-500 font-normal mt-0.5">
              Here is your real-time health overview
            </p>
          </div>

          {/* User Actions & Avatar */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200">
              <Bell className="w-5 h-5 text-slate-700" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-2">
              <img
                src={avatarUrl}
                alt={activePatientName}
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Live Vitals Header & Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Live Vitals</h3>
            <span className="text-xs font-medium text-slate-400">
              Last updated: {lastSyncSeconds} sec ago
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Heart Rate Card */}
            <div className="bg-slate-50/70 border border-slate-200/70 p-5 rounded-2xl space-y-3 hover:shadow-md transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                  <Heart className="w-5 h-5 fill-red-500/20 text-red-500" />
                </div>
                <span className="text-xs font-semibold text-slate-600">Heart Rate</span>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {currentHeartRate} <span className="text-xs font-normal text-slate-500 ml-0.5">bpm</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-1 font-medium">
                  Normal: 60-100 bpm
                </p>
              </div>
            </div>

            {/* SpO2 Card */}
            <div className="bg-slate-50/70 border border-slate-200/70 p-5 rounded-2xl space-y-3 hover:shadow-md transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                  <Droplet className="w-5 h-5 fill-blue-500/20 text-blue-500" />
                </div>
                <span className="text-xs font-semibold text-slate-600">SpO₂</span>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {currentSpO2}<span className="text-lg font-bold text-slate-700">%</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-1 font-medium">
                  Normal: 95-100%
                </p>
              </div>
            </div>

            {/* Temperature Card */}
            <div className="bg-slate-50/70 border border-slate-200/70 p-5 rounded-2xl space-y-3 hover:shadow-md transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <Thermometer className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-xs font-semibold text-slate-600">Temperature</span>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {currentTemp} <span className="text-xs font-normal text-slate-500 ml-0.5">°C</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-1 font-medium">
                  Normal: 36.5-37.5°C
                </p>
              </div>
            </div>

            {/* Blood Pressure Card */}
            <div className="bg-slate-50/70 border border-slate-200/70 p-5 rounded-2xl space-y-3 hover:shadow-md transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Activity className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-xs font-semibold text-slate-600">Blood Pressure</span>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {currentBp} <span className="text-xs font-normal text-slate-500 ml-0.5">mmHg</span>
                </p>
                <p className="text-[11px] text-slate-400 mt-1 font-medium">
                  Normal: 90/60-120/80
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Trend & Risk Status Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Trend Chart (Spans 2 columns) */}
          <div className="lg:col-span-2 border border-slate-200/80 rounded-2xl p-5 space-y-4 bg-white shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-base font-bold text-slate-900">Today's Trend</h3>
              
              {/* Time Range Filter Pills */}
              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600 self-start">
                {['6H', '12H', '1D', '7D'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded-lg transition-all ${
                      timeRange === range
                        ? 'bg-white text-slate-900 shadow-xs font-bold'
                        : 'hover:text-slate-900'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Legend Indicators */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600 pt-1">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>Heart Rate (bpm)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span>SpO₂ (%)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Temperature (°C)</span>
              </div>
            </div>

            {/* Line Chart */}
            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} domain={[30, 160]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }} 
                  />
                  <Line type="monotone" dataKey="heartRate" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 3, fill: '#f43f5e' }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="spo2" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3, fill: '#3b82f6' }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: '#f59e0b' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Side: Risk Status & Today's Steps */}
          <div className="space-y-4 flex flex-col justify-between">
            {/* Risk Status Card */}
            <div className="border border-slate-200/80 rounded-2xl p-6 bg-white flex flex-col items-center justify-center text-center space-y-3 shadow-xs flex-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Risk Status
              </span>
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-emerald-600">
                  {riskLevel === 'Critical' ? 'High Risk' : 'Low Risk'}
                </p>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  You are doing great!
                </p>
              </div>
            </div>

            {/* Today's Steps Card */}
            <div className="border border-slate-200/80 rounded-2xl p-5 bg-white space-y-3 shadow-xs">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>Today's Steps</span>
                <span className="text-slate-900 font-extrabold">6,842 / 10,000</span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-emerald-500 h-2.5 rounded-full w-[68%] transition-all duration-500"></div>
              </div>
              <p className="text-[10px] text-right text-slate-400 font-medium">68%</p>
            </div>
          </div>
        </div>

        {/* Emergency SOS Banner matching mockup */}
        <div className="bg-rose-50/90 border border-rose-200/80 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-slate-900">
              Feeling unwell?
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Tap the button to alert your care team
            </p>
          </div>
          <button
            onClick={onEmergencyTrigger}
            className="bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold px-6 py-3 rounded-xl shadow-lg shadow-red-600/30 transition-all duration-150 flex items-center justify-center space-x-2 text-sm cursor-pointer"
          >
            <AlertCircle className="w-4 h-4 text-white" />
            <span>Emergency SOS</span>
          </button>
        </div>

      </div>
    </div>
  );
}
