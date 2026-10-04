import React from 'react';
import { Play, Pause, SkipForward, RotateCcw, Gauge } from 'lucide-react';

export function StepControls({
  isRunning,
  onRunToggle,
  onStep,
  onReset,
  speedMs,
  onSpeedChange,
  isFinished,
  canStep = true,
}) {
  return (
    <div className="step-controls-bar">
      <div className="btn-cluster">
        <button
          className={`btn-action primary ${isRunning ? 'running' : ''}`}
          onClick={onRunToggle}
          title={isRunning ? 'Pause execution' : 'Run algorithm continuously'}
        >
          {isRunning ? <Pause size={15} /> : <Play size={15} />}
          <span>{isRunning ? 'Pause' : 'Run'}</span>
        </button>

        <button
          className="btn-action"
          onClick={onStep}
          disabled={isRunning || isFinished || !canStep}
          title="Advance by exactly one step"
        >
          <SkipForward size={15} />
          <span>Step</span>
        </button>

        <button
          className="btn-action"
          onClick={onReset}
          title="Reset to initial state"
        >
          <RotateCcw size={15} />
          <span>Reset</span>
        </button>
      </div>

      <div className="speed-slider-group">
        <Gauge size={14} className="text-muted" />
        <label htmlFor="speed-slider">Speed:</label>
        <input
          id="speed-slider"
          type="range"
          min="100"
          max="1200"
          step="50"
          value={speedMs}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          title={`Delay between steps: ${speedMs}ms`}
        />
        <span className="mono-num">{speedMs}ms</span>
      </div>
    </div>
  );
}
