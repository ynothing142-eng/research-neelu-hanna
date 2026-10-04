"""
Phase 3: Searching and Sorting
Concept: Combined Use Pipeline (Sort Once, Search Many Times) (Python)

Real-world application:
In a high-frequency search engine handling k queries:
- Naive Strategy: Scan linear search every time -> Cost: k * O(n).
- Combined Strategy: Sort dataset once using Merge Sort (O(n log n)),
  then execute each query using Binary Search (O(log n)).
  Total Cost: O(n log n) + k * O(log n).

Crossover Point:
When k > log2(n), sorting first and then doing binary search is significantly faster!
"""

import math
from typing import Dict, Any

def evaluate_pipeline_strategy(n: int, k: int) -> Dict[str, Any]:
    """
    Compute theoretical comparison operations for both strategies.
    """
    log_n = math.log2(n) if n > 1 else 1
    linear_cost = k * n
    sort_cost = round(n * log_n)
    binary_cost = round(k * log_n)
    combined_cost = sort_cost + binary_cost

    is_combined_faster = combined_cost < linear_cost
    speedup = round(linear_cost / combined_cost, 2) if combined_cost else 1.0

    return {
        'dataset_size_n': n,
        'query_count_k': k,
        'linear_operations': linear_cost,
        'combined_operations': combined_cost,
        'is_combined_faster': is_combined_faster,
        'speedup_factor': speedup,
        'recommendation': (
            f"Combined Strategy is {speedup}x faster for {k} queries."
            if is_combined_faster
            else "For very small k (<= log2 n), linear search avoids the sorting overhead."
        ),
    }

if __name__ == '__main__':
    print("=== Demo: Combined Pipeline Benchmark ===")
    n_scholars = 1000

    for test_k in [1, 5, 20, 100]:
        analysis = evaluate_pipeline_strategy(n_scholars, test_k)
        print(f"\nScenario: N={n_scholars} scholars, k={test_k} search queries")
        print(f"  Linear Search:     {analysis['linear_operations']} operations")
        print(f"  Combined Pipeline: {analysis['combined_operations']} operations")
        print(f"  Verdict: {analysis['recommendation']}")
