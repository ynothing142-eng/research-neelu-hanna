import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Compass, ArrowRight, Share2, Network } from 'lucide-react';
import { CollaborationGraph } from '../../shared/algorithms/trees-graphs.js';

// Pre-calculated aesthetic 2D coordinates for the 8 researchers on a 700x420 canvas
export const GRAPH_NODE_POSITIONS = {
  1: { x: 180, y: 120, label: 'Hanna Neelu', initials: 'HA', dept: 'Data Science' },
  2: { x: 350, y: 80, label: 'Arjun Kumar', initials: 'AR', dept: 'Computer Science' },
  3: { x: 520, y: 120, label: 'Dr. Meera', initials: 'MS', dept: 'Computer Science' },
  4: { x: 260, y: 240, label: 'Dr. Rahul', initials: 'RT', dept: 'Data Science' },
  5: { x: 110, y: 310, label: 'Ishita Rao', initials: 'IR', dept: 'Biotechnology' },
  6: { x: 440, y: 250, label: 'Vikram Das', initials: 'VD', dept: 'Electronics' },
  7: { x: 580, y: 320, label: 'Nisha George', initials: 'NG', dept: 'Computer Science' },
  8: { x: 350, y: 360, label: 'Kabir Shah', initials: 'KS', dept: 'Data Science' }
};

export function NetworkGraphDiagram({
  people,
  edges,
  currentUser,
  onFollowToggle
}) {
  const [sourceId, setSourceId] = useState(currentUser.id || 1);
  const [targetId, setTargetId] = useState(8);
  const [selectedNode, setSelectedNode] = useState(null);

  // Animated BFS Execution State
  const [bfsState, setBfsState] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const graph = new CollaborationGraph(
    people,
    edges.map((e) => [e.source, e.target])
  );

  const handleStartBFSAnimation = () => {
    const shortestResult = graph.getShortestPath(Number(sourceId), Number(targetId));
    const fullBfs = graph.runBFS(Number(sourceId));

    setBfsState({ shortest: shortestResult, fullBfs });
    setCurrentStepIndex(0);
    setIsAnimating(true);
  };

  useEffect(() => {
    let timer = null;
    if (isAnimating && bfsState) {
      timer = setTimeout(() => {
        if (currentStepIndex < bfsState.fullBfs.steps.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsAnimating(false);
        }
      }, 900);
    }
    return () => clearTimeout(timer);
  }, [isAnimating, currentStepIndex, bfsState]);

  const handleReset = () => {
    setIsAnimating(false);
    setCurrentStepIndex(-1);
    setBfsState(null);
  };

  const currentBfsStep = bfsState && currentStepIndex >= 0 ? bfsState.fullBfs.steps[currentStepIndex] : null;
  const shortestPathNodes = bfsState?.shortest?.path || [];

  // Helper to determine if an edge is on the shortest path
  const isEdgeOnShortestPath = (source, target) => {
    if (!shortestPathNodes || shortestPathNodes.length < 2) return false;
    for (let i = 0; i < shortestPathNodes.length - 1; i++) {
      if (
        (shortestPathNodes[i] === source && shortestPathNodes[i + 1] === target) ||
        (shortestPathNodes[i] === target && shortestPathNodes[i + 1] === source)
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <div style={{ background: '#ffffff', border: '1px solid #e8e2d5', borderRadius: '12px', padding: '24px' }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#176057', textTransform: 'uppercase', marginBottom: '4px' }}>
            PHASE 2 DIAGRAMMATIC NETWORK GRAPH
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 600, color: '#172430' }}>
            Follower & Collaboration Graph (Directed)
          </h3>
          <p style={{ fontSize: '13px', color: '#556675', maxWidth: '640px' }}>
            Vertices represent researchers; directed arrows represent follow connections. Select start/target and watch BFS discover the shortest path hop-by-hop.
          </p>
        </div>

        {/* Shortest Path Selectors */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <select
            value={sourceId}
            onChange={(e) => {
              setSourceId(Number(e.target.value));
              handleReset();
            }}
            style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #dcd5c7', fontSize: '12px', background: '#fff' }}
          >
            {people.map((p) => (
              <option key={p.id} value={p.id}>
                From: {p.name.split(' ')[0]}
              </option>
            ))}
          </select>

          <select
            value={targetId}
            onChange={(e) => {
              setTargetId(Number(e.target.value));
              handleReset();
            }}
            style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #dcd5c7', fontSize: '12px', background: '#fff' }}
          >
            {people.map((p) => (
              <option key={p.id} value={p.id}>
                To: {p.name.split(' ')[0]}
              </option>
            ))}
          </select>

          <button
            onClick={isAnimating ? () => setIsAnimating(false) : handleStartBFSAnimation}
            className="btn-primary-teal"
            style={{ padding: '6px 14px', fontSize: '12px' }}
          >
            {isAnimating ? <Pause size={13} /> : <Play size={13} />}
            <span>{isAnimating ? 'Pause' : 'Animate BFS Shortest Path'}</span>
          </button>

          <button
            onClick={handleReset}
            style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #dcd5c7', background: '#fff', fontSize: '12px', cursor: 'pointer' }}
            title="Reset Graph"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Diagrammatic SVG Canvas */}
      <div style={{ width: '100%', overflowX: 'auto', background: '#fbf9f4', borderRadius: '10px', border: '1px solid #eae2d3', position: 'relative' }}>
        <svg viewBox="0 0 700 420" style={{ width: '100%', minWidth: '600px', height: 'auto', display: 'block' }}>
          <defs>
            {/* Arrow Marker Definitions */}
            <marker
              id="arrow-default"
              viewBox="0 0 10 10"
              refX="22"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#b8a994" />
            </marker>

            <marker
              id="arrow-active"
              viewBox="0 0 10 10"
              refX="22"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 9 5 L 0 9 z" fill="#176057" />
            </marker>

            <marker
              id="arrow-shortest"
              viewBox="0 0 10 10"
              refX="22"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto-start-reverse"
            >
              <path d="M 0 0.5 L 10 5 L 0 9.5 z" fill="#e5a93c" />
            </marker>

            <filter id="graphGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Directed Edges */}
          {edges.map((edge, idx) => {
            const p1 = GRAPH_NODE_POSITIONS[edge.source];
            const p2 = GRAPH_NODE_POSITIONS[edge.target];
            if (!p1 || !p2) return null;

            const isShortest = isEdgeOnShortestPath(edge.source, edge.target);
            const isHovered = selectedNode && (selectedNode === edge.source || selectedNode === edge.target);

            // Compute curve midpoint offset for visual appeal
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const cx = (p1.x + p2.x) / 2 - dy * 0.12;
            const cy = (p1.y + p2.y) / 2 + dx * 0.12;

            let strokeColor = '#cfc5b4';
            let strokeWidth = 2;
            let marker = 'url(#arrow-default)';

            if (isShortest) {
              strokeColor = '#e5a93c'; // Highlighted gold path
              strokeWidth = 4;
              marker = 'url(#arrow-shortest)';
            } else if (isHovered) {
              strokeColor = '#176057';
              strokeWidth = 3;
              marker = 'url(#arrow-active)';
            }

            return (
              <g key={idx}>
                <path
                  d={`M ${p1.x} ${p1.y} Q ${cx} ${cy} ${p2.x} ${p2.y}`}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  markerEnd={marker}
                  filter={isShortest ? 'url(#graphGlow)' : 'none'}
                />
              </g>
            );
          })}

          {/* Graph Vertices / Nodes */}
          {people.map((person) => {
            const pos = GRAPH_NODE_POSITIONS[person.id];
            if (!pos) return null;

            const isSource = Number(sourceId) === person.id;
            const isTarget = Number(targetId) === person.id;
            const isShortestPathNode = shortestPathNodes.includes(person.id);
            const isCurrentBfsNode = currentBfsStep?.currentNode === person.id;
            const isVisitedBfs = currentBfsStep?.visited?.includes(person.id);

            let nodeFill = '#ffffff';
            let strokeColor = '#b8a994';
            let strokeWidth = 2;
            let textColor = '#172430';

            if (isCurrentBfsNode) {
              nodeFill = '#e5a93c'; // active BFS scanning
              strokeColor = '#b47614';
              strokeWidth = 4;
              textColor = '#111827';
            } else if (isShortestPathNode && !isAnimating) {
              nodeFill = '#176057';
              strokeColor = '#e5a93c';
              strokeWidth = 3.5;
              textColor = '#ffffff';
            } else if (isVisitedBfs) {
              nodeFill = '#e6f4ea';
              strokeColor = '#137333';
              strokeWidth = 2.5;
              textColor = '#137333';
            } else if (isSource || isTarget) {
              strokeColor = '#176057';
              strokeWidth = 3;
            }

            return (
              <g
                key={person.id}
                onClick={() => setSelectedNode(selectedNode === person.id ? null : person.id)}
                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
              >
                {/* Animated pulse for current BFS scanning node */}
                {isCurrentBfsNode && (
                  <circle cx={pos.x} cy={pos.y} r="32" fill="none" stroke="#e5a93c" strokeWidth="2.5">
                    <animate attributeName="r" values="24;36;24" dur="1s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0.1;0.8" dur="1s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* Node Circle */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r="23"
                  fill={nodeFill}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.08))"
                />

                {/* Initials */}
                <text
                  x={pos.x}
                  y={pos.y + 4}
                  textAnchor="middle"
                  fill={textColor}
                  fontSize="11px"
                  fontWeight="700"
                  fontFamily="var(--font-sans)"
                >
                  {pos.initials}
                </text>

                {/* Name Label */}
                <text
                  x={pos.x}
                  y={pos.y + 34}
                  textAnchor="middle"
                  fill="#172430"
                  fontSize="11.5px"
                  fontWeight="600"
                  fontFamily="var(--font-sans)"
                >
                  {pos.label}
                </text>

                {/* Department */}
                <text
                  x={pos.x}
                  y={pos.y + 46}
                  textAnchor="middle"
                  fill="#7b8e9b"
                  fontSize="9px"
                  fontFamily="var(--font-mono)"
                >
                  {pos.dept}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* BFS Live Execution Dashboard */}
      {bfsState && (
        <div style={{ marginTop: '16px', background: '#fcfaf5', padding: '14px 18px', borderRadius: '8px', border: '1px solid #eae2d3' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <b style={{ fontSize: '12.5px', color: '#176057' }}>
              BFS Step Trace ({currentStepIndex + 1} of {bfsState.fullBfs.steps.length}):
            </b>
            <span style={{ fontSize: '12px', color: '#64748b' }}>
              Degrees of Separation: <b>{bfsState.shortest.hops} Hops</b>
            </span>
          </div>

          <div style={{ fontSize: '13px', color: '#172430', marginBottom: '10px' }}>
            {currentBfsStep?.action || 'BFS execution ready.'}
          </div>

          {/* Queue State */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#556677' }}>
            <span>Queue:</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {currentBfsStep?.queue?.length > 0 ? (
                currentBfsStep.queue.map((id, i) => (
                  <span key={i} style={{ background: '#eef5f3', color: '#176057', padding: '2px 7px', borderRadius: '4px', fontWeight: 600 }}>
                    #{id} ({people.find((p) => p.id === id)?.name.split(' ')[0]})
                  </span>
                ))
              ) : (
                <span style={{ fontStyle: 'italic', color: '#94a3b8' }}>Empty</span>
              )}
            </div>
          </div>

          {/* Final Shortest Path */}
          {shortestPathNodes.length > 0 && !isAnimating && (
            <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #f0eae0', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#176057', textTransform: 'uppercase' }}>
                Shortest Collaboration Route:
              </span>
              {shortestPathNodes.map((nodeId, idx) => (
                <React.Fragment key={nodeId}>
                  <span style={{ background: '#176057', color: '#fff', padding: '3px 9px', borderRadius: '12px', fontSize: '11.5px', fontWeight: 600 }}>
                    {people.find((p) => p.id === nodeId)?.name}
                  </span>
                  {idx < shortestPathNodes.length - 1 && <ArrowRight size={13} color="#176057" />}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
