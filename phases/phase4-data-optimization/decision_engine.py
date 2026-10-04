"""
Phase 4: Data Optimization
Concept: Cross-Phase Integration & Decision Synthesis (Python)

Synthesizes data and algorithm outputs across all 4 phases:
- Phase 1: Core Queue records & researcher profiles
- Phase 2: Collaboration Network Graph & BFS shortest paths
- Phase 3: Sorted metric ranking (Citations, Publications)
- Phase 4: Conflict-free greedy instrument schedule

Produces an executive decision brief for research laboratory directors.
"""

from typing import Dict, Any
import datetime
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../phase2-structured-data')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../phase3-searching-sorting')))
sys.path.append(os.path.dirname(__file__))

from data.mock_data import INITIAL_RESEARCHERS, INITIAL_REQUESTS, INITIAL_EDGES
from graph_traversal import CollaborationGraph
from sorting_algorithms import quick_sort
from greedy_scheduler import greedy_interval_scheduling

def generate_decision_report(lead_researcher_id: int = 1) -> Dict[str, Any]:
    """
    Synthesize all 4 algorithmic phases into an actionable decision brief.
    """
    # 1. Graph analysis from Phase 2
    graph = CollaborationGraph(INITIAL_EDGES)
    bfs_order, _ = graph.bfs(lead_researcher_id)

    # 2. Ranking from Phase 3
    ranked_researchers, _ = quick_sort(
        INITIAL_RESEARCHERS,
        lambda a, b: -1 if a.citations > b.citations else 1
    )

    # Find highest-citation reachable collaborator (excluding lead)
    top_collab = next(
        (r for r in ranked_researchers if r.id != lead_researcher_id and r.id in bfs_order),
        ranked_researchers[0]
    )
    path_from_lead = graph.shortest_path(lead_researcher_id, top_collab.id)

    # 3. Scheduling from Phase 4
    schedule_res = greedy_interval_scheduling(INITIAL_REQUESTS)

    lead_scholar = next(r for r in INITIAL_RESEARCHERS if r.id == lead_researcher_id)

    return {
        'lead_scholar': {
            'id': lead_scholar.id,
            'name': lead_scholar.name,
            'department': lead_scholar.department,
            'institution': lead_scholar.institution,
        },
        'recommended_collaborator': {
            'name': top_collab.name,
            'department': top_collab.department,
            'citations': top_collab.citations,
            'publications': top_collab.publications,
            'shortest_path': path_from_lead,
            'degrees_of_separation': len(path_from_lead) - 1,
            'reason': f"Ranked #1 in citation impact ({top_collab.citations} cites) within reachable collaboration network.",
        },
        'network_insights': {
            'total_active_researchers': len(INITIAL_RESEARCHERS),
            'network_edges': len(INITIAL_EDGES),
            'collaborative_reach': f"{len(bfs_order)} / {len(INITIAL_RESEARCHERS)} researchers reachable",
        },
        'equipment_optimization': {
            'scheduled_bookings': schedule_res['total_accepted'],
            'conflicts_resolved': len(schedule_res['conflicted']),
            'utilization_rate': f"{(schedule_res['total_accepted'] / len(INITIAL_REQUESTS)) * 100:.0f}%",
            'approved_slots': [
                f"#{r.id} {r.instrument} ({r.requester}): {r.start}:00-{r.end}:00"
                for r in schedule_res['accepted']
            ],
        },
        'generated_date': datetime.date.today().strftime('%b %d, %Y'),
    }

if __name__ == '__main__':
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    print("=== Demo: Cross-Phase Decision Synthesis Engine ===")
    brief = generate_decision_report(lead_researcher_id=1)

    print(f"\nLead Investigator: {brief['lead_scholar']['name']} ({brief['lead_scholar']['department']})")
    print(f"\n[Recommendation] Recommended Partner: {brief['recommended_collaborator']['name']}")
    print(f"   Reason: {brief['recommended_collaborator']['reason']}")
    print(f"   Shortest Collaboration Path: {' -> '.join(str(n) for n in brief['recommended_collaborator']['shortest_path'])}")

    print(f"\n[Optimization] Laboratory Scheduling Optimization:")
    print(f"   Approved Slots: {brief['equipment_optimization']['scheduled_bookings']}")
    print(f"   Conflicts Resolved: {brief['equipment_optimization']['conflicts_resolved']}")
    for slot in brief['equipment_optimization']['approved_slots']:
        print(f"   * {slot}")
