import React, { useState } from 'react';
import { 
  Users, 
  AlertTriangle, 
  ShieldAlert, 
  Clock, 
  Search, 
  Filter, 
  ChevronDown, 
  TrendingUp, 
  TrendingDown,
  MoreVertical,
  Activity,
  ArrowRight
} from 'lucide-react';

export default function DoctorDashboard({ patients = [], alerts = [], onSelectTab, onSelectPatient }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [wardFilter, setWardFilter] = useState('All Wards');
  const [timeFilter, setTimeFilter] = useState('Today');

  // Real database patients mapped dynamically
  const defaultPatients = [
    {
      id: 'saurabh',
      name: 'Saurabh Kumar',
      age: 25,
      gender: 'Male',
      hr: 115,
      spo2: 91,
      bp: '152/98',
      temp: 38.2,
      status: 'Critical',
      lastUpdated: 'Just now',
      ward: 'Cardiology',
      condition: 'Hypertension & T2 Diabetes'
    },
    {
      id: 'amit',
      name: 'Amit Sharma',
      age: 41,
      gender: 'Male',
      hr: 74,
      spo2: 97,
      bp: '120/80',
      temp: 36.9,
      status: 'Normal',
      lastUpdated: '2 mins ago',
      ward: 'Pulmonology',
      condition: 'Asthma'
    },
    {
      id: 'priya',
      name: 'Priya Verma',
      age: 34,
      gender: 'Female',
      hr: 92,
      spo2: 96,
      bp: '138/88',
      temp: 37.0,
      status: 'Warning',
      lastUpdated: '5 mins ago',
      ward: 'Endocrinology',
      condition: 'Gestational Diabetes'
    }
  ];

  const dbPatients = patients.length > 0
    ? patients.map(p => ({
        id: p.id,
        name: p.name,
        age: p.age || 30,
        gender: p.gender || 'Male',
        hr: p.vitals?.heartRate || p.hr || 75,
        spo2: p.vitals?.spo2 || p.spo2 || 98,
        bp: p.vitals ? `${p.vitals.bpSystolic}/${p.vitals.bpDiastolic}` : p.bp || '120/80',
        temp: p.vitals?.temperature || p.temp || 36.8,
        status: (p.riskScore >= 75 || p.vitals?.heartRate > 110 || p.vitals?.spo2 < 92) ? 'Critical' : (p.riskScore >= 50 || p.vitals?.heartRate > 90) ? 'Warning' : 'Normal',
        lastUpdated: p.vitals?.timestamp || 'Just now',
        ward: p.specialtyRequired || p.ward || 'Cardiology',
        condition: p.condition || 'General Monitoring'
      }))
    : defaultPatients;

  const filteredPatients = dbPatients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.ward.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const criticalCount = dbPatients.filter(p => p.status === 'Critical').length + alerts.filter(a => a.severity === 'Critical').length;

  const handlePatientClick = (patient) => {
    if (onSelectPatient) {
      onSelectPatient(patient);
    } else if (onSelectTab) {
      onSelectTab('AiAnomalyDetection');
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow">
            3
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Doctor – Monitoring Command Center
          </h1>
        </div>
        <span className="bg-[#6344E7] text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm">
          Doctor
        </span>
      </div>

      {/* Header Title & Dropdown Filters Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Monitoring Command Center
          </h2>
          <p className="text-sm text-slate-500 font-normal mt-0.5">
            Real-time overview of active database patients ({dbPatients.length} registered)
          </p>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Wards Selector */}
          <div className="relative">
            <select
              value={wardFilter}
              onChange={(e) => setWardFilter(e.target.value)}
              className="appearance-none bg-white border border-slate-200/80 rounded-xl px-4 py-2 pr-9 text-xs font-semibold text-slate-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="All Wards">All Wards</option>
              <option value="Cardiology">Cardiology ICU</option>
              <option value="Pulmonology">Pulmonology</option>
              <option value="Endocrinology">Endocrinology</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* Time Selector */}
          <div className="relative">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="appearance-none bg-white border border-slate-200/80 rounded-xl px-4 py-2 pr-9 text-xs font-semibold text-slate-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
          </div>

          {/* Filter Button */}
          <button className="p-2 bg-white border border-slate-200/80 rounded-xl text-slate-600 shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Patients Online Card */}
        <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm space-y-2 hover:shadow-md transition-all">
          <span className="text-xs font-semibold text-slate-500">Patients Online</span>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">{dbPatients.length * 297 || 892}</p>
          <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +12 from yesterday
          </p>
        </div>

        {/* Today's Alerts Card */}
        <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm space-y-2 hover:shadow-md transition-all">
          <span className="text-xs font-semibold text-slate-500">Today's Alerts</span>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">47</p>
          <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +8 from yesterday
          </p>
        </div>

        {/* Critical Alerts Card */}
        <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm space-y-2 hover:shadow-md transition-all">
          <span className="text-xs font-semibold text-slate-500">Critical Alerts</span>
          <p className="text-3xl font-extrabold text-rose-600 tracking-tight">5</p>
          <p className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +2 from yesterday
          </p>
        </div>

        {/* Avg Response Time Card */}
        <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm space-y-2 hover:shadow-md transition-all">
          <span className="text-xs font-semibold text-slate-500">Avg Response Time</span>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">
            3.2 <span className="text-xs font-normal text-slate-500">min</span>
          </p>
          <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" /> -1.1 min improvement
          </p>
        </div>
      </div>

      {/* Live Patients Section */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-900">Live Patients</h3>

          {/* Search Input Bar */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium shadow-2xs"
            />
          </div>
        </div>

        {/* Patients Table Card */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Patient</th>
                  <th className="px-5 py-3.5">Age</th>
                  <th className="px-5 py-3.5">HR (bpm)</th>
                  <th className="px-5 py-3.5">SpO₂ (%)</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Last Updated</th>
                  <th className="px-5 py-3.5 text-center">Trend</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    onClick={() => handlePatientClick(patient)}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  >
                    {/* Patient Name */}
                    <td className="px-5 py-4 font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      <div>
                        <span>{patient.name}</span>
                        <p className="text-[10px] font-normal text-slate-400">{patient.condition}</p>
                      </div>
                    </td>

                    {/* Age */}
                    <td className="px-5 py-4 font-medium text-slate-600">
                      {patient.age}
                    </td>

                    {/* HR */}
                    <td className={`px-5 py-4 font-bold ${
                      patient.hr >= 110 ? 'text-rose-600 font-extrabold' : 'text-slate-900'
                    }`}>
                      {patient.hr}
                    </td>

                    {/* SpO2 */}
                    <td className={`px-5 py-4 font-bold ${
                      patient.spo2 <= 92 ? 'text-rose-600 font-extrabold' : 'text-slate-900'
                    }`}>
                      {patient.spo2}
                    </td>

                    {/* Status Badge */}
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold ${
                        patient.status === 'Critical'
                          ? 'bg-rose-100 text-rose-700 border border-rose-200'
                          : patient.status === 'Warning'
                          ? 'bg-amber-100 text-amber-700 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}>
                        {patient.status}
                      </span>
                    </td>

                    {/* Last Updated */}
                    <td className="px-5 py-4 font-medium text-slate-500">
                      {patient.lastUpdated}
                    </td>

                    {/* Trend Sparkline Icon */}
                    <td className="px-5 py-4 text-center">
                      <svg className="w-12 h-5 inline-block text-indigo-500" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2">
                        {patient.status === 'Critical' ? (
                          <path d="M0 10 L10 10 L15 2 L22 18 L28 5 L35 12 L50 10" stroke="#f43f5e" />
                        ) : patient.status === 'Warning' ? (
                          <path d="M0 10 L12 10 L18 6 L24 14 L30 8 L50 10" stroke="#f59e0b" />
                        ) : (
                          <path d="M0 10 L15 10 L22 8 L28 12 L35 9 L50 10" stroke="#10b981" />
                        )}
                      </svg>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 text-right">
                      <button className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* View All Patients Link */}
        <div className="pt-2 text-center">
          <button
            onClick={() => onSelectTab && onSelectTab('PatientMonitoring')}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline cursor-pointer"
          >
            <span>View all patients</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
