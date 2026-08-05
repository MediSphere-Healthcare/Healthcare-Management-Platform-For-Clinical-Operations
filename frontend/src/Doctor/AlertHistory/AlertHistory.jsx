import React, { useState } from 'react';
import { History, Search, Calendar, CheckCircle2, User, FileText } from 'lucide-react';

export default function AlertHistory({ alerts }) {
  const [searchTerm, setSearchTerm] = useState('');

  const historyAlerts = alerts.filter(a => 
    a.status === 'CLOSED' || a.status === 'ACKNOWLEDGED'
  ).filter(a => 
    a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center">
            <History className="w-6 h-6 text-cyan-400 mr-2.5" />
            Alert Resolution & Audit History
          </h2>
          <p className="text-xs text-slate-400 mt-1">Archived log of past acknowledged and resolved clinical alerts</p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search history by patient or alert..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 w-64"
          />
        </div>
      </div>

      {/* History Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/80 text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-800">
              <th className="p-4">Alert ID</th>
              <th className="p-4">Patient</th>
              <th className="p-4">Condition / Type</th>
              <th className="p-4">Severity</th>
              <th className="p-4">Resolved By</th>
              <th className="p-4">Timestamp</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-xs text-slate-300">
            {historyAlerts.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-slate-500 font-medium">
                  No historical resolved alerts found.
                </td>
              </tr>
            ) : (
              historyAlerts.map((alert) => (
                <tr key={alert.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-bold text-white">{alert.id}</td>
                  <td className="p-4 font-semibold text-cyan-300">{alert.patientName}</td>
                  <td className="p-4 font-medium text-slate-200">{alert.type}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded font-extrabold text-[10px] ${
                      alert.severity === 'Critical' ? 'bg-rose-600 text-white' :
                      alert.severity === 'High' ? 'bg-amber-600 text-white' :
                      'bg-blue-600 text-white'
                    }`}>
                      {alert.severity}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300 font-medium">{alert.acknowledgedBy || alert.assignedDoctor}</td>
                  <td className="p-4 text-slate-400">{alert.acknowledgedAt || alert.detectedAt}</td>
                  <td className="p-4">
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold text-[10px]">
                      {alert.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
