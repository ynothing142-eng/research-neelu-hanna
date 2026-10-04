# ResearchSphere · Data Structures & Algorithms Lab (Python Edition)

## Master Curriculum & Python Directory

ResearchSphere provides pure Python implementations for all core data structures, algorithms, and optimization techniques. Every concept is implemented in an independent, executable Python script with type annotations, docstrings, Big-O complexity analyses, and demonstration blocks (`if __name__ == '__main__':`).

```
phases/
├── data/
│   ├── mock_data.py                 # Unified ResearchSphere entities (Researcher, Post, Request)
│   └── __init__.py                  # Data package exports
│
├── phase1-core-data-handling/       # Phase 1: Linear structures, ADTs, expression parsing
│   ├── dataset.py                   # Dataset filtering & analytics aggregation
│   ├── singly_linked_list.py        # SinglyLinkedList (O(1) Head Insert, O(n) Traversal)
│   ├── stack_and_queue.py           # Stack (LIFO undo) & Queue (FIFO booking requests)
│   ├── infix_postfix.py             # Shunting-Yard expression parser
│   ├── recursion_vs_iteration.py    # Call stack depth & complexity benchmarking
│   ├── demo_phase1.py               # Interactive Phase 1 terminal runner
│   └── README.md                    # Concept explanations & equations
│
├── phase2-structured-data/          # Phase 2: Hierarchical & networked structures
│   ├── hierarchy.py                 # Multi-level academic tree (Institution -> Dept -> Scholar)
│   ├── binary_tree.py               # Binary tree traversals (In, Pre, Post, Level-order)
│   ├── binary_search_tree.py        # BST publication-count index & range queries
│   ├── graph_traversal.py           # Collaboration graph with BFS (shortest path) & DFS
│   ├── demo_phase2.py               # Interactive Phase 2 terminal runner
│   └── README.md                    # Detailed documentation
│
├── phase3-searching-sorting/        # Phase 3: Search, sort, pipeline & heap
│   ├── linear_search.py             # Linear search with step-by-step comparison counter
│   ├── binary_search.py             # Binary search on sorted citations with low/mid/high
│   ├── sorting_algorithms.py        # Merge Sort (O(n log n) stable), Quick Sort, Insertion Sort
│   ├── combined_pipeline.py         # Sort-then-search pipeline benchmark
│   ├── priority_queue.py            # Max-Heap for real-time trending research feed
│   ├── demo_phase3.py               # Interactive Phase 3 terminal runner
│   └── README.md                    # Detailed documentation
│
├── phase4-data-optimization/        # Phase 4: Combinatorial optimization & decisions
│   ├── optimization_model.py        # Interval scheduling formulation & collision logic
│   ├── greedy_scheduler.py          # Earliest Finish Time First (EFT) greedy scheduler
│   ├── decision_engine.py           # Cross-phase synthesis engine
│   ├── demo_phase4.py               # Interactive Phase 4 terminal runner
│   └── README.md                    # Optimality proof & decision documentation
│
├── main_demo.py                     # Master runner executing all 4 phases in sequence
└── README.md                        # Master curriculum guide
```

---

## How to Run Python Demonstrations

### 1. Run All Phases in Sequence
From the project root:
```bash
python phases/main_demo.py
```

### 2. Run Individual Phase Demos
```bash
# Phase 1: Core Data Handling
python phases/phase1-core-data-handling/demo_phase1.py

# Phase 2: Structured Data Representation
python phases/phase2-structured-data/demo_phase2.py

# Phase 3: Searching and Sorting
python phases/phase3-searching-sorting/demo_phase3.py

# Phase 4: Data Optimization
python phases/phase4-data-optimization/demo_phase4.py
```

### 3. Run Individual Concept Files Directly
Every individual file can be run directly to demonstrate its specific algorithm:
```bash
python phases/phase1-core-data-handling/singly_linked_list.py
python phases/phase1-core-data-handling/infix_postfix.py
python phases/phase2-structured-data/binary_search_tree.py
python phases/phase2-structured-data/graph_traversal.py
python phases/phase3-searching-sorting/sorting_algorithms.py
python phases/phase3-searching-sorting/priority_queue.py
python phases/phase4-data-optimization/greedy_scheduler.py
```

---

## Big-O Complexity Summary Table

| Phase | Concept File | Time Complexity | Space Complexity | Platform Application |
| :--- | :--- | :--- | :--- | :--- |
| **Phase 1** | `dataset.py` | O(n) | O(n) | Researcher record filtering |
| **Phase 1** | `singly_linked_list.py` | O(1) Head Insert, O(n) Search | O(n) | Dynamic chronological feed |
| **Phase 1** | `stack_and_queue.py` | O(1) Push / Pop / Enqueue / Dequeue | O(n) | Undo history (Stack) & Bookings (Queue) |
| **Phase 1** | `infix_postfix.py` | O(n) | O(n) Stack | Advanced boolean query parser |
| **Phase 1** | `recursion_vs_iteration.py`| O(n) | O(1) Iterative / O(n) Recursive | Call-stack depth analysis |
| **Phase 2** | `hierarchy.py` | O(n) | O(n) | Institution $\to$ Department tree |
| **Phase 2** | `binary_tree.py` | O(n) | O(h) Call stack | In, Pre, Post, Level-order |
| **Phase 2** | `binary_search_tree.py` | O(log n) avg Search/Insert | O(n) | Publication-count index & ranges |
| **Phase 2** | `graph_traversal.py` | O(V + E) | O(V) | Co-authorship shortest paths (BFS/DFS) |
| **Phase 3** | `linear_search.py` | O(n) worst, O(1) best | O(1) | Unsorted researcher scan |
| **Phase 3** | `binary_search.py` | O(log2 n) | O(1) iterative | Citation threshold search |
| **Phase 3** | `sorting_algorithms.py` | O(n log n) Best/Avg/Worst | O(n) | Merge Sort (Posts) & Quick Sort (Ranking) |
| **Phase 3** | `combined_pipeline.py` | O(n log n) + k·O(log n) | O(n) | Sort-then-search pipeline |
| **Phase 3** | `priority_queue.py` | O(log n) Insert/Extract, O(1) Peek | O(n) | Real-time trending research feed |
| **Phase 4** | `optimization_model.py` | O(n^2) conflict matrix | O(n) | Multi-resource reservation |
| **Phase 4** | `greedy_scheduler.py` | O(n log n) sort + O(n) scan | O(n) | Max conflict-free equipment slots |
| **Phase 4** | `decision_engine.py` | O(V + E + n log n) | O(V + n) | Executive collaboration brief |
