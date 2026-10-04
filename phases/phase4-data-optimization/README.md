# Phase 4: Data Optimization

## Overview
Phase 4 focuses on combinatorial optimization problems, greedy algorithmic strategies, interval scheduling, and cross-phase decision synthesis.

---

## Concepts & Implementations

### 1. Optimization Problem Formulation (`optimization-model.ts`)
- **Real-World Application:** High-demand laboratory instrument sharing (GPU Workstations, 3D Printers, Spectrometers).
- **Mathematical Model:**
  - Input: Set of booking requests $R = \{r_1, r_2, \dots, r_m\}$.
  - Each request has instrument $I$, start time $s_i$, end time $e_i$ ($s_i < e_i$).
  - Two requests $r_i$ and $r_j$ conflict if:
    $$r_i.I = r_j.I \quad \text{AND} \quad \max(s_i, s_j) < \min(e_i, e_j)$$
  - Objective: Select a subset $S \subseteq R$ of maximum cardinality $|S|$ such that no two selected requests conflict.

### 2. Greedy Algorithm - Interval Scheduling (`greedy-scheduler.ts`)
- **Strategy:** **Earliest Finish Time First (EFT)**.
- **Algorithm Steps:**
  1. Filter out pre-rejected administrative requests.
  2. Sort eligible requests by non-decreasing finish time: $e_1 \le e_2 \le \dots \le e_k$.
  3. Greedily pick the first request with the earliest finish time.
  4. Discard overlapping intervals on the same instrument.
  5. Repeat until all requests are processed.
- **Optimality Theorem ("Greedy Stays Ahead"):**
  - By finishing as early as possible, the greedy choice leaves maximum remaining time for subsequent bookings.
  - Guaranteed to produce an optimal solution for single and multi-machine interval scheduling.
- **Time Complexity:**
  - Sorting: **O(n log n)**
  - Greedy Selection: **O(n)**
  - Total: **O(n log n)**
- **Space Complexity:** O(n) for output schedule.

### 3. Cross-Phase Integration & Decision Synthesis (`decision-engine.ts`)
- **Real-World Application:** Unifying all algorithmic components into an automated executive briefing for research directors.
- **Components Integrated:**
  - **Phase 1:** Core dataset models and booking queue.
  - **Phase 2:** Graph BFS shortest paths to discover reachable collaborators.
  - **Phase 3:** Citation-based ranking to identify the highest-impact scholar.
  - **Phase 4:** Greedy conflict-free instrument reservation schedule.
- **Output:** Structured report synthesizing recommended collaborators, network topology, and optimal facility utilization.
