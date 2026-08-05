import React, { useState } from 'react';
import { UserCheck, Plus, Search, Mail, Phone, Stethoscope } from 'lucide-react';

export default function ManageDoctors({ doctors, onAddDoctor }) {
  const [showForm, setShowForm] = useState(false);
  const [newDoctor, setNewDoctor] = useState({ name: '', specialty: 'Cardiologist', department: 'Cardiology', email: '', phone: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newDoctor.name) return;
    onAddDoctor({
      id: `doc-${Date.now()}`,
      ...newDoctor,
      activePatients: 0,
      status: 'Available',
      avatar: '👨‍⚕️'
    });
    setNewDoctor({ name: '', specialty: 'Cardiologist', department: 'Cardiology', email: '', phone: '' });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center">
            <UserCheck className="w-6 h-6 text-indigo-400 mr-2.5" />
            Manage Doctor Accounts & Specialties
          </h2>
          <p className="text-xs text-slate-400 mt-1">Register new doctors and map clinical alert routing specialties</p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Doctor</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-indigo-500/30 p-6 rounded-2xl space-y-4 shadow-2xl">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Register Doctor</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Doctor Full Name"
              value={newDoctor.name}
              onChange={e => setNewDoctor({...newDoctor, name: e.target.value})}
              className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              required
            />
            <select
              value={newDoctor.specialty}
              onChange={e => setNewDoctor({...newDoctor, specialty: e.target.value, department: e.target.value})}
              className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="Cardiologist">Cardiologist (Cardiac Routing)</option>
              <option value="Endocrinologist">Endocrinologist (Metabolic Routing)</option>
              <option value="Pulmonologist">Pulmonologist (Oxygen Routing)</option>
              <option value="General Physician">General Physician</option>
            </select>
            <input
              type="email"
              placeholder="Email Address"
              value={newDoctor.email}
              onChange={e => setNewDoctor({...newDoctor, email: e.target.value})}
              className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={newDoctor.phone}
              onChange={e => setNewDoctor({...newDoctor, phone: e.target.value})}
              className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-slate-800 text-slate-300 text-xs rounded-xl font-bold">Cancel</button>
            <button type="submit" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded-xl font-bold">Save Doctor</button>
          </div>
        </form>
      )}

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {doctors.map(doc => (
          <div key={doc.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-3">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{doc.avatar}</div>
              <div>
                <h4 className="text-base font-bold text-white">{doc.name}</h4>
                <p className="text-xs text-cyan-400 font-semibold">{doc.specialty}</p>
              </div>
            </div>
            <div className="text-xs text-slate-400 space-y-1">
              <p>Email: {doc.email}</p>
              <p>Phone: {doc.phone}</p>
              <p>Assigned Patients: <strong className="text-white">{doc.activePatients}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
