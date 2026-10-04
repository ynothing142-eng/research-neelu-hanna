# Phase 1: Core Data Handling

## Overview
Phase 1 establishes the foundational data handling models for the ResearchSphere platform. It introduces linear data structures, abstract data types (ADTs), parsing algorithms, and computational complexity comparisons.

---

## Concepts & Implementations

### 1. Dataset Schema & Records (`dataset.ts`)
- **Real-World Application:** Represents researchers, institutions, publication statistics, and lab booking records.
- **Operations:**
  - Filtering by department, institution, or keyword.
  - Multi-dimensional dataset aggregation (publications, citations).
- **Time Complexity:** O(n) filtering.

### 2. Singly Linked List (`singly-linked-list.ts`)
- **Real-World Application:** Chronological research activity and news discovery feed.
- **Why Linked List?** Enables new publication items to be prepended at the head in `O(1)` time without memory reallocation or shifting existing elements.
- **Time Complexities:**
  - `insertHead(value)`: **O(1)**
  - `insertTail(value)`: **O(n)**
  - `deleteHead()`: **O(1)**
  - `deleteTail()`: **O(n)**
  - `search(predicate)`: **O(n)**
- **Space Complexity:** O(n) where each node holds data + a next reference.

### 3. Stack (LIFO) & Queue (FIFO) (`stack-and-queue.ts`)
- **Real-World Applications:**
  - **Stack (Last-In, First-Out):** User action history and undo operations (e.g., undo follow, undo request approval).
  - **Queue (First-In, First-Out):** Laboratory instrument reservation pipeline (requests are evaluated strictly in arrival order).
- **Time Complexities:**
  - Stack: `push`, `pop`, `peek` are all **O(1)**.
  - Queue: `enqueue`, `dequeue`, `peek` are all **O(1)** amortized.

### 4. Infix to Postfix Converter (`infix-postfix.ts`)
- **Real-World Application:** Dynamic database search filters (e.g. `(citations > 30 OR publications > 8) AND department = CS`).
- **Algorithm:** Shunting-Yard algorithm using an operator stack.
- **Operator Precedences:**
  - Precedence 1: `OR`
  - Precedence 2: `AND`
  - Precedence 3: Relational operators (`>`, `<`, `=`, `>=`, `<=`, `!=`)
- **Time Complexity:** **O(n)** where n is the number of tokens.
- **Space Complexity:** **O(n)** for operator stack and output buffer.

### 5. Iterative vs. Recursive Processing (`recursion-vs-iteration.ts`)
- **Real-World Application:** Traversing feed records, calculating total metrics.
- **Comparative Analysis:**
  - **Iterative:** Uses a single loop with constant auxiliary stack space (`O(1)` call stack). Immune to stack overflows on large datasets.
  - **Recursive:** Decomposes problem into base cases and sub-calls (`O(n)` call stack frames).
- **Complexity:**
  - Iterative: Time O(n), Space O(1).
  - Recursive: Time O(n), Space O(n) call stack.
