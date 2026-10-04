"""
Phase 3: Searching and Sorting
Concept: Linear Search (Python)

Real-world application:
Sequential scan across an unsorted directory of researcher profiles by name.

Time Complexity:
- Best Case: O(1) (found at index 0)
- Average Case: O(n/2) = O(n)
- Worst Case: O(n) (item at last index or absent)
Space Complexity: O(1) auxiliary space
"""

from typing import TypeVar, List, Callable, Dict, Any
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from data.mock_data import INITIAL_RESEARCHERS

T = TypeVar('T')

def linear_search(items: List[T], predicate: Callable[[T], bool]) -> Dict[str, Any]:
    """
    Perform linear search tracking step comparisons.
    Returns:
        {found: bool, index: int, item: Optional[T], comparisons: int, steps: list}
    """
    comparisons = 0
    steps: List[dict] = []

    for idx, item in enumerate(items):
        comparisons += 1
        is_match = predicate(item)
        steps.append({
            'index': idx,
            'item': item,
            'matched': is_match,
            'comparisons': comparisons,
        })

        if is_match:
            return {
                'found': True,
                'index': idx,
                'item': item,
                'comparisons': comparisons,
                'steps': steps,
            }

    return {
        'found': False,
        'index': -1,
        'item': None,
        'comparisons': comparisons,
        'steps': steps,
    }

if __name__ == '__main__':
    target_name = "Meera"
    print(f"=== Demo: Linear Search for '{target_name}' ===")
    result = linear_search(INITIAL_RESEARCHERS, lambda r: target_name.lower() in r.name.lower())

    print(f"Found: {result['found']}")
    print(f"Total Comparisons: {result['comparisons']} / {len(INITIAL_RESEARCHERS)}")
    if result['item']:
        r = result['item']
        print(f"Matched Scholar: {r.name} ({r.department}, {r.institution})")
