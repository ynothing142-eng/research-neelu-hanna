import React, { useState } from 'react';
import {
  Calendar,
  Target,
  CheckCircle,
  Plus,
  RefreshCw,
  Clock,
  Layers,
  Award,
  Share2
} from 'lucide-react';
import { REQUESTS, RESEARCHERS, COLLABORATION_EDGES, INSTRUMENTS } from '../../shared/data/dataset.js';
import {
  runGreedyIntervalScheduling,
  runNaiveFCFS,
  synthesizeCrossPhaseDashboard
} from '../../shared/algorithms/optimization.js';

export function Phase4View() {
  // Uses strictly the initial 6 requests from the given dataset
  const [requestsList, setRequestsList] = useState(() => [...REQUESTS]);
  const [activeFilter, setActiveFilter] = useState('All');

  // Custom Form State
  const [newInstrument, setNewInstrument] = useState(INSTRUMENTS[0]);
  const [newRequester, setNewRequester] = useState('Meera Sharma');
  const [newStart, setNewStart] = useState(4);
  const [newEnd, setNewEnd] = useState(7);

  // Compute Optimal & Naive Schedules
  const greedyResult = runGreedyIntervalScheduling(requestsList);
  const naiveResult = runNaiveFCFS(requestsList);
  const acceptedIds = greedyResult.accepted.map(r => r.id);

  // Cross-phase Dashboard
  const dashboard = synthesizeCrossPhaseDashboard(RESEARCHERS, requestsList, COLLABORATION_EDGES);

  const handleAddBooking = (e) => {
    e.preventDefault();
    const startNum = parseInt(newStart, 10);
    const endNum = parseInt(newEnd, 10);
    if (isNaN(startNum) || isNaN(endNum) || startNum >= endNum) return;

    const newReq = {
      id: requestsList.length + 1,
      instrument: newInstrument,
      requester: newRequester.trim() || 'Guest Researcher',
      start: startNum,
      end: endNum,
      status: 'Pending'
    };

    setRequestsList(prev => [...prev, newReq]);
  };

  const handleReset = () => {
    setRequestsList([...REQUESTS]);
  };

  const displayedRequests = activeFilter === 'All'
    ? requestsList
    : requestsList.filter(r => r.instrument === activeFilter);

  const throughputGain = naiveResult.totalAccepted > 0
    ? Math.round(((greedyResult.totalAccepted - naiveResult.totalAccepted) / naiveResult.totalAccepted) * 100)
    : 0;

  return (
    <div className="cards-layout">
      {/* CONCEPT 1: GREEDY GANTT TIMELINE */}
      <div className="algo-card">
        <div className="card-top">
          <div className="card-top-left">
            <div className="card-icon">
              <Calendar size={20} />
            </div>
            <div>
              <div className="card-badge-cat">OPTIMAL ACTIVITY SELECTION</div>
              <div className="card-title-text">Greedy Gantt Timeline (Earliest Finish Time First)</div>
            </div>
          </div>
          <div className="complexity-badge">O(n log n) Optimal</div>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setActiveFilter('All')}
            className={activeFilter === 'All' ? 'button-primary' : 'button-secondary'}
            style={{ height: '32px', padding: '0 12px', fontSize: '11.5px' }}
          >
            All Instruments ({requestsList.length})
          </button>
          {INSTRUMENTS.map(inst => (
            <button
              key={inst}
              type="button"
              onClick={() => setActiveFilter(inst)}
              className={activeFilter === inst ? 'button-primary' : 'button-secondary'}
              style={{ height: '32px', padding: '0 12px', fontSize: '11.5px' }}
            >
              {inst}
            </button>
          ))}
        </div>

        {/* Visual Gantt Chart Canvas */}
        <div className="canvas-inset" style={{ minHeight: '320px', flexDirection: 'column', alignItems: 'stretch', gap: '14px', padding: '20px' }}>
          {/* Time Slot Axis Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', borderBottom: '1px solid #16263c', paddingBottom: '8px' }}>
            <span>08:00 (Slot 1)</span>
            <span>10:00 (Slot 3)</span>
            <span>12:00 (Slot 5)</span>
            <span>14:00 (Slot 7)</span>
            <span>16:00 (Slot 9)</span>
            <span>18:00 (Slot 10)</span>
          </div>

          {/* Interval Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '220px', overflowY: 'auto' }}>
            {displayedRequests.map(req => {
              const isAcc = acceptedIds.includes(req.id);
              const isRej = req.status === 'Rejected';
              const leftPct = ((req.start - 1) / 10) * 100;
              const widthPct = Math.max(14, ((req.end - req.start) / 10) * 100);

              return (
                <div
                  key={req.id}
                  style={{
                    position: 'relative',
                    height: '32px',
                    background: '#040910',
                    borderRadius: '6px',
                    border: '1px solid #132233'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: `${leftPct}%`,
                      width: `${widthPct}%`,
                      height: '30px',
                      borderRadius: '5px',
                      padding: '0 12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      background: isRej ? '#3b070e' : isAcc ? '#064e3b' : '#1e293b',
                      border: `1px solid ${isRej ? '#991b1b' : isAcc ? '#10b981' : '#475569'}`,
                      color: isRej ? '#fca5a5' : isAcc ? '#ecfdf5' : '#94a3b8',
                      boxShadow: isAcc ? '0 0 12px rgba(16, 185, 129, 0.35)' : 'none'
                    }}
                  >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      #{req.id} {req.requester} · {req.instrument}
                    </span>
                    <span style={{ fontSize: '9.5px', opacity: 0.85, flexShrink: 0, marginLeft: '8px' }}>
                      {req.start}:00 - {req.end}:00
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '3px', display: 'inline-block' }}></span>
              <span>Greedy Accepted ({greedyResult.totalAccepted})</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', background: '#475569', borderRadius: '3px', display: 'inline-block' }}></span>
              <span>Overlapped / Skipped</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', background: '#991b1b', borderRadius: '3px', display: 'inline-block' }}></span>
              <span>Rejected</span>
            </div>
          </div>
        </div>

        {/* Interactive Booking Submission Form */}
        <form onSubmit={handleAddBooking} className="actions-row">
          <select
            value={newInstrument}
            onChange={e => setNewInstrument(e.target.value)}
            className="select-field"
            style={{ minWidth: '150px' }}
          >
            {INSTRUMENTS.map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
          <input
            type="text"
            value={newRequester}
            onChange={e => setNewRequester(e.target.value)}
            placeholder="Requester Name"
            className="input-field"
            style={{ minWidth: '140px' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Hours:</span>
            <input
              type="number"
              min="1"
              max="8"
              value={newStart}
              onChange={e => setNewStart(e.target.value)}
              className="input-field"
              style={{ width: '50px', textAlign: 'center', minWidth: 'auto', padding: '0 4px' }}
            />
            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>to</span>
            <input
              type="number"
              min="2"
              max="10"
              value={newEnd}
              onChange={e => setNewEnd(e.target.value)}
              className="input-field"
              style={{ width: '50px', textAlign: 'center', minWidth: 'auto', padding: '0 4px' }}
            />
          </div>
          <button type="submit" className="button-primary">
            <Plus size={14} /> Add Booking
          </button>
          <button type="button" onClick={handleReset} className="button-secondary" title="Reset dataset to initial 6 requests">
            <RefreshCw size={13} /> Reset
          </button>
        </form>

        {/* Outcome Banner */}
        <div className="outcome-banner">
          <div className="outcome-header">
            <CheckCircle size={15} />
            <span>Optimal Activity Schedule: {greedyResult.totalAccepted} Bookings Accepted</span>
          </div>
          <div className="outcome-details">
            Earliest Finish Time (EFT) accepted <b>{greedyResult.totalAccepted} bookings</b> vs naive FCFS which accepted <b>{naiveResult.totalAccepted} bookings</b> (+{throughputGain}% throughput gain).
          </div>
          <div className="outcome-details" style={{ marginTop: '2px', fontSize: '10.5px', color: '#64748b' }}>
            Sorting by earliest completion time leaves the largest remaining continuous interval on shared laboratory assets.
          </div>
        </div>
      </div>

      {/* CONCEPT 2: CROSS-PHASE INTEGRATION DASHBOARD */}
      <div className="algo-card">
        <div className="card-top">
          <div className="card-top-left">
            <div className="card-icon">
              <Target size={20} />
            </div>
            <div>
              <div className="card-badge-cat">SYNTHESIS DASHBOARD</div>
              <div className="card-title-text">Cross-Phase Decision Analytics</div>
            </div>
          </div>
          <div className="complexity-badge">Phases 01–04 Combined</div>
        </div>

        {/* Spacious 4-Tile Grid */}
        <div className="canvas-inset" style={{ minHeight: '300px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', alignItems: 'stretch', padding: '20px' }}>
          
          {/* Tile 1: Top Scholar (Phase 3 Heap) */}
          <div style={{ background: '#050d18', border: '1px solid #16263c', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--teal)', fontWeight: 700, textTransform: 'uppercase' }}>
                <Award size={13} /> Top Scholar (Phase 3)
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginTop: '8px' }}>
                {dashboard.topScholar?.name}
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                {dashboard.topScholar?.department} · {dashboard.topScholar?.institution}
              </div>
            </div>
            <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: 'var(--teal-light)', fontWeight: 700, marginTop: '12px' }}>
              {dashboard.topScholar?.citations} Citations (Heap Top)
            </div>
          </div>

          {/* Tile 2: Network Hub (Phase 2 Graph) */}
          <div style={{ background: '#050d18', border: '1px solid #16263c', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>
                <Share2 size={13} /> Network Hub (Phase 2)
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginTop: '8px' }}>
                {dashboard.hubScholar?.name}
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                {dashboard.hubScholar?.department}
              </div>
            </div>
            <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#38bdf8', fontWeight: 700, marginTop: '12px' }}>
              {dashboard.hubScholar?.connections} Active Co-Authors
            </div>
          </div>

          {/* Tile 3: Bottleneck Tool (Phase 4 Greedy) */}
          <div style={{ background: '#050d18', border: '1px solid #16263c', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#f59e0b', fontWeight: 700, textTransform: 'uppercase' }}>
                <Clock size={13} /> Contended Tool (Phase 4)
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginTop: '8px' }}>
                {dashboard.busiestInstrument?.name}
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                Primary lab asset
              </div>
            </div>
            <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#f59e0b', fontWeight: 700, marginTop: '12px' }}>
              {dashboard.busiestInstrument?.count} Competing Requests
            </div>
          </div>

          {/* Tile 4: Linear Pipeline Buffer (Phase 1) */}
          <div style={{ background: '#050d18', border: '1px solid #16263c', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#34d399', fontWeight: 700, textTransform: 'uppercase' }}>
                <Layers size={13} /> Linear Buffer (Phase 1)
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginTop: '8px' }}>
                Feed &amp; Queue Store
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                Dynamic array &amp; FIFO pipeline
              </div>
            </div>
            <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#34d399', fontWeight: 700, marginTop: '12px' }}>
              {requestsList.length} Requests / 5 Feed Posts
            </div>
          </div>

        </div>

        {/* Action Row */}
        <div className="actions-row">
          <button
            type="button"
            onClick={() => setRequestsList([...requestsList])}
            className="button-primary"
            style={{ width: '100%' }}
          >
            Re-evaluate All 4 Phase Analytical Pipelines
          </button>
        </div>

        {/* Outcome Banner */}
        <div className="outcome-banner">
          <div className="outcome-header">
            <CheckCircle size={15} />
            <span>Single Source of Truth Operating Smoothly</span>
          </div>
          <div className="outcome-details">
            Phase 1 linear buffers, Phase 2 tree/graph models, Phase 3 heap rankers, and Phase 4 greedy optimizers all read concurrently from the shared dataset with zero synchronization lags.
          </div>
        </div>
      </div>
    </div>
  );
}
