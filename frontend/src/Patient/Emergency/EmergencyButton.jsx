import React, { useState } from 'react';
import { ShieldAlert, PhoneCall, CheckCircle2 } from 'lucide-react';

export default function EmergencyButton({ onTrigger }) {
  const [isTriggered, setIsTriggered] = useState(false);

  const handleClick = () => {
    setIsTriggered(true);
    if (onTrigger) onTrigger();
    setTimeout(() => setIsTriggered(false), 8000);
  };

  return (
    <div className="bg-gradient-to-r from-rose-950/60 via-slate-900 to-slate-900 border-2 border-rose-500/40 p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-rose-500/20 text-rose-400 rounded-2xl border border-rose-500/40 animate-pulse">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-white">Emergency SOS Response System</h3>
          <p className="text-xs text-slate-300">Instantly alerts Assigned Doctor, Nurse Duty Desk, and Emergency Contacts</p>
        </div>
      </div>

      <button
        onClick={handleClick}
        disabled={isTriggered}
        className={`px-6 py-3.5 rounded-2xl font-extrabold text-sm shadow-2xl flex items-center space-x-2 transition-all ${
          isTriggered
            ? 'bg-emerald-600 text-white shadow-emerald-600/30'
            : 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-rose-600/40 animate-bounce'
        }`}
      >
        {isTriggered ? (
          <>
            <CheckCircle2 className="w-5 h-5" />
            <span>SOS Dispatched! Help En Route</span>
          </>
        ) : (
          <>
            <PhoneCall className="w-5 h-5" />
            <span>PRESS FOR 1-CLICK EMERGENCY SOS</span>
          </>
        )}
      </button>
    </div>
  );
}
