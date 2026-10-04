"""
Phase 1: Core Data Handling
Concept: Iterative vs. Recursive Processing (Python)

Real-world application:
Feed activity counting, summation of citation metrics, and node traversal.

Comparative Analysis:
- Iterative: Constant O(1) auxiliary stack space (uses a standard loop).
- Recursive: Linear O(n) call-stack frames. Subject to recursion depth limits (sys.getrecursionlimit()).
"""

import time
from typing import List, Any, Dict

def iterative_count(items: List[Any]) -> Dict[str, Any]:
    """
    Count elements iteratively.
    Time Complexity: O(n)
    Space Complexity: O(1) auxiliary space
    """
    t0 = time.perf_counter()
    count = 0
    for _ in items:
        count += 1
    t1 = time.perf_counter()

    return {
        'count': count,
        'time_ms': (t1 - t0) * 1000,
        'call_stack_frames': 1,
        'space_complexity': 'O(1) - Constant stack space',
        'time_complexity': 'O(n) - Linear time',
    }

def recursive_count(items: List[Any]) -> Dict[str, Any]:
    """
    Count elements recursively.
    Time Complexity: O(n)
    Space Complexity: O(n) call stack frames
    """
    t0 = time.perf_counter()
    max_depth = 0

    def helper(idx: int, depth: int) -> int:
        nonlocal max_depth
        if depth > max_depth:
            max_depth = depth
        # Base case
        if idx >= len(items):
            return 0
        # Recursive step
        return 1 + helper(idx + 1, depth + 1)

    count = helper(0, 1)
    t1 = time.perf_counter()

    return {
        'count': count,
        'time_ms': (t1 - t0) * 1000,
        'call_stack_frames': max_depth,
        'space_complexity': 'O(n) - Linear stack frames',
        'time_complexity': 'O(n) - Linear time',
    }

if __name__ == '__main__':
    sample = list(range(100))
    print(f"=== Demo: Iterative vs Recursive Traversal (N={len(sample)}) ===")

    it_res = iterative_count(sample)
    print(f"Iterative Result:")
    print(f"  Count: {it_res['count']} items")
    print(f"  Stack Depth: {it_res['call_stack_frames']} frame")
    print(f"  Time: {it_res['time_ms']:.4f} ms")

    rec_res = recursive_count(sample)
    print(f"\nRecursive Result:")
    print(f"  Count: {rec_res['count']} items")
    print(f"  Stack Depth: {rec_res['call_stack_frames']} frames")
    print(f"  Time: {rec_res['time_ms']:.4f} ms")

    assert it_res['count'] == rec_res['count'], "Correctness mismatch!"
    print("\nVerification: Both algorithms produce identical results!")
