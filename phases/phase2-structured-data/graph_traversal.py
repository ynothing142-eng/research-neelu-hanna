"""
Phase 2: Structured Data Representation
Concept: Graph Representation (Adjacency List) & BFS / DFS (Python)

Real-world application:
Researcher collaboration and co-authorship network.
- BFS (Breadth-First Search): Uses a queue. Discovers nearest neighbors first
  and finds the shortest collaboration path (degrees of separation).
- DFS (Depth-First Search): Uses a stack / recursion. Explores deep collaboration
  clusters, paths, and connectivity.

Time Complexity: O(V + E) where V is researchers and E is collaborations.
Space Complexity: O(V) for visited set and queue/stack.
"""

from typing import List, Dict, Set, Optional, Tuple
from collections import deque
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from data.mock_data import CollaborationEdge, INITIAL_EDGES

class CollaborationGraph:
    def __init__(self, edges: List[CollaborationEdge] = INITIAL_EDGES):
        self.adj_list: Dict[int, List[int]] = {}
        for u, v in edges:
            self.add_edge(u, v)

    def add_edge(self, u: int, v: int) -> None:
        if u not in self.adj_list:
            self.adj_list[u] = []
        if v not in self.adj_list:
            self.adj_list[v] = []
        self.adj_list[u].append(v)
        self.adj_list[v].append(u)

    def get_neighbors(self, node: int) -> List[int]:
        return self.adj_list.get(node, [])

    def bfs(self, start_node: int) -> Tuple[List[int], Dict[int, Optional[int]]]:
        """
        Breadth-First Search traversal.
        Returns:
            (visit_order, predecessors_map)
        """
        queue: deque[int] = deque([start_node])
        visited: Set[int] = {start_node}
        order: List[int] = []
        predecessors: Dict[int, Optional[int]] = {start_node: None}

        while queue:
            curr = queue.popleft()
            order.append(curr)

            for neighbor in self.get_neighbors(curr):
                if neighbor not in visited:
                    visited.add(neighbor)
                    predecessors[neighbor] = curr
                    queue.append(neighbor)

        return order, predecessors

    def dfs(self, start_node: int) -> List[int]:
        """
        Depth-First Search traversal (stack-based).
        Returns:
            visit_order
        """
        stack: List[int] = [start_node]
        visited: Set[int] = set()
        order: List[int] = []

        while stack:
            curr = stack.pop()
            if curr in visited:
                continue
            visited.add(curr)
            order.append(curr)

            # Push neighbors in reverse to maintain left-to-right order
            for neighbor in reversed(self.get_neighbors(curr)):
                if neighbor not in visited:
                    stack.append(neighbor)

        return order

    def shortest_path(self, start_node: int, target_node: int) -> List[int]:
        """Compute shortest path between two researchers using BFS."""
        _, predecessors = self.bfs(start_node)
        if target_node not in predecessors:
            return []

        path: List[int] = []
        curr: Optional[int] = target_node
        while curr is not None:
            path.append(curr)
            curr = predecessors.get(curr)

        path.reverse()
        return path if path and path[0] == start_node else []

if __name__ == '__main__':
    graph = CollaborationGraph(INITIAL_EDGES)
    print("=== Demo: Collaboration Graph & BFS / DFS ===")

    start = 1
    bfs_order, _ = graph.bfs(start)
    dfs_order = graph.dfs(start)

    print(f"Starting from Researcher #{start}:")
    print(f"  BFS Traversal Order: {bfs_order}")
    print(f"  DFS Traversal Order: {dfs_order}")

    target = 8
    path = graph.shortest_path(start, target)
    print(f"\nShortest collaboration path from #{start} to #{target}:")
    print(f"  {' -> '.join(str(n) for n in path)} ({len(path) - 1} degrees of separation)")
