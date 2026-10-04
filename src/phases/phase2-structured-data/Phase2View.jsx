import React, { useState } from 'react';
import { GitBranch, Network, CheckCircle, Search } from 'lucide-react';
import { RESEARCHERS, COLLABORATION_EDGES } from '../../shared/data/dataset.js';
import { BinarySearchTree, CollaborationGraph } from '../../shared/algorithms/trees-graphs.js';

export function Phase2View() {
  // --- BST INITIALIZATION WITH EXACT DATASET ---
  // Citations of all 8 researchers: 42, 27, 61, 35, 14, 30, 52, 18
  const [bst] = useState(() => {
    const tree = new BinarySearchTree();
    [42, 27, 61, 35, 14, 30, 52, 18].forEach(cit => {
      const match = RESEARCHERS.find(r => r.citations === cit);
      if (match) {
        tree.insert(cit, match);
      }
    });
    return tree;
  });

  const [searchTarget, setSearchTarget] = useState('42');
  const [activeBstNode, setActiveBstNode] = useState(42);
  const [bstSearchPath, setBstSearchPath] = useState([42]);
  const [foundScholar, setFoundScholar] = useState(() => RESEARCHERS.find(r => r.citations === 42));
  const [bstComparisons, setBstComparisons] = useState(1);
  const [isTraversalActive, setIsTraversalActive] = useState(false);

  // --- COLLABORATION GRAPH INITIALIZATION ---
  const [graph] = useState(() => new CollaborationGraph(RESEARCHERS, COLLABORATION_EDGES));
  const [sourceId, setSourceId] = useState(1); // Hanna Neelu
  const [targetId, setTargetId] = useState(8); // Kabir Shah
  const [activePathNodes, setActivePathNodes] = useState([1, 4, 6, 7, 8]);
  const [traversalType, setTraversalType] = useState('BFS (Shortest Path)');
  const [traversalStepLog, setTraversalStepLog] = useState('1 -> 4 -> 6 -> 7 -> 8 (4 hops)');

  // BST Search Handlers
  const executeBstSearch = (val) => {
    const cit = parseInt(val, 10);
    if (isNaN(cit)) return;

    setIsTraversalActive(false);
    const res = bst.search(cit);
    setActiveBstNode(cit);
    setBstSearchPath(res.path || [cit]);
    setBstComparisons(res.comparisons || 1);
    setFoundScholar(res.node ? res.node.data : null);
  };

  const handleBstSubmit = (e) => {
    if (e) e.preventDefault();
    executeBstSearch(searchTarget);
  };

  const handleInorderTraversal = () => {
    setIsTraversalActive(true);
    const trav = bst.getTraversals();
    const order = trav.inorder.map(n => n.key);
    setBstSearchPath(order);
    setActiveBstNode(order[order.length - 1]);
    setFoundScholar({
      name: 'In-Order Traversal (Sorted Citation Sequence)',
      department: 'Strictly Ascending Order',
      institution: 'BST Invariant (Left < Node < Right)',
      citations: order.join(' → ')
    });
    setBstComparisons(order.length);
  };

  // Graph Traversal Handlers
  const runBFS = () => {
    setTraversalType('BFS (Breadth-First Search / Shortest Path)');
    if (sourceId === targetId) {
      setActivePathNodes([sourceId]);
      setTraversalStepLog(`Source and Target are the same scholar (#${sourceId}) (0 hops)`);
      return;
    }
    const shortestRes = graph.getShortestPath(sourceId, targetId);
    if (!shortestRes.found) {
      setActivePathNodes([]);
      setTraversalStepLog(`No collaboration path exists between #${sourceId} and #${targetId} (disconnected components)`);
      return;
    }
    setActivePathNodes(shortestRes.path);
    setTraversalStepLog(`${shortestRes.path.map(id => {
      const r = RESEARCHERS.find(x => x.id === id);
      return r ? r.name.split(' ')[0] : `#${id}`;
    }).join(' → ')} (${shortestRes.hops} hop${shortestRes.hops > 1 ? 's' : ''})`);
  };

  const runDFS = () => {
    setTraversalType('DFS (Depth-First Search / Deep Branch Exploration)');
    const dfsRes = graph.runDFS(sourceId);
    setActivePathNodes(dfsRes.order);
    setTraversalStepLog(`Exploration sequence: ${dfsRes.order.map(id => {
      const r = RESEARCHERS.find(x => x.id === id);
      return r ? r.name.split(' ')[0] : `#${id}`;
    }).join(' → ')}`);
  };

  // Spacious BST Layout (All 8 Researchers)
  const bstNodes = [
    { key: 42, label: '42', name: 'Hanna', x: 380, y: 50 },
    { key: 27, label: '27', name: 'Arjun', x: 220, y: 125 },
    { key: 61, label: '61', name: 'Meera', x: 540, y: 125 },
    { key: 14, label: '14', name: 'Ishita', x: 130, y: 200 },
    { key: 35, label: '35', name: 'Rahul', x: 310, y: 200 },
    { key: 52, label: '52', name: 'Nisha', x: 470, y: 200 },
    { key: 18, label: '18', name: 'Kabir', x: 175, y: 275 },
    { key: 30, label: '30', name: 'Vikram', x: 265, y: 275 }
  ];

  const bstEdges = [
    { from: 42, to: 27 },
    { from: 42, to: 61 },
    { from: 27, to: 14 },
    { from: 27, to: 35 },
    { from: 14, to: 18 },
    { from: 35, to: 30 },
    { from: 61, to: 52 }
  ];

  // Spacious Collaboration Graph Layout (All 8 Researchers)
  const graphNodes = [
    { id: 1, label: 'Hanna', dept: 'Data Science', x: 90, y: 130 },
    { id: 2, label: 'Arjun', dept: 'CS', x: 220, y: 65 },
    { id: 4, label: 'Rahul', dept: 'Data Science', x: 220, y: 195 },
    { id: 3, label: 'Meera', dept: 'CS', x: 370, y: 65 },
    { id: 6, label: 'Vikram', dept: 'Electronics', x: 410, y: 195 },
    { id: 7, label: 'Nisha', dept: 'CS', x: 550, y: 130 },
    { id: 8, label: 'Kabir', dept: 'Data Science', x: 680, y: 130 },
    { id: 5, label: 'Ishita', dept: 'Biotech', x: 90, y: 245 }
  ];

  const isEdgeActive = (u, v) => {
    for (let i = 0; i < activePathNodes.length - 1; i++) {
      const a = activePathNodes[i];
      const b = activePathNodes[i + 1];
      if ((a === u && b === v) || (a === v && b === u)) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="cards-layout">
      {/* CONCEPT 1: BINARY SEARCH TREE */}
      <div className="algo-card">
        <div className="card-top">
          <div className="card-top-left">
            <div className="card-icon">
              <GitBranch size={20} />
            </div>
            <div>
              <div className="card-badge-cat">HIERARCHICAL INDEXING</div>
              <div className="card-title-text">Binary Search Tree (Citation Index)</div>
            </div>
          </div>
          <div className="complexity-badge">O(log n) Search</div>
        </div>

        {/* Tree SVG Visualization */}
        <div className="canvas-inset" style={{ minHeight: '340px' }}>
          <svg
            viewBox="0 0 760 320"
            style={{ width: '100%', height: '100%', maxHeight: '330px', overflow: 'visible' }}
          >
            {/* Edges */}
            {bstEdges.map((edge, idx) => {
              const fromNode = bstNodes.find(n => n.key === edge.from);
              const toNode = bstNodes.find(n => n.key === edge.to);
              if (!fromNode || !toNode) return null;

              const isPathEdge = bstSearchPath.includes(edge.from) && bstSearchPath.includes(edge.to);

              return (
                <line
                  key={idx}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isPathEdge ? '#2dd4bf' : '#1e293b'}
                  strokeWidth={isPathEdge ? '3' : '1.8'}
                  strokeDasharray={isPathEdge ? 'none' : '4,4'}
                  style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                />
              );
            })}

            {/* Nodes */}
            {bstNodes.map(node => {
              const isMatch = activeBstNode === node.key;
              const isInPath = bstSearchPath.includes(node.key);

              return (
                <g key={node.key} style={{ cursor: 'pointer' }} onClick={() => executeBstSearch(node.key)}>
                  {/* Glow circle */}
                  {isMatch && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="28"
                      fill="none"
                      stroke="#2dd4bf"
                      strokeWidth="2"
                      opacity="0.6"
                    />
                  )}
                  {/* Main Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="22"
                    fill={isMatch ? '#0d3838' : isInPath ? '#06202e' : '#081220'}
                    stroke={isMatch ? '#2dd4bf' : isInPath ? '#0ea5e9' : '#334155'}
                    strokeWidth={isMatch ? '2.5' : isInPath ? '2' : '1.5'}
                  />
                  {/* Citation Label */}
                  <text
                    x={node.x}
                    y={node.y - 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isMatch ? '#5eead4' : '#fff'}
                    fontSize="12.5"
                    fontFamily="var(--font-mono)"
                    fontWeight="700"
                  >
                    {node.label}
                  </text>
                  {/* Scholar Name */}
                  <text
                    x={node.x}
                    y={node.y + 32}
                    textAnchor="middle"
                    fill={isMatch ? '#2dd4bf' : '#94a3b8'}
                    fontSize="11"
                    fontFamily="var(--font-sans)"
                    fontWeight={isMatch ? '700' : '500'}
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* BST Controls */}
        <div className="actions-row">
          <form onSubmit={handleBstSubmit} style={{ display: 'flex', gap: '8px', flex: 1, minWidth: '240px' }}>
            <input
              type="number"
              value={searchTarget}
              onChange={e => setSearchTarget(e.target.value)}
              placeholder="Search citations..."
              className="input-field"
            />
            <button type="submit" className="button-primary">
              <Search size={14} /> Search
            </button>
          </form>

          {/* Quick preset chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Presets:</span>
            {[14, 18, 27, 30, 35, 42, 52, 61].map(val => (
              <button
                key={val}
                type="button"
                onClick={() => {
                  setSearchTarget(val.toString());
                  executeBstSearch(val);
                }}
                className={activeBstNode === val ? 'button-primary' : 'button-secondary'}
                style={{ height: '32px', padding: '0 10px', fontSize: '11px' }}
              >
                {val}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleInorderTraversal}
            className="button-secondary"
            style={{ marginLeft: 'auto' }}
          >
            Run In-Order Traversal
          </button>
        </div>

        {/* Outcome Banner */}
        <div className="outcome-banner">
          <div className="outcome-header">
            <CheckCircle size={15} />
            <span>
              {isTraversalActive
                ? 'In-Order Traversal Complete (All 8 Scholars)'
                : foundScholar
                ? `Lookup Match: ${foundScholar.name}`
                : `Target ${searchTarget} Not Present in Index`}
            </span>
          </div>
          <div className="outcome-details">
            {isTraversalActive ? (
              <>
                Strictly sorted citation sequence: <b>{foundScholar?.citations}</b> (Visited all 8 tree nodes)
              </>
            ) : foundScholar ? (
              <>
                Located <b>{foundScholar.name}</b> ({foundScholar.department}, {foundScholar.institution}) with{' '}
                <b>{foundScholar.citations} citations</b> in <b>{bstComparisons} comparison{bstComparisons > 1 ? 's' : ''}</b>. Search path: <b>{bstSearchPath.join(' → ')}</b>.
              </>
            ) : (
              <>
                Exhausted branch in <b>{bstComparisons} comparisons</b> without encountering value {searchTarget}.
              </>
            )}
          </div>
        </div>
      </div>

      {/* CONCEPT 2: COLLABORATION GRAPH */}
      <div className="algo-card">
        <div className="card-top">
          <div className="card-top-left">
            <div className="card-icon">
              <Network size={20} />
            </div>
            <div>
              <div className="card-badge-cat">GRAPH ALGORITHMS</div>
              <div className="card-title-text">Collaboration Graph (BFS &amp; DFS Traversal)</div>
            </div>
          </div>
          <div className="complexity-badge">O(V + E) Traversal</div>
        </div>

        {/* Graph SVG Visualization */}
        <div className="canvas-inset" style={{ minHeight: '340px' }}>
          <svg
            viewBox="0 0 760 300"
            style={{ width: '100%', height: '100%', maxHeight: '310px', overflow: 'visible' }}
          >
            {/* Edges */}
            {COLLABORATION_EDGES.map(([u, v], idx) => {
              const nodeU = graphNodes.find(n => n.id === u);
              const nodeV = graphNodes.find(n => n.id === v);
              if (!nodeU || !nodeV) return null;

              const active = isEdgeActive(u, v);

              return (
                <line
                  key={idx}
                  x1={nodeU.x}
                  y1={nodeU.y}
                  x2={nodeV.x}
                  y2={nodeV.y}
                  stroke={active ? '#2dd4bf' : '#1e293b'}
                  strokeWidth={active ? '3.5' : '1.8'}
                  style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
                />
              );
            })}

            {/* Nodes */}
            {graphNodes.map(node => {
              const isSource = sourceId === node.id;
              const isTarget = targetId === node.id;
              const isInPath = activePathNodes.includes(node.id);

              return (
                <g key={node.id}>
                  {/* Outer pulse circle for source or target */}
                  {(isSource || isTarget) && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="28"
                      fill="none"
                      stroke={isSource ? '#2dd4bf' : '#38bdf8'}
                      strokeWidth="2"
                      opacity="0.6"
                    />
                  )}
                  {/* Main Circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="22"
                    fill={isSource ? '#064e3b' : isTarget ? '#0369a1' : isInPath ? '#0d2838' : '#081220'}
                    stroke={isSource ? '#34d399' : isTarget ? '#38bdf8' : isInPath ? '#2dd4bf' : '#334155'}
                    strokeWidth={isInPath ? '2.5' : '1.5'}
                  />
                  {/* Label */}
                  <text
                    x={node.x}
                    y={node.y - 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isInPath ? '#5eead4' : '#fff'}
                    fontSize="11.5"
                    fontFamily="var(--font-mono)"
                    fontWeight="700"
                  >
                    #{node.id}
                  </text>
                  {/* Scholar Name */}
                  <text
                    x={node.x}
                    y={node.y + 32}
                    textAnchor="middle"
                    fill={isInPath ? '#fff' : '#94a3b8'}
                    fontSize="11"
                    fontFamily="var(--font-sans)"
                    fontWeight={isInPath ? '700' : '500'}
                  >
                    {node.label}
                  </text>
                  {/* Department */}
                  <text
                    x={node.x}
                    y={node.y + 44}
                    textAnchor="middle"
                    fill="#64748b"
                    fontSize="9"
                    fontFamily="var(--font-sans)"
                  >
                    {node.dept}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Graph Controls */}
        <div className="actions-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '220px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>From:</span>
            <select
              value={sourceId}
              onChange={e => setSourceId(parseInt(e.target.value, 10))}
              className="select-field"
            >
              {RESEARCHERS.map(r => (
                <option key={r.id} value={r.id}>
                  #{r.id} {r.name} ({r.department})
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '220px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>To:</span>
            <select
              value={targetId}
              onChange={e => setTargetId(parseInt(e.target.value, 10))}
              className="select-field"
            >
              {RESEARCHERS.map(r => (
                <option key={r.id} value={r.id}>
                  #{r.id} {r.name} ({r.department})
                </option>
              ))}
            </select>
          </div>

          <button type="button" onClick={runBFS} className="button-primary">
            Run BFS (Shortest Path)
          </button>
          <button type="button" onClick={runDFS} className="button-secondary">
            Run DFS (Deep Branch)
          </button>
        </div>

        {/* Outcome Banner */}
        <div className="outcome-banner">
          <div className="outcome-header">
            <CheckCircle size={15} />
            <span>{traversalType} Completed</span>
          </div>
          <div className="outcome-details">
            Route trace: <b>{traversalStepLog}</b>
          </div>
          <div className="outcome-details" style={{ marginTop: '2px', fontSize: '10.5px', color: '#64748b' }}>
            BFS guarantees minimum hops between researchers via FIFO frontier. All 8 researchers and 7 co-authorship edges read from the unified dataset.
          </div>
        </div>
      </div>
    </div>
  );
}
