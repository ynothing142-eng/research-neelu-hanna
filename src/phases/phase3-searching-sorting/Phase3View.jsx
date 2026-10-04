import React, { useState, useEffect, useRef } from 'react';
import { Search, BarChart3, CheckCircle, Play, RotateCcw, Award } from 'lucide-react';
import { RESEARCHERS } from '../../shared/data/dataset.js';
import {
  runLinearSearch,
  runBinarySearch,
  generateBubbleSortSteps,
  generateInsertionSortSteps,
  generateMergeSortSteps,
  generateQuickSortSteps,
  BinaryHeap
} from '../../shared/algorithms/searching-sorting.js';

export function Phase3View() {
  // Sorted Researchers strictly from the dataset
  const sortedResearchers = [...RESEARCHERS].sort((a, b) => a.citations - b.citations);
  const [targetCitation, setTargetCitation] = useState(42);
  const [linearComparisons, setLinearComparisons] = useState(6);
  const [binaryComparisons, setBinaryComparisons] = useState(2);
  const [activeSearchMid, setActiveSearchMid] = useState(5);

  // Sorting State
  const [sortAlgo, setSortAlgo] = useState('quick');
  const [sortKey, setSortKey] = useState('citations');
  const [sortItems, setSortItems] = useState(() => [...RESEARCHERS]);
  const [highlightIndices, setHighlightIndices] = useState([]);
  const [sortSteps, setSortSteps] = useState([]);
  const [sortStepIdx, setSortStepIdx] = useState(0);
  const [isSorting, setIsSorting] = useState(false);
  const timerRef = useRef(null);

  // Max-Heap State initialized with exact 8 researchers
  const [heap] = useState(() => {
    const h = new BinaryHeap(true, r => r.citations);
    RESEARCHERS.forEach(r => h.insert(r));
    return h;
  });
  const [topScholar, setTopScholar] = useState(() => heap.peek());
  const [heapItems, setHeapItems] = useState(() => [...heap.items]);

  // Search execution
  const executeSearch = (val) => {
    const cit = parseInt(val, 10);
    if (isNaN(cit)) return;
    setTargetCitation(cit);

    const lRes = runLinearSearch(sortedResearchers, r => r.citations, cit);
    const bRes = runBinarySearch(sortedResearchers, r => r.citations, cit);
    setLinearComparisons(lRes.comparisons);
    setBinaryComparisons(bRes.comparisons);
    setActiveSearchMid(bRes.index !== -1 ? bRes.index : 4);
  };

  // Sorting execution
  const handleStartSort = () => {
    const raw = RESEARCHERS.map(r => ({ ...r }));
    const keyFn = r => r[sortKey];
    let res;

    if (sortAlgo === 'bubble') res = generateBubbleSortSteps(raw, keyFn);
    else if (sortAlgo === 'insertion') res = generateInsertionSortSteps(raw, keyFn);
    else if (sortAlgo === 'merge') res = generateMergeSortSteps(raw, keyFn);
    else if (sortAlgo === 'quick') res = generateQuickSortSteps(raw, keyFn);

    setSortSteps(res.steps);
    setSortStepIdx(0);
    setIsSorting(true);
  };

  const handleResetSort = () => {
    setIsSorting(false);
    clearTimeout(timerRef.current);
    setSortItems([...RESEARCHERS]);
    setHighlightIndices([]);
    setSortStepIdx(0);
  };

  useEffect(() => {
    if (!isSorting || sortSteps.length === 0) return;

    timerRef.current = setTimeout(() => {
      if (sortStepIdx < sortSteps.length) {
        const step = sortSteps[sortStepIdx];
        if (step.array) setSortItems(step.array);
        if (step.activeIndices) setHighlightIndices(step.activeIndices);
        setSortStepIdx(prev => prev + 1);
      } else {
        setIsSorting(false);
        setHighlightIndices([]);
      }
    }, 300);

    return () => clearTimeout(timerRef.current);
  }, [isSorting, sortStepIdx, sortSteps]);

  // Heap execution
  const handleHeapExtract = () => {
    if (heap.items.length === 0) return;
    const extracted = heap.extract();
    setTopScholar(extracted);
    setHeapItems([...heap.items]);
  };

  const handleResetHeap = () => {
    const freshHeap = new BinaryHeap(true, r => r.citations);
    RESEARCHERS.forEach(r => freshHeap.insert(r));
    setTopScholar(freshHeap.peek());
    setHeapItems([...freshHeap.items]);
  };

  const maxVal = Math.max(...RESEARCHERS.map(r => r[sortKey] || 1));

  return (
    <div className="cards-layout">
      {/* CONCEPT 1: LINEAR VS BINARY SEARCH */}
      <div className="algo-card">
        <div className="card-top">
          <div className="card-top-left">
            <div className="card-icon">
              <Search size={20} />
            </div>
            <div>
              <div className="card-badge-cat">SEARCH ALGORITHMS</div>
              <div className="card-title-text">Search Efficiency: Linear vs Binary Search</div>
            </div>
          </div>
          <div className="complexity-badge">O(n) vs O(log n)</div>
        </div>

        {/* Spacious Search Tracks Canvas */}
        <div className="canvas-inset" style={{ minHeight: '320px', flexDirection: 'column', alignItems: 'stretch', gap: '22px' }}>
          
          {/* Track 1: Linear Search */}
          <div style={{ background: '#050c18', border: '1px solid #16263c', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>
                Linear Search (Sequential O(n))
              </span>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#93c5fd' }}>
                Scanned {linearComparisons} of {sortedResearchers.length} items
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '10px' }}>
              {sortedResearchers.map((r, idx) => {
                const isScanned = idx < linearComparisons;
                const isFound = r.citations === targetCitation;

                return (
                  <div
                    key={r.id}
                    style={{
                      background: isFound ? '#064e3b' : isScanned ? '#0a2338' : '#081220',
                      border: `1px solid ${isFound ? '#10b981' : isScanned ? '#0284c7' : '#1e293b'}`,
                      borderRadius: '8px',
                      padding: '10px 6px',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      boxShadow: isFound ? '0 0 14px rgba(16, 185, 129, 0.4)' : 'none'
                    }}
                  >
                    <div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      Idx {idx}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', margin: '4px 0' }}>
                      {r.citations}
                    </div>
                    <div style={{ fontSize: '9.5px', color: isFound ? '#a7f3d0' : '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {r.name.split(' ')[0]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Track 2: Binary Search */}
          <div style={{ background: '#050c18', border: '1px solid #16263c', borderRadius: '10px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--teal)', fontWeight: 700, textTransform: 'uppercase' }}>
                Binary Search (Divide &amp; Conquer O(log n))
              </span>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--teal-light)' }}>
                Target found in only {binaryComparisons} steps
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '10px' }}>
              {sortedResearchers.map((r, idx) => {
                const isMid = idx === activeSearchMid;
                const isFound = r.citations === targetCitation;

                return (
                  <div
                    key={r.id}
                    style={{
                      background: isFound ? '#064e43' : isMid ? '#0c2e33' : '#081220',
                      border: `1px solid ${isFound ? '#2dd4bf' : isMid ? '#14b8a6' : '#1e293b'}`,
                      borderRadius: '8px',
                      padding: '10px 6px',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      boxShadow: isFound ? '0 0 16px rgba(45, 212, 191, 0.4)' : 'none'
                    }}
                  >
                    <div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: isMid ? 'var(--teal-light)' : 'var(--text-muted)' }}>
                      {isMid ? 'MID' : `Idx ${idx}`}
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', margin: '4px 0' }}>
                      {r.citations}
                    </div>
                    <div style={{ fontSize: '9.5px', color: isFound ? '#5eead4' : '#94a3b8', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {r.name.split(' ')[0]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Search Controls */}
        <div className="actions-row">
          <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Search Citations:</span>
          {[14, 18, 27, 30, 35, 42, 52, 61].map(cit => (
            <button
              key={cit}
              type="button"
              onClick={() => executeSearch(cit)}
              className={targetCitation === cit ? 'button-primary' : 'button-secondary'}
              style={{ height: '34px', padding: '0 12px', fontSize: '11.5px' }}
            >
              {cit} cit.
            </button>
          ))}
        </div>

        {/* Outcome Banner */}
        <div className="outcome-banner">
          <div className="outcome-header">
            <CheckCircle size={15} />
            <span>Search Complete for Citation Value: {targetCitation}</span>
          </div>
          <div className="outcome-details">
            Binary Search required <b>{binaryComparisons} steps</b> ($O(\log n)$) vs Linear Search which required <b>{linearComparisons} steps</b> ($O(n)$) to locate the scholar in the sorted index.
          </div>
        </div>
      </div>

      {/* CONCEPT 2: SORTING VISUALIZER & MAX-HEAP */}
      <div className="algo-card">
        <div className="card-top">
          <div className="card-top-left">
            <div className="card-icon">
              <BarChart3 size={20} />
            </div>
            <div>
              <div className="card-badge-cat">ORDERING &amp; PRIORITY</div>
              <div className="card-title-text">Comparison Sorts &amp; Max-Heap Ranking</div>
            </div>
          </div>
          <div className="complexity-badge">O(n log n) Sort · O(1) Heap Peek</div>
        </div>

        {/* Dual Canvas: Sort Bars on Left, Max-Heap on Right */}
        <div className="canvas-inset" style={{ minHeight: '340px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px', alignItems: 'stretch' }}>
          
          {/* Sorting Bars */}
          <div style={{ background: '#050c18', border: '1px solid #16263c', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--teal)', fontWeight: 700, textTransform: 'uppercase' }}>
                Animated Sort ({sortAlgo.toUpperCase()})
              </span>
              <span style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                Step {sortStepIdx} / {sortSteps.length}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '170px', padding: '10px 4px', borderBottom: '1px solid #16263c' }}>
              {sortItems.map((r, idx) => {
                const val = r[sortKey];
                const heightPct = Math.max(15, (val / maxVal) * 100);
                const isActive = highlightIndices.includes(idx);

                return (
                  <div
                    key={r.id}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      height: '100%',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <div style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: isActive ? '#5eead4' : '#94a3b8', marginBottom: '4px' }}>
                      {val}
                    </div>
                    <div
                      style={{
                        width: '100%',
                        height: `${heightPct}%`,
                        background: isActive ? '#2dd4bf' : '#0e3a47',
                        border: `1px solid ${isActive ? '#5eead4' : '#14b8a6'}`,
                        borderRadius: '4px 4px 0 0',
                        transition: 'height 0.25s, background 0.2s'
                      }}
                    />
                    <div style={{ fontSize: '8.5px', color: '#64748b', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%', textAlign: 'center' }}>
                      {r.name.split(' ')[0]}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
              <select
                value={sortAlgo}
                onChange={e => setSortAlgo(e.target.value)}
                className="select-field"
                style={{ height: '34px', fontSize: '11.5px' }}
                disabled={isSorting}
              >
                <option value="quick">Quick Sort (O(n log n))</option>
                <option value="merge">Merge Sort (O(n log n))</option>
                <option value="insertion">Insertion Sort (O(n²))</option>
                <option value="bubble">Bubble Sort (O(n²))</option>
              </select>
              <button
                type="button"
                onClick={handleStartSort}
                disabled={isSorting}
                className="button-primary"
                style={{ height: '34px', fontSize: '11.5px' }}
              >
                <Play size={13} /> {isSorting ? 'Sorting...' : 'Start Sort'}
              </button>
              <button
                type="button"
                onClick={handleResetSort}
                className="button-secondary"
                style={{ height: '34px', fontSize: '11.5px' }}
                title="Reset"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>

          {/* Max-Heap Priority Card */}
          <div style={{ background: '#050c18', border: '1px solid #16263c', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>
                Max-Heap Priority Queue
              </span>
              <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                {heapItems.length} in heap
              </span>
            </div>

            {/* Current Top Scholar Tile */}
            <div style={{ background: '#06202e', border: '1px solid #0284c7', borderRadius: '8px', padding: '14px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#38bdf8', fontWeight: 700 }}>
                <Award size={13} /> TOP SCHOLAR (PEEK O(1))
              </div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginTop: '6px' }}>
                {topScholar?.name}
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                {topScholar?.department} · {topScholar?.institution}
              </div>
              <div style={{ fontSize: '12px', fontFamily: 'var(--font-mono)', color: '#38bdf8', fontWeight: 700, marginTop: '8px' }}>
                {topScholar?.citations} Citations
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <button
                type="button"
                onClick={handleHeapExtract}
                disabled={heapItems.length === 0}
                className="button-primary"
                style={{ flex: 1, height: '34px', fontSize: '11.5px', background: '#0284c7', borderColor: '#0284c7' }}
              >
                Extract Max O(log n)
              </button>
              <button
                type="button"
                onClick={handleResetHeap}
                className="button-secondary"
                style={{ height: '34px', fontSize: '11.5px' }}
                title="Reset Heap"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>

        </div>

        {/* Outcome Banner */}
        <div className="outcome-banner">
          <div className="outcome-header">
            <CheckCircle size={15} />
            <span>Ranking &amp; Ordering Engines Operational</span>
          </div>
          <div className="outcome-details">
            Quick/Merge sort arranges scholars in <b>O(n log n)</b> time; Binary Max-Heap extracts the highest cited scholar in <b>O(log n)</b> time after an instantaneous <b>O(1) peek</b>.
          </div>
        </div>
      </div>
    </div>
  );
}
