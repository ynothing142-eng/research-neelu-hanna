"""
Phase 1: Core Data Handling
Concept: Stack (LIFO) & Queue (FIFO) (Python)

Real-world applications:
- Stack: User undo history (Last-In First-Out).
- Queue: Laboratory instrument booking pipeline (First-In First-Out).

Time Complexities:
- Stack Push / Pop / Peek: O(1)
- Queue Enqueue / Dequeue: O(1) using collections.deque
Space Complexity: O(n)
"""

from typing import TypeVar, Generic, Optional, List
from collections import deque
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from data.mock_data import Request, INITIAL_REQUESTS

T = TypeVar('T')

class Stack(Generic[T]):
    """
    Last-In, First-Out (LIFO) Abstract Data Type
    """
    def __init__(self, initial_items: Optional[List[T]] = None):
        self._items: List[T] = list(initial_items) if initial_items else []

    def push(self, item: T) -> None:
        """Push element onto top of stack: O(1)"""
        self._items.append(item)

    def pop(self) -> Optional[T]:
        """Pop and return top element: O(1)"""
        return self._items.pop() if self._items else None

    def peek(self) -> Optional[T]:
        """Inspect top element without removing: O(1)"""
        return self._items[-1] if self._items else None

    def is_empty(self) -> bool:
        return len(self._items) == 0

    def size(self) -> int:
        return len(self._items)

    def to_list(self) -> List[T]:
        return list(self._items)

class Queue(Generic[T]):
    """
    First-In, First-Out (FIFO) Abstract Data Type
    Implemented using collections.deque for true O(1) enqueue and dequeue.
    """
    def __init__(self, initial_items: Optional[List[T]] = None):
        self._items: deque[T] = deque(initial_items) if initial_items else deque()

    def enqueue(self, item: T) -> None:
        """Add element to rear of queue: O(1)"""
        self._items.append(item)

    def dequeue(self) -> Optional[T]:
        """Remove and return front element: O(1)"""
        return self._items.popleft() if self._items else None

    def peek(self) -> Optional[T]:
        """Inspect front element without removing: O(1)"""
        return self._items[0] if self._items else None

    def is_empty(self) -> bool:
        return len(self._items) == 0

    def size(self) -> int:
        return len(self._items)

    def to_list(self) -> List[T]:
        return list(self._items)

if __name__ == '__main__':
    print("=== Demo 1: Undo Stack (LIFO) ===")
    undo_stack = Stack[str](['Followed Arjun', 'Booked GPU Workstation', 'Bookmarked Paper'])
    print(f"Stack size: {undo_stack.size()}")
    print(f"Top action: {undo_stack.peek()}")

    print("Pushing new action: 'Liked AI Workshop Post'...")
    undo_stack.push('Liked AI Workshop Post')
    print(f"Top action is now: {undo_stack.peek()}")

    print("Undoing last action (POP)...")
    undone = undo_stack.pop()
    print(f"Undid action: {undone}")
    print(f"Remaining stack: {undo_stack.to_list()}")

    print("\n=== Demo 2: Equipment Booking Queue (FIFO) ===")
    pending_requests = [r for r in INITIAL_REQUESTS if r.status == 'Pending']
    booking_queue = Queue[Request](pending_requests)
    print(f"Pending requests in queue: {booking_queue.size()}")

    front = booking_queue.peek()
    print(f"Next to be processed (FRONT): #{front.id} {front.instrument} for {front.requester}")

    print("Processing request (DEQUEUE)...")
    processed = booking_queue.dequeue()
    print(f"Processed: #{processed.id} ({processed.instrument})")
    print(f"Remaining requests in queue: {booking_queue.size()}")
