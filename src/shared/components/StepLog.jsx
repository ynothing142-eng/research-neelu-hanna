import React from 'react';
import { Info, HelpCircle } from 'lucide-react';

export function StepLog({ logs = [], currentStepIndex = 0 }) {
  return (
    <div className="step-log-panel">
      <div className="panel-title">
        <Info size={14} className="text-teal" />
        <span>Live Step Log (Plain English)</span>
      </div>
      <div className="log-scroll-area">
        {logs.length === 0 ? (
          <span className="log-empty">No steps run yet. Click "Step" or "Run" above to start.</span>
        ) : (
          logs.slice(0, currentStepIndex + 1).map((log, idx) => {
            const isCurrent = idx === currentStepIndex;
            return (
              <div key={idx} className={`log-entry ${isCurrent ? 'active' : ''}`}>
                <span className="log-index">#{idx + 1}</span>
                <span className="log-message">{typeof log === 'string' ? log : log.action}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export function ExplainerBox({ title = "What just happened?", explanation }) {
  if (!explanation) return null;
  return (
    <div className="explainer-box">
      <div className="explainer-header">
        <HelpCircle size={15} className="text-teal" />
        <h4>{title}</h4>
      </div>
      <p className="explainer-text">{explanation}</p>
    </div>
  );
}
