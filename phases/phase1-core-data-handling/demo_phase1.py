"""
Phase 1 Interactive Terminal Demo
Demonstrates all 5 Core Data Handling concepts sequentially.
"""

import sys
import os

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
sys.path.append(os.path.dirname(__file__))

from dataset import DatasetManager
from singly_linked_list import SinglyLinkedList
from stack_and_queue import Stack, Queue
from infix_postfix import infix_to_postfix
from recursion_vs_iteration import iterative_count, recursive_count
from data.mock_data import Post, Request

def run_phase1_demo():
    print("=" * 60)
    print("      RESEARCHSPHERE · PHASE 1: CORE DATA HANDLING      ")
    print("=" * 60)

    # 1. Dataset
    print("\n[Concept 1: Dataset Schema & Queries]")
    dm = DatasetManager()
    stats = dm.get_stats()
    print(f"Total Researchers: {stats['total_researchers']}")
    print(f"Total Institutions: {stats['total_institutions']}")
    print(f"Total Feed Posts: {stats['total_posts']}")
    print(f"Total Requests: {stats['total_requests']}")

    # 2. Singly Linked List
    print("\n[Concept 2: Singly Linked List (Activity Feed)]")
    feed = SinglyLinkedList[Post](dm.get_posts())
    print(f"Head element before insert: '{feed.head.value.title}' (ID: {feed.head.value.id})")
    print("Action: Prepending new discovery post to Head in O(1)...")
    feed.insert_head(Post(id=10, title="Quantum Entanglement in Nanomaterials", date="2026-10-02", likes=45))
    print(f"New Head: '{feed.head.value.title}' (Size: {feed.size()})")

    # 3. Stack & Queue
    print("\n[Concept 3: Stack (Undo History) & Queue (Booking Pipeline)]")
    undo_stack = Stack[str](['Followed Meera', 'Reserved GPU Workstation'])
    print(f"Stack Top: '{undo_stack.peek()}'")
    undo_stack.push('Shared Dataset')
    print(f"Action: Pushed 'Shared Dataset'. New Top: '{undo_stack.peek()}'")
    print(f"Action: Undo (POP) -> Undone: '{undo_stack.pop()}'")

    request_queue = Queue[Request]([r for r in dm.get_requests() if r.status == 'Pending'])
    print(f"\nPending Request Queue Size: {request_queue.size()}")
    req = request_queue.dequeue()
    print(f"Action: Dequeued request #{req.id} ({req.instrument} for {req.requester}) in FIFO order.")

    # 4. Infix to Postfix
    print("\n[Concept 4: Infix to Postfix Parser (Shunting-Yard)]")
    query = "department == 'CS' AND (citations > 30 OR publications >= 10)"
    postfix_tokens, _ = infix_to_postfix(query)
    print(f"Infix Expression:  {query}")
    print(f"Postfix (RPN):     {' '.join(postfix_tokens)}")

    # 5. Iterative vs Recursive
    print("\n[Concept 5: Iterative vs. Recursive Traversal]")
    sample_data = list(range(50))
    it_res = iterative_count(sample_data)
    rec_res = recursive_count(sample_data)
    print(f"Iterative: {it_res['count']} items counted, {it_res['call_stack_frames']} stack frame, {it_res['time_ms']:.4f} ms")
    print(f"Recursive: {rec_res['count']} items counted, {rec_res['call_stack_frames']} stack frames, {rec_res['time_ms']:.4f} ms")
    print("=" * 60)
    print("Phase 1 verification complete: All 5 concepts executed successfully!")
    print("=" * 60)

if __name__ == '__main__':
    run_phase1_demo()
