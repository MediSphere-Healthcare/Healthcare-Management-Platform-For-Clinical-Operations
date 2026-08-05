import React from 'react';
import { History, FileText, Calendar, Clock, UserCheck, ChevronRight } from 'lucide-react';

export default function MedicalHistory() {
  const historyLogs = [
    {
      id: 1,
      date: 'Aug 04, 2026',
      time: '11:30 AM',
      doctor: 'Dr. Ramesh Gupta (Cardiology)',
      title: 'Routine ECG & Hypertension Checkup',
      type: 'Consultation',
      status: 'Completed',
      notes: 'Blood pressure controlled at 124/82 mmHg. Continue current medication dosage.'
    },
    {
      id: 2,
      date: 'Jul 28, 2026',
      time: '04:15 PM',
      doctor: 'MediSphere AI Anomaly Detector',
      title: 'Transient SpO2 Drop (91%) Alert Logged',
      type: 'System Alert',
      status: 'Resolved',
      notes: 'Auto-resolved after 3 minutes. Oxygen saturation restored to 98%.'
    },
    {
      id: 3,
      date: 'Jul 15, 2026',
      time: '09:00 AM',
      doctor: 'Dr. Ramesh Gupta',
      title: 'Quarterly Lipid Profile & Blood Panel',
      type: 'Lab Test',
      status: 'Normal',
      notes: 'Total Cholesterol 185 mg/dL, HDL 55 mg/dL, LDL 110 mg/dL. Normal limits.'
    }
  ];

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow">
            3
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Patient – Medical History & Archives
          </h1>
        </div>
        <span className="bg-[#6344E7] text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm">
          Patient
        </span>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Health History</h2>
          <p className="text-sm text-slate-500 font-normal mt-0.5">
            Timeline of consultations, lab results, and automated telemetry alerts
          </p>
        </div>

        <div className="space-y-4">
          {historyLogs.map((log) => (
            <div key={log.id} className="border border-slate-200/90 rounded-2xl p-5 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col md:flex-row justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center space-x-3 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-indigo-500" />{log.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-indigo-500" />{log.time}</span>
                  <span className="bg-indigo-100 text-indigo-700 font-bold px-2.5 py-0.5 rounded-md">{log.type}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{log.title}</h3>
                <p className="text-xs text-slate-600">{log.notes}</p>
                <p className="text-[11px] text-slate-400 font-medium pt-1">Attending: <strong className="text-slate-700">{log.doctor}</strong></p>
              </div>

              <div className="flex items-center justify-between md:justify-end space-x-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {log.status}
                </span>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
