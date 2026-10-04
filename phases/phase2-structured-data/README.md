# Phase 2: Structured Data Representation

## Overview
Phase 2 explores non-linear, hierarchical, and connected data structures: Multi-level Organization Trees, Binary Trees, Binary Search Trees (BST), and Graph representations.

---

## Concepts & Implementations

### 1. Structured Academic Hierarchy (`hierarchy.ts`)
- **Real-World Application:** Institutional breakdown: `Institution -> Departments -> Researchers`.
- **Operations:**
  - Grouping and aggregation of publications and citations by academic unit.
  - Multi-tiered browsing for laboratory directors.
- **Time Complexity:** O(n) construction from flat records.

### 2. Binary Tree & Tree Traversals (`binary-tree.ts`)
- **Real-World Application:** Discipline taxonomy and categorized topic trees.
- **Traversals:**
  - **In-Order (Left, Root, Right):** Produces alphabetical or sorted order.
  - **Pre-Order (Root, Left, Right):** Serializes or clones the hierarchy from top-down.
  - **Post-Order (Left, Right, Root):** Bottom-up dependency resolution or citation rollup.
  - **Level-Order (Breadth-First using Queue):** Explores department hierarchy level by level.
- **Time Complexity:** O(n) visiting all nodes.
- **Space Complexity:** O(h) where h is tree height (call stack).

### 3. Binary Search Tree (BST) (`binary-search-tree.ts`)
- **Real-World Application:** Fast publication-count index for researcher discovery.
- **BST Invariant:**
  - For any node `N`: `keys in N.left < N.key <= keys in N.right`.
- **Operations:**
  - `insert(key, researcher)`: **O(log n)** average, O(n) worst case.
  - `search(key)`: **O(log n)** average, tracks probe path and comparison count.
  - `rangeSearch(min, max)`: **O(k + log n)** to find all researchers within `[min, max]` publications.
- **Space Complexity:** O(n).

### 4. Graph Representation & Traversals (BFS / DFS) (`graph-traversal.ts`)
- **Real-World Application:** Researcher collaboration and co-authorship network.
- **Representation:** Adjacency List `Map<number, number[]>`.
- **Algorithms:**
  - **Breadth-First Search (BFS):**
    - Uses a FIFO Queue.
    - Computes shortest collaboration paths (degrees of separation) between any two scholars.
  - **Depth-First Search (DFS):**
    - Uses a LIFO Stack / recursion.
    - Explores deep research clusters, cycles, and isolated subgraphs.
- **Time Complexity:** **O(V + E)** where V is researchers and E is collaborations.
- **Space Complexity:** **O(V)** for visited set, queue/stack, and distance tracking.
