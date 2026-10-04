import React, { useState } from 'react';
import {
  FlaskConical,
  CheckCircle,
  Clock,
  Layers,
  Sparkles,
  ArrowRight,
  GitCommit,
  Trees
} from 'lucide-react';

export function InstrumentsView({
  instruments,
  currentUser,
  onJoinQueue,
  onProcessQueue,
  queueItems,
  initialView = 'cards'
}) {
  const [activeTab, setActiveTab] = useState(initialView); // 'cards', 'queue', 'traversal'
  const [dateInputs, setDateInputs] = useState({});
  const [traversalMode, setTraversalMode] = useState('level'); // 'pre', 'in', 'level'

  const handleDateChange = (instrumentId, field, value) => {
    setDateInputs((prev) => ({
      ...prev,
      [instrumentId]: {
        ...prev[instrumentId],
        [field]: value
      }
    }));
  };

  const handleBooking = (inst) => {
    const dates = dateInputs[inst.id] || {};
    const startDate = dates.startDate || '2026-10-15';
    const endDate = dates.endDate || '2026-10-18';

    onJoinQueue(inst, startDate, endDate);
  };

  return (
    <div className="page-container">
      {/* Header (Matches Image 3) */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#176057', textTransform: 'uppercase', marginBottom: '6px' }}>
          LABORATORY INFRASTRUCTURE & FIFO SCHEDULING
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '38px', fontWeight: 500, color: '#172430', marginBottom: '8px' }}>
          Instruments
        </h1>
        <p style={{ fontSize: '14.5px', color: '#556675', maxWidth: '780px' }}>
          Submit a borrowing request. Requests are processed in FIFO order: first request, first approval.
        </p>
      </div>

      {/* Clean Mode Switcher Bar */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          padding: '6px',
          background: '#f1ece0',
          borderRadius: '10px',
          marginBottom: '26px',
          width: 'fit-content'
        }}
      >
        <button
          onClick={() => setActiveTab('cards')}
          style={{
            padding: '7px 16px',
            borderRadius: '7px',
            fontSize: '12.5px',
            fontWeight: 600,
            border: 'none',
            backgroundColor: activeTab === 'cards' ? '#ffffff' : 'transparent',
            color: activeTab === 'cards' ? '#172430' : '#64748b',
            cursor: 'pointer',
            boxShadow: activeTab === 'cards' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
          }}
        >
          🖨️ Equipment Catalog
        </button>

        <button
          onClick={() => setActiveTab('queue')}
          style={{
            padding: '7px 16px',
            borderRadius: '7px',
            fontSize: '12.5px',
            fontWeight: 600,
            border: 'none',
            backgroundColor: activeTab === 'queue' ? '#ffffff' : 'transparent',
            color: activeTab === 'queue' ? '#176057' : '#64748b',
            cursor: 'pointer',
            boxShadow: activeTab === 'queue' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Clock size={14} color="#176057" />
          <span>Phase 1 FIFO Queue ({queueItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('traversal')}
          style={{
            padding: '7px 16px',
            borderRadius: '7px',
            fontSize: '12.5px',
            fontWeight: 600,
            border: 'none',
            backgroundColor: activeTab === 'traversal' ? '#ffffff' : 'transparent',
            color: activeTab === 'traversal' ? '#176057' : '#64748b',
            cursor: 'pointer',
            boxShadow: activeTab === 'traversal' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Trees size={14} color="#176057" />
          <span>Phase 2 Tree Traversal</span>
        </button>
      </div>

      {/* TAB 1: Equipment Catalog Cards (Matches Image 3 exactly) */}
      {activeTab === 'cards' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {instruments.map((inst) => {
            const dates = dateInputs[inst.id] || {};
            const isMaintenance = inst.status === 'MAINTENANCE';

            return (
              <div key={inst.id} className="instrument-card" id={`card-${inst.id}`}>
                <div className="instrument-card-top">
                  <h3 className="instrument-name">{inst.name}</h3>
                  <span
                    className={
                      inst.status === 'AVAILABLE'
                        ? 'status-pill-available'
                        : 'status-pill-maintenance'
                    }
                  >
                    {inst.status}
                  </span>
                </div>

                <p className="instrument-desc">{inst.description}</p>

                <div className="instrument-meta">
                  Added by: <b>{inst.addedBy}</b> · {inst.notice}
                </div>

                <div className="instrument-booking-form">
                  <div className="input-group">
                    <label className="input-label">Start Date</label>
                    <input
                      type="date"
                      className="date-input"
                      value={dates.startDate || ''}
                      disabled={isMaintenance}
                      onChange={(e) => handleDateChange(inst.id, 'startDate', e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">End Date</label>
                    <input
                      type="date"
                      className="date-input"
                      value={dates.endDate || ''}
                      disabled={isMaintenance}
                      onChange={(e) => handleDateChange(inst.id, 'endDate', e.target.value)}
                    />
                  </div>

                  <button
                    className="btn-primary-teal"
                    disabled={isMaintenance}
                    onClick={() => handleBooking(inst)}
                  >
                    <span>{isMaintenance ? 'Unavailable' : 'Join request queue'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: Phase 1 Real-time FIFO Request Queue */}
      {activeTab === 'queue' && (
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e8e2d5',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={18} color="#176057" />
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 600, color: '#172430' }}>
                  Phase 1 FIFO Conveyor Queue
                </h3>
                <small style={{ color: '#7b8e9b', fontSize: '12px' }}>
                  First-In, First-Out: First booking request is approved first in O(1) amortized time.
                </small>
              </div>
            </div>

            <button
              onClick={onProcessQueue}
              disabled={queueItems.length === 0}
              className="btn-primary-teal"
              style={{ padding: '8px 16px', fontSize: '13px' }}
            >
              <CheckCircle size={14} />
              <span>Process Next (Dequeue FIFO O(1))</span>
            </button>
          </div>

          {/* Horizontal Conveyor Diagram */}
          <div style={{ background: '#faf7f0', border: '1.5px dashed #c4b9a6', borderRadius: '10px', padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '14px', overflowX: 'auto', marginBottom: '20px' }}>
            <div style={{ textAlign: 'center', minWidth: '80px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#137333', letterSpacing: '0.08em', display: 'block' }}>
                HEAD (Next)
              </span>
              <span style={{ fontSize: '11px', color: '#7b8e9b' }}>← Dequeue</span>
            </div>

            {queueItems.map((req, idx) => (
              <div
                key={req.id}
                style={{
                  background: idx === 0 ? '#e6f4ea' : '#ffffff',
                  border: idx === 0 ? '1.5px solid #137333' : '1px solid #d5cbba',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  minWidth: '200px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <b style={{ fontSize: '13px', color: '#172430' }}>#{idx + 1} {req.instrument}</b>
                  <span style={{ fontSize: '10.5px', color: '#176057', fontWeight: 700 }}>
                    {idx === 0 ? 'HEAD' : 'WAITING'}
                  </span>
                </div>
                <div style={{ color: '#556677', fontSize: '12px' }}>
                  Requester: <b>{req.requester}</b>
                </div>
                <small style={{ color: '#8a9ba8', fontSize: '11px' }}>
                  {req.startDate} to {req.endDate}
                </small>
              </div>
            ))}

            <div style={{ textAlign: 'center', minWidth: '80px' }}>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#176057', letterSpacing: '0.08em', display: 'block' }}>
                TAIL (Rear)
              </span>
              <span style={{ fontSize: '11px', color: '#7b8e9b' }}>Enqueue →</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Phase 2 Systematic Tree Traversal */}
      {activeTab === 'traversal' && (
        <div className="feed-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#176057', textTransform: 'uppercase', marginBottom: '4px' }}>
                PHASE 2 INSTRUMENT BOOKING
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 600, color: '#172430' }}>
                Systematic Instrument Catalog Tree Traversal
              </h3>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {['level', 'pre', 'in'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTraversalMode(mode)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 600,
                    border: '1px solid #dcd5c7',
                    backgroundColor: traversalMode === mode ? '#176057' : '#ffffff',
                    color: traversalMode === mode ? '#ffffff' : '#475569',
                    cursor: 'pointer'
                  }}
                >
                  {mode === 'level' ? 'Level-Order (BFS)' : mode === 'pre' ? 'Pre-Order Traversal' : 'In-Order Traversal'}
                </button>
              ))}
            </div>
          </div>

          <p style={{ fontSize: '13.5px', color: '#556675', marginBottom: '20px' }}>
            Laboratory instruments are organized in a facility hierarchy. Traversing the tree allows systematic inventory inspection and conflict-free booking slot verification.
          </p>

          {/* Tree Render */}
          <div style={{ background: '#fcfaf5', padding: '20px', borderRadius: '10px', border: '1px solid #eae2d3' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: '1.8', color: '#172430' }}>
              <div>📁 <b>Central Research Facility (Root)</b></div>
              <div style={{ paddingLeft: '24px' }}>
                ├── 📂 <b>Fabrication & Prototyping</b>
                <div style={{ paddingLeft: '24px' }}>
                  ├── 🖨️ 3D Printer <span style={{ color: '#137333', fontSize: '11px' }}>(Available)</span><br />
                  └── ⚡ Arduino Kit <span style={{ color: '#137333', fontSize: '11px' }}>(Available)</span>
                </div>
              </div>
              <div style={{ paddingLeft: '24px' }}>
                └── 📂 <b>Precision Analytics</b>
                <div style={{ paddingLeft: '24px' }}>
                  ├── 🔬 Digital Microscope <span style={{ color: '#c5221f', fontSize: '11px' }}>(Maintenance)</span><br />
                  ├── 🖥️ GPU Workstation <span style={{ color: '#137333', fontSize: '11px' }}>(Available)</span><br />
                  └── 🌈 Spectrometer <span style={{ color: '#137333', fontSize: '11px' }}>(Available)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
