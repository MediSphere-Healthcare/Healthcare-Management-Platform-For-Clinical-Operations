import React from 'react';
import { ShieldCheck, UserCheck, Users, Sliders, FileText, Activity, Server, Database } from 'lucide-react';

export default function AdminDashboard({ doctors, patients, alerts, onSelectTab }) {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center">
            <ShieldCheck className="w-7 h-7 text-indigo-400 mr-2.5" />
            Admin System Control Portal
          </h2>
          <p className="text-xs text-slate-400 mt-1">Manage hospital staff, patients, system alert thresholds, and infrastructure analytics</p>
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => onSelectTab('ManageDoctors')}
          className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg cursor-pointer hover:border-indigo-500/50 transition-all"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Total Doctors</p>
              <h3 className="text-3xl font-extrabold text-white mt-1">{doctors.length}</h3>
            </div>
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-indigo-400 mt-3 font-medium">Manage Doctors Roster &rarr;</p>
        </div>

        <div 
          onClick={() => onSelectTab('ManagePatients')}
          className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg cursor-pointer hover:border-cyan-500/50 transition-all"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Registered Patients</p>
              <h3 className="text-3xl font-extrabold text-cyan-400 mt-1">{patients.length}</h3>
            </div>
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-cyan-400 mt-3 font-medium">Manage Onboarded Patients &rarr;</p>
        </div>

        <div 
          onClick={() => onSelectTab('AdminAlertManagement')}
          className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg cursor-pointer hover:border-amber-500/50 transition-all"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Active System Alerts</p>
              <h3 className="text-3xl font-extrabold text-amber-400 mt-1">{alerts.filter(a => a.status === 'ACTIVE').length}</h3>
            </div>
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
              <Sliders className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-amber-400 mt-3 font-medium">Configure Clinical Thresholds &rarr;</p>
        </div>

        <div 
          onClick={() => onSelectTab('Reports')}
          className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg cursor-pointer hover:border-emerald-500/50 transition-all"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Kafka Stream Status</p>
              <h3 className="text-xl font-extrabold text-emerald-400 mt-2 flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 mr-2 animate-ping"></span> ONLINE
              </h3>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
              <Server className="w-6 h-6" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-3 font-medium">Topic: vitals-stream</p>
        </div>
      </div>
    </div>
  );
}
