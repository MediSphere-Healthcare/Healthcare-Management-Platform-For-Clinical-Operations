import React from 'react';
import { Activity, Bell, Radio, RefreshCw, LogOut, UserCheck } from 'lucide-react';

export default function Navbar({ currentUser, onLogout, activeAlertsCount, isLiveStreaming, toggleLiveStream }) {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-lg px-6 py-3 flex items-center justify-between">
      {/* Brand Header */}
      <div className="flex items-center space-x-3">
        <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 p-2.5 rounded-xl shadow-cyan-500/20 shadow-lg">
          <Activity className="w-6 h-6 text-white animate-pulse" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
            MediSphere AI
          </h1>
          <p className="text-xs text-slate-400 font-medium">Milestone 3 • Real-Time Health & Alert Platform</p>
        </div>
      </div>

      {/* Center Stream Status */}
      <div className="hidden md:flex items-center space-x-4">
        <button
          onClick={toggleLiveStream}
          className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
            isLiveStreaming
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-sm shadow-emerald-500/20'
              : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
          }`}
        >
          <Radio className={`w-3.5 h-3.5 ${isLiveStreaming ? 'animate-ping text-emerald-400' : ''}`} />
          <span>{isLiveStreaming ? 'Kafka Streaming ACTIVE' : 'Kafka Stream Paused'}</span>
          <RefreshCw className={`w-3 h-3 ml-1 ${isLiveStreaming ? 'animate-spin' : ''}`} />
        </button>

        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2"></span>
          vitals-stream : 9092
        </span>
      </div>

      {/* Right User & Logout Selector */}
      <div className="flex items-center space-x-4">
        {/* Active Critical Alert Pill */}
        {activeAlertsCount > 0 && (
          <div className="relative">
            <button className="flex items-center space-x-1.5 bg-rose-500/20 border border-rose-500/40 text-rose-300 px-3 py-1.5 rounded-xl text-xs font-bold animate-bounce">
              <Bell className="w-4 h-4 text-rose-400" />
              <span>{activeAlertsCount} Alerts</span>
            </button>
          </div>
        )}

        {/* Current User Badge & Logout */}
        <div className="flex items-center space-x-3 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
          <div className="text-right text-xs">
            <p className="font-bold text-white leading-none">{currentUser?.name || 'User'}</p>
            <p className="text-[10px] text-cyan-400 font-semibold">{currentUser?.role} Portal</p>
          </div>
          <button
            onClick={onLogout}
            title="Switch Role / Logout"
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
