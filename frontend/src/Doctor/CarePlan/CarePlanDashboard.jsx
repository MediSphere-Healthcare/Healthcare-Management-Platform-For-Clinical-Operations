import React, { useState, useEffect } from 'react';
import { fetchCarePlanDashboard } from '../../Backend/carePlanService';

export default function CarePlanDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchCarePlanDashboard().then(setStats);
  }, []);

  return (
    <div style={{ padding: '1.5rem', color: '#e2e8f0' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '1.5rem',
        borderRadius: '16px',
        border: '1px solid #334155',
        marginBottom: '1.5rem'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700', color: '#f8fafc' }}>
          📊 Care Plan Operational Dashboard
        </h1>
        <p style={{ margin: '0.25rem 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>
          Real-time metrics on active care plans, adherence rates, pending approvals, and clinical outcomes
        </p>
      </div>

      {/* 5 Core Metrics Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          padding: '1.25rem',
          borderRadius: '16px',
          border: '1px solid #3b82f6',
          boxShadow: '0 8px 16px rgba(59,130,246,0.15)'
        }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>Active Care Plans</span>
          <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#60a5fa', marginTop: '0.25rem' }}>
            {stats?.activeCarePlans || 1124}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#38bdf8' }}>Across all units</span>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          padding: '1.25rem',
          borderRadius: '16px',
          border: '1px solid #22c55e',
          boxShadow: '0 8px 16px rgba(34,197,94,0.15)'
        }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>Average Adherence</span>
          <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#4ade80', marginTop: '0.25rem' }}>
            {stats?.averageAdherence || '78%'}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#4ade80' }}>+4.2% from last month</span>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          padding: '1.25rem',
          borderRadius: '16px',
          border: '1px solid #eab308',
          boxShadow: '0 8px 16px rgba(234,179,8,0.15)'
        }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>Pending Approval</span>
          <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#facc15', marginTop: '0.25rem' }}>
            {stats?.pendingApproval || 12}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#facc15' }}>Requires Doctor Action</span>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          padding: '1.25rem',
          borderRadius: '16px',
          border: '1px solid #10b981',
          boxShadow: '0 8px 16px rgba(16,185,129,0.15)'
        }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>Recovered Patients</span>
          <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#34d399', marginTop: '0.25rem' }}>
            {stats?.recoveredPatients || 320}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#34d399' }}>Achieved target goals</span>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          padding: '1.25rem',
          borderRadius: '16px',
          border: '1px solid #ef4444',
          boxShadow: '0 8px 16px rgba(239,68,68,0.15)'
        }}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>High Risk Patients</span>
          <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#f87171', marginTop: '0.25rem' }}>
            {stats?.highRiskPatients || 47}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#f87171' }}>Priority Monitoring</span>
        </div>

      </div>

      {/* Recent Activities & Plan Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        
        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 1rem', color: '#f8fafc', fontSize: '1.1rem' }}>
            📜 Recent Care Plan Audit Activities
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#0f172a', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
              <div>
                <span style={{ fontWeight: '700', color: '#f8fafc' }}>Care Plan Generated</span>
                <span style={{ marginLeft: '0.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>(Patient: Saurabh Kumar P101)</span>
              </div>
              <span style={{ color: '#64748b', fontSize: '0.8rem' }}>2 mins ago</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#0f172a', borderRadius: '8px', borderLeft: '4px solid #22c55e' }}>
              <div>
                <span style={{ fontWeight: '700', color: '#f8fafc' }}>Doctor Approved Care Plan</span>
                <span style={{ marginLeft: '0.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>(Patient: Priya Verma P102)</span>
              </div>
              <span style={{ color: '#64748b', fontSize: '0.8rem' }}>15 mins ago</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#0f172a', borderRadius: '8px', borderLeft: '4px solid #a855f7' }}>
              <div>
                <span style={{ fontWeight: '700', color: '#f8fafc' }}>Patient Updated Progress (78%)</span>
                <span style={{ marginLeft: '0.5rem', color: '#94a3b8', fontSize: '0.85rem' }}>(Patient: Rahul Sharma P103)</span>
              </div>
              <span style={{ color: '#64748b', fontSize: '0.8rem' }}>30 mins ago</span>
            </div>
          </div>
        </div>

        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 1rem', color: '#f8fafc', fontSize: '1.1rem' }}>
            🎯 Risk Category Distribution
          </h3>

          <div style={{ padding: '1.5rem 0' }}>
            <div style={{ fontSize: '1.1rem', color: '#4ade80', marginBottom: '0.5rem' }}>🟢 Low Risk: 65%</div>
            <div style={{ fontSize: '1.1rem', color: '#facc15', marginBottom: '0.5rem' }}>🟡 Medium Risk: 25%</div>
            <div style={{ fontSize: '1.1rem', color: '#f87171' }}>🔴 High Risk: 10%</div>
          </div>
        </div>

      </div>

    </div>
  );
}
