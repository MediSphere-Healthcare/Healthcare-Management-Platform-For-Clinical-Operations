import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowRight, 
  User, 
  Clock, 
  Check, 
  XCircle,
  Heart,
  Droplet,
  Activity,
  Thermometer
} from 'lucide-react';

export default function AlertManagement({ alerts = [], onAcknowledgeAlert, onCloseAlert }) {
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ACTIVE');

  const filteredAlerts = alerts.filter(alert => {
    const matchesSeverity = filterSeverity === 'ALL' || alert.severity === filterSeverity;
    const matchesStatus = filterStatus === 'ALL' || alert.status === filterStatus;
    return matchesSeverity && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow">
            5
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Doctor – Clinical Alert Management
          </h1>
        </div>
        <span className="bg-[#6344E7] text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm">
          Doctor
        </span>
      </div>

      {/* Header & Filter Controls Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Active Clinical Alerts ({filteredAlerts.length})
          </h2>
          <p className="text-sm text-slate-500 font-normal mt-0.5">
            Automated multi-tier alert triage and specialty routing
          </p>
        </div>

        {/* Clean Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <div className="flex bg-white border border-slate-200/80 p-1 rounded-xl text-xs font-semibold text-slate-600 shadow-2xs">
            {['ACTIVE', 'ACKNOWLEDGED', 'CLOSED', 'ALL'].map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterStatus === st ? 'bg-indigo-600 text-white font-bold shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Severity Filter */}
          <div className="flex bg-white border border-slate-200/80 p-1 rounded-xl text-xs font-semibold text-slate-600 shadow-2xs">
            {['ALL', 'Critical', 'High', 'Medium', 'Low'].map(sev => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  filterSeverity === sev ? 'bg-slate-900 text-white font-bold shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts Cards List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl text-slate-400 space-y-2 shadow-sm">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <p className="font-bold text-slate-800 text-base">No Alerts Matching Selected Filters</p>
            <p className="text-xs text-slate-500">All patient vital parameters are currently within safe thresholds.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const hr = alert.vitalsTrigger?.heartRate || alert.vitalsTrigger?.hr || 115;
            const spo2 = alert.vitalsTrigger?.spo2 || alert.vitalsTrigger?.spO2 || 91;
            const bp = alert.vitalsTrigger?.bp || (alert.vitalsTrigger?.bpSystolic ? `${alert.vitalsTrigger.bpSystolic}/${alert.vitalsTrigger.bpDiastolic || 80}` : '135/88');
            const temp = alert.vitalsTrigger?.temperature ? `${alert.vitalsTrigger.temperature}°C` : alert.vitalsTrigger?.temp ? `${alert.vitalsTrigger.temp}°C` : '37.0°C';

            return (
              <div
                key={alert.id}
                className="p-6 bg-white border border-slate-200/80 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-all"
              >
                {/* Card Top Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      alert.severity === 'Critical' ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                      alert.severity === 'High' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                      alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                      'bg-blue-100 text-blue-700 border border-blue-200'
                    }`}>
                      {alert.severity}
                    </span>
                    <span className="text-xs font-bold text-indigo-600">{alert.id}</span>
                    <span className="text-xs text-slate-500 font-medium">• {alert.assignedSpecialty}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-slate-400 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Detected: {alert.detectedAt}</span>
                    <span className={`ml-2 px-2.5 py-0.5 rounded-md font-bold text-[11px] ${
                      alert.status === 'ACTIVE' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
                      alert.status === 'ACKNOWLEDGED' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                      'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-1">
                  {/* Condition & Patient */}
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Alert Event</p>
                    <h3 className="text-lg font-bold text-slate-900">{alert.type}</h3>
                    <p className="text-xs font-semibold text-slate-700 flex items-center pt-1">
                      <User className="w-4 h-4 mr-1 text-indigo-600" />
                      <span>{alert.patientName}</span>
                    </p>
                  </div>

                  {/* Vitals Snapshot (4 Clean Cards) */}
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Vitals Triggered</p>
                    <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                      <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl flex items-center justify-between">
                        <span className="text-slate-500 font-medium">HR</span>
                        <strong className={hr >= 110 ? "text-rose-600 font-extrabold" : "text-slate-900 font-bold"}>{hr} BPM</strong>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl flex items-center justify-between">
                        <span className="text-slate-500 font-medium">SpO₂</span>
                        <strong className={spo2 <= 92 ? "text-rose-600 font-extrabold" : "text-blue-600 font-bold"}>{spo2}%</strong>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl flex items-center justify-between">
                        <span className="text-slate-500 font-medium">BP</span>
                        <strong className="text-slate-900 font-bold">{bp}</strong>
                      </div>
                      <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Temp</span>
                        <strong className="text-amber-600 font-bold">{temp}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Routed Recipients */}
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Routed Recipients</p>
                    <ul className="text-xs text-slate-600 space-y-1 pt-1">
                      {alert.routedTo?.map((r, i) => (
                        <li key={i} className="flex items-center">
                          <ArrowRight className="w-3.5 h-3.5 text-indigo-500 mr-1.5 flex-shrink-0" />
                          <span className="font-medium text-slate-700">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                  {alert.status === 'ACTIVE' && (
                    <button
                      onClick={() => onAcknowledgeAlert && onAcknowledgeAlert(alert.id)}
                      className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Acknowledge Alert</span>
                    </button>
                  )}

                  {alert.status !== 'CLOSED' && (
                    <button
                      onClick={() => onCloseAlert && onCloseAlert(alert.id)}
                      className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200/80 transition-all cursor-pointer"
                    >
                      <XCircle className="w-4 h-4 text-slate-400" />
                      <span>Close Alert</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
