import React, { useState, useEffect } from 'react';
import { fetchOutcome } from '../../Backend/carePlanService';

export default function OutcomeTracking() {
  const [outcome, setOutcome] = useState(null);

  useEffect(() => {
    fetchOutcome('saurabh').then(setOutcome);
  }, []);

  return (
    <div style={{ padding: '1.5rem', color: '#e2e8f0' }}>
      
      {/* Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '1.5rem',
        borderRadius: '16px',
        border: '1px solid #334155',
        marginBottom: '1.5rem'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700', color: '#f8fafc' }}>
          📈 Patient Outcome Tracking & Health Improvements
        </h1>
        <p style={{ margin: '0.25rem 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>
          System tracks pre-care plan baseline vs current parameters to measure clinical efficacy
        </p>
      </div>

      {/* Main Risk Reduction Comparison Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #065f46 100%)',
        padding: '2rem',
        borderRadius: '20px',
        border: '1px solid #059669',
        marginBottom: '1.5rem',
        boxShadow: '0 10px 30px rgba(5,150,105,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>Initial Disease Risk</span>
          <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#f87171', marginTop: '0.25rem' }}>
            {outcome?.previousRisk || 24.3}%
          </div>
          <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Baseline Assessment</span>
        </div>

        <div style={{ fontSize: '3rem', color: '#34d399', fontWeight: '800' }}>
          ➔
        </div>

        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '700' }}>Current Disease Risk</span>
          <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#4ade80', marginTop: '0.25rem' }}>
            {outcome?.currentRisk || 16.2}%
          </div>
          <span style={{ background: 'rgba(34,197,94,0.3)', color: '#4ade80', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '700' }}>
            -33.3% Risk Reduction
          </span>
        </div>
      </div>

      {/* 3 Parameter Cards: Weight, BP, Sugar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        
        {/* Weight Card */}
        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: '700', color: '#60a5fa' }}>⚖️ Body Weight</span>
            <span style={{ background: 'rgba(34,197,94,0.2)', color: '#4ade80', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' }}>
              -5 kg Reduced
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Previous</span>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#cbd5e1' }}>
                {outcome?.weightInitial || 85} kg
              </div>
            </div>

            <span style={{ fontSize: '1.5rem', color: '#94a3b8' }}>➔</span>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Current Target</span>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#4ade80' }}>
                {outcome?.weightCurrent || 80} kg
              </div>
            </div>
          </div>
        </div>

        {/* Blood Pressure Card */}
        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: '700', color: '#f43f5e' }}>🫀 Blood Pressure</span>
            <span style={{ background: 'rgba(34,197,94,0.2)', color: '#4ade80', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' }}>
              Normalizing
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Previous</span>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#f87171' }}>
                {outcome?.bpInitial || '150/95'}
              </div>
            </div>

            <span style={{ fontSize: '1.5rem', color: '#94a3b8' }}>➔</span>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Current</span>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#4ade80' }}>
                {outcome?.bpCurrent || '125/82'}
              </div>
            </div>
          </div>
        </div>

        {/* Fasting Glucose Card */}
        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: '700', color: '#fbbf24' }}>🩸 Blood Glucose</span>
            <span style={{ background: 'rgba(34,197,94,0.2)', color: '#4ade80', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' }}>
              -65 mg/dL Improved
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Previous</span>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fbbf24' }}>
                {outcome?.sugarInitial || 185} mg/dL
              </div>
            </div>

            <span style={{ fontSize: '1.5rem', color: '#94a3b8' }}>➔</span>

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Current</span>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#4ade80' }}>
                {outcome?.sugarCurrent || 120} mg/dL
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
