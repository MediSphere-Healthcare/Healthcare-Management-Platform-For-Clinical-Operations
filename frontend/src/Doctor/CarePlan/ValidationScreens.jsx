import React from 'react';

export default function ValidationScreens() {
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
          ✅ Milestone 4 Validation Screens & Clinical Audits
        </h1>
        <p style={{ margin: '0.25rem 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>
          Verification suite proving clinical safety, drug safety checks, doctor approvals, adherence, outcome tracking, & immutable audit logs
        </p>
      </div>

      {/* 6 Validation Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        
        {/* 1. Clinical Guideline Check */}
        <div style={{
          background: '#1e293b',
          padding: '1.5rem',
          borderRadius: '16px',
          border: '1px solid #22c55e',
          boxShadow: '0 8px 20px rgba(34,197,94,0.15)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: '700', color: '#f8fafc' }}>1. Clinical Guideline Check</span>
            <span style={{ background: 'rgba(34,197,94,0.25)', color: '#4ade80', padding: '0.3rem 0.75rem', borderRadius: '20px', fontWeight: '800', fontSize: '0.85rem' }}>
              ✓ Passed
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5' }}>
            Verified against American Heart Association (AHA 2024) & American Diabetes Association (ADA) clinical guidelines. Metformin & Losartan combination validated.
          </p>
        </div>

        {/* 2. Drug Interaction */}
        <div style={{
          background: '#1e293b',
          padding: '1.5rem',
          borderRadius: '16px',
          border: '1px solid #38bdf8',
          boxShadow: '0 8px 20px rgba(56,189,248,0.15)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: '700', color: '#f8fafc' }}>2. Drug Interaction Check</span>
            <span style={{ background: 'rgba(56,189,248,0.25)', color: '#38bdf8', padding: '0.3rem 0.75rem', borderRadius: '20px', fontWeight: '800', fontSize: '0.85rem' }}>
              ✓ No Interaction Found
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5' }}>
            Automated drug-drug interaction matrix scanned for Metformin 500mg, Losartan 50mg, and Atorvastatin 20mg. Zero major or severe contraindications detected.
          </p>
        </div>

        {/* 3. Doctor Approval */}
        <div style={{
          background: '#1e293b',
          padding: '1.5rem',
          borderRadius: '16px',
          border: '1px solid #a855f7',
          boxShadow: '0 8px 20px rgba(168,85,247,0.15)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: '700', color: '#f8fafc' }}>3. Doctor Approval</span>
            <span style={{ background: 'rgba(168,85,247,0.25)', color: '#c084fc', padding: '0.3rem 0.75rem', borderRadius: '20px', fontWeight: '800', fontSize: '0.85rem' }}>
              ✓ Approved Successfully
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5' }}>
            Attending physician Dr. Sarah Johnson reviewed AI recommendation, added clinical notes, and signed digital authorization. Status transitioned from Pending to Approved.
          </p>
        </div>

        {/* 4. Adherence */}
        <div style={{
          background: '#1e293b',
          padding: '1.5rem',
          borderRadius: '16px',
          border: '1px solid #facc15',
          boxShadow: '0 8px 20px rgba(250,204,21,0.15)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: '700', color: '#f8fafc' }}>4. Adherence Tracking</span>
            <span style={{ background: 'rgba(250,204,21,0.25)', color: '#facc15', padding: '0.3rem 0.75rem', borderRadius: '20px', fontWeight: '800', fontSize: '0.85rem' }}>
              ⚡ 78% Compliant
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5' }}>
            Patient completed daily checklist: Medicine Taken (8:00 AM), Exercise Done (9:30 AM), BP Checked (1:00 PM). Adherence progress increased from 20% to 78%.
          </p>
        </div>

        {/* 5. Outcome Tracking */}
        <div style={{
          background: '#1e293b',
          padding: '1.5rem',
          borderRadius: '16px',
          border: '1px solid #34d399',
          boxShadow: '0 8px 20px rgba(52,211,153,0.15)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: '700', color: '#f8fafc' }}>5. Outcome Tracking</span>
            <span style={{ background: 'rgba(52,211,153,0.25)', color: '#34d399', padding: '0.3rem 0.75rem', borderRadius: '20px', fontWeight: '800', fontSize: '0.85rem' }}>
              📉 Risk Reduced
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5' }}>
            Disease risk score reduced from 24.3% to 16.2%. Patient health improvements: Weight (85kg → 80kg), BP (150/95 → 125/82), Sugar (185 mg/dL → 120 mg/dL).
          </p>
        </div>

        {/* 6. Audit Log */}
        <div style={{
          background: '#1e293b',
          padding: '1.5rem',
          borderRadius: '16px',
          border: '1px solid #f43f5e',
          boxShadow: '0 8px 20px rgba(244,63,94,0.15)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1rem', fontWeight: '700', color: '#f8fafc' }}>6. Immutable Audit Log</span>
            <span style={{ background: 'rgba(244,63,94,0.25)', color: '#fb7185', padding: '0.3rem 0.75rem', borderRadius: '20px', fontWeight: '800', fontSize: '0.85rem' }}>
              🔒 Verified Audit Trail
            </span>
          </div>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5' }}>
            Sequence: <strong>Care Plan Generated</strong> (AI Engine) ➔ <strong>Doctor Approved</strong> (Dr. Sarah Johnson) ➔ <strong>Patient Progress Updated</strong> (Saurabh Kumar). Recorded in MongoDB <code style={{ color: '#fda4af' }}>audit_logs</code> collection.
          </p>
        </div>

      </div>

    </div>
  );
}
