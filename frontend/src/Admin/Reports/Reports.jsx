import React from 'react';
import { FileText, Download, CheckCircle2, TrendingUp, AlertOctagon } from 'lucide-react';

export default function Reports() {
  const reports = [
    { title: 'Monthly Clinical Alert Audit Report', date: 'August 2026', size: '2.4 MB', status: 'Generated' },
    { title: 'Kafka Telemetry Latency & Ingestion Report', date: 'August 2026', size: '1.8 MB', status: 'Generated' },
    { title: 'AI Risk Prediction Accuracy Benchmark', date: 'July 2026', size: '4.1 MB', status: 'Archived' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white flex items-center">
            <FileText className="w-6 h-6 text-emerald-400 mr-2.5" />
            System Analytics & Clinical Audit Reports
          </h2>
          <p className="text-xs text-slate-400 mt-1">Exportable PDF/CSV reports for hospital management compliance</p>
        </div>
      </div>

      <div className="space-y-3">
        {reports.map((rep, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between shadow-xl">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">{rep.title}</h4>
                <p className="text-xs text-slate-400">{rep.date} • {rep.size}</p>
              </div>
            </div>

            <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold border border-slate-700">
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
