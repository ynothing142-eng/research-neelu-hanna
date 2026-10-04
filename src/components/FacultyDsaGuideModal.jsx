import React from 'react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Layers,
  Trees,
  Search,
  Target,
  ArrowRight,
  BookOpen
} from 'lucide-react';

export const DSA_PHASES_SCHEMA = [
  {
    phase: 'Phase 1',
    title: 'Fundamental Data Structures',
    icon: Layers,
    items: [
      {
        num: 1,
        concept: 'Linked List',
        implementation: 'Posts',
        tab: 'desk',
        subMode: 'linkedList',
        realWorld: 'Posts are stored as a linked list, allowing posts to be added/removed dynamically.',
        complexity: 'Insert Head: O(1), Delete: O(n)'
      },
      {
        num: 2,
        concept: 'Stack',
        implementation: 'Undo Post/Edit',
        tab: 'desk',
        subMode: 'stack',
        realWorld: 'The most recent action is stored on top and can be undone first — LIFO.',
        complexity: 'Push / Pop: O(1)'
      },
      {
        num: 3,
        concept: 'Queue',
        implementation: 'Instrument Booking Requests',
        tab: 'instruments',
        subMode: 'queue',
        realWorld: 'Research instrument requests are processed in the order they arrive — FIFO.',
        complexity: 'Enqueue / Dequeue: O(1)'
      },
      {
        num: 4,
        concept: 'Infix → Postfix',
        implementation: 'Post/Search Expression Processing',
        tab: 'desk',
        subMode: 'infix',
        realWorld: 'Stack is used to convert user query expression from infix to postfix notation.',
        complexity: 'O(n) time & stack space'
      }
    ]
  },
  {
    phase: 'Phase 2',
    title: 'Structured Data Representation',
    icon: Trees,
    items: [
      {
        num: 1,
        concept: 'Binary Tree',
        implementation: 'Research Topic Hierarchy',
        tab: 'desk',
        subMode: 'tree',
        realWorld: 'Organise research topics (Science → Physics & Biology → Photonics, Quantum, Genetics, Ecology).',
        complexity: 'Max 2 children per node'
      },
      {
        num: 2,
        concept: 'Binary Search Tree (BST)',
        implementation: 'Turnitin Booking BST',
        tab: 'turnitin',
        subMode: 'bst',
        realWorld: 'Submission slots arranged in BST keyed by Slot ID. In-order traversal yields chronological schedule.',
        complexity: 'Search: O(log n)'
      },
      {
        num: 3,
        concept: 'Tree Traversal',
        implementation: 'Instrument Booking Hierarchy',
        tab: 'instruments',
        subMode: 'treeTraversal',
        realWorld: 'Traverse lab catalog (Central Facility → Prototyping & Analytics) systematically.',
        complexity: 'Pre, In, and Level-Order'
      },
      {
        num: 4,
        concept: 'Directed Graphs',
        implementation: 'Who Follows Who',
        tab: 'network',
        subMode: 'graph',
        realWorld: 'Scholars modeled as graph vertices; directed arrows represent follow connections.',
        complexity: 'Adjacency List & Matrix'
      },
      {
        num: 5,
        concept: 'BFS Algorithm',
        implementation: 'Shortest Path Between Researchers',
        tab: 'network',
        subMode: 'bfs',
        realWorld: 'Breadth-First Search finds shortest collaboration bridge and degrees of separation.',
        complexity: 'O(V + E) shortest route'
      }
    ]
  },
  {
    phase: 'Phase 3',
    title: 'Data Processing using Searching and Sorting',
    icon: Search,
    items: [
      {
        num: 1,
        concept: 'Linear Search',
        implementation: 'Clubs Search',
        tab: 'clubs',
        subMode: 'search',
        realWorld: 'Search for a club by name, category, or keyword from the list of available clubs.',
        complexity: 'O(n) Sequential Scan'
      },
      {
        num: 2,
        concept: 'Binary Search',
        implementation: 'University Directory',
        tab: 'university',
        subMode: 'binarySearch',
        realWorld: 'Search for a student/faculty member using sorted University ID / Student ID.',
        complexity: 'O(log n) Halving Space'
      },
      {
        num: 3,
        concept: 'Merge Sort',
        implementation: 'Turnitin Bookings Sorting',
        tab: 'turnitin',
        subMode: 'mergeSort',
        realWorld: 'Sort Turnitin bookings by submission deadline, booking date, or student ID.',
        complexity: 'O(n log n) Divide & Conquer'
      },
      {
        num: 4,
        concept: 'Combined Use',
        implementation: 'University + Clubs + Turnitin',
        tab: 'university',
        subMode: 'integration',
        realWorld: 'Search student ID and display their linked club and Turnitin records in sorted order.',
        complexity: 'Integrated Dossier'
      }
    ]
  },
  {
    phase: 'Phase 4',
    title: 'Algorithmic Problem Solving for Data Optimization',
    icon: Target,
    items: [
      {
        num: 1,
        concept: 'Optimization Problem',
        implementation: 'Club Resource Allocation',
        tab: 'clubs',
        subMode: 'optimization',
        realWorld: 'Optimize allocation of limited seminar hall activity slots among multiple club requests.',
        complexity: 'Activity Selection'
      },
      {
        num: 2,
        concept: 'Greedy Algorithm',
        implementation: 'Earliest Finish Time First (EFT)',
        tab: 'clubs',
        subMode: 'optimization',
        realWorld: 'Select optimal non-overlapping club events fitting in available seminar room.',
        complexity: 'O(n log n) EFT Greedy'
      },
      {
        num: 3,
        concept: 'Heap / Priority Processing',
        implementation: 'University Service Requests',
        tab: 'university',
        subMode: 'heap',
        realWorld: 'Process university service requests by priority (urgent emergency requests handled before normal).',
        complexity: 'Max-Heap: O(log n)'
      },
      {
        num: 4,
        concept: 'Integrated Allocation',
        implementation: 'University Resource Synthesis',
        tab: 'university',
        subMode: 'integration',
        realWorld: 'Combine student participation, club requests, available resources and constraints.',
        complexity: 'Cross-Phase Synthesis'
      }
    ]
  }
];

export function FacultyDsaGuideModal({ isOpen, onClose, onNavigate }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content-card"
        style={{ maxWidth: '860px', maxHeight: '88vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e8e2d5', paddingBottom: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#176057', textTransform: 'uppercase', marginBottom: '3px' }}>
              ACADEMIC PRESENTATION & SYLLABUS MAPPING
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 600, color: '#172430' }}>
              DSA Phases & ResearchSphere Implementation Guide
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#8a96a3' }}
          >
            <X size={22} />
          </button>
        </div>

        <p style={{ fontSize: '13.5px', color: '#556675', marginBottom: '24px', lineHeight: 1.55 }}>
          Click any concept below to immediately jump to its live diagrammatic demonstration in the corresponding module.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {DSA_PHASES_SCHEMA.map((phase) => {
            const PhaseIcon = phase.icon;
            return (
              <div
                key={phase.phase}
                style={{
                  background: '#fcfaf5',
                  border: '1px solid #ebe5d8',
                  borderRadius: '10px',
                  padding: '18px 20px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <PhaseIcon size={16} color="#176057" />
                  <b style={{ fontSize: '15px', color: '#172430' }}>
                    {phase.phase}: {phase.title}
                  </b>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {phase.items.map((item) => (
                    <div
                      key={item.concept}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e8e2d5',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '14px',
                        flexWrap: 'wrap'
                      }}
                    >
                      <div style={{ flex: 1, minWidth: '220px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#176057', background: '#eef5f3', padding: '1px 6px', borderRadius: '4px' }}>
                            {item.concept}
                          </span>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: '#172430' }}>
                            → {item.implementation}
                          </span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                          {item.realWorld}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#176057', fontWeight: 600, background: '#f5f0e6', padding: '3px 8px', borderRadius: '4px' }}>
                          {item.complexity}
                        </span>

                        <button
                          onClick={() => {
                            onNavigate(item.tab, item.subMode);
                            onClose();
                          }}
                          className="btn-primary-teal"
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                        >
                          <span>Open Demo</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
