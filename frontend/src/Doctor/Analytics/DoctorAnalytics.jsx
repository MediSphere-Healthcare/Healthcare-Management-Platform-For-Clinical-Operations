import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart2, 
  PieChart as PieChartIcon, 
  Activity, 
  ShieldAlert, 
  Users, 
  Clock, 
  Calendar,
  ChevronDown
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  BarChart,
  Bar,
  Cell
} from 'recharts';

export default function DoctorAnalytics({ patients = [], alerts = [] }) {
  const [timeRange, setTimeRange] = useState('7D');

  // Simulated Analytics Telemetry Data
  const analyticsData = [
    { day: 'Mon', criticalAlerts: 4, totalEvents: 120, avgResponse: 3.8 },
    { day: 'Tue', criticalAlerts: 2, totalEvents: 98, avgResponse: 3.2 },
    { day: 'Wed', criticalAlerts: 6, totalEvents: 145, avgResponse: 4.1 },
    { day: 'Thu', criticalAlerts: 3, totalEvents: 110, avgResponse: 3.0 },
    { day: 'Fri', criticalAlerts: 5, totalEvents: 160, avgResponse: 3.5 },
    { day: 'Sat', criticalAlerts: 1, totalEvents: 85, avgResponse: 2.8 },
    { day: 'Sun', criticalAlerts: 2, totalEvents: 92, avgResponse: 3.1 },
  ];

  const wardDistribution = [
    { name: 'Cardiology ICU', count: 45, color: '#6366f1' },
    { name: 'Pulmonology', count: 28, color: '#06b6d4' },
    { name: 'Endocrinology', count: 22, color: '#10b981' },
    { name: 'General Medicine', count: 18, color: '#f59e0b' }
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Header Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow">
            7
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Doctor – Telemetry & Risk Analytics
          </h1>
        </div>
        <span className="bg-[#6344E7] text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm">
          Doctor
        </span>
      </div>

      {/* Title & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Clinical Risk Analytics
          </h2>
          <p className="text-sm text-slate-500 font-normal mt-0.5">
            Population health trends, anomaly velocity, and response time metrics
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-white border border-slate-200/80 p-1.5 rounded-xl text-xs font-semibold text-slate-600 shadow-2xs">
          {['24H', '7D', '30D', '90D'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                timeRange === range
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'hover:text-slate-900'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-slate-200/80 rounded-2xl p-5 bg-white shadow-2xs space-y-2 hover:shadow-md transition-all">
          <span className="text-xs font-semibold text-slate-500">Weekly Telemetry Events</span>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">810</p>
          <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +14.2% data throughput
          </p>
        </div>

        <div className="border border-slate-200/80 rounded-2xl p-5 bg-white shadow-2xs space-y-2 hover:shadow-md transition-all">
          <span className="text-xs font-semibold text-slate-500">Avg Anomaly Detection Rate</span>
          <p className="text-3xl font-extrabold text-indigo-600 tracking-tight">98.6%</p>
          <p className="text-[11px] font-bold text-indigo-600">
            Model accuracy benchmark
          </p>
        </div>

        <div className="border border-slate-200/80 rounded-2xl p-5 bg-white shadow-2xs space-y-2 hover:shadow-md transition-all">
          <span className="text-xs font-semibold text-slate-500">Critical Anomaly Spikes</span>
          <p className="text-3xl font-extrabold text-rose-600 tracking-tight">23</p>
          <p className="text-[11px] font-bold text-rose-600">
            Resolved in &lt; 5 mins
          </p>
        </div>

        <div className="border border-slate-200/80 rounded-2xl p-5 bg-white shadow-2xs space-y-2 hover:shadow-md transition-all">
          <span className="text-xs font-semibold text-slate-500">Mean Clinical Response</span>
          <p className="text-3xl font-extrabold text-slate-900 tracking-tight">3.2 <span className="text-xs font-normal text-slate-500">min</span></p>
          <p className="text-[11px] font-bold text-emerald-600">
            Target: &lt; 5.0 min
          </p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Anomaly Velocity Area Chart */}
        <div className="lg:col-span-2 border border-slate-200/80 rounded-2xl p-6 bg-white space-y-4 shadow-2xs hover:shadow-md transition-all">
          <h3 className="text-base font-bold text-slate-900">Weekly Critical Anomaly Spikes</h3>
          <div className="h-60 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff', fontSize: '12px' }} />
                <Area type="monotone" dataKey="criticalAlerts" stroke="#f43f5e" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAlerts)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ward Patient Distribution Bar Chart */}
        <div className="border border-slate-200/80 rounded-2xl p-6 bg-white space-y-4 shadow-2xs hover:shadow-md transition-all">
          <h3 className="text-base font-bold text-slate-900">Ward Patient Distribution</h3>
          <div className="space-y-3.5 pt-2">
            {wardDistribution.map((item) => (
              <div key={item.name} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold text-slate-700">
                  <span>{item.name}</span>
                  <span className="font-bold text-slate-900">{item.count} Patients</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{ width: `${(item.count / 50) * 100}%`, backgroundColor: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
