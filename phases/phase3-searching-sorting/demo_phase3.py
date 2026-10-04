"""
Phase 3 Interactive Terminal Demo
Demonstrates all Searching, Sorting, Pipeline, and Heap concepts sequentially.
"""

import sys
import os

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
sys.path.append(os.path.dirname(__file__))

from linear_search import linear_search
from binary_search import binary_search
from sorting_algorithms import merge_sort, quick_sort
from combined_pipeline import evaluate_pipeline_strategy
from priority_queue import MaxHeap
from data.mock_data import INITIAL_RESEARCHERS, INITIAL_POSTS, Post

def run_phase3_demo():
    print("=" * 60)
    print("      RESEARCHSPHERE · PHASE 3: SEARCHING & SORTING      ")
    print("=" * 60)

    # 1. Linear Search
    print("\n[Concept 1: Linear Search (Unsorted Scans)]")
    name = "Meera"
    lin_res = linear_search(INITIAL_RESEARCHERS, lambda r: name.lower() in r.name.lower())
    print(f"Search for '{name}': Found={lin_res['found']} ({lin_res['comparisons']} comparisons)")

    # 2. Binary Search
    print("\n[Concept 2: Binary Search (Sorted Citations)]")
    sorted_scholars = sorted(INITIAL_RESEARCHERS, key=lambda r: r.citations)
    target_cite = 35
    bin_res = binary_search(sorted_scholars, lambda r: r.citations, target_cite)
    print(f"Search for {target_cite} citations: Found={bin_res['found']} ({bin_res['comparisons']} comparisons vs {len(sorted_scholars)} linear scans)")

    # 3. Sorting Algorithms
    print("\n[Concept 3: Sorting Algorithms]")
    sorted_posts, m_comps = merge_sort(
        INITIAL_POSTS,
        lambda a, b: -1 if a.date > b.date else 1
    )
    print(f"Merge Sort: {len(sorted_posts)} posts ordered by date ({m_comps} comparisons, Stable)")

    ranked, q_comps = quick_sort(
        INITIAL_RESEARCHERS,
        lambda a, b: -1 if a.publications > b.publications else 1
    )
    print(f"Quick Sort: {len(ranked)} scholars ranked by publications ({q_comps} comparisons, In-place)")

    # 4. Combined Pipeline
    print("\n[Concept 4: Combined Use (Sort Once, Search Many)]")
    analysis = evaluate_pipeline_strategy(100, 15)
    print(f"Analysis for 100 scholars & 15 queries: {analysis['recommendation']}")

    # 5. Max-Heap
    print("\n[Concept 5: Max-Heap Priority Queue]")
    heap = MaxHeap[Post](lambda p: p.likes, INITIAL_POSTS)
    top = heap.peek_max()
    print(f"Trending Top Post: '{top.title}' ({top.likes} likes)")
    heap.insert(Post(id=99, title="Breakthrough Discovery", date="2026-10-02", likes=60))
    print(f"After Inserting Viral Post: '{heap.peek_max().title}' ({heap.peek_max().likes} likes)")

    print("=" * 60)
    print("Phase 3 verification complete: All concepts executed successfully!")
    print("=" * 60)

if __name__ == '__main__':
    run_phase3_demo()
