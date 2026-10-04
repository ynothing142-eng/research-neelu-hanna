import React, { useState } from 'react';
import { Search, Play, RotateCcw, CheckCircle2, ArrowRight } from 'lucide-react';

export const TURNITIN_BST_NODES = [
  { id: 203, title: 'High-Throughput Peer Computing', student: 'Arjun Kumar', x: 350, y: 50, parent: null, side: null },
  { id: 201, title: 'Graph Traversal Efficiency', student: 'Hanna Neelu', x: 210, y: 150, parent: 203, side: 'left' },
  { id: 204, title: 'Open Chemical Spectrum', student: 'Kabir Shah', x: 490, y: 150, parent: 203, side: 'right' },
  { id: 202, title: 'Cellular Motif Recognition', student: 'Ishita Rao', x: 280, y: 260, parent: 201, side: 'right' },
  { id: 205, title: 'Low-Power IoT Microcontroller', student: 'Vikram Das', x: 560, y: 260, parent: 204, side: 'right' }
];

export const TURNITIN_BST_EDGES = [
  { from: 203, to: 201 },
  { from: 203, to: 204 },
  { from: 201, to: 202 },
  { from: 204, to: 205 }
];

export function TurnitinBSTDiagram({
  turnitinSlots,
  selectedSlotId,
  onSelectSlot
}) {
  const [targetId, setTargetId] = useState(202);
  const [searchSteps, setSearchSteps] = useState([]);
  const [activeStepIdx, setActiveStepIdx] = useState(-1);
  const [foundNodeId, setFoundNodeId] = useState(null);

  const handleRunSearch = () => {
    const steps = [];
    let currId = 203; // root
    const key = Number(targetId);

    while (currId) {
      const node = TURNITIN_BST_NODES.find((n) => n.id === currId);
      if (!node) break;

      if (key === node.id) {
        steps.push({
          nodeId: node.id,
          action: `Target ${key} == Node ${node.id}. Matched target slot! Found in BST.`,
          matched: true
        });
        break;
      } else if (key < node.id) {
        steps.push({
          nodeId: node.id,
          action: `Target ${key} < Node ${node.id} → Branching to Left child.`,
          matched: false
        });
        // find left child
        const leftChild = TURNITIN_BST_NODES.find((n) => n.parent === node.id && n.side === 'left');
        currId = leftChild ? leftChild.id : null;
      } else {
        steps.push({
          nodeId: node.id,
          action: `Target ${key} > Node ${node.id} → Branching to Right child.`,
          matched: false
        });
        // find right child
        const rightChild = TURNITIN_BST_NODES.find((n) => n.parent === node.id && n.side === 'right');
        currId = rightChild ? rightChild.id : null;
      }
    }

    setSearchSteps(steps);
    setActiveStepIdx(steps.length - 1);
    setFoundNodeId(steps[steps.length - 1]?.matched ? key : null);
  };

  const handleReset = () => {
    setSearchSteps([]);
    setActiveStepIdx(-1);
    setFoundNodeId(null);
  };

  const visitedPath = searchSteps.slice(0, activeStepIdx + 1).map((s) => s.nodeId);

  return (
    <div style={{ background: '#ffffff', border: '1px solid #e8e2d5', borderRadius: '12px', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#176057', textTransform: 'uppercase', marginBottom: '4px' }}>
            PHASE 2 BST DIAGRAM
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 600, color: '#172430' }}>
            Turnitin Booking Binary Search Tree (BST)
          </h3>
          <p style={{ fontSize: '13px', color: '#556675', maxWidth: '640px' }}>
            Submission slots are organized by Slot ID. Left subtree values are strictly smaller; right subtree values are strictly larger.
          </p>
        </div>

        {/* BST Search Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <select
            value={targetId}
            onChange={(e) => {
              setTargetId(Number(e.target.value));
              handleReset();
            }}
            style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #dcd5c7', fontSize: '12px', background: '#fff' }}
          >
            {TURNITIN_BST_NODES.map((n) => (
              <option key={n.id} value={n.id}>
                Slot #{n.id} ({n.student})
              </option>
            ))}
          </select>

          <button onClick={handleRunSearch} className="btn-primary-teal" style={{ padding: '6px 14px', fontSize: '12px' }}>
            <Search size={13} />
            <span>Search Key in BST</span>
          </button>

          <button onClick={handleReset} style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #dcd5c7', background: '#fff', fontSize: '12px', cursor: 'pointer' }}>
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div style={{ width: '100%', overflowX: 'auto', background: '#faf8f2', borderRadius: '10px', border: '1px solid #eae2d3', padding: '16px 0' }}>
        <svg viewBox="0 0 700 320" style={{ width: '100%', minWidth: '600px', height: 'auto', display: 'block' }}>
          {/* Edges */}
          {TURNITIN_BST_EDGES.map((edge) => {
            const p1 = TURNITIN_BST_NODES.find((n) => n.id === edge.from);
            const p2 = TURNITIN_BST_NODES.find((n) => n.id === edge.to);
            const isPathActive = visitedPath.includes(edge.from) && visitedPath.includes(edge.to);

            return (
              <g key={`${edge.from}-${edge.to}`}>
                <line
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={isPathActive ? '#176057' : '#d2c8b8'}
                  strokeWidth={isPathActive ? 3.5 : 2}
                />
              </g>
            );
          })}

          {/* Nodes */}
          {TURNITIN_BST_NODES.map((node) => {
            const isTarget = targetId === node.id;
            const isVisited = visitedPath.includes(node.id);
            const isMatched = foundNodeId === node.id;

            let fillColor = '#ffffff';
            let strokeColor = '#b8a994';
            let strokeWidth = 2;
            let textColor = '#172430';

            if (isMatched) {
              fillColor = '#10b981'; // Found Match in Emerald Green
              strokeColor = '#047857';
              strokeWidth = 3.5;
              textColor = '#ffffff';
            } else if (isVisited) {
              fillColor = '#e5a93c'; // Visited comparison step
              strokeColor = '#b47614';
              strokeWidth = 3;
              textColor = '#111827';
            }

            return (
              <g
                key={node.id}
                onClick={() => onSelectSlot && onSelectSlot(node.id)}
                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="26"
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.08))"
                />

                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fill={textColor}
                  fontSize="12px"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                >
                  #{node.id}
                </text>

                <text
                  x={node.x}
                  y={node.y + 36}
                  textAnchor="middle"
                  fill="#172430"
                  fontSize="11px"
                  fontWeight="600"
                  fontFamily="var(--font-sans)"
                >
                  {node.student}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Trace Log */}
      {searchSteps.length > 0 && (
        <div style={{ marginTop: '16px', background: '#fcfaf5', padding: '12px 16px', borderRadius: '8px', border: '1px solid #eae2d3' }}>
          <b style={{ fontSize: '12px', color: '#176057', display: 'block', marginBottom: '6px' }}>
            BST Search Trace ({searchSteps.length} comparisons):
          </b>
          {searchSteps.map((st, i) => (
            <div key={i} style={{ fontSize: '12px', color: st.matched ? '#15803d' : '#475569', fontWeight: st.matched ? 600 : 400, padding: '3px 0' }}>
              Step {i + 1}: {st.action}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
