import React, { useState } from 'react';
import {
  GraduationCap,
  Search,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
  Sparkles,
  Layers,
  ChevronRight,
  Target
} from 'lucide-react';
import { runBinarySearch } from '../shared/algorithms/searching-sorting.js';
import { HeapBinaryTreeDiagram } from '../components/visualizers/HeapBinaryTreeDiagram.jsx';

export function UniversityView({
  universityMembers,
  serviceRequests,
  onExtractPriorityService,
  onAddServiceRequest,
  clubs,
  turnitinSlots,
  initialTab = 'binarySearch'
}) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'binarySearch', 'heap'
  const [targetId, setTargetId] = useState(101);
  const [binarySearchResult, setBinarySearchResult] = useState(null);

  // New Urgent Request State for Heap
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState(8);
  const [newCategory, setNewCategory] = useState('Safety');

  // Run Binary Search on Sorted University IDs
  const handleSearch = () => {
    const result = runBinarySearch(
      universityMembers,
      (item) => item.id,
      Number(targetId)
    );
    setBinarySearchResult(result);
  };

  const handleAddRequest = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddServiceRequest({
      id: `SR-${Date.now()}`,
      title: newTitle.trim(),
      priority: Number(newPriority),
      category: newCategory,
      requester: 'Active Scholar',
      status: Number(newPriority) >= 8 ? 'Urgent' : 'Standard'
    });

    setNewTitle('');
  };

  const selectedMember = binarySearchResult?.item || universityMembers[0];

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#176057', textTransform: 'uppercase', marginBottom: '6px' }}>
          CAMPUS DIRECTORY & DATA OPTIMIZATION
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '38px', fontWeight: 500, color: '#172430', marginBottom: '8px' }}>
          University
        </h1>
        <p style={{ fontSize: '14.5px', color: '#556675', maxWidth: '780px' }}>
          Perform O(log n) Binary Search across sorted student/faculty IDs, process urgent administrative service queues via Max-Heap, and view integrated academic records.
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
          onClick={() => setActiveTab('binarySearch')}
          style={{
            padding: '7px 16px',
            borderRadius: '7px',
            fontSize: '12.5px',
            fontWeight: 600,
            border: 'none',
            backgroundColor: activeTab === 'binarySearch' ? '#ffffff' : 'transparent',
            color: activeTab === 'binarySearch' ? '#172430' : '#64748b',
            cursor: 'pointer',
            boxShadow: activeTab === 'binarySearch' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Search size={14} color="#176057" />
          <span>Phase 3 Binary Search & Integrated Records</span>
        </button>

        <button
          onClick={() => setActiveTab('heap')}
          style={{
            padding: '7px 16px',
            borderRadius: '7px',
            fontSize: '12.5px',
            fontWeight: 600,
            border: 'none',
            backgroundColor: activeTab === 'heap' ? '#ffffff' : 'transparent',
            color: activeTab === 'heap' ? '#176057' : '#64748b',
            cursor: 'pointer',
            boxShadow: activeTab === 'heap' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Target size={14} color="#176057" />
          <span>Phase 4 Max-Heap Complete Binary Tree</span>
        </button>
      </div>

      {/* TAB 1: Phase 3 Binary Search & Combined Dossier */}
      {activeTab === 'binarySearch' && (
        <div className="desk-grid">
          {/* Binary Search */}
          <div>
            <div className="feed-card" style={{ padding: '24px', marginBottom: '24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#176057', textTransform: 'uppercase', marginBottom: '6px' }}>
                PHASE 3 BINARY SEARCH
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 600, color: '#172430', marginBottom: '8px' }}>
                Sorted University ID Lookup (O(log n))
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                The directory is sorted ascendingly by ID. Each comparison cuts the remaining search space in half.
              </p>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '18px' }}>
                <select
                  value={targetId}
                  onChange={(e) => setTargetId(Number(e.target.value))}
                  style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #dcd5c7', fontSize: '13px', background: '#fff' }}
                >
                  {universityMembers.map((m) => (
                    <option key={m.id} value={m.id}>
                      University ID #{m.id} ({m.name})
                    </option>
                  ))}
                </select>

                <button onClick={handleSearch} className="btn-primary-teal" style={{ padding: '8px 14px', fontSize: '13px' }}>
                  <Search size={14} />
                  <span>Run Binary Search</span>
                </button>
              </div>

              {/* Execution Trace */}
              {binarySearchResult && (
                <div style={{ background: '#fcfaf5', padding: '14px', borderRadius: '8px', border: '1px solid #eae2d3', marginBottom: '16px' }}>
                  <div style={{ fontSize: '11.5px', fontWeight: 700, color: '#176057', marginBottom: '8px' }}>
                    Binary Search Trace ({binarySearchResult.comparisons} comparisons):
                  </div>
                  {binarySearchResult.steps.map((st, i) => (
                    <div key={i} style={{ fontSize: '12px', color: '#475569', padding: '4px 0', borderBottom: '1px solid #efe8dc' }}>
                      <b>Step {i + 1}:</b> Low: {st.low}, Mid: {st.mid}, High: {st.high} → {st.action}
                    </div>
                  ))}
                </div>
              )}

              {/* Sorted ID Array Visualizer */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {universityMembers.map((m) => {
                  const isFound = binarySearchResult?.item?.id === m.id;
                  return (
                    <div
                      key={m.id}
                      onClick={() => {
                        setTargetId(m.id);
                        const res = runBinarySearch(universityMembers, (x) => x.id, m.id);
                        setBinarySearchResult(res);
                      }}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: isFound ? '1.5px solid #176057' : '1px solid #e0d7c7',
                        background: isFound ? '#e8f3ef' : '#ffffff',
                        cursor: 'pointer',
                        textAlign: 'center',
                        minWidth: '85px'
                      }}
                    >
                      <b style={{ display: 'block', fontSize: '13px', color: '#172430' }}>#{m.id}</b>
                      <small style={{ fontSize: '11px', color: '#64748b' }}>{m.name.split(' ')[0]}</small>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Integrated Student Record (Phase 3 Concept 4) */}
          <div>
            {selectedMember && (
              <div className="feed-card" style={{ padding: '24px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#176057', textTransform: 'uppercase', marginBottom: '6px' }}>
                  PHASE 3 COMBINED USE
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 600, color: '#172430', marginBottom: '14px' }}>
                  Integrated Record: {selectedMember.name} (ID #{selectedMember.id})
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px', fontSize: '13px' }}>
                  <div>
                    <span style={{ color: '#64748b' }}>Department:</span> <b>{selectedMember.department}</b>
                  </div>
                  <div>
                    <span style={{ color: '#64748b' }}>Academic Standing:</span> <b>GPA {selectedMember.gpa}</b>
                  </div>
                </div>

                {/* Linked Clubs */}
                <div style={{ marginBottom: '16px' }}>
                  <b style={{ display: 'block', fontSize: '12px', color: '#172430', marginBottom: '6px' }}>
                    Active Club Memberships:
                  </b>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {selectedMember.clubs && selectedMember.clubs.length > 0 ? (
                      selectedMember.clubs.map((c, i) => (
                        <span key={i} className="tag-chip" style={{ background: '#eef5f3', color: '#176057', fontWeight: 600 }}>
                          {c}
                        </span>
                      ))
                    ) : (
                      <span style={{ fontSize: '12px', color: '#7b8e9b' }}>None</span>
                    )}
                  </div>
                </div>

                {/* Linked Turnitin Slots */}
                <div>
                  <b style={{ display: 'block', fontSize: '12px', color: '#172430', marginBottom: '6px' }}>
                    Turnitin Plagiarism Verification Slots:
                  </b>
                  {selectedMember.activeTurnitinSlots && selectedMember.activeTurnitinSlots.length > 0 ? (
                    turnitinSlots
                      .filter((s) => selectedMember.activeTurnitinSlots.includes(s.id))
                      .map((s) => (
                        <div key={s.id} style={{ background: '#fdfcf9', padding: '8px 12px', borderRadius: '6px', border: '1px solid #ebe5d8', fontSize: '12px', marginTop: '6px' }}>
                          <b>Slot #{s.id}:</b> "{s.paperTitle}" — Similarity: <b>{s.similarityScore}%</b> ({s.status})
                        </div>
                      ))
                  ) : (
                    <span style={{ fontSize: '12px', color: '#7b8e9b' }}>No active Turnitin submissions</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Phase 4 Priority Max-Heap Complete Binary Tree */}
      {activeTab === 'heap' && (
        <div>
          <div className="desk-grid" style={{ marginBottom: '28px' }}>
            {/* Heap Operations Card */}
            <div className="feed-card" style={{ padding: '24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#176057', textTransform: 'uppercase', marginBottom: '6px' }}>
                PHASE 4 MAX-HEAP DISPATCH
              </div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 600, color: '#172430', marginBottom: '8px' }}>
                Process University Requests by Priority
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                Urgent administrative requests (emergency repairs, thesis defense plagiarism signoffs) are extracted first before routine tasks in <b>O(log n)</b>.
              </p>

              <button
                onClick={onExtractPriorityService}
                disabled={serviceRequests.length === 0}
                className="btn-primary-teal"
                style={{ marginBottom: '18px' }}
              >
                <CheckCircle size={15} />
                <span>Extract Highest Priority Request (O(log n))</span>
              </button>

              {/* Top Service Requests List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {serviceRequests.slice(0, 4).map((req, idx) => (
                  <div
                    key={req.id}
                    style={{
                      background: idx === 0 ? '#f0fdf4' : '#ffffff',
                      border: idx === 0 ? '1.5px solid #16a34a' : '1px solid #e8e2d5',
                      borderRadius: '8px',
                      padding: '10px 14px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                      <span style={{ fontSize: '11.5px', fontWeight: 700, color: req.priority >= 8 ? '#dc2626' : '#d97706' }}>
                        Priority Score: {req.priority}/10 {idx === 0 ? '(ROOT)' : ''}
                      </span>
                      <span style={{ fontSize: '10px', background: '#f1ede4', padding: '1px 6px', borderRadius: '4px' }}>
                        {req.category}
                      </span>
                    </div>
                    <b style={{ fontSize: '13px', color: '#172430', display: 'block' }}>{req.title}</b>
                    <small style={{ fontSize: '11px', color: '#7b8e9b' }}>Requester: {req.requester}</small>
                  </div>
                ))}
              </div>
            </div>

            {/* Enqueue Form */}
            <div className="feed-card" style={{ padding: '24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#7b8e9b', textTransform: 'uppercase', marginBottom: '8px' }}>
                Insert New Request into Heap
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 600, color: '#172430', marginBottom: '14px' }}>
                Enqueue Service Request (O(log n))
              </h4>

              <form onSubmit={handleAddRequest}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
                  <div>
                    <label className="input-label" style={{ display: 'block', marginBottom: '4px' }}>Title</label>
                    <input
                      type="text"
                      required
                      placeholder="Request description..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #dcd5c7', fontSize: '13px' }}
                    />
                  </div>

                  <div>
                    <label className="input-label" style={{ display: 'block', marginBottom: '4px' }}>Priority Level</label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(Number(e.target.value))}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #dcd5c7', fontSize: '13px', background: '#fff' }}
                    >
                      <option value={10}>Priority 10 (Urgent Safety/Emergency)</option>
                      <option value={9}>Priority 9 (Thesis Final Defense)</option>
                      <option value={8}>Priority 8 (NSF Grant Deadline)</option>
                      <option value={5}>Priority 5 (Hardware Maintenance)</option>
                      <option value={2}>Priority 2 (General Registrar Inquiry)</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn-primary-teal" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>Insert into Max-Heap</span>
                </button>
              </form>
            </div>
          </div>

          {/* Diagrammatic Complete Binary Tree Heap */}
          <HeapBinaryTreeDiagram
            serviceRequests={serviceRequests}
            onExtractMax={onExtractPriorityService}
          />
        </div>
      )}
    </div>
  );
}
