import React from 'react';
import { Pill, Clock, CheckCircle2, AlertCircle, Plus } from 'lucide-react';

export default function PatientMedications() {
  const medications = [
    {
      id: 1,
      name: 'Amlodipine Besylate',
      dosage: '5 mg',
      frequency: 'Once Daily (Morning)',
      purpose: 'Blood Pressure Control',
      time: '08:00 AM',
      status: 'Taken Today',
      doctor: 'Dr. Ramesh Gupta'
    },
    {
      id: 2,
      name: 'Atorvastatin Calcium',
      dosage: '10 mg',
      frequency: 'Once Daily (Night)',
      purpose: 'Cholesterol & Lipid Management',
      time: '09:00 PM',
      status: 'Scheduled',
      doctor: 'Dr. Ramesh Gupta'
    },
    {
      id: 3,
      name: 'Aspirin (Low Dose)',
      dosage: '81 mg',
      frequency: 'Once Daily (Morning)',
      purpose: 'Cardiovascular Support',
      time: '08:00 AM',
      status: 'Taken Today',
      doctor: 'Dr. Ramesh Gupta'
    }
  ];

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow">
            5
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Patient – Active Prescriptions & Medications
          </h1>
        </div>
        <span className="bg-[#6344E7] text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm">
          Patient
        </span>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Current Medications</h2>
            <p className="text-sm text-slate-500 font-normal mt-0.5">
              Prescribed dosage schedule and daily pill tracker
            </p>
          </div>
          <button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-semibold text-xs shadow-md shadow-indigo-600/30">
            <Plus className="w-4 h-4" />
            <span>Add Rx Reminder</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {medications.map((med) => (
            <div key={med.id} className="border border-slate-200/80 rounded-2xl p-5 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <Pill className="w-5 h-5" />
                </div>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  med.status === 'Taken Today' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {med.status}
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{med.name}</h3>
                <p className="text-xs font-semibold text-indigo-600 mt-0.5">{med.dosage} • {med.frequency}</p>
                <p className="text-xs text-slate-500 mt-2">Purpose: {med.purpose}</p>
              </div>
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-500" />{med.time}</span>
                <span>Rx by {med.doctor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
