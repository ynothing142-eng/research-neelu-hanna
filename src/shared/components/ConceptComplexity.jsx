import React from 'react';
import { HelpCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Lab, Table } from './OriginalUI.jsx';

export function ConceptComplexity({ concepts }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <div className="lab-grid" style={{ gridTemplateColumns: '1fr' }}>
        {concepts.map((concept, idx) => (
          <Lab
            key={idx}
            title={concept.name}
            purpose={concept.role}
            icon={HelpCircle}
          >
            {/* Complexity Table */}
            <p style={{ margin: '0 0 8px', fontSize: '10px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'DM Mono', monospace" }}>
              Time &amp; Space Complexity Reference
            </p>
            <Table>
              <thead>
                <tr>
                  <th>Operation</th>
                  <th>Time Complexity</th>
                  <th>Space Complexity</th>
                  <th>Mathematical Reason</th>
                </tr>
              </thead>
              <tbody>
                {concept.complexities.map((row, rIdx) => (
                  <tr key={rIdx}>
                    <td style={{ color: 'var(--text)', fontWeight: 600 }}>{row.operation}</td>
                    <td>
                      <span className="complexity-tag" style={{ border: 'none', padding: 0 }}>
                        <b style={{ color: 'var(--green)' }}>{row.time}</b>
                      </span>
                    </td>
                    <td>
                      <span className="complexity-tag" style={{ border: 'none', padding: 0 }}>
                        <b style={{ color: 'var(--gold)' }}>{row.space}</b>
                      </span>
                    </td>
                    <td>{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Trade-offs & Practical Notes */}
            <div className="compare" style={{ marginTop: '16px' }}>
              <div>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--green)' }}>
                  <CheckCircle2 size={13} />
                  When to use it
                </span>
                <p style={{ margin: '8px 0 0', fontSize: '10px', color: 'var(--text)', lineHeight: 1.5 }}>
                  {concept.whenToUse}
                </p>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--red)' }}>
                  <AlertTriangle size={13} />
                  When not to use it / Bottlenecks
                </span>
                <p style={{ margin: '8px 0 0', fontSize: '10px', color: 'var(--text)', lineHeight: 1.5 }}>
                  {concept.whenNotTo}
                </p>
              </div>
            </div>
          </Lab>
        ))}
      </div>
    </div>
  );
}
