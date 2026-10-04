import React, { useState } from 'react';
import { Network, Table, ListTree } from 'lucide-react';
import { CollaborationGraph } from '../shared/algorithms/trees-graphs.js';
import { NetworkGraphDiagram } from '../components/visualizers/NetworkGraphDiagram.jsx';

export function ResearchNetworkView({
  people,
  edges,
  currentUser
}) {
  const [viewMode, setViewMode] = useState('diagram'); // 'diagram', 'matrix', 'adjList'

  const graph = new CollaborationGraph(
    people,
    edges.map((e) => [e.source, e.target])
  );

  const adjMatrixData = graph.getAdjacencyMatrix();

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#176057', textTransform: 'uppercase', marginBottom: '6px' }}>
            PHASE 2 STRUCTURED DATA REPRESENTATION
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '38px', fontWeight: 500, color: '#172430', marginBottom: '8px' }}>
            Research network
          </h1>
          <p style={{ fontSize: '14.5px', color: '#556675', maxWidth: '780px' }}>
            Directed follow graph modeling research community connections, with animated Breadth-First Search (BFS) for shortest path discovery.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'diagram', label: 'Diagrammatic Graph' },
            { id: 'matrix', label: 'Adjacency Matrix' },
            { id: 'adjList', label: 'Adjacency List' }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                border: '1px solid #dcd5c7',
                backgroundColor: viewMode === mode.id ? '#176057' : '#ffffff',
                color: viewMode === mode.id ? '#ffffff' : '#475569',
                cursor: 'pointer'
              }}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Diagrammatic Visualizer */}
      {viewMode === 'diagram' && (
        <NetworkGraphDiagram
          people={people}
          edges={edges}
          currentUser={currentUser}
        />
      )}

      {/* Adjacency Matrix View */}
      {viewMode === 'matrix' && (
        <div className="feed-card" style={{ padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 600, color: '#172430', marginBottom: '14px' }}>
            Graph Adjacency Matrix Representation (A[i][j])
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '18px' }}>
            Binary matrix where cell (i, j) = 1 indicates that Scholar i follows Scholar j.
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '12.5px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '8px 12px', border: '1px solid #e0d7c7', background: '#f5f0e6', textAlign: 'left' }}>
                    Researcher
                  </th>
                  {adjMatrixData.labels.map((lbl, i) => (
                    <th key={i} style={{ padding: '8px 10px', border: '1px solid #e0d7c7', background: '#f5f0e6', textAlign: 'center' }}>
                      {lbl}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {adjMatrixData.matrix.map((row, i) => (
                  <tr key={i}>
                    <td style={{ padding: '8px 12px', border: '1px solid #e0d7c7', background: '#fdfcf9', fontWeight: 600 }}>
                      {adjMatrixData.labels[i]}
                    </td>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        style={{
                          padding: '8px 10px',
                          border: '1px solid #e0d7c7',
                          textAlign: 'center',
                          backgroundColor: cell === 1 ? '#e8f3ef' : '#ffffff',
                          color: cell === 1 ? '#176057' : '#94a3b8',
                          fontWeight: cell === 1 ? 700 : 400
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Adjacency List View */}
      {viewMode === 'adjList' && (
        <div className="feed-card" style={{ padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 600, color: '#172430', marginBottom: '14px' }}>
            Adjacency List Mapping
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {people.map((p) => {
              const targets = edges
                .filter((e) => e.source === p.id)
                .map((e) => people.find((x) => x.id === e.target)?.name);

              return (
                <div
                  key={p.id}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '6px',
                    background: '#fdfcf9',
                    border: '1px solid #ebe5d8',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12.5px'
                  }}
                >
                  <b style={{ color: '#176057' }}>{p.name}</b> → [
                  {targets.length > 0 ? targets.join(', ') : 'none'}]
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
