# ResearchSphere · Data Structures & Algorithms Lab

An academic research collaboration network analyzer and DSA laboratory built to demonstrate data structures, graph traversals, comparison sorting, and greedy optimization algorithms. 

The project contains:
1. **Pure Python Implementations** in `phases/` with standalone interactive CLI demos for all 4 phases.
2. **Pure JavaScript React Visualizer** in `src/` (Vite, React 18, TailwindCSS) with step-by-step interactive algorithm simulators, real dataset binding, live step logs, Big-O badges, and text-only Concept & Complexity documentation.
3. **Completely Free of TypeScript**: Zero TypeScript dependencies, zero `.ts`/`.tsx` files, and zero `tsconfig` files.
4. **Zero Source Code on the Website**: Visitors experience visual algorithm execution, live counters, and plain-English concept explanations—never raw code blocks.

---

## Folder Structure

```
researchsphere-analytics/
├── phases/                                # Standalone Python DSA Implementations
│   ├── data/
│   │   ├── mock_data.py                   # Dataclasses & researcher dataset
│   │   └── __init__.py
│   ├── phase1-core-data-handling/         # Linked list, Stack, Queue, Expressions
│   │   ├── singly_linked_list.py
│   │   ├── stack_and_queue.py
│   │   ├── infix_postfix.py
│   │   ├── recursion_vs_iteration.py
│   │   └── demo_phase1.py
│   ├── phase2-structured-data/            # Trees & Graphs
│   │   ├── hierarchy.py
│   │   ├── binary_tree.py
│   │   ├── binary_search_tree.py
│   │   ├── graph_traversal.py
│   │   └── demo_phase2.py
│   ├── phase3-searching-sorting/          # Searches, Sorts & Heaps
│   │   ├── linear_search.py
│   │   ├── binary_search.py
│   │   ├── sorting_algorithms.py
│   │   ├── priority_queue.py
│   │   └── demo_phase3.py
│   ├── phase4-data-optimization/          # Greedy Interval Scheduling & Decisions
│   │   ├── optimization_model.py
│   │   ├── greedy_scheduler.py
│   │   ├── decision_engine.py
│   │   └── demo_phase4.py
│   └── main_demo.py                       # Master Python runner for all 4 phases
│
├── src/                                   # Pure JavaScript React Web Application
│   ├── shared/
│   │   ├── data/
│   │   │   └── dataset.js                 # Unified single source of truth (MySQL dataset)
│   │   ├── algorithms/
│   │   │   ├── linear.js                  # Array ops, SinglyLinkedList, ActionStack, RequestQueue
│   │   │   ├── trees-graphs.js            # BST, Traversals, Graph (Adj List/Matrix, BFS, DFS)
│   │   │   ├── searching-sorting.js       # Linear/Binary search, Bubble/Insertion/Merge/Quick sorts, BinaryHeap
│   │   │   └── optimization.js            # Greedy Interval Scheduling (EFT) vs Naive FCFS
│   │   └── components/
│   │       ├── StepControls.jsx           # Run, Step, Reset, Speed slider
│   │       ├── MetricCounter.jsx          # Comparisons, Swaps, Steps, Time Taken
│   │       ├── StepLog.jsx                # Live plain-English execution log
│   │       ├── ExplainerBox.jsx           # "What just happened?" summary box
│   │       └── ConceptComplexity.jsx      # Plain-language concept & Big-O tables
│   ├── phases/
│   │   ├── phase1-core-data/Phase1View.jsx # Array feed, Stack undo/redo, Queue bookings, Linked List
│   │   ├── phase2-structured-data/Phase2View.jsx # BST SVG tree, Graph BFS/DFS, Adj List & Matrix
│   │   ├── phase3-searching-sorting/Phase3View.jsx # Linear vs Binary search, Animated Sorts, Top-K Heap
│   │   └── phase4-data-optimization/Phase4View.jsx # Gantt EFT vs FCFS timeline, Cross-phase dashboard
│   ├── App.jsx                            # Header, sidebar, breadcrumb, and routing
│   ├── main.jsx                           # Application entry point
│   └── index.css                          # Clean dark theme with teal accents
│
├── index.html                             # Pure HTML5 entry point
├── vite.config.js                         # Pure JavaScript Vite configuration
├── package.json                           # Clean dependencies (React, Vite, Lucide, Tailwind)
└── README.md
```

---

## Phase-by-Phase Concept Mapping

| Phase | Concept | Python Implementation | Web Algorithm & Visual View |
|---|---|---|---|
| **Phase 01** | Dynamic Array (Feed) | `phases/phase1-.../dataset.py` | `src/shared/algorithms/linear.js` & `Phase1View.jsx` |
| | LIFO Stack (Undo/Redo) | `phases/phase1-.../stack_and_queue.py` | `src/shared/algorithms/linear.js` (`ActionStack`) |
| | FIFO Queue (Lab Bookings) | `phases/phase1-.../stack_and_queue.py` | `src/shared/algorithms/linear.js` (`RequestQueue`) |
| | Singly Linked List | `phases/phase1-.../singly_linked_list.py` | `src/shared/algorithms/linear.js` (`SinglyLinkedList`) |
| **Phase 02** | Binary Search Tree (Mentorship) | `phases/phase2-.../binary_search_tree.py` | `src/shared/algorithms/trees-graphs.js` & `Phase2View.jsx` |
| | In/Pre/Post-Order Traversals | `phases/phase2-.../binary_tree.py` | `src/shared/algorithms/trees-graphs.js` (`getTraversals`) |
| | Collaboration Graph (BFS & DFS) | `phases/phase2-.../graph_traversal.py` | `src/shared/algorithms/trees-graphs.js` (`runBFS`, `runDFS`) |
| | Adjacency List & Matrix | `phases/phase2-.../graph_traversal.py` | `src/shared/algorithms/trees-graphs.js` (`getAdjacencyMatrix`) |
| **Phase 03** | Linear vs Binary Search | `phases/phase3-.../linear_search.py`, `binary_search.py` | `src/shared/algorithms/searching-sorting.js` & `Phase3View.jsx` |
| | Comparison Sorts (Bubble, Insertion, Merge, Quick) | `phases/phase3-.../sorting_algorithms.py` | `src/shared/algorithms/searching-sorting.js` (Step generators) |
| | Binary Max/Min Heap (Top-K Scholars) | `phases/phase3-.../priority_queue.py` | `src/shared/algorithms/searching-sorting.js` (`BinaryHeap`) |
| | Asymptotic Benchmark Scaling | `phases/phase3-.../combined_pipeline.py` | `src/shared/algorithms/searching-sorting.js` (`calculateBenchmarks`) |
| **Phase 04** | Greedy Interval Scheduling (EFT) | `phases/phase4-.../greedy_scheduler.py` | `src/shared/algorithms/optimization.js` & `Phase4View.jsx` |
| | Naive FCFS Baseline Comparison | `phases/phase4-.../optimization_model.py` | `src/shared/algorithms/optimization.js` (`runNaiveFCFS`) |
| | Cross-Phase Analytics Dashboard | `phases/phase4-.../decision_engine.py` | `src/shared/algorithms/optimization.js` (`synthesizeCrossPhaseDashboard`) |

---

## How to Run

### 1. Run the Python Demonstrations
Execute the master runner to run all four phases through the terminal:
```bash
python phases/main_demo.py
```
Or run any individual phase:
```bash
python phases/phase1-core-data-handling/demo_phase1.py
python phases/phase2-structured-data/demo_phase2.py
python phases/phase3-searching-sorting/demo_phase3.py
python phases/phase4-data-optimization/demo_phase4.py
```

### 2. Run the Interactive Web Application
```bash
# Start Vite development server
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

To produce a production bundle:
```bash
npm run build
```
