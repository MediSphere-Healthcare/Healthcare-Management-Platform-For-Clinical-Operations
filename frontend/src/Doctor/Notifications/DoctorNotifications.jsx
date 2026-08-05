import React from 'react';
import { Bell, ShieldAlert, CheckCircle2, Clock, Info, AlertTriangle } from 'lucide-react';

export default function DoctorNotifications({ notifications = [] }) {
  // Fallback initial notifications if empty
  const feed = notifications.length > 0 ? notifications : [
    {
      id: 'n1',
      type: 'CRITICAL',
      title: 'Critical SpO₂ & AFib Alert',
      message: 'Saurabh Kumar: SpO₂ dropped to 89%, Heart Rate reached 145 BPM. Emergency dispatch triggered.',
      time: 'Just now'
    },
    {
      id: 'n2',
      type: 'ALERT',
      title: 'Hypertension Spike',
      message: 'Priya Verma: Blood Pressure reached 148/94 mmHg during evening telemetry check.',
      time: '15 mins ago'
    },
    {
      id: 'n3',
      type: 'INFO',
      title: 'Nebulizer Treatment Completed',
      message: 'Amit Sharma: SpO₂ stabilized at 97% following nebulizer administration in Pulmonology ward.',
      time: '1 hour ago'
    }
  ];

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner Header Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow">
            8
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Doctor – Messages & Notification Feed
          </h1>
        </div>
        <span className="bg-[#6344E7] text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm">
          Doctor
        </span>
      </div>

      {/* Subtitle Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Clinical Broadcasts & Messages ({feed.length})
        </h2>
        <p className="text-sm text-slate-500 font-normal mt-0.5">
          Real-time patient telemetry alerts, automated dispatches, and hospital broadcasts
        </p>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {feed.map((notif) => {
          const isCritical = notif.type === 'CRITICAL';
          const isAlert = notif.type === 'ALERT';

          return (
            <div
              key={notif.id}
              className="p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start space-x-4"
            >
              {/* Icon Box */}
              <div className={`p-3 rounded-xl flex-shrink-0 ${
                isCritical ? 'bg-rose-50 border border-rose-200 text-rose-600' :
                isAlert ? 'bg-amber-50 border border-amber-200 text-amber-600' :
                'bg-indigo-50 border border-indigo-200 text-indigo-600'
              }`}>
                {isCritical ? (
                  <ShieldAlert className="w-6 h-6 text-rose-600 animate-pulse" />
                ) : isAlert ? (
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                ) : (
                  <Info className="w-6 h-6 text-indigo-600" />
                )}
              </div>

              {/* Text Content */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-extrabold text-slate-900">
                      {notif.title}
                    </h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      isCritical ? 'bg-rose-100 text-rose-700' :
                      isAlert ? 'bg-amber-100 text-amber-700' :
                      'bg-indigo-100 text-indigo-700'
                    }`}>
                      {notif.type}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-slate-400 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{notif.time}</span>
                  </span>
                </div>

                <p className={`text-xs font-semibold leading-relaxed pt-0.5 ${
                  isCritical ? 'text-rose-700' :
                  isAlert ? 'text-amber-800' :
                  'text-slate-600'
                }`}>
                  {notif.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
