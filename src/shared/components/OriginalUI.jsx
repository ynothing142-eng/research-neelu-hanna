import React from 'react';
import { phaseInfo } from '../../App.jsx';

export function Stat({ icon: Icon, label, value }) {
  return (
    <div className="stat">
      <Icon size={17} />
      <div>
        <b>{value}</b>
        <span>{label}</span>
      </div>
    </div>
  );
}

export function Lab({ title, purpose, icon: Icon, children }) {
  return (
    <article className="lab">
      <div className="lab-header">
        <div className="lab-icon">
          <Icon size={17} />
        </div>
        <div>
          <h3>{title}</h3>
          <p><strong>Used for:</strong> {purpose}</p>
        </div>
      </div>
      <div className="lab-body">{children}</div>
    </article>
  );
}

export function Table({ children }) {
  return <div className="table-wrap"><table>{children}</table></div>;
}

export function PhaseHeader({ phase }) {
  const info = phaseInfo[phase - 1];
  return (
    <div className="phase-header">
      <div className="phase-number">0{phase}</div>
      <div>
        <p className="kicker">PHASE {phase} / RESEARCHSPHERE</p>
        <h1>{info.title}</h1>
        <p>{info.subtitle}. Every example below uses the same researcher, post, connection, and booking records.</p>
        <div className="concept-tags-bar">
          {info.concepts.map((c, i) => (
            <span key={i} className="concept-tag-badge">{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StepControlsBar({ onRun, onStep, onReset, isRunning, speed, setSpeed, runLabel = 'Run Algorithm', stepLabel = 'Step' }) {
  return (
    <div className="slider-row" style={{ marginTop: '12px', marginBottom: '12px' }}>
      <div className="actions" style={{ margin: 0 }}>
        <button
          onClick={onRun}
          className={`button ${isRunning ? '' : 'primary'}`}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
        >
          {isRunning ? 'Pause' : runLabel}
        </button>
        <button
          onClick={onStep}
          disabled={isRunning}
          className="button"
          style={{ opacity: isRunning ? 0.5 : 1 }}
        >
          {stepLabel}
        </button>
        <button onClick={onReset} className="button">
          Reset
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '10px', color: 'var(--muted)', fontFamily: "'DM Mono', monospace" }}>
          SPEED: {speed}x
        </span>
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.5"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
}

export function StepTracer({ logs, title = 'Algorithm Execution Log' }) {
  if (!logs || logs.length === 0) return null;
  return (
    <div className="step-tracer">
      <p style={{ margin: '0 0 6px', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', fontFamily: "'DM Mono', monospace" }}>
        {title}
      </p>
      <div className="trace-table" style={{ maxHeight: '160px', overflowY: 'auto' }}>
        {logs.map((log, idx) => (
          <div key={idx} className="trace-row">
            <span>{log}</span>
            <b>step {logs.length - idx}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExplainerNotice({ text }) {
  if (!text) return null;
  return (
    <div className="alert-notice" style={{ marginTop: '10px' }}>
      <span><strong>What just happened?</strong> {text}</span>
    </div>
  );
}

export function MetricPills({ comparisons, swaps, steps, timeTaken, summary }) {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px', marginBottom: '8px' }}>
      {steps !== undefined && (
        <span className="complexity-tag">
          Steps: <b>{steps}</b>
        </span>
      )}
      {comparisons !== undefined && (
        <span className="complexity-tag">
          Comparisons: <b>{comparisons}</b>
        </span>
      )}
      {swaps !== undefined && (
        <span className="complexity-tag">
          Swaps: <b>{swaps}</b>
        </span>
      )}
      {timeTaken && (
        <span className="complexity-tag">
          Time: <b>{timeTaken}</b>
        </span>
      )}
      {summary && (
        <span className="complexity-tag" style={{ color: 'var(--green)' }}>
          Status: <b>{summary}</b>
        </span>
      )}
    </div>
  );
}
