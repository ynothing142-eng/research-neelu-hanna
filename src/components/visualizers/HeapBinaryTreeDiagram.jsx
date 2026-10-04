import React from 'react';
import { ArrowDown, CheckCircle2, ShieldAlert } from 'lucide-react';

export function HeapBinaryTreeDiagram({ serviceRequests, onExtractMax }) {
  // Compute binary tree layout coordinates for up to 7 heap nodes (depth 0, 1, 2)
  const heapCoords = [
    { x: 350, y: 50 },  // 0: Root
    { x: 200, y: 140 }, // 1: Left
    { x: 500, y: 140 }, // 2: Right
    { x: 130, y: 230 }, // 3: Left-Left
    { x: 270, y: 230 }, // 4: Left-Right
    { x: 430, y: 230 }, // 5: Right-Left
    { x: 570, y: 230 }  // 6: Right-Right
  ];

  const sortedHeap = [...serviceRequests].sort((a, b) => b.priority - a.priority);

  return (
    <div style={{ background: '#ffffff', border: '1px solid #e8e2d5', borderRadius: '12px', padding: '24px', marginTop: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#176057', textTransform: 'uppercase', marginBottom: '4px' }}>
            PHASE 4 MAX-HEAP COMPLETE BINARY TREE
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 600, color: '#172430' }}>
            Priority Processing Complete Binary Tree
          </h3>
          <p style={{ fontSize: '13px', color: '#556675', maxWidth: '640px' }}>
            Root always stores highest priority request (Priority 10). Parent nodes always satisfy: <code>priority(parent) ≥ priority(children)</code>.
          </p>
        </div>

        <button
          onClick={onExtractMax}
          disabled={sortedHeap.length === 0}
          className="btn-primary-teal"
          style={{ padding: '6px 14px', fontSize: '12px' }}
        >
          <CheckCircle2 size={13} />
          <span>Dispatch Root (Extract Max O(log n))</span>
        </button>
      </div>

      {/* SVG Complete Binary Tree */}
      <div style={{ width: '100%', overflowX: 'auto', background: '#faf8f2', borderRadius: '10px', border: '1px solid #eae2d3', padding: '16px 0' }}>
        <svg viewBox="0 0 700 290" style={{ width: '100%', minWidth: '600px', height: 'auto', display: 'block' }}>
          {/* Edges from parent to children: left = 2i+1, right = 2i+2 */}
          {sortedHeap.slice(0, 7).map((_, i) => {
            const leftChildIdx = 2 * i + 1;
            const rightChildIdx = 2 * i + 2;

            return (
              <g key={i}>
                {leftChildIdx < Math.min(sortedHeap.length, 7) && (
                  <line
                    x1={heapCoords[i].x}
                    y1={heapCoords[i].y}
                    x2={heapCoords[leftChildIdx].x}
                    y2={heapCoords[leftChildIdx].y}
                    stroke="#176057"
                    strokeWidth="2.5"
                  />
                )}
                {rightChildIdx < Math.min(sortedHeap.length, 7) && (
                  <line
                    x1={heapCoords[i].x}
                    y1={heapCoords[i].y}
                    x2={heapCoords[rightChildIdx].x}
                    y2={heapCoords[rightChildIdx].y}
                    stroke="#176057"
                    strokeWidth="2.5"
                  />
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {sortedHeap.slice(0, 7).map((item, i) => {
            const isRoot = i === 0;
            const pos = heapCoords[i];

            return (
              <g key={item.id} style={{ cursor: 'pointer' }}>
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isRoot ? 26 : 22}
                  fill={isRoot ? '#176057' : '#ffffff'}
                  stroke={isRoot ? '#0f3f39' : '#b8a994'}
                  strokeWidth={isRoot ? 3 : 2}
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.08))"
                />

                <text
                  x={pos.x}
                  y={pos.y + 4}
                  textAnchor="middle"
                  fill={isRoot ? '#ffffff' : '#172430'}
                  fontSize="12px"
                  fontWeight="700"
                  fontFamily="var(--font-mono)"
                >
                  {item.priority}
                </text>

                <text
                  x={pos.x}
                  y={pos.y + 32}
                  textAnchor="middle"
                  fill="#172430"
                  fontSize="10px"
                  fontWeight="600"
                  fontFamily="var(--font-sans)"
                >
                  {item.category}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Array Representation Strip */}
      <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', fontSize: '12px' }}>
        <b style={{ color: '#176057', whiteSpace: 'nowrap' }}>Heap Array:</b>
        {sortedHeap.map((item, idx) => (
          <span
            key={item.id}
            style={{
              background: idx === 0 ? '#176057' : '#f1ede4',
              color: idx === 0 ? '#fff' : '#172430',
              padding: '4px 8px',
              borderRadius: '6px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              whiteSpace: 'nowrap'
            }}
          >
            A[{idx}] = {item.priority} ({item.category})
          </span>
        ))}
      </div>
    </div>
  );
}
