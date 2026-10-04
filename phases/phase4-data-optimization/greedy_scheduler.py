"""
Phase 4: Data Optimization
Concept: Greedy Interval Scheduling - Earliest Finish Time First (EFT) (Python)

Real-world application:
Allocating shared research instruments so that the maximum number of researchers
get access without time collisions.

Algorithmic Strategy (Greedy Choice Property):
1. Exclude pre-rejected administrative requests.
2. Sort eligible requests by finish time in ascending order: end_1 <= end_2 <= ... <= end_k.
3. Greedily select the request finishing earliest.
4. Reject any future requests on the same instrument that overlap with the accepted schedule.
5. Repeat until all requests are processed.

Optimality Proof ("Greedy Stays Ahead"):
By finishing as early as possible, the greedy choice leaves the maximum possible
remaining time for subsequent requests. This guarantees a globally optimal schedule.

Time Complexity:
- Sorting: O(n log n)
- Greedy Selection: O(n)
- Total: O(n log n)
Space Complexity: O(n) for schedule output
"""

from typing import List, Dict, Any
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
sys.path.append(os.path.dirname(__file__))

from optimization_model import do_requests_conflict
from data.mock_data import Request, INITIAL_REQUESTS

def greedy_interval_scheduling(requests: List[Request]) -> Dict[str, Any]:
    """
    Run Earliest Finish Time (EFT) greedy interval scheduling.
    Returns:
        {accepted: list, conflicted: list, rejected: list, steps: list}
    """
    eligible: List[Request] = []
    rejected: List[Request] = []
    steps: List[dict] = []

    for r in requests:
        if r.status == 'Rejected':
            rejected.append(r)
            steps.append({
                'request': r,
                'decision': 'REJECTED_INPUT',
                'reason': 'Administratively rejected before scheduling',
            })
        else:
            eligible.append(r)

    # Greedy sort by earliest finish time (end)
    sorted_requests = sorted(eligible, key=lambda r: r.end)

    accepted: List[Request] = []
    conflicted: List[Request] = []

    for req in sorted_requests:
        overlap = next(
            (curr for curr in accepted if do_requests_conflict(curr, req)),
            None
        )

        if not overlap:
            accepted.append(req)
            steps.append({
                'request': req,
                'decision': 'ACCEPTED',
                'reason': f"Earliest finish time ({req.end}:00) without collision on {req.instrument}",
            })
        else:
            conflicted.append(req)
            steps.append({
                'request': req,
                'decision': 'CONFLICT',
                'reason': f"Collides with #{overlap.id} ({overlap.requester} from {overlap.start}:00-{overlap.end}:00) on {req.instrument}",
            })

    return {
        'accepted': accepted,
        'conflicted': conflicted,
        'rejected': rejected,
        'total_accepted': len(accepted),
        'steps': steps,
    }

if __name__ == '__main__':
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    print("=== Demo: Greedy Interval Scheduler (Earliest Finish Time First) ===")
    result = greedy_interval_scheduling(INITIAL_REQUESTS)

    print(f"Total Requests Evaluated: {len(INITIAL_REQUESTS)}")
    print(f"Accepted Bookings: {result['total_accepted']}")
    print(f"Conflicted Requests: {len(result['conflicted'])}")

    print("\nOptimal Conflict-Free Schedule:")
    for r in result['accepted']:
        print(f"  [ACCEPTED] #{r.id} {r.instrument}: {r.start}:00 to {r.end}:00 (Requester: {r.requester})")

    print("\nConflicts Identified:")
    for r in result['conflicted']:
        print(f"  [CONFLICT] #{r.id} {r.instrument}: {r.start}:00 to {r.end}:00 ({r.requester})")
