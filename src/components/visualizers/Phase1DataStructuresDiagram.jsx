import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  Plus,
  Trash2,
  RotateCcw,
  Sparkles,
  GitCommit,
  Clock,
  ArrowDown
} from 'lucide-react';

export function Phase1DataStructuresDiagram({
  postsLinkedList,
  postsArray,
  undoStack,
  undoStackSize,
  queueItems,
  onAddPost,
  onDeletePost,
  onUndo,
  onProcessQueue,
  onJoinQueue
}) {
  const [activeTab, setActiveTab] = useState('linkedList'); // 'linkedList', 'stack', 'queue'
  const [newTitle, setNewTitle] = useState('');
  const [traversingIdx, setTraversingIdx] = useState(-1);

  // Traverse Linked List Animation
  const handleTraverseList = () => {
    setTraversingIdx(0);
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx < postsArray.length) {
        setTraversingIdx(idx);
      } else {
        clearInterval(interval);
        setTimeout(() => setTraversingIdx(-1), 1000);
      }
    }, 400);
  };

  return (
    <div style={{ background: '#ffffff', border: '1px solid #e8e2d5', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#176057', textTransform: 'uppercase', marginBottom: '4px' }}>
            PHASE 1 DIAGRAMMATIC DATA STRUCTURES
          </div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 600, color: '#172430' }}>
            Interactive Linear Structures Workbench
          </h3>
          <p style={{ fontSize: '13px', color: '#556675', maxWidth: '640px' }}>
            Live pointer manipulation in Singly Linked List, LIFO Stack for Undo, and FIFO Request Queue for equipment booking.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '6px' }}>
          {[
            { id: 'linkedList', label: '1. Singly Linked List' },
            { id: 'stack', label: '2. LIFO Stack (Undo)' },
            { id: 'queue', label: '3. FIFO Queue (Booking)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                border: '1px solid #dcd5c7',
                backgroundColor: activeTab === tab.id ? '#176057' : '#ffffff',
                color: activeTab === tab.id ? '#ffffff' : '#475569',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Singly Linked List Visualizer */}
      {activeTab === 'linkedList' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <span style={{ fontSize: '12.5px', color: '#64748b' }}>
              Nodes contain data payload and <code>next</code> pointer reference. Insertion at head is strictly <b>O(1)</b>.
            </span>

            <button
              onClick={handleTraverseList}
              className="btn-primary-teal"
              style={{ padding: '6px 14px', fontSize: '12px' }}
            >
              <ArrowRight size={13} />
              <span>Step-by-Step Traversal</span>
            </button>
          </div>

          {/* Node Chain Diagram */}
          <div style={{ overflowX: 'auto', padding: '16px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* HEAD Pointer */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '60px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#176057', letterSpacing: '0.08em', marginBottom: '4px' }}>
                HEAD
              </span>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#176057', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ArrowRight size={10} color="#fff" />
              </div>
            </div>

            {/* Linked List Nodes */}
            {postsArray.slice(0, 6).map((post, idx) => {
              const isBeingTraversed = traversingIdx === idx;

              return (
                <React.Fragment key={post.id}>
                  <div
                    style={{
                      background: isBeingTraversed ? '#e5a93c' : '#ffffff',
                      border: isBeingTraversed ? '2px solid #b47614' : '1.5px solid #d5cbba',
                      borderRadius: '10px',
                      padding: '10px 14px',
                      minWidth: '170px',
                      maxWidth: '190px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #efe8db', paddingBottom: '4px', marginBottom: '6px' }}>
                      <b style={{ fontSize: '11px', color: isBeingTraversed ? '#111827' : '#176057' }}>Node #{post.id}</b>
                      <span style={{ fontSize: '9px', background: isBeingTraversed ? '#ffffff' : '#f1ede4', padding: '1px 5px', borderRadius: '3px' }}>
                        next →
                      </span>
                    </div>

                    <div style={{ fontSize: '12px', fontWeight: 600, color: isBeingTraversed ? '#111827' : '#172430', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '2px' }}>
                      {post.title}
                    </div>
                    <small style={{ fontSize: '10.5px', color: isBeingTraversed ? '#374151' : '#7b8e9b', display: 'block' }}>
                      By {post.author.split(' ')[0]}
                    </small>
                  </div>

                  {/* Pointer Arrow */}
                  <div style={{ display: 'flex', alignItems: 'center', color: '#176057' }}>
                    <span style={{ height: '2px', width: '18px', background: '#176057' }}></span>
                    <ArrowRight size={14} style={{ marginLeft: '-4px' }} />
                  </div>
                </React.Fragment>
              );
            })}

            {/* NULL Pointer */}
            <div style={{ background: '#f1ede4', border: '1px solid #dcd5c7', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', fontWeight: 700, color: '#7b8e9b' }}>
              NULL
            </div>
          </div>
        </div>
      )}

      {/* 2. LIFO Stack (Undo) Visualizer */}
      {activeTab === 'stack' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '12.5px', color: '#64748b' }}>
              Last-In, First-Out (LIFO). The most recent action is pushed on top and popped first upon clicking "Undo".
            </span>
            <button onClick={onUndo} disabled={undoStackSize === 0} className="undo-nav-btn">
              <RotateCcw size={13} />
              <span>Pop Stack Top (Undo)</span>
            </button>
          </div>

          {/* Vertical Physical Stack Diagram */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            <div style={{ flex: 1, background: '#fdfcf9', border: '2px solid #176057', borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '16px', minHeight: '180px', display: 'flex', flexDirection: 'column-reverse', gap: '8px' }}>
              {undoStackSize === 0 ? (
                <div style={{ textAlign: 'center', color: '#8a9ba8', fontSize: '12.5px', padding: '40px 0', fontStyle: 'italic' }}>
                  Stack is empty. Create a post, follow a scholar, or book an instrument to push an action!
                </div>
              ) : (
                undoStack.toArray().map((item, idx) => {
                  const isTop = idx === undoStackSize - 1;
                  return (
                    <div
                      key={idx}
                      style={{
                        background: isTop ? '#176057' : '#ffffff',
                        color: isTop ? '#ffffff' : '#172430',
                        border: isTop ? '1.5px solid #0f433d' : '1px solid #e0d7c7',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, opacity: 0.8 }}>
                          [Slot {idx}]
                        </span>
                        <b style={{ fontSize: '13px' }}>{item.description || item.type}</b>
                      </div>
                      {isTop && (
                        <span style={{ background: '#e5a93c', color: '#111', fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '4px' }}>
                          TOP OF STACK
                        </span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Stack Metric Spec */}
            <div style={{ width: '220px', background: '#faf7f0', padding: '16px', borderRadius: '10px', border: '1px solid #ebe4d5', fontSize: '12px' }}>
              <b style={{ display: 'block', color: '#176057', marginBottom: '8px', fontSize: '13px' }}>Stack Operations</b>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #efe8db' }}>
                <span>Push:</span> <b>O(1)</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #efe8db' }}>
                <span>Pop:</span> <b>O(1)</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #efe8db' }}>
                <span>Peek:</span> <b>O(1)</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span>Current Depth:</span> <b>{undoStackSize}</b>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. FIFO Queue (Instrument Bookings) Visualizer */}
      {activeTab === 'queue' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '12.5px', color: '#64748b' }}>
              First-In, First-Out (FIFO). Enqueue adds requests to TAIL; Dequeue serves requests from HEAD.
            </span>
            <button onClick={onProcessQueue} disabled={queueItems.length === 0} className="btn-primary-teal" style={{ padding: '6px 14px', fontSize: '12px' }}>
              <span>Dequeue HEAD (O(1))</span>
            </button>
          </div>

          {/* Horizontal Conveyor Queue Diagram */}
          <div style={{ background: '#faf7f0', border: '1.5px dashed #c4b9a6', borderRadius: '10px', padding: '20px', display: 'flex', alignItems: 'center', gap: '12px', overflowX: 'auto' }}>
            <div style={{ textAlign: 'center', minWidth: '70px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#137333', letterSpacing: '0.08em', display: 'block' }}>
                HEAD (Next)
              </span>
              <span style={{ fontSize: '11px', color: '#7b8e9b' }}>← Exit</span>
            </div>

            {queueItems.map((req, idx) => (
              <div
                key={req.id}
                style={{
                  background: idx === 0 ? '#e6f4ea' : '#ffffff',
                  border: idx === 0 ? '1.5px solid #137333' : '1px solid #d5cbba',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  minWidth: '180px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <b style={{ fontSize: '12px', color: '#172430' }}>#{idx + 1} {req.instrument}</b>
                </div>
                <small style={{ color: '#556677', display: 'block', fontSize: '11px' }}>
                  By {req.requester}
                </small>
                <small style={{ color: '#8a9ba8', fontSize: '10px' }}>
                  {req.startDate} to {req.endDate}
                </small>
              </div>
            ))}

            <div style={{ textAlign: 'center', minWidth: '70px' }}>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#176057', letterSpacing: '0.08em', display: 'block' }}>
                TAIL (Rear)
              </span>
              <span style={{ fontSize: '11px', color: '#7b8e9b' }}>Enqueue →</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
