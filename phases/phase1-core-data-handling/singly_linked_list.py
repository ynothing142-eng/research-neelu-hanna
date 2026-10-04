"""
Phase 1: Core Data Handling
Concept: Singly Linked List (Python)

Real-world application:
Dynamic chronological research feed. New findings and publications
can be prepended at the head in O(1) time without shifting existing elements.

Time Complexities:
- Insert at Head: O(1)
- Insert at Tail: O(n)
- Delete at Head: O(1)
- Delete at Tail: O(n)
- Traversal / Search: O(n)
Space Complexity: O(n)
"""

from typing import TypeVar, Generic, Optional, List, Callable
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from data.mock_data import Post, INITIAL_POSTS

T = TypeVar('T')

class LinkedListNode(Generic[T]):
    def __init__(self, value: T, next_node: Optional['LinkedListNode[T]'] = None):
        self.value: T = value
        self.next: Optional['LinkedListNode[T]'] = next_node

    def __repr__(self) -> str:
        return f"Node({self.value})"

class SinglyLinkedList(Generic[T]):
    def __init__(self, initial_values: Optional[List[T]] = None):
        self.head: Optional[LinkedListNode[T]] = None
        self._count: int = 0

        if initial_values:
            for val in reversed(initial_values):
                self.insert_head(val)

    def insert_head(self, value: T) -> None:
        """
        Insert new element at the head of the list.
        Time Complexity: O(1)
        """
        new_node = LinkedListNode(value, self.head)
        self.head = new_node
        self._count += 1

    def insert_tail(self, value: T) -> None:
        """
        Append new element to the end of the list.
        Time Complexity: O(n)
        """
        new_node = LinkedListNode(value, None)
        if not self.head:
            self.head = new_node
        else:
            curr = self.head
            while curr.next:
                curr = curr.next
            curr.next = new_node
        self._count += 1

    def delete_head(self) -> Optional[T]:
        """
        Remove and return element at head.
        Time Complexity: O(1)
        """
        if not self.head:
            return None
        val = self.head.value
        self.head = self.head.next
        self._count -= 1
        return val

    def delete_tail(self) -> Optional[T]:
        """
        Remove and return element at tail.
        Time Complexity: O(n)
        """
        if not self.head:
            return None
        if not self.head.next:
            val = self.head.value
            self.head = None
            self._count = 0
            return val

        curr = self.head
        while curr.next and curr.next.next:
            curr = curr.next
        val = curr.next.value
        curr.next = None
        self._count -= 1
        return val

    def search(self, predicate: Callable[[T], bool]) -> Optional[T]:
        """
        Find first element satisfying predicate.
        Time Complexity: O(n)
        """
        curr = self.head
        while curr:
            if predicate(curr.value):
                return curr.value
            curr = curr.next
        return None

    def to_list(self) -> List[T]:
        """
        Convert linked list to Python list.
        Time Complexity: O(n)
        """
        items: List[T] = []
        curr = self.head
        while curr:
            items.append(curr.value)
            curr = curr.next
        return items

    def size(self) -> int:
        return self._count

    def is_empty(self) -> bool:
        return self._count == 0

    def __len__(self) -> int:
        return self._count

    def __iter__(self):
        curr = self.head
        while curr:
            yield curr.value
            curr = curr.next

if __name__ == '__main__':
    print("=== Demo: Singly Linked List (Chronological Feed) ===")
    sll = SinglyLinkedList[Post](INITIAL_POSTS)
    print(f"Initial feed size: {sll.size()}")
    for post in sll:
        print(f"  [{post.id}] {post.title} ({post.date}) - {post.likes} likes")

    print("\nAction: Inserting breaking news at HEAD (O(1))...")
    sll.insert_head(Post(id=99, title='Quantum Computing Milestone', date='2026-10-02', likes=50))
    print(f"New Head: {sll.head.value.title}")
    print(f"Updated list size: {sll.size()}")

    print("\nAction: Deleting TAIL element (O(n))...")
    removed = sll.delete_tail()
    print(f"Removed tail: {removed.title if removed else None}")
    print(f"Final list count: {sll.size()}")
