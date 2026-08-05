import React, { useState } from 'react';
import { 
  Watch, 
  Activity, 
  HeartPulse, 
  Plus, 
  ChevronRight, 
  Bell, 
  CheckCircle2, 
  Wifi, 
  Battery, 
  RefreshCw,
  Smartphone,
  X
} from 'lucide-react';

export default function ConnectedDevices({ patientName = "Patient", currentUser }) {
  const activeName = currentUser?.patient?.name || currentUser?.name || patientName;
  const isFemale = currentUser?.patient?.gender === 'Female' || activeName.toLowerCase().includes('priya') || activeName.toLowerCase().includes('sarah');
  const avatarUrl = isFemale 
    ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200";

  const [devices, setDevices] = useState([
    {
      id: 1,
      name: 'Apple Watch Series 9',
      metrics: 'Heart Rate, SpO₂, Activity',
      status: 'Connected',
      battery: 87,
      lastSync: '3 sec ago',
      icon: Watch,
      color: 'bg-slate-900 text-white',
      imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 2,
      name: 'Fitbit Charge 6',
      metrics: 'Steps, Sleep, Calories',
      status: 'Connected',
      battery: 74,
      lastSync: '5 sec ago',
      icon: Activity,
      color: 'bg-emerald-600 text-white',
      imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=200'
    },
    {
      id: 3,
      name: 'Omron BP Monitor',
      metrics: 'Blood Pressure',
      status: 'Connected',
      battery: 91,
      lastSync: '8 sec ago',
      icon: HeartPulse,
      color: 'bg-blue-600 text-white',
      imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=200'
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [newDeviceMetrics, setNewDeviceMetrics] = useState('');

  const handleAddDevice = (e) => {
    e.preventDefault();
    if (!newDeviceName) return;
    const newDevice = {
      id: Date.now(),
      name: newDeviceName,
      metrics: newDeviceMetrics || 'Vitals & Telemetry',
      status: 'Connected',
      battery: 100,
      lastSync: 'Just now',
      icon: Smartphone,
      color: 'bg-indigo-600 text-white',
      imageUrl: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=200'
    };
    setDevices([...devices, newDevice]);
    setNewDeviceName('');
    setNewDeviceMetrics('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Top Banner Bar Header matching mockup */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow">
            2
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Patient – Connected Devices
          </h1>
        </div>
        <span className="bg-[#6344E7] text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm">
          Patient
        </span>
      </div>

      {/* Main Card Container */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
        
        {/* Header Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Connected Devices
            </h2>
            <p className="text-sm text-slate-500 font-normal mt-0.5">
              All your health devices connected to MediSphere
            </p>
          </div>

          {/* Avatar & Bell Icon */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200">
              <Bell className="w-5 h-5 text-slate-700" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-2">
              <img
                src={avatarUrl}
                alt={activeName}
                className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100 shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Devices Cards Stack */}
        <div className="space-y-4">
          {devices.map((device) => {
            const IconComponent = device.icon;
            return (
              <div
                key={device.id}
                className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs hover:shadow-md transition-all group cursor-pointer"
              >
                {/* Left Side: Device Icon/Photo + Details */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200/60 shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                    {device.imageUrl ? (
                      <img src={device.imageUrl} alt={device.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-10 h-10 rounded-xl ${device.color} flex items-center justify-center`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {device.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      {device.metrics}
                    </p>
                  </div>
                </div>

                {/* Right Side: Status Badge, Battery, Last Sync, Arrow */}
                <div className="flex items-center justify-between md:justify-end space-x-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                  <span className="bg-emerald-100/80 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 border border-emerald-200/60">
                    {device.status}
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    Battery: {device.battery}%
                  </span>
                  <span className="text-xs font-medium text-slate-400">
                    Last sync: {device.lastSync}
                  </span>
                  <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Add New Device Card matching mockup */}
        <div
          onClick={() => setIsAddModalOpen(true)}
          className="border-2 border-dashed border-blue-200 hover:border-blue-400 bg-blue-50/20 hover:bg-blue-50/60 transition-all rounded-2xl p-8 text-center cursor-pointer space-y-1.5 group"
        >
          <div className="flex items-center justify-center space-x-2 text-blue-600 group-hover:text-blue-700">
            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-base font-bold">Add New Device</span>
          </div>
          <p className="text-xs text-slate-500">
            Connect a new wearable or health device
          </p>
        </div>

      </div>

      {/* Add Device Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Pair New Device</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDevice} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Device Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dexcom G7 Continuous Glucose Monitor"
                  value={newDeviceName}
                  onChange={(e) => setNewDeviceName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Monitored Vitals / Features
                </label>
                <input
                  type="text"
                  placeholder="e.g. Blood Glucose, Trend Arrow"
                  value={newDeviceMetrics}
                  onChange={(e) => setNewDeviceMetrics(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md shadow-indigo-600/30"
                >
                  Connect Device
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
