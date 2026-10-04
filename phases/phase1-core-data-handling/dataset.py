"""
Phase 1: Core Data Handling
Concept: Dataset Management & Schema Representation (Python)

Provides typed dataset filtering, statistical calculations, and record lookups.
"""

from typing import List, Callable, Dict, Any, Set
import sys
import os

# Allow direct script execution
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from data.mock_data import (
    Researcher,
    Post,
    Request,
    CollaborationEdge,
    INITIAL_RESEARCHERS,
    INITIAL_POSTS,
    INITIAL_REQUESTS,
    INITIAL_EDGES,
)

class DatasetManager:
    def __init__(self):
        self.researchers: List[Researcher] = list(INITIAL_RESEARCHERS)
        self.posts: List[Post] = list(INITIAL_POSTS)
        self.requests: List[Request] = list(INITIAL_REQUESTS)
        self.edges: List[CollaborationEdge] = list(INITIAL_EDGES)

    def get_researchers(self) -> List[Researcher]:
        return list(self.researchers)

    def get_posts(self) -> List[Post]:
        return list(self.posts)

    def get_requests(self) -> List[Request]:
        return list(self.requests)

    def get_edges(self) -> List[CollaborationEdge]:
        return list(self.edges)

    def get_stats(self) -> Dict[str, Any]:
        institutions: Set[str] = {r.institution for r in self.researchers}
        departments: Set[str] = {r.department for r in self.researchers}
        total_pubs = sum(r.publications for r in self.researchers)
        total_cites = sum(r.citations for r in self.researchers)

        return {
            'total_researchers': len(self.researchers),
            'total_institutions': len(institutions),
            'total_departments': len(departments),
            'total_posts': len(self.posts),
            'total_requests': len(self.requests),
            'total_connections': len(self.edges),
            'total_publications': total_pubs,
            'total_citations': total_cites,
        }

    def filter_researchers(self, predicate: Callable[[Researcher], bool]) -> List[Researcher]:
        """
        Filter researchers using a predicate function.
        Time Complexity: O(n)
        Space Complexity: O(n)
        """
        return [r for r in self.researchers if predicate(r)]

if __name__ == '__main__':
    dm = DatasetManager()
    stats = dm.get_stats()
    print("=== ResearchSphere Dataset Summary ===")
    for k, v in stats.items():
        print(f"  {k}: {v}")

    ds_researchers = dm.filter_researchers(lambda r: r.department == 'Data Science')
    print(f"\nData Science Researchers ({len(ds_researchers)} found):")
    for r in ds_researchers:
        print(f"  - {r.name} ({r.institution}): {r.publications} pubs, {r.citations} citations")
