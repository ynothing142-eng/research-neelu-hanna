"""
Phase 3: Searching and Sorting
Concept: Sorting Algorithms (Merge Sort, Quick Sort, Insertion Sort) (Python)

Real-world applications:
- Merge Sort: Chronologically ordering research feed posts by date (Stable, O(n log n)).
- Quick Sort: Ranking researcher profiles by citations or publications (In-place average O(n log n)).
- Insertion Sort: Efficient for nearly-sorted incoming activity streams (Adaptive, O(n) best).
"""

from typing import TypeVar, List, Callable, Tuple
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from data.mock_data import INITIAL_POSTS, INITIAL_RESEARCHERS

T = TypeVar('T')

def merge_sort(items: List[T], compare: Callable[[T, T], int]) -> Tuple[List[T], int]:
    """
    Merge Sort (Divide-and-Conquer, Stable)
    Time: O(n log n) Best/Avg/Worst
    Space: O(n)
    """
    comparisons = 0

    def sort_helper(sublist: List[T]) -> List[T]:
        nonlocal comparisons
        if len(sublist) <= 1:
            return sublist

        mid = len(sublist) // 2
        left = sort_helper(sublist[:mid])
        right = sort_helper(sublist[mid:])

        merged: List[T] = []
        i = j = 0
        while i < len(left) and j < len(right):
            comparisons += 1
            if compare(left[i], right[j]) <= 0:
                merged.append(left[i])
                i += 1
            else:
                merged.append(right[j])
                j += 1

        merged.extend(left[i:])
        merged.extend(right[j:])
        return merged

    result = sort_helper(items)
    return result, comparisons

def quick_sort(items: List[T], compare: Callable[[T, T], int]) -> Tuple[List[T], int]:
    """
    Quick Sort (Divide-and-Conquer, In-place partitioning)
    Time: O(n log n) Avg, O(n^2) Worst
    Space: O(log n) call stack
    """
    result = list(items)
    comparisons = 0

    def partition(low: int, high: int) -> int:
        nonlocal comparisons
        pivot = result[high]
        i = low - 1
        for j in range(low, high):
            comparisons += 1
            if compare(result[j], pivot) <= 0:
                i += 1
                result[i], result[j] = result[j], result[i]
        result[i + 1], result[high] = result[high], result[i + 1]
        return i + 1

    def sort_helper(low: int, high: int):
        if low < high:
            pi = partition(low, high)
            sort_helper(low, pi - 1)
            sort_helper(pi + 1, high)

    if result:
        sort_helper(0, len(result) - 1)
    return result, comparisons

def insertion_sort(items: List[T], compare: Callable[[T, T], int]) -> Tuple[List[T], int]:
    """
    Insertion Sort (Adaptive, in-place)
    Time: O(n) Best, O(n^2) Avg/Worst
    Space: O(1)
    """
    result = list(items)
    comparisons = 0

    for i in range(1, len(result)):
        key = result[i]
        j = i - 1
        while j >= 0:
            comparisons += 1
            if compare(result[j], key) > 0:
                result[j + 1] = result[j]
                j -= 1
            else:
                break
        result[j + 1] = key

    return result, comparisons

if __name__ == '__main__':
    print("=== Demo: Sorting Algorithms ===")

    # 1. Merge Sort on Posts by Date
    sorted_posts, m_comps = merge_sort(
        INITIAL_POSTS,
        lambda a, b: -1 if a.date > b.date else (1 if a.date < b.date else 0)
    )
    print(f"\n1. Merge Sort (Posts by Date - Descending): {m_comps} comparisons")
    for p in sorted_posts:
        print(f"   [{p.date}] {p.title}")

    # 2. Quick Sort on Researchers by Publications
    ranked_scholars, q_comps = quick_sort(
        INITIAL_RESEARCHERS,
        lambda a, b: -1 if a.publications > b.publications else (1 if a.publications < b.publications else 0)
    )
    print(f"\n2. Quick Sort (Scholars by Publications): {q_comps} comparisons")
    for r in ranked_scholars[:4]:
        print(f"   {r.publications} pubs: {r.name} ({r.department})")
