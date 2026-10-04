"""
Phase 4 Interactive Terminal Demo
Demonstrates all Data Optimization and Decision Synthesis concepts sequentially.
"""

import sys
import os

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

_p4_dir = os.path.dirname(os.path.abspath(__file__))
_phases_dir = os.path.abspath(os.path.join(_p4_dir, '..'))
_p2_dir = os.path.join(_phases_dir, 'phase2-structured-data')
_p3_dir = os.path.join(_phases_dir, 'phase3-searching-sorting')

for _d in [_p4_dir, _phases_dir, _p2_dir, _p3_dir]:
    if _d not in sys.path:
        sys.path.insert(0, _d)

from optimization_model import do_requests_conflict
from greedy_scheduler import greedy_interval_scheduling
from decision_engine import generate_decision_report
from data.mock_data import INITIAL_REQUESTS

def run_phase4_demo():
    print("=" * 60)
    print("      RESEARCHSPHERE - PHASE 4: DATA OPTIMIZATION       ")
    print("=" * 60)

    # 1. Optimization Problem Formulation
    print("\n[Concept 1: Optimization Problem Model]")
    print(f"Total Equipment Requests: {len(INITIAL_REQUESTS)}")
    r1, r2 = INITIAL_REQUESTS[0], INITIAL_REQUESTS[1]
    print(f"Conflict Check: Request #{r1.id} ({r1.instrument}, {r1.start}-{r1.end}h) vs Request #{r2.id} ({r2.start}-{r2.end}h)")
    print(f"Result: Conflict Detected = {do_requests_conflict(r1, r2)}")

    # 2. Greedy Algorithm (Earliest Finish Time First)
    print("\n[Concept 2: Greedy Interval Scheduler (Earliest Finish Time)]")
    sched_result = greedy_interval_scheduling(INITIAL_REQUESTS)
    print(f"Greedily Accepted: {sched_result['total_accepted']} conflict-free bookings")
    print(f"Conflicted / Dropped: {len(sched_result['conflicted'])} overlapping requests")
    print("\nOptimal Approved Schedule:")
    for r in sched_result['accepted']:
        print(f"  * #{r.id} {r.instrument}: {r.start}:00 to {r.end}:00 (User: {r.requester})")

    # 3. Decision Synthesis
    print("\n[Concept 3: Cross-Phase Integration & Decision Synthesis]")
    report = generate_decision_report(lead_researcher_id=1)
    print(f"Lead Scholar: {report['lead_scholar']['name']}")
    print(f"Recommended Co-Author: {report['recommended_collaborator']['name']} ({report['recommended_collaborator']['citations']} citations)")
    print(f"Reachable Network Path: {' -> '.join(str(n) for n in report['recommended_collaborator']['shortest_path'])}")
    print(f"Equipment Utilization: {report['equipment_optimization']['utilization_rate']}")

    print("=" * 60)
    print("Phase 4 verification complete: All concepts executed successfully!")
    print("=" * 60)

if __name__ == '__main__':
    run_phase4_demo()
