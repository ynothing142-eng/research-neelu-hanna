import React, { useState } from 'react';
import {
  CheckCircle2,
  Search,
  ArrowUpDown,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  FileCheck,
  Calendar,
  AlertTriangle,
  Trees
} from 'lucide-react';
import { TurnitinBST } from '../shared/data/researchSphereData.js';
import { generateMergeSortSteps } from '../shared/algorithms/searching-sorting.js';
import { TurnitinBSTDiagram } from '../components/visualizers/TurnitinBSTDiagram.jsx';

export function TurnitinSlotsView({
  turnitinSlots,
  onBookSlot,
  initialTab = 'bst'
}) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'bst', 'mergeSort'
  const [sortField, setSortField] = useState('deadlineEpoch'); // 'deadlineEpoch', 'studentId', 'similarityScore'
  const [mergeSortState, setMergeSortState] = useState(null);
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  // Initialize BST from slots
  const bst = new TurnitinBST(turnitinSlots);
  const inOrderSortedSlots = bst.inOrderTraversal();

  // Run Merge Sort
  const handleRunMergeSort = () => {
    const keyFn = (item) => item[sortField];
    const { steps, sorted } = generateMergeSortSteps(turnitinSlots, keyFn);
    setMergeSortState({ steps, sorted });
    setActiveStepIdx(steps.length - 1);
  };

  const handleStepPrev = () => {
    if (activeStepIdx > 0) setActiveStepIdx(activeStepIdx - 1);
  };

  const handleStepNext = () => {
    if (mergeSortState && activeStepIdx < mergeSortState.steps.length - 1) {
      setActiveStepIdx(activeStepIdx + 1);
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#176057', textTransform: 'uppercase', marginBottom: '6px' }}>
          ACADEMIC INTEGRITY & SORTING PIPELINES
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '38px', fontWeight: 500, color: '#172430', marginBottom: '8px' }}>
          Turnitin slots
        </h1>
        <p style={{ fontSize: '14.5px', color: '#556675', maxWidth: '780px' }}>
          Manage plagiarism inspection windows indexed as a Binary Search Tree (BST) and sort submission deadlines using divide-and-conquer Merge Sort.
        </p>
      </div>

      {/* Mode Switcher */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          padding: '6px',
          background: '#f1ece0',
          borderRadius: '10px',
          marginBottom: '26px',
          width: 'fit-content'
        }}
      >
        <button
          onClick={() => setActiveTab('bst')}
          style={{
            padding: '7px 16px',
            borderRadius: '7px',
            fontSize: '12.5px',
            fontWeight: 600,
            border: 'none',
            backgroundColor: activeTab === 'bst' ? '#ffffff' : 'transparent',
            color: activeTab === 'bst' ? '#172430' : '#64748b',
            cursor: 'pointer',
            boxShadow: activeTab === 'bst' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Trees size={14} color="#176057" />
          <span>Phase 2 Turnitin Booking BST Diagram</span>
        </button>

        <button
          onClick={() => setActiveTab('mergeSort')}
          style={{
            padding: '7px 16px',
            borderRadius: '7px',
            fontSize: '12.5px',
            fontWeight: 600,
            border: 'none',
            backgroundColor: activeTab === 'mergeSort' ? '#ffffff' : 'transparent',
            color: activeTab === 'mergeSort' ? '#176057' : '#64748b',
            cursor: 'pointer',
            boxShadow: activeTab === 'mergeSort' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <ArrowUpDown size={14} color="#176057" />
          <span>Phase 3 Merge Sort Visualizer</span>
        </button>
      </div>

      {/* TAB 1: Phase 2 Turnitin BST Diagram */}
      {activeTab === 'bst' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <TurnitinBSTDiagram turnitinSlots={turnitinSlots} />

          {/* In-Order Traversal Slots List */}
          <div className="feed-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <span className="badge-tag">In-Order BST Traversal</span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 600, color: '#172430', marginTop: '4px' }}>
                  Chronological Slots (Left → Root → Right)
                </h3>
              </div>
              <span style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                Sorted by Slot ID in O(n)
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {inOrderSortedSlots.map((slot) => (
                <div
                  key={slot.id}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #e8e2d5',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <b style={{ color: '#176057', fontSize: '13px' }}>Slot #{slot.id}</b>
                      <span style={{ fontSize: '13.5px', color: '#172430', fontWeight: 600 }}>"{slot.paperTitle}"</span>
                    </div>
                    <small style={{ color: '#7b8e9b', fontSize: '12px' }}>
                      Student: {slot.studentName} (ID #{slot.studentId}) · Deadline: <b>{slot.deadline}</b>
                    </small>
                  </div>

                  <span style={{ fontSize: '12px', background: '#e6f4ea', color: '#137333', padding: '3px 9px', borderRadius: '4px', fontWeight: 600 }}>
                    {slot.status} ({slot.similarityScore}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Phase 3 Merge Sort Visualizer */}
      {activeTab === 'mergeSort' && (
        <div className="feed-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#176057', textTransform: 'uppercase', marginBottom: '4px' }}>
                PHASE 3 DIVIDE & CONQUER
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 600, color: '#172430' }}>
                Merge Sort: Turnitin Submissions (O(n log n))
              </h3>
            </div>

            <span className="traversal-pill">
              Guaranteed O(n log n) Runtime
            </span>
          </div>

          <p style={{ fontSize: '13.5px', color: '#556675', marginBottom: '20px' }}>
            Merge Sort breaks down the array into individual 1-element sub-lists, then repeatedly merges sub-lists into a new sorted array.
          </p>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap', marginBottom: '22px' }}>
            <div className="input-group">
              <label className="input-label">Sort Key Criteria</label>
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #dcd5c7', fontSize: '13px', background: '#fff' }}
              >
                <option value="deadlineEpoch">Submission Deadline (Chronological)</option>
                <option value="studentId">Student ID Number</option>
                <option value="similarityScore">Plagiarism Similarity Score (%)</option>
              </select>
            </div>

            <button onClick={handleRunMergeSort} className="btn-primary-teal" style={{ padding: '8px 16px', fontSize: '13px' }}>
              <ArrowUpDown size={14} />
              <span>Execute Merge Sort Steps</span>
            </button>
          </div>

          {/* Merge Sort Visualization Steps */}
          {mergeSortState && (
            <div style={{ background: '#fcfaf5', padding: '18px', borderRadius: '10px', border: '1px solid #eae2d3', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#176057', textTransform: 'uppercase' }}>
                  Merge Step {activeStepIdx + 1} of {mergeSortState.steps.length}
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={handleStepPrev}
                    disabled={activeStepIdx === 0}
                    style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid #dcd5c7', background: '#fff', fontSize: '12px', cursor: 'pointer' }}
                  >
                    Previous Step
                  </button>
                  <button
                    onClick={handleStepNext}
                    disabled={activeStepIdx === mergeSortState.steps.length - 1}
                    style={{ padding: '4px 10px', borderRadius: '6px', border: '1px solid #dcd5c7', background: '#fff', fontSize: '12px', cursor: 'pointer' }}
                  >
                    Next Step
                  </button>
                </div>
              </div>

              <div style={{ fontSize: '13.5px', color: '#172430', fontWeight: 500, marginBottom: '12px' }}>
                {mergeSortState.steps[activeStepIdx]?.action}
              </div>

              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Comparisons: <b>{mergeSortState.steps[activeStepIdx]?.comparisons}</b> · Swaps/Merges: <b>{mergeSortState.steps[activeStepIdx]?.swaps}</b>
              </div>
            </div>
          )}

          {/* Sorted Submissions List */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#7b8e9b', textTransform: 'uppercase', marginBottom: '10px' }}>
              Current Submissions List:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {(mergeSortState?.sorted || turnitinSlots).map((slot) => (
                <div
                  key={slot.id}
                  style={{
                    background: '#fdfcf9',
                    border: '1px solid #ebe5d8',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <b style={{ color: '#176057', fontSize: '13px' }}>#{slot.id}</b>
                    <span style={{ fontSize: '13px', color: '#172430' }}>"{slot.paperTitle}"</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#64748b' }}>
                    <span>Deadline: <b>{slot.deadline}</b></span>
                    <span>Student ID: <b>#{slot.studentId}</b></span>
                    <span>Similarity: <b>{slot.similarityScore}%</b></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
