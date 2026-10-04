import React, { useState } from 'react';
import { Clock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { runGreedyIntervalScheduling, runNaiveFCFS } from '../../shared/algorithms/optimization.js';

export function GanttIntervalDiagram({ clubs }) {
  const [selectedAlgo, setSelectedAlgo] = useState('greedy'); // 'greedy' or 'fcfs'

  const roomRequests = clubs.map((c) => ({
    id: c.roomRequest.id,
    clubName: c.name,
    title: c.roomRequest.title,
    instrument: c.roomRequest.room,
    requester: c.lead,
    start: c.roomRequest.start,
    end: c.roomRequest.end,
    status: 'Pending'
  }));

  const greedyResult = runGreedyIntervalScheduling(roomRequests);
  const fcfsResult = runNaiveFCFS(roomRequests);

  const activeResult = selectedAlgo === 'greedy' ? greedyResult : fcfsResult;

  // Timeline hours from 9 to 17 (8 hours total)
  const timelineStart = 9;
  const timelineEnd = 17;
  const totalHours = timelineEnd - timelineStart;

  return (
    <div style={{ background: '#ffffff', border: '1px solid #e8e2d5', borderRadius: '12px', padding: '24px', marginTop: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#176057', textTransform: 'uppercase', marginBottom: '4px' }}>
            PHASE 4 DIAGRAMMATIC GANTT TIMELINE
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 600, color: '#172430' }}>
            Club Room Interval Scheduling (9:00 - 17:00)
          </h3>
          <p style={{ fontSize: '13px', color: '#556675', maxWidth: '640px' }}>
            Visualizes Earliest Finish Time (EFT) Greedy Activity Selection vs naive First-Come-First-Served on the shared Seminar Hall A timeline.
          </p>
        </div>

        {/* Algorithm Switcher */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setSelectedAlgo('greedy')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              border: '1px solid #176057',
              backgroundColor: selectedAlgo === 'greedy' ? '#176057' : '#ffffff',
              color: selectedAlgo === 'greedy' ? '#ffffff' : '#176057',
              cursor: 'pointer'
            }}
          >
            Greedy EFT (Optimal: {greedyResult.totalAccepted} events)
          </button>

          <button
            onClick={() => setSelectedAlgo('fcfs')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 600,
              border: '1px solid #dcd5c7',
              backgroundColor: selectedAlgo === 'fcfs' ? '#854d0e' : '#ffffff',
              color: selectedAlgo === 'fcfs' ? '#ffffff' : '#854d0e',
              cursor: 'pointer'
            }}
          >
            Naive FCFS ({fcfsResult.totalAccepted} events)
          </button>
        </div>
      </div>

      {/* Timeline Scale Ruler */}
      <div style={{ background: '#fbf9f4', padding: '16px', borderRadius: '10px', border: '1px solid #eae2d3' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', borderBottom: '1.5px solid #dcd5c7', paddingBottom: '6px', marginBottom: '14px' }}>
          {[9, 10, 11, 12, 13, 14, 15, 16].map((hour) => (
            <div key={hour} style={{ fontSize: '11px', color: '#7b8e9b', fontFamily: 'var(--font-mono)' }}>
              {hour}:00
            </div>
          ))}
        </div>

        {/* Request Gantt Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {roomRequests.map((req) => {
            const isAccepted = activeResult.accepted.some((a) => a.id === req.id);
            const leftPercent = ((req.start - timelineStart) / totalHours) * 100;
            const widthPercent = ((req.end - req.start) / totalHours) * 100;

            return (
              <div key={req.id} style={{ position: 'relative', height: '36px', background: '#f5f0e6', borderRadius: '6px' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: `${leftPercent}%`,
                    width: `${widthPercent}%`,
                    height: '100%',
                    backgroundColor: isAccepted ? '#176057' : '#fecaca',
                    color: isAccepted ? '#ffffff' : '#991b1b',
                    border: isAccepted ? '1.5px solid #0f433d' : '1px dashed #ef4444',
                    borderRadius: '6px',
                    padding: '0 10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    boxShadow: isAccepted ? '0 2px 5px rgba(23,96,87,0.2)' : 'none',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {req.title} ({req.start}:00-{req.end}:00)
                  </span>
                  <span>{isAccepted ? '✓ Accepted' : '✕ Conflict'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
