"""
Phase 4: Data Optimization
Concept: Optimization Problem Formulation (Python)

Real-world application:
High-demand laboratory instrument sharing (GPU workstations, 3D printers, spectrometers).

Problem Formulation:
- Given requests R = {r1, r2, ..., rm}, where each request has:
  - instrument: Resource being booked
  - start: Starting hour
  - end: Ending hour (end > start)
  - requester: Researcher making the booking
- Two requests ri and rj conflict if:
  ri.instrument == rj.instrument AND max(ri.start, rj.start) < min(ri.end, rj.end)
- Objective: Maximize total non-overlapping bookings |S|.
"""

from typing import List, Dict
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from data.mock_data import Request, INITIAL_REQUESTS

def do_requests_conflict(r1: Request, r2: Request) -> bool:
    """Check if two requests overlap in time on the same instrument."""
    if r1.instrument != r2.instrument:
        return False
    return max(r1.start, r2.start) < min(r1.end, r2.end)

def group_by_instrument(requests: List[Request]) -> Dict[str, List[Request]]:
    """Group booking requests by laboratory instrument."""
    grouped: Dict[str, List[Request]] = {}
    for r in requests:
        if r.instrument not in grouped:
            grouped[r.instrument] = []
        grouped[r.instrument].append(r)
    return grouped

if __name__ == '__main__':
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    print("=== Demo: Optimization Model (Instrument Requests) ===")
    grouped = group_by_instrument(INITIAL_REQUESTS)
    for inst, reqs in grouped.items():
        print(f"\n[Instrument] {inst} ({len(reqs)} requests)")
        for r in reqs:
            print(f"   #{r.id} {r.requester}: {r.start}:00 to {r.end}:00 [{r.status}]")

    print("\nConflict Test:")
    r1, r2 = INITIAL_REQUESTS[0], INITIAL_REQUESTS[1]
    print(f"Request #{r1.id} ({r1.start}-{r1.end}h) vs Request #{r2.id} ({r2.start}-{r2.end}h) on {r1.instrument}:")
    print(f"  Conflict Detected: {do_requests_conflict(r1, r2)}")
