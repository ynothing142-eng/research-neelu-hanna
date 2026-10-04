import React from 'react';

export function MetricCounter({
  comparisons = 0,
  swaps = 0,
  steps = 0,
  timeMs = 0,
  summary = '',
}) {
  return (
    <div className="metric-counters-grid">
      <div className="counter-item">
        <span className="counter-label">Comparisons</span>
        <b className="counter-val">{comparisons}</b>
      </div>
      <div className="counter-item">
        <span className="counter-label">Swaps / Shifts</span>
        <b className="counter-val">{swaps}</b>
      </div>
      <div className="counter-item">
        <span className="counter-label">Steps Done</span>
        <b className="counter-val">{steps}</b>
      </div>
      <div className="counter-item">
        <span className="counter-label">Time Elapsed</span>
        <b className="counter-val">{typeof timeMs === 'number' ? `${timeMs.toFixed(1)}ms` : timeMs}</b>
      </div>
      {summary && (
        <div className="counter-item summary-item">
          <span className="counter-label">Status Summary</span>
          <span className="summary-text">{summary}</span>
        </div>
      )}
    </div>
  );
}
