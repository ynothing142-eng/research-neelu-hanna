# Phase 3: Searching and Sorting

## Overview
Phase 3 focuses on algorithmic efficiency, sorting paradigms, divide-and-conquer searching, pipeline optimization, and priority queues.

---

## Concepts & Implementations

### 1. Linear Search (`linear-search.ts`)
- **Real-World Application:** Searching by name in an unsorted directory of researcher profiles.
- **Characteristics:**
  - Evaluates elements sequentially from index 0 to n-1.
  - Requires no preprocessing.
- **Time Complexity:**
  - Best: O(1)
  - Average / Worst: O(n)
- **Space Complexity:** O(1) auxiliary space.

### 2. Binary Search (`binary-search.ts`)
- **Real-World Application:** Querying researchers by citation thresholds on a sorted index.
- **Characteristics:**
  - Requires pre-sorted array.
  - Maintains `low`, `mid`, and `high` pointers, discarding half the search window at each comparison.
- **Time Complexity:**
  - Best: O(1)
  - Average / Worst: **O(log2 n)** (e.g., at most 3 comparisons for n=8).
- **Space Complexity:** O(1) iterative.

### 3. Sorting Algorithms (`sorting-algorithms.ts`)
- **Merge Sort:**
  - Stable divide-and-conquer algorithm.
  - Used to sort research posts chronologically by ISO date string.
  - **Time Complexity:** **O(n log n)** best, average, and worst.
  - **Space Complexity:** O(n) auxiliary merge buffer.
- **Quick Sort:**
  - In-place partitioning algorithm.
  - Used to rank researchers by publication volume.
  - **Time Complexity:** O(n log n) average, O(n^2) worst case.
  - **Space Complexity:** O(log n) call stack.
- **Insertion Sort:**
  - Adaptive comparison sort.
  - Highly efficient for nearly sorted data streams (`O(n)` best case).

### 4. Combined Use Pipeline (`combined-pipeline.ts`)
- **Real-World Application:** Multi-query search engine optimization.
- **Algorithmic Trade-Off:**
  - Naive: Run linear search `k` times -> Total cost = `k * O(n)`.
  - Combined: Sort once using Merge Sort (`O(n log n)`), then run `k` binary searches (`k * O(log n)`).
  - Total Combined Cost = `O(n log n) + k * O(log n)`.
- **Crossover Point:** For `k > log2(n)`, the combined pipeline delivers significant speedups.

### 5. Heap & Priority Queue (`priority-queue.ts`)
- **Real-World Application:** Discovering top trending research publications by real-time likes.
- **Max-Heap Property:** Every parent node has a score greater than or equal to its children.
- **Index Relations:**
  - `Parent(i) = floor((i - 1) / 2)`
  - `Left(i) = 2i + 1`
  - `Right(i) = 2i + 2`
- **Time Complexity:**
  - `insert(item)`: **O(log n)** (sift-up)
  - `extractMax()`: **O(log n)** (sift-down)
  - `peekMax()`: **O(1)**
- **Space Complexity:** O(n) in a flat array.
