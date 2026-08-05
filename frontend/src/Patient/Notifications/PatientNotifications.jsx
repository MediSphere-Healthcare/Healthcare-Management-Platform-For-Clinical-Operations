import React from 'react';
import { Bell, HeartPulse, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function PatientNotifications() {
  const patientNotifs = [
    { id: 1, title: 'Medication Reminder', message: 'Take Metformin 500mg after dinner.', time: '10 mins ago', icon: HeartPulse },
    { id: 2, title: 'Doctor Check-in', message: 'Dr. Ramesh Gupta reviewed your morning BP reading.', time: '1 hour ago', icon: CheckCircle2 },
    { id: 3, title: 'Vitals Goal Achieved', message: 'SpO2 level maintained above 96% for 12 hours.', time: '3 hours ago', icon: CheckCircle2 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-extrabold text-white flex items-center">
          <Bell className="w-6 h-6 text-cyan-400 mr-2" />
          My Notifications & Reminders
        </h2>
        <p className="text-xs text-slate-400 mt-1">Prescription alerts, vital sign check-ins, and care updates</p>
      </div>

      <div className="space-y-3">
        {patientNotifs.map((n) => {
          const Icon = n.icon;
          return (
            <div key={n.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-start space-x-4 shadow-lg">
              <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl">
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white">{n.title}</h4>
                  <span className="text-[10px] text-slate-400">{n.time}</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">{n.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
