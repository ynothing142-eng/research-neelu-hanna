import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';

export const TOPIC_TREE_COORDS = [
  { id: 'Science', name: 'Science', level: 0, x: 350, y: 50, parent: null, count: 9 },
  { id: 'Physics', name: 'Physics', level: 1, x: 180, y: 150, parent: 'Science', count: 1 },
  { id: 'Biology', name: 'Biology', level: 1, x: 520, y: 150, parent: 'Science', count: 1 },
  { id: 'Photonics', name: 'Photonics', level: 2, x: 100, y: 260, parent: 'Physics', count: 1 },
  { id: 'Quantum', name: 'Quantum', level: 2, x: 260, y: 260, parent: 'Physics', count: 0 },
  { id: 'Genetics', name: 'Genetics', level: 2, x: 440, y: 260, parent: 'Biology', count: 1 },
  { id: 'Ecology', name: 'Ecology', level: 2, x: 600, y: 260, parent: 'Biology', count: 0 }
];

export const TOPIC_TREE_EDGES = [
  { from: 'Science', to: 'Physics' },
  { from: 'Science', to: 'Biology' },
  { from: 'Physics', to: 'Photonics' },
  { from: 'Physics', to: 'Quantum' },
  { from: 'Biology', to: 'Genetics' },
  { from: 'Biology', to: 'Ecology' }
];

export const TRAVERSALS = {
  inorder: {
    label: 'In-Order (Left → Root → Right)',
    sequence: ['Photonics', 'Physics', 'Quantum', 'Science', 'Genetics', 'Biology', 'Ecology']
  },
  preorder: {
    label: 'Pre-Order (Root → Left → Right)',
    sequence: ['Science', 'Physics', 'Photonics', 'Quantum', 'Biology', 'Genetics', 'Ecology']
  },
  postorder: {
    label: 'Post-Order (Left → Right → Root)',
    sequence: ['Photonics', 'Quantum', 'Physics', 'Genetics', 'Ecology', 'Biology', 'Science']
  },
  levelorder: {
    label: 'Level-Order (BFS Breadth-First)',
    sequence: ['Science', 'Physics', 'Biology', 'Photonics', 'Quantum', 'Genetics', 'Ecology']
  }
};

export function BinaryTreeDiagram({
  selectedTopic,
  onSelectTopic
}) {
  const [traversalType, setTraversalType] = useState('inorder');
  const [activeStep, setActiveStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [visitedNodes, setVisitedNodes] = useState([]);

  const currentSequence = TRAVERSALS[traversalType].sequence;

  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setTimeout(() => {
        if (activeStep < currentSequence.length - 1) {
          const nextStep = activeStep + 1;
          setActiveStep(nextStep);
          setVisitedNodes((prev) => [...prev, currentSequence[nextStep]]);
        } else {
          setIsPlaying(false);
        }
      }, 750);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, activeStep, currentSequence]);

  const handleStartTraversal = () => {
    setActiveStep(0);
    setVisitedNodes([currentSequence[0]]);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStep(-1);
    setVisitedNodes([]);
  };

  const getPathToRoot = (nodeId) => {
    const path = [];
    let curr = TOPIC_TREE_COORDS.find((n) => n.id === nodeId);
    while (curr) {
      path.push(curr.id);
      curr = TOPIC_TREE_COORDS.find((n) => n.id === curr.parent);
    }
    return path;
  };

  const highlightedPath = selectedTopic ? getPathToRoot(selectedTopic) : [];

  return (
    <div style={{ background: '#ffffff', border: '1px solid #e8e2d5', borderRadius: '12px', padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#176057', textTransform: 'uppercase', marginBottom: '4px' }}>
            PHASE 2 BINARY TREE DIAGRAM
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 600, color: '#172430' }}>
            Research Topic Hierarchy Tree
          </h3>
          <p style={{ fontSize: '13px', color: '#556675', maxWidth: '600px' }}>
            Every node has at most two children. Click any node to select topic filter, or run step-by-step tree traversal algorithms.
          </p>
        </div>

        {/* Traversal Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <select
            value={traversalType}
            onChange={(e) => {
              setTraversalType(e.target.value);
              handleReset();
            }}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #dcd5c7',
              fontSize: '12px',
              backgroundColor: '#fff'
            }}
          >
            <option value="inorder">In-Order Traversal</option>
            <option value="preorder">Pre-Order Traversal</option>
            <option value="postorder">Post-Order Traversal</option>
            <option value="levelorder">Level-Order (BFS)</option>
          </select>

          <button
            onClick={isPlaying ? () => setIsPlaying(false) : handleStartTraversal}
            className="btn-primary-teal"
            style={{ padding: '6px 14px', fontSize: '12px' }}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? 'Pause' : 'Animate Traversal'}</span>
          </button>

          <button
            onClick={handleReset}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              border: '1px solid #dcd5c7',
              background: '#fff',
              fontSize: '12px',
              cursor: 'pointer'
            }}
            title="Reset traversal"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* SVG Diagram Canvas */}
      <div style={{ width: '100%', overflowX: 'auto', background: '#faf8f2', borderRadius: '10px', border: '1px solid #eae2d3', padding: '16px 0' }}>
        <svg viewBox="0 0 700 330" style={{ width: '100%', minWidth: '600px', height: 'auto', display: 'block' }}>
          <defs>
            <linearGradient id="edgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#176057" />
              <stop offset="100%" stopColor="#2dd4bf" />
            </linearGradient>
            <filter id="nodeShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* SVG Connecting Edges */}
          {TOPIC_TREE_EDGES.map((edge) => {
            const fromNode = TOPIC_TREE_COORDS.find((n) => n.id === edge.from);
            const toNode = TOPIC_TREE_COORDS.find((n) => n.id === edge.to);
            const isPathActive = highlightedPath.includes(edge.from) && highlightedPath.includes(edge.to);
            const isTraversalActive = visitedNodes.includes(edge.to);

            return (
              <g key={`${edge.from}-${edge.to}`}>
                <line
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isPathActive ? '#176057' : isTraversalActive ? '#176057' : '#d2c8b8'}
                  strokeWidth={isPathActive || isTraversalActive ? 3.5 : 2}
                  strokeDasharray={isPathActive ? 'none' : 'none'}
                />
              </g>
            );
          })}

          {/* Tree Nodes */}
          {TOPIC_TREE_COORDS.map((node) => {
            const isSelected = selectedTopic === node.id;
            const isVisitedInTraversal = visitedNodes.includes(node.id);
            const isCurrentTraversalStep = activeStep >= 0 && currentSequence[activeStep] === node.id;
            const isRoot = node.level === 0;

            let fillColor = '#ffffff';
            let strokeColor = '#b8a994';
            let strokeWidth = 2;
            let textColor = '#172430';

            if (isCurrentTraversalStep) {
              fillColor = '#e5a93c'; // Pulsing Amber
              strokeColor = '#b47614';
              strokeWidth = 3.5;
              textColor = '#111827';
            } else if (isSelected) {
              fillColor = '#176057';
              strokeColor = '#0f3f39';
              strokeWidth = 3;
              textColor = '#ffffff';
            } else if (isVisitedInTraversal) {
              fillColor = '#e6f4ea';
              strokeColor = '#137333';
              strokeWidth = 2.5;
              textColor = '#137333';
            }

            return (
              <g
                key={node.id}
                onClick={() => onSelectTopic && onSelectTopic(node.id)}
                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
              >
                {/* Outer Glow for current traversal step */}
                {isCurrentTraversalStep && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isRoot ? 36 : 30}
                    fill="none"
                    stroke="#e5a93c"
                    strokeWidth="3"
                    opacity="0.6"
                  >
                    <animate attributeName="r" values={isRoot ? "34;42;34" : "28;36;28"} dur="1.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.2s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* Main Node Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isRoot ? 28 : 24}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  filter="url(#nodeShadow)"
                />

                {/* Node Text Label */}
                <text
                  x={node.x}
                  y={node.y - (isRoot ? 3 : 2)}
                  textAnchor="middle"
                  fill={textColor}
                  fontSize={isRoot ? '12px' : '11px'}
                  fontWeight={isSelected || isCurrentTraversalStep ? '700' : '600'}
                  fontFamily="var(--font-sans)"
                >
                  {node.name}
                </text>

                {/* Post Count Badge */}
                <text
                  x={node.x}
                  y={node.y + (isRoot ? 11 : 10)}
                  textAnchor="middle"
                  fill={isSelected ? '#e0f2fe' : '#64748b'}
                  fontSize="9.5px"
                  fontFamily="var(--font-mono)"
                >
                  ({node.count})
                </text>

                {/* Level Tag under leaf nodes */}
                <text
                  x={node.x}
                  y={node.y + 38}
                  textAnchor="middle"
                  fill="#7b8e9b"
                  fontSize="9px"
                  fontFamily="var(--font-mono)"
                >
                  Depth {node.level}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Traversal Step Sequence Strip */}
      <div style={{ marginTop: '16px', background: '#fcfaf5', padding: '12px 16px', borderRadius: '8px', border: '1px solid #eae2d3' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <b style={{ fontSize: '12px', color: '#176057' }}>
            {TRAVERSALS[traversalType].label}:
          </b>
          <span style={{ fontSize: '11px', color: '#64748b' }}>
            {visitedNodes.length} of {currentSequence.length} nodes visited
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {currentSequence.map((nodeName, idx) => {
            const isCurrent = activeStep === idx;
            const isDone = visitedNodes.includes(nodeName);

            return (
              <React.Fragment key={idx}>
                <span
                  style={{
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    background: isCurrent ? '#e5a93c' : isDone ? '#e6f4ea' : '#f1ede4',
                    color: isCurrent ? '#111827' : isDone ? '#137333' : '#64748b',
                    border: isCurrent ? '1px solid #b47614' : '1px solid #ded7c8'
                  }}
                >
                  {idx + 1}. {nodeName}
                </span>
                {idx < currentSequence.length - 1 && <span style={{ color: '#b0a696', fontSize: '11px' }}>→</span>}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
