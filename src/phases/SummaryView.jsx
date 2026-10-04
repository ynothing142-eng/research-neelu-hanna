import React from 'react';
import { HelpCircle, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

const SUMMARY_DATA = [
  {
    phase: 'Phase 01',
    name: 'Linear Data Structures',
    role: 'Dynamic Arrays, LIFO Stacks, FIFO Queues, Singly Linked Lists',
    timeComp: 'O(1) Head/Top/Front · O(n) Traversal/Shift',
    spaceComp: 'O(n) Linear memory',
    whenToUse: 'Fast buffering, undo histories, and FIFO equipment scheduling pipelines.'
  },
  {
    phase: 'Phase 02',
    name: 'Structured Trees & Graphs',
    role: 'Binary Search Tree, Level/Pre/Post Traversals, Adjacency Graph (BFS/DFS)',
    timeComp: 'BST Search O(log n) · Graph BFS/DFS O(V + E)',
    spaceComp: 'BST O(h) · Graph O(V + E)',
    whenToUse: 'Academic mentorship hierarchies, shortest degree of separation, co-author network clustering.'
  },
  {
    phase: 'Phase 03',
    name: 'Searching & Sorting Algorithms',
    role: 'Linear Search, Binary Search, Bubble/Insertion/Merge/Quick Sorts, Max-Heap',
    timeComp: 'Binary Search O(log n) · Merge/Quick O(n log n) · Heap Extract O(log n)',
    spaceComp: 'Merge Sort O(n) · Quick Sort O(log n) · Heap O(n)',
    whenToUse: 'Bisection search on ordered citations, stable publication ordering, real-time top-K scholar ranking.'
  },
  {
    phase: 'Phase 04',
    name: 'Optimization & Scheduling',
    role: 'Earliest Finish Time First (EFT) Greedy Interval Scheduling',
    timeComp: 'O(n log n) sorting + O(n) selection pass',
    spaceComp: 'O(n) compatible bookings set',
    whenToUse: 'Maximizing instrument utilization on shared laboratory resources with mathematical optimality.'
  }
];

export function SummaryView() {
  return (
    <div>
      <div className="phase-hero">
        <h1>Summary: Algorithmic Concept &amp; Complexity Matrix</h1>
        <p>
          High-level asymptotic complexity, operational trade-offs, and practical design guidance across all four phases of ResearchSphere.
        </p>
      </div>

      <div className="clean-card" style={{ marginBottom: '20px' }}>
        <div className="card-header">
          <div className="card-header-left">
            <div className="card-icon-badge">
              <Layers size={18} />
            </div>
            <div>
              <div className="card-pretitle">ASYMPTOTIC CHEATSHEET</div>
              <div className="card-title">Cross-Phase Complexity Comparison</div>
            </div>
          </div>
          <div className="complexity-pill">Zero Code · Plain English Analysis</div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #16263c', color: 'var(--teal-primary)', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px' }}>Phase</th>
                <th style={{ padding: '10px 12px' }}>Core Structures / Algorithms</th>
                <th style={{ padding: '10px 12px' }}>Time Complexity</th>
                <th style={{ padding: '10px 12px' }}>Space</th>
                <th style={{ padding: '10px 12px' }}>Optimal Application</th>
              </tr>
            </thead>
            <tbody>
              {SUMMARY_DATA.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #0f1c2d', color: '#cbd5e1' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: 'var(--teal-light)' }}>{row.phase}</td>
                  <td style={{ padding: '12px', color: '#fff', fontWeight: 600 }}>{row.name}</td>
                  <td style={{ padding: '12px', color: '#34d399' }}>{row.timeComp}</td>
                  <td style={{ padding: '12px', color: '#f59e0b' }}>{row.spaceComp}</td>
                  <td style={{ padding: '12px', color: '#94a3b8' }}>{row.whenToUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
