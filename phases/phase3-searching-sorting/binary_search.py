"""
Phase 3: Searching and Sorting
Concept: Binary Search (Python)

Real-world application:
Locating a researcher by citation count or metric threshold on a sorted dataset.

Characteristics:
- Requires elements to be pre-sorted.
- Continually halves the search interval using low, mid, and high pointers.

Time Complexity:
- Best Case: O(1)
- Average / Worst Case: O(log2 n)
Space Complexity: O(1) iterative
"""

from typing import TypeVar, List, Callable, Dict, Any
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from data.mock_data import INITIAL_RESEARCHERS

T = TypeVar('T')

def binary_search(
    sorted_items: List[T],
    key_extractor: Callable[[T], int],
    target: int
) -> Dict[str, Any]:
    """
    Execute binary search with step-by-step low, mid, high tracking.
    """
    low = 0
    high = len(sorted_items) - 1
    comparisons = 0
    steps: List[dict] = []

    while low <= high:
        mid = (low + high) // 2
        comparisons += 1
        mid_val = key_extractor(sorted_items[mid])

        steps.append({
            'step': comparisons,
            'low': low,
            'mid': mid,
            'high': high,
            'mid_val': mid_val,
            'target': target,
        })

        if mid_val == target:
            return {
                'found': True,
                'index': mid,
                'item': sorted_items[mid],
                'comparisons': comparisons,
                'steps': steps,
            }
        elif mid_val < target:
            low = mid + 1
        else:
            high = mid - 1

    return {
        'found': False,
        'index': -1,
        'item': None,
        'comparisons': comparisons,
        'steps': steps,
    }

if __name__ == '__main__':
    # Pre-sort researchers by citations
    sorted_scholars = sorted(INITIAL_RESEARCHERS, key=lambda r: r.citations)

    print("=== Demo: Binary Search on Citations ===")
    print("Sorted Citation Array: ", [r.citations for r in sorted_scholars])

    target = 35
    print(f"\nSearching for citation threshold: {target}...")
    res = binary_search(sorted_scholars, lambda r: r.citations, target)

    print(f"Found: {res['found']}")
    print(f"Total Comparisons: {res['comparisons']} (vs {len(sorted_scholars)} for linear scan)")
    if res['item']:
        r = res['item']
        print(f"Matched Scholar: {r.name} with {r.citations} citations ({r.department})")
