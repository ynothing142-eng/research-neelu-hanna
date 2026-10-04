"""
Phase 3: Searching and Sorting
Concept: Heap & Priority Queue (Max-Heap) (Python)

Real-world application:
Real-time trending research feed with instant top-k extraction by likes,
and high-priority instrument reservation alerts.

Properties:
- Complete binary tree represented in a flat array.
- Parent >= children (Max-Heap invariant).
- Index formulas: parent=(i-1)//2, left=2i+1, right=2i+2.

Time Complexities:
- Insert: O(log n) via sift-up
- Extract-Max: O(log n) via sift-down
- Peek-Max: O(1)
Space Complexity: O(n) in a compact array
"""

from typing import TypeVar, Generic, Callable, List, Optional
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from data.mock_data import Post, INITIAL_POSTS

T = TypeVar('T')

class MaxHeap(Generic[T]):
    def __init__(self, score_fn: Callable[[T], float], initial_items: Optional[List[T]] = None):
        self.score_fn: Callable[[T], float] = score_fn
        self._heap: List[T] = []

        if initial_items:
            self._heap = list(initial_items)
            self._build_heap()

    def _parent(self, i: int) -> int:
        return (i - 1) // 2

    def _left(self, i: int) -> int:
        return 2 * i + 1

    def _right(self, i: int) -> int:
        return 2 * i + 2

    def _swap(self, i: int, j: int) -> None:
        self._heap[i], self._heap[j] = self._heap[j], self._heap[i]

    def _sift_up(self, i: int) -> None:
        curr = i
        while curr > 0 and self.score_fn(self._heap[curr]) > self.score_fn(self._heap[self._parent(curr)]):
            self._swap(curr, self._parent(curr))
            curr = self._parent(curr)

    def _sift_down(self, i: int) -> None:
        max_idx = i
        n = len(self._heap)

        while True:
            left = self._left(max_idx)
            right = self._right(max_idx)
            largest = max_idx

            if left < n and self.score_fn(self._heap[left]) > self.score_fn(self._heap[largest]):
                largest = left
            if right < n and self.score_fn(self._heap[right]) > self.score_fn(self._heap[largest]):
                largest = right

            if largest != max_idx:
                self._swap(max_idx, largest)
                max_idx = largest
            else:
                break

    def _build_heap(self) -> None:
        for i in reversed(range(len(self._heap) // 2)):
            self._sift_down(i)

    def insert(self, item: T) -> None:
        """Insert element into heap: O(log n)"""
        self._heap.append(item)
        self._sift_up(len(self._heap) - 1)

    def extract_max(self) -> Optional[T]:
        """Remove and return maximum priority element: O(log n)"""
        if not self._heap:
            return None
        if len(self._heap) == 1:
            return self._heap.pop()

        max_val = self._heap[0]
        self._heap[0] = self._heap.pop()
        self._sift_down(0)
        return max_val

    def peek_max(self) -> Optional[T]:
        """Inspect maximum priority element: O(1)"""
        return self._heap[0] if self._heap else None

    def get_top_k(self, k: int) -> List[T]:
        """Extract top k items without modifying original heap."""
        clone = MaxHeap(self.score_fn, self._heap)
        top_k: List[T] = []
        for _ in range(min(k, len(self._heap))):
            item = clone.extract_max()
            if item is not None:
                top_k.append(item)
        return top_k

    def size(self) -> int:
        return len(self._heap)

    def to_list(self) -> List[T]:
        return list(self._heap)

if __name__ == '__main__':
    heap = MaxHeap[Post](score_fn=lambda p: p.likes, initial_items=INITIAL_POSTS)
    print("=== Demo: Max-Heap (Trending Research Posts) ===")
    print(f"Total posts in heap: {heap.size()}")

    top = heap.peek_max()
    print(f"Top Trending Post (PEEK): '{top.title}' with {top.likes} likes")

    print("\nAction: Inserting high-impact paper (55 likes)...")
    heap.insert(Post(id=77, title="Breakthrough in Fusion Energy", date="2026-10-02", likes=55))
    new_top = heap.peek_max()
    print(f"New Top Trending Post: '{new_top.title}' with {new_top.likes} likes")

    print("\nTop 3 Trending Papers:")
    for rank, p in enumerate(heap.get_top_k(3), 1):
        print(f"  #{rank}: {p.title} ({p.likes} likes)")
