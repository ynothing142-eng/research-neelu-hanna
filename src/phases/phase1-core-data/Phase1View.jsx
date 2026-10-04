import React, { useState } from 'react';
import { List, Layers, CheckCircle, Plus, Trash2, RotateCcw, ArrowRight } from 'lucide-react';
import { POSTS, REQUESTS } from '../../shared/data/dataset.js';
import { SinglyLinkedList, ActionStack, RequestQueue } from '../../shared/algorithms/linear.js';

export function Phase1View() {
  // Feed / Linked List State using exact initial POSTS
  const [linkedList] = useState(() => new SinglyLinkedList(POSTS));
  const [listItems, setListItems] = useState(() => linkedList.toArray());
  const [newTitle, setNewTitle] = useState('');
  const [activeNodeIdx, setActiveNodeIdx] = useState(0);

  // Stack State (Undo history initialized from initial user interactions)
  const [undoStack] = useState(() => new ActionStack(['Followed Arjun Kumar', 'Approved GPU Workstation']));
  const [stackItems, setStackItems] = useState(() => undoStack.toArray());

  // Queue State using exact initial REQUESTS
  const [bookingQueue] = useState(() => new RequestQueue(REQUESTS));
  const [queueItems, setQueueItems] = useState(() => bookingQueue.toArray());
  const [lastProcessedReq, setLastProcessedReq] = useState(null);

  // Operations
  const handleInsertHead = (e) => {
    if (e) e.preventDefault();
    const title = newTitle.trim() || `New Study #${listItems.length + 1}`;
    const newPost = { id: Date.now(), title, date: '2026-10-02', likes: 12, authorId: 1 };
    linkedList.insertHead(newPost);
    setListItems(linkedList.toArray());
    setActiveNodeIdx(0);
    setNewTitle('');
    undoStack.push(`Prepended Feed Post #${newPost.id}`);
    setStackItems(undoStack.toArray());
  };

  const handleDeleteTail = () => {
    if (listItems.length === 0) return;
    const tail = listItems[listItems.length - 1];
    linkedList.deleteByValue(x => x.id === tail.id);
    setListItems(linkedList.toArray());
    undoStack.push(`Deleted Tail Post #${tail.id}`);
    setStackItems(undoStack.toArray());
  };

  const handlePushStack = () => {
    const act = `Action #${stackItems.length + 1}: Query Researcher Profile`;
    undoStack.push(act);
    setStackItems(undoStack.toArray());
  };

  const handlePopStack = () => {
    if (undoStack.isEmpty()) return;
    undoStack.pop();
    setStackItems(undoStack.toArray());
  };

  const handleDequeue = () => {
    if (bookingQueue.isEmpty()) return;
    const item = bookingQueue.dequeue();
    setLastProcessedReq(item);
    setQueueItems(bookingQueue.toArray());
  };

  return (
    <div className="cards-layout">
      {/* CONCEPT 1: SINGLY LINKED LIST (ACTIVITY FEED) */}
      <div className="algo-card">
        <div className="card-top">
          <div className="card-top-left">
            <div className="card-icon">
              <List size={20} />
            </div>
            <div>
              <div className="card-badge-cat">LINEAR DATA STRUCTURES</div>
              <div className="card-title-text">Singly Linked List (Research Activity Feed)</div>
            </div>
          </div>
          <div className="complexity-badge">Insert Head O(1) · Traversal O(n)</div>
        </div>

        {/* Spacious Linked List Canvas */}
        <div className="canvas-inset" style={{ minHeight: '260px', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', overflowX: 'auto', width: '100%', padding: '20px 10px' }}>
            {listItems.map((item, idx) => (
              <React.Fragment key={item.id}>
                <div
                  onClick={() => setActiveNodeIdx(idx)}
                  style={{
                    minWidth: '170px',
                    maxWidth: '190px',
                    background: activeNodeIdx === idx ? '#064e43' : '#081322',
                    border: `1px solid ${activeNodeIdx === idx ? '#2dd4bf' : '#1e334d'}`,
                    borderRadius: '10px',
                    padding: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: activeNodeIdx === idx ? '0 0 16px rgba(45, 212, 191, 0.35)' : 'none',
                    flexShrink: 0
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    <span>Node #{idx}</span>
                    {idx === 0 && (
                      <span style={{ color: '#2dd4bf', background: '#092723', padding: '2px 6px', borderRadius: '4px', fontWeight: 700 }}>
                        HEAD
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#f8fafc', margin: '8px 0 6px', lineHeight: 1.35 }}>
                    {item.title}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                    <span>{item.date}</span>
                    <span style={{ color: '#2dd4bf' }}>{item.likes} likes</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', color: '#2dd4bf', flexShrink: 0 }}>
                  <ArrowRight size={18} />
                </div>
              </React.Fragment>
            ))}

            <div style={{ background: '#0a1628', border: '1px dashed #334155', borderRadius: '8px', padding: '12px 16px', color: '#64748b', fontSize: '12px', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
              NULL (End)
            </div>
          </div>
        </div>

        {/* Inputs & Controls */}
        <form onSubmit={handleInsertHead} className="actions-row">
          <input
            type="text"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            placeholder="Enter research paper or discovery title..."
            className="input-field"
          />
          <button type="submit" className="button-primary">
            <Plus size={14} /> Insert at Head O(1)
          </button>
          <button type="button" onClick={handleDeleteTail} className="button-secondary">
            <Trash2 size={14} /> Delete Tail Node O(n)
          </button>
        </form>

        {/* Outcome Box */}
        <div className="outcome-banner">
          <div className="outcome-header">
            <CheckCircle size={15} />
            <span>Active Selection: Node #{activeNodeIdx} — &ldquo;{listItems[activeNodeIdx]?.title || 'Head node'}&rdquo;</span>
          </div>
          <div className="outcome-details">
            Current linked list chain length: <b>{listItems.length} nodes</b>. Pointers dynamically link nodes without contiguous memory reallocation.
          </div>
        </div>
      </div>

      {/* CONCEPT 2: LIFO STACK & FIFO QUEUE */}
      <div className="algo-card">
        <div className="card-top">
          <div className="card-top-left">
            <div className="card-icon">
              <Layers size={20} />
            </div>
            <div>
              <div className="card-badge-cat">LIFO &amp; FIFO PIPELINES</div>
              <div className="card-title-text">Call Stack (Undo Buffer) &amp; Request Queue (Equipment Pipeline)</div>
            </div>
          </div>
          <div className="complexity-badge">O(1) Push / Pop / Dequeue</div>
        </div>

        {/* Dual Spacious Canvas */}
        <div className="canvas-inset" style={{ minHeight: '300px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'stretch' }}>
          
          {/* Stack Pipeline */}
          <div style={{ background: '#050c18', border: '1px solid #16263c', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #132233', paddingBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--teal)', fontWeight: 700, textTransform: 'uppercase' }}>
                LIFO Stack (Undo Buffer)
              </span>
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {stackItems.length} actions
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, maxHeight: '180px', overflowY: 'auto' }}>
              {stackItems.length === 0 ? (
                <div style={{ color: '#475569', fontSize: '11px', fontStyle: 'italic', textAlign: 'center', margin: 'auto' }}>
                  Stack is empty
                </div>
              ) : (
                stackItems.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: idx === stackItems.length - 1 ? '#063830' : '#0a1626',
                      border: `1px solid ${idx === stackItems.length - 1 ? '#2dd4bf' : '#1e334d'}`,
                      borderRadius: '6px',
                      padding: '8px 12px',
                      fontSize: '11.5px',
                      color: idx === stackItems.length - 1 ? '#fff' : '#94a3b8',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span>{item}</span>
                    {idx === stackItems.length - 1 && (
                      <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#2dd4bf', fontWeight: 700 }}>
                        TOP
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <button type="button" onClick={handlePushStack} className="button-primary" style={{ flex: 1, height: '34px', fontSize: '11.5px' }}>
                <Plus size={13} /> Push Action
              </button>
              <button type="button" onClick={handlePopStack} className="button-secondary" style={{ flex: 1, height: '34px', fontSize: '11.5px' }}>
                <RotateCcw size={13} /> Undo (Pop)
              </button>
            </div>
          </div>

          {/* Queue Pipeline */}
          <div style={{ background: '#050c18', border: '1px solid #16263c', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #132233', paddingBottom: '8px' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>
                FIFO Queue (Lab Reservations)
              </span>
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {queueItems.length} pending
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, maxHeight: '180px', overflowY: 'auto' }}>
              {queueItems.length === 0 ? (
                <div style={{ color: '#475569', fontSize: '11px', fontStyle: 'italic', textAlign: 'center', margin: 'auto' }}>
                  Queue is empty
                </div>
              ) : (
                queueItems.map((req, idx) => (
                  <div
                    key={req.id}
                    style={{
                      background: idx === 0 ? '#052b3b' : '#0a1626',
                      border: `1px solid ${idx === 0 ? '#38bdf8' : '#1e334d'}`,
                      borderRadius: '6px',
                      padding: '8px 12px',
                      fontSize: '11.5px',
                      color: idx === 0 ? '#fff' : '#94a3b8',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span>
                      #{req.id} {req.instrument} ({req.requester.split(' ')[0]})
                    </span>
                    {idx === 0 && (
                      <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#38bdf8', fontWeight: 700 }}>
                        FRONT
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>

            <div style={{ marginTop: '12px' }}>
              <button
                type="button"
                onClick={handleDequeue}
                className="button-primary"
                style={{ width: '100%', height: '34px', fontSize: '11.5px', background: '#0284c7', borderColor: '#0284c7' }}
              >
                Dequeue Next Request (FIFO O(1))
              </button>
            </div>
          </div>

        </div>

        {/* Outcome Banner */}
        <div className="outcome-banner">
          <div className="outcome-header">
            <CheckCircle size={15} />
            <span>Pipelines Synchronized with MySQL Dataset</span>
          </div>
          <div className="outcome-details">
            {lastProcessedReq ? (
              <>
                Processed Request <b>#{lastProcessedReq.id}</b> ({lastProcessedReq.instrument} for {lastProcessedReq.requester}) from the front of the queue in <b>O(1) time</b>.
              </>
            ) : (
              <>
                Stack maintains full undo history in LIFO order; Queue schedules laboratory equipment bookings in fair FIFO order.
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
