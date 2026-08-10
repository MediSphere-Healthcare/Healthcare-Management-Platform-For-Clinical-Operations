import React, { useState, useEffect } from 'react';
import { fetchCarePlan, updateProgress } from '../../Backend/carePlanService';

export default function PatientCarePlanView() {
  const [carePlan, setCarePlan] = useState(null);
  const [loading, setLoading] = useState(true);

  // Interactive Adherence Checklist
  const [tasks, setTasks] = useState([
    { taskId: 't1', title: 'Medicine Taken', category: 'MEDICINE', completed: true, time: '8:00 AM' },
    { taskId: 't2', title: 'Exercise Done', category: 'EXERCISE', completed: true, time: '9:30 AM' },
    { taskId: 't3', title: 'BP Checked', category: 'VITAL_CHECK', completed: true, time: '1:00 PM' },
    { taskId: 't4', title: 'Sugar Checked', category: 'VITAL_CHECK', completed: false, time: 'Pending' }
  ]);

  useEffect(() => {
    loadPlan();
  }, []);

  const loadPlan = async () => {
    setLoading(true);
    const plan = await fetchCarePlan('saurabh');
    setCarePlan(plan);
    setLoading(false);
  };

  const handleToggleTask = async (taskId) => {
    const updatedTasks = tasks.map(t => 
      t.taskId === taskId ? { ...t, completed: !t.completed, time: !t.completed ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Pending' } : t
    );
    setTasks(updatedTasks);

    if (carePlan) {
      const updatedPlan = await updateProgress(carePlan.id, updatedTasks);
      setCarePlan(updatedPlan);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  if (loading) {
    return (
      <div style={{ padding: '2rem', color: '#fff', textAlign: 'center' }}>
        <h2>Loading Your Care Plan...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '1.5rem', color: '#e2e8f0', maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: '1.5rem',
        borderRadius: '16px',
        border: '1px solid #334155',
        marginBottom: '1.5rem',
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700', color: '#f8fafc' }}>
              💚 My Daily Care Plan & Tasks
            </h1>
            <p style={{ margin: '0.25rem 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>
              Track daily medicines, exercise, vitals, and doctor notes for optimal health outcomes
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '600' }}>Review Status</span>
            <div style={{
              background: carePlan?.status === 'APPROVED' ? 'rgba(34,197,94,0.2)' : 'rgba(234,179,8,0.2)',
              color: carePlan?.status === 'APPROVED' ? '#4ade80' : '#facc15',
              padding: '0.35rem 0.85rem',
              borderRadius: '20px',
              fontWeight: '700',
              fontSize: '0.85rem',
              marginTop: '0.25rem'
            }}>
              ✓ Doctor Approved
            </div>
          </div>
        </div>
      </div>

      {/* Adherence Progress Widget ⭐ (Feature 6) */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
        padding: '1.5rem',
        borderRadius: '16px',
        border: '1px solid #4338ca',
        marginBottom: '1.5rem',
        boxShadow: '0 8px 20px rgba(67,56,202,0.25)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#a5b4fc' }}>
              ⭐ Today's Adherence Progress
            </h2>
            <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
              {completedCount} of {tasks.length} tasks completed today
            </span>
          </div>

          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#4ade80' }}>
            {progressPercent}%
          </div>
        </div>

        {/* Progress Bar (20% -> 40% -> 60% -> 80% -> 100%) */}
        <div style={{
          width: '100%',
          height: '16px',
          background: '#0f172a',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid #334155',
          marginBottom: '1.25rem'
        }}>
          <div style={{
            width: `${progressPercent}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #3b82f6 0%, #22c55e 100%)',
            transition: 'width 0.5s ease-in-out',
            borderRadius: '10px'
          }} />
        </div>

        {/* Task Checkboxes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {tasks.map(t => (
            <div
              key={t.taskId}
              onClick={() => handleToggleTask(t.taskId)}
              style={{
                background: t.completed ? 'rgba(34,197,94,0.15)' : '#1e293b',
                border: `1px solid ${t.completed ? '#22c55e' : '#334155'}`,
                padding: '1rem',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                transition: 'all 0.2s ease'
              }}
            >
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => {}}
                style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: '#22c55e' }}
              />
              <div>
                <div style={{
                  fontWeight: '700',
                  color: t.completed ? '#4ade80' : '#f8fafc',
                  fontSize: '0.95rem',
                  textDecoration: t.completed ? 'line-through' : 'none'
                }}>
                  {t.title}
                </div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  {t.completed ? `Done at ${t.time}` : 'Click to complete'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Details Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        
        {/* Today's Medicines */}
        <div style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '16px', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 1rem', color: '#60a5fa', fontSize: '1.1rem' }}>
            💊 Today's Medicines
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {carePlan?.medicines?.map((med, i) => (
              <div key={i} style={{ background: '#0f172a', padding: '0.85rem', borderRadius: '10px', border: '1px solid #334155' }}>
                <div style={{ fontWeight: '700', color: '#f8fafc' }}>
                  ✓ {med.name} <span style={{ color: '#38bdf8' }}>({med.dosage})</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                  {med.frequency} • {med.instructions}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Exercise & Diet */}
        <div style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '16px', border: '1px solid #334155' }}>
          <h3 style={{ margin: '0 0 1rem', color: '#34d399', fontSize: '1.1rem' }}>
            🏃 Today's Exercise & Diet
          </h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>Exercise Goals</span>
            <ul style={{ margin: '0.25rem 0 0', paddingLeft: '1.25rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
              {carePlan?.exercise?.map((ex, i) => <li key={i}>{ex}</li>)}
            </ul>
          </div>

          <div>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>Dietary Plan</span>
            <ul style={{ margin: '0.25rem 0 0', paddingLeft: '1.25rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
              {carePlan?.diet?.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>
        </div>

      </div>

      {/* Doctor Notes & Next Appointment Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
        
        <div style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '14px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>Doctor Notes</span>
          <p style={{ margin: '0.35rem 0 0', color: '#f8fafc', fontSize: '0.9rem', lineHeight: '1.5' }}>
            "{carePlan?.doctorNotes || 'Continue prescribed medications and daily walking.'}"
          </p>
        </div>

        <div style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '14px', border: '1px solid #334155', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>Daily Water Goal</span>
          <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#38bdf8', marginTop: '0.35rem' }}>
            💧 {carePlan?.waterIntake || '3 Liters'}
          </div>
        </div>

        <div style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '14px', border: '1px solid #334155', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>Next Appointment</span>
          <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#f43f5e', marginTop: '0.35rem' }}>
            📅 In {carePlan?.reviewPeriod || '30 Days'}
          </div>
        </div>

      </div>

    </div>
  );
}
